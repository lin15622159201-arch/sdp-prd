package tech.tiangong.sdp.convert;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.extra.spring.SpringUtil;
import lombok.experimental.UtilityClass;
import team.aikero.admin.common.vo.AttributeVo;
import team.aikero.admin.common.vo.DictVo;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.sequence.id.IdHelper;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.butted.common.req.MulfeatExtractTaskReq;
import tech.tiangong.butted.common.req.base.CompanyUserBatchReq;
import tech.tiangong.sdp.common.req.*;
import tech.tiangong.sdp.config.DomainProperties;
import tech.tiangong.sdp.entity.*;
import tech.tiangong.sdp.enums.*;
import tech.tiangong.sdp.external.DictClientExternal;
import tech.tiangong.sdp.external.PlmConvertHelper;
import tech.tiangong.sdp.external.SdpMaterialDesignerApi;
import tech.tiangong.sdp.utils.SsoContext;
import tech.tiangong.sdp.vo.dto.*;
import tech.tiangong.sdp.vo.query.SpotStyleTaskQuery;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.*;

import javax.validation.ValidationException;
import java.math.BigDecimal;
import java.util.*;
import java.util.function.Function;
import java.util.function.Predicate;


/**
 * 现货
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/6 16:25
 */
@UtilityClass
public class SpotStyleTaskConvert {

    private final DictClientExternal dictClientExternal = SpringUtil.getBean(DictClientExternal.class);
    private final static String CALLBACK = "/open/v1/spot-style/callback/";

    public List<SpotStyleTask> convert(final List<SpotStyleTaskAddReq> list) {
        return list.stream().map(SpotStyleTaskConvert::convert).toList();
    }

    public void convert(final SpotStyleTaskEditReq req, final SpotStyleTask task) {
        validSkc(req.getSkcs());
        validIngredient(req.getIngredients());
        validSupplier(req.getSuppliers());
        BasicConvert.copy(req, task);
        if (!task.hasMainImg()) {
            task.setTaskStatus(SpotStyleTask.MAIN_IMG_Y + task.requireTaskStatus());
        }
        if (!task.dataCompleted()) {
            task.setTaskStatus(SpotStyleTask.DATA_Y + task.requireTaskStatus());
        }
        task.setOpts(List.of(obtainOpt(SpotStyleOptTypeEnum.EDIT, task, null)));
        task.setSkcs(new ArrayList<>());
        task.setIngredients(new ArrayList<>());
        task.setSuppliers(new ArrayList<>());
        task.setPictures(new ArrayList<>());
        BasicConvert.setRevised(task);
        setPicture(task, req.getProductImages(), req.getSizeImages(), req.getMainImgUrl());
        editSkc(req, task);
        editIngredient(req, task);
        editSupplier(req, task);
    }

    public void convertSkc(final SpotStyleSkcEditReq req, final SpotStyleTask task) {
        task.setPictures(new ArrayList<>());
        task.setOpts(List.of(obtainOpt(SpotStyleOptTypeEnum.EDIT_SKC, task, null)));
        final var skc = task.getSkcs().getFirst();
        BasicConvert.copy(req, skc);
        BasicConvert.setRevised(skc);
        if (!skc.hasMainImg()) {
            skc.setSkcStatus(SpotStyleSkc.MAIN_IMG_Y + skc.requireSkcStatus());
        }
        if (!skc.dataCompleted()) {
            skc.setSkcStatus(SpotStyleSkc.DATA_Y + skc.requireSkcStatus());
        }
        final var pictures = task.getPictures();
        if (StrUtil.isNotBlank(req.getMainImgUrl())) {
            final var pms = getImageUrls(req.getProductImages(), req.getMainImgUrl());
            if (CollectionUtil.isNotEmpty(pms)) {
                pictures.addAll(getProductImages(pms, task, skc));
            }
            final var img = obtainPicture(task, SpotStylePictureTypeEnum.MAIN_IMAGE, req.getMainImgUrl());
            img.setSkcId(skc.getSkcId());
            pictures.add(img);
        } else {
            final var pms = req.getProductImages();
            final var img = obtainPicture(task, SpotStylePictureTypeEnum.MAIN_IMAGE, pms.getFirst());
            img.setSkcId(skc.getSkcId());
            pictures.add(img);
            if (pms.size() > 1) {
                pictures.addAll(getProductImages(pms.subList(1, pms.size() - 1), task, skc));
            }
        }
        // 如果推送了就直接更新图片
        if (skc.pushedBuyer()) {
            final var log = obtainLog(task);
            log.setLogType(SpotPlmBuyerTypeEnum.EDIT_IMAGE.getCode());
            log.setSkcId(skc.getSkcId());
            task.setLogs(List.of(log));
        } else {
            // SPU已经推送了但是SKC没有推送,直接推送SKC
            if (task.pushedBuyer()) {
//                skc.setSkcStatus(skc.requireSkcStatus() + SpotStyleSkc.PUSH_BUYER_Y);
                final var log = obtainLog(task);
                log.setLogType(SpotPlmBuyerTypeEnum.ADD.getCode());
                log.setSkcId(skc.getSkcId());
                task.setLogs(List.of(log));
            }
        }

    }


    public List<SpotStyleTask> convert(final List<SpotStyleCancelReq> reqs, final List<SpotStyleTask> tasks) {
        final var taskMap = BasicConvert.toMap(tasks, SpotStyleTask::getTaskId);
        final var list = new ArrayList<SpotStyleTask>(tasks.size());
        reqs.stream().filter(it -> taskMap.containsKey(it.getTaskId()))
                .forEach(it -> {
                    final var task = taskMap.get(it.getTaskId());
                    if (task.cancelled()) {
                        throw new ValidationException("SPU已经取消,不允许操作");
                    }
                    task.setTaskStatus(SpotStyleTask.CANCEL_Y + task.requireTaskStatus());
                    if (StrUtil.isNotBlank(it.getMessage())) {
                        task.setMessage(it.getMessage());
                    }
                    task.setOpts(List.of(obtainOpt(SpotStyleOptTypeEnum.CANCEL, task, it.getMessage())));
                    BasicConvert.setRevised(task);
                    list.add(task);
                });
        return list;
    }

