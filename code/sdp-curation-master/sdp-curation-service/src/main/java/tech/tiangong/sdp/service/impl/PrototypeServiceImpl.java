package tech.tiangong.sdp.service.impl;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.date.DatePattern;
import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.SecureUtil;
import com.baomidou.mybatisplus.core.toolkit.Assert;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.rabbitmq.client.Channel;
import com.zjkj.scf.notification.sdk.dto.feishu.req.FeishuContentItemReq;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.Exchange;
import org.springframework.amqp.rabbit.annotation.Queue;
import org.springframework.amqp.rabbit.annotation.QueueBinding;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.aikero.admin.common.vo.AttributeVo;
import team.aikero.admin.common.vo.DictVo;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.core.protocol.PageVo;
import team.aikero.blade.sequence.id.IdHelper;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.butted.common.enums.TaskStatusEnum;
import tech.tiangong.butted.common.vo.MulfeatExtractTaskVo;
import tech.tiangong.datagroup.cyxf.repository.TemuOrderRepository;
import tech.tiangong.sdp.amqp.DesignStyleMessageDTO;
import tech.tiangong.sdp.amqp.RabbitConstant;
import tech.tiangong.sdp.amqp.SpotTaskMessageDTO;
import tech.tiangong.sdp.amqp.TaskMessageDTO;
import tech.tiangong.sdp.common.req.AiTaskCallbackReq;
import tech.tiangong.sdp.common.req.DisassemblyFinishedNotifyInnerReq;
import tech.tiangong.sdp.common.req.PrototypeBatchCancelReq;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.convert.DesignImageConvert;
import tech.tiangong.sdp.convert.PrototypeConverter;
import tech.tiangong.sdp.entity.*;
import tech.tiangong.sdp.enums.*;
import tech.tiangong.sdp.external.*;
import tech.tiangong.sdp.repository.*;
import tech.tiangong.sdp.service.*;
import tech.tiangong.sdp.util.StreamUtil;
import tech.tiangong.sdp.utils.SsoContext;
import tech.tiangong.sdp.utils.UserInvoke;
import tech.tiangong.sdp.vo.dto.DesignImageDTO;
import tech.tiangong.sdp.vo.dto.DesignStyleUpdateDto;
import tech.tiangong.sdp.vo.dto.DesignerDTO;
import tech.tiangong.sdp.vo.dto.FeishuMessageDTO;
import tech.tiangong.sdp.vo.query.PrototypeQuery;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.*;

import javax.validation.ValidationException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Consumer;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

/**
 * 设计款管理-服务
 *
 * @author cenlijin
 * @since 2021-08-09 14:43:18
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PrototypeServiceImpl extends DefaultTaskServiceImpl implements PrototypeService {

    private final DesignStyleRepository designStyleRepository;
    private final DesignStyleMaterialRepository designStyleMaterialRepository;
    private final PrototypeMaterialRepository prototypeMaterialRepository;
    private final DevelopStyleTaskBomOrderRepository developStyleTaskBomOrderRepository;
    private final PrototypeRepository prototypeRepository;
    private final PrototypeDetailRepository prototypeDetailRepository;
    private final PrototypeHistoryRepository prototypeHistoryRepository;
    private final DesignLogService designLogService;
    private final DevelopStyleTaskRepository developStyleTaskRepository;
    private final PlmSdpStyleRelaRepository plmSdpStyleRelaRepository;
    private final PlmDesignStyleRemoteHelper plmDesignStyleRemoteHelper;
    private final PlmStyleLogRepository plmStyleLogRepository;
    private final TemuOrderSyncRepository temuOrderSyncRepository;
    private StyleOnShelvesService styleOnShelvesService;
    private final SkuInfoRemoteHelper skuInfoRemoteHelper;
    private final StyleSkcSkuRepository styleSkcSkuRepository;
    private final SpotStyleSkcRepository spotStyleSkcRepository;
    private ProductService productService;
    private final ShopRepository shopRepository;
    private final MulfeatExtractTaskRepository mulfeatExtractTaskRepository;
    private final DesignImageService designImageService;
    private final SkcImageVectorRepository skcImageVectorRepository;
    private final ProductRepository productRepository;
    private final ProductSkcRepository productSkcRepository;
    final static Integer PROTOTYPE_MATERIAL_PICTURE_COUNT = 10;
    private final static int BATCH_SIZE = 300;
    private final TemuOrderRepository temuOrderRepository;
    private final FeishuService feishuService;

    @Autowired
    public void setStyleOnShelvesService(@Lazy StyleOnShelvesService styleOnShelvesService, @Lazy ProductService productService) {
        this.styleOnShelvesService = styleOnShelvesService;
        this.productService = productService;
    }

    private final static String LOCK_KEY = "sdp-curation:plm:pull:style:code:";
    private final Map<String, Consumer<PlmStyleLog>> PUSH_LOG = new HashMap<>();

    @Override
    public PageVo<PrototypeQueryResp> page(PrototypeQuery queryDTO) {
        queryDesigner(queryDTO);
        if (queryDTO.getEmpty() || isCraft(queryDTO) || isMaterialSearch(queryDTO)) {
            return new PageVo<>();
        }
        queryDTO.setTenantId(SsoContext.tenantId());
        final var page = this.prototypeRepository.listQuery(queryDTO);
        //条件分页查询
        if (Objects.isNull(page) || CollectionUtil.isEmpty(page.getRecords())) {
            return new PageVo<>();
        }
        List<PrototypeQueryResp> list = page.getRecords();
        List<Long> prototypeIds = list.stream().map(PrototypeQueryResp::getPrototypeId).distinct().collect(Collectors.toList());

        //SPU信息
        List<Long> styleIdsList = list.stream().map(PrototypeQueryResp::getDesignStyleId).distinct().collect(Collectors.toList());
        List<DesignStyle> styleList = designStyleRepository.listByIds(styleIdsList);
        final var materials = prototypeMaterialRepository.listBySkcIds(prototypeIds);
        Map<Long, List<PrototypeMaterial>> materialMap = materials.stream().collect(Collectors.groupingBy(PrototypeMaterial::getPrototypeId));

        List<DesignerDTO> designerList = selectByDesignerIds(list.stream().map(PrototypeQueryResp::getDesignerId).toList());
        final Map<Long, List<DesignerDTO>> designerMap = BasicConvert.groupingBy(designerList, DesignerDTO::getDesignerId);

        return BasicConvert.pageVo(page, resp -> PrototypeConverter.buildPageList(resp, styleList, materialMap, designerMap));

    }

    private boolean isCraft(PrototypeQuery queryDTO) {
        return null != queryDTO && Objects.equals(queryDTO.getIsCraft(), Bool.YES.getCode());
    }

    private boolean isMaterialSearch(PrototypeQuery queryDTO) {
        return null != queryDTO && Objects.equals(queryDTO.getMaterialSearchState(), Bool.YES.getCode());
    }

    private void queryDesigner(PrototypeQuery queryDTO) {
        final var designerIds = new HashSet<Long>();
        queryDTO.setDesignerIds(designerIds);
        if (CollectionUtil.isNotEmpty(queryDTO.getDesignerGroupCodeList())) {
            final var ids = SdpMaterialDesignerApi.listDesignerGroupCodes(queryDTO.getDesignerGroupCodeList());
            setDesignerIds(designerIds, ids, queryDTO);
        }
        if (Objects.equals(Bool.YES, queryDTO.getSameGroup())) {
            final var ids = SdpMaterialDesignerApi.listDesignerIds();
            setDesignerIds(designerIds, ids, queryDTO);
        }
        // 同组包含优先创建人
        if (CollectionUtil.isNotEmpty(queryDTO.getDesignerIdList()) && !queryDTO.getEmpty()) {
            Set<Long> creatorSet = new HashSet<>(queryDTO.getDesignerIdList());
            queryDTO.setDesignerIds(creatorSet);
        } else if (CollectionUtil.isNotEmpty(queryDTO.getDesignerIdList())) {
            Set<Long> creatorSet = new HashSet<>(queryDTO.getDesignerIdList());
            designerIds.addAll(creatorSet);
        }
        queryDTO.setDesignerIds(designerIds);
    }

    private void setDesignerIds(HashSet<Long> designerIds, List<Long> ids, PrototypeQuery queryDTO) {
        if (CollectionUtil.isNotEmpty(ids)) {
            designerIds.addAll(ids);
            // 同组不包含为空
            if (CollectionUtil.isNotEmpty(queryDTO.getDesignerIdList())) {
                boolean notInSameGroup = !new HashSet<>(ids).containsAll(queryDTO.getDesignerIdList());
                queryDTO.setEmpty(notInSameGroup);
            }
        } else {
            queryDTO.setEmpty(Boolean.TRUE);
        }
    }


    /**
     * 设计款详情基础新 spu + skc
     */
    @Override
    public PrototypeTagVo spuSkcInfo(Long prototypeId) {
        Prototype prototype = prototypeRepository.getById(prototypeId);
        if (null == prototype) {
            throw new ValidationException("设计款不存在!");
        }
        PrototypeDetail prototypeDetail = prototypeDetailRepository.getByPrototypeId(prototypeId);
        if (null == prototypeDetail) {
            throw new ValidationException("设计款详情不存在!!");
        }
        PrototypeTagVo respVo = new PrototypeTagVo();

        //spu信息
        DesignStyle style = designStyleRepository.getById(prototype.getDesignStyleId());
        if (null == style) {
            throw new ValidationException("spu信息不存在! ");
        }
        DesignStyleVo styleVo = new DesignStyleVo();
        BeanUtils.copyProperties(style, styleVo);
        respVo.setStyleInfo(styleVo);

        //skc信息
        PrototypeVo prototypeVo = this.getPrototypeVo(prototype);
        PrototypeInfoVo prototypeInfoVo = new PrototypeInfoVo();
        BeanUtils.copyProperties(prototypeVo, prototypeInfoVo);

        prototypeInfoVo.setReferenceDesignCode(prototype.getReferenceDesignCode());
        prototypeInfoVo.setColorInfoList(prototypeDetail.getColorInfoList());
        final var materials = prototypeMaterialRepository.listBySkcIds(List.of(prototypeVo.getPrototypeId()));
        if (CollectionUtil.isNotEmpty(materials)) {
            List<PrototypeVo.PrototypeMaterialInfo> materialInfoList = materials.stream().map(m -> BeanUtil.copyProperties(m, PrototypeVo.PrototypeMaterialInfo.class)).collect(Collectors.toList());
            prototypeInfoVo.setMaterialInfo(materialInfoList);
        }
        if (null != style.getSourceBusinessId() && StrUtil.equalsIgnoreCase(DesignStyleSourceTypeEnum.DEVELOP_STYLE.getCode(), style.getTaskSource())) {
            final var boms = developStyleTaskBomOrderRepository.listByTaskIds(List.of(style.getSourceBusinessId()));
            prototypeInfoVo.setBomList(PrototypeConverter.bomConvert(boms));
            final var developStyleTask = developStyleTaskRepository.getById(style.getSourceBusinessId());
            if (null != developStyleTask) {
                prototypeInfoVo.setPatternPictureId(developStyleTask.getPatternPictureId());
                prototypeInfoVo.setPatternPictureUrl(developStyleTask.getPatternPictureUrl());
            }
        }
        respVo.setPrototypeInfo(prototypeInfoVo);
        return respVo;
    }


    @Override
    @Transactional(rollbackFor = Exception.class)
    public NormalSkcCreateResp normalSkcCreate(DesignStyle designStyle) {
        log.info("创建SPU时创建正常打版SKC-入参:\t{}", JsonsKt.toJsonPretty(designStyle));
        String styleCode = designStyle.getStyleCode();
        long prototypeId = IdHelper.getId();
        //SKC生成逻辑：SPU+2色号流水; 正常打版就是spu+01
        //String designCode = styleCode + "01";
        String designCode = null;

        Prototype prototype = new Prototype();
        BeanUtils.copyProperties(designStyle, prototype);
        prototype.setPrototypeId(prototypeId);
        prototype.setDesignCode(designCode);
        prototype.setDesignStyleId(designStyle.getDesignStyleId());
        prototype.setSpuCreatedTime(LocalDateTime.now());
        prototype.setTaskSource(designStyle.getTaskSource());

        SpuCreateSkcReq createSkcReq = SpuCreateSkcReq.builder().skcTypeEnum(SkcTypeEnum.NORMAL).qualityLevel(designStyle.getQualityLevelName()).qualityLevelCode(designStyle.getQualityLevelCode()).build();
        this.createFirstVersionSkc(prototype, createSkcReq);

        log.info("=== SPU创建正常打版SKC成功:designCode={}; prototypeId={}; styleCode:{}; sourceType:{} ====", designCode, prototypeId, designStyle.getStyleCode(), designStyle.getTaskSource());

        return new NormalSkcCreateResp().setStyleCode(styleCode).setPrototypeId(prototypeId).setDesignCode(designCode);
    }

    @Override
    public void updateSpuInfoWithinHistory(DesignStyleUpdateDto updateDto) {
        //根据spuCode更新所有prototype表与prototype_history表中SPU维度的信息

        Long styleId = updateDto.getDesignStyleId();

        //1,查询styleCode下的版单, 历史版单, 版单详情
        List<Prototype> prototypeList = prototypeRepository.getListByDesignStyleId(styleId);
        if (CollectionUtil.isEmpty(prototypeList)) {
            throw new ValidationException("spu信息不存在! ");
        }

        List<PrototypeHistory> prototypeHistoryList = prototypeHistoryRepository.getListByStyleId(styleId);
        if (CollectionUtil.isEmpty(prototypeHistoryList)) {
            throw new ValidationException("设计款版本信息不存在! ");
        }
        List<Long> prototypeIdList = prototypeHistoryList.stream().map(PrototypeHistory::getPrototypeId).collect(Collectors.toList());

        List<PrototypeDetail> detailList = prototypeDetailRepository.getListByPrototypeIds(prototypeIdList);
        if (CollectionUtil.isEmpty(detailList)) {
            throw new ValidationException("设计款详情不存在! ");
        }

        //2,更新prototype与prototype_history表中的款式品类信息
        String category = updateDto.getCategoryCode();
        String categoryName = updateDto.getCategoryName();
        List<Prototype> prototypeUpdateList = prototypeList.stream().map(item -> {
            Prototype updatePrototype = new Prototype();
            updatePrototype.setPrototypeId(item.getPrototypeId());
            updatePrototype.setCategoryCode(category);
            updatePrototype.setCategoryName(categoryName);
            return updatePrototype;
        }).collect(Collectors.toList());
        prototypeRepository.editBatchById(prototypeUpdateList);

        List<PrototypeHistory> prototypeHistoryUpdateList = prototypeHistoryList.stream().map(item -> {
            PrototypeHistory updatePrototype = new PrototypeHistory();
            updatePrototype.setHistoryId(item.getHistoryId());
            updatePrototype.setPrototypeId(item.getPrototypeId());
            updatePrototype.setCategoryCode(category);
            updatePrototype.setCategoryName(categoryName);
            return updatePrototype;
        }).collect(Collectors.toList());
        prototypeHistoryRepository.updateBatchById(prototypeHistoryUpdateList);
    }


