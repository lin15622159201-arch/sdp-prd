package tech.tiangong.sdp.convert;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.toolkit.CollectionUtils;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import jakarta.validation.ValidationException;
import lombok.experimental.UtilityClass;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.sequence.id.IdHelper;
import tech.tiangong.butted.common.enums.BizSourceEnum;
import tech.tiangong.butted.common.enums.GptTypeEnum;
import tech.tiangong.butted.common.enums.TaskStatusEnum;
import tech.tiangong.butted.common.req.*;
import tech.tiangong.butted.common.req.base.CompanyUserBatchReq;
import tech.tiangong.sdp.common.req.DevelopStyleRelaAddReq;
import tech.tiangong.sdp.config.DomainProperties;
import tech.tiangong.sdp.entity.*;
import tech.tiangong.sdp.enums.*;
import tech.tiangong.sdp.external.SdpMaterialDesignerApi;
import tech.tiangong.sdp.utils.SsoContext;
import tech.tiangong.sdp.vo.query.DevelopStyleTaskQuery;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.*;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 开款
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 16:08
 */
@UtilityClass
public class DevelopStyleTaskConvert {
    public List<DevelopStyleTask> convert(final List<DevelopStyleTaskAddReq> list) {
        final var key = new HashSet<String>();
        final var keyMap = BasicConvert.groupingBy(
                list.stream()
                        .filter(it -> Objects.equals(DevelopStyleTypeEnum.SPOT_STYLE, it.getStyleType()))
                        .filter(DevelopStyleTaskAddReq::hasKey2).toList(),
                DevelopStyleTaskAddReq::key2);
        if (CollectionUtil.isEmpty(keyMap)) {
            keyMap.forEach((k, v) -> {
                if (v.size() > 1) {
                    key.add(k);
                }
            });
        }
        if (CollectionUtil.isNotEmpty(key)) {
            throw new ValidationException("供应商信息重复");
        }
        return list.stream().map(DevelopStyleTaskConvert::convert).toList();
    }

    public List<DevelopStyleTask> convertOpen(final List<DevelopStyleTaskOpenAddReq> list) {
        return list.stream().map(DevelopStyleTaskConvert::convertOpen).toList();
    }

    private static DevelopStyleTask convertOpen(DevelopStyleTaskOpenAddReq req) {
        final var task = new DevelopStyleTask();
        BasicConvert.taskInit(task, CodeRuleEnum.DEVELOP_STYLE);
        BasicConvert.copy(req, task);
        task.setTaskStatus(DevelopStyleTaskStatusEnum.PENDING_REVIEW.getCode());
        task.setAiTaskStatus(TaskStatusEnum.QUEUEING.getCode());
        task.setRelaType(DevelopStyleRelaTypeEnum.UN_RELA.getCode());
        task.setStyleType(req.getStyleType().getCode());
        task.setTaskSource(DevelopStyleTaskSourceEnum.STUDIO.getCode());
        task.setOpts(List.of(obtainOpt(DevelopStyleOptTypeEnum.ADD, task, null)));
        task.setPictures(new ArrayList<>());
        final var pictures = task.getPictures();
        List<String> images = req.getImages().stream()
                .skip(1)
                .toList();
        if (CollectionUtil.isNotEmpty(images)) {
            pictures.addAll(images.stream().map(it -> obtainStylePicture(it, task)).toList());
        }
        pictures.add(obtainPicture(task, DevelopStylePictureTypeEnum.MAIN_IMAGE, req.getImages().getFirst()));
        task.setMainImgUrl(req.getImages().getFirst());
        task.setRecs(List.of(obtainCategoryRec(task)));
        task.setMulfeatExtracts(List.of(obtainMulfeatExtract(task)));
        task.setRequiredTask(task.requiredTask() + DevelopStyleTask.CATEGORY_REC+DevelopStyleTask.MULFEAT_EXTRACT);
        if (CollectionUtil.isNotEmpty(req.getBomOrderMaterialList())) {
            task.setBomOrders(bomOrderMaterialConvert(req.getBomOrderMaterialList(),task.getTaskId()));
        }
        return task;
    }