    public SpotStyleTaskQuery buildWebPage(final SpotStyleTaskPageReq req) {
        final var q = BasicConvert.copy(req, SpotStyleTaskQuery.class);
        q.setPageLimit(req.getPageSize());
        q.setDeleted(Bool.NO.getCode());
        q.setTenantId(SsoContext.tenantId());
        final var spuAllStatus = new HashSet<Integer>();
        final var skcAllStatus = new HashSet<Integer>();
        final var spuExcludeStatus = new HashSet<Integer>();
        final var skcExcludeStatus = new HashSet<Integer>();
        if (Objects.nonNull(req.getHasMainImg())) {
            if (Bool.YES.equals(req.getHasMainImg())) {
                spuAllStatus.add(SpotStyleTask.MAIN_IMG_Y);
            } else {
                spuExcludeStatus.add(SpotStyleTask.MAIN_IMG_Y);
            }
        }
        if (Objects.nonNull(req.getDataCompleted())) {
            if (Bool.YES.equals(req.getDataCompleted())) {
                spuAllStatus.add(SpotStyleTask.DATA_Y);
            } else {
                spuExcludeStatus.add(SpotStyleTask.DATA_Y);
            }
        }
        if (Objects.nonNull(req.getUpcoming())) {
            if (Bool.YES.equals(req.getUpcoming())) {
                skcAllStatus.add(SpotStyleSkc.UPCOMING_Y);
            } else {
                skcExcludeStatus.add(SpotStyleSkc.UPCOMING_Y);
            }
        }
        if (Objects.nonNull(req.getOnShelvesFail())) {
            if (Bool.YES.equals(req.getOnShelvesFail())) {
                skcAllStatus.add(SpotStyleSkc.ON_THE_SHELVES_FAIL_Y);
            } else {
                skcExcludeStatus.add(SpotStyleSkc.ON_THE_SHELVES_FAIL_Y);
            }
        }
        if (Objects.nonNull(req.getOnShelves())) {
            if (Bool.YES.equals(req.getOnShelves())) {
                skcAllStatus.add(SpotStyleSkc.ON_THE_SHELVES_Y);
                skcExcludeStatus.add(SpotStyleSkc.OFF_SHELVES_Y);
            } else {
                skcAllStatus.add(SpotStyleSkc.OFF_SHELVES_Y);
                skcExcludeStatus.add(SpotStyleSkc.ON_THE_SHELVES_Y);
                q.setSkcStatus(
                        q.requireSkcStatus() +
                                SpotStyleSkc.UPCOMING_Y + SpotStyleSkc.DATA_Y +
                                SpotStyleSkc.MAIN_IMG_Y + SpotStyleSkc.CANCEL_Y +
                                SpotStyleSkc.SALES_Y + SpotStyleSkc.PUSH_BUYER_Y +
                                SpotStyleSkc.PUSH_BUYER_FAIL_Y + SpotStyleSkc.BUYER_CANCEL_Y);
            }
        }
        if (Objects.nonNull(req.getCancelled())) {
            if (Bool.YES.equals(req.getCancelled())) {
                skcAllStatus.add(SpotStyleSkc.CANCEL_Y);
            } else {
                skcExcludeStatus.add(SpotStyleSkc.CANCEL_Y);
            }
        }
        if (Objects.nonNull(req.getSold())) {
            if (Bool.YES.equals(req.getSold())) {
                skcAllStatus.add(SpotStyleSkc.SALES_Y);
            } else {
                skcExcludeStatus.add(SpotStyleSkc.SALES_Y);
            }
        }
        if (Objects.nonNull(req.getPushedBuyer())) {
            if (Bool.YES.equals(req.getPushedBuyer())) {
                skcAllStatus.add(SpotStyleSkc.PUSH_BUYER_Y);
            } else {
                skcExcludeStatus.add(SpotStyleSkc.PUSH_BUYER_Y);
            }
        }
        if (Objects.nonNull(req.getPushFailed())) {
            if (Bool.YES.equals(req.getPushFailed())) {
                skcAllStatus.add(SpotStyleSkc.PUSH_BUYER_FAIL_Y);
            } else {
                skcExcludeStatus.add(SpotStyleSkc.PUSH_BUYER_FAIL_Y);
            }
        }
        if (Objects.nonNull(req.getBuyerCancelled())) {
            if (Bool.YES.equals(req.getBuyerCancelled())) {
                skcAllStatus.add(SpotStyleSkc.BUYER_CANCEL_Y);
            } else {
                skcExcludeStatus.add(SpotStyleSkc.BUYER_CANCEL_Y);
            }
        }
        q.setSpuAllStatus(spuAllStatus);
        q.setSkcAllStatus(skcAllStatus);
        q.setSkcExcludeStatus(skcExcludeStatus);
        q.setSpuExcludeStatus(spuExcludeStatus);
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
        if (StrUtil.isNotBlank(req.getSkcCode())) {
            q.setSkcCodes(StrUtil.split(req.getSkcCode().replaceAll(" ", StrUtil.COMMA), StrUtil.COMMA));
        }
        if (StrUtil.isNotBlank(req.getTaskCode())) {
            q.setTaskCode(null);
            q.setTaskCodes(StrUtil.split(req.getTaskCode().replaceAll(" ", StrUtil.COMMA), StrUtil.COMMA));
        }
        if (!StrUtil.isAllBlank(q.getSupplierName(), q.getSupplierStyleCode())) {
            q.setJoinSupplier(Bool.YES.getCode());
        }
        if (CollectionUtil.isNotEmpty(q.getSkcCodes()) || CollectionUtil.isNotEmpty(q.getSkcAllStatus())
                || CollectionUtil.isNotEmpty(q.getSkcExcludeStatus())) {
            q.setJoinSkc(Bool.YES.getCode());
        }
        return q;
    }

    public SpotStyleTaskPageResp convert(final SpotStyleTask task,
                                         final Map<Long, List<SpotStyleSupplier>> supplierMap,
                                         final Map<Long, List<SpotStyleSkc>> skcMap,
                                         final Map<Long, List<SpotStylePicture>> pictureMap) {
        final var resp = BasicConvert.copy(task, SpotStyleTaskPageResp.class, "styleType");
        resp.setStyleType(SpotStyleTypeEnum.from(task.getStyleType()));
        final var pictures = pictureMap.getOrDefault(task.getTaskId(), new ArrayList<>());
        final var skcPictureMap = BasicConvert.groupingBy(pictures.stream()
                        .filter(SpotStylePicture::skcImage).toList(),
                SpotStylePicture::getSkcId);
        final var spuPictures = pictures.stream()
                .filter(it -> Objects.equals(it.getSkcId(), 0L)).toList();
        if (CollectionUtil.isNotEmpty(spuPictures)) {
            resp.setProductImages(spuPictures.stream()
                    .filter(SpotStylePicture::spuImage)
                    .map(SpotStyleTaskConvert::obtainPictureResp).toList());
        }
        final var suppliers = supplierMap.get(task.getTaskId());
        if (CollectionUtil.isNotEmpty(suppliers)) {
            resp.setSuppliers(suppliers.stream().map(SpotStyleTaskConvert::obtainSupplierResp).toList());
        }
        resp.setHasMainImg(Bool.NO);
        resp.setDataCompleted(Bool.NO);
        resp.setCancelled(Bool.NO);
        if (task.hasMainImg()) {
            resp.setHasMainImg(Bool.YES);
        }
        if (task.dataCompleted()) {
            resp.setDataCompleted(Bool.YES);
        }
        if (task.cancelled()) {
            resp.setCancelled(Bool.YES);
        }
        final var skcs = skcMap.get(task.getTaskId());
        if (CollectionUtil.isNotEmpty(skcs)) {
            resp.setSkcs(skcs.stream().map(it -> {
                it.setPictures(skcPictureMap.get(it.getSkcId()));
                return obtainSkcResp(it);
            }).toList());
        }
        return resp;
    }


    public List<SpotStyleTask> convertEditProductImage(final List<SpotStyleEditProductImageReq> reqs,
                                                       final Map<String, SpotStyleTask> taskMap) {
        final var list = new ArrayList<SpotStyleTask>(reqs.size());
        reqs.stream().filter(it -> taskMap.containsKey(it.getTaskCode()))
                .forEach(it -> {
                    final var task = taskMap.get(it.getTaskCode());
                    if (task.cancelled()) {
                        throw new ValidationException("SPU已经取消,不允许操作");
                    }
                    if (!task.hasMainImg()) {
                        task.setTaskStatus(SpotStyleTask.MAIN_IMG_Y + task.requireTaskStatus());
                    }
                    task.setPictures(new ArrayList<>());
                    final var images = it.getProductImages();
                    task.setMainImgUrl(images.getFirst());
                    if (images.size() > 1) {
                        setPicture(task, images, null, images.getFirst());
                    } else {
                        task.getPictures().add(obtainPicture(task, SpotStylePictureTypeEnum.MAIN_IMAGE, images.getFirst()));
                    }
                    task.setOpts(List.of(obtainOpt(SpotStyleOptTypeEnum.EDIT_IMAGE, task, null)));
                    BasicConvert.setRevised(task);
                    list.add(task);
                });
        return list;
    }

    public List<SpotStyleTask> convert(final List<SpotStyleSkcReColorReq> reqs,
                                       final Map<Long, SpotStyleTask> taskMap,
                                       final Map<Long, List<SpotStyleSkc>> skcMap) {
        final var list = new ArrayList<SpotStyleTask>(reqs.size());
        reqs.stream().filter(it -> taskMap.containsKey(it.getTaskId()))
                .forEach(it -> {
                    final var task = taskMap.get(it.getTaskId());
                    if (task.cancelled()) {
                        throw new ValidationException("SPU已经取消,不允许操作");
                    }
                    if (skcMap.getOrDefault(task.getTaskId(), new ArrayList<>()).stream()
                            .anyMatch(s -> StrUtil.equalsIgnoreCase(s.getColor(), it.getColor()))) {
                        throw new ValidationException("存在颜色重复的SKC,请勿重复创建");
                    }
                    if (CollectionUtil.isEmpty(task.getSkcs())) {
                        task.setSkcs(new ArrayList<>());
                    }
                    if (CollectionUtil.isEmpty(task.getPictures())) {
                        task.setPictures(new ArrayList<>());
                    }
                    final var skc = obtainSkc(task);
                    BasicConvert.copy(it, skc);
                    skc.setSkcStatus(skc.requireSkcStatus() + SpotStyleSkc.RE_COLOR_Y);
                    final var pictures = task.getPictures();
                    final var hasMainImg = StrUtil.isNotBlank(it.getMainImgUrl());
                    final var mainImgUrl = hasMainImg ? it.getMainImgUrl() : it.getProductImages().getFirst();
                    final var img = obtainPicture(task, SpotStylePictureTypeEnum.MAIN_IMAGE, mainImgUrl);
                    img.setSkcId(skc.getSkcId());
                    pictures.add(img);
                    final var pms = getImageUrls(it.getProductImages(), mainImgUrl);
                    if (CollectionUtil.isNotEmpty(pms)) {
                        pictures.addAll(getProductImages(pms, task, skc));
                    }
                    task.getSkcs().add(skc);
                    task.setOpts(List.of(obtainOpt(SpotStyleOptTypeEnum.RE_COLOR, task, null)));
                    skcGenCode(task);
                    list.add(task);
                });
        return list;
    }