//    @RabbitListener(
//            id = "sdpCurationPushPullPlmStyleCodeConsumer",
//            concurrency = "4-8",
//            ackMode = "MANUAL",
//            bindings = @QueueBinding(
//                    value = @Queue(value = RabbitConstant.PULL_PLM_STYLE_CODE_QUEUE, durable = "true", autoDelete = "false"),
//                    exchange = @Exchange(value = RabbitConstant.PULL_PLM_STYLE_CODE_EXCHANGE),
//                    key = RabbitConstant.PULL_PLM_STYLE_CODE_ROUTING_KEY
//            )
//    )
//    public void pullPlmTask(Message message, Channel channel) throws IOException {
//        long deliveryTag = message.getMessageProperties().getDeliveryTag();
//        try {
//            ObjectMapper objectMapper = new ObjectMapper();
//            DesignStyleCreateSendMqReq req = objectMapper.readValue(message.getBody(), DesignStyleCreateSendMqReq.class);
//            log.info("拉取PLM style-code 消息入参, deliveryTag={}:\t{}", deliveryTag, JsonsKt.toJsonPretty(req));
//            getCodeByPlm(req);
//            channel.basicAck(deliveryTag, false);
//        } catch (Exception e) {
//            log.error("拉取PLM style-code 消息消费失败, deliveryTag={}", deliveryTag, e);
//            channel.basicNack(deliveryTag, false, false);
//        }
//    }


    @Override
    public void getCodeByPlm(DesignStyleCreateSendMqReq req) {
        UserInvoke.INSTANCE.doAction(Objects.requireNonNull(req.getCreatorId()), Objects.requireNonNull(req.getCreatorName()), Objects.requireNonNull(req.getTenantId()), () -> {
            pullPlmStyleCode(req);
            return true;
        });
    }


    private void pullPlmStyleCode(final DesignStyleCreateSendMqReq task) {
//        lock(LOCK_KEY + "push" + task.getDesignStyleId(), 90L, () -> {
//            Long designStyleId = task.getDesignStyleId();
//            log.info("款式管理请求PLM处理编码开始:{}", designStyleId);
//            final var style = designStyleRepository.getById(task.getDesignStyleId());
//            if (null == style) {
//                log.error("SPU信息不存在【{}】", designStyleId);
//                return;
//            }
//            final var skcList = prototypeRepository.getListByDesignStyleId(designStyleId);
//            if (CollectionUtil.isEmpty(skcList)) {
//                log.error("SKC信息不存在【{}】，SPU主键ID：", designStyleId);
//                return;
//            }
//
//            // 生成关联关系
//            final var relaPair = PrototypeConverter.buildRela(style, skcList);
//            final var spuRela = relaPair.getLeft();
//            final var skcRela = relaPair.getRight();
//            List<PlmSdpStyleRela> allRelaList = List.of(spuRela, skcRela);
//            plmSdpStyleRelaRepository.saveBatch(allRelaList);
//            try {
//                final var req = PrototypeConverter.buildPullPlmStyleCode(style.getDesignStyleId(), null, true, 1);
//                final var resp = plmDesignStyleRemoteHelper.batchGenerate(req);
//                checkCodeGenerateResp(resp);
//                final var respSpu = resp.getSpuCodes().getFirst().getStyleCode();
//                final var respSkc = resp.getSpuCodes().getFirst().getDesignCodes().getFirst();
//                // 更新关联关系
//                spuRela.setPlmTaskCode(respSpu);
//                skcRela.setPlmTaskCode(respSkc);
//                setRelaStatus(allRelaList, PushPlmStatusEnum.COMPLETED);
//
//                // 更新业务数据
//                updateBusinessData(style, skcList, respSpu, respSkc);
//            } catch (Exception e) {
//                // 设置失败状态
//                setRelaStatus(allRelaList, PushPlmStatusEnum.FAIL);
//                log.error("批量样衣编号生成（SPU和SKC）失败，SPU主键ID【{}】-失败信息\t{}", designStyleId, e.getLocalizedMessage(), e);
//            } finally {
//                // 批量更新关联关系
//                plmSdpStyleRelaRepository.updateBatchById(allRelaList);
//            }
//        });
    }

    /**
     * 设置关联关系状态

     private void setRelaStatus(List<PlmSdpStyleRela> relaList, PushPlmStatusEnum status) {
     relaList.forEach(t -> {
     t.setPullCount(1);
     t.setTaskStatus(status.getCode());
     });
     }
     */
    /**
     * 更新业务数据
     * <p>
     * private void updateBusinessData(DesignStyle style, List<Prototype> skcList, String respSpu, String respSkc) {
     * // 更新SPU
     * style.setStyleCode(respSpu);
     * designStyleRepository.updateById(style);
     * <p>
     * // 更新SKC列表，目前只有一个skc
     * skcList.forEach(t -> {
     * t.setDesignCode(respSkc);
     * t.setStyleCode(respSpu);
     * });
     * prototypeRepository.updateBatchById(skcList);
     * <p>
     * //更新营销图
     * final var materialList = designStyleMaterialRepository.listByStyleIds(List.of(style.getDesignStyleId()));
     * if (CollectionUtil.isNotEmpty(materialList)) {
     * materialList.forEach(t -> t.setStyleCode(respSpu));
     * designStyleMaterialRepository.updateBatchById(materialList);
     * }
     * if (StringUtils.isNotBlank(style.getTaskSource()) && DesignStyleSourceTypeEnum.DEVELOP_STYLE_TASK.getCode().equals(style.getTaskSource())) {
     * final var developStyleTask = developStyleTaskRepository.getById(style.getSourceBusinessId());
     * if (null != developStyleTask) {
     * // 开款更新任务
     * developStyleTask.setSpuCode(respSpu);
     * developStyleTaskRepository.updateById(developStyleTask);
     * }
     * <p>
     * }
     * <p>
     * }
     */
    @Transactional(rollbackFor = Exception.class)
    @Override
    public PrototypeSubmitVo save(PrototypeOperateReq prototypeReq, boolean fromDevelop) {
        log.info("拆板提交-请求参数 req:{}", JsonsKt.toJsonPretty(prototypeReq));
        Prototype prototype = prototypeRepository.getById(prototypeReq.getPrototypeId());
        Long designStyleId = prototype.getDesignStyleId();
        //默认选中SPU中维护的尺码组且不允许更改尺码组，用户可选择该尺码组下的尺码信息
        DesignStyle designStyle = designStyleRepository.getById(designStyleId);
        if (!Objects.equals(prototypeReq.getSizeStandardCode(), designStyle.getSizeStandardCode())) {
            throw new ValidationException(" 尺码组要与SPU一致!");
        }
        final var skcList = prototypeRepository.getListByDesignStyleId(designStyleId);
        validationUpdate(prototypeReq, skcList);

        //更新商品标签
        materialChange(designStyle, prototype, prototypeReq, new HashMap<>());
        final var pics = prototypeMaterialRepository.listBySkcIds(List.of(prototype.getPrototypeId()));

        prototypeMaterialRepository.deletedBySkcIds(List.of(prototype.getPrototypeId()));
        //更新SPU材料信息
        if (CollectionUtil.isNotEmpty(prototypeReq.getMaterialInfo())) {
            final var materialList = PrototypeConverter.buildMaterialInfo(prototypeReq.getMaterialInfo(), prototype);
            if (CollectionUtil.isNotEmpty(materialList)) {
                prototypeMaterialRepository.saveBatch(materialList);
            }
            prototype.setMaterialList(materialList);
        }
        //保存SKC信息
        this.updatePrototypeSave(prototypeReq, prototype, fromDevelop);
        designStyle.setSkcs(List.of(prototype));
        if (!fromDevelop) {
            final var updatePics = prototypeReq.getMaterialInfo().stream().filter(t -> t.getMaterialType() == 0)
                    .map(PrototypeOperateReq.PrototypeMaterialInfo::getMaterialUrl).toList();
            final var originaPics = pics.stream().filter(t -> t.getMaterialType() == 0)
                    .map(PrototypeMaterial::getMaterialUrl).toList();
            if (CollectionUtil.isNotEmpty(updatePics)) {
                final var skcImageMd5 = skcImageMd5(updatePics);
                // 图片MD5不相等
                if (!StrUtil.equalsIgnoreCase(skcImageMd5, skcImageMd5(originaPics))) {
                    buttedTask(designStyle);
                }
            }
        }
        return new PrototypeSubmitVo().setPrototypeId(prototype.getPrototypeId());
    }

    private void buttedTask(DesignStyle designStyle) {
        log.info("款式开始请求butted创建向量信息：\t{}", JsonsKt.toJsonPretty(designStyle));
        final var list = PrototypeConverter.obtainMulfeatExtract(designStyle);
        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        log.info("款式满足请求butted创建向量信息");
        mulfeatExtractTaskRepository.saveBatch(list, list.size());
        final var dto = new DesignStyleMessageDTO();
        dto.setType(DesignStyleMessageEnum.BUTTED.getCode());
        dto.setTaskId(designStyle.getDesignStyleId());
        this.send(designStyle, JsonsKt.toJson(dto), RabbitConfigEnum.PUSH_MULFEAT_EXTRACT_TASK);
        log.info("款式管理请求butted创建向量信息发送MQ成功");
    }

    @Override
    public Boolean materialChange(DesignStyle designStyle, Prototype prototype, PrototypeOperateReq prototypeReq, Map<Long, List<PrototypeMaterial>> originalImageMap) {
        if (null == designStyle) {
            return false;
        }
        List<PrototypeMaterial> materialList;
        if (!originalImageMap.isEmpty()) {
            materialList = originalImageMap.get(prototype.getPrototypeId());
            if (materialList == null) {
                materialList = prototypeMaterialRepository.listBySkcIds(List.of(prototype.getPrototypeId()));
            }
        } else {
            materialList = prototypeMaterialRepository.listBySkcIds(List.of(prototype.getPrototypeId()));
        }
        if (CollectionUtil.isNotEmpty(materialList)) {
            final var images = materialList.stream().filter(t -> t.getMaterialType() == 0).toList();
            final var reqImages = prototypeReq.getMaterialInfo().stream().filter(t -> t.getMaterialType() == 0).toList();
            final var skcImageMd5 = skcImageMd5(images.stream().map(PrototypeMaterial::getMaterialUrl).toList());
            final var reqSkcImageMd5 = skcImageMd5(reqImages.stream().map(PrototypeOperateReq.PrototypeMaterialInfo::getMaterialUrl).toList());
            // 图片MD5不相等
            if (!StrUtil.equalsIgnoreCase(skcImageMd5, reqSkcImageMd5)) {
                addProductUpdate(designStyle);
                return true;
            }
            final var videos = materialList.stream().filter(t -> t.getMaterialType() == 1).toList();
            final var reqVideos = prototypeReq.getMaterialInfo().stream().filter(t -> t.getMaterialType() == 1).toList();
            if (videos.size() != reqVideos.size()) {
                addProductUpdate(designStyle);
                return true;
            }
            if (CollectionUtil.isNotEmpty(videos) && CollectionUtil.isNotEmpty(reqVideos) && !Objects.equals(videos.getFirst(), reqVideos.getFirst())) {
                addProductUpdate(designStyle);
                return true;
            }
        }
        return true;
    }

    private String skcImageMd5(final List<String> skcImageUrls) {
        if (CollectionUtil.isEmpty(skcImageUrls)) {
            return "";
        }
        return SecureUtil.md5(String.join(StrUtil.COMMA, skcImageUrls));
    }

    private void addProductUpdate(final DesignStyle style) {
        try {
            styleOnShelvesService.addProductUpdateTag(style.getDesignStyleId());
        } catch (Exception e) {
            log.error("款式管理-更新标签失败\t{}\t{}", style.getDesignStyleId(), e.getLocalizedMessage(), e);
        }
    }

    private static Set<String> splitColor(String color) {
        if (StringUtils.isBlank(color)) {
            return Collections.emptySet();
        }
        return Arrays.stream(color.split("、")).map(String::trim).filter(StringUtils::isNotBlank).collect(Collectors.toSet());
    }

    private void validationUpdate(PrototypeOperateReq prototypeReq, List<Prototype> skcList) {
        final var notCurrent = skcList.stream().filter(it -> !it.getPrototypeId().equals(prototypeReq.getPrototypeId())).toList();
        Set<String> inputColors = splitColor(prototypeReq.getColor());
        for (Prototype skc : notCurrent) {
            Set<String> existColors = splitColor(skc.getColor());
            if (existColors.equals(inputColors)) {
                throw new ValidationException("存在颜色重复的SKC,请勿重复创建！");
            }
        }
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Long colorsMaking(ColorsMakingReq req) {
        validation();
        Long prototypeId = req.getPrototypeId();

        //校验当前SPU的正常打版SKC是否完成设计款信息提交
        Prototype prototype = prototypeRepository.getById(prototypeId);
        validateColorsMaking(prototype);

        List<Prototype> prototypeList = prototypeRepository.getListByStyleCode(prototype.getStyleCode());

        //正常款的SKC
        Prototype normalSkc = prototypeList.stream().filter(item -> Objects.equals(item.getSkcType(), SkcTypeEnum.NORMAL.getCode())).findFirst().orElse(null);
        if (null == normalSkc) {
            throw new ValidationException("正常款skc不存在, designCode【" + prototype.getDesignCode() + "】");
        }

        //若正常打版SKC未提交设计款信息时，则提示【请先操作SKC XXXXXXXX提交设计款信息后再进行复色】
        boolean isSubmit = Objects.equals(PrototypeStatusEnum.DECOMPOSED.getCode(), normalSkc.getPrototypeStatus());
        if (!isSubmit) {
            throw new ValidationException("请先操作提交设计款信息后再进行复色,designCode" + prototype.getDesignCode());
        }

        //若已提交则允许创建复色SKC
        Long colorMakePrototypeId = this.colorsMakingCreate(prototypeId);
        log.info("设计款管理-复色-成功: prototypeId:{}; colorMakePrototypeId{}", prototypeId, colorMakePrototypeId);

        return colorMakePrototypeId;
    }

    private void validation() {
        designer();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long colorsMakingCreate(Long normalPrototypeId) {
        Prototype prototype = prototypeRepository.getById(normalPrototypeId);
        DesignStyle designStyle = designStyleRepository.getByStyleCode(prototype.getStyleCode());
        if (null == designStyle) {
            throw new ValidationException("SPU信息不存在!");
        }
        PrototypeDetail prototypeDetail = prototypeDetailRepository.getByPrototypeId(prototype.getPrototypeId());
        if (null == prototypeDetail) {
            throw new ValidationException("版单详情不存在!!");
        }
        var currentUser = SsoContext.user();
        long colorPrototypeId = IdHelper.getId();
        List<DesignerDTO> currentDesigner = selectByDesignerIds(List.of(SsoContext.user().getId()));
        Prototype colorPrototype = PrototypeConverter.buildColorsPrototype(prototype, currentUser.getId(), currentDesigner.getFirst(), colorPrototypeId, null);
        SpuCreateSkcReq createSkcReq = SpuCreateSkcReq.builder().skcTypeEnum(SkcTypeEnum.COMPOUND_COLORS).qualityLevel(designStyle.getQualityLevelName()).qualityLevelCode(designStyle.getQualityLevelCode()).build();
        //创建skc
        this.createFirstVersionSkc(colorPrototype, createSkcReq);
        final var skcLog = PrototypeConverter.obtainLog(prototype.getDesignStyleId());
        skcLog.setSkcId(colorPrototype.getPrototypeId());
        skcLog.setLogType(PlmStyleLogTypeEnum.SKC_CODE.getCode());
        //更新关联关系
        final var rela = PrototypeConverter.buildSkcRela(colorPrototypeId, designStyle);
        rela.setLogId(skcLog.getLogId());
        plmSdpStyleRelaRepository.save(rela);
        plmStyleLogRepository.save(skcLog);
        pushPlmLog(skcLog);
        return colorPrototypeId;
    }

//    private void checkCodeGenerateResp(ClothingCodeBatchGenerateResp resp) {
//        final var spuCodes = resp.getSpuCodes();
//        if (CollectionUtil.isEmpty(spuCodes)) {
//            throw new ValidationException("返回SPU数组信息为空！");
//        }
//        spuCodes.forEach(t -> {
//            if (CollectionUtil.isEmpty(t.getDesignCodes())) {
//                throw new ValidationException("返回SKC数组信息为空，SPU编码：" + t.getStyleCode());
//            }
//        });
//    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void designerChange(ChgDesignerReq req) {
        DesignerRemoteReq designerRemoteReq = new DesignerRemoteReq();
        designerRemoteReq.setDesignerId(String.valueOf(req.getDesignerId()));
        final var designerList = selectByDesignerIds(List.of(req.getDesignerId()));
        if (CollectionUtil.isEmpty(designerList)) {
            throw new ValidationException("不存在此设计师");
        }
        List<Long> prototypeIdList = req.getPrototypeIdList();
        List<Prototype> prototypeList = new ArrayList<>();
        List<Prototype> prototypes = prototypeRepository.listByIds(prototypeIdList);
        Map<Long, Prototype> prototypeMap = StreamUtil.list2Map(prototypes, Prototype::getPrototypeId);
        for (Long id : prototypeIdList) {
            Prototype prototype = prototypeMap.get(id);
            Assert.notNull(prototype, "不存在此设计款号信息，主键ID:{}", id);
            if (prototype.getIsCanceled()) {
                throw new ValidationException("当前设计款号已取消!");
            }

            final var designerDTO = designerList.get(0);
            String quoteDesignerName = prototype.getDesignerName();
            Prototype updatePrototype = new Prototype();
            updatePrototype.setPrototypeId(prototype.getPrototypeId());
            updatePrototype.setDesignerId(req.getDesignerId());
            updatePrototype.setDesignerCode(designerDTO.getDesignerCode());
            updatePrototype.setDesignerName(designerDTO.getDesignerName());
            prototypeList.add(updatePrototype);
            DesignLogReq logSimpleReq = DesignLogReq.builder().designCode(prototype.getDesignCode()).bizId(prototype.getPrototypeId()).bizType(DesignLogBizTypeEnum.DESIGN_PROTOTYPE).content("将设计师" + quoteDesignerName + "变更为" + designerDTO.getDesignerName()).build();
            designLogService.create(logSimpleReq);
            Assert.isTrue(prototypeRepository.updateBatchById(prototypeList), "设计师变更失败！");
        }
    }


    @Override
    @Transactional(rollbackFor = Exception.class)
    public PrototypeVo cancelDesign(PrototypeCancelReq cancelReq) {
        Long prototypeId = cancelReq.getPrototypeId();
        PrototypeVo prototype = this.getById(prototypeId);
        Assert.notNull(prototype, "找不到设计款信息! ");
        Assert.isFalse(prototype.getIsCanceled(), "该设计款已取消! ");

        var currentUser = SsoContext.user();
        String currentUserBbCode = currentUser.getCode();

        //1,取消设计款
        cancelPrototype(prototypeId, cancelReq, currentUserBbCode, true);
        //6, 添加日志
        addPrototypeLog(prototypeId, prototype.getDesignCode(), prototype.getVersionNum(), "取消SKC: " + cancelReq.getCancelReason());

        //取消通知PLM
        notifyPlmCancel(prototype);

        return prototype;
    }

    private void notifyPlmCancel(PrototypeVo prototype) {
//        final var req = PrototypeConverter.buildNotifyPlmCancelReq(cancelReq, prototype);
//        plmDesignStyleRemoteHelper.batchCancelSkc(req);
        // canPushSpuSkcToPlm
        final var skc = prototypeRepository.getById(prototype.getPrototypeId());
        if (!skc.canPlmCancel()) {
            return;
        }
        this.pushLog(skc, PlmStyleLogTypeEnum.CANCEL);
    }

    private void addPrototypeLog(Long bizId, String designCode, Integer bizVersionNum, String content) {
        DesignLogReq designLogReq = DesignLogReq.builder().bizId(bizId).bizType(DesignLogBizTypeEnum.DESIGN_PROTOTYPE).bizVersionNum(bizVersionNum).content(content).designCode(designCode).build();
        designLogService.create(designLogReq);
    }

    public void cancelPrototype(Long prototypeId, PrototypeCancelReq cancelReq, String currentUserBbCode, boolean inner) {
        Prototype prototype = prototypeRepository.getById(prototypeId);
        if (Objects.isNull(prototype)) {
            return;
        }
        Prototype update = new Prototype();
        update.setPrototypeId(prototypeId);
        update.setIsCanceled(true);
        update.setCancelTime(LocalDateTime.now());

        //取消设计款
        prototypeRepository.updateById(update);

        PrototypeHistory canclePrototypeHistory = new PrototypeHistory();
        canclePrototypeHistory.setIsCanceled(true);
        canclePrototypeHistory.setCancelTime(LocalDateTime.now());
        canclePrototypeHistory.setReviserId(SsoContext.userId());
        canclePrototypeHistory.setReviserName(SsoContext.username());
        canclePrototypeHistory.setRevisedTime(LocalDateTime.now());
        //取消设计款历史表
        prototypeHistoryRepository.updateByPrototypeId(prototype.getPrototypeId(), canclePrototypeHistory);
        //取消设计款详情
        prototypeHistoryRepository.list(Wrappers.lambdaQuery(PrototypeHistory.class).eq(PrototypeHistory::getPrototypeId, prototype.getPrototypeId())).stream().map(PrototypeHistory::getPrototypeId).forEach(pId -> {
            PrototypeDetail cancelPrototypeDetail = new PrototypeDetail();
            if (inner) {
                cancelPrototypeDetail.setCancelReason(cancelReq.getCancelReason());
                cancelPrototypeDetail.setCancelRemark(cancelReq.getCancelRemark());
            } else {
                cancelPrototypeDetail.setPlmCancelReason(cancelReq.getCancelReason());
                cancelPrototypeDetail.setPlmCancelRemark(cancelReq.getCancelRemark());
            }
            cancelPrototypeDetail.setCancelUserId(SsoContext.userId());
            cancelPrototypeDetail.setCancelUserName(SsoContext.username());
            cancelPrototypeDetail.setCancelUserCode(currentUserBbCode);
            prototypeDetailRepository.cancelByPrototypeId(pId, cancelPrototypeDetail);
        });
    }

    @Override
    public PrototypeVo getById(Long id) {
        Prototype entity = prototypeRepository.getById(id);
        if (null == entity) {
            throw new ValidationException("找不到当前设计款号");
        }
        PrototypeVo vo = new PrototypeVo();
        BeanUtils.copyProperties(entity, vo);
        return vo;
    }

    @Override
    public List<PrototypePrintInfoVo> batchPrintInfo(BatchPrintReq req) {
        List<Prototype> prototypeList = prototypeRepository.listByIds(req.getPrototypeIdList());
        return prototypeList.stream().map(this::buildPrototypePrintInfoVo).collect(Collectors.toList());
    }

    @Override
    public List<BaseSkuResp> batchQuerySkuBySkc(SkcBatchQueryReq req) {
        log.info("PLM请求查询sku信息:\t{}", JsonsKt.toJsonPretty(req));
        final var skcList = prototypeRepository.listByDesignCodes(req.getSkcs());
        if (CollectionUtil.isNotEmpty(skcList)) {
            return prototypeSku(skcList);
        }
        final var spotStyleSkcList = spotStyleSkcRepository.listBySkcCodes(req.getSkcs());
        if (CollectionUtil.isNotEmpty(spotStyleSkcList)) {
            return spotStyleSkc(spotStyleSkcList);
        }
        return Collections.emptyList();
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean disassemblyFinished(DisassemblyFinishedNotifyInnerReq req) {
        log.info("PLM拆板完成回调SDP参数：\t{}", JsonsKt.toJsonPretty(req));
        Map<String, DisassemblyFinishedNotifyInnerReq.DisassemblyFinished> map = StreamUtil.list2Map(req.getFinishedItemList(),
                DisassemblyFinishedNotifyInnerReq.DisassemblyFinished::getDesignCode);
        final var skcCodes = req.getFinishedItemList().stream().map(DisassemblyFinishedNotifyInnerReq.DisassemblyFinished::getDesignCode).toList();
        final var skcList = prototypeRepository.listByDesignCodes(skcCodes);
        if (CollectionUtil.isEmpty(skcList)) {
            throw new ValidationException("SKC信息不存在！");
        }
        skcList.stream().filter(t -> map.containsKey(t.getDesignCode())).forEach(skc -> doAsUser(skc, () -> {
            skc.setDisassemblyFinished(Bool.YES.getCode());
            skc.setDisassemblyFinishedTime(map.get(skc.getDesignCode()).getDisassemblyFinishedTime());
            prototypeRepository.updateById(skc);
            //通知商品管理已经拆板完成
            productService.patternMaking(List.of(skc.getDesignStyleId()));
        }));
        log.info("PLM拆板完成回调SDP成功");
        return true;
    }

    private List<BaseSkuResp> spotStyleSkc(List<SpotStyleSkc> spotStyleSkcList) {
        Map<Long, SpotStyleSkc> map = StreamUtil.list2Map(spotStyleSkcList, SpotStyleSkc::getSkcId);
        final var skcIds = spotStyleSkcList.stream().map(SpotStyleSkc::getSkcId).toList();
        final var skuList = styleSkcSkuRepository.selectBySkcIds(skcIds);
        if (CollectionUtil.isEmpty(skuList)) {
            return Collections.emptyList();
        }
        return PrototypeConverter.convertSpotSkuResp(map, skuList);
    }

    private List<BaseSkuResp> prototypeSku(List<Prototype> skcList) {
        Map<Long, Prototype> map = StreamUtil.list2Map(skcList, Prototype::getPrototypeId);
        final var skcIds = skcList.stream().map(Prototype::getPrototypeId).toList();
        final var skuList = styleSkcSkuRepository.selectBySkcIds(skcIds);
        if (CollectionUtil.isEmpty(skuList)) {
            return Collections.emptyList();
        }
        return PrototypeConverter.convertSkuResp(map, skuList);
    }


    @Override
    public List<PrototypeExcelResp> prototypeManageExportExcel(PrototypeQuery queryDTO, HttpServletResponse response) {
        PrototypeQuery query = buildExportQuery(queryDTO);
        return prototypeRepository.listExcel(query);
    }

    private PrototypeQuery buildExportQuery(PrototypeQuery queryDTO) {
        PrototypeQuery query = new PrototypeQuery();
        if (CollectionUtil.isNotEmpty(queryDTO.getExportDesignCodeList())) {
            query.setDesignCodeList(queryDTO.getExportDesignCodeList());
        } else {
            BeanUtils.copyProperties(queryDTO, query);
            queryDesigner(query);
        }
        query.setPageSize(5000);
        return query;
    }

    @Override
    public void addVersionNumAndPushPlm(String styleCode) {
        final var skcList = prototypeRepository.getListByStyleCode(styleCode);
        if (CollectionUtil.isNotEmpty(skcList)) {
            skcList.forEach(t -> t.setVersionNum(t.getVersionNum() + 1));
            prototypeRepository.editBatchById(skcList);
        }
        final var completePushPlm = skcList.stream().filter(Prototype::isPushCompleted).collect(Collectors.toList());
        if (CollectionUtil.isNotEmpty(completePushPlm)) {
            completePushPlm.forEach(this::notifyPlmUpdatePicture);
        }
    }

    public void skcAddVersionNumAndPushPlm(Long skcId) {
        final var skc = prototypeRepository.getById(skcId);
        if (null != skc) {
            skc.setVersionNum(skc.getVersionNum() + 1);
            prototypeRepository.updateById(skc);
            if (skc.isPushCompleted()) {
                this.notifyPlmUpdatePicture(skc);
            }
        }
    }

    private PrototypeOperateReq buildNotifyPlmUpdatePicture(Prototype prototype) {
        PrototypeOperateReq req = new PrototypeOperateReq();
        final var materias = prototypeMaterialRepository.listBySkcIds(List.of(prototype.getPrototypeId()));
        if (CollectionUtil.isNotEmpty(materias)) {
            req.setMaterialInfo(materias.stream().map(t -> {
                PrototypeOperateReq.PrototypeMaterialInfo info = new PrototypeOperateReq.PrototypeMaterialInfo();
                BeanUtils.copyProperties(t, info);
                return info;
            }).collect(Collectors.toList()));
        }
        req.setDesignCode(prototype.getDesignCode());
        return req;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean plmBatchCancel(PrototypeBatchCancelReq req) {
        log.info("PLM请求取消skc操作:\t{}", JsonsKt.toJsonPretty(req));
        List<String> designCodes = StreamUtil.convertListAndDistinct(req.getCancelItems(), PrototypeBatchCancelReq.PrototypeCancel::getDesignCode);
        final var list = prototypeRepository.listByDesignCodes(designCodes);
        verifyReq(designCodes, list);
        final var cancelMap = BasicConvert.toMap(req.getCancelItems(), PrototypeBatchCancelReq.PrototypeCancel::getDesignCode);
        list.forEach(t -> {
            t.setPushPlmStatus(PushPlmStatusEnum.CANCEL.getCode());
            t.setPlmCancelTime(LocalDateTime.now());
            final var it = cancelMap.get(t.getDesignCode());
            doAsUser(t, () -> {
                PrototypeHistory canclePrototypeHistory = new PrototypeHistory();
                canclePrototypeHistory.setIsCanceled(true);
                canclePrototypeHistory.setCancelTime(LocalDateTime.now());
                canclePrototypeHistory.setReviserId(SsoContext.userId());
                canclePrototypeHistory.setReviserName(SsoContext.username());
                canclePrototypeHistory.setRevisedTime(LocalDateTime.now());
                //取消设计款历史表
                prototypeHistoryRepository.updateByPrototypeId(t.getPrototypeId(), canclePrototypeHistory);
                //取消设计款详情
                prototypeHistoryRepository.list(Wrappers.lambdaQuery(PrototypeHistory.class).eq(PrototypeHistory::getPrototypeId, t.getPrototypeId())).stream().map(PrototypeHistory::getPrototypeId).forEach(pId -> {
                    PrototypeDetail cancelPrototypeDetail = new PrototypeDetail();
                    cancelPrototypeDetail.setPlmCancelReason(it.getCancelReason());
                    cancelPrototypeDetail.setPlmCancelRemark(it.getCancelRemark());
                    cancelPrototypeDetail.setCancelUserId(SsoContext.userId());
                    cancelPrototypeDetail.setCancelUserName(SsoContext.username());
                    cancelPrototypeDetail.setCancelUserCode(t.getCreatorName());
                    prototypeDetailRepository.cancelByPrototypeId(pId, cancelPrototypeDetail);
                });
                //6, 添加日志
                addPrototypeLog(t.getPrototypeId(), t.getDesignCode(), t.getVersionNum(), "PLM取消SKC: " + it.getCancelReason());
                prototypeRepository.updateById(t);
            });
        });
        return true;
    }


    @RabbitListener(id = "sdpCurationPushPlmSpuConsumer", concurrency = "4-8", ackMode = "MANUAL", bindings = @QueueBinding(value = @Queue(value = RabbitConstant.PUSH_PLM_STYLE_QUEUE, durable = "true", autoDelete = "false"), exchange = @Exchange(value = RabbitConstant.PUSH_PLM_STYLE_EXCHANGE), key = RabbitConstant.PUSH_PLM_STYLE_ROUTING_KEY))
    @Override
    public void pushTask(Message message, Channel channel) {
        rabbitConsumer.handle(message, channel,
                () -> pushButted(message),
                e -> log.error("任务消费失败,{}", e.getLocalizedMessage(), e));
    }

    private void pushButted(final Message message) {
        final var body = new String(message.getBody());
        log.info("款式管理消息\t{}", body);
        final var dto = JsonsKt.parseJson(body, SpotTaskMessageDTO.class);
        if (StrUtil.equalsIgnoreCase(DesignStyleMessageEnum.BUTTED.getCode(), dto.getType())) {
            // 推送算法任务
            execOrElse(this.designStyleRepository.getById(dto.getTaskId()),
                    this::pushButted, () -> log.error("任务消费失败【{}】,款式管理任务不存在", dto.getTaskId()));
        } else {
            execOrElse(this.plmStyleLogRepository.getById(dto.getTaskId()),
                    this::pushPlm,
                    () -> log.error("任务消费失败【{}】,任务不存在", dto.getTaskId()));
        }
    }

    @RabbitListener(id = "sdpCurationPushMulfeatExtractConsumer", concurrency = "4-8", ackMode = "MANUAL",
            bindings = @QueueBinding(value = @Queue(value = RabbitConstant.PUSH_MULFEAT_EXTRACT_QUEUE,
                    durable = "true", autoDelete = "false"),
                    exchange = @Exchange(value = RabbitConstant.PUSH_MULFEAT_EXTRACT_EXCHANGE),
                    key = RabbitConstant.PUSH_MULFEAT_EXTRACT_ROUTING_KEY))
    public void pushMulfeatExtractTask(Message message, Channel channel) {
        rabbitConsumer.handle(message, channel,
                () -> mulfeatExtractTask(message),
                e -> log.error("任务消费失败,{}", e.getLocalizedMessage(), e));
    }

    private void mulfeatExtractTask(final Message message) {
        final var body = new String(message.getBody());
        log.info("推送服装特征提取任务表消息：\t{}", body);
        final var dto = JsonsKt.parseJson(body, SpotTaskMessageDTO.class);
        // 推送算法任务
        execOrElse(this.designStyleRepository.getById(dto.getTaskId()),
                this::pushButted, () -> log.error("任务消费失败【{}】,款式任务不存在", dto.getTaskId()));
    }


    private void pushButted(final DesignStyle designStyle) {
        if (StringUtils.isBlank(designStyle.getStyleCode())) {
            return;
        }
        final var skcs = prototypeRepository.listByDesignStyleIds(List.of(designStyle.getDesignStyleId()));
        if (CollectionUtil.isEmpty(skcs)) {
            return;
        }
        final var feats = this.mulfeatExtractTaskRepository.listByBusIds(skcs.stream().map(Prototype::getPrototypeId).toList(), SourceEnum.PROTOTYPE);
        if (CollectionUtil.isEmpty(feats)) {
            return;
        }
        pushMulfeatExtract(designStyle, feats);
    }

    private void pushMulfeatExtract(final DesignStyle designStyle, final List<MulfeatExtractTask> feats) {
        feats.stream()
                .filter(it -> Objects.equals(Bool.NO.getCode(), it.getPushStatus()))
                .forEach(it -> tryFinally(() -> {
                            it.setPushTime(LocalDateTime.now());
                            designStyle.setMulfeatExtracts(List.of(it));
                            MulfeatExtractApi.create(PrototypeConverter.buildMulfeatExtractReq(designStyle));
                            it.setPushStatus(Bool.YES.getCode());
                        },
                        e -> {
                            it.setMessage(e.getLocalizedMessage());
                            it.setTaskCode(designStyle.getStyleCode());
                            log.error("款式管理任务【{}】-图片特征提取推送失败\t{}", it.getTaskId(), e.getLocalizedMessage(), e);
                        },
                        () -> this.mulfeatExtractTaskRepository.updateByIdManualFill(it)));
    }

    @Override
    public void pushSpuSkc(PushPlmSendReq req) {
//        this.doAsUser(req, () -> {
//            pushPlmTask(req);
//        });
    }


//    public void pushPlmTask(PushPlmSendReq req) {
//        final var skcList = prototypeRepository.listByIds(req.getPrototypeIds());
//        final var spuCodes = skcList.stream().map(Prototype::getStyleCode).toList();
//        final var spuList = designStyleRepository.listByStyleCodes(spuCodes);
//        final var styleCodes = spuList.stream().map(DesignStyle::getStyleCode).collect(Collectors.toList());
//        final var materials = designStyleMaterialRepository.listByStyleCodes(styleCodes);
//        final var skcDetail = prototypeDetailRepository.getListByPrototypeIds(req.getPrototypeIds());
//
//        //推PLM
//        push(spuList, skcList, materials, skcDetail, req);
//    }


    @Override
    public List<SkcImageResp> listByDesignImage(List<DesignImageDTO> spotVectors) {
        if (CollectionUtil.isEmpty(spotVectors)) {
            return List.of();
        }
        final var mapVector = BasicConvert.groupingBy(spotVectors, DesignImageDTO::getSkcId);
        final var skcs = this.prototypeRepository.listByIds(mapVector.keySet());
        if (CollectionUtil.isEmpty(skcs)) {
            return List.of();
        }
        final var designStyleIds = skcs.stream().map(Prototype::getDesignStyleId).toList();
        final var skcIds = skcs.stream().map(Prototype::getPrototypeId).toList();
        final var taskMap = BasicConvert.toMap(this.designStyleRepository.listByIds(designStyleIds), DesignStyle::getDesignStyleId);
        final var prototypeMaterialList = this.prototypeMaterialRepository.listBySkcIds(skcIds);
        final var prototypeMaterialMap = prototypeMaterialList.stream().collect(Collectors.groupingBy(PrototypeMaterial::getPrototypeId));
        final var designerMap = BasicConvert.toMap(SdpMaterialDesignerApi.listDesignerGroup(), DesignerDTO::getDesignerId);
        final var list = new ArrayList<SkcImageResp>();
        skcs.stream().filter(it -> skcIds.contains(it.getPrototypeId()))
                .forEach(skc -> mapVector.get(skc.getPrototypeId())
                        .forEach(vector -> list.add(PrototypeConverter.convert(skc, designerMap, vector, taskMap, prototypeMaterialMap)))
                );
        return list;
    }

    @Override
    @Async("designImportHandlerExecutor")
    public void historyVector(List<String> spuCodes) {
        log.info("款式图片更新向量开始！");
        final var tasks = this.designStyleRepository.history(spuCodes).stream().filter(DesignStyle::hasCode).toList();
        if (CollectionUtil.isEmpty(tasks)) {
            return;
        }
        int batchSize = BATCH_SIZE;
        int totalSize = tasks.size();
        List<String> errorList = new ArrayList<>();
        int batchCount = (totalSize + batchSize - 1) / batchSize;
        for (int i = 0; i < batchCount; i++) {
            int fromIndex = i * batchSize;
            int toIndex = Math.min(fromIndex + batchSize, totalSize);
            List<DesignStyle> batchList = tasks.subList(fromIndex, toIndex);
            try {
                processBatch(batchList);
            } catch (Exception e) {
                log.error("第 {}/{} 批处理失败，本批条数：{}", i + 1, batchCount, batchList.size(), e);
            }
        }
        log.info("款式图片更新向量结束！");
    }

    private void processBatch(List<DesignStyle> batchList) {
        final var skcs = this.prototypeRepository.listByDesignStyleIds(batchList.stream().map(DesignStyle::getDesignStyleId).toList())
                .stream().filter(Prototype::hasCode).toList();
        if (CollectionUtil.isEmpty(skcs)) {
            return;
        }
        final var materials = prototypeMaterialRepository.listBySkcIds(skcs.stream().map(Prototype::getPrototypeId).toList());
        if (CollectionUtil.isEmpty(materials)) {
            return;
        }
        final var materialMap = BasicConvert.groupingBy(materials, PrototypeMaterial::getPrototypeId);
        skcs.forEach(t -> {
            if (materialMap.containsKey(t.getPrototypeId())) {
                t.setMaterialList(materialMap.get(t.getPrototypeId()));
            }
        });
        final var skcMap = BasicConvert.groupingBy(skcs, Prototype::getDesignStyleId);
        for (final var it : batchList) {
            final var list = skcMap.get(it.getDesignStyleId());
            if (CollectionUtil.isEmpty(list)) {
                continue;
            }
            final var feats = this.mulfeatExtractTaskRepository.listByBusIds(list.stream().map(Prototype::getPrototypeId).toList(), SourceEnum.PROTOTYPE);
            if (CollectionUtil.isNotEmpty(feats)) {
                continue;
            }
            it.setSkcs(list);
            this.buttedTask(it);
        }
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void pushPlm(PushPlmReq req) {
        final var skcList = prototypeRepository.listByIds(req.getPrototypeIds());
        validationPush(skcList);
        final var spuCodes = skcList.stream().map(Prototype::getStyleCode).toList();
        final var spuList = designStyleRepository.listByStyleCodes(spuCodes);
        verifySpuSkcReq(spuList, spuCodes, skcList);
        final var pushList = skcList.stream().filter(Prototype::canPushSpuSkcToPlm).collect(Collectors.toList());
        if (CollectionUtil.isEmpty(pushList)) {
            log.error("没有可推送的数据！");
            return;
        }
        pushList.forEach(t -> {
            t.setOperatorDone(Bool.NO.getCode());
            t.setPlmDesignerName(req.getDesignerName());
            t.setPlmDesignerId(req.getDesignerId());
        });
        prototypeRepository.editBatchById(pushList);
//        this.push(buildSend(req));
        pushList.forEach(it -> this.pushLog(it, PlmStyleLogTypeEnum.ADD));
    }

//    private PushPlmSendReq buildSend(PushPlmReq req) {
//        PushPlmSendReq send = new PushPlmSendReq();
//        BeanUtils.copyProperties(req, send);
//        send.setCreatorId(SsoContext.user().getId());
//        send.setTenantId(SsoContext.tenantId());
//        send.setCreatorName(SsoContext.user().getName());
//        req.setColorMaking(req.getColorMaking());
//        return send;
//    }
//
//    private void push(PushPlmSendReq req) {
//        this.sendNotTaskId(req, RabbitConfigEnum.PUSH_PLM_SPU_SKC);
//    }


    private void push(List<DesignStyle> spuList, List<Prototype> skcList, List<PrototypeMaterial> materials, List<PrototypeDetail> skcDetail, PushPlmSendReq pushPlmSendReq) {
        Map<String, List<Prototype>> skcMap = skcList.stream().collect(Collectors.groupingBy(Prototype::getStyleCode));
        Map<String, List<PrototypeMaterial>> materialMap = materials.stream().collect(Collectors.groupingBy(PrototypeMaterial::getStyleCode));
        Map<Long, List<PrototypeDetail>> skcDetailMap = skcDetail.stream().collect(Collectors.groupingBy(PrototypeDetail::getPrototypeId));
        StylePushPlmReq req = new StylePushPlmReq();
        List<StylePushPlmReq.StyleReq> reqList = new ArrayList<>();
        List<Prototype> canPushSkcList = new ArrayList<>();
        List<Prototype> failSkcs = new ArrayList<>();
        for (DesignStyle spu : spuList) {
            List<Prototype> skc = skcMap.get(spu.getStyleCode());
            if (CollectionUtil.isEmpty(skc)) {
                continue;
            }
            List<PrototypeMaterial> material = materialMap.get(spu.getStyleCode());
            try {
                StylePushPlmReq.StyleReq styleReq = new StylePushPlmReq.StyleReq();
                final var styleBuild = PrototypeConverter.stylePullReq(spu, pushPlmSendReq.getDesignerId(), null);
                styleReq.setDesignStyle(styleBuild);
                List<PrototypePullReq> pullReqList = new ArrayList<>();
                for (Prototype prototype : skc) {
                    try {
                        prototype.setPlmDesignerId(pushPlmSendReq.getDesignerId());
                        prototype.setPlmDesignerName(pushPlmSendReq.getDesignerName());
                        final var successSkc = PrototypeConverter.skcPullReq(spu, prototype, material, skcDetailMap);
                        pullReqList.add(successSkc);
                        canPushSkcList.add(prototype);
                    } catch (RuntimeException e) {
                        prototype.setOperatorDone(Bool.YES.getCode());
                        prototype.setPushPlmStatus(PushPlmStatusEnum.FAIL.getCode());
                        prototype.setPushPlmResultMessage("数据校验失败: " + e.getMessage());
                        failSkcs.add(prototype);
                    }
                }
                styleReq.setPrototypes(pullReqList);
                reqList.add(styleReq);
            } catch (RuntimeException e) {
                skc.forEach(t -> {
                    t.setPushPlmStatus(PushPlmStatusEnum.FAIL.getCode());
                    t.setOperatorDone(Bool.YES.getCode());
                    t.setPushPlmResultMessage("数据校验失败: " + e.getMessage());
                });
                failSkcs.addAll(skc);
            } finally {
                if (CollectionUtil.isNotEmpty(failSkcs)) {
                    prototypeRepository.editBatchById(failSkcs);
                }
            }
        }
        if (reqList.isEmpty()) {
            log.warn("没有有效的数据可以推送到PLM");
            return;
        }
        req.setSpuSkcList(reqList);
        // 批量推送PLM
        try {
//            plmDesignStyleRemoteHelper.batchCreateSpuSkc(req);
            canPushSkcList.forEach(t -> {
                t.setOperatorDone(Bool.YES.getCode());
                t.setPushPlmStatus(PushPlmStatusEnum.COMPLETED.getCode());
                t.setPushPlmResultMessage("推向PLM成功！");
                if (pushPlmSendReq.getColorMaking()) {
                    //通知PLM修改客户图片信息
                    pushPictureToPlm(t);
                }
            });
        } catch (RuntimeException e) {
            log.error("批量推送PLM失败: {}", e.getLocalizedMessage(), e);
            canPushSkcList.forEach(t -> {
                t.setOperatorDone(Bool.YES.getCode());
                t.setPushPlmStatus(PushPlmStatusEnum.FAIL.getCode());
                t.setPushPlmResultMessage("PLM推送失败: " + e.getLocalizedMessage());
            });
        } finally {
            prototypeRepository.editBatchById(canPushSkcList);
        }
    }

    private void verifySpuSkcReq(List<DesignStyle> spuList, List<String> spuCodes, List<Prototype> skcList) {
        if (CollectionUtil.isEmpty(spuList)) {
            throw new BusinessException("spu信息不存在，spu编码:" + JsonsKt.toJsonPretty(spuCodes));
        }
        boolean isSubmit = skcList.stream().allMatch(t -> t.getPrototypeStatus().equals(PrototypeStatusEnum.DECOMPOSED.getCode()));
        if (!isSubmit) {
            throw new BusinessException("存在未提交资料的skc信息");
        }
        boolean isBlankProjectTypeName = spuList.stream().anyMatch(t -> StringUtils.isBlank(t.getProjectTypeName()));
        if (isBlankProjectTypeName) {
            throw new BusinessException("存在SPU的项目类型为空，不能推送！");
        }
    }

    private void validationPush(List<Prototype> list) {
        if (CollectionUtil.isEmpty(list)) {
            throw new ValidationException("skc信息不存在！");
        }
        boolean isCancel = list.stream().anyMatch(Prototype::anyCancel);
        if (isCancel) {
            throw new ValidationException("款式信息已取消，不能进行推送！");
        }
        boolean isPush = list.stream().anyMatch(Prototype::isPushCompleted);
        if (isPush) {
            throw new ValidationException("款式信息已推送过，不能进行推送！");
        }
    }

    private void verifyReq(List<String> designCodes, List<Prototype> list) {
        if (CollectionUtil.isEmpty(list)) {
            throw new BusinessException("设计款式信息不存在，skc编码:" + JsonsKt.toJsonPretty(designCodes));
        }
        if (CollectionUtil.isNotEmpty(list) && designCodes.size() != list.size()) {
            Set<String> existingCodes = list.stream().map(Prototype::getDesignCode).collect(Collectors.toSet());

            List<String> notExistCodes = designCodes.stream().filter(code -> !existingCodes.contains(code)).collect(Collectors.toList());
            throw new BusinessException("设计款式信息不存在，skc编码:" + JsonsKt.toJsonPretty(notExistCodes));
        }
    }

    private PrototypePrintInfoVo buildPrototypePrintInfoVo(Prototype prototype) {
        PrototypeVo prototypeVo = convertPrototype(prototype, prototype.getPrototypeId());
        PrototypePrintInfoVo prototypePrintInfoVo = new PrototypePrintInfoVo();
        BeanUtils.copyProperties(prototypeVo, prototypePrintInfoVo);

        return prototypePrintInfoVo;
    }


    private PrototypeVo convertPrototype(Prototype prototype, Long prototypeId) {
        PrototypeDetail prototypeDetail = prototypeDetailRepository.getByPrototypeId(prototypeId);
        PrototypeVo prototypeVo = new PrototypeVo();
        BeanUtils.copyProperties(prototypeDetail, prototypeVo);
        BeanUtils.copyProperties(prototype, prototypeVo);

        List<String> designPicture = StrUtil.splitTrim(prototypeDetail.getDesignPicture(), StrUtil.COMMA);
        prototypeVo.setDesignPicture(designPicture);

        return prototypeVo;
    }

    private void validateColorsMaking(Prototype prototype) {
        if (null == prototype) {
            throw new ValidationException("版单信息不存在, 或已升版本刷新页面重试");
        }
        if (prototype.sdpCancel()) {
            throw new ValidationException("当前设计款号已取消!");
        }
        if (StringUtils.isBlank(prototype.getStyleCode())) {
            throw new ValidationException("styleCode为空! ");
        }
    }

    protected void updatePrototypeSave(PrototypeOperateReq prototypeReq, Prototype prototype, boolean fromDevelop) {
        Long donePrototypeId = prototype.getPrototypeId();
        Long latestPrototypeId = prototype.getLatestPrototypeId();
        if (fromDevelop) {
            prototype.setPrototypeStatus(PrototypeStatusEnum.WAIT_DECOMPOSE.getCode());
        } else {
            //设置已拆版
            prototype.setPrototypeStatus(PrototypeStatusEnum.DECOMPOSED.getCode());
        }

        LocalDateTime submitTime = LocalDateTime.now();
        prototype.setSubmitTime(submitTime);
        String referenceDesignCode = prototypeReq.getReferenceDesignCode();
        if (StringUtils.isBlank(referenceDesignCode)) {
            referenceDesignCode = null;
        }
        //正常款校验参考款号
        else if (SkcTypeEnum.NORMAL.getCode().equals(prototype.getSkcType())) {
            validateRefDesignCode(referenceDesignCode);
        }
        prototype.setReferenceDesignCode(referenceDesignCode);
        prototype.setMakeClothesType(prototypeReq.getMakeClothesType());
        prototype.setPreDisassemblyState(prototypeReq.getPreDisassemblyState());

        //第一种情况：第一个版本，还没编辑完成。
        if (!prototype.getIsDoneVersion()) {
            log.info("【拆版】提交第一个版本.版单={} designCode={} ", latestPrototypeId, prototypeReq.getDesignCode());
            PrototypeConverter.composePrototypeReqToPrototype(prototypeReq, prototype);
            if (!fromDevelop) {
                prototype.setIsDoneVersion(Boolean.TRUE);
                //设置第一个版本的完成时间
                prototype.setFirstVersionDoneTime(LocalDateTime.now());
                PrototypeHistory prototypeHistory = prototypeHistoryRepository.getByPrototypeId(donePrototypeId);
                PrototypeConverter.composePrototypeReqToPrototypeHistory(prototypeReq, prototypeHistory);
                //设置此版本完成
                prototypeHistory.setSubmitTime(submitTime);
                prototypeHistory.setIsDoneVersion(Boolean.TRUE);
                prototypeHistory.setPrototypeStatus(prototype.getPrototypeStatus());

                prototypeHistoryRepository.updateById(prototypeHistory);
            }
            prototypeRepository.updateById(prototype);

            //更新prototype_detail表
            PrototypeDetail prototypeDetail = prototypeDetailRepository.getByPrototypeId(latestPrototypeId);
            PrototypeConverter.convertPrototypeDetail(prototypeDetail, prototypeReq);
            prototypeDetailRepository.updateById(prototypeDetail);

            //判断复色是否要推送
            checkColorMaking(prototype);

            //通知PLM修改客户图片信息
            pushPictureToPlm(prototype);

            //增加日志
            addLog(latestPrototypeId, prototype.getDesignCode(), "完成了【设计拆版】");
            return;
        }

        Integer versionNumNew = prototype.getVersionNum() + 1;

        //更新主表的新增版本和新版本的prototypeId
        PrototypeConverter.composePrototypeReqToPrototype(prototypeReq, prototype);
        prototype.setLatestPrototypeId(prototype.getPrototypeId());
        prototype.setVersionNum(versionNumNew);
        prototype.setLatestVersionNum(versionNumNew);
        prototype.setPrototypeId(prototype.getPrototypeId());

        //插入新历史表数据
        PrototypeHistory prototypeHistoryNew = new PrototypeHistory();
        BeanUtils.copyProperties(prototype, prototypeHistoryNew);
        prototypeHistoryNew.setHistoryId(IdHelper.getId());
        prototypeHistoryRepository.save(prototypeHistoryNew);

        prototypeRepository.updateById(prototype);
        //prototypeRepository.updateIdAndPrototype(prototype, donePrototypeId);

        //更新prototype_detail表
        PrototypeDetail prototypeDetail = prototypeDetailRepository.getByPrototypeId(latestPrototypeId);
        PrototypeConverter.convertPrototypeDetail(prototypeDetail, prototypeReq);
        prototypeDetailRepository.updateById(prototypeDetail);

        //判断复色是否要推送
        checkColorMaking(prototype);

        //通知PLM修改客户图片信息
        pushPictureToPlm(prototype);

        //增加日志
        addLog(prototype.getPrototypeId(), prototype.getDesignCode(), "完成了【再次拆版】");
    }

    private void pushPictureToPlm(Prototype prototype) {
        if (prototype.alreadyPushPlm()) {
            final var list = prototypeRepository.listByStyleCode(prototype.getStyleCode());
            final var completePushPlm = list.stream().filter(Prototype::isPushCompleted).collect(Collectors.toList());
            if (CollectionUtil.isNotEmpty(completePushPlm)) {
                completePushPlm.forEach(this::notifyPlmUpdatePicture);
            }
        }
    }

    private void checkColorMaking(Prototype prototype) {
        if (StringUtils.isNotBlank(prototype.getMakeSameDesignCode())) {
            final var ref = prototypeRepository.getByDesignCode(prototype.getMakeSameDesignCode());
            Assert.notNull(ref, "skc信息不存在，skc编码：{}", prototype.getMakeSameDesignCode());
            final var style = this.designStyleRepository.getById(prototype.getDesignStyleId());
            log.info("复色的款式信息：\t{}", JsonsKt.toJsonPretty(style));
            if (ref.isPushCompleted() && !prototype.isPushCompleted() && StringUtils.isNotBlank(style.getProjectTypeName())) {
                //推送plm
//                final var pushReq = new PushPlmReq();
//                pushReq.setDesignerId(ref.getPlmDesignerId() == null ? ref.getDesignerId() : ref.getPlmDesignerId());
//                pushReq.setDesignerName(StringUtils.isBlank(ref.getPlmDesignerName()) ? ref.getDesignerName() : ref.getPlmDesignerName());
//                pushReq.setPrototypeIds(List.of(prototype.getPrototypeId()));
//                pushReq.setColorMaking(true);
                plmAdd(prototype);
            }
        }
    }

    private void plmAdd(final Prototype prototype) {
        pushLog(prototype, PlmStyleLogTypeEnum.ADD);
    }

    private void pushLog(final Prototype prototype, final PlmStyleLogTypeEnum type) {
        final var style = this.designStyleRepository.getByStyleCode(prototype.getStyleCode());
        final var skcLog = PrototypeConverter.obtainLog(style.getDesignStyleId());
        skcLog.setSkcId(prototype.getPrototypeId());
        skcLog.setLogType(type.getCode());
        this.plmStyleLogRepository.save(skcLog);
//        this.send(skcLog, JsonsKt.toJson(new TaskMessageDTO(skcLog.getLogId())), RabbitConfigEnum.PUSH_PLM_STYLE);
        pushPlmLog(skcLog);
    }

    private void notifyPlmUpdatePicture(final Prototype prototype) {
//        BatchUpdateSkcCustomerPictureReq req = new BatchUpdateSkcCustomerPictureReq();
//        BatchUpdateSkcCustomerPictureReq.UpdateSkcCustomerPicture update = new BatchUpdateSkcCustomerPictureReq.UpdateSkcCustomerPicture();
//        update.setDesignCode(prototype.getDesignCode());
//        if (CollectionUtil.isNotEmpty(prototypeReq.getMaterialInfo())) {
//            final var pictures = prototypeReq.getMaterialInfo().stream()
//                    .filter(it -> it.getMaterialType() == 0)
//                    .map(PrototypeOperateReq.DesignStyleMaterialInfo::getMaterialUrl)
//                    .limit(9)
//                    .collect(Collectors.toList());
//            update.setCustomerPicture(pictures);
//        }
//        req.setItems(List.of(update));
//        try {
//            plmDesignStyleRemoteHelper.batchUpdateSkcCustomerPicture(req);
//        } catch (Exception e) {
//            //日志
//            log.error("更新客户图片信息,原skc编码【{}】-失败信息\t{}", prototype.getDesignCode(), e.getLocalizedMessage(), e);
//            //prototype.setPushPlmResultMessage(e.getMessage());
//        } finally {
//            //prototypeRepository.updateById(prototype);
//        }
//        final var style = this.designStyleRepository.getByStyleCode(prototype.getStyleCode());
//        final var skcLog = PrototypeConverter.obtainLog(style.getDesignStyleId());
//        skcLog.setSkcId(prototype.getPrototypeId());
//        skcLog.setLogType(PlmStyleLogTypeEnum.EDIT_IMAGE.getCode());
//        this.plmStyleLogRepository.save(skcLog);
//        this.send(skcLog, JsonsKt.toJson(new TaskMessageDTO(skcLog.getLogId())), RabbitConfigEnum.PUSH_PLM_STYLE);
        pushLog(prototype, PlmStyleLogTypeEnum.EDIT_IMAGE);
    }


    private void addLog(Long bizId, String designCode, String content) {
        DesignLogReq designLogReq = DesignLogReq.builder().bizType(DesignLogBizTypeEnum.DESIGN_PROTOTYPE).content(content).bizId(bizId).designCode(designCode).build();
        designLogService.create(designLogReq);
    }

    /**
     * 校验引用设计款号
     */
    private void validateRefDesignCode(String designCode) {
        Prototype prototype = prototypeRepository.getByDesignCode(designCode);
        Assert.notNull(prototype, "请勿引用不存在的设计款：{}", designCode);
        Assert.isTrue(prototype.getIsDoneVersion(), "请勿引用未拆版的设计款：{}", designCode);
    }


    private void createFirstVersionSkc(Prototype prototype, SpuCreateSkcReq createSkcReq) {
        //第一个版本是1
        LocalDateTime now = LocalDateTime.now();
        prototype.setVersionNum(1);
        prototype.setLatestVersionNum(1);
        prototype.setLatestPrototypeId(prototype.getPrototypeId());
        prototype.setPrototypeStatus(PrototypeStatusEnum.WAIT_DECOMPOSE.getCode());
        prototype.setListingStatus(PrototypeOnShelveEnum.WAIT_PUSH.getCode());
        prototype.setIsDoneVersion(Boolean.FALSE);
        prototype.setIsMakeMore(Boolean.FALSE);
        prototype.setIsUrgent(Boolean.FALSE);
        prototype.setMakeMoreLatestTime(now);
        prototype.setIsCanceled(Boolean.FALSE);
        prototype.setCancelTime(null);
        prototype.setSkcCreatedTime(now);
        prototype.setSubmitTime(null);
        prototype.setFirstVersionDoneTime(null);
        prototype.setIsOnSale(null);
        prototype.setTenantId(SsoContext.tenantId());
        //设置类型(正常/复色)
        prototype.setSkcType(createSkcReq.getSkcTypeEnum().getCode());
        //如果是复色打版，需清空颜色
        if (SkcTypeEnum.COMPOUND_COLORS.getCode().equals(prototype.getSkcType())) {
            prototype.setColor(null);
        }

        //建款时, 详情表要维护 品质等级与编码 (因为这三个信息在拆板不维护了,但下游是从详情表中获取的)
        PrototypeDetail prototypeDetail = new PrototypeDetail();
        BeanUtils.copyProperties(prototype, prototypeDetail);
        prototypeDetail.setPrototypeId(prototype.getPrototypeId());
        prototypeDetail.setPrototypeDetailId(IdHelper.getId());
        prototypeDetail.setCheckPriceState(Bool.NO.getCode());
        prototypeDetail.setPredictCheckPriceStatus(Bool.NO.getCode());

        //存到历史表
        PrototypeHistory prototypeHistory = new PrototypeHistory();
        BeanUtils.copyProperties(prototype, prototypeHistory);
        prototypeHistory.setHistoryId(IdHelper.getId());

        Assert.isTrue(prototypeRepository.save(prototype), "保存新增设计款失败");
        Assert.isTrue(prototypeDetailRepository.save(prototypeDetail), "保存新增设计款详细信息失败");
        Assert.isTrue(prototypeHistoryRepository.save(prototypeHistory), "保存新增设计款历史失败");
    }


    private PrototypeVo getPrototypeVo(Prototype prototype) {
        PrototypeDetail prototypeDetail = prototypeDetailRepository.getByPrototypeId(prototype.getLatestPrototypeId());
        PrototypeVo prototypeVo = new PrototypeVo();
        BeanUtils.copyProperties(prototype, prototypeVo);
        BeanUtils.copyProperties(prototypeDetail, prototypeVo);

        if (StringUtils.isNotBlank(prototypeDetail.getDesignPicture())) {
            List<String> designPicture = StrUtil.splitTrim(prototypeDetail.getDesignPicture(), StrUtil.COMMA);
            prototypeVo.setDesignPicture(designPicture);
        }
        if (Objects.nonNull(prototype.getDesignerId())) {
            final var designerList = selectByDesignerIds(List.of(prototype.getDesignerId()));
            final var designerDTO = designerList.get(0);
            prototypeVo.setDesignerGroup(designerDTO.getDesignerGroupName());
            prototypeVo.setDesignerGroupCode(designerDTO.getDesignerGroupCode());
        }

        return prototypeVo;
    }

    @Override
    public void job() {
//        final var failList = plmSdpStyleRelaRepository.selectFail();
//        if (CollectionUtil.isNotEmpty(failList)) {
//            //spu生成失败的，那么spu和skc都需要生成
//            final var spuList = failList.stream().filter(it -> it.getParentId() == 0).collect(Collectors.toList());
//            List<Long> spuIds = spuList.stream().map(PlmSdpStyleRela::getTaskId).distinct().toList();
//            final var onlyFailSkc = failList.stream().filter(it -> !spuIds.contains(it.getParentId())).collect(Collectors.toList());
//            List<PlmSdpStyleRela> updateList = new ArrayList<>();
//            List<DesignStyle> updateSpuList = new ArrayList<>();
//            List<Prototype> updateSkcList = new ArrayList<>();
//            //spu生成失败的情况，spu和skc都要重新生成
//            if (CollectionUtil.isNotEmpty(spuList)) {
//                final var req = spuIds.stream().map(t -> {
//                    final var skcList = failList.stream().filter(it -> spuIds.contains(it.getParentId())).toList();
//                    return PrototypeConverter.buildPullPlmStyleCode(t, null, true, skcList.size());
//                }).toList();
//                req.forEach(t -> {
//                    final var resp = plmDesignStyleRemoteHelper.batchGenerate(t);
//                    updateList.add(buildUpdateSpuRelaSpu(resp));
//                    updateSpuList.add(buildUpdateSpu(resp));
//                    final var buildSkc = buildUpdateSpuRelaSkc(resp, failList, updateSkcList);
//                    if (null != buildSkc && CollectionUtil.isNotEmpty(buildSkc.getLeft())) {
//                        updateList.addAll(buildSkc.getLeft());
//                    }
//                });
//                if (CollectionUtil.isNotEmpty(updateList)) {
//                    plmSdpStyleRelaRepository.updateBatchById(updateList);
//                }
//                if (CollectionUtil.isNotEmpty(updateSpuList)) {
//                    designStyleRepository.updateBatchById(updateSpuList);
//                }
//            }
//            //skc生成失败，只生成skc编码
//            if (CollectionUtil.isNotEmpty(onlyFailSkc)) {
//                onlyFailSkc.forEach(skc -> {
//                    final var parent = plmSdpStyleRelaRepository.selectParent(skc.getParentId());
//                    if (null != parent) {
//                        final var reqSkc = PrototypeConverter.buildPullPlmStyleCode(parent.getTaskId(), parent.getPlmTaskCode(), false, 1);
//                        final var resp = plmDesignStyleRemoteHelper.batchGenerate(reqSkc);
//                        skc.setPlmTaskCode(resp.getSpuCodes().getFirst().getDesignCodes().getFirst());
//
//                        Prototype prototype = new Prototype();
//                        prototype.setPrototypeId(skc.getTaskId());
//                        prototype.setDesignCode(resp.getSpuCodes().getFirst().getDesignCodes().getFirst());
//                        updateSkcList.add(prototype);
//                    }
//                });
//                plmSdpStyleRelaRepository.updateBatchById(onlyFailSkc);
//            }
//            if (CollectionUtil.isNotEmpty(updateSkcList)) {
//                prototypeRepository.updateBatchById(updateSkcList);
//            }
//        }
        log.info("款式-定时任务-开始");
        final var list = this.plmStyleLogRepository.jobs();
        if (CollectionUtil.isNotEmpty(list)) {
            list.forEach(this::pushPlm);
        }
       /* final var feats = this.mulfeatExtractTaskRepository.jobs(SourceEnum.PROTOTYPE);
        if (CollectionUtil.isNotEmpty(feats)) {
            feats.forEach(this::pushMulfeatExtract);
        }*/
        final var styles = designStyleRepository.list();
        if (CollectionUtil.isNotEmpty(styles)) {
            styles.forEach(this::job);
        }
        log.info("款式-定时任务-结束");
    }


    @Transactional(rollbackFor = Exception.class)
    @Override
    public boolean temuOrderSync(TemuOrderSync req) {
        if (null == req.getSkcId()) {
            return false;
        }
        final var skc = prototypeRepository.getById(req.getSkcId());
        if (null == skc) {
            return false;
        }
        updateSkc(req, skc);
        if (skc.push()) {
            temuOrderPushPlm(skc);
        }
        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchOnShelves(List<Long> taskIds) {
        validation();
        final var skcList = prototypeRepository.listByIds(taskIds);
        if (CollectionUtil.isEmpty(skcList)) {
            throw new ValidationException("SKC信息不存在！");
        }
        final var designStyleIds = skcList.stream().map(Prototype::getDesignStyleId).distinct().collect(Collectors.toList());
        final var spuList = designStyleRepository.listByIds(designStyleIds);
        if (CollectionUtil.isEmpty(spuList)) {
            throw new ValidationException("SPU信息不存在！");
        }
        final var data = PrototypeConverter.convertOnShelve(spuList, skcList);
        if (CollectionUtil.isEmpty(data)) {
            throw new ValidationException("待推送/上架失败状态才能进行推送");
        }
        final var skcMaterialPictures = this.prototypeMaterialRepository.listBySkcIds(taskIds);
        final var skcMaterialMap = BasicConvert.groupingBy(skcMaterialPictures, PrototypeMaterial::getPrototypeId);

        final var skcPictures = this.prototypeDetailRepository.getListByPrototypeIds(taskIds);
        final var skcPictureMap = BasicConvert.groupingBy(skcPictures, PrototypeDetail::getPrototypeId);
        final var skcs = data.stream().flatMap(it -> it.getSkcs().stream()).toList();
        this.prototypeRepository.updateBatchById(skcs, skcs.size());
        data.forEach(it -> {
            onShelves(it, skcMaterialMap, skcPictureMap);
            final var pushSkcList = it.getSkcs();
            pushSkcList.forEach(t -> addLog(t.getLatestPrototypeId(), t.getDesignCode(), "推送上架"));
        });
        return true;
    }

    @Override
    public Boolean batchPricePassed(DesignStylePricePassed req) {
        log.info("测价通过-更新款式信息参数：\t{}", JsonsKt.toJsonPretty(req));
        final var spus = designStyleRepository.listByIds(req.getDesignStyleIds());
        if (CollectionUtil.isEmpty(spus)) {
            return false;
        }
        final var skcList = prototypeRepository.listByDesignStyleIds(req.getDesignStyleIds());
        if (CollectionUtil.isEmpty(skcList)) {
            return false;
        }
        skcList.forEach(t -> {
            t.setPricePassedState(req.getPricePassedState());
            t.setPricePassedTime(LocalDateTime.now());
        });
        prototypeRepository.editBatchById(skcList);

        final var pushPlm = skcList.stream().filter(Prototype::alreadyPushPlm).toList();
        if (CollectionUtil.isNotEmpty(pushPlm)) {
            //通知PLM
            notifyPlm(skcList);
        }
        return true;
    }

    private void notifyPlm(List<Prototype> skcList) {
        skcList.forEach(skc -> this.pushLog(skc, PlmStyleLogTypeEnum.PRICE_PASS));
    }

    @Override
    public Boolean batchOnShelvesResult(List<PrototypeBatchOnShelvesResultReq> list) {
        if (CollectionUtil.isEmpty(list)) {
            throw new ValidationException("批量驳回上架不通过信息不能为空");
        }
        final var spuIds = list.stream().map(PrototypeBatchOnShelvesResultReq::getSpuId).distinct().toList();
        final var skcList = prototypeRepository.listByDesignStyleIds(spuIds);
        Map<Long, PrototypeBatchOnShelvesResultReq> map = StreamUtil.list2Map(list, PrototypeBatchOnShelvesResultReq::getSpuId);
        if (CollectionUtil.isEmpty(skcList)) {
            throw new ValidationException("SKC信息不存在！");
        }
        skcList.forEach(t -> {
            if (map.containsKey(t.getDesignStyleId())) {
                final var result = map.get(t.getDesignStyleId());
                if (result.getPass()) {
                    t.setListingStatus(PrototypeOnShelveEnum.ON_SHELVE.getCode());
                    t.setListingFailReason("");
                } else {
                    t.setListingStatus(PrototypeOnShelveEnum.ON_SHELF_FAIL.getCode());
                    t.setListingFailReason(result.getListingFailReason());
                }
            }
        });
        prototypeRepository.editBatchById(skcList);
        return true;
    }


    @Override
    public Boolean releaseResult(StyleOnShelvesReleaseReq req) {
        if (null == req) {
            throw new ValidationException("批量驳回上架不通过信息不能为空");
        }
        final var skcList = prototypeRepository.listByDesignStyleIds(List.of(req.getStyleId()));
        if (CollectionUtil.isEmpty(skcList)) {
            throw new ValidationException("SKC信息不存在！");
        }
        skcList.forEach(t -> {
            if (req.getReleaseSuccess()) {
                t.setListingStatus(PrototypeOnShelveEnum.ON_SHELVE.getCode());
                t.setListingFailReason("");
                addLog(t.getLatestPrototypeId(), t.getDesignCode(), "完成商品发布");
            } else {
                t.setListingStatus(PrototypeOnShelveEnum.OFF_SHELF.getCode());
            }
        });
        prototypeRepository.editBatchByIdWithOptimisticLock(skcList);
        return true;
    }

    @Override
    public void refreshSkcPicture(List<String> styleCodes) {
        final var designStyleMaterialList = designStyleMaterialRepository.listByStyleCodes(styleCodes);
        if (CollectionUtil.isNotEmpty(designStyleMaterialList)) {
            Map<Long, List<DesignStyleMaterial>> materialMap = designStyleMaterialList.stream().collect(Collectors.groupingBy(DesignStyleMaterial::getDesignStyleId));
            List<Long> styleIds = StreamUtil.convertListAndDistinct(designStyleMaterialList, DesignStyleMaterial::getDesignStyleId);
            final var skcList = prototypeRepository.listByDesignStyleIds(styleIds);
            Map<Long, List<Prototype>> skcMap = skcList.stream().filter(it -> materialMap.containsKey(it.getDesignStyleId())).collect(Collectors.groupingBy(Prototype::getDesignStyleId));
            List<PrototypeMaterial> addList = new ArrayList<>();
            for (Map.Entry<Long, List<Prototype>> entry : skcMap.entrySet()) {
                Long designStyleId = entry.getKey();
                final var materialList = materialMap.get(designStyleId);
                List<Prototype> prototypeList = entry.getValue();
                for (Prototype prototype : prototypeList) {
                    for (DesignStyleMaterial designStyleMaterial : materialList) {
                        PrototypeMaterial prototypeMaterial = new PrototypeMaterial();
                        BeanUtils.copyProperties(designStyleMaterial, prototypeMaterial);
                        prototypeMaterial.setDesignCode(prototype.getDesignCode());
                        prototypeMaterial.setPrototypeId(prototype.getPrototypeId());
                        prototypeMaterial.setTenantId(1L);
                        addList.add(prototypeMaterial);
                    }
                }
            }
            if (CollectionUtil.isNotEmpty(addList)) {
                prototypeMaterialRepository.saveBatch(addList);
            }
        }
    }

    @Override
    public void updateMaterialByImageTask(String spuCode, List<Long> skcIds, Integer taskType, ImageUpdateTaskCheckReq req) {
        final var spu = designStyleRepository.getByStyleCode(spuCode);
        if (null == spu) {
            return;
        }
        final var skcList = prototypeRepository.listByIds(skcIds);
        final var skcPictures = prototypeMaterialRepository.listByStyleCodesAndType(List.of(spuCode), taskType);
        final Map<Long, List<PrototypeMaterial>> originalImageMap = BasicConvert.groupingBy(skcPictures, PrototypeMaterial::getPrototypeId);
        Map<Long, ImageUpdateTaskUploadReq.Skc> reqSkcMap = req.getSkcList().stream().collect(Collectors.toMap(ImageUpdateTaskUploadReq.Skc::getSkcId, v -> v));
        final var addList = new ArrayList<PrototypeMaterial>();
        for (Prototype skc : skcList) {
            final var skcId = skc.getPrototypeId();
            Boolean isAdd = false;
            final var skcPictureList = new ArrayList<PrototypeMaterial>();
            if (reqSkcMap.containsKey(skc.getPrototypeId())) {
                final var currentPictures = reqSkcMap.get(skcId).getCurrentPictures();
                final var updatePictures = reqSkcMap.get(skcId).getPictures();
                final var skcMaterial = originalImageMap.get(skcId);
                for (PrototypeMaterial picture : skcMaterial) {
                    if (currentPictures.contains(picture.getMaterialUrl())) {
                        if (isAdd) {
                            continue;
                        }
                        addList.addAll(PrototypeConverter.buildSkcUpdateMaterialInfo(updatePictures, taskType, skc));
                        skcPictureList.addAll(PrototypeConverter.buildSkcUpdateMaterialInfo(updatePictures, taskType, skc));
                        isAdd = true;
                    } else {
                        addList.addAll(PrototypeConverter.buildSkcUpdateMaterialInfo(List.of(picture.getMaterialUrl()), taskType, skc));
                        skcPictureList.addAll(PrototypeConverter.buildSkcUpdateMaterialInfo(List.of(picture.getMaterialUrl()), taskType, skc));
                    }
                }
                skc.setMaterialList(skcPictureList);
            }
        }
        spu.setSkcs(skcList);
        prototypeMaterialRepository.deletedBySkcIdsAndType(skcIds, taskType);
        if (CollectionUtil.isNotEmpty(addList)) {
            prototypeMaterialRepository.saveBatch(addList);
            //修改向量
            buttedTask(spu);
        }
        for (Prototype skc : skcList) {
            //通知更新商品标签
            materialChange(spu, skc, PrototypeConverter.buildReqMaterialInfo(skc, addList, taskType), originalImageMap);
        }
        //skc升版本
        this.addVersionNumAndPushPlm(spuCode);
    }

    @Override
    public void pickingPushPictureToPrototype(Long skcId, List<String> allPictures) {
        final var materialList = prototypeMaterialRepository
                .listBySkcIdsAndType(List.of(skcId), PrototypeMaterialTypeEnum.IMAGE.getCode());
        Set<String> existedUrls = materialList.stream()
                .map(PrototypeMaterial::getMaterialUrl)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());
        int need = PROTOTYPE_MATERIAL_PICTURE_COUNT - materialList.size();
        List<String> addList = allPictures.stream()
                .filter(url -> !existedUrls.contains(url))
                .limit(need)
                .collect(Collectors.toList());
        if (addList.isEmpty()) {
            return;
        }
        final var skc = prototypeRepository.getById(skcId);
        final var materialAddList = PrototypeConverter.buildUpdateMaterialInfo(
                skc, addList, PrototypeMaterialTypeEnum.IMAGE.getCode());
        if (CollectionUtil.isNotEmpty(materialAddList)) {
            prototypeMaterialRepository.saveBatch(materialAddList);
        }

        if (CollectionUtil.isNotEmpty(materialList)) {
            skc.setMaterialList(materialList);
        } else {
            skc.setMaterialList(materialAddList);
        }
        //更新商品标签操作
        final var spu = designStyleRepository.getById(skc.getDesignStyleId());
        materialChange(spu, skc, PrototypeConverter.buildReqMaterialInfo(skc, materialAddList, PrototypeMaterialTypeEnum.IMAGE.getCode()), new HashMap<>());

        //更新向量
        spu.setSkcs(List.of(skc));
        buttedTask(spu);

        //skc升版本
        this.skcAddVersionNumAndPushPlm(skcId);
    }


    @Override
    public void test(List<Long> logIds) {
        this.plmStyleLogRepository.listByIds(logIds).forEach(this::pushPlm);
    }

    private void onShelves(DesignStyle task, Map<Long, List<PrototypeMaterial>> prototypeMaterialMap, Map<Long, List<PrototypeDetail>> skcPictureMap) {
        task.setPictures(prototypeMaterialMap.getOrDefault(task.getDesignStyleId(), Collections.emptyList()));
        DevelopStyleTask developStyleTask = null;
        if (null != task.getSourceBusinessId() && StrUtil.equalsIgnoreCase(DesignStyleSourceTypeEnum.DEVELOP_STYLE.getCode(), task.getTaskSource())) {
            developStyleTask = developStyleTaskRepository.getById(task.getSourceBusinessId());
        }
        this.styleOnShelvesService.onShelves(PrototypeConverter.convert(task, prototypeMaterialMap, skcPictureMap, developStyleTask));
    }

    private void updateSkc(TemuOrderSync sync, Prototype skc) {
        //判断是否已动销
//        if (!skc.getIsOnSale()) {
//            skc.setIsOnSale(Boolean.TRUE);
//        }
        if (Objects.equals(sync.getSkcSiteStatus(), Bool.NO.getCode())) {
            if (skc.onShelve()) {
                skc.setListingStatus(PrototypeOnShelveEnum.OFF_SHELF.getCode());
            }
        } else if (Objects.equals(sync.getSkcSiteStatus(), Bool.YES.getCode())) {
            if (!skc.onShelve()) {
                skc.setListingStatus(PrototypeOnShelveEnum.ON_SHELVE.getCode());
            }
        }
//        skc.setCommodityAttr(sync.getCommodityAttr());
//        skc.setOrderCode(sync.getOrderCode());
//        skc.setSaleTime(sync.getOrderCreatedTime());
//        skc.setOrderNumber(sync.getOrderNumber());
        prototypeRepository.editByIdWithOptimisticLock(skc);
//        final var skcLog = PrototypeConverter.obtainLog(skc.getDesignStyleId());
//        skcLog.setSkcId(skc.getPrototypeId());
//        skcLog.setLogType(PlmStyleLogTypeEnum.ON_SALE.getCode());
//        if (StrUtil.equalsIgnoreCase("已取消", sync.getOrderStatus())) {
//            skcLog.setLogType(PlmStyleLogTypeEnum.CANCEL_ON_SALE.getCode());
//        }
//        this.plmStyleLogRepository.save(skcLog);
//        pushPlmLog(skcLog);
    }

    @Override
    public void callback(AiTaskCallbackReq req) {
        log.info("款式管理任务-图片特征提取callback\t{}", JsonsKt.toJsonPretty(req));
        execOrElse(this.mulfeatExtractTaskRepository.getById(req.getBusId()),
                this::callbackMulfeatExtract,
                () -> log.warn("现货任务-图片特征提取callback任务【{}】不存在", req.getBusId()));
    }

    private void callbackMulfeatExtract(final MulfeatExtractTask task) {
        if (task.end()) {
            return;
        }
        callbackMulfeatExtract(task, MulfeatExtractApi.getByBusId(task.getTaskId()));
    }

    private void callbackMulfeatExtract(final MulfeatExtractTask extract, final MulfeatExtractTaskVo vo) {
        final var vector = skcImageVectorRepository.getById(extract.getTaskId());
        if (Objects.nonNull(vector)) {
            return;
        }
        final var tasks = this.designStyleRepository.listByStyleCodes(List.of(extract.getTaskCode()));
        if (CollectionUtil.isEmpty(tasks)) {
            return;
        }
        callbackMulfeatExtract(extract, vo, tasks);
    }

    private void callbackMulfeatExtract(final MulfeatExtractTask extract, final MulfeatExtractTaskVo vo,
                                        final List<DesignStyle> tasks) {
        final var skc = this.prototypeRepository.getById(extract.getBusId());
        if (Objects.isNull(skc)) {
            return;
        }
        final var task = tasks.getFirst();
        task.setSkcs(List.of(skc));
        task.setMulfeatExtracts(List.of(extract));
        lock(LOCK_KEY + "mulfeat:extract:design:style:callback" + extract.getBusId(), 90L, () -> {
            extract.setTaskStatus(vo.getTaskStatus());
            if (TaskStatusViewEnum.failed(vo.getTaskStatus())) {
                extract.setTaskStatus(TaskStatusEnum.FAILED.getCode());
                extract.setMessage(vo.getMessage());
                this.mulfeatExtractTaskRepository.updateByIdManualFill(extract);
                return;
            }
            if (TaskStatusViewEnum.completed(vo.getTaskStatus())) {
                extract.setAiStartTime(vo.getAiStartTime());
                extract.setAiEndTime(vo.getAiEndTime());
                extract.setDownFeat(vo.getDownFeat());
                extract.setUpFeat(vo.getUpFeat());
                extract.setFullFeat(vo.getFullFeat());
                extract.setWholeFeat(vo.getWholeFeat());
                transaction(() -> {
                    this.setVector(task);
                    this.mulfeatExtractTaskRepository.updateByIdManualFill(extract);
                });
            }
        });
    }

    private void setVector(final DesignStyle designStyle) {
        final var vector = DesignImageConvert.convertDesignStyle(designStyle);
        this.skcImageVectorRepository.save(vector);
        // 同步
        designImageService.saveVector(vector);
    }

    private void temuOrderPushPlm(Prototype skc) {
//        PushPlmReq req = new PushPlmReq();
//        req.setPrototypeIds(List.of(skc.getPrototypeId()));
//        req.setDesignerId(temuSyncPlmDesignerProperties.getDesignerId());
//        req.setDesignerName(temuSyncPlmDesignerProperties.getDesignerName());
//        this.pushPlm(req);
        this.pushLog(skc, PlmStyleLogTypeEnum.ADD);
    }


    private DesignStyle buildUpdateSpu(ClothingCodeBatchGenerateResp resp) {
        DesignStyle style = new DesignStyle();
        style.setDesignStyleId(Long.valueOf(resp.getSpuCodes().getFirst().getKey()));
        style.setStyleCode(resp.getSpuCodes().getFirst().getStyleCode());
        return style;
    }

    private Pair<List<PlmSdpStyleRela>, List<Prototype>> buildUpdateSpuRelaSkc(ClothingCodeBatchGenerateResp resp, List<PlmSdpStyleRela> failList, List<Prototype> updateSkcList) {
        Long spuId = Long.valueOf(resp.getSpuCodes().get(0).getKey());
        final var skcList = failList.stream().filter(it -> spuId.equals(it.getParentId())).toList();
        if (skcList.size() == 0 || resp.getSpuCodes().getFirst().getDesignCodes().size() != skcList.size()) {
            log.info("Spu下面的skc个数和PLM生成返回的不一致, PLM的SPU编码={}", resp.getSpuCodes().get(0).getStyleCode());
            return null;
        }
        List<PlmSdpStyleRela> list = new ArrayList<>();
        for (int i = 0; i < skcList.size(); i++) {
            final var skc = skcList.get(i);
            final var rela = new PlmSdpStyleRela();
            rela.setTaskId(skc.getTaskId());
            rela.setPlmTaskCode(resp.getSpuCodes().getFirst().getDesignCodes().get(i));
            rela.setTaskStatus(PushPlmStatusEnum.COMPLETED.getCode());
            rela.setReviserId(1L);
            rela.setReviserName("系统自动更新");
            rela.setRevisedTime(LocalDateTime.now());
            list.add(rela);

            Prototype prototype = new Prototype();
            prototype.setPrototypeId(skc.getTaskId());
            prototype.setDesignCode(resp.getSpuCodes().getFirst().getDesignCodes().get(i));
            updateSkcList.add(prototype);

        }
        return Pair.of(list, updateSkcList);
    }

    private PlmSdpStyleRela buildUpdateSpuRelaSpu(ClothingCodeBatchGenerateResp resp) {
        final var rela = new PlmSdpStyleRela();
        rela.setTaskId(Long.valueOf(resp.getSpuCodes().get(0).getKey()));
        rela.setPlmTaskCode(resp.getSpuCodes().getFirst().getStyleCode());
        rela.setTaskStatus(PushPlmStatusEnum.COMPLETED.getCode());
        rela.setReviserId(1L);
        rela.setReviserName("系统自动更新");
        rela.setRevisedTime(LocalDateTime.now());
        return rela;
    }

    private void pushPlmLog(final PlmStyleLog log) {
        this.send(log, JsonsKt.toJson(new TaskMessageDTO(log.getLogId())), RabbitConfigEnum.PUSH_PLM_STYLE);
    }

    private void pushPlm(final Message message) {
        final var dto = BasicConvert.message2DTO(message);
        execOrElse(this.plmStyleLogRepository.getById(dto.getTaskId()), this::pushPlm, () -> log.error("任务消费失败【{}】,任务不存在", dto.getTaskId()));
    }

    private void pushPlm(final PlmStyleLog plmLog) {
        this.doAsUser(plmLog, () -> {
            try {
                PUSH_LOG.get(plmLog.getLogType()).accept(plmLog);
            } catch (Exception e) {
                log.error("执行推送PLM失败\t{}\t{}", plmLog.getLogId(), e.getLocalizedMessage(), e);
            }
        });
    }

    private ClothingCodeBatchGenerateResp generateCode(final PlmStyleLog plmLog, final DesignStyle style, final boolean first) {
        final var req = PrototypeConverter.buildPullPlmStyleCode(style.getDesignStyleId(), first ? null : style.getStyleCode(), first, 1);
        plmLog.setContent(JsonsKt.toJsonPretty(req));
        final var resp = this.plmDesignStyleRemoteHelper.batchGenerate(req);
        plmLog.setResponseData(JsonsKt.toJsonPretty(resp));
        return resp;
    }

    private void pushPlmCode(final PlmStyleLog plmLog) {
        log.info("款式管理开始分码：\t{}", JsonsKt.toJsonPretty(plmLog));
        pushPlmLock(plmLog, () -> {
            final var list = getPlmCodes(plmLog);
            if (CollectionUtil.isEmpty(list)) {
                return;
            }
            final var skcs = list.stream().filter(PlmSdpStyleRela::yesSkc).toList();
            final var style = this.designStyleRepository.getById(plmLog.getTaskId());
            if (Objects.isNull(style) || style.hasCode()) {
                this.plmStyleLogRepository.updateById(plmLog);
                return;
            }
            // 款式第一次分码只有一个SKC
            final var skc = skcs.getFirst();
            final var prototype = this.prototypeRepository.getById(skc.getTaskId());
            final var histories = this.prototypeHistoryRepository.getListByPrototypeId(prototype.getPrototypeId());
            tryFinally(() -> {
                final var resp = this.generateCode(plmLog, style, true);
                final var spuCode = resp.getSpuCodes().getFirst();
                list.forEach(it -> {
//                    it.setTaskStatus(PushPlmStatusEnum.COMPLETED.getCode());
                    it.setPlmTaskCode(spuCode.getStyleCode());
                    if (it.yesSkc()) {
                        it.setPlmTaskCode(spuCode.getDesignCodes().getFirst());
                    }
                });
                style.setStyleCode(spuCode.getStyleCode());
                prototype.setDesignCode(spuCode.getDesignCodes().getFirst());

                prototype.setStyleCode(style.getStyleCode());
                log.info("款式管理分码SKC编码：\t{}", JsonsKt.toJsonPretty(prototype.getDesignCode()));
                //更新营销图
                final var materialList = prototypeMaterialRepository.listBySkcIds(List.of(prototype.getPrototypeId()));
                log.info("SKC图片信息：\t{}", JsonsKt.toJsonPretty(materialList));
                if (CollectionUtil.isNotEmpty(materialList)) {
                    materialList.forEach(t -> {
                        t.setStyleCode(style.getStyleCode());
                        t.setDesignCode(prototype.getDesignCode());
                    });
                    prototypeMaterialRepository.updateBatchById(materialList);
                    log.info("SKC分码回来开始创建向量");
                    //请求插入向量信息
                    prototype.setMaterialList(materialList);
                    style.setSkcs(List.of(prototype));
                    buttedTask(style);
                }
                if (CollectionUtil.isNotEmpty(histories)) {
                    histories.forEach(it -> {
                        it.setDesignCode(prototype.getDesignCode());
                        it.setStyleCode(prototype.getStyleCode());
                    });
                }
            }, e -> {
                plmLog.setMessage(e.getLocalizedMessage());
                plmLog.setPushStatus(2);
                log.error("款式任务【{}】-买手分码推送失败\t{}", plmLog.getLogId(), e.getLocalizedMessage(), e);
            }, () -> transaction(() -> {
                //生成SKU信息
                generateSku(style, prototype);
                this.plmStyleLogRepository.updateById(plmLog);
                this.plmSdpStyleRelaRepository.updateBatchById(list);
                if (plmLog.getPushStatus() == 1) {
                    this.designStyleRepository.updateById(style);
                    this.prototypeRepository.updateById(prototype);
                    updateSource(style);
                }
                if (CollectionUtil.isNotEmpty(histories)) {
                    this.prototypeHistoryRepository.updateBatchById(histories);
                }
            }));
        });
    }

    @Override
    public void generateSku(DesignStyle style, Prototype prototype) {
        final var sku = styleSkcSkuRepository.selectBySkcIds(List.of(prototype.getPrototypeId()));
        if (StringUtils.isNotBlank(prototype.getDesignCode()) && CollectionUtil.isEmpty(sku)) {
            //生成SKU信息
            final var req = new SkcBatchQueryReq();
            req.setSkcs(List.of(prototype.getDesignCode()));
            final var skuList = skuInfoRemoteHelper.querySku(req);
            final var standardSize = PlmConvertHelper.listByDictCode(DictEnum.PLM_STANDARD_SIZE);
            final var checkMokenList = getMokenSkuList(skuList, standardSize, style);
            List<StyleSkcSku> skuAdd;
            if (CollectionUtil.isNotEmpty(checkMokenList)) {
                skuAdd = PrototypeConverter.convertSkuByQuery(checkMokenList, prototype);
            } else {
                skuAdd = PrototypeConverter.convertSku(style, prototype, standardSize);
            }
            if (CollectionUtil.isNotEmpty(skuAdd)) {
                styleSkcSkuRepository.saveBatch(skuAdd);
            }
        }
    }

    public static List<BaseSkuResp> getMokenSkuList(List<BaseSkuResp> mokenSkuList, DictVo standardSize, DesignStyle style) {
        if (CollectionUtil.isEmpty(mokenSkuList)) {
            return Collections.emptyList();
        }
        final var groupCode = style.getSizeStandardCode();
        final var sizeName = style.getSizeStandardName();
        if (StringUtils.isBlank(groupCode)) {
            return Collections.emptyList();
        }
        final var plmCode = standardSize.getChildren().stream().filter(it -> StrUtil.equalsIgnoreCase(groupCode, it.getDictCode()))
                .filter(it -> CollectionUtil.isNotEmpty(it.getAttributes()))
                .flatMap(it -> it.getAttributes().stream())
                .filter(it -> StrUtil.equalsIgnoreCase("plm_code", it.getCode()))
                .map(AttributeVo::getName).findFirst().orElse("");
        return mokenSkuList.stream().filter(t -> plmCode.equals(t.getSourceGroupCode())).toList();
    }

    @Override
    public List<BomOrderMaterialResp> batchQueryBomBySkc(SpuBatchQueryReq req) {
        final var spuList = designStyleRepository.listByStyleCodes(req.getStyleCodes());
        if (CollectionUtil.isEmpty(spuList)) {
            return Collections.emptyList();
        }
        final var developStyleTaskIds = spuList.stream().filter(t -> t.developStyle()).filter(t -> null != t.getSourceBusinessId()).map(DesignStyle::getSourceBusinessId).distinct().toList();
        if (CollectionUtil.isEmpty(developStyleTaskIds)) {
            return Collections.emptyList();
        }
        final var bomList = developStyleTaskBomOrderRepository.listByTaskIds(developStyleTaskIds);
        if (CollectionUtil.isEmpty(bomList)) {
            return Collections.emptyList();
        }
        return PrototypeConverter.convertBomOrderMaterial(spuList, bomList);
    }

    @Override
    public void salesDriving() {
        int pageIndex = 0;
        while (true) {
            final var salesDrivings = this.prototypeRepository.listBySalesDriving(pageIndex * 128, 128);
            if (CollectionUtil.isEmpty(salesDrivings)) {
                log.info("没有需要通知的动销");
                break;
            }
            pageIndex++;
            salesDrivings.forEach(it -> lock(LOCK_KEY + it.getPrototypeId(),180L,() ->  this.salesDrivings(it)));
        }
    }



    @Transactional(rollbackFor = Exception.class)
    @Override
    public void changeSizeStandardCode(DesignStyleUpdateDto designStyle) {
        final var newDesignStyle = designStyleRepository.getById(designStyle.getDesignStyleId());
        List<Prototype> prototypeList = prototypeRepository.listByStyleCode(designStyle.getStyleCode());
        if (CollUtil.isNotEmpty(prototypeList)) {
            final var skdIds = prototypeList.stream().map(Prototype::getPrototypeId).toList();
            final var destailList = prototypeDetailRepository.getListByPrototypeIds(skdIds);
            destailList.forEach(t -> {
                t.setSizeStandardCode(designStyle.getSizeStandardCode());
                t.setSizeStandard(designStyle.getSizeStandardName());
            });
            prototypeDetailRepository.updateBatchById(destailList);
            final var skuList = styleSkcSkuRepository.selectBySkcIds(skdIds);
            if (CollectionUtil.isNotEmpty(skuList)) {
                skuList.forEach(t -> styleSkcSkuRepository.logicDelete(t.getSkuId()));
            }
            prototypeList.forEach(skc -> generateSku(newDesignStyle, skc));
        }
    }

    private void updateSource(final DesignStyle style) {
        if (!StrUtil.equalsIgnoreCase(DesignStyleSourceTypeEnum.DEVELOP_STYLE.getCode(), style.getTaskSource())) {
            return;
        }
        final var developStyleTask = developStyleTaskRepository.getById(style.getSourceBusinessId());
        if (Objects.isNull(developStyleTask)) {
            return;
        }
        // 开款更新任务
        developStyleTask.setSpuCode(style.getStyleCode());
        developStyleTaskRepository.updateById(developStyleTask);
    }

    private void pushPlmSkcCode(final PlmStyleLog plmLog) {
        pushPlmLock(plmLog, () -> {
            final var list = getPlmCodes(plmLog);
            if (CollectionUtil.isEmpty(list)) {
                return;
            }
            final var style = this.designStyleRepository.getById(plmLog.getTaskId());
            if (Objects.isNull(style)) {
                plmLog.setPushStatus(1);
                this.plmStyleLogRepository.updateById(plmLog);
                return;
            }
            final var prototype = this.prototypeRepository.getById(plmLog.getSkcId());
            final var histories = this.prototypeHistoryRepository.getListByPrototypeId(prototype.getPrototypeId());
            tryFinally(() -> {
                final var resp = this.generateCode(plmLog, style, false);
                final var spuCode = resp.getSpuCodes().getFirst();
                list.forEach(it -> {
//                    it.setTaskStatus(PushPlmStatusEnum.COMPLETED.getCode());
                    it.setPlmTaskCode(spuCode.getDesignCodes().getFirst());
                });
                prototype.setDesignCode(spuCode.getDesignCodes().getFirst());
                if (prototype.getIsDoneVersion() && Objects.equals(prototype.getSkcType(), SkcTypeEnum.COMPOUND_COLORS.getCode()) && prototype.canPushSpuSkcToPlm()) {
                    checkColorMaking(prototype);
                }
                if (CollectionUtil.isNotEmpty(histories)) {
                    histories.forEach(it -> {
                        it.setDesignCode(prototype.getDesignCode());
                        it.setStyleCode(prototype.getStyleCode());
                    });
                }
            }, e -> {
                plmLog.setMessage(e.getLocalizedMessage());
                plmLog.setPushStatus(2);
                log.error("款式任务【{}】-买手分码推送失败\t{}", plmLog.getLogId(), e.getLocalizedMessage(), e);
            }, () -> transaction(() -> {
                //生成SKU信息
                generateSku(style, prototype);
                this.plmStyleLogRepository.updateById(plmLog);
                this.plmSdpStyleRelaRepository.updateBatchById(list);
                if (plmLog.getPushStatus() == 1) {
                    this.prototypeRepository.updateById(prototype);
                }
                if (CollectionUtil.isNotEmpty(histories)) {
                    this.prototypeHistoryRepository.updateBatchById(histories);
                }
            }));
        });
    }

    private List<PlmSdpStyleRela> getPlmCodes(final PlmStyleLog plmLog) {
        final var taskId = this.logNeedPush(plmLog);
        if (Objects.equals(0L, taskId)) {
            return null;
        }
        final var list = this.plmSdpStyleRelaRepository.listByLogId(plmLog.getLogId());
        if (list.stream().allMatch(PlmSdpStyleRela::pushed)) {
            log.info("款式分码已经推送\t{}", plmLog.getLogId());
            this.plmStyleLogRepository.updateById(plmLog);
            return null;
        }
        return list;
    }

    private void pushPlmAdd(final PlmStyleLog plmLog) {
        pushPlmLock(plmLog, () -> {
            final var taskId = this.logNeedPush(plmLog);
            if (Objects.equals(0L, taskId)) {
                return;
            }
            final var spu = this.designStyleRepository.getById(plmLog.getTaskId());
            if (Objects.isNull(spu)) {
                this.plmStyleLogRepository.updateById(plmLog);
                return;
            }
            final var prototype = this.prototypeRepository.getById(plmLog.getSkcId());
            if (!(Objects.equals(prototype.getPushPlmStatus(), PushPlmStatusEnum.WAIT_PUSH.getCode()) || Objects.equals(prototype.getPushPlmStatus(), PushPlmStatusEnum.FAIL.getCode()))) {
                this.plmStyleLogRepository.updateById(plmLog);
                return;
            }
            final var prototypeDetail = this.prototypeDetailRepository.getByPrototypeId(prototype.getPrototypeId());
            final var materials = this.prototypeMaterialRepository.listBySkcIds(List.of(prototype.getPrototypeId()));
            Shop shop = Optional.ofNullable(spu.getStoreId())
                    .map(shopRepository::getById)
                    .orElse(null);
            tryFinally(() -> {
                final var designerId = Objects.requireNonNullElse(prototype.getPlmDesignerId(), prototype.getDesignerId());
                final var req = new StylePushPlmReq(List.of(new StylePushPlmReq.StyleReq(PrototypeConverter.stylePullReq(spu, designerId, shop), List.of(PrototypeConverter.skcPullReq(spu, prototype, materials, Map.of(prototype.getPrototypeId(), List.of(prototypeDetail)))))));
                plmLog.setContent(JsonsKt.toJsonPretty(req));
                this.plmDesignStyleRemoteHelper.batchCreateSpuSkc(req);
                if (StringUtils.isNotBlank(prototypeDetail.getTypeRemark())) {
                    this.plmDesignStyleRemoteHelper.stylePushRemark(PrototypeConverter.pushPlmRemark(prototype, prototypeDetail));
                }
                prototype.setOperatorDone(Bool.YES.getCode());
                prototype.setPushPlmStatus(PushPlmStatusEnum.COMPLETED.getCode());
                prototype.setPushPlmResultMessage("推向PLM成功！");

                //测价是否通过通知PLM
                final var passReq = new DesignStylePricePassed();
                passReq.setPricePassedState(prototype.getPricePassedState());
                passReq.setDesignStyleIds(List.of(prototype.getDesignStyleId()));
                batchPricePassed(passReq);

                if (Objects.equals(prototype.getSkcType(), SkcTypeEnum.COMPOUND_COLORS.getCode())) {
                    pushPictureToPlm(prototype);
                }
                // 推送动销
                final var logs = this.plmStyleLogRepository.getSkcId(prototype.getPrototypeId());
                if (CollectionUtil.isNotEmpty(logs)) {
                    log.info("推送动销开始");
                    logs.forEach(this::pushPlmOnSale);
                }
            }, e -> pushFail(plmLog, e, prototype), () -> {
                this.plmStyleLogRepository.updateById(plmLog);
                this.prototypeRepository.updateById(prototype);
                addLog(prototype.getLatestPrototypeId(), prototype.getDesignCode(), "推送PLM");
            });
        });
    }

    private void pushFail(final PlmStyleLog plmLog, final Exception e, final Prototype prototype) {
        plmLog.setMessage(e.getLocalizedMessage());
        plmLog.setPushStatus(2);
        if (Objects.nonNull(prototype)) {
            prototype.setOperatorDone(Bool.YES.getCode());
            prototype.setPushPlmStatus(PushPlmStatusEnum.FAIL.getCode());
            prototype.setPushPlmResultMessage("PLM推送失败: " + e.getLocalizedMessage());
        }
        log.error("款式任务【{}】-PLM推送失败\t{}", plmLog.getLogId(), e.getLocalizedMessage(), e);
    }

    private void pushPlmEditImage(final PlmStyleLog plmLog) {
        pushPlmLock(plmLog, () -> {
            final var taskId = this.logNeedPush(plmLog);
            if (Objects.equals(0L, taskId)) {
                return;
            }
            final var spu = this.designStyleRepository.getById(plmLog.getTaskId());
            if (Objects.isNull(spu)) {
                this.plmStyleLogRepository.updateByIdManualFill(plmLog);
                return;
            }
            final var prototype = this.prototypeRepository.getById(plmLog.getSkcId());
            final var skcs = this.prototypeRepository.listByDesignStyleIds(List.of(spu.getDesignStyleId()));

            if (Objects.isNull(prototype)) {
                this.plmStyleLogRepository.updateByIdManualFill(plmLog);
                return;
            }
            if (Objects.equals(prototype.getPushPlmStatus(), PushPlmStatusEnum.CANCEL.getCode())) {
                this.plmStyleLogRepository.updateById(plmLog);
                return;
            }
            final var prototypeReq = buildNotifyPlmUpdatePicture(prototype);
            final var update = new BatchUpdateSkcCustomerPictureReq.UpdateSkcCustomerPicture();
            update.setDesignCode(prototype.getDesignCode());
            if (CollectionUtil.isNotEmpty(prototypeReq.getMaterialInfo())) {
                final var pictures = prototypeReq.getMaterialInfo().stream()
                        .filter(it -> it.getMaterialType() == 0)
                        .sorted(Comparator.comparing(PrototypeOperateReq.PrototypeMaterialInfo::getPrototypeMaterialId))
                        .map(PrototypeOperateReq.PrototypeMaterialInfo::getMaterialUrl)
                        .collect(Collectors.toList());
                final var pushSkc = skcs.stream().filter(Prototype::isPushCompleted).toList();
                if (CollectionUtil.isNotEmpty(pushSkc)) {
                    if (pushSkc.size() == 1
                            && pushSkc.stream().map(Prototype::getPrototypeId).toList().contains(prototype.getPrototypeId())) {
                        update.setStyleMarketingPicture(pictures);
                    } else {
                        update.setStyleMarketingPicture(new ArrayList<>());
                    }
                } else {
                    update.setStyleMarketingPicture(pictures);
                }
                update.setMarketingPicture(pictures);
            }
            final var req = new BatchUpdateSkcCustomerPictureReq(List.of(update));
            tryFinally(() -> {
                plmLog.setContent(JsonsKt.toJsonPretty(req));
                this.plmDesignStyleRemoteHelper.batchUpdateSkcMarketingPicture(req);
                prototype.setOperatorDone(Bool.YES.getCode());
                prototype.setPushPlmStatus(PushPlmStatusEnum.COMPLETED.getCode());
                prototype.setPushPlmResultMessage("推向PLM成功！");
            }, e -> pushFail(plmLog, e, prototype), () -> {
                this.plmStyleLogRepository.updateById(plmLog);
                this.prototypeRepository.updateById(prototype);
            });
        });
    }

    private void pushPlmOnSale(final PlmStyleLog plmLog) {
        pushPlmLock(plmLog, () -> tryFinally(() -> {
            final var taskId = this.logNeedPush(plmLog);
            if (Objects.equals(0L, taskId)) {
                return;
            }
            final var prototype = this.prototypeRepository.getById(plmLog.getSkcId());
            if (StrUtil.isBlank(prototype.getCommodityAttr()) || StrUtil.isBlank(prototype.getOrderCode())) {
                this.plmStyleLogRepository.updateById(plmLog);
                return;
            }
            final var matches = new ArrayList<String>();
            final var reg = "(?<=\\A)\\d?[XLMSFxmlsf]{1,6}(?=$|/|\\s)|(?<=[/\\s])\\d?[XLMSFxmlsf]{1,6}(?=$|/|\\s)";
            Pattern p = Pattern.compile(reg);
            final var row = prototype.getCommodityAttr();
            Matcher matcher = p.matcher(row);
            while (matcher.find()) {
                matches.add(matcher.group());
            }
            final var size = matches.getFirst();
            final var req = new PlmOnSaleReq();
            req.setStyleCode(prototype.getStyleCode());
            req.setOnSaleInfo(new PlmOnSaleInfoReq(prototype.getOrderCode(), prototype.getSaleTime(),
                    List.of(new PlmOnSaleInfoSizeReq(size, prototype.getOrderNumber().longValue()))));
            plmLog.setContent(JsonsKt.toJsonPretty(req));
            addLog(prototype.getLatestPrototypeId(), prototype.getDesignCode(), "首次动销");
            this.plmDesignStyleRemoteHelper.onSale(req);
        }, e -> pushFail(plmLog, e, null), () -> this.plmStyleLogRepository.updateById(plmLog)));
    }

    private void pushPlmPricePass(final PlmStyleLog plmLog) {
        pushPlmLock(plmLog, () -> {
            final var taskId = this.logNeedPush(plmLog);
            if (Objects.equals(0L, taskId)) {
                return;
            }
            final var prototype = this.prototypeRepository.getById(plmLog.getSkcId());
            final var reqPlm = new PrototypePricePassedNotifyReq();
            reqPlm.setDesignCodes(List.of(prototype.getDesignCode()));
            reqPlm.setOperationType(2);
            reqPlm.setPricePassedTime(LocalDateTime.now());
            reqPlm.setState(prototype.getPricePassedState());
            tryFinally(() -> {
                plmLog.setContent(JsonsKt.toJsonPretty(reqPlm));
                this.plmDesignStyleRemoteHelper.pricePassedNotifyPlm(reqPlm);
            }, e -> pushFail(plmLog, e, null), () -> this.plmStyleLogRepository.updateById(plmLog));
        });
    }


    private void pushPlmCancelOnSale(final PlmStyleLog plmLog) {
        pushPlmLock(plmLog, () -> {
            final var taskId = this.logNeedPush(plmLog);
            if (Objects.equals(0L, taskId)) {
                return;
            }
            final var sync = temuOrderSyncRepository.getById(taskId);
            if (Objects.isNull(sync)) {
                this.plmStyleLogRepository.updateById(plmLog);
                return;
            }
            if (StrUtil.isBlank(sync.getCommodityAttr())) {
                this.plmStyleLogRepository.updateById(plmLog);
                return;
            }
            final var prototype = this.prototypeRepository.getById(plmLog.getSkcId());
            final var req = new PlmCancelOnSaleReq(prototype.getStyleCode(), sync.getOrderCode());
            tryFinally(() -> {
                plmLog.setContent(JsonsKt.toJsonPretty(req));
                this.plmDesignStyleRemoteHelper.cancelOnSale(req);
            }, e -> pushFail(plmLog, e, null), () -> this.plmStyleLogRepository.updateById(plmLog));
        });
    }

    private void pushPlmCancel(final PlmStyleLog plmLog) {
        pushPlmLock(plmLog, () -> {
            final var taskId = this.logNeedPush(plmLog);
            if (Objects.equals(0L, taskId)) {
                return;
            }
            final var spu = this.designStyleRepository.getById(plmLog.getTaskId());
            if (Objects.isNull(spu)) {
                this.plmStyleLogRepository.updateById(plmLog);
                return;
            }
            final var prototype = this.prototypeRepository.getById(plmLog.getSkcId());
            final var prototypeDetail = this.prototypeDetailRepository.getByPrototypeId(prototype.getPrototypeId());
            final var cancelDesignCodeReq = new BatchCancelDesignCodeReq.CancelDesignCodeReq();
            cancelDesignCodeReq.setDesignCode(prototype.getDesignCode());
            cancelDesignCodeReq.setCancelReason(prototypeDetail.getCancelReason());
            cancelDesignCodeReq.setCancelRemark(prototypeDetail.getCancelRemark());
            cancelDesignCodeReq.setCancelTime(LocalDateTime.now());
            cancelDesignCodeReq.setCancelUserId(SsoContext.userId());
            cancelDesignCodeReq.setCancelUserName(SsoContext.username());
            final var req = new BatchCancelDesignCodeReq(List.of(cancelDesignCodeReq));
            tryFinally(() -> {
                plmLog.setContent(JsonsKt.toJsonPretty(req));
                this.plmDesignStyleRemoteHelper.batchCancelSkc(req);
                prototype.setOperatorDone(Bool.YES.getCode());
                prototype.setPushPlmStatus(PushPlmStatusEnum.COMPLETED.getCode());
                prototype.setPushPlmResultMessage("推向PLM成功！");
            }, e -> pushFail(plmLog, e, null), () -> {
                this.plmStyleLogRepository.updateById(plmLog);
                this.prototypeRepository.updateById(prototype);
            });
        });
    }

    private void pushPlmLock(final PlmStyleLog plmLog, final Runnable run) {
        lock(LOCK_KEY + plmLog.getLogId(), 60L, run);
    }

    private Long logNeedPush(final PlmStyleLog plmLog) {
        if (!plmLog.needPush()) {
            return 0L;
        }
        plmLog.setPushStatus(1);
        plmLog.setPushTime(LocalDateTime.now());
        plmLog.setPushTimes(plmLog.requirePushTimes() + 1);
        return plmLog.getTaskId();
    }

    private void job(final DesignStyle style) {
        final var prototypes = this.prototypeRepository.getListByDesignStyleId(style.getDesignStyleId());
        if (CollectionUtil.isEmpty(prototypes)) {
            return;
        }
        final var productSkcs = this.productSkcRepository.listBySkcIds(prototypes.stream().map(Prototype::getPrototypeId).toList());
        if (CollectionUtil.isEmpty(productSkcs)) {
            return;
        }
        // 全部下架,下架,任意上架都是上架
        if (productSkcs.stream().allMatch(ProductSkc::offShelf)) {
            final var req = new StyleOnShelvesReleaseReq();
            req.setStyleId(style.getDesignStyleId());
            req.setReleaseSuccess(false);
            this.releaseResult(req);
            return;
        }
        final var productSkdIds = productSkcs.stream().map(ProductSkc::getSkcId).toList();
        final var updatePrototypes = prototypes.stream().filter(t -> productSkdIds.contains(t.getPrototypeId())).toList();
        if (CollectionUtil.isEmpty(updatePrototypes)) {
            return;
        }
//        if (productSkcs.stream().anyMatch(ProductSkc::onShelf)) {
        doAsUser(style, () -> onShelves(updatePrototypes));
//        }
    }

    private void onShelves(final List<Prototype> prototypes) {
        prototypes.stream()
                .filter(Prototype::canOnShelve)
                .forEach(it -> it.setListingStatus(PrototypeOnShelveEnum.ON_SHELVE.getCode()));
        this.prototypeRepository.editBatchByIdWithOptimisticLock(prototypes);
    }
    private void salesDrivings(final Prototype prototype) {
        final var designCode = prototype.getDesignCode() ;
        if (StrUtil.isBlank(designCode)) {
            log.warn("款式动销,款式编码为空\t{}",prototype.getPrototypeId());
            return;
        }
        //判断是否已动销
        if (prototype.getIsOnSale()) {
            log.info("款式动销,已经动销\t{}", designCode);
            return;
        }
        try {
            final var orders = this.temuOrderRepository.listBySkcCode(prototype.getDesignCode()) ;
            if (CollectionUtil.isEmpty(orders)) {
                log.warn("款式动销,订单为空\t{}",designCode);
                return;
            }
            final var data = orders.stream().filter(it -> !StrUtil.equalsIgnoreCase("已取消", it.getOrderStatus())).toList();
            if (CollectionUtil.isEmpty(data)) {
                return;
            }
            final var order = data.getFirst();
            log.info("款式动销,订单\t{}", JsonsKt.toJson(order));
            prototype.setIsOnSale(Boolean.TRUE);
            prototype.setCommodityAttr(order.getCommodityAttr());
            prototype.setOrderCode(order.getOrderCode());
            prototype.setSaleTime(order.getOrderCreatedTime());
            prototype.setOrderNumber(order.getOrderNumber());
            transaction(() -> {
                prototypeRepository.editByIdWithOptimisticLock(prototype);
                pushOnSale(prototype);
            });
            this.sendNotice(prototype);
        } catch (Exception e) {
            log.error("款式动销更新失败\t{}\t{}",prototype.getPrototypeId(),e.getMessage(),e);
        }
    }
    private void pushOnSale(final Prototype prototype) {
        final var skcLog = PrototypeConverter.obtainLog(prototype.getDesignStyleId());
        skcLog.setSkcId(prototype.getPrototypeId());
        skcLog.setLogType(PlmStyleLogTypeEnum.ON_SALE.getCode());
        this.plmStyleLogRepository.save(skcLog);
        pushPlmLog(skcLog);
        if (prototype.push()) {
            temuOrderPushPlm(prototype);
        }
    }
    private void sendNotice(final Prototype prototype) {
        if (Objects.isNull(prototype.getSaleTime())) {
            log.warn("款式动销,动销时间为空\t{}",prototype.getDesignCode());
            return;
        }
        final var start = LocalDateTime.of(2026, 4, 17, 11, 30, 0);
        final var result = start.compareTo(prototype.getSaleTime());
        if (result > 0){
            log.warn("款式动销,动销时间晚于通知开始时间,不需要通知\t{}",prototype.getDesignCode());
            return;
        }
        final var style = this.designStyleRepository.getById(prototype.getDesignStyleId());
        if (Objects.isNull(style)) {
            return;
        }
        final var designerId =prototype.getDesignerId();
        if (Objects.isNull(designerId)) {
            sendGroup(prototype,style);
            return;
        }
        final var designerList = selectByDesignerIds(List.of(designerId));
        if (CollectionUtil.isEmpty(designerList)) {
            sendGroup(prototype,style);
            return;
        }
        sendMessage(prototype,style,designerList.getFirst());
    }
    private void sendMessage(final Prototype prototype,final DesignStyle style,final DesignerDTO designer) {
        final var dto = new FeishuMessageDTO() ;
        dto.setBusId(prototype.getPrototypeId());
        dto.setBusType(FeishuNoticeTypeEnum.PROTOTYPE.getCode());
        dto.setTitle("动销通知");
        final var items = new ArrayList<FeishuContentItemReq>();
        items.add(FeishuContentItemReq.ofText("组别："+designer.getDesignerGroupName() +" "+designer.getDesignerName()));
        items.add(FeishuContentItemReq.ofNewLine()) ;
        addContent(items,prototype,style);
        dto.setMobile(designer.getMobilePhone());
        dto.setMessage(JsonsKt.toJson(items));
        this.feishuService.sendMessage(dto);
    }
    private void sendGroup(final Prototype prototype,final DesignStyle style) {
        final var dto = new FeishuMessageDTO() ;
        dto.setBusId(prototype.getPrototypeId());
        dto.setBusType(FeishuNoticeTypeEnum.PROTOTYPE.getCode());
        dto.setTitle("动销通知");
        dto.setNoticeType("Y2_SALES_DRIVING_GROUP_NOTICE");
        if (Objects.equals(2991L,prototype.getTenantId())) {
//        if (Objects.equals(1486L,prototype.getTenantId())) {
            dto.setNoticeType("Y2_A_SALES_DRIVING_GROUP_NOTICE");
        }
        final var items = new ArrayList<FeishuContentItemReq>();
        final var designerName = prototype.getDesignerName();
        if (StrUtil.isNotBlank(designerName)) {
            items.add(FeishuContentItemReq.ofText("设计师："+designerName));
            items.add(FeishuContentItemReq.ofNewLine()) ;
        }
        addContent(items,prototype,style);
        dto.setMessage(JsonsKt.toJson(items));
        this.feishuService.sendGroup(dto);
    }
    private void addContent(final List<FeishuContentItemReq> items,final Prototype prototype,final DesignStyle style) {
        // 前置拆版状态 0=否 1=是
        final var preDisassemblyState = prototype.getPreDisassemblyState() ;
        // 制作方式： 1-实物样 2-3D样
        final var makeClothesType = prototype.getMakeClothesType() ;
        final var projectTypeName = style.getProjectTypeName() ;
        items.add(FeishuContentItemReq.ofText("款号信息："+prototype.getDesignCode()));
        items.add(FeishuContentItemReq.ofNewLine()) ;
        items.add(FeishuContentItemReq.ofText("前置拆版："+ (Objects.equals(Bool.YES.getCode(),preDisassemblyState)?"是":"否")));
        items.add(FeishuContentItemReq.ofNewLine()) ;
        items.add(FeishuContentItemReq.ofText("项目类型："+projectTypeName));
        items.add(FeishuContentItemReq.ofNewLine()) ;
        items.add(FeishuContentItemReq.ofText("制作方式："+(Objects.equals(Bool.YES.getCode(),makeClothesType)?"实物样":"3D样")));
        items.add(FeishuContentItemReq.ofNewLine()) ;
        items.add(FeishuContentItemReq.ofText("订单编号："+prototype.getOrderCode()));
        items.add(FeishuContentItemReq.ofNewLine()) ;
        final var no = LocalDateTimeUtil.format( prototype.getSaleTime(), DatePattern.NORM_DATETIME_FORMATTER);
        items.add(FeishuContentItemReq.ofText("下单时间："+no));
        items.add(FeishuContentItemReq.ofNewLine()) ;
    }
    @PostConstruct
    void init() {
        log.info("初始化函数");
        PUSH_LOG.putIfAbsent(PlmStyleLogTypeEnum.CODE.getCode(), this::pushPlmCode);
        PUSH_LOG.putIfAbsent(PlmStyleLogTypeEnum.SKC_CODE.getCode(), this::pushPlmSkcCode);
        PUSH_LOG.putIfAbsent(PlmStyleLogTypeEnum.ADD.getCode(), this::pushPlmAdd);
        PUSH_LOG.putIfAbsent(PlmStyleLogTypeEnum.EDIT_IMAGE.getCode(), this::pushPlmEditImage);
        PUSH_LOG.putIfAbsent(PlmStyleLogTypeEnum.CANCEL.getCode(), this::pushPlmCancel);
        PUSH_LOG.putIfAbsent(PlmStyleLogTypeEnum.ON_SALE.getCode(), this::pushPlmOnSale);
        PUSH_LOG.putIfAbsent(PlmStyleLogTypeEnum.CANCEL_ON_SALE.getCode(), this::pushPlmCancelOnSale);
        PUSH_LOG.putIfAbsent(PlmStyleLogTypeEnum.PRICE_PASS.getCode(), this::pushPlmPricePass);

    }
}