    private List<DevelopStyleTaskBomOrder> bomOrderMaterialConvert(List<DevelopStyleTaskOpenAddReq.BomOrderMaterial> reqList, Long developStyleTaskId) {
        if (CollectionUtils.isEmpty(reqList)) {
            return Collections.emptyList();
        }
        return reqList.stream().map(bomOrderMaterial -> {
            DevelopStyleTaskBomOrder bomOrder = new DevelopStyleTaskBomOrder();
            bomOrder.setId(IdHelper.getId());
            bomOrder.setDevelopStyleTaskId(developStyleTaskId);
            bomOrder.setDemandType(bomOrderMaterial.getDemandType());
            bomOrder.setCommodityId(bomOrderMaterial.getCommodityId());
            bomOrder.setCommodityCode(bomOrderMaterial.getCommodityCode());
            bomOrder.setSkuId(bomOrderMaterial.getSkuId());
            bomOrder.setSkuCode(bomOrderMaterial.getSkuCode());
            bomOrder.setTenantId(SsoContext.tenantId());
            return bomOrder;
        }).collect(Collectors.toList());
    }

    public List<DevelopStyleTask> convert(final List<DevelopStyleTaskCheckReq> list, final List<DevelopStyleTask> tasks) {
        final var map = BasicConvert.toMap(list, DevelopStyleTaskCheckReq::getTaskId);
        final var check = new ArrayList<DevelopStyleTask>(list.size());
        tasks.stream()
                .filter(it -> map.containsKey(it.getTaskId()))
                .forEach(it -> {
                    check(it, map);
                    check.add(it);
                });
        return check;
    }

    public void convert(final DevelopStyleRemarkReq req, final DevelopStyleTask task) {
        task.setMessage(req.getRemark());
        task.setRemarks(List.of(obtainStyleRemark(req.getRemark(), task)));
    }

    public void delOpt(final DevelopStyleTask task) {
        task.setOpts(List.of(obtainOpt(DevelopStyleOptTypeEnum.REMOVE, task, null)));
    }

    public DevelopStyleTaskQuery buildWebPage(final DevelopStyleTaskPageReq req) {
        final var q = BasicConvert.copy(req, DevelopStyleTaskQuery.class);
        q.setTenantId(SsoContext.tenantId());
        if (CollectionUtil.isNotEmpty(req.getStyleTypes())) {
            q.setStyleTypes(req.getStyleTypes().stream().map(DevelopStyleTypeEnum::getCode).toList());
        }
        if (CollectionUtil.isNotEmpty(req.getRelaTypes())) {
            q.setRelaTypes(req.getRelaTypes().stream().map(DevelopStyleRelaTypeEnum::getCode).toList());
        }
        q.setCreatorId(null);
        final var creatorIds = new HashSet<Long>();
        q.setCreatorIds(creatorIds);
        if (Objects.equals(Bool.YES, req.getSameGroup())) {
            final var ids = SdpMaterialDesignerApi.listDesignerIds();
            if (CollectionUtil.isNotEmpty(ids)) {
                creatorIds.addAll(ids);
                // 同组不包含为空
                if ((Objects.nonNull(req.getCreatorId()))) {
                    q.setEmpty(!ids.contains(req.getCreatorId()));
                }
            } else {
                q.setEmpty(Boolean.TRUE);
            }
        }
        // 同组包含优先创建人
        if (Objects.nonNull(req.getCreatorId()) && !q.getEmpty()) {
            q.setCreatorIds(Set.of(req.getCreatorId()));
        }
        if (Objects.nonNull(req.getCreatorId())) {
            creatorIds.add(req.getCreatorId());
        }
        if (StrUtil.isNotBlank(req.getSpuCode())) {
            q.setSpuCodes(StrUtil.split(req.getSpuCode().replaceAll(" ", StrUtil.COMMA), StrUtil.COMMA));
        }
        if (StrUtil.isNotBlank(req.getTaskCode())) {
            q.setTaskCode(null);
            q.setTaskCodes(StrUtil.split(req.getTaskCode().replaceAll(" ", StrUtil.COMMA), StrUtil.COMMA));
        }
        return q;
    }