    public SpotStyleTaskResp toDetailResp(final SpotStyleTask task) {
        final var resp = BasicConvert.copy(task, SpotStyleTaskResp.class, "styleType");
        resp.setStyleType(SpotStyleTypeEnum.from(task.getStyleType()));
        resp.setHasMainImg(Bool.NO);
        resp.setDataCompleted(Bool.NO);
        resp.setCancelled(Bool.NO);
        if (task.hasMainImg()) {
            resp.setHasMainImg(Bool.YES);
        }
        if (task.dataCompleted()) {
            resp.setDataCompleted(Bool.YES);
        }
        if (task.cancelled()) {
            resp.setCancelled(Bool.YES);
        }
        final var pictures = task.getPictures();
        final var skcPictureMap = BasicConvert.groupingBy(pictures.stream()
                        .filter(SpotStylePicture::skcImage).toList(),
                SpotStylePicture::getSkcId);
        final var spuPictures = pictures.stream()
                .filter(it -> Objects.equals(it.getSkcId(), 0L)).toList();
        if (CollectionUtil.isNotEmpty(spuPictures)) {
            resp.setProductImages(spuPictures.stream()
                    .filter(SpotStylePicture::spuImage)
                    .map(SpotStyleTaskConvert::obtainPictureResp).toList());
            resp.setSizeImages(spuPictures.stream()
                    .filter(SpotStylePicture::sizeImage)
                    .map(SpotStyleTaskConvert::obtainPictureResp).toList());
        }
        if (CollectionUtil.isNotEmpty(task.getSkcs())) {
            resp.setSkcs(task.getSkcs().stream().map(it -> {
                it.setPictures(skcPictureMap.get(it.getSkcId()));
                return obtainSkcResp(it);
            }).toList());
        }
        if (CollectionUtil.isNotEmpty(task.getIngredients())) {
            resp.setIngredients(task.getIngredients().stream()
                    .map(it -> BasicConvert.copy(it, SpotStyleIngredientResp.class)).toList());
        }
        if (CollectionUtil.isNotEmpty(task.getSuppliers())) {
            resp.setSuppliers(task.getSuppliers().stream()
                    .map(it -> BasicConvert.copy(it, SpotStyleSupplierResp.class)).toList());
        }
        if (CollectionUtil.isNotEmpty(task.getOpts())) {
            resp.setOpts(task.getOpts().stream()
                    .map(it -> BasicConvert.copy(it, SpotStyleOptResp.class)).toList());
        }
        return resp;
    }

    public SpotStyleOptResp toOptResp(final SpotStyleOpt opt) {
        final var resp = BasicConvert.copy(opt, SpotStyleOptResp.class);
        resp.setOptType(SpotStyleOptTypeEnum.from(opt.getOptType()).getVale());
        return resp;
    }

    public List<SpotStyleExportDTO> convert(final List<SpotStyleSkc> skcs,
                                            final Map<Long, SpotStyleTask> spuMap,
                                            final Map<Long, List<SpotStyleSupplier>> supplierMap,
                                            final Map<Long, List<SpotStylePicture>> pictureMap) {
        return skcs.stream().map(it -> {
            final var taskId = it.getTaskId();
            final var data = new SpotStyleExportDTO();
            Optional.ofNullable(spuMap.get(taskId)).ifPresent(spu -> {
                BasicConvert.copy(spu, data, "styleType", "revisedTime", "createdTime");
                data.setStyleType(SpotStyleTypeEnum.from(spu.getStyleType()).getVale());
                final var suppliers = supplierMap.get(taskId);
                if (CollectionUtil.isNotEmpty(suppliers)) {
                    final var supplier = suppliers.getFirst();
                    data.setPayeeName(supplier.getPayeeName());
                    data.setSupplierName(supplier.getSupplierName());
                    data.setSupplierStyleCode(supplier.getSupplierCode());
                }
                data.setDeveloperName(spu.getCreatorName());
            });
            final var pictures = pictureMap.get(it.getSkcId());
            if (CollectionUtil.isNotEmpty(pictures)) {
                pictures.stream()
                        .filter(SpotStylePicture::mainImage)
                        .findFirst().ifPresent(p ->
                                data.setProductPictureUploadTime(BasicConvert.format(p.getCreatedTime())));
            }
            BasicConvert.copy(it, data, "revisedTime", "createdTime");
            data.setCreatedTime(BasicConvert.format(it.getCreatedTime()));
            if (Objects.nonNull(it.getRevisedTime())) {
                data.setRevisedTime(BasicConvert.format(it.getRevisedTime()));
            }
            return data;
        }).toList();
    }

    public List<SpotStyleTask> convertOnShelve(final List<SpotStyleTask> tasks, final List<SpotStyleSkc> skcs) {
        final var taskMap = BasicConvert.toMap(tasks, SpotStyleTask::getTaskId);
        final var data = new ArrayList<SpotStyleTask>(tasks.size());
        skcs.stream()
                .filter(SpotStyleSkc::hasMainImg)
                .filter(SpotStyleSkc::dataCompleted)
                .filter(SpotStyleSkc::canOnShelve)
                .filter(it -> taskMap.containsKey(it.getTaskId())).forEach(it -> {
                    final var task = taskMap.get(it.getTaskId());
                    if (task.cancelled()) {
                        throw new ValidationException("SPU已经取消,不允许操作");
                    }
                    if (!task.hasMainImg() || !task.dataCompleted()) {
                        throw new ValidationException("SPU数据未完善,不允许操作");
                    }
                    // 待上架
                    if (it.canUpcoming() || it.onShelvesFail()) {
                        if (CollectionUtil.isEmpty(task.getSkcs())) {
                            task.setSkcs(new ArrayList<>());
                            data.add(task);
                        }
                        if (CollectionUtil.isEmpty(task.getOpts())) {
                            task.setOpts(List.of(obtainOpt(SpotStyleOptTypeEnum.ON_SHELVES, task, null)));
                        }
                        if (it.onShelvesFail()) {
                            it.setSkcStatus(it.requireSkcStatus() - SpotStyleSkc.ON_THE_SHELVES_FAIL_Y);
                        }
                        it.setSkcStatus(it.requireSkcStatus() + SpotStyleSkc.UPCOMING_Y);
                        task.getSkcs().add(it);
                    }
                });
        return data;
    }

    public SpotStyleTaskAddReq buildAdd(final DevelopStyleTask task) {
        final var spu = task.getSpus().getFirst();
        final var req = BasicConvert.copy(spu, SpotStyleTaskAddReq.class);
        final var pictures = task.getPictures();
        if (CollectionUtil.isNotEmpty(pictures)) {
            req.setProductImages(pictures.stream().map(DevelopStylePicture::getPictureUrl).toList());
        }
        if (StrUtil.isNotBlank(task.getSupplierName()) ||
                StrUtil.isNotBlank(task.getSupplierStyleCode()) ||
                Objects.isNull(task.getPrice())) {
            final var supplier = new SpotStyleSupplierAddReq();
            supplier.setSupplierName(task.getSupplierName());
            supplier.setSupplierStyleCode(task.getSupplierStyleCode());
            supplier.setPurchasePrice(task.getPrice());
            req.setSuppliers(List.of(supplier));
        }
        req.setSkcs(spu.getSkcs().stream().map(it -> {
            final var skc = BasicConvert.copy(it, SpotStyleSkcAddReq.class);
            skc.setMainImgUrl(spu.getMainImgUrl());
            return skc;
        }).toList());
        req.setElasticCode(task.getElasticCode());
        req.setElasticName(task.getElasticName());
        return req;
    }


    public List<SpotStyleSkc> batchOnShelvesReview(final List<SpotStyleTaskOnShelvesReviewReq> reqs, final List<SpotStyleSkc> skcs) {
        final var spuMap = BasicConvert.toMap(reqs, SpotStyleTaskOnShelvesReviewReq::getSpuId);
        final var list = new ArrayList<SpotStyleSkc>(skcs.size());
        skcs.stream().filter(it -> spuMap.containsKey(it.getTaskId()))
                .forEach(it -> {
                    final var spuResult = spuMap.get(it.getTaskId());
                    final var opt = new SpotStyleOpt();
                    if (!spuResult.getPass()) {
                        it.setSkcStatus(it.requireSkcStatus() - SpotStyleSkc.UPCOMING_Y);
                        if (!it.onShelvesFail()) {
                            it.setSkcStatus(it.requireSkcStatus() + SpotStyleSkc.ON_THE_SHELVES_FAIL_Y);
                        }
                        it.setOnShelvesFailReason(spuResult.getFailMessage());
                        opt.setContent(spuResult.getFailMessage());
                        opt.setOptType(SpotStyleOptTypeEnum.ON_SHELVES_FAIL.getCode());
                    }
                    opt.setTaskId(it.getTaskId());
                    BasicConvert.entityInit(opt, opt::setOptId);
                    it.setOpts(List.of(opt));
                    BasicConvert.setRevised(it);
                    list.add(it);
                });
        return list;
    }

