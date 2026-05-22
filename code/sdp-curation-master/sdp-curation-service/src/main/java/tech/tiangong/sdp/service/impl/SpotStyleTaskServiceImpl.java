package tech.tiangong.sdp.service.impl;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.SecureUtil;
import com.alibaba.excel.EasyExcel;
import com.baomidou.mybatisplus.core.toolkit.Assert;
import com.baomidou.mybatisplus.core.toolkit.CollectionUtils;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.rabbitmq.client.Channel;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletResponse;
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
import team.aikero.admin.common.vo.AttributeVo;
import team.aikero.admin.common.vo.DictVo;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.core.protocol.PageVo;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.butted.common.enums.TaskStatusEnum;
import tech.tiangong.butted.common.vo.MulfeatExtractTaskVo;
import tech.tiangong.sdp.amqp.RabbitConstant;
import tech.tiangong.sdp.amqp.SpotTaskMessageDTO;
import tech.tiangong.sdp.common.req.AiTaskCallbackReq;
import tech.tiangong.sdp.common.req.SpotSkcCancelReq;
import tech.tiangong.sdp.common.resp.BuyerGenerateCodeItemResp;
import tech.tiangong.sdp.common.resp.BuyerGenerateCodeResp;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.convert.DesignImageConvert;
import tech.tiangong.sdp.convert.SpotStyleTaskConvert;
import tech.tiangong.sdp.convert.StyleOnShelvesConvert;
import tech.tiangong.sdp.entity.*;
import tech.tiangong.sdp.enums.*;
import tech.tiangong.sdp.external.*;
import tech.tiangong.sdp.repository.*;
import tech.tiangong.sdp.service.DesignImageService;
import tech.tiangong.sdp.service.SpotStyleTaskService;
import tech.tiangong.sdp.service.StyleOnShelvesService;
import tech.tiangong.sdp.util.StreamUtil;
import tech.tiangong.sdp.vo.dto.DesignImageDTO;
import tech.tiangong.sdp.vo.dto.DesignerDTO;
import tech.tiangong.sdp.vo.dto.DictDTO;
import tech.tiangong.sdp.vo.dto.SpotStyleExportDTO;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.*;