    public DevelopStyleTaskPageResp convert(final DevelopStyleTask task,
                                            final Map<Long, List<DevelopStylePicture>> imageMap,
                                            final Map<Long, DevelopStyleSpu> spuMap) {
        final var resp = BasicConvert.copy(task, DevelopStyleTaskPageResp.class, "styleType", "relaType","taskSource");
        resp.setStyleType(DevelopStyleTypeEnum.from(task.getStyleType()));
        resp.setTaskSource(DevelopStyleTaskSourceEnum.from(task.getTaskSource()));
        if (StrUtil.isNotBlank(task.getRelaType())) {
            resp.setRelaType(DevelopStyleRelaTypeEnum.from(task.getRelaType()));
        }
        resp.setIdentifyStatus(task.getAiTaskStatus());
        Optional.ofNullable(spuMap.get(task.getTaskId())).ifPresent(it -> {
            resp.setStoreId(it.getStoreId());
            resp.setStoreName(it.getStoreName());
        });
        final var images = imageMap.get(task.getTaskId());
        if (CollectionUtil.isEmpty(images)) {
            return resp;
        }
        resp.setPictures(images.stream().map(DevelopStyleTaskConvert::obtainPictureResp).toList());
        return resp;
    }

    public DevelopStyleRemarkResp toRemarkResp(final DevelopStyleRemark remark) {
        return BasicConvert.copy(remark, DevelopStyleRemarkResp.class);
    }

    public DevelopStyleOptResp toOptResp(final DevelopStyleOpt opt) {
        final var resp = BasicConvert.copy(opt, DevelopStyleOptResp.class);
        resp.setOptType(DevelopStyleOptTypeEnum.from(opt.getOptType()).getVale());
        return resp;
    }

    public List<DevelopStyleTask> convertDevelop(final List<DevelopStyleSpuAddReq> list, final List<DevelopStyleTask> tasks) {
        final var map = BasicConvert.toMap(list, DevelopStyleSpuAddReq::getTaskId);
        final var develop = new ArrayList<DevelopStyleTask>(list.size());
        tasks.stream()
                .filter(it -> map.containsKey(it.getTaskId()))
                .forEach(it -> {
                    develop(it, map);
                    develop.add(it);
                });
        return develop;
    }

    public void relaTask(final DevelopStyleRelaAddReq req, final DevelopStyleTask task) {
        task.setRelaId(req.getSourceId());
        task.setRelaCode(req.getSourceCode());
        task.setRelaType(req.getSourceType().getCode());
        task.setReviserId(req.getCreatorId());
        task.setReviserName(req.getCreatorName());
        task.setRevisedTime(LocalDateTime.now());
        final var rela = new DevelopStyleRelaTask();
        task.setRelas(List.of(rela));
        BasicConvert.entityInit(rela, rela::setRelaId);
        BasicConvert.copy(req, rela);
        rela.setSourceType(req.getSourceType().getCode());
        rela.setReviserId(req.getCreatorId());
        rela.setReviserName(req.getCreatorName());
        rela.setRevisedTime(LocalDateTime.now());
    }

    public DevelopStyleTask convert(final PickingStyleDevelopReq req) {
        final var addReq = BasicConvert.copy(req, DevelopStyleTaskAddReq.class);
        addReq.setStyleType(DevelopStyleTypeEnum.AI_STYLE);
        return convert(addReq);
    }

    public ClipLabelTaskReq buildClipLabelReq(final DevelopStyleTask task) {
        final var req = new ClipLabelTaskReq();
        final var label = task.getLabels().getFirst();
        req.setBusCode(label.getTaskCode());
        req.setBusId(label.getTaskId());
        req.setCreatorId(label.getCreatorId());
        req.setCreatorName(label.getCreatorName());
        req.setTenantId(label.getTenantId());
        req.setInputImage(label.getInputImg());
        req.setSource(BizSourceEnum.DEVELOP_STYLE);
        req.setCallback(DomainProperties.buildPath(CALLBACK + "clip"));
        return req;
    }