    public static List<SpotStyleSkc> batchOnShelvesReleaseResult(StyleOnShelvesReleaseReq req, List<SpotStyleSkc> skcs) {
        final var list = new ArrayList<SpotStyleSkc>(skcs.size());
        skcs.forEach(skc -> {
            final var opt = new SpotStyleOpt();
            // 下架
            if (Objects.equals(req.getReleaseSuccess(), Bool.NO.asBoolean())) {
                if (skc.onShelves()) {
                    skc.setSkcStatus(skc.requireSkcStatus() - SpotStyleSkc.ON_THE_SHELVES_Y);
                }
                if (!skc.offShelves()) {
                    skc.setSkcStatus(skc.requireSkcStatus() + SpotStyleSkc.OFF_SHELVES_Y);
                }
                opt.setOptType(SpotStyleOptTypeEnum.OFF_SHELVES.getCode());
            } else if (Objects.equals(req.getReleaseSuccess(), Bool.YES.asBoolean())) { // 上架
                //之前是待上架的状态
                if (skc.upcoming()) {
                    skc.setSkcStatus(skc.requireSkcStatus() - SpotStyleSkc.UPCOMING_Y);
                    skc.setSkcStatus(skc.requireSkcStatus() + SpotStyleSkc.ON_THE_SHELVES_Y);
                }
                //之前是上架失败状态
                else if (skc.onShelvesFail()) {
                    skc.setSkcStatus(skc.requireSkcStatus() - SpotStyleSkc.ON_THE_SHELVES_FAIL_Y);
                    skc.setSkcStatus(skc.requireSkcStatus() + SpotStyleSkc.ON_THE_SHELVES_Y);
                } else if (!skc.onShelves()) {
                    skc.setSkcStatus(skc.requireSkcStatus() + SpotStyleSkc.ON_THE_SHELVES_Y);
                }
                if (skc.offShelves()) {
                    skc.setSkcStatus(skc.requireSkcStatus() - SpotStyleSkc.OFF_SHELVES_Y);
                }
                opt.setOptType(SpotStyleOptTypeEnum.ON_SHELVES_SUCCESS.getCode());
            }
            opt.setTaskId(skc.getTaskId());
            BasicConvert.entityInit(opt, opt::setOptId);
            skc.setOpts(List.of(opt));
            BasicConvert.setRevised(skc);
            list.add(skc);
        });
        return list;
    }

    public List<SpotStyleSkc> convertCancelSkc(final List<SpotStyleSkcCancelReq> reqs, final List<SpotStyleSkc> skcs) {
        final var sckMap = BasicConvert.toMap(skcs, SpotStyleSkc::getSkcId);
        final var list = new ArrayList<SpotStyleSkc>(skcs.size());
        reqs.stream().filter(it -> sckMap.containsKey(it.getSkcId()))
                .forEach(it -> {
                    final var skc = sckMap.get(it.getSkcId());
                    if (skc.cancelled()) {
                        throw new ValidationException("SKC已经取消,不允许操作");
                    }
                    skc.setSkcStatus(SpotStyleSkc.CANCEL_Y + skc.requireSkcStatus());
                    if (StrUtil.isNotBlank(it.getMessage())) {
                        skc.setMessage(it.getMessage());
                    }
                    final var opt = new SpotStyleOpt();
                    opt.setTaskId(skc.getTaskId());
                    BasicConvert.entityInit(opt, opt::setOptId);
                    opt.setOptType(SpotStyleOptTypeEnum.CANCEL_SKC.getCode());
                    if (StrUtil.isNotBlank(it.getMessage())) {
                        opt.setContent(it.getMessage());
                    }
                    skc.setOpts(List.of(opt));
                    BasicConvert.setRevised(skc);
                    if (skc.pushedBuyer()) {
                        final var log = new PlmBuyerLog();
                        BasicConvert.entityInit(log, log::setLogId);
                        log.setTaskId(skc.getTaskId());
                        log.setSkcId(skc.getSkcId());
                        log.setLogType(SpotPlmBuyerTypeEnum.CANCEL.getCode());
                        log.setPushStatus(Bool.NO.getCode());
                        skc.setLogs(List.of(log));
                    }
                    list.add(skc);
                });
        return list;
    }

    public List<SpotStyleTask> convertImageUpdate(final List<SpotStyleImageUpdateReq> reqs, final List<SpotStyleTask> tasks) {
        final var taskMap = BasicConvert.toMap(tasks, SpotStyleTask::getTaskId);
        final var list = new ArrayList<SpotStyleTask>(tasks.size());
        reqs.stream().filter(it -> taskMap.containsKey(it.getTaskId()))
                .forEach(it -> {
                    final var task = taskMap.get(it.getTaskId());
                    if (!task.cancelled()) {
                        task.setImageUpdateId(it.getImageUpdateId());
                        task.setImageUpdateCode(it.getImageUpdateCode());
                        task.setImageUpdateStatus(it.getImageUpdateStatus());
                        task.setImageUpdateTime(it.getImageUpdateTime());
                        list.add(task);
                        final var productImages = it.getProductImages();
                        if (CollectionUtil.isNotEmpty(productImages)) {
                            final var mainUrl = productImages.getFirst();
                            task.setMainImgUrl(mainUrl);
                            final var urls = getImageUrls(productImages, mainUrl);
                            final var pictures = new ArrayList<SpotStylePicture>(urls.size());
                            pictures.add(obtainPicture(task, SpotStylePictureTypeEnum.MAIN_IMAGE, mainUrl));
                            if (CollectionUtil.isNotEmpty(urls)) {
                                pictures.addAll(urls.stream().map(l -> obtainStylePicture(l, task)).toList());
                            }
                            task.setPictures(pictures);
                        }
                    }
                });
        return list;
    }

    public BuyerGenerateCodeReq convert(final SpotStyleTask task, final Integer total) {
        final var req = new BuyerGenerateCodeItemReq();
        req.setKey(Objects.toString(task.getTaskId()));
        req.setDesignCodeCount(total);
        req.setCreateNewSpu(true);
        if (task.hasCode()) {
            req.setCreateNewSpu(false);
            req.setStyleCode(task.getTaskCode());
            req.setKey(task.getTaskCode());
        }
        req.setCategoryName(task.getPlmCategoryNames());
        return new BuyerGenerateCodeReq(List.of(req));
    }

    public BuyerEditSkuImageReq convert(final SpotStyleSkc skc, final List<SpotStylePicture> pictures) {
        final var req = new BuyerEditSkuImageReq();
        final var len = Math.min(pictures.size(), 9);
        req.setItems(List.of(new BuyerEditSkuImageItemReq(skc.getSkcCode(), pictures.stream().limit(len).map(SpotStylePicture::getPictureUrl).toList())));
        return req;
    }

    public BuyerSkcCancelReq convert(final SpotStyleSkc skc) {
        final var req = new BuyerSkcCancelReq();
        req.setCancelItems(List.of(new BuyerSkcCancelItemReq(skc.getSkcCode(), skc.getMessage())));
        return req;
    }

    public BuyerCreateSpuReq convert(final SpotStyleTask task) {
        final var req = new BuyerCreateSpuItemReq();
        final var skcs = task.getSkcs();
        final var pictures = task.getPictures();
        final var suppliers = task.getSuppliers();
        final var styleName = getStyleName(task);
        final var supplier = suppliers.getFirst();
        final var purchasePrice = supplier.getPurchasePrice();
        final var supplierArticleNumber = supplier.getSupplierStyleCode();
        final var pictureMap = BasicConvert.groupingBy(
                pictures.stream().filter(SpotStylePicture::skcImage).toList(), SpotStylePicture::getSkcId);
        final var dictColor = PlmConvertHelper.dictColor();
        final var dictPrinting = PlmConvertHelper.dictPrinting();
        final var patternElement =
                dictPrinting.stream().filter(it -> StrUtil.equalsIgnoreCase(task.getPrintingCode(), it.getDictCode()))
                        .filter(it -> CollectionUtil.isNotEmpty(it.getAttributes()))
                        .flatMap(it -> it.getAttributes().stream())
                        .filter(it -> StrUtil.equalsIgnoreCase("plm_value", it.getCode()))
                        .map(AttributeVo::getName).findFirst().orElse("");
        // SPU
        req.setDesignStyle(obtainStyleReq(task, skcs));
        req.setPrototypes(skcs.stream().map(it -> {
            plmColor(it, dictColor);
            final var prototype = new BuyerCreateSkcReq();
            prototype.setDesignCode(it.getSkcCode());
            prototype.setPatternElement(patternElement);
            prototype.setPrototypeType(1);
            prototype.setStyleName(styleName);
            prototype.setSellPoint(styleName);
            prototype.setIsSplicing(Bool.NO.getCode());
            prototype.setProfitPoint(new BigDecimal("0.00"));
            prototype.setCostPrice(purchasePrice);
            prototype.setSupplierArticleNumber(supplierArticleNumber);
            prototype.setColor(it.getPlmColorName());
            prototype.setColorCode(it.getPlmColor());
            if (it.reColor()) {
                prototype.setPrototypeType(2);
            }
            prototype.setSpecialTag(List.of("sdp_y2"));
            final var skcPictures = pictureMap.getOrDefault(it.getSkcId(), Collections.emptyList());
            if (CollectionUtil.isNotEmpty(skcPictures)) {
                final var len = Math.min(pictures.size(), 9);
                prototype.setCustomerPictureList(skcPictures
                        .stream().limit(len).map(SpotStylePicture::getPictureUrl).toList());
            }
            return prototype;
        }).toList());
        return new BuyerCreateSpuReq(List.of(req));
    }


