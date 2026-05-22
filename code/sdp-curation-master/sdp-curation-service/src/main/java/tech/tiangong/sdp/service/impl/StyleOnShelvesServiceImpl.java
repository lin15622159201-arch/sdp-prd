package tech.tiangong.sdp.service.impl;

import cn.hutool.core.collection.CollectionUtil;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.rabbitmq.client.Channel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.core.protocol.PageVo;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.amqp.RabbitConstant;
import tech.tiangong.sdp.amqp.TaskMessageDTO;
import tech.tiangong.sdp.common.req.AiTaskCallbackReq;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.convert.StyleOnShelvesConvert;
import tech.tiangong.sdp.entity.*;
import tech.tiangong.sdp.enums.*;
import tech.tiangong.sdp.external.AutoCropTaskApi;
import tech.tiangong.sdp.repository.*;
import tech.tiangong.sdp.service.ProductService;
import tech.tiangong.sdp.service.PrototypeService;
import tech.tiangong.sdp.service.SpotStyleTaskService;
import tech.tiangong.sdp.service.StyleOnShelvesService;
import tech.tiangong.sdp.util.StreamUtil;
import tech.tiangong.sdp.utils.SsoContext;
import tech.tiangong.sdp.vo.dto.DesignerDTO;
import tech.tiangong.sdp.vo.dto.StyleOnShelvesGroupDTO;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.StyleOnShelvesPageResp;
import tech.tiangong.sdp.vo.resp.StyleOnShelvesResp;