    public CompanyUserBatchReq<PatternCheckTaskReq> buildPatternCheckReq(final DevelopStyleTask task) {
        final var check = task.getPatternChecks().getFirst();
        final var req = BasicConvert.companyUserBatch(task,
                List.of(new PatternCheckTaskReq(check.getTaskId(), check.getTaskCode(), check.getInputImg())));
        req.setCallback(DomainProperties.buildPath(CALLBACK + "pattern-check"));
        return req;
    }

    public CompanyUserBatchReq<CategoryRecTaskReq> buildCategoryRecReq(final DevelopStyleTask task) {
        final var rec = task.getRecs().getFirst();
        final var req = BasicConvert.companyUserBatch(task,
                List.of(new CategoryRecTaskReq(rec.getTaskId(), rec.getTaskCode(), rec.getInputImg())));
        req.setCallback(DomainProperties.buildPath(CALLBACK + "rec"));
        return req;
    }

    public CompanyUserBatchReq<MulfeatExtractTaskReq> buildMulfeatExtractReq(final DevelopStyleTask task) {
        final var rec = task.getMulfeatExtracts().getFirst();
        final var req = BasicConvert.companyUserBatch(task,
                List.of(new MulfeatExtractTaskReq(rec.getTaskId(), rec.getTaskCode(), rec.getInputImg())));
        req.setCallback(DomainProperties.buildPath(CALLBACK + "mulfeat-extract"));
        return req;
    }

    public CompanyUserBatchReq<FashionAnalysisTaskReq> buildAnalysisReq(final DevelopStyleTask task) {
        final var rec = task.getAnalysis().getFirst();
        final var req = BasicConvert.companyUserBatch(task,
                List.of(new FashionAnalysisTaskReq(rec.getTaskId(), rec.getTaskCode(), rec.getInputImg())));
        req.setCallback(DomainProperties.buildPath(CALLBACK + "fashion-analysis"));
        return req;
    }

    public PictureCaptionSourceReq buildFabricIdentifyReq(final DevelopStyleTask task) {
        final var caption = task.getCaptions().getFirst();
        final var req = new PictureCaptionSourceReq();
        req.setBusId(caption.getTaskId());
        req.setInputImg(caption.getInputImg());
        req.setCallback(DomainProperties.buildPath(CALLBACK + "fabric-identify"));
        req.setSource(BizSourceEnum.FABRIC_IDENTIFY);
        req.setGptType(GptTypeEnum.GPT_5);
        return req;
    }

    public <T extends BasicAIImgTask> T setAITask(final DevelopStyleTask task, final T t) {
        BasicConvert.entityInit(t);
        t.setBusId(task.getTaskId());
        t.setTaskCode(task.getTaskCode());
        t.setBusType(TASK_TYPE.getCode());
        t.setInputImg(task.getMainImgUrl());
        return t;
    }

    public MulfeatExtractTask obtainMulfeatExtract(final DevelopStyleTask task) {
        return setAITask(task, new MulfeatExtractTask());
    }
    private DevelopStylePictureResp obtainPictureResp(final DevelopStylePicture picture) {
        final var img = new DevelopStylePictureResp();
        img.setImageId(picture.getPictureId());
        img.setImageUrl(picture.getPictureUrl());
        img.setPictureType(DevelopStylePictureTypeEnum.from(picture.getPictureType()));
        return img;
    }