    public PlmBuyerLog obtainLog(final SpotStyleTask task) {
        final var log = new PlmBuyerLog();
        BasicConvert.entityInit(log, log::setLogId);
        log.setTaskId(task.getTaskId());
        log.setLogType(SpotPlmBuyerTypeEnum.CODE.getCode());
        log.setPushStatus(Bool.NO.getCode());
        return log;
    }

    public void convert(final TemuOrderSync sync, final SpotStyleSkc skc) {
        skc.setSaleTime(sync.getOrderCreatedTime());
        if (!skc.sold()) {
            skc.setSkcStatus(skc.requireSkcStatus() + SpotStyleSkc.SALES_Y);
        }
        if (!skc.upcoming()) {
            skc.setSkcStatus(skc.requireSkcStatus() + SpotStyleSkc.UPCOMING_Y);
        }
        if (Objects.equals(sync.getSkcSiteStatus(), Bool.NO.getCode())) {
            if (skc.onShelves()) {
                skc.setSkcStatus(skc.requireSkcStatus() - SpotStyleSkc.ON_THE_SHELVES_Y);
            }
        } else if (Objects.equals(sync.getSkcSiteStatus(), Bool.YES.getCode())) {
            if (!skc.onShelves()) {
                skc.setSkcStatus(skc.requireSkcStatus() + SpotStyleSkc.ON_THE_SHELVES_Y);
            }
        }
    }

    public void convertBuyer(final List<SpotStyleTask> tasks, final Map<Long, List<SpotStyleSkc>> skcMap) {
        tasks.forEach(it -> {
            if (it.cancelled()) {
                throw new ValidationException("SPU已经取消,不允许操作");
            }
            it.setOpts(List.of(obtainOpt(SpotStyleOptTypeEnum.PUSH_BUYER, it, null)));
            BasicConvert.setRevised(it);
            if (!it.pushedBuyer()) {
                it.setTaskStatus(it.requireTaskStatus() + SpotStyleTask.PUSH_BUYER_Y);
            }
            it.setLogs(new ArrayList<>());
            skcMap.getOrDefault(it.getTaskId(), Collections.emptyList())
                    .forEach(skc -> {
                        final var log = obtainLog(it);
                        log.setLogType(SpotPlmBuyerTypeEnum.ADD.getCode());
                        log.setSkcId(skc.getSkcId());
                        it.getLogs().add(log);
                    });
        });
    }

    public void convert(final SpotSkcCancelReq req, final SpotStyleSkc skc) {
        BasicConvert.setRevised(skc);
        skc.setBuyerCancelMessage(req.getCancelReason());
        skc.setSkcStatus(skc.requireSkcStatus() + SpotStyleSkc.BUYER_CANCEL_Y);
        final var opt = new SpotStyleOpt();
        opt.setTaskId(skc.getTaskId());
        BasicConvert.entityInit(opt, opt::setOptId);
        opt.setOptType(SpotStyleOptTypeEnum.BUYER_CANCEL_SKC.getCode());
        if (StrUtil.isNotBlank(req.getCancelReason())) {
            opt.setContent(req.getCreatorName() + " 取消SKC<br/>原因: " + req.getCancelReason());
        } else {
            opt.setContent(req.getCreatorName() + " 取消SKC");
        }
        skc.setOpts(List.of(opt));
    }

    public List<MulfeatExtractTask> obtainMulfeatExtract(final SpotStyleTask task) {
        final var list = new ArrayList<MulfeatExtractTask>();
        final var skcs = task.getSkcs();
        if (CollectionUtil.isEmpty(skcs)) {
            return list;
        }
        skcs.forEach(it -> {
            final var t = new MulfeatExtractTask();
            BasicConvert.entityInit(t);
            t.setBusId(it.getSkcId());
            t.setTaskCode(task.getTaskCode());
            t.setBusType(SourceEnum.SPOT_STYLE.getCode());
            t.setInputImg(it.getMainImgUrl());
            list.add(t);
        });
        return list;
    }

    public CompanyUserBatchReq<MulfeatExtractTaskReq> buildMulfeatExtractReq(final SpotStyleTask task) {
        final var rec = task.getMulfeatExtracts().getFirst();
        final var req = BasicConvert.companyUserBatch(task,
                List.of(new MulfeatExtractTaskReq(rec.getTaskId(), rec.getTaskCode(), rec.getInputImg())));
        req.setCallback(DomainProperties.buildPath(CALLBACK + "mulfeat-extract"));
        return req;
    }

    public SkcImageResp convert(final SpotStyleSkc skc,
                                final Map<Long, List<SpotStyleSupplier>> supplierMap,
                                final Map<Long, DesignerDTO> designerMap,
                                final DesignImageDTO dto,
                                final Map<Long, SpotStyleTask> taskMap
    ) {
//        final var dto = mapVector.get(skc.getSkcId());
        final var resp = BasicConvert.copy(dto, SkcImageResp.class);
        resp.setCreatedTime(skc.getCreatedTime());
        resp.setImageUrl(skc.getMainImgUrl());

        final var suppliers = supplierMap.get(skc.getTaskId());
        if (CollectionUtil.isNotEmpty(suppliers)) {
            suppliers.stream()
                    .map(SpotStyleSupplier::getPurchasePrice)
                    .filter(Objects::nonNull)
                    .findFirst().ifPresent(resp::setPurchasePrice);
        }
        resp.setDesignerId(skc.getCreatorId());
        resp.setDesignerName(skc.getCreatorName());
        Optional.ofNullable(designerMap.get(resp.getDesignerId())).ifPresent(it -> {
            resp.setDesignerGroupName(it.getDesignerGroupName());
            resp.setDesignerGroupCode(it.getDesignerGroupCode());
        });
        Optional.ofNullable(taskMap.get(skc.getTaskId())).ifPresent(it -> {
            resp.setStoreId(it.getStoreId());
            resp.setStoreName(it.getStoreName());
        });
        resp.setUpcoming(Bool.NO);
        resp.setOnShelves(null);
        resp.setOnShelvesFail(null);
        resp.setCancelled(Bool.NO);
        if (skc.upcoming()) {
            resp.setUpcoming(Bool.YES);
        }
        if (skc.onShelves()) {
            resp.setOnShelves(Bool.YES);
        }
        if (skc.offShelves()) {
            resp.setOnShelves(Bool.NO);
        }
        if (skc.onShelvesFail()) {
            resp.setOnShelvesFail(Bool.YES);
        }
        return resp;
    }

    private String getStyleName(final SpotStyleTask task) {
        final var titleData = task.getTitleData();
        final var categoryName = task.getCategoryName().replaceAll(StrUtil.DASHED, StrUtil.EMPTY);
        if (StrUtil.isNotBlank(titleData)) {
            final var dto = JsonsKt.parseJson(titleData, FashionTitleAnalysisDTO.class);
            if (Objects.isNull(dto)) {
                return categoryName;
            }
            return Optional.ofNullable(dto.getResult())
                    .map(FashionTitleAnalysisResultDTO::getChineseTitle).orElse(categoryName);
        }
        return categoryName;
    }

    private void skcGenCode(final SpotStyleTask task) {
        final var logs = new ArrayList<PlmBuyerLog>();
        final var codes = new ArrayList<SpotBuyerCode>();
        task.getSkcs().forEach(it -> {
            final var log = obtainLog(task);
            log.setSkcId(it.getSkcId());
            log.setLogType(SpotPlmBuyerTypeEnum.SKC_CODE.getCode());
            logs.add(log);
            codes.add(skcGenCode(task, it.getSkcId(), log.getLogId()));
        });
        task.setLogs(logs);
        task.setCodes(codes);
    }