import javax.validation.ValidationException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * StyleOnShelvesService
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/11 15:36
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class StyleOnShelvesServiceImpl extends DefaultTaskServiceImpl implements StyleOnShelvesService {
    private final StyleOnShelvesRepository styleOnShelvesRepository;
    private final SkcOnShelvesRepository skcOnShelvesRepository;
    private final SkuGradingRepository skuGradingRepository;
    private final GradingSizeRepository gradingSizeRepository;
    private final StyleOnShelvesPictureRepository styleOnShelvesPictureRepository;
    private final @Lazy SpotStyleTaskService spotStyleTaskService;
    private final PrototypeService prototypeService;
    private final PrototypeRepository prototypeRepository;
    private final StyleSkcSkuRepository styleSkcSkuRepository;
    private ProductService productService;
    private final ProductRepository productRepository;
    private final ProductSkcRepository productSkcRepository;
    private final ShopRepository shopRepository;
    private final DesignStyleRepository designStyleRepository;

    @Autowired
    public void setProductService(@Lazy ProductService productService) {
        this.productService = productService;
    }


    @Transactional(rollbackFor = Exception.class)
    @Override
    public void onShelves(StyleOnShelves style) {
        style.setRevisedTime(LocalDateTime.now());
        execOrElse(this.styleOnShelvesRepository.getById(style.getStyleId()),
                it -> {
                    style.setCreatedTime(it.getCreatedTime());
                    List<Product> productList = productRepository.listByStyleId(it.getStyleId());
                    if (it.waitRelease()
                            || (CollectionUtil.isNotEmpty(productList) && productList.stream().anyMatch(p -> !p.published()))) {
                        //说明是重新推送该spu下的skc信息，这时候要修改为待审核重新审核(未发布的产品)
                        style.setReviewStatus(StyleOnShelveReviewEnum.WAIT_REVIEW.getCode());
                    }
                    this.styleOnShelvesRepository.updateById(style);
                    //商品已经发布，通知商品管理进行关联操作
                    if (it.releaseSuccess()) {
                        //商品新增skc
                        addProductSkc(style);
                        //处理skc显示问题
                        dealSkcShow(style);
                    }
                    this.skus(style, this.onShelves(style.getSkcs()));
                    this.onShelvesPicture(style);
                }, () -> {
                    this.styleOnShelvesRepository.save(style);
                    this.onShelves(style.getSkcs());
                    this.skus(style, style.getSkcs());
                    this.onShelvesPicture(style);
                });
    }

    private void dealSkcShow(StyleOnShelves style) {
        //已经发布的商品，复色推送过来在待上架详情看不到
        if (Objects.equals(SpotStyleTypeEnum.SPOT_STYLE.getVale(), style.getStyleType())) {
            final var skcList = skcOnShelvesRepository.selectByStyleId(List.of(style.getStyleId()));
            final var skcMap = BasicConvert.groupingBy(skcList, SkcOnShelves::getSkcId);
            style.getSkcs().forEach(t -> {
                if (CollectionUtil.isNotEmpty(skcMap) && !skcMap.containsKey(t.getSkcId())) {
                    t.setShowDetail(Bool.NO.getCode());
                }
            });
        } else {
            style.getSkcs().forEach(t -> t.setShowDetail(Bool.NO.getCode()));
        }
    }

    private void addProductSkc(StyleOnShelves style) {
        List<Product> productList = productRepository.listByStyleId(style.getStyleId());
        if(CollectionUtil.isEmpty(productList)){
            log.warn("商品增加SKC失败，款式没有对应的商品，styleId:{}",style.getStyleId());
            return;
        }
        List<Long> skcIds = style.getSkcs().stream().map(SkcOnShelves::getSkcId).distinct().collect(Collectors.toList());
        final var skuList = styleSkcSkuRepository.selectBySkcIds(skcIds);
        final Map<Long, List<StyleSkcSku>> skcSkuMap = BasicConvert.groupingBy(skuList, StyleSkcSku::getSkcId);
        final var skcList = this.productSkcRepository.listBySkcIds(skcIds);
        for (Product product : productList){
            productService.addNewSkc(StyleOnShelvesConvert.addProductSkc(style, product, skcSkuMap, skcList));
        }
    }

    private void onShelvesPicture(StyleOnShelves style) {
        log.info("开始处理尺码信息：\t{}", JsonsKt.toJsonPretty(style));
        if (CollectionUtil.isNotEmpty(style.getPictures())) {
            final var pictures = styleOnShelvesPictureRepository.selectByStyleId(List.of(style.getStyleId()));
            if (CollectionUtil.isNotEmpty(pictures)) {
                styleOnShelvesPictureRepository.deleteByStyleId(style.getStyleId());
            }
            styleOnShelvesPictureRepository.saveBatch(style.getPictures());
            final var list = new ArrayList<StyleSkcOnShelvesPicture>();
            if (Objects.equals(SpotStyleTypeEnum.SPOT_STYLE.getVale(), style.getStyleType())) {
                list.addAll(style.getPictures().stream().filter(StyleSkcOnShelvesPicture::skcImage).toList());
            } else {
                list.addAll(style.getPictures().stream().filter(StyleSkcOnShelvesPicture::designSkcMarketingImage).toList());
            }
            log.info("图片裁剪数组大小：\t{}", JsonsKt.toJsonPretty(list.size()));
            if (CollectionUtil.isNotEmpty(list)) {
                list.forEach(t -> {
                            log.info("开始发送MQ信息：\t{}", JsonsKt.toJsonPretty(t));
                            this.send(t, JsonsKt.toJson(new TaskMessageDTO(t.getPictureId())), RabbitConfigEnum.PUSH_CROP_TASK);
                            log.info("MQ发送成功：\t{}", JsonsKt.toJsonPretty(t.getPictureId()));
                        }
                );
            }
        }
    }

    @Override
    public void callBackCrop(AiTaskCallbackReq req) {
        log.info("裁剪任务callback\t{}", JsonsKt.toJsonPretty(req));
        execOrElse(this.styleOnShelvesPictureRepository.getById(req.getBusId()),
                this::callbackCropTask,
                () -> log.warn("裁剪任务callback任务【{}】不存在", req.getBusId()));
    }

    @Override
    public PageVo<StyleOnShelvesPageResp> page(StyleOnShelvesPageReq req) {
        final var query = StyleOnShelvesConvert.buildWebPage(req);
        final var page = this.styleOnShelvesRepository.webPage(query);
        final var records = page.getRecords();
        if (CollectionUtil.isEmpty(records)) {
            return new PageVo<>();
        }
        final var styleIds = records.stream().map(StyleOnShelves::getStyleId).toList();
        final Map<Long, List<StyleSkcOnShelvesPicture>> pictureMap = BasicConvert.groupingBy(
                this.styleOnShelvesPictureRepository.selectByStyleId(styleIds),
                StyleSkcOnShelvesPicture::getSkcId);

       final var spuList = designStyleRepository.listByIds(styleIds);
       Map<Long, DesignStyle> spuMap = StreamUtil.list2Map(spuList, DesignStyle::getDesignStyleId);
        final Map<Long, List<SkcOnShelves>> skcMap = BasicConvert.groupingBy(
                this.skcOnShelvesRepository.selectByStyleId(styleIds),
                SkcOnShelves::getStyleId);
        final var storeIds = records.stream().map(StyleOnShelves::getStoreId).filter(storeId -> null != storeId).toList();
        final var shops = shopRepository.listByIds(storeIds);
        return BasicConvert.page(page, it -> StyleOnShelvesConvert.convert(it, skcMap, pictureMap, shops,spuMap));
    }

    @Override
    public StyleOnShelvesGroupDTO stateTotal(StyleOnShelvesPageReq req) {
        final var query = StyleOnShelvesConvert.buildWebPage(req);
        final var resp = new StyleOnShelvesGroupDTO();
        resp.setReviewStatus(styleOnShelvesRepository.selectReviewStatus(query));
        resp.setReleaseStatus(styleOnShelvesRepository.selectReleaseStatus(query));
        return resp;
    }

    @Override
    public Boolean addProductUpdateTag(Long styleId) {
        final var style = styleOnShelvesRepository.getById(styleId);
        if (null != style && style.releaseSuccess()) {
            productService.addUpdateTag(List.of(styleId));
        }
        return true;
    }

    @Override
    public StyleOnShelvesResp detail(Long styleId) {
        final var style = styleOnShelvesRepository.getById(styleId);
        if (null == style) {
            return null;
        }
        final var skcs = this.skcOnShelvesRepository.selectByStyleId(List.of(style.getStyleId()));
        final var pictures = this.styleOnShelvesPictureRepository.selectByStyleId(List.of(style.getStyleId()));
        List<DesignerDTO> designerList = selectByDesignerIds(List.of(style.getDesignerId()));
        final var skus = styleSkcSkuRepository.selectByStyleId(styleId);
        return StyleOnShelvesConvert.convertDetail(style, skcs, pictures, designerList, skus);
    }

    @Override
    public StyleOnShelvesResp detailAll(Long styleId) {
        final var style = styleOnShelvesRepository.getById(styleId);
        if (null == style) {
            return null;
        }
        final var skcs = this.skcOnShelvesRepository.selectAllByStyleId(List.of(style.getStyleId()));
        final var pictures = this.styleOnShelvesPictureRepository.selectByStyleId(List.of(style.getStyleId()));
        List<DesignerDTO> designerList = selectByDesignerIds(List.of(style.getDesignerId()));
        final var skus = styleSkcSkuRepository.selectByStyleId(styleId);
        return StyleOnShelvesConvert.convertDetail(style, skcs, pictures, designerList, skus);
    }


    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean review(StyleOnShelvesReviewReq req) {
        //编辑的时候前端要传null
        if (null == req.getPass()) {
            return false;
        }
        final var styleOnShelves = styleOnShelvesRepository.getById(req.getStyleId());
        if (null == styleOnShelves) {
            return false;
        }
        if (!req.getPass()) {
            if (Objects.equals(SpotStyleTypeEnum.SPOT_STYLE.getVale(), styleOnShelves.getStyleType())) {
                spotStyleTaskService.onShelvesResult(StyleOnShelvesConvert.convertSpotReview(req));
            } else {
                prototypeService.batchOnShelvesResult(StyleOnShelvesConvert.convertDesignReview(req));
            }
        }
        if (req.getPass()) {
            styleOnShelves.setReviewStatus(StyleOnShelveReviewEnum.REVIEW_PASS.getCode());
            styleOnShelves.setReleaseStatus(StyleOnShelveReleaseStatusEnum.WAIT_RELEASE.getCode());
        } else {
            styleOnShelves.setReviewStatus(StyleOnShelveReviewEnum.REVIEW_NOT_PASS.getCode());
        }
        styleOnShelves.setReviewTime(LocalDateTime.now());
        styleOnShelves.setReviewUserId(SsoContext.userId());
        styleOnShelves.setReviewUserName(SsoContext.username());
        styleOnShelves.setReviewFailReason(req.getReviewFailReason());
        styleOnShelvesRepository.updateById(styleOnShelves);
        return true;
    }


    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean pushShopReview(PushShopReviewReq req) {
        final var styleOnShelves = styleOnShelvesRepository.listByIds(req.getStyleIds());
        if (CollectionUtil.isEmpty(styleOnShelves)) {
            return false;
        }
        final var check = styleOnShelves.stream().allMatch(StyleOnShelves::shopReviewNotPass);
        if (!check) {
            throw new ValidationException("仅店主已驳回状态才能推送店主审核!");
        }
        styleOnShelvesRepository.updatePushShopReview(req.getStyleIds());
        return true;
    }

    @Override
    public void refreshSkcPicture(List<String> styleCodes) {
        final var list = styleOnShelvesRepository.selectDesignTask(styleCodes);
        if (CollectionUtil.isNotEmpty(list)) {
            final var spuIds = list.stream().map(StyleOnShelves::getStyleId).toList();
            final var skcList = skcOnShelvesRepository.selectAllByStyleId(spuIds);
            final var spuMap = BasicConvert.groupingBy(skcList, SkcOnShelves::getStyleId);
            final var pictures = styleOnShelvesPictureRepository.selectByStyleId(spuIds).stream().filter(StyleSkcOnShelvesPicture::spuImage).toList();
            if (CollectionUtil.isNotEmpty(pictures)) {
                pictures.forEach(t->{
                    if (CollectionUtil.isNotEmpty(spuMap) && spuMap.containsKey(t.getStyleId())) {
                        t.setSkcId(spuMap.get(t.getStyleId()).getFirst().getSkcId());
                        t.setPictureType(PictureTypeEnum.MARKETING_IMAGE.getCode());
                    }
                });
                styleOnShelvesPictureRepository.updateBatchById(pictures);
            }
        }
    }


    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean offShelves(Long styleId) {
        log.info("下架请求参数：\t{}", JsonsKt.toJsonPretty(styleId));
        final var styleOnShelves = styleOnShelvesRepository.getById(styleId);
        if (null == styleOnShelves) {
            throw new ValidationException("上架款信息不存在!");
        }
        final var req = new StyleOnShelvesReleaseReq();
        req.setStyleId(styleId);
        req.setReleaseSuccess(false);
        if (Objects.equals(SpotStyleTypeEnum.SPOT_STYLE.getVale(), styleOnShelves.getStyleType())) {
            spotStyleTaskService.releaseResult(req);
        } else {
            prototypeService.releaseResult(req);
        }
        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean releaseResult(StyleOnShelvesReleaseReq req) {
        log.info("发布商品结果请求参数：\t{}", JsonsKt.toJsonPretty(req));
        final var styleOnShelves = styleOnShelvesRepository.getById(req.getStyleId());
        if (null == styleOnShelves) {
            throw new ValidationException("上架款信息不存在!");
        }
        if (styleOnShelves.releaseSuccess()) {
            log.info("商品数据已经发布成功：\t{}", JsonsKt.toJsonPretty(req));
            return true;
        }
        if (styleOnShelves.releaseFail() && !req.getReleaseSuccess()) {
            log.info("商品数据已经发布失败：\t{}", JsonsKt.toJsonPretty(req));
            return true;
        }

        if (req.getReleaseSuccess()) {
            if (Objects.equals(SpotStyleTypeEnum.SPOT_STYLE.getVale(), styleOnShelves.getStyleType())) {
                spotStyleTaskService.releaseResult(req);
            } else {
                prototypeService.releaseResult(req);
                //如果是款式管理的，同步拆板
                final var skcs = prototypeRepository.listByDesignStyleIds(List.of(req.getStyleId()));
                boolean disassemblyFinished = skcs.stream().anyMatch(Prototype::disassemblyFinished);
                if (disassemblyFinished) {
                    productService.patternMaking(List.of(req.getStyleId()));
                }
            }
            styleOnShelves.setReleaseStatus(StyleOnShelveReleaseStatusEnum.RELEASE.getCode());
            styleOnShelves.setReleaseFailReason(null);
        } else {
            styleOnShelves.setReleaseStatus(StyleOnShelveReleaseStatusEnum.RELEASE_FAIL.getCode());
            styleOnShelves.setReleaseFailReason(req.getReleaseFailReason());
        }
        styleOnShelvesRepository.updateById(styleOnShelves);
        return true;
    }

    @Override
    public Boolean releaseProduct(Long styleId) {
        final var styleOnShelves = styleOnShelvesRepository.getById(styleId);
        if (null == styleOnShelves) {
            throw new ValidationException("上架款信息不存在!");
        }
        if (styleOnShelves.canNotReleaseProduct()) {
            return false;
        }
        styleOnShelves.setLatestPushTime(LocalDateTime.now());
        styleOnShelves.setReleaseStatus(StyleOnShelveReleaseStatusEnum.RELEASE_ING.getCode());
        styleOnShelvesRepository.updateById(styleOnShelves);
        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public boolean temuOrderSync(TemuOrderSync req) {
        final var product = req.getProduct();
        if (Objects.isNull(product) || Objects.isNull(product.getStyleId())) {
            return false;
        }
        final var style = styleOnShelvesRepository.getById(product.getStyleId());
        if (null == style) {
            log.info("待上架信息不存在，款号ID：\t{}", JsonsKt.toJsonPretty(product.getStyleId()));
            return false;
        }
        final var skcs = skcOnShelvesRepository.selectAllByStyleId(List.of(style.getStyleId()));
        if (CollectionUtil.isEmpty(skcs)) {
            return false;
        }
        skcs.stream().filter(it -> Objects.equals(it.getSkcId(), req.getSkcId()))
                .forEach(it -> sync(req, it, style));
        return true;
    }


    private void callbackCropTask(final StyleSkcOnShelvesPicture task) {
        if (StringUtils.isNotBlank(task.getCropImgUrl())) {
            return;
        }
        final var vo = AutoCropTaskApi.getByBusIds(List.of(task.getPictureId())).getFirst();
        if (TaskStatusViewEnum.completed(vo.getTaskStatus())) {
            if (StringUtils.isNotBlank(vo.getResImgs())) {
                task.setCropImgUrl(vo.getResImgs());
                styleOnShelvesPictureRepository.updateById(task);
            }
        }
    }

    @RabbitListener(
            id = "sdpCurationPushCropTaskConsumer",
            concurrency = "4-8",
            bindings =
            @QueueBinding(
                    value = @Queue(value = RabbitConstant.PUSH_CROP_TASK_QUEUE, durable = "true", autoDelete = "false"),
                    exchange = @Exchange(value = RabbitConstant.PUSH_CROP_TASK_EXCHANGE),
                    key = RabbitConstant.PUSH_CROP_TASK_ROUTING_KEY))
    @Override
    public void pushTask(Message message, Channel channel) {
        rabbitConsumer.handle(message, channel,
                () -> pushCropTask(message),
                e -> log.error("任务消费失败,{}", e.getLocalizedMessage(), e));
    }

    private void pushCropTask(final Message message) {
        final var dto = BasicConvert.message2DTO(message);
        execOrElse(this.styleOnShelvesPictureRepository.getById(dto.getTaskId()),
                this::pushCrop,
                () -> log.error("任务消费失败【{}】,任务不存在", dto.getTaskId()));
    }

    private void pushCrop(final StyleSkcOnShelvesPicture styleSkcOnShelvesPicture) {
        if (StringUtils.isNotBlank(styleSkcOnShelvesPicture.getCropImgUrl())) {
            log.info("任务已经生成图片信息，主键ID\t{}", styleSkcOnShelvesPicture.getPictureId());
            return;
        }
        final var style = styleOnShelvesRepository.getById(styleSkcOnShelvesPicture.getStyleId());
        if (null == style) {
            log.info("SPU信息不存在，SPU-ID\t{}", styleSkcOnShelvesPicture.getStyleId());
            return;
        }
        log.info("图片裁剪请求信息：\t{}", JsonsKt.toJsonPretty(styleSkcOnShelvesPicture));
        AutoCropTaskApi.create(StyleOnShelvesConvert.buildPushCropTaskReq(styleSkcOnShelvesPicture, style));
    }

    @Override
    public void test() {
        final var style = this.styleOnShelvesRepository.getById(7398989140219621381L);
        final var skcs = this.skcOnShelvesRepository.listByIds(List.of(7398989140261564426L, 7398989140261564428L));
        this.skus(style, skcs);
    }

    private List<SkcOnShelves> onShelves(final List<SkcOnShelves> skcs) {
        final var data = new ArrayList<SkcOnShelves>();
        if (CollectionUtil.isEmpty(skcs)) {
            return data;
        }
        skcs.forEach(it -> {
            it.setRevisedTime(LocalDateTime.now());
            final var skc = this.skcOnShelvesRepository.getById(it.getSkcId());
            if (skc != null) {
                this.skcOnShelvesRepository.updateById(it);
            } else {
                data.add(it);
                this.skcOnShelvesRepository.save(it);
            }
        });
        return data;
    }

    private void skus(final StyleOnShelves style, final List<SkcOnShelves> skcs) {
        if (CollectionUtil.isEmpty(skcs)) {
            return;
        }
        final var sizes = this.gradingSize();
        if (CollectionUtil.isEmpty(sizes)) {
            return;
        }
        final var skus = new ArrayList<SkuGrading>();
        skcs.forEach(it -> skus.addAll(StyleOnShelvesConvert.skus(style, it, sizes)));
        if (CollectionUtil.isNotEmpty(skus)) {
            this.skuGradingRepository.saveBatch(skus, skus.size());
        }
    }

    private void sync(final TemuOrderSync req, final SkcOnShelves skc, final StyleOnShelves style) {
        try {
            req.setSpuCode(style.getStyleCode());
            req.setSkcId(skc.getSkcId());
            if (Objects.equals(SpotStyleTypeEnum.SPOT_STYLE.getVale(), style.getStyleType())) {
                spotStyleTaskService.temuSync(req);
            } else {
                prototypeService.temuOrderSync(req);
            }
        } catch (Exception e) {
            log.error("同步动销SKC,\t{},失败\t{}", skc.getSkcCode(), e.getLocalizedMessage(), e);
        }
    }

    private List<GradingSize> gradingSize() {
        return gradingSizeRepository.list();
    }
}