    private void develop(final DevelopStyleTask task, final Map<Long, DevelopStyleSpuAddReq> map) {
        task.setOpts(List.of(obtainOpt(DevelopStyleOptTypeEnum.DEVELOP_STYLE, task, null)));
        task.setSubmitTime(LocalDateTime.now());
        task.setDeveloperId(SsoContext.userId());
        task.setDeveloperName(SsoContext.username());
        task.setTaskStatus(DevelopStyleTaskStatusEnum.DEVELOP_STYLE.getCode());
        final var req = map.get(task.getTaskId());
        task.setCategoryCode(req.getCategoryCode());
        task.setCategoryName(req.getCategoryName());
        task.setStyleLabelCode(req.getStyleLabelCode());
        task.setStyleLabelName(req.getStyleLabelName());
        task.setWavebandCode(req.getWaveBandCode());
        task.setWavebandName(req.getWaveBandName());
        task.setProjectTypeCode(req.getProjectTypeCode());
        task.setProjectTypeName(req.getProjectTypeName());
        final var spu = new DevelopStyleSpu();
        task.setSpus(List.of(spu));
        if (null != req.getStyleType()) {
            task.setStyleType(req.getStyleType().getCode());
        }
        BasicConvert.entityInit(spu, spu::setSpuId);
        BasicConvert.copy(req, spu);
        spu.setTaskStatus(TaskStatusEnum.QUEUEING.getCode());
        spu.setSkcs(req.getSkcs().stream().map(it -> {
            final var skc = new DevelopStyleSkc();
            BasicConvert.entityInit(skc, skc::setSkcId);
            skc.setTaskId(task.getTaskId());
            skc.setSpuId(spu.getSpuId());
            skc.setColor(it.getColor());
            skc.setColorCode(it.getColorCode());
            skc.setColorEnName(it.getColorEnName());
            skc.setPreDisassemblyState(req.getPreDisassemblyState());
            return skc;
        }).toList());
    }

    private void check(final DevelopStyleTask task, final Map<Long, DevelopStyleTaskCheckReq> map) {
        final var req = map.get(task.getTaskId());
        if (StrUtil.isNotBlank(req.getRemark())) {
            task.setMessage(req.getRemark());
            task.setRemarks(List.of(obtainStyleRemark(req.getRemark(), task)));
        }
        final var type = Objects.equals(DevelopStyleCheckResultEnum.PASS, req.getCheckResult()) ?
                DevelopStyleOptTypeEnum.CHECK_PASS : DevelopStyleOptTypeEnum.CHECK_DISUSE;
        task.setOpts(List.of(obtainOpt(DevelopStyleOptTypeEnum.CHECK, task, type.getVale())));
        task.setCheckResult(req.getCheckResult().getCode());
        task.setCheckTime(LocalDateTime.now());
        task.setStyleCheckerId(SsoContext.userId());
        task.setStyleCheckerName(SsoContext.username());
        task.setTaskStatus(DevelopStyleTaskStatusEnum.PAYMENT_PENDING.getCode());
        if (Objects.equals(DevelopStyleCheckResultEnum.DISUSE, req.getCheckResult())) {
            task.setTaskStatus(DevelopStyleTaskStatusEnum.ELIMINATED.getCode());
        } else {
            //审核通过
            task.setLabels(List.of(obtainClipLabel(task)));
            task.setCaptions(List.of(obtainPictureCaption(task)));
            task.setPatternChecks(List.of(obtainPatternCheck(task)));
            task.setAnalysis(List.of(obtainAnalysis(task)));
            task.setRequiredTask(task.requiredTask() + DevelopStyleTask.PATTERN_CHECK);
            task.setRequiredTask(task.requiredTask() + DevelopStyleTask.CLIP_VIT_L_14);
            task.setRequiredTask(task.requiredTask() + DevelopStyleTask.FABRIC_IDENTIFY);
            task.setRequiredTask(task.requiredTask() + DevelopStyleTask.FASHION_ANALYSIS);
        }
    }

    private FashionAnalysisTask obtainAnalysis(final DevelopStyleTask task) {
        return setAITask(task, new FashionAnalysisTask());
    }

    private CategoryRecTask obtainCategoryRec(final DevelopStyleTask task) {
        return setAITask(task, new CategoryRecTask());
    }


    private ClipLabelTask obtainClipLabel(final DevelopStyleTask task) {
        return setAITask(task, new ClipLabelTask());
    }

    private PatternCheckTask obtainPatternCheck(final DevelopStyleTask task) {
        return setAITask(task, new PatternCheckTask());
    }