    private SpotBuyerCode skcGenCode(SpotStyleTask task, final Long skcId, final Long logId) {
        final var code = new SpotBuyerCode();
        BasicConvert.entityInit(code);
        code.setTaskId(skcId);
        code.setLogId(logId);
        code.setParentId(task.getTaskId());
        code.setCodeStatus(0);
        return code;
    }

    private void plmColor(final SpotStyleSkc skc, final List<DictDTO> dict) {
        final var colors = dict.stream().filter(it -> StrUtil.equalsIgnoreCase(skc.getColor(), it.getDictName()))
                .filter(it -> CollectionUtil.isNotEmpty(it.getAttributes()))
                .filter(it -> it.getAttributes().stream()
                        .anyMatch(a -> StrUtil.equalsIgnoreCase(skc.getColorEnName(), a.getName())))
                .toList();
        colors.stream().flatMap(it -> it.getAttributes().stream())
                .filter(it -> StrUtil.equalsIgnoreCase("YSSH", it.getCode())).findFirst()
                .ifPresent(it -> {
                    skc.setPlmColor(it.getRemark());
                    skc.setPlmColorName(it.getName());
                });

    }

    private BuyerCreateStyleReq obtainStyleReq(final SpotStyleTask task, final List<SpotStyleSkc> skcs) {
        final var designStyle = new BuyerCreateStyleReq();
        designStyle.setStyleCode(task.getTaskCode());
        designStyle.setCategory(task.getPlmCategoryCodes());
        designStyle.setCategoryName(task.getPlmCategoryNames());
        // 尺码标准
        final var sizeStandardElement = PlmConvertHelper.getPlmDictValueVo(task.getSizeStandardCode(), DictEnum.PLM_STANDARD_SIZE, DictEnum.PLM_STANDARD_SIZE);
        designStyle.setSizeStandard(sizeStandardElement.getValue());
        designStyle.setSizeStandardCode(sizeStandardElement.getValueCode());
        PlmConvertHelper.referenceSeason().stream().filter(it -> StrUtil.equalsIgnoreCase(task.getSeasonCode(), it.getDictCode()))
                .filter(it -> CollectionUtil.isNotEmpty(it.getAttributes()))
                .flatMap(it -> it.getAttributes().stream())
                .filter(it -> StrUtil.equalsIgnoreCase("plm_value", it.getCode()))
                .findFirst().ifPresent(it -> designStyle.setReferSeason(it.getName()));
        designStyle.setQualityLevel(task.getQualityLevelName());
        designStyle.setQualityLevelCode(task.getQualityLevelCode());
        designStyle.setSeedCoat(Bool.NO.getCode());
        designStyle.setClothingStyle("活力休闲 / 时尚休闲");
        designStyle.setPerformStandardCode("11");
        designStyle.setPerformStandardName("FZ/T81004-2022");
        designStyle.setSecurityCategoryCode("1");
        designStyle.setSecurityCategoryName("GB 18401-2010 B类");
        designStyle.setRegionName("广州");
        designStyle.setRegionId(4);
        designStyle.setSuitAmount(1);
        designStyle.setSupplierAddress("广东省深圳市龙华区福城街道大水坑社区观光路1393号517");
        designStyle.setSupplierName("深圳致衣科技有限公司");
        designStyle.setSupplierId(1705123797560262657L);
        designStyle.setSupplierContacts("冼淑美");
        designStyle.setOutline(task.getPatternName());
        designStyle.setWeaveMode(task.getWeaveModeName());
        PlmConvertHelper.setPlmDict("plm_standard_size", "天工尺码标准", it -> designStyle.setSizeStandardCode(it.getValueCode()));
        PlmConvertHelper.setPlmDict("aps_category_type", task.getWeaveModeName(), it -> designStyle.setWeaveModeCode(it.getValueCode()));
        final var dict = PlmConvertHelper.getPlmDict("plm_standard_size");
        dict.getDictValues().stream()
                .filter(it -> StrUtil.equalsIgnoreCase("天工尺码标准", it.getValue()))
                .findFirst().ifPresent(it -> designStyle.setSizeStandardCode(it.getValueCode()));
        final var sampleSize = skcs.getFirst().getSizeStandardCode();
        if (StrUtil.isNotBlank(sampleSize)) {
            designStyle.setSampleSize(StrUtil.contains(sampleSize, StrUtil.DASHED) ? StrUtil.split(sampleSize, StrUtil.DASHED).getFirst() : sampleSize);
        }
        return designStyle;
    }


    private SpotStyleSkc obtainSkc(final SpotStyleTask task) {
        final var skc = new SpotStyleSkc();
        skc.setTaskId(task.getTaskId());
        BasicConvert.entityInit(skc, skc::setSkcId);
//        skc.setSkcCode(BasicConvert.code(CodeRuleEnum.SPOT_STYLE_SKC));
        skc.setSkcCode(StrUtil.EMPTY);
        skc.setSkcStatus(SpotStyleSkc.MAIN_IMG_Y + SpotStyleTask.DATA_Y);
        return skc;
    }

    private SpotStyleSkcResp obtainSkcResp(final SpotStyleSkc skc) {
        final var resp = BasicConvert.copy(skc, SpotStyleSkcResp.class);
        resp.setHasMainImg(Bool.NO);
        resp.setDataCompleted(Bool.NO);
        resp.setUpcoming(Bool.NO);
        resp.setOnShelves(null);
        resp.setOnShelvesFail(null);
        resp.setCancelled(Bool.NO);
        resp.setSold(Bool.NO);
        resp.setPushedBuyer(Bool.NO);
        resp.setPushFailed(Bool.NO);
        resp.setBuyerCancelled(Bool.NO);
        if (skc.hasMainImg()) {
            resp.setHasMainImg(Bool.YES);
        }
        if (skc.dataCompleted()) {
            resp.setDataCompleted(Bool.YES);
        }
        if (skc.upcoming()) {
            resp.setUpcoming(Bool.YES);
        }
        if (skc.onShelves()) {
            resp.setOnShelves(Bool.YES);
        }
        if (skc.offShelves()) {
            resp.setOnShelves(Bool.NO);
        }
        if (skc.onShelvesFail()) {
            resp.setOnShelvesFail(Bool.YES);
        }
        if (skc.cancelled()) {
            resp.setCancelled(Bool.YES);
        }
        if (skc.sold()) {
            resp.setSold(Bool.YES);
        }
        if (skc.pushFailed()) {
            resp.setPushFailed(Bool.YES);
        } else {
            if (skc.pushedBuyer()) {
                resp.setPushedBuyer(Bool.YES);
            }
        }
        if (skc.buyerCancelled()) {
            resp.setBuyerCancelled(Bool.YES);
        }
        if (CollectionUtil.isNotEmpty(skc.getPictures())) {
            resp.setProductImages(skc.getPictures().stream().map(SpotStyleTaskConvert::obtainPictureResp).toList());
        }
        return resp;
    }

    private SpotStylePictureResp obtainPictureResp(final SpotStylePicture picture) {
        final var resp = BasicConvert.copy(picture, SpotStylePictureResp.class, "pictureType");
        resp.setImageId(picture.getPictureId());
        resp.setImageUrl(picture.getPictureUrl());
        resp.setPictureType(SpotStylePictureTypeEnum.from(picture.getPictureType()));
        return resp;
    }

    private SpotStyleSupplierResp obtainSupplierResp(final SpotStyleSupplier supplier) {
        return BasicConvert.copy(supplier, SpotStyleSupplierResp.class);
    }

    private void editSupplier(final SpotStyleTaskEditReq req, final SpotStyleTask task) {
        final var suppliers = req.getSuppliers();
        if (CollectionUtil.isEmpty(suppliers)) {
            return;
        }
        final var addSuppliers = suppliers.stream().filter(SpotStyleSupplierAddReq::add).toList();
        if (CollectionUtil.isNotEmpty(addSuppliers)) {
            task.getSuppliers().addAll(addSuppliers.stream()
                    .map(it -> obtainSupplier(it, task)).toList());
        }
        final var eSuppliers = task.getESuppliers();
        if (CollectionUtil.isNotEmpty(eSuppliers)) {
            final var supplierMap = BasicConvert.toMap(eSuppliers, SpotStyleSupplier::getSupplierId);
            suppliers.stream()
                    .filter(SpotStyleSupplierAddReq::edit)
                    .filter(it -> supplierMap.containsKey(it.getSupplierId()))
                    .forEach(it -> {
                        final var supplier = supplierMap.get(it.getSupplierId());
                        BasicConvert.copy(it, supplier);
                        BasicConvert.setRevised(supplier);
                    });
        }
    }