import javax.validation.ValidationException;
import java.io.IOException;
import java.io.Serializable;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.*;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * SpotStyleTaskService
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/6 16:06
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SpotStyleTaskServiceImpl extends DefaultTaskServiceImpl implements SpotStyleTaskService {
    private final SpotStyleTaskRepository spotStyleTaskRepository;
    private final SpotStyleSupplierRepository spotStyleSupplierRepository;
    private final SpotStyleSkcRepository spotStyleSkcRepository;
    private final SpotStylePictureRepository spotStylePictureRepository;
    private final SpotStyleIngredientRepository spotStyleIngredientRepository;
    private final SpotStyleOptRepository spotStyleOptRepository;
    private final SpotBuyerCodeRepository spotBuyerCodeRepository;
    private final PlmBuyerLogRepository plmBuyerLogRepository;
    private final DevelopStyleTaskRepository developStyleTaskRepository;
    private final SkuInfoRemoteHelper skuInfoRemoteHelper;
    private final StyleSkcSkuRepository styleSkcSkuRepository;
    private final SkcImageVectorRepository skcImageVectorRepository;
    private final DesignImageService designImageService;
    private final MulfeatExtractTaskRepository mulfeatExtractTaskRepository;
    @Autowired
    @Lazy
    private StyleOnShelvesService styleOnShelvesService;
    private final ProductRepository productRepository;
    private final ProductSkcRepository productSkcRepository;
    private final Map<String, Consumer<PlmBuyerLog>> PUSH_LOG = new HashMap<>();
    private final static String LOCK_KEY = "sdp-curation:spot:style:";

    @Override
    public PageVo<SpotStyleTaskPageResp> page(SpotStyleTaskPageReq req) {
        final var query = SpotStyleTaskConvert.buildWebPage(req);
        if (query.getEmpty()) {
            return new PageVo<>();
        }
        final var page = this.spotStyleTaskRepository.webPage(query);
        final var records = page.getRecords();
        if (CollectionUtil.isEmpty(records)) {
            return new PageVo<>();
        }
        final var taskIds = records.stream().map(SpotStyleTask::getTaskId).toList();
        final Map<Long, List<SpotStyleSupplier>> supplierMap = mapSupplier(taskIds);
        final Map<Long, List<SpotStyleSkc>> skcMap = mapSkc(taskIds);
        final Map<Long, List<SpotStylePicture>> pictureMap = BasicConvert.groupingBy(
                this.spotStylePictureRepository.listByTaskIds(taskIds),
                SpotStylePicture::getTaskId);
        return BasicConvert.page(page, it -> SpotStyleTaskConvert.convert(it, supplierMap, skcMap, pictureMap));
    }

    @Override
    public void exportExcel(SpotStyleTaskPageReq req, HttpServletResponse response) {
        final var q = SpotStyleTaskConvert.buildWebPage(req);
        if (q.getEmpty()) {
            return;
        }
        q.setPageNum(1);
        q.setPageLimit(999);
        final var page = this.spotStyleTaskRepository.webPage(q);
        final var records = page.getRecords();
        final var data = new ArrayList<SpotStyleExportDTO>(records.size());
        if (CollectionUtil.isEmpty(records)) {
            log.error("查询结果为空");
        } else {
            final var taskIds = records.stream().map(SpotStyleTask::getTaskId).toList();
            final var skcCodes = q.getSkcCodes();
            final var skcs = CollectionUtil.isNotEmpty(skcCodes) ?
                    this.spotStyleSkcRepository.listByTaskIdAndCodes(taskIds, skcCodes) :
                    this.spotStyleSkcRepository.listByTaskIds(taskIds);
            if (CollectionUtil.isNotEmpty(skcs)) {
                final var spuMap = BasicConvert.toMap(records, SpotStyleTask::getTaskId);
                final Map<Long, List<SpotStyleSupplier>> supplierMap = mapSupplier(taskIds);
                final var pictureMap = BasicConvert.groupingBy(
                        this.spotStylePictureRepository.listByTaskIds(taskIds),
                        SpotStylePicture::getSkcId);
                data.addAll(SpotStyleTaskConvert.convert(skcs, spuMap, supplierMap, pictureMap));
            }
        }
        final var fileName = URLEncoder.encode("现货管理信息.xlsx", StandardCharsets.UTF_8).replace("\\+", "%20");
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
        response.setHeader("Content-Disposition", "attachment;filename=" + fileName);
        try {
            EasyExcel.write(response.getOutputStream(), SpotStyleExportDTO.class).sheet("现货管理").doWrite(data);
        } catch (IOException e) {
            log.error("导出失败\t{}", e.getLocalizedMessage(), e);
            throw new BusinessException(e);
        }
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchCreate(List<SpotStyleTaskAddReq> req) {
        validation();
        final var list = supplierValid(req.stream().flatMap(it -> it.getSuppliers().stream()).toList());
        if (CollectionUtil.isNotEmpty(list)) {
            throw new ValidationException("该款号已存在SPU，请勿重复添加");
        }
        saveBatch(SpotStyleTaskConvert.convert(req));
        return true;
    }


    @Transactional(rollbackFor = Exception.class)
    @Override
    public List<SpotStyleEditProductImageResp> batchEditProductImage(List<SpotStyleEditProductImageReq> req) {
        validation();
        final var msg = "上传失败,无法匹配到正确的SPU,请检查文件夹命名";
        final var resp = new ArrayList<SpotStyleEditProductImageResp>();
        final var taskCodes = req.stream().map(SpotStyleEditProductImageReq::getTaskCode).toList();
        final var tasks = this.spotStyleTaskRepository.listByTaskCodes(taskCodes);
        if (CollectionUtil.isEmpty(tasks)) {
            return taskCodes.stream().map(it -> new SpotStyleEditProductImageResp(it, msg)).toList();
        }
        final var taskMap = BasicConvert.toMap(tasks, SpotStyleTask::getTaskCode);
        final var codes = taskMap.keySet();
        final var err = taskCodes.stream()
                .filter(it -> !codes.contains(it)).map(it -> new SpotStyleEditProductImageResp(it, msg)).toList();
        if (CollectionUtil.isNotEmpty(err)) {
            resp.addAll(err);
        }
        if (taskCodes.stream().anyMatch(codes::contains)) {
            final var data = SpotStyleTaskConvert.convertEditProductImage(req, taskMap);
            if (CollectionUtil.isNotEmpty(data)) {
                final var pictures = this.spotStylePictureRepository.listByTaskIds(data.stream()
                        .map(SpotStyleTask::getTaskId).toList());
                if (CollectionUtil.isNotEmpty(pictures)) {
                    pictures.stream().filter(SpotStylePicture::spuImage)
                            .forEach(it -> spotStylePictureRepository.logicDelete(it.getPictureId()));
                }
                this.spotStyleTaskRepository.updateBatchById(data, data.size());
                this.styleSaveOrUpdated(data);
                data.forEach(this::addProductUpdate);
            }
        }

        return resp;
    }


    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean edit(SpotStyleTaskEditReq req) {
        validation();
        final var task = this.spotStyleTaskRepository.obtainById(req.getTaskId());
        if (task.cancelled()) {
            throw new ValidationException("任务已取消,不允许操作");
        }
        final var list = supplierValid(req.getSuppliers());
        if (CollectionUtil.isNotEmpty(list)) {
            if (list.stream().anyMatch(it -> !Objects.equals(req.getTaskId(), it.getTaskId()))) {
                throw new ValidationException("该款号已存在SPU，请勿重复添加");
            }
        }
        validationSizeStandard(req, task);
        final var sizeStandardCode = task.getSizeStandardCode();
        // 先删除再更新、插入
        preEdit(task, req);
        SpotStyleTaskConvert.convert(req, task);
        this.spotStyleTaskRepository.updateById(task);
        this.styleSaveOrUpdated(List.of(task));
        final var es = task.getESuppliers();
        if (CollectionUtil.isNotEmpty(es)) {
            this.spotStyleSupplierRepository.updateBatchById(es, es.size());
        }
        final var ec = task.getESkcs();
        if (CollectionUtil.isNotEmpty(ec)) {
            this.spotStyleSkcRepository.updateBatchById(ec, ec.size());
        }
        final var ei = task.getEIngredients();
        if (CollectionUtil.isNotEmpty(ei)) {
            this.spotStyleIngredientRepository.updateBatchById(ei, ei.size());
        }
        final var pictures = task.getPictures();
        final var skcImageUrls = task.getSkcImageUrls();
        // SKC图片更新
        if (CollectionUtil.isEmpty(pictures)) {
            if (CollectionUtil.isNotEmpty(skcImageUrls)) {
                this.addProductUpdate(task);
                task.setSkcs(ec);
                this.buttedTask(task);
            }
        } else {
            final var skcImageMd5 = skcImageMd5(pictures.stream()
                    .filter(SpotStylePicture::skcImage).map(SpotStylePicture::getPictureUrl).toList());
            // 图片MD5不相等
            if (!StrUtil.equalsIgnoreCase(skcImageMd5, skcImageMd5(skcImageUrls))) {
                this.addProductUpdate(task);
                task.setSkcs(ec);
                this.buttedTask(task);
            }
        }
        if (!Objects.equals(req.getSizeStandardCode(), sizeStandardCode)) {
            generateNewSku(task);
        }
        pushBuyer(List.of(task));
        return true;
    }

    private void generateNewSku(SpotStyleTask task) {
        final var skcList = spotStyleSkcRepository.listByTaskIds(List.of(task.getTaskId()));
        if (CollUtil.isNotEmpty(skcList)) {
            final var skdIds = skcList.stream().map(SpotStyleSkc::getSkcId).toList();
            final var skuList = styleSkcSkuRepository.selectBySkcIds(skdIds);
            if (CollectionUtil.isNotEmpty(skuList)) {
                skuList.forEach(t -> styleSkcSkuRepository.logicDelete(t.getSkuId()));
            }
            skcList.forEach(skc -> generateSku(task, skc));
        }
    }


    private void validationSizeStandard(SpotStyleTaskEditReq req, SpotStyleTask task) {
        if (!Objects.equals(req.getSizeStandardCode(), task.getSizeStandardCode())) {
            List<SpotStyleSkc> skcList = spotStyleSkcRepository.listByTaskIds(List.of(task.getTaskId()));
            if (CollUtil.isNotEmpty(skcList)) {
                final var pushList = skcList.stream().filter(t -> !t.canOnShelve()).toList();
                final var pushBuyerList = skcList.stream()
                        .filter(it -> it.pushedBuyer() || it.buyerCancelled())
                        .toList();
                final var onSaleList = skcList.stream()
                        .filter(SpotStyleSkc::sold).toList();
                if (CollectionUtil.isNotEmpty(pushList)) {
                    final var skcCodes = pushList.stream().map(SpotStyleSkc::getSkcCode).toList();
                    String skcCodesStr = String.join(", ", skcCodes);
                    throw new ValidationException("SKC: " + skcCodesStr + " 已推送商品/买手，不能编辑尺码组");
                }
                if (CollectionUtil.isNotEmpty(pushBuyerList)) {
                    final var skcCodes = pushBuyerList.stream().map(SpotStyleSkc::getSkcCode).toList();
                    String skcCodesStr = String.join(", ", skcCodes);
                    throw new ValidationException("SKC: " + skcCodesStr + " 已推送商品/买手，不能编辑尺码组");
                }
                if (CollectionUtil.isNotEmpty(onSaleList)) {
                    final var skcCodes = onSaleList.stream().map(SpotStyleSkc::getSkcCode).toList();
                    String skcCodesStr = String.join(", ", skcCodes);
                    throw new ValidationException("SKC: " + skcCodesStr + " 已动销，不能编辑尺码组");
                }
            }
        }
    }


    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean editSkc(SpotStyleSkcEditReq req) {
        validation();
        final var task = this.spotStyleTaskRepository.obtainById(req.getTaskId());
        if (task.cancelled()) {
            throw new ValidationException("SPU已经取消,不允许操作");
        }
        final var skc = getSkcThrow(req);
        final var pictures = this.spotStylePictureRepository.listBySkcIds(List.of(skc.getSkcId()));
        if (CollectionUtil.isNotEmpty(pictures)) {
            pictures.forEach(it -> spotStylePictureRepository.logicDelete(it.getPictureId()));
        }
        task.setSkcs(List.of(skc));
        SpotStyleTaskConvert.convertSkc(req, task);
        this.spotStyleSkcRepository.updateById(skc);
        task.setSkcs(null);
        this.styleSaveOrUpdated(List.of(task));
        pushBuyer(List.of(task));
        task.setSkcs(List.of(skc));
        buttedTask(task);
        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchReColor(List<SpotStyleSkcReColorReq> req) {
        validation();
        final var ids = req.stream().map(SpotStyleSkcReColorReq::getTaskId).toList();
        final var tasks = this.spotStyleTaskRepository.listByIds(ids);
        if (CollectionUtil.isEmpty(tasks)) {
            throw new ValidationException("数据不存在");
        }
        final var skcMap = BasicConvert.groupingBy(spotStyleSkcRepository.listByTaskIds(ids), SpotStyleSkc::getTaskId);
        final var taskMap = BasicConvert.toMap(tasks, SpotStyleTask::getTaskId);
        final var data = SpotStyleTaskConvert.convert(req, taskMap, skcMap);
        if (CollectionUtil.isNotEmpty(data)) {
            this.spotStyleTaskRepository.updateBatchById(data, data.size());
            this.styleSaveOrUpdated(data);
            pushBuyer(tasks);
        }
        return true;
    }

    @Override
    public SpotStyleTaskResp detailId(Long taskId) {
        return detail(this.spotStyleTaskRepository.obtainById(taskId, "数据不存在"));
    }

    @Override
    public SpotStyleTaskResp detailCode(String taskCode) {
        final var tasks = this.spotStyleTaskRepository.listByTaskCodes(List.of(taskCode));
        if (CollectionUtil.isEmpty(tasks)) {
            throw new ValidationException("数据不存在");
        }
        return this.detail(tasks.getFirst());
    }


    @Override
    public List<SpotStyleOptResp> listOpt(List<Long> taskIds) {
        if (CollectionUtil.isEmpty(taskIds)) {
            return Collections.emptyList();
        }
        final var data = this.spotStyleOptRepository.listByTaskIds(taskIds);
        if (CollectionUtil.isEmpty(data)) {
            return Collections.emptyList();
        }
        return data.stream().map(SpotStyleTaskConvert::toOptResp).toList();
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchCancel(List<SpotStyleCancelReq> req) {
        validation();
        return batchCancel(req, true);
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchOnShelves(List<Long> taskIds) {
        validation();
        final var tasks = this.spotStyleTaskRepository.listByIds(taskIds);
        if (CollectionUtil.isEmpty(tasks)) {
            throw new ValidationException("SPU不存在");
        }
        final var data = SpotStyleTaskConvert.convertOnShelve(tasks, this.spotStyleSkcRepository.listByTaskIds(taskIds));
        if (CollectionUtil.isEmpty(data)) {
            return false;
        }
        final var skcs = data.stream().flatMap(it -> it.getSkcs().stream())
                .filter(SpotStyleSkc::hasCode).toList();
        if (CollectionUtil.isEmpty(skcs)) {
            return false;
        }
        final var pictures = this.spotStylePictureRepository.listByTaskIds(taskIds);
        final var ingredients = this.spotStyleIngredientRepository.listByTaskIds(taskIds);
        final var pictureMap = BasicConvert.groupingBy(pictures, SpotStylePicture::getTaskId);
        final var ingredientMap = BasicConvert.groupingBy(ingredients, SpotStyleIngredient::getTaskId);

        this.spotStyleTaskRepository.updateBatchById(data, data.size());
        this.spotStyleSkcRepository.updateBatchById(skcs, skcs.size());
        data.forEach(it -> {
            onShelves(it, pictureMap, ingredientMap);
            it.setPictures(null);
            it.setIngredients(null);
            it.setSkcs(null);
        });
        this.styleSaveOrUpdated(data);

        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchCancelSkc(List<SpotStyleSkcCancelReq> req) {
        validation();
        return batchCancelSkc(req, true);
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean onShelvesResult(List<SpotStyleTaskOnShelvesReviewReq> req) {
        final var spus = spotStyleTaskRepository.listByIds(req.stream().map(SpotStyleTaskOnShelvesReviewReq::getSpuId).toList());
        if (CollectionUtil.isEmpty(spus)) {
            throw new ValidationException("SPU不存在");
        }

        final var skcs = this.spotStyleSkcRepository.listByTaskIds(spus.stream().map(SpotStyleTask::getTaskId).toList());
        if (CollectionUtil.isEmpty(skcs)) {
            throw new ValidationException("SKC不存在");
        }
        final var list = SpotStyleTaskConvert.batchOnShelvesReview(req, skcs);
        if (CollectionUtil.isEmpty(list)) {
            return false;
        }
        this.spotStyleSkcRepository.updateBatchById(list, list.size());
        final var opts = new ArrayList<SpotStyleOpt>();
        list.forEach(it -> {
            if (CollectionUtil.isNotEmpty(it.getOpts())) {
                opts.addAll(it.getOpts());
            }
        });
        if (CollectionUtil.isNotEmpty(opts)) {
            this.spotStyleOptRepository.saveBatch(opts, opts.size());
        }
        return true;
    }


    @Override
    public Boolean releaseResult(StyleOnShelvesReleaseReq req) {
        final var spu = spotStyleTaskRepository.getById(req.getStyleId());
        if (null == spu) {
            throw new ValidationException("SPU不存在");
        }

        final var skcs = this.spotStyleSkcRepository.listByTaskIds(List.of(req.getStyleId()));
        if (CollectionUtil.isEmpty(skcs)) {
            throw new ValidationException("SKC不存在");
        }
        final var list = SpotStyleTaskConvert.batchOnShelvesReleaseResult(req, skcs);
        if (CollectionUtil.isEmpty(list)) {
            return false;
        }
        final var opts = new ArrayList<SpotStyleOpt>();
        list.forEach(it -> {
            if (CollectionUtil.isNotEmpty(it.getOpts())) {
                opts.addAll(it.getOpts());
            }
        });
        transaction(() -> {
            this.spotStyleSkcRepository.updateBatchById(list, list.size());
            if (CollectionUtil.isNotEmpty(opts)) {
                this.spotStyleOptRepository.saveBatch(opts, opts.size());
            }
        });
        return true;
    }

    @Override
    public Boolean updateProductTag(Long taskId, List<SpotStylePicture> pictures, List<String> skcImageUrls) {
        final var task = this.spotStyleTaskRepository.obtainById(taskId);
        if (CollectionUtil.isEmpty(pictures)) {
            if (CollectionUtil.isNotEmpty(skcImageUrls)) {
                this.addProductUpdate(task);
            }
        } else {
            final var skcImageMd5 = skcImageMd5(pictures.stream()
                    .filter(SpotStylePicture::skcImage).map(SpotStylePicture::getPictureUrl).toList());
            // 图片MD5不相等
            if (!StrUtil.equalsIgnoreCase(skcImageMd5, skcImageMd5(skcImageUrls))) {
                this.addProductUpdate(task);
            }
        }
        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void designerChange(SpotStyleChangeDesignerReq req) {
        log.info("设计师变更请求：\t{}", JsonsKt.toJsonPretty(req));
        DesignerRemoteReq designerRemoteReq = new DesignerRemoteReq();
        designerRemoteReq.setDesignerId(String.valueOf(req.getDesignerId()));
        final var designerList = selectByDesignerIds(List.of(req.getDesignerId()));
        if (CollectionUtil.isEmpty(designerList)) {
            throw new ValidationException("不存在此设计师");
        }
        List<Long> taskIds = req.getTaskIds();
        List<SpotStyleTask> spuList = new ArrayList<>();
        List<SpotStyleOpt> optList = new ArrayList<>();
        List<SpotStyleTask> spus = spotStyleTaskRepository.listByIds(taskIds);
        Map<Long, SpotStyleTask> spuMap = StreamUtil.list2Map(spus, SpotStyleTask::getTaskId);
        for (Long id : taskIds) {
            SpotStyleTask spu = spuMap.get(id);
            Assert.notNull(spu, "不存在此设计款号信息，主键ID:{}", id);
            if (spu.cancelled()) {
                throw new ValidationException("当前设计款号已取消!");
            }
            final var designerDTO = designerList.get(0);
            spu.setDesignerId(req.getDesignerId());
            spu.setDesignerCode(designerDTO.getDesignerCode());
            spu.setDesignerName(designerDTO.getDesignerName());
            spotStyleTaskRepository.updateByIdManualFill(spu);
            String content = "将设计师" + spu.getDesignerName() + "变更为" + req.getDesignerName();
            optList.add(SpotStyleTaskConvert.obtainOpt(SpotStyleOptTypeEnum.CHANGE_DESIGNER, spu, content));
        }
        if (CollectionUtil.isNotEmpty(optList)) {
            this.spotStyleOptRepository.saveBatch(optList);
        }
    }


    @Transactional(rollbackFor = Exception.class)
    @Override
    public String batchDevelop(DevelopStyleTask task) {
        validation();
        final var list = SpotStyleTaskConvert.convert(List.of(SpotStyleTaskConvert.buildAdd(task)));
        list.forEach(it -> {
            it.setSourceId(task.getTaskId());
            it.setTaskStatus(SpotStyleTask.MAIN_IMG_Y);
            it.setSourceType(SourceTypeEnum.DEVELOP_STYLE.getCode());
            it.setUsableLabels(task.getUsableLabels());
            it.setTitleData(task.getTitleData());
            final var skcs = it.getSkcs();
            if (CollectionUtil.isNotEmpty(skcs)) {
                skcs.forEach(skc -> skc.setSkcStatus(SpotStyleSkc.MAIN_IMG_Y));
            }
        });
        this.saveBatch(list);
        return list.getFirst().getTaskCode();
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchImageUpdate(List<SpotStyleImageUpdateReq> reqs) {
        validation();
        final var tasks = this.spotStyleTaskRepository.listByIds(reqs.stream().map(SpotStyleImageUpdateReq::getTaskId).toList());
        if (CollectionUtil.isEmpty(tasks)) {
            throw new ValidationException("SPU不存在");
        }
        final var list = SpotStyleTaskConvert.convertImageUpdate(reqs, tasks);
        if (CollectionUtil.isEmpty(list)) {
            return false;
        }
        this.spotStyleTaskRepository.updateBatchById(list, list.size());
        final var pictures = list.stream()
                .filter(it -> CollectionUtil.isNotEmpty(it.getPictures()))
                .flatMap(it -> it.getPictures().stream()).toList();
        if (CollectionUtil.isEmpty(pictures)) {
            return true;
        }
        final var data = this.spotStylePictureRepository.listByTaskIds(pictures.stream()
                .map(SpotStylePicture::getTaskId).toList());
        if (CollectionUtil.isNotEmpty(data)) {
            data.stream().filter(SpotStylePicture::spuImage).forEach(it -> spotStylePictureRepository.logicDelete(it.getPictureId()));
        }
        this.spotStylePictureRepository.saveBatch(pictures, pictures.size());
        return true;
    }

    @Override
    public List<SpotStyleSupplierResp> listSupplier(List<SpotSupplierListReq> reqs) {
        final var list = this.spotStyleSupplierRepository.listBySupplierStyleCodeAndNames(reqs);
        if (CollectionUtil.isEmpty(list)) {
            return Collections.emptyList();
        }
        final var taskMap = BasicConvert.toMap(spotStyleTaskRepository.listByIds(list.stream()
                .map(SpotStyleSupplier::getTaskId).collect(Collectors.toSet())), SpotStyleTask::getTaskId);
        return list.stream().map(it -> {
            final var e = BasicConvert.copy(it, SpotStyleSupplierResp.class);
            final var task = taskMap.get(it.getTaskId());
            e.setTaskId(task.getTaskId());
            e.setTaskCode(task.getTaskCode());
            return e;
        }).toList();
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public boolean temuSync(TemuOrderSync sync) {
        final var tasks = this.spotStyleTaskRepository.listByTaskCodes(List.of(sync.getSpuCode()));
        if (CollectionUtil.isEmpty(tasks)) {
            return false;
        }
        final var skc = this.spotStyleSkcRepository.getById(sync.getSkcId());
        if (Objects.isNull(skc)) {
            return false;
        }
        final var spu = tasks.getFirst();
        if (!Objects.equals(spu.getTaskId(), skc.getTaskId())) {
            return false;
        }
        SpotStyleTaskConvert.convert(sync, skc);
        this.spotStyleSkcRepository.updateById(skc);
        final var task = tasks.getFirst();
        // 没推送买手
        if (!task.pushedBuyer()) {
            task.setTaskStatus(task.getTaskStatus() + SpotStyleTask.PUSH_BUYER_Y);
//            final var skcs = this.spotStyleSkcRepository.listByTaskIds(List.of(task.getTaskId()));
//            skcs.forEach(it -> skc.setSkcStatus(it.requireSkcStatus() + SpotStyleSkc.PUSH_BUYER_Y));
            this.spotStyleTaskRepository.updateById(task);
//            this.spotStyleSkcRepository.updateBatchById(skcs, skcs.size());
            task.setSkcs(this.spotStyleSkcRepository.listByTaskIds(List.of(task.getTaskId())));
            pushSkc(task);
        }
        task.setSkcs(List.of(skc));
        getDevelopStyle(task);
//        this.styleOnShelvesService.onShelves(StyleOnShelvesConvert.convert(task));
        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean pushPlmBuyer(List<Long> taskIds) {
        validation();
        final var tasks = this.spotStyleTaskRepository.listByIds(taskIds);
        if (CollectionUtil.isEmpty(tasks)) {
            return false;
        }
        final var list = tasks.stream()
                .filter(SpotStyleTask::dataCompleted)
                .filter(SpotStyleTask::hasMainImg)
                .filter(it -> !it.cancelled())
                .filter(SpotStyleTask::hasCode).toList();
        if (CollectionUtil.isEmpty(list)) {
            return false;
        }
        final var skcs = this.spotStyleSkcRepository.listByTaskIds(
                list.stream().map(BasicTask::getTaskId).toList());
        final var needPush = skcs.stream().filter(SpotStyleSkc::hasCode)
                .filter(it -> !it.pushedBuyer() || it.pushFailed())
                .toList();
        if (CollectionUtil.isEmpty(needPush)) {
            return false;
        }
        final var skcMap = BasicConvert.groupingBy(needPush, SpotStyleSkc::getTaskId);
        SpotStyleTaskConvert.convertBuyer(list, skcMap);
        this.spotStyleTaskRepository.updateBatchById(list, list.size());
//        this.spotStyleSkcRepository.updateBatchById(needPush, needPush.size());
        styleSaveOrUpdated(list);
        pushBuyer(list);
        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchBuyerCancel(List<SpotSkcCancelReq> req) {
        log.info("买手取消现货-参数\t{}", JsonsKt.toJsonPretty(req));
        final var skcCodes = req.stream().map(SpotSkcCancelReq::getDesignCode).toList();
        if (CollectionUtil.isEmpty(skcCodes)) {
            return false;
        }
        final var skcs = this.spotStyleSkcRepository.listBySkcCodes(skcCodes);
        if (CollectionUtil.isEmpty(skcs)) {
            return false;
        }
        final var reqMap = BasicConvert.toMap(req, SpotSkcCancelReq::getDesignCode);
        skcs.stream().filter(it -> !it.buyerCancelled())
                .forEach(it -> buyerCancel(reqMap.get(it.getSkcCode()), it));
        return true;
    }

    @Override
    public List<SkcImageResp> listByDesignImage(List<DesignImageDTO> spotVectors) {
        if (CollectionUtil.isEmpty(spotVectors)) {
            return List.of();
        }
        final var mapVector = BasicConvert.groupingBy(spotVectors, DesignImageDTO::getSkcId);
        final var skcIds = mapVector.keySet();
        final var skcs = this.spotStyleSkcRepository.listByIds(skcIds);
        if (CollectionUtil.isEmpty(skcs)) {
            return List.of();
        }
        final var taskIds = skcs.stream().map(SpotStyleSkc::getTaskId).toList();
        final var taskMap = BasicConvert.toMap(this.spotStyleTaskRepository.listByIds(taskIds), SpotStyleTask::getTaskId);
        final var supplierMap = BasicConvert.groupingBy(this.spotStyleSupplierRepository.listByTaskIds(taskIds),
                SpotStyleSupplier::getTaskId);
        final var designerMap = BasicConvert.toMap(SdpMaterialDesignerApi.listDesignerGroup(), DesignerDTO::getDesignerId);
        final var list = new ArrayList<SkcImageResp>();
        skcs.stream().filter(it -> skcIds.contains(it.getSkcId()))
                .forEach(skc -> mapVector.get(skc.getSkcId())
                        .forEach(it ->
                                list.add(SpotStyleTaskConvert.convert(skc, supplierMap, designerMap, it, taskMap))
                        )
                );
        return list;
    }

    @Override
    public void historyVector() {
        final var tasks = this.spotStyleTaskRepository.list().stream().filter(SpotStyleTask::hasCode).toList();
        if (CollectionUtil.isEmpty(tasks)) {
            return;
        }
        final var skcs = this.spotStyleSkcRepository.listByTaskIds(tasks.stream().map(SpotStyleTask::getTaskId).toList())
                .stream().filter(SpotStyleSkc::hasCode).toList();
        if (CollectionUtil.isEmpty(skcs)) {
            return;
        }
        final var skcMap = BasicConvert.groupingBy(skcs, SpotStyleSkc::getTaskId);
        for (final var it : tasks) {
            final var list = skcMap.get(it.getTaskId());
            if (CollectionUtil.isEmpty(list)) {
                continue;
            }
            final var feats = this.mulfeatExtractTaskRepository.listByBusIds(list.stream().map(SpotStyleSkc::getSkcId).toList(), SourceEnum.SPOT_STYLE);
            if (CollectionUtil.isNotEmpty(feats)) {
                continue;
            }
            it.setSkcs(list);
            this.buttedTask(it);
        }
    }

    private void buyerCancel(final SpotSkcCancelReq req, final SpotStyleSkc skc) {
        this.doAsUser(skc, () -> {
            SpotStyleTaskConvert.convert(req, skc);
            this.spotStyleSkcRepository.updateById(skc);
            this.spotStyleOptRepository.saveBatch(skc.getOpts());
        });
    }

    @Override
    public boolean test(Long taskId) {
//        this.pushPlmBuyerEditImage(this.plmBuyerLogRepository.obtainById(7396804443762798723L));
//        this.pushPlmBuyerAdd(this.plmBuyerLogRepository.obtainById(7396725779465449473L));
//        this.pushPlmBuyerCode(this.plmBuyerLogRepository.obtainById(7396725779465449473L));
        final var task = this.spotStyleTaskRepository.obtainById(7430793388251004971L);
        task.setSkcs(this.spotStyleSkcRepository.listByTaskIds(List.of(7430793388251004971L)));
        this.syncVector(task, this.developStyleTaskRepository.obtainById(7430790045252304897L));
        return true;
    }

    @Override
    public void job() {
        log.info("现货任务-定时任务-开始");
        final var list = this.plmBuyerLogRepository.jobs();
        if (CollectionUtil.isNotEmpty(list)) {
            list.forEach(this::pushBuyer);
        }
        final var feats = this.mulfeatExtractTaskRepository.jobs(SourceEnum.SPOT_STYLE);
        if (CollectionUtil.isNotEmpty(feats)) {
            feats.forEach(this::pushMulfeatExtract);
        }
        // 同步商品状态
        final var tasks = this.spotStyleTaskRepository.list();
        if (CollectionUtil.isNotEmpty(tasks)) {
            tasks.forEach(this::job);
        }
        log.info("现货任务-定时任务-结束");
    }


    @Override
    public void callback(AiTaskCallbackReq req) {
        log.info("现货任务-图片特征提取callback\t{}", JsonsKt.toJsonPretty(req));
        execOrElse(this.mulfeatExtractTaskRepository.getById(req.getBusId()),
                this::callbackMulfeatExtract,
                () -> log.warn("现货任务-图片特征提取callback任务【{}】不存在", req.getBusId()));
    }


    @RabbitListener(
            id = "sdpCurationSpotStylePlmBuyerConsumer",
            concurrency = "4-8",
            bindings =
            @QueueBinding(
                    value = @Queue(value = RabbitConstant.PUSH_PLM_BUYER_QUEUE, durable = "true", autoDelete = "false"),
                    exchange = @Exchange(value = RabbitConstant.PUSH_PLM_BUYER_EXCHANGE),
                    key = RabbitConstant.PUSH_PLM_BUYER_ROUTING_KEY))
    @Override
    public void pushTask(Message message, Channel channel) {
        rabbitConsumer.handle(message, channel,
                () -> pushBuyer(message),
                e -> log.error("任务消费失败,{}", e.getLocalizedMessage(), e));
    }

    private void pushMulfeatExtract(final MulfeatExtractTask mulfeatExtractTask) {
        final var tasks = this.spotStyleTaskRepository.listByTaskCodes(List.of(mulfeatExtractTask.getTaskCode()));
        if (CollectionUtil.isEmpty(tasks)) {
            return;
        }
        execOrElse(MulfeatExtractApi.getByBusIdOrNull(mulfeatExtractTask.getTaskId()),
                it -> callbackMulfeatExtract(mulfeatExtractTask, it, tasks),
                () -> this.pushMulfeatExtract(tasks.getFirst(), List.of(mulfeatExtractTask)));
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
        final var tasks = this.spotStyleTaskRepository.listByTaskCodes(List.of(extract.getTaskCode()));
        if (CollectionUtil.isEmpty(tasks)) {
            return;
        }
        callbackMulfeatExtract(extract, vo, tasks);
    }

    private void callbackMulfeatExtract(final MulfeatExtractTask extract, final MulfeatExtractTaskVo vo,
                                        final List<SpotStyleTask> tasks) {
        final var skc = this.spotStyleSkcRepository.getById(extract.getBusId());
        if (Objects.isNull(skc)) {
            return;
        }
        final var task = tasks.getFirst();
        task.setSkcs(List.of(skc));
        task.setMulfeatExtracts(List.of(extract));
        lock(LOCK_KEY + "mulfeat:extract:callback" + extract.getBusId(), 90L, () -> {
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

    private void setVector(final SpotStyleTask task) {
        final var vector = DesignImageConvert.convert(task);
        final var e = skcImageVectorRepository.getById(vector.getImageId());
        if (Objects.nonNull(e)) {
            return;
        }
        this.skcImageVectorRepository.save(vector);
        // 同步
        designImageService.saveVector(vector);
    }

    private void pushBuyer(final Message message) {
        final var body = new String(message.getBody());
        log.info("现货任务消息\t{}", body);
        final var dto = JsonsKt.parseJson(body, SpotTaskMessageDTO.class);
        if (StrUtil.equalsIgnoreCase(SpotTaskMessageEnum.BUTTED.getCode(), dto.getType())) {
            // 推送算法任务
            execOrElse(this.spotStyleTaskRepository.getById(dto.getTaskId()),
                    this::pushButted, () -> log.error("任务消费失败【{}】,现货任务不存在", dto.getTaskId()));

        } else {
            execOrElse(this.plmBuyerLogRepository.getById(dto.getTaskId()),
                    this::pushBuyer,
                    () -> log.error("任务消费失败【{}】,任务不存在", dto.getTaskId()));
        }
    }

    private void pushButted(final SpotStyleTask task) {
        final var skcs = spotStyleSkcRepository.listByTaskIds(List.of(task.getTaskId()));
        if (CollectionUtil.isEmpty(skcs)) {
            return;
        }
        final var feats = this.mulfeatExtractTaskRepository.listByBusIds(skcs.stream()
                .map(SpotStyleSkc::getSkcId).toList(), SourceEnum.SPOT_STYLE);
        if (CollectionUtil.isEmpty(feats)) {
            return;
        }
        pushMulfeatExtract(task, feats);

    }

    private void pushMulfeatExtract(final SpotStyleTask task, final List<MulfeatExtractTask> feats) {
        feats.stream()
                .filter(it -> Objects.equals(Bool.NO.getCode(), it.getPushStatus()))
                .forEach(it -> tryFinally(() -> {
                            it.setPushTime(LocalDateTime.now());
                            task.setMulfeatExtracts(List.of(it));
                            MulfeatExtractApi.create(SpotStyleTaskConvert.buildMulfeatExtractReq(task));
                            it.setPushStatus(Bool.YES.getCode());
                        },
                        e -> {
                            it.setMessage(e.getLocalizedMessage());
                            log.error("现货任务【{}】-图片特征提取推送失败\t{}", it.getTaskId(), e.getLocalizedMessage(), e);
                        },
                        () -> this.mulfeatExtractTaskRepository.updateByIdManualFill(it)));
    }

    private void pushBuyer(final PlmBuyerLog plmBuyerLog) {
        this.doAsUser(plmBuyerLog, () -> PUSH_LOG.get(plmBuyerLog.getLogType()).accept(plmBuyerLog));
    }

    private SpotStyleTaskResp detail(final SpotStyleTask task) {
        final var taskIds = List.of(task.getTaskId());
        task.setSkcs(this.spotStyleSkcRepository.listByTaskIds(taskIds));
        task.setPictures(this.spotStylePictureRepository.listByTaskIds(taskIds));
        task.setIngredients(this.spotStyleIngredientRepository.listByTaskIds(taskIds));
        task.setOpts(this.spotStyleOptRepository.listByTaskIds(taskIds));
        task.setSuppliers(this.spotStyleSupplierRepository.listByTaskIds(taskIds));
        return SpotStyleTaskConvert.toDetailResp(task);
    }

    private void validation() {
        designer();
    }

    private SpotStyleSkc getSkcThrow(final SpotStyleSkcEditReq req) {
        final var skcs = spotStyleSkcRepository.listByTaskIds(List.of(req.getTaskId()));
        if (CollectionUtil.isEmpty(skcs)) {
            throw new ValidationException("SKC不存在");
        }
        if (skcs.stream().filter(it -> !Objects.equals(it.getSkcId(), req.getSkcId()))
                .anyMatch(it -> StrUtil.equalsIgnoreCase(it.getColor(), req.getColor()))) {
            throw new ValidationException("存在颜色重复的SKC,请勿重复创建");
        }
        return skcs.stream()
                .filter(it -> Objects.equals(it.getSkcId(), req.getSkcId()))
                .findFirst().orElseThrow(() -> new ValidationException("SKC不存在"));
    }

    private void preEdit(final SpotStyleTask task, final SpotStyleTaskEditReq req) {
        final var taskIds = List.of(task.getTaskId());
        final var suppliers = this.spotStyleSupplierRepository.listByTaskIds(taskIds);
        final var skcs = this.spotStyleSkcRepository.listByTaskIds(taskIds);
        final var pictures = this.spotStylePictureRepository.listByTaskIds(taskIds);
        final var ingredients = this.spotStyleIngredientRepository.listByTaskIds(taskIds);
        // 先删除再加回来
        if (CollectionUtil.isNotEmpty(pictures)) {
            task.setSkcImageUrls(pictures.stream()
                    .filter(SpotStylePicture::skcImage)
                    .map(SpotStylePicture::getPictureUrl).toList());
            pictures.forEach(it -> spotStylePictureRepository.logicDelete(it.getPictureId()));
        }
        delSupplier(task, req.getSuppliers(), suppliers);
        delSkc(task, req.getSkcs(), skcs);
        delIngredient(task, req.getIngredients(), ingredients);
    }


    private void delIngredient(final SpotStyleTask task, final List<SpotStyleIngredientAddReq> reqs,
                               final List<SpotStyleIngredient> data) {
        task.setEIngredients(new ArrayList<>());
        del(task.getEIngredients(), data, reqs,
                SpotStyleIngredientAddReq::getIngredientId,
                SpotStyleIngredient::getIngredientId, spotStyleIngredientRepository::logicDelete);
    }

    private void delSkc(final SpotStyleTask task, final List<SpotStyleSkcAddReq> reqs,
                        final List<SpotStyleSkc> data) {
        task.setESkcs(new ArrayList<>());
        // 删除ID不在的数据
        del(task.getESkcs(), data, reqs,
                SpotStyleSkcAddReq::getSkcId,
                SpotStyleSkc::getSkcId, spotStyleSkcRepository::logicDelete);
    }

    private void delSupplier(final SpotStyleTask task, final List<SpotStyleSupplierAddReq> reqs,
                             final List<SpotStyleSupplier> data) {
        task.setESuppliers(new ArrayList<>());
        del(task.getESuppliers(), data, reqs,
                SpotStyleSupplierAddReq::getSupplierId,
                SpotStyleSupplier::getSupplierId, spotStyleSupplierRepository::logicDelete);
    }

    private void styleSaveOrUpdated(final List<SpotStyleTask> list) {
        final var opts = new ArrayList<SpotStyleOpt>();
        final var ingredients = new ArrayList<SpotStyleIngredient>();
        final var pictures = new ArrayList<SpotStylePicture>();
        final var skcs = new ArrayList<SpotStyleSkc>();
        final var suppliers = new ArrayList<SpotStyleSupplier>();
        final var codes = new ArrayList<SpotBuyerCode>();
        final var logs = new ArrayList<PlmBuyerLog>();
        list.forEach(it -> {
            if (CollectionUtil.isNotEmpty(it.getOpts())) {
                opts.addAll(it.getOpts());
            }
            if (CollectionUtil.isNotEmpty(it.getPictures())) {
                pictures.addAll(it.getPictures());
            }
            if (CollectionUtil.isNotEmpty(it.getIngredients())) {
                ingredients.addAll(it.getIngredients());
            }
            if (CollectionUtil.isNotEmpty(it.getSkcs())) {
                skcs.addAll(it.getSkcs());
            }
            if (CollectionUtil.isNotEmpty(it.getSuppliers())) {
                suppliers.addAll(it.getSuppliers());
            }
            if (CollectionUtil.isNotEmpty(it.getCodes())) {
                codes.addAll(it.getCodes());
            }
            if (CollectionUtil.isNotEmpty(it.getLogs())) {
                logs.addAll(it.getLogs());
            }
        });
        if (CollectionUtil.isNotEmpty(opts)) {
            this.spotStyleOptRepository.saveBatch(opts, opts.size());
        }
        if (CollectionUtil.isNotEmpty(pictures)) {
            this.spotStylePictureRepository.saveBatch(pictures, pictures.size());
        }
        if (CollectionUtil.isNotEmpty(ingredients)) {
            this.spotStyleIngredientRepository.saveBatch(ingredients, ingredients.size());
        }
        if (CollectionUtil.isNotEmpty(skcs)) {
            this.spotStyleSkcRepository.saveBatch(skcs, skcs.size());
        }
        if (CollectionUtil.isNotEmpty(suppliers)) {
            this.spotStyleSupplierRepository.saveBatch(suppliers, suppliers.size());
        }
        if (CollectionUtil.isNotEmpty(codes)) {
            this.spotBuyerCodeRepository.saveBatch(codes, codes.size());
        }
        if (CollectionUtil.isNotEmpty(logs)) {
            this.plmBuyerLogRepository.saveBatch(logs, logs.size());
        }
    }

    private Map<Long, List<SpotStyleSupplier>> mapSupplier(final List<Long> taskIds) {
        return BasicConvert.groupingBy(this.spotStyleSupplierRepository.listByTaskIds(taskIds), SpotStyleSupplier::getTaskId);
    }

    private Map<Long, List<SpotStyleSkc>> mapSkc(final List<Long> taskIds) {
        return BasicConvert.groupingBy(this.spotStyleSkcRepository.listByTaskIds(taskIds), SpotStyleSkc::getTaskId);
    }

    private void saveBatch(final List<SpotStyleTask> list) {
        this.spotStyleTaskRepository.saveBatch(list);
        styleSaveOrUpdated(list);
        pushBuyer(list);
    }

    private void pushBuyer(final List<SpotStyleTask> list) {
        pushBuyerLogs(list.stream().filter(it -> CollectionUtil.isNotEmpty(it.getLogs()))
                .flatMap(it -> it.getLogs().stream()).toList());
    }

    private void pushBuyerLogs(final List<PlmBuyerLog> logs) {
        logs.forEach(it -> {
                    final var d = new SpotTaskMessageDTO();
                    d.setType(SpotTaskMessageEnum.BUYER.getCode());
                    d.setTaskId(it.getLogId());
                    this.send(it, JsonsKt.toJson(d), RabbitConfigEnum.PUSH_PLM_BUYER);
                }
        );
    }

    private boolean batchCancel(final List<SpotStyleCancelReq> reqs, final boolean spu) {
        final var tasks = this.spotStyleTaskRepository.listByIds(reqs.stream().map(SpotStyleCancelReq::getTaskId).toList());
        if (CollectionUtil.isEmpty(tasks)) {
            throw new ValidationException("SPU不存在");
        }
        final var list = SpotStyleTaskConvert.convert(reqs, tasks);
        if (CollectionUtil.isEmpty(list)) {
            return false;
        }
        this.spotStyleTaskRepository.updateBatchById(list, list.size());
        this.styleSaveOrUpdated(list);
        // 取消SPU最后需要取消SKC
        if (spu) {
            final var taskMap = BasicConvert.toMap(reqs, SpotStyleCancelReq::getTaskId);
            final var skc = this.spotStyleSkcRepository.listByTaskIds(list.stream()
                            .map(SpotStyleTask::getTaskId).collect(Collectors.toList())).stream()
                    .filter(it -> !it.cancelled()).toList();
            if (CollectionUtil.isNotEmpty(skc)) {
                batchCancelSkc(skc.stream()
                        .map(it -> new SpotStyleSkcCancelReq(it.getSkcId(),
                                taskMap.get(it.getTaskId()).getMessage())).toList(), false);
            }
        }
        return true;
    }

    private boolean batchCancelSkc(List<SpotStyleSkcCancelReq> req, final boolean skc) {
        final var skcs = this.spotStyleSkcRepository.listByIds(req.stream().map(SpotStyleSkcCancelReq::getSkcId).toList());
        if (CollectionUtil.isEmpty(skcs)) {
            throw new ValidationException("SKC不存在");
        }
        final var list = SpotStyleTaskConvert.convertCancelSkc(req, skcs);
        if (CollectionUtil.isEmpty(list)) {
            return false;
        }
        this.spotStyleSkcRepository.updateBatchById(list, list.size());
        final var opts = list.stream().flatMap(it -> it.getOpts().stream()).toList();
        final var logs = list.stream().filter(SpotStyleSkc::pushedBuyer)
                .flatMap(it -> it.getLogs().stream()).toList();
        this.spotStyleOptRepository.saveBatch(opts, opts.size());
        if (CollectionUtil.isNotEmpty(logs)) {
            this.plmBuyerLogRepository.saveBatch(logs, logs.size());
            pushBuyerLogs(logs);
        }
        // 取消SKC最后需要判断是否取消SPU
        if (skc) {
            final var taskIds = list.stream().map(SpotStyleSkc::getTaskId).collect(Collectors.toSet());
            final var reqs = new ArrayList<SpotStyleCancelReq>();
            BasicConvert.groupingBy(this.spotStyleSkcRepository.listByTaskIds(new ArrayList<>(taskIds)),
                    SpotStyleSkc::getTaskId).forEach((k, v) -> {
                if (v.stream().allMatch(SpotStyleSkc::cancelled)) {
                    reqs.add(new SpotStyleCancelReq(k, v.getLast().getMessage()));
                }
            });
            if (CollectionUtil.isNotEmpty(reqs)) {
                this.batchCancel(reqs, false);
            }
        }
        return true;
    }

    private List<SpotStyleSupplier> supplierValid(final List<SpotStyleSupplierAddReq> reqs) {
        if (CollectionUtil.isEmpty(reqs)) {
            return Collections.emptyList();
        }
        final var list = reqs.stream().filter(it -> StrUtil.isNotBlank(it.getSupplierName()))
                .filter(it -> StrUtil.isNotBlank(it.getSupplierStyleCode()))
                .map(it -> new SpotSupplierListReq(it.getSupplierName(), it.getSupplierStyleCode())).toList();
        if (CollectionUtil.isEmpty(list)) {
            return Collections.emptyList();
        }
        return this.spotStyleSupplierRepository.listBySupplierStyleCodeAndNames(list);
    }

    private <T extends BaseTenantUserEntity, R extends Serializable> void del(final List<T> list, final List<T> data,
                                                                              final List<R> reqs, final Function<R, Long> fn,
                                                                              final Function<T, Long> id, final Consumer<Long> run) {
        if (CollectionUtil.isEmpty(data)) {
            return;
        }
        // 删除ID不在的数据
        if (CollectionUtil.isEmpty(reqs)) {
            data.forEach(it -> run.accept(id.apply(it)));
            return;
        }
        final var ids = reqs.stream().map(fn).filter(Objects::nonNull).filter(it -> it > 0).collect(Collectors.toSet());
        // 都不传ID说明旧数据都不要
        if (CollectionUtil.isEmpty(ids)) {
            data.forEach(it -> run.accept(id.apply(it)));
            return;
        }
        data.forEach(it -> {
            final var r = id.apply(it);
            // 不存在则删除
            if (!ids.contains(r)) {
                run.accept(r);
            } else {
                // 说明有更新
                list.add(it);
            }
        });
    }


    private void plmCategory(final SpotStyleTask task) {
        final var list = PlmConvertHelper.plmCategoryList();
        final var codeList = StrUtil.split(task.getCategoryCode(), "-");
        final var dictMap = BasicConvert.toMap(list, DictDTO::getId);
        final var categoryCode = new ArrayList<String>();
        final var categoryName = new ArrayList<String>();
        final var labelMap = PlmConvertHelper.mapLabel(task.getUsableLabels());
        final var defaultDict = new ArrayList<DictDTO>();
        final var categoryDict = new ArrayList<DictDTO>();
        PlmConvertHelper.plmCategory(list, codeList.getLast(), defaultDict, categoryDict,
                it -> PlmConvertHelper.plmCategoryFilterLabel(task.getWeaveModeName(),
                        Objects.equals(0L, task.getSourceId()), labelMap, it));
//        list.stream()
//                .filter(it -> CollectionUtil.isNotEmpty(it.getAttributes()))
//                .forEach(it -> {
//                    final var attrs = it.getAttributes().stream().toList();
//                    final var attrCodes = attrs.stream().map(AttributeVo::getCode).collect(Collectors.toSet());
//                    // 编码一样的
//                    if (attrs.stream().anyMatch(a -> StrUtil.equalsIgnoreCase(lastCode, a.getName()))) {
//                        if (attrCodes.contains("isdefault")) {
//                            defaultDict.add(it);
//                        } else {
//                            // 不是默认品类,找到第一个就不往下找满足的
//                            if (CollectionUtil.isEmpty(categoryDict) && this.plmCategoryFilterLabel(task, labelMap, it.getLabels())) {
//                                categoryDict.add(it);
//                            }
//                        }
//                    }
//                });
        PlmConvertHelper.filterDict(categoryDict, categoryCode, categoryName, dictMap);
        if (CollectionUtil.isEmpty(categoryCode)) {
            log.info("找不到品类,找默认标签\t{}", task.getTaskCode());
            PlmConvertHelper.filterDict(defaultDict, categoryCode, categoryName, dictMap);
        }
        if (CollectionUtil.isNotEmpty(categoryCode)) {
            task.setPlmCategoryCodes(StrUtil.join("-", BasicConvert.reverseList(categoryCode)
                    /*IntStream.range(0, categoryCode.size())
                            .mapToObj(i -> categoryCode.get(categoryCode.size() - 1 - i)).toList()*/));
            task.setPlmCategoryNames(StrUtil.join("-", BasicConvert.reverseList(categoryName)
                /*    IntStream.range(0, categoryName.size())
                            .mapToObj(i -> categoryName.get(categoryName.size() - 1 - i)).toList()*/));
        }
    }


    //    private boolean plmCategoryFilterLabel(final SpotStyleTask task, final Map<String, String> mapLabel,
//                                           final List<LabelVo> labels) {
//        return PlmConvertHelper.plmCategoryFilterLabel(task.getWeaveModeName(),
//                Objects.equals(0L, task.getSourceId()), mapLabel, labels);
//    }
    private void getDevelopStyle(final SpotStyleTask task) {
        if (Objects.requireNonNullElse(task.getSourceId(), 0L) > 0L) {
            task.setDevelopStyle(this.developStyleTaskRepository.getById(task.getSourceId()));
        }
    }

    private void onShelves(final SpotStyleTask task,
                           final Map<Long, List<SpotStylePicture>> mapPicture,
                           final Map<Long, List<SpotStyleIngredient>> ingredientMap) {
        getDevelopStyle(task);
        task.setPictures(mapPicture.getOrDefault(task.getTaskId(), Collections.emptyList()));
        task.setIngredients(ingredientMap.getOrDefault(task.getTaskId(), Collections.emptyList()));
        this.styleOnShelvesService.onShelves(StyleOnShelvesConvert.convert(task));
    }

    private void pushPlmBuyerCode(final PlmBuyerLog buyerLog) {
        pushPlmBuyerLock(buyerLog, () -> {
            final var taskId = logNeedPush(buyerLog);
            if (Objects.equals(0L, taskId)) {
                return;
            }
            final var list = this.spotBuyerCodeRepository.listByLogId(buyerLog.getLogId());
            final var spu = list.stream().filter(SpotBuyerCode::yesSpu).toList().getFirst();
            final var skcs = list.stream().filter(SpotBuyerCode::yesSkc).toList();
            BasicConvert.setRevised(buyerLog);
            if (spu.pushed() || skcs.stream().allMatch(SpotBuyerCode::pushed)) {
                log.info("买手首次分码已经推送\t{}", buyerLog.getLogId());
                buyerLog.setPushStatus(1);
                this.plmBuyerLogRepository.updateByIdManualFill(buyerLog);
                return;
            }
            final var task = this.spotStyleTaskRepository.getById(taskId);
            if (Objects.isNull(task) || task.hasCode()) {
                return;
            }
            final var skcMap = BasicConvert.toMap(skcs, SpotBuyerCode::getTaskId);
            final var spotSkcs = this.spotStyleSkcRepository.listByTaskIds(List.of(taskId));
            tryFinally(() -> {
                final var resp = generateCode(buyerLog, task, skcs.size());
                spu.setCodeStatus(spu.requireCodeStatus() + SpotBuyerCode.PUSH_Y);
                final var spuCode = resp.getSpuCodes().getFirst();
                task.setTaskCode(spuCode.getStyleCode());
                spu.setGenCode(spuCode.getStyleCode());
                spu.setCodeStatus(spu.requireCodeStatus() + SpotBuyerCode.SYNC_Y);
                setCode(buyerLog, spuCode, spotSkcs, skcMap, spu, task);
                task.setSkcs(spotSkcs);
                transaction(() -> {
                    this.spotStyleTaskRepository.updateByIdManualFill(task);
                    this.spotStyleSkcRepository.updateBatchByIdManualFill(spotSkcs);
                    this.spotBuyerCodeRepository.updateBatchByIdManualFill(list);
                    updateSource(task);
                });
            }, e -> {
                buyerLog.setMessage(e.getLocalizedMessage());
                buyerLog.setPushStatus(2);
                log.error("现货任务【{}】-买手分码推送失败\t{}", buyerLog.getLogId(), e.getLocalizedMessage(), e);
            }, () -> this.plmBuyerLogRepository.updateByIdManualFill(buyerLog));
        });
    }

    private void setCode(final PlmBuyerLog buyerLog, final BuyerGenerateCodeItemResp spuCode,
                         final List<SpotStyleSkc> spotSkcs, final Map<Long, SpotBuyerCode> skcMap,
                         final SpotBuyerCode spu, SpotStyleTask task) {
        setSckCode(buyerLog, spuCode, spotSkcs, skcMap, task);
        BasicConvert.setRevised(spu);
    }

    private void updateSource(final SpotStyleTask task) {
        if (!StrUtil.equalsIgnoreCase(SourceTypeEnum.DEVELOP_STYLE.getCode(), task.getSourceType())) {
            buttedTask(task);
            return;
        }
        final var style = this.developStyleTaskRepository.getById(task.getSourceId());
        if (Objects.isNull(style)) {
            return;
        }
        style.setSpuCode(task.getTaskCode());
        this.developStyleTaskRepository.updateById(style);
        // 同步向量库
        if (style.requireImageVectorId() > 0) {
            syncVector(task, style);
        }
    }

    private void buttedTask(final SpotStyleTask task) {
        // 不是开款的
        final var list = SpotStyleTaskConvert.obtainMulfeatExtract(task);
        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        mulfeatExtractTaskRepository.saveBatch(list, list.size());
        final var dto = new SpotTaskMessageDTO();
        dto.setType(SpotTaskMessageEnum.BUTTED.getCode());
        dto.setTaskId(task.getTaskId());
        this.send(task, JsonsKt.toJson(dto), RabbitConfigEnum.PUSH_PLM_BUYER);
    }

    private void syncVector(final SpotStyleTask task, final DevelopStyleTask style) {
        try {
            final var vector = skcImageVectorRepository.getById(style.requireImageVectorId());
            if (Objects.isNull(vector)) {
                return;
            }
            vector.setSpuCode(task.getTaskCode());
            vector.setSpuId(task.getTaskId());
            final var skc = task.getSkcs().getFirst();
            vector.setSkcCode(skc.getSkcCode());
            vector.setSkcId(skc.getSkcId());
            designImageService.saveVector(vector);
        } catch (Exception e) {
            log.error("同步向量失败\t{}", e.getLocalizedMessage(), e);
        }
    }

    private void pushPlmBuyerSkcCode(final PlmBuyerLog buyerLog) {
        pushPlmBuyerLock(buyerLog, () -> {
            final var taskId = logNeedPush(buyerLog);
            if (Objects.equals(0L, taskId)) {
                return;
            }
            BasicConvert.setRevised(buyerLog);
            final var skcs = this.spotBuyerCodeRepository.listByParentIdAndLogId(taskId, buyerLog.getLogId());
            if (skcs.stream().allMatch(SpotBuyerCode::pushed)) {
                log.info("买手分码已经推送\t{}", buyerLog.getLogId());
                buyerLog.setPushStatus(1);
                this.plmBuyerLogRepository.updateByIdManualFill(buyerLog);
                return;
            }
            final var task = this.spotStyleTaskRepository.getById(taskId);
            if (Objects.isNull(task)) {
                return;
            }
            final var skcMap = BasicConvert.toMap(skcs, SpotBuyerCode::getTaskId);
            // SKC分码每次都是一个
            final var spotSkcs = this.spotStyleSkcRepository.listByIds(List.of(buyerLog.getSkcId()));
            tryFinally(() -> {
                final var resp = generateCode(buyerLog, task, skcs.size());
                final var spuCode = resp.getSpuCodes().getFirst();
                setSckCode(buyerLog, spuCode, spotSkcs, skcMap, task);
                transaction(() -> {
                    this.spotStyleSkcRepository.updateBatchByIdManualFill(spotSkcs);
                    this.spotBuyerCodeRepository.updateBatchByIdManualFill(skcs);
                    task.setSkcs(spotSkcs);
                    if (task.pushedBuyer()) {
                        pushSkc(task);
                    }
                    buttedTask(task);
                });
            }, e -> {
                buyerLog.setMessage(e.getLocalizedMessage());
                buyerLog.setPushStatus(2);
                log.error("现货任务【{}】-买手分码推送失败\t{}", buyerLog.getLogId(), e.getLocalizedMessage(), e);
            }, () -> this.plmBuyerLogRepository.updateByIdManualFill(buyerLog));
        });
    }

    private void pushSkc(final SpotStyleTask task) {
        final var skcs = task.getSkcs();
        if (CollectionUtils.isEmpty(skcs)) {
            final var buyerLog = SpotStyleTaskConvert.obtainLog(task);
            buyerLog.setLogType(SpotPlmBuyerTypeEnum.ADD.getCode());
            this.plmBuyerLogRepository.save(buyerLog);
            this.pushBuyerLogs(List.of(buyerLog));
            return;
        }
        final var logs = skcs.stream().map(it -> {
            final var buyerLog = SpotStyleTaskConvert.obtainLog(task);
            buyerLog.setLogType(SpotPlmBuyerTypeEnum.ADD.getCode());
            buyerLog.setSkcId(it.getSkcId());
            return buyerLog;
        }).toList();
        this.plmBuyerLogRepository.saveBatch(logs, logs.size());
        this.pushBuyerLogs(logs);
    }

    private void setSckCode(final PlmBuyerLog buyerLog, final BuyerGenerateCodeItemResp spuCode,
                            final List<SpotStyleSkc> spotSkcs, final Map<Long, SpotBuyerCode> skcMap, SpotStyleTask task) {
        final var designCodes = new ArrayDeque<>(spuCode.getDesignCodes());
        while (!designCodes.isEmpty()) {
            spotSkcs.stream().filter(it -> skcMap.containsKey(it.getSkcId()))
                    .filter(it -> !it.hasCode()).forEach(it -> {
                        final var designCode = designCodes.poll();
                        it.setSkcCode(designCode);
                        final var skc = skcMap.get(it.getSkcId());
                        skc.setGenCode(designCode);
                        skc.setCodeStatus(SpotBuyerCode.PUSH_Y + SpotBuyerCode.SYNC_Y);
                        BasicConvert.setRevised(it);
                        BasicConvert.setRevised(skc);
                        //生成SKU
                        generateSku(task, it);
                    });
            // 防止最后分码多出来死循环
            if (spotSkcs.stream().allMatch(SpotStyleSkc::hasCode)) {
                break;
            }
        }
        buyerLog.setPushStatus(1);
    }

    private void generateSku(SpotStyleTask task, SpotStyleSkc skc) {
        final var sku = styleSkcSkuRepository.selectBySkcIds(List.of(skc.getSkcId()));
        if (CollectionUtil.isNotEmpty(sku)) {
            return;
        }
        //生成SKU信息
        final var req = new SkcBatchQueryReq();
        req.setSkcs(List.of(skc.getSkcCode()));
        final var skuList = skuInfoRemoteHelper.querySku(req);
        final var standardSize = PlmConvertHelper.listByDictCode(DictEnum.PLM_STANDARD_SIZE);
        final var checkMokenList = getMokenSkuList(skuList, standardSize, task);
        List<StyleSkcSku> skuAdd = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(checkMokenList)) {
            skuAdd = SpotStyleTaskConvert.convertSkuByQuery(checkMokenList, skc);
        } else {
            skuAdd = SpotStyleTaskConvert.convertSku(task, skc);
        }
        if (CollectionUtil.isNotEmpty(skuAdd)) {
            styleSkcSkuRepository.saveBatch(skuAdd);
        }
    }

    public static List<BaseSkuResp> getMokenSkuList(List<BaseSkuResp> mokenSkuList, DictVo standardSize, SpotStyleTask task) {
        if (CollectionUtil.isEmpty(mokenSkuList)) {
            return Collections.emptyList();
        }
        final var groupCode = task.getSizeStandardCode();
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

    private BuyerGenerateCodeResp generateCode(final PlmBuyerLog buyerLog,
                                               final SpotStyleTask task,
                                               final Integer total) {
        plmCategory(task);
        final var req = SpotStyleTaskConvert.convert(task, total);
        buyerLog.setContent(JsonsKt.toJsonPretty(req));
        final var resp = PlmBuyerApi.generateCode(req);
        buyerLog.setResponseData(JsonsKt.toJsonPretty(resp));
        return resp;
    }

    private void pushPlmBuyerAdd(final PlmBuyerLog buyerLog) {
        pushPlmBuyerLock(buyerLog, () -> {
            final var taskId = logNeedPush(buyerLog);
            if (Objects.equals(0L, taskId)) {
                return;
            }
            final var task = this.spotStyleTaskRepository.getById(buyerLog.getTaskId());
            if (task.cancelled()) {
                log.info("现货已经取消,无需推送买手\t{}", task.getTaskCode());
                return;
            }
            final var skcId = Objects.requireNonNullElse(buyerLog.getSkcId(), 0L);
            final var skcs = Objects.equals(skcId, 0L) ?
                    this.spotStyleSkcRepository.listByTaskIds(List.of(taskId)) : List.of(this.spotStyleSkcRepository.getById(skcId));
            if (skcs.stream().allMatch(SpotStyleSkc::cancelled)) {
                log.info("现货所有SKC都已经取消,无需推送买手\t{}", task.getTaskCode());
                buyerLog.setPushStatus(1);
                this.plmBuyerLogRepository.updateByIdManualFill(buyerLog);
                return;
            }
            final var need = skcs.stream()
                    .filter(it -> !it.buyerCancelled() && !it.pushedBuyer() && !it.cancelled()).toList();
            if (CollectionUtil.isEmpty(need)) {
                buyerLog.setPushStatus(1);
                this.plmBuyerLogRepository.updateByIdManualFill(buyerLog);
                return;
            }
            this.plmCategory(task);
            task.setSuppliers(this.spotStyleSupplierRepository.listByTaskIds(List.of(taskId)));
            task.setSkcs(need);
            task.setPictures(this.spotStylePictureRepository.listByTaskIds(List.of(taskId)));
            BasicConvert.setRevised(buyerLog);
            tryFinally(() -> {
                        final var req = SpotStyleTaskConvert.convert(task);
                        buyerLog.setContent(JsonsKt.toJsonPretty(req));
                        final var resp = PlmBuyerApi.batchCreate(req);
                        log.info("现货任务【{}】-买手新增推送结果\t{}", buyerLog.getLogId(), JsonsKt.toJsonPretty(resp));
                        buyerLog.setResponseData(JsonsKt.toJsonPretty(resp));
                        buyerLog.setPushStatus(1);
                        need.forEach(it -> {
                            if (!it.pushedBuyer()) {
                                it.setSkcStatus(it.requireSkcStatus() + SpotStyleSkc.PUSH_BUYER_Y);
                            }
                            if (it.pushFailed()) {
                                it.setSkcStatus(it.requireSkcStatus() - SpotStyleSkc.PUSH_BUYER_FAIL_Y);
                            }
                        });
                    },
                    e -> {
                        buyerLog.setMessage(e.getLocalizedMessage());
                        buyerLog.setPushStatus(2);
                        log.error("现货任务【{}】-买手新增推送失败\t{}", buyerLog.getLogId(), e.getLocalizedMessage(), e);
                    }, () -> transaction(() -> {
                        this.plmBuyerLogRepository.updateByIdManualFill(buyerLog);
                        if (Objects.equals(2, buyerLog.getPushStatus())) {
                            need.forEach(it -> {
                                if (!it.pushFailed()) {
                                    it.setSkcStatus(it.requireSkcStatus() + SpotStyleSkc.PUSH_BUYER_FAIL_Y);
                                    it.setFailMessage(buyerLog.getMessage());
                                }
                                if (it.pushedBuyer()) {
                                    it.setSkcStatus(it.requireSkcStatus() - SpotStyleSkc.PUSH_BUYER_Y);
                                }
                            });
                        }
                        this.spotStyleSkcRepository.updateBatchById(need);
                    }));
        });
    }

    private Long logNeedPush(final PlmBuyerLog buyerLog) {
        if (!buyerLog.needPush()) {
            return 0L;
        }
        buyerLog.setPushTime(LocalDateTime.now());
        buyerLog.setPushTimes(buyerLog.requirePushTimes() + 1);
        return buyerLog.getTaskId();
    }

    private void pushPlmBuyerCancel(final PlmBuyerLog buyerLog) {
        pushPlmBuyerLock(buyerLog, () -> {
            final var taskId = logNeedPush(buyerLog);
            if (Objects.equals(0L, taskId)) {
                return;
            }
            final var skc = this.spotStyleSkcRepository.getById(buyerLog.getSkcId());
            if (!skc.cancelled()) {
                buyerLog.setPushStatus(1);
                this.plmBuyerLogRepository.updateByIdManualFill(buyerLog);
                log.info("现货不是取消,无需推送买手\t{}", skc.getSkcCode());
                return;
            }
            BasicConvert.setRevised(buyerLog);
            tryFinally(() -> {
                        final var req = SpotStyleTaskConvert.convert(skc);
                        buyerLog.setContent(JsonsKt.toJsonPretty(req));
                        final var resp = PlmBuyerApi.batchCancel(req);
                        log.info("现货任务【{}】-买手取消推送结果\t{}", buyerLog.getLogId(), JsonsKt.toJsonPretty(resp));
//                        buyerLog.setResponseData(JsonsKt.toJsonPretty(resp));
                        buyerLog.setPushStatus(1);
                        if (!skc.buyerCancelled()) {
                            skc.setSkcStatus(skc.requireSkcStatus() + SpotStyleSkc.BUYER_CANCEL_Y);
                        }
                    },
                    e -> {
                        buyerLog.setMessage(e.getLocalizedMessage());
                        buyerLog.setPushStatus(2);
                        log.error("现货任务【{}】-买手取消推送失败\t{}", buyerLog.getLogId(), e.getLocalizedMessage(), e);
                    }, () -> transaction(() -> {
                        this.plmBuyerLogRepository.updateByIdManualFill(buyerLog);
                        this.spotStyleSkcRepository.updateById(skc);
                    }));
        });
    }

    private void pushPlmBuyerEditImage(final PlmBuyerLog buyerLog) {
        pushPlmBuyerLock(buyerLog, () -> {
            final var taskId = logNeedPush(buyerLog);
            if (Objects.equals(0L, taskId)) {
                return;
            }
            final var skc = this.spotStyleSkcRepository.getById(buyerLog.getSkcId());
            if (skc.cancelled()) {
                log.info("现货已经取消,无需推送买手\t{}", skc.getSkcCode());
                buyerLog.setPushStatus(1);
                this.plmBuyerLogRepository.updateByIdManualFill(buyerLog);
                return;
            }
            final var pictures = this.spotStylePictureRepository.listBySkcIds(List.of(buyerLog.getSkcId()));
            BasicConvert.setRevised(buyerLog);
            tryFinally(() -> {
                        final var req = SpotStyleTaskConvert.convert(skc, pictures);
                        buyerLog.setContent(JsonsKt.toJsonPretty(req));
                        /*final var resp =*/
                        PlmBuyerApi.editSkuImage(req);
                        log.info("现货任务【{}】-买手更新图片推送成功", buyerLog.getLogId());
//                        buyerLog.setResponseData(JsonsKt.toJsonPretty(resp));
                        buyerLog.setPushStatus(1);
                    },
                    e -> {
                        buyerLog.setMessage(e.getLocalizedMessage());
                        buyerLog.setPushStatus(2);
                        log.error("现货任务【{}】-买手更新图片推送失败\t{}", buyerLog.getLogId(), e.getLocalizedMessage(), e);
                    }, () -> this.plmBuyerLogRepository.updateByIdManualFill(buyerLog));
        });
    }

    private void pushPlmBuyerLock(final PlmBuyerLog buyerLog, final Runnable run) {
        lock(LOCK_KEY + "push:buyer:" + buyerLog.getLogId(), 60L, run);
    }

    private String skcImageMd5(final List<String> skcImageUrls) {
        if (CollectionUtil.isEmpty(skcImageUrls)) {
            return "";
        }
        return SecureUtil.md5(String.join(StrUtil.COMMA, skcImageUrls));
    }

    private void addProductUpdate(final SpotStyleTask task) {
        try {
            styleOnShelvesService.addProductUpdateTag(task.getTaskId());
        } catch (Exception e) {
            log.error("更新标签失败\t{}\t{}", task.getTaskId(), e.getLocalizedMessage(), e);
        }
    }

    private void job(final SpotStyleTask task) {
        final var skcs = this.spotStyleSkcRepository.listByTaskIds(List.of(task.getTaskId()));
        if (CollectionUtil.isEmpty(skcs)) {
            return;
        }
        final var productSkcs = this.productSkcRepository.listBySkcIds(skcs.stream().map(SpotStyleSkc::getSkcId).toList());
        if (CollectionUtil.isEmpty(productSkcs)) {
            return;
        }
        // 全部下架,下架,任意上架都是上架
        if (productSkcs.stream().allMatch(ProductSkc::offShelf)) {
            final var req = new StyleOnShelvesReleaseReq();
            req.setStyleId(task.getTaskId());
            req.setReleaseSuccess(false);
            this.releaseResult(req);
            return;
        }
//        if (productSkcs.stream().anyMatch(ProductSkc::onShelf)) {
        onShelves(task, skcs);
//        }
    }

    private void onShelves(final SpotStyleTask task, final List<SpotStyleSkc> skcs) {
        final var productList = this.productRepository.listByStyleId(task.getTaskId());
        if (CollectionUtil.isEmpty(productList)) {
            return;
        }
        //取最早创建的商品
        Product product = productList.getLast();
        skcs.stream()
                .filter(it -> !it.onShelves())
                .forEach(it -> {
                    // 待上架
                    if (CollectionUtil.isEmpty(task.getOpts())) {
                        final var opt = SpotStyleTaskConvert.obtainOpt(SpotStyleOptTypeEnum.ON_SHELVES, task, null);
                        opt.setCreatedTime(product.getOnShelvesTime());
                        task.setOpts(List.of(opt));
                        if (it.onShelvesFail()) {
                            it.setSkcStatus(it.requireSkcStatus() - SpotStyleSkc.ON_THE_SHELVES_FAIL_Y);
                        }
                        it.setSkcStatus(it.requireSkcStatus() + SpotStyleSkc.UPCOMING_Y);
                    }
                });
        transaction(() -> {
            this.spotStyleTaskRepository.updateById(task);
            this.spotStyleSkcRepository.updateBatchById(skcs, skcs.size());
            if (CollectionUtil.isNotEmpty(task.getOpts())) {
                this.spotStyleOptRepository.saveBatch(task.getOpts());
            }
        });
    }

    @PostConstruct
    void init() {
        log.info("初始化函数");
        PUSH_LOG.putIfAbsent(SpotPlmBuyerTypeEnum.CODE.getCode(), this::pushPlmBuyerCode);
        PUSH_LOG.putIfAbsent(SpotPlmBuyerTypeEnum.SKC_CODE.getCode(), this::pushPlmBuyerSkcCode);
        PUSH_LOG.putIfAbsent(SpotPlmBuyerTypeEnum.ADD.getCode(), this::pushPlmBuyerAdd);
        PUSH_LOG.putIfAbsent(SpotPlmBuyerTypeEnum.EDIT_IMAGE.getCode(), this::pushPlmBuyerEditImage);
        PUSH_LOG.putIfAbsent(SpotPlmBuyerTypeEnum.CANCEL.getCode(), this::pushPlmBuyerCancel);
    }
}