    private PictureCaptionTask obtainPictureCaption(final DevelopStyleTask task) {
        final var caption = setAITask(task, new PictureCaptionTask());
        caption.setSource(SourceEnum.FABRIC_IDENTIFY.getCode());
        return caption;
    }

    private DevelopStyleTask convert(final DevelopStyleTaskAddReq req) {
        final var task = new DevelopStyleTask();
        BasicConvert.taskInit(task, CodeRuleEnum.DEVELOP_STYLE);
        BasicConvert.copy(req, task);
        task.setTaskStatus(DevelopStyleTaskStatusEnum.PENDING_REVIEW.getCode());
        task.setAiTaskStatus(TaskStatusEnum.QUEUEING.getCode());
        task.setRelaType(DevelopStyleRelaTypeEnum.UN_RELA.getCode());
        if (StringUtils.isNotBlank(req.getTaskSource())) {
            task.setTaskSource(req.getTaskSource());
        } else {
            task.setTaskSource(DevelopStyleTaskSourceEnum.USER_UPLOAD.getCode());
        }
        task.setStyleType(req.getStyleType().getCode());
        Optional.ofNullable(req.getRelaType()).ifPresent(it -> task.setRelaType(it.getCode()));
        task.setOpts(List.of(obtainOpt(DevelopStyleOptTypeEnum.ADD, task, null)));
        task.setPictures(new ArrayList<>());
        final var pictures = task.getPictures();
        final var images = req.getImages();
        if (CollectionUtil.isNotEmpty(images)) {
            pictures.addAll(images.stream().map(it -> obtainStylePicture(it, task)).toList());
        }
        pictures.add(obtainPicture(task, DevelopStylePictureTypeEnum.MAIN_IMAGE, req.getMainImgUrl()));
        task.setRecs(List.of(obtainCategoryRec(task)));
        task.setMulfeatExtracts(List.of(obtainMulfeatExtract(task)));
        task.setRequiredTask(task.requiredTask() + DevelopStyleTask.CATEGORY_REC+DevelopStyleTask.MULFEAT_EXTRACT);
        return task;
    }

    private DevelopStyleOpt obtainOpt(final DevelopStyleOptTypeEnum type, final DevelopStyleTask task, final String content) {
        final var opt = new DevelopStyleOpt();
        opt.setTaskId(task.getTaskId());
        BasicConvert.entityInit(opt, opt::setOptId);
        opt.setOptType(type.getCode());
        opt.setContent(type.getVale());
        if (StrUtil.isNotBlank(content)) {
            opt.setContent(content);
        }
        return opt;
    }

    private DevelopStylePicture obtainPicture(final DevelopStyleTask task, final DevelopStylePictureTypeEnum type, final String url) {
        final var picture = new DevelopStylePicture();
        BasicConvert.entityInit(picture, picture::setPictureId);
        picture.setTaskId(task.getTaskId());
        picture.setPictureType(type.getCode());
        picture.setPictureUrl(url);
        return picture;
    }

    private DevelopStylePicture obtainStylePicture(final String url, final DevelopStyleTask task) {
        return obtainPicture(task, DevelopStylePictureTypeEnum.STYLE_IMAGE, url);
    }

    private DevelopStyleRemark obtainStyleRemark(final String remark, final DevelopStyleTask task) {
        final var e = new DevelopStyleRemark();
        BasicConvert.entityInit(e, e::setRemarkId);
        e.setTaskId(task.getTaskId());
        e.setRemark(remark);
        return e;
    }

    private final static SourceEnum TASK_TYPE = SourceEnum.DEVELOP_STYLE;
    private final static String CALLBACK = "/open/v1/develop-style/callback/";

    public static DevelopStyleTaskCreateResp convertOpenCreateResp(DevelopStyleTask task) {
        DevelopStyleTaskCreateResp resp = new DevelopStyleTaskCreateResp();
        resp.setTaskId(task.getTaskId());
        resp.setTaskCode(task.getTaskCode());
        resp.setCreateSuccess(Bool.YES.getCode());
        return resp;
    }
}