    private void editIngredient(final SpotStyleTaskEditReq req, final SpotStyleTask task) {
        final var ins = req.getIngredients();
        final var addIns = ins.stream().filter(SpotStyleIngredientAddReq::add).toList();
        if (CollectionUtil.isNotEmpty(addIns)) {
            task.getIngredients().addAll(addIns.stream()
                    .map(it -> obtainIngredient(it, task)).toList());
        }
        final var eIns = task.getEIngredients();
        if (CollectionUtil.isNotEmpty(eIns)) {
            final var ingMap = BasicConvert.toMap(eIns, SpotStyleIngredient::getIngredientId);
            ins.stream()
                    .filter(SpotStyleIngredientAddReq::edit)
                    .filter(it -> ingMap.containsKey(it.getIngredientId()))
                    .forEach(it -> BasicConvert.copy(it, ingMap.get(it.getIngredientId())));
        }
    }

    private void editSkc(SpotStyleTaskEditReq req, SpotStyleTask task) {
        final var skcs = req.getSkcs();
        final var addSkc = skcs.stream().filter(SpotStyleSkcAddReq::add).toList();
        if (CollectionUtil.isNotEmpty(addSkc)) {
            task.getSkcs().addAll(addSkc.stream().map(it -> obtainSkc(it, task)).toList());
            skcGenCode(task);
        }
        final var eSkcs = task.getESkcs();
        if (CollectionUtil.isNotEmpty(eSkcs)) {
            final var skcMap = BasicConvert.toMap(eSkcs, SpotStyleSkc::getSkcId);
            skcs.stream().filter(SpotStyleSkcAddReq::edit)
                    .filter(it -> skcMap.containsKey(it.getSkcId()))
                    .forEach(it -> {
                        final var skc = skcMap.get(it.getSkcId());
                        BasicConvert.copy(it, skc);
                        if (!skc.hasMainImg()) {
                            skc.setSkcStatus(SpotStyleSkc.MAIN_IMG_Y + skc.requireSkcStatus());
                        }
                        if (!skc.dataCompleted()) {
                            skc.setSkcStatus(SpotStyleSkc.DATA_Y + skc.requireSkcStatus());
                        }
                        BasicConvert.setRevised(skc);
                        obtainSkcPicture(it, task, skc);
                        if (skc.pushedBuyer()) {
                            final var log = obtainLog(task);
                            log.setLogType(SpotPlmBuyerTypeEnum.EDIT_IMAGE.getCode());
                            log.setSkcId(skc.getSkcId());
                            if (Objects.isNull(task.getLogs())) {
                                final var logs = new ArrayList<PlmBuyerLog>();
                                logs.add(log);
                                task.setLogs(logs);
                            } else {
                                task.getLogs().add(log);
                            }
                        }
                    });
        }
    }

    private SpotStyleTask convert(final SpotStyleTaskAddReq req) {
        validation(req);
        final var task = new SpotStyleTask();
        BasicConvert.taskInit(task, null);
        task.setTaskCode(StrUtil.EMPTY);
        BasicConvert.copy(req, task);
        task.setStyleType(SpotStyleTypeEnum.SPOT_STYLE.getCode());
        task.setSourceType(SourceTypeEnum.USER_UPLOAD.getCode());
        task.setSourceId(0L);
        // 商品图片已补充&资料已完善
        task.setTaskStatus(SpotStyleTask.MAIN_IMG_Y + SpotStyleTask.DATA_Y);
        task.setDesignerId(SsoContext.userId());
        task.setDesignerName(SsoContext.username());
        task.setOpts(List.of(obtainOpt(SpotStyleOptTypeEnum.ADD, task, null)));
        task.setSkcs(new ArrayList<>());
        task.setIngredients(new ArrayList<>());
        task.setSuppliers(new ArrayList<>());
        task.setPictures(new ArrayList<>());
        setPicture(task, req.getProductImages(), req.getSizeImages(), req.getMainImgUrl());
        task.getSkcs().addAll(req.getSkcs().stream().map(it -> {
            it.setSkcId(null);
            final var skc = obtainSkc(it, task);
            skc.setSkcStatus(SpotStyleSkc.MAIN_IMG_Y + SpotStyleSkc.DATA_Y);
            return skc;
        }).toList());
        if (CollectionUtil.isNotEmpty(req.getIngredients())) {
            task.getIngredients().addAll(req.getIngredients().stream()
                    .map(it -> {
                        it.setIngredientId(null);
                        return obtainIngredient(it, task);
                    }).toList());
        }
        if (CollectionUtil.isNotEmpty(req.getSuppliers())) {
            task.getSuppliers().addAll(req.getSuppliers().stream()
                    .map(it -> {
                        it.setSupplierId(null);
                        return obtainSupplier(it, task);
                    }).toList());
        }
        task.setLogs(List.of(obtainLog(task)));
        genCode(task);
        return task;
    }

    private void genCode(final SpotStyleTask task) {
        final var logId = task.getLogs().getFirst().getLogId();
        final var code = new SpotBuyerCode();
        BasicConvert.entityInit(code);
        code.setTaskId(task.getTaskId());
        code.setLogId(logId);
        code.setParentId(0L);
        code.setCodeStatus(0);
        final var codes = new ArrayList<SpotBuyerCode>();
        codes.add(code);
        task.setCodes(codes);
//        genSkcCode(task, logId);
        task.getSkcs()
                .forEach(it -> codes.add(skcGenCode(task, it.getSkcId(), logId)));
    }

//    private static void genSkcCode(final SpotStyleTask task, final Long logId) {
//        final var codes = task.getCodes();
//        task.getSkcs().forEach(it -> {
//            final var skcCode = new SpotBuyerCode();
//            BasicConvert.entityInit(skcCode);
//            skcCode.setTaskId(it.getSkcId());
//            skcCode.setLogId(logId);
//            skcCode.setParentId(task.getTaskId());
//            skcCode.setCodeStatus(0);
//            codes.add(skcCode);
//        });
//    }


    private List<String> getImageUrls(final List<String> productImages, final String mainImgUrl) {
        if (StrUtil.isBlank(mainImgUrl)) {
            return productImages;
        }
        if (CollectionUtil.isEmpty(productImages)) {
            return Collections.emptyList();
        }
        if (productImages.size() == 1) {
            if (StrUtil.equalsIgnoreCase(mainImgUrl, productImages.getFirst())) {
                return Collections.emptyList();
            }
            return productImages;
        }
        return productImages.stream().filter(it -> !StrUtil.equalsIgnoreCase(mainImgUrl, it)).toList();
    }

    private void setPicture(final SpotStyleTask task, final List<String> productImages,
                            final List<String> sizeImages, final String mainImgUrl) {
        final var pictures = task.getPictures();
        if (StrUtil.isNotBlank(mainImgUrl)) {
            final var urls = getImageUrls(productImages, mainImgUrl);
            pictures.add(obtainPicture(task, SpotStylePictureTypeEnum.MAIN_IMAGE, mainImgUrl));
            if (CollectionUtil.isNotEmpty(urls)) {
                pictures.addAll(urls.stream().map(it -> obtainStylePicture(it, task)).toList());
            }
        } else {
            task.setMainImgUrl(productImages.getFirst());
            pictures.add(obtainPicture(task, SpotStylePictureTypeEnum.MAIN_IMAGE, productImages.getFirst()));
            if (productImages.size() > 1) {
                pictures.addAll(productImages.subList(1, productImages.size() - 1)
                        .stream().map(it -> obtainStylePicture(it, task)).toList());
            }
        }
        if (CollectionUtil.isNotEmpty(sizeImages)) {
            pictures.addAll(sizeImages.stream().map(it -> obtainSizePicture(it, task)).toList());
        }
    }

    private SpotStylePicture obtainSizePicture(final String url, final SpotStyleTask task) {
        final var size = obtainStylePicture(url, task);
        size.setPictureType(SpotStylePictureTypeEnum.SIZE_IMAGE.getCode());
        return size;
    }

    private SpotStyleSupplier obtainSupplier(final SpotStyleSupplierAddReq req,
                                             final SpotStyleTask task) {
        final var e = new SpotStyleSupplier();
        BasicConvert.copy(req, e);
        e.setTaskId(task.getTaskId());
        BasicConvert.entityInit(e, e::setSupplierId);
        return e;
    }

    private SpotStyleSkc obtainSkc(final SpotStyleSkcAddReq req, final SpotStyleTask task) {
        final var skc = obtainSkc(task);
        BasicConvert.copy(req, skc, "skcId");
        if (Objects.nonNull(req.getSkcId())) {
            skc.setSkcId(req.getSkcId());
        }
        obtainSkcPicture(req, task, skc);
        return skc;
    }

    private void obtainSkcPicture(final SpotStyleSkcAddReq req, final SpotStyleTask task,
                                  final SpotStyleSkc skc) {
        final var pictures = task.getPictures();
        if (StrUtil.isNotBlank(req.getMainImgUrl())) {
            final var pms = getImageUrls(req.getProductImages(), req.getMainImgUrl());
            if (CollectionUtil.isNotEmpty(pms)) {
                pictures.addAll(getProductImages(pms, task, skc));
            }
            final var img = obtainPicture(task, SpotStylePictureTypeEnum.MAIN_IMAGE, req.getMainImgUrl());
            img.setSkcId(skc.getSkcId());
            pictures.add(img);
        } else {
            final var pms = req.getProductImages();
            if (CollectionUtil.isNotEmpty(pms)) {
                final var img = obtainPicture(task, SpotStylePictureTypeEnum.MAIN_IMAGE, pms.getFirst());
                img.setSkcId(skc.getSkcId());
                skc.setMainImgUrl(pms.getFirst());
                pictures.add(img);
                if (pms.size() > 1) {
                    pictures.addAll(getProductImages(pms.subList(1, pms.size() - 1), task, skc));
                }
            }
        }
    }

    private List<SpotStylePicture> getProductImages(final List<String> productImages,
                                                    final SpotStyleTask task, final SpotStyleSkc skc) {
        return productImages.stream().map(it -> {
            final var img = obtainStylePicture(it, task);
            img.setSkcId(skc.getSkcId());
            return img;
        }).toList();
    }

    private SpotStyleIngredient obtainIngredient(final SpotStyleIngredientAddReq req,
                                                 final SpotStyleTask task) {
        final var e = new SpotStyleIngredient();
        BasicConvert.copy(req, e);
        e.setTaskId(task.getTaskId());
        BasicConvert.entityInit(e, e::setIngredientId);
        return e;
    }

    public SpotStyleOpt obtainOpt(final SpotStyleOptTypeEnum type,
                                   final SpotStyleTask task, final String content) {
        final var opt = new SpotStyleOpt();
        opt.setTaskId(task.getTaskId());
        BasicConvert.entityInit(opt, opt::setOptId);
        opt.setOptType(type.getCode());
        opt.setContent(type.getVale());
        if (StrUtil.isNotBlank(content)) {
            opt.setContent(content);
        }
        return opt;
    }

    private SpotStylePicture obtainStylePicture(final String url, final SpotStyleTask task) {
        return obtainPicture(task, SpotStylePictureTypeEnum.PRODUCT_IMAGE, url);
    }

    private SpotStylePicture obtainPicture(final SpotStyleTask task,
                                           final SpotStylePictureTypeEnum type,
                                           final String url) {
        final var picture = new SpotStylePicture();
        BasicConvert.entityInit(picture, picture::setPictureId);
        picture.setTaskId(task.getTaskId());
        picture.setPictureType(type.getCode());
        picture.setPictureUrl(url);
        picture.setSkcId(0L);
        return picture;
    }

    private void validation(final SpotStyleTaskAddReq req) {
        validSkc(req.getSkcs());
        validIngredient(req.getIngredients());
        validSupplier(req.getSuppliers());
    }

    private void validSkc(final List<SpotStyleSkcAddReq> list) {
        final var skcGroup = BasicConvert.groupingBy(list, SpotStyleSkcAddReq::getColor);
        final var colors = new HashSet<String>();
        skcGroup.forEach((k, v) -> {
            if (v.size() > 1) {
                colors.add(k);
            }
        });
        if (CollectionUtil.isNotEmpty(colors)) {
            throw new ValidationException("SKC颜色不允许重复");
        }
    }

    private void validIngredient(final List<SpotStyleIngredientAddReq> list) {
        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        final var sum = list.stream()
                .map(SpotStyleIngredientAddReq::getIngredientRatio)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        if (sum.compareTo(new BigDecimal("100.00")) != 0) {
            throw new ValidationException("成分比例总和必须等于100");
        }
    }

    private void validSupplier(final List<SpotStyleSupplierAddReq> list) {
        if (CollectionUtil.isNotEmpty(list)) {
            supplier(list, SpotStyleSupplierAddReq::hasKey3, SpotStyleSupplierAddReq::key3, "供应商信息重复");
            supplier(list, SpotStyleSupplierAddReq::hasKey2, SpotStyleSupplierAddReq::key2, "该款号已存在SPU，请勿重复添加");
        }
    }

    private void supplier(final List<SpotStyleSupplierAddReq> suppliers,
                          final Predicate<SpotStyleSupplierAddReq> test,
                          final Function<SpotStyleSupplierAddReq, String> fn,
                          final String error) {
        final var map = BasicConvert.groupingBy(suppliers.stream().filter(test).toList(), fn);
        final var key = new HashSet<String>();
        map.forEach((k, v) -> {
            if (v.size() > 1) {
                key.add(k);
            }
        });
        if (CollectionUtil.isNotEmpty(key)) {
            throw new ValidationException(error);
        }
    }

    public static List<StyleSkcSku> convertSkuByQuery(List<BaseSkuResp> skuList, SpotStyleSkc skc) {
        return skuList.stream().map(t -> {
            final var sku = new StyleSkcSku();
            sku.setSkuId(IdHelper.getId());
            sku.setSkuCode(t.getBarcode());
            sku.setStyleId(skc.getTaskId());
            sku.setSkcId(skc.getSkcId());
            sku.setGroupName(t.getGroupName());
            sku.setSizeName(t.getSizeName());
            return sku;
        }).toList();
    }

    public static List<StyleSkcSku> convertSku(SpotStyleTask task, SpotStyleSkc skc) {
        final var groupCode = task.getSizeStandardCode();
        final var standardSize = dictClientExternal.listByDictCode(DictEnum.PLM_STANDARD_SIZE.getDictCode());
        final var sampleSize = standardSize.getChildren().stream().filter(it -> StrUtil.equalsIgnoreCase(groupCode, it.getDictCode()))
                .filter(it -> CollectionUtil.isNotEmpty(it.getChildren()))
                .flatMap(it -> it.getChildren().stream())
                .map(DictVo::getDictName).findFirst().orElse("");
        final var group = standardSize.getChildren().stream().filter(it -> StrUtil.equalsIgnoreCase(groupCode, it.getDictCode()))
                .filter(it -> CollectionUtil.isNotEmpty(it.getAttributes()))
                .flatMap(it -> it.getAttributes().stream())
                .filter(it -> StrUtil.equalsIgnoreCase("SKU_sign", it.getCode()))
                .map(AttributeVo::getName).findFirst().orElse("");
        final var plmCode = standardSize.getChildren().stream().filter(it -> StrUtil.equalsIgnoreCase(groupCode, it.getDictCode()))
                .filter(it -> CollectionUtil.isNotEmpty(it.getAttributes()))
                .flatMap(it -> it.getAttributes().stream())
                .filter(it -> StrUtil.equalsIgnoreCase("plm_code", it.getCode()))
                .map(AttributeVo::getName).findFirst().orElse("");
        final var plmValue = standardSize.getChildren().stream().filter(it -> StrUtil.equalsIgnoreCase(groupCode, it.getDictCode()))
                .filter(it -> CollectionUtil.isNotEmpty(it.getAttributes()))
                .flatMap(it -> it.getAttributes().stream())
                .filter(it -> StrUtil.equalsIgnoreCase("plm_value", it.getCode()))
                .map(AttributeVo::getName).findFirst().orElse("");
        final var sizeNameList = StrUtil.splitTrim(sampleSize, StrUtil.COMMA);
        return sizeNameList.stream().map(t -> {
            final var sku = new StyleSkcSku();
            sku.setSkuId(IdHelper.getId());
            sku.setSkuCode(skc.getSkcCode() + group + "-" + t);
            sku.setStyleId(skc.getTaskId());
            sku.setSkcId(skc.getSkcId());
            sku.setGroupName(plmValue);
            sku.setSizeName(t);
            sku.setPlmGroupCode(plmCode);
            sku.setTenantId(SsoContext.tenantId());
            return sku;
        }).toList();
    }


    public static SpotStyleSkcEditReq buildSpotSkcImageUpdate(SpotStyleSkc skc, List<String> allPictures) {
        SpotStyleSkcEditReq skcEditReq = new SpotStyleSkcEditReq();
        skcEditReq.setColor(skc.getColor());
        skcEditReq.setColorEnName(skc.getColorEnName());
        skcEditReq.setSizeStandardCode(skc.getSizeStandardCode());
        skcEditReq.setSizeStandardName(skc.getSizeStandardName());
        skcEditReq.setSkcId(skc.getSkcId());
        skcEditReq.setTaskId(skc.getTaskId());
        skcEditReq.setMainImgUrl(allPictures.getFirst());
        skcEditReq.setProductImages(allPictures);
        return skcEditReq;
    }
}
