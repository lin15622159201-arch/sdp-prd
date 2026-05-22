package tech.tiangong.sdp.service.impl;

import cn.hutool.core.collection.CollectionUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.common.req.AiTaskCallbackReq;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.convert.ImageUpdateTaskConvert;
import tech.tiangong.sdp.entity.*;
import tech.tiangong.sdp.enums.PrototypeMaterialTypeEnum;
import tech.tiangong.sdp.enums.ImageUpdateTaskResultEnum;
import tech.tiangong.sdp.enums.ImageUpdateTaskStatusEnum;
import tech.tiangong.sdp.repository.*;
import tech.tiangong.sdp.service.ImageUpdateTaskService;
import tech.tiangong.sdp.service.PrototypeService;
import tech.tiangong.sdp.service.SpotStyleTaskService;
import tech.tiangong.sdp.utils.SsoContext;
import tech.tiangong.sdp.vo.dto.DesignerDTO;
import tech.tiangong.sdp.vo.dto.ImageUpdatePictureDTO;
import tech.tiangong.sdp.vo.dto.ImageUpdateTaskDTO;
import tech.tiangong.sdp.vo.dto.ImageUpdateTaskGroupDTO;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.ImageUpdateTaskDetailResp;
import tech.tiangong.sdp.vo.resp.ImageUpdateTaskPageResp;

import javax.validation.ValidationException;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * 图片修复任务Service
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/4 15:31
 */
@Slf4j
@Service
@AllArgsConstructor
public class ImageUpdateTaskServiceImpl extends DefaultTaskServiceImpl implements ImageUpdateTaskService {
    private final ImageUpdateTaskRepository imageUpdateTaskRepository;
    private final ImageUpdatePictureRepository imageUpdatePictureRepository;
    private final ImageUpdateResultRepository imageUpdateResultRepository;
    private final DesignStyleRepository designStyleRepository;
    private final PrototypeRepository prototypeRepository;
    private final PrototypeMaterialRepository prototypeMaterialRepository;
    private final SpotStyleTaskRepository spotStyleTaskRepository;
    private final SpotStyleSkcRepository spotStyleSkcRepository;
    private final SpotStylePictureRepository spotStylePictureRepository;
    private final PrototypeService prototypeService;
    private final SpotStyleTaskService spotStyleTaskService;


    @Override
    public PageVo<ImageUpdateTaskPageResp> page(ImageUpdateTaskPageReq req) {
        final var query = ImageUpdateTaskConvert.buildWebPage(req);
        if (query.getEmpty()) {
            return new PageVo<>();
        }
        final var page = this.imageUpdateTaskRepository.webPage(query);
        final var records = page.getRecords();
        if (CollectionUtil.isEmpty(records)) {
            return new PageVo<>();
        }
        final var images = this.imageUpdatePictureRepository.listByTaskIds(
                records.stream().map(ImageUpdateTask::getTaskId).toList());
        final var resultImages = this.imageUpdateResultRepository.listByTaskIds(
                records.stream().map(ImageUpdateTask::getTaskId).toList());
        final Map<Long, List<ImageUpdatePicture>> imageMap = BasicConvert.groupingBy(images, ImageUpdatePicture::getTaskId);
        final Map<Long, List<ImageUpdateResult>> resultImageMap = BasicConvert.groupingBy(resultImages, ImageUpdateResult::getTaskId);
        List<DesignerDTO> designerList = selectByDesignerIds(records.stream().map(ImageUpdateTask::getDesignerId).toList());
        final Map<Long, List<DesignerDTO>> designerMap = BasicConvert.groupingBy(designerList, DesignerDTO::getDesignerId);
        return BasicConvert.page(page, it -> ImageUpdateTaskConvert.convertPage(it, imageMap, resultImageMap, designerMap));
    }

    @Override
    public List<ImageUpdateTaskGroupDTO> stateTotal(ImageUpdateTaskPageReq req) {
        return this.imageUpdateTaskRepository.groupTotal(ImageUpdateTaskConvert.buildWebPage(req));
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchCreate(List<ImageUpdateTaskAddReq> req) {
        if (CollectionUtil.isEmpty(req)) {
            return false;
        }
        List<ImageUpdateTask> tasks = req.stream()
                .map(ImageUpdateTaskConvert::buildAdd)
                .collect(Collectors.toList());
        List<ImageUpdatePicture> allPictures = tasks.stream()
                .flatMap(task -> task.getCurrentPictures().stream())
                .collect(Collectors.toList());
        imageUpdateTaskRepository.saveBatch(tasks);
        if (!allPictures.isEmpty()) {
            imageUpdatePictureRepository.saveBatch(allPictures);
        }
        //通知款式管理修改状态
        notifyStyleStatus(tasks, ImageUpdateTaskStatusEnum.PENDING.getCode());
        return true;
    }

    private void notifyStyleStatus(List<ImageUpdateTask> tasks, Integer status) {
        final var spotSpuSourceList = tasks.stream().filter(ImageUpdateTask::spotSpuSource).collect(Collectors.toList());
        final var designStyleSpuSourceList = tasks.stream().filter(ImageUpdateTask::designStyleSpuSource).collect(Collectors.toList());
        if (CollectionUtil.isNotEmpty(spotSpuSourceList)) {
            List<SpotStyleImageUpdateReq> spotStyleImageUpdateReqList = spotSpuSourceList.stream()
                    .map(t -> ImageUpdateTaskConvert.buildSpotUpdate(t, status))
                    .collect(Collectors.toList());
            if (!spotStyleImageUpdateReqList.isEmpty()) {
                spotStyleTaskService.batchImageUpdate(spotStyleImageUpdateReqList);
            }
        }
        if (CollectionUtil.isNotEmpty(designStyleSpuSourceList)) {
            List<DesignStyle> styleList = designStyleSpuSourceList.stream()
                    .map(t -> ImageUpdateTaskConvert.buildDesignStyleUpdate(t, status))
                    .collect(Collectors.toList());
            if (!styleList.isEmpty()) {
                designStyleRepository.updateBatchById(styleList);
            }
        }
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchUpload(List<ImageUpdateTaskUploadReq> req) {
        var taskIds = req.stream().map(ImageUpdateTaskUploadReq::getTaskId).collect(Collectors.toList());
        Map<Long, ImageUpdateTaskUploadReq> uploadMap = req.stream()
                .collect(Collectors.toMap(ImageUpdateTaskUploadReq::getTaskId, v -> v));
        List<ImageUpdateTask> tasks = imageUpdateTaskRepository.listByIds(taskIds);
        if (CollectionUtil.isEmpty(tasks)) {
            return false;
        }
        if (tasks.stream().anyMatch(t -> !t.allowUpload())) {
            throw new ValidationException("仅【待处理 / 待返修】状态可操作");
        }
        imageUpdateResultRepository.deleteByTaskIds(taskIds);
        List<ImageUpdateResult> allPicturesResult = new ArrayList<>();
        for (ImageUpdateTask task : tasks) {
            ImageUpdateTaskUploadReq r = uploadMap.get(task.getTaskId());
            if (r == null) {
                continue;
            }
            setRevised(task);
            task.setTaskStatus(ImageUpdateTaskStatusEnum.PENDING_REVIEW.getCode());
            r.getSkc().forEach(t -> {
                List<ImageUpdateResult> newResults = ImageUpdateTaskConvert.buildPictureResultSkcAdd(t, task);
                allPicturesResult.addAll(newResults);
            });
        }
        imageUpdateTaskRepository.updateBatchById(tasks);
        if (CollectionUtil.isNotEmpty(allPicturesResult)) {
            imageUpdateResultRepository.saveBatch(allPicturesResult);
        }
        //通知款式管理修改状态
        notifyStyleStatus(tasks, ImageUpdateTaskStatusEnum.PENDING_REVIEW.getCode());
        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchCheck(List<ImageUpdateTaskCheckReq> req) {
        req.forEach(ImageUpdateTaskCheckReq::validation);
        var taskIds = req.stream().map(ImageUpdateTaskCheckReq::getTaskId).collect(Collectors.toList());
        Map<Long, ImageUpdateTaskCheckReq> uploadMap = req.stream()
                .collect(Collectors.toMap(ImageUpdateTaskCheckReq::getTaskId, v -> v));
        List<ImageUpdateTask> tasks = imageUpdateTaskRepository.listByIds(taskIds);

        if (CollectionUtil.isEmpty(tasks)) {
            throw new ValidationException("任务不存在，请检查！");
        }
        if (tasks.stream().anyMatch(t -> !t.allowCheck())) {
            throw new ValidationException("仅【待审核】状态可操作");
        }
        List<ImageUpdateResult> allPicturesResult = new ArrayList<>();
        var pass = req.stream().anyMatch(t -> t.getResult().equals(ImageUpdateTaskResultEnum.PASS.getCode()));
        for (ImageUpdateTask task : tasks) {
            ImageUpdateTaskConvert.buildCheckResult(allPicturesResult, task, uploadMap);
        }
        if (pass) {
            imageUpdateResultRepository.deleteByTaskIds(taskIds);
            //更新图片信息
            updateStylePicture(tasks, uploadMap);
        }
        if (CollectionUtil.isNotEmpty(allPicturesResult)) {
            imageUpdateResultRepository.saveBatch(allPicturesResult);
        }
        //通知款式管理修改状态
        notifyStyleStatus(tasks, tasks.getFirst().getTaskStatus());
        imageUpdateTaskRepository.updateBatchById(tasks);
        return true;
    }

    private void updateStylePicture(List<ImageUpdateTask> tasks, Map<Long, ImageUpdateTaskCheckReq> uploadMap) {
        tasks.forEach(t -> {
            ImageUpdateTaskCheckReq req = uploadMap.get(t.getTaskId());
            //将这个替换掉之前的
            var skcIds = req.getSkcList().stream().map(ImageUpdateTaskUploadReq.Skc::getSkcId).collect(Collectors.toList());
            //现货来源更新图片信息
            if (t.spotSpuSource()) {
                checkSpotResult(t, skcIds, req);
            } else {
                prototypeService.updateMaterialByImageTask(t.getSpuCode(), skcIds, t.getTaskType(), req);
            }
        });
    }

    private void checkSpotResult(ImageUpdateTask t, List<Long> skcIds, ImageUpdateTaskCheckReq req) {
        final var spotPictures = spotStylePictureRepository.listByTaskIds(List.of(t.getSpuId()));
        final var spotSkcList = spotStyleSkcRepository.listByIds(skcIds);
        Map<Long, ImageUpdateTaskUploadReq.Skc> reqSkcMap = req.getSkcList().stream().collect(Collectors.toMap(ImageUpdateTaskUploadReq.Skc::getSkcId, v -> v));
        for (SpotStyleSkc skc : spotSkcList) {
            if (reqSkcMap.containsKey(skc.getSkcId())) {
                SpotStyleSkcEditReq skcEditReq = new SpotStyleSkcEditReq();
                skcEditReq.setColor(skc.getColor());
                skcEditReq.setColorEnName(skc.getColorEnName());
                skcEditReq.setSizeStandardCode(skc.getSizeStandardCode());
                skcEditReq.setSizeStandardName(skc.getSizeStandardName());
                skcEditReq.setSkcId(skc.getSkcId());
                skcEditReq.setTaskId(skc.getTaskId());
                Boolean isAdd = false;
                final var pictures = reqSkcMap.get(skc.getSkcId()).getPictures();
                final var currentPictures = reqSkcMap.get(skc.getSkcId()).getCurrentPictures();
                final var skcPictures = spotPictures.stream().filter(p -> p.getSkcId().equals(skc.getSkcId())).toList();
                List<String> updatePictures = new ArrayList<>();
                for (SpotStylePicture picture : skcPictures) {
                    if (currentPictures.contains(picture.getPictureUrl())) {
                        if (isAdd) {
                            continue;
                        }
                        updatePictures.addAll(pictures);
                        isAdd = true;
                    } else {
                        updatePictures.add(picture.getPictureUrl());
                    }
                }
                skcEditReq.setMainImgUrl(updatePictures.getFirst());
                skcEditReq.setProductImages(updatePictures);
                spotStyleTaskService.editSkc(skcEditReq);
                //现货-更新商品标签
                spotStyleTaskService.updateProductTag(skc.getTaskId(),skcPictures,updatePictures);
            }
        }
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean resubmit(List<Long> taskIds) {
        List<ImageUpdateTask> tasks = imageUpdateTaskRepository.listByIds(taskIds);
        if (CollectionUtil.isEmpty(tasks)) {
            throw new ValidationException("任务不存在，请检查！");
        }
        if (tasks.stream().anyMatch(t -> !t.allowResubmit())) {
            throw new ValidationException("仅【待返修】状态可操作");
        }
        List<ImageUpdateTask> updateList = tasks.stream()
                .peek(t -> t.setTaskStatus(ImageUpdateTaskStatusEnum.PENDING_REVIEW.getCode()))
                .toList();
        imageUpdateTaskRepository.updateBatchById(updateList);
        return true;
    }


    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean cancel(List<Long> taskIds) {
        List<ImageUpdateTask> tasks = imageUpdateTaskRepository.listByIds(taskIds);
        if (CollectionUtil.isEmpty(tasks)) {
            throw new ValidationException("任务不存在，请检查！");
        }
        if (tasks.stream().anyMatch(t -> !t.allowCancel())) {
            throw new ValidationException("仅任务状态等于待处理/待审核/待返修 可操作");
        }
        if (tasks.stream().anyMatch(t -> !t.currentUserOpt())) {
            throw new ValidationException("仅创建人是自己时候才可操作可操作");
        }
        List<ImageUpdateTask> updateList = tasks.stream()
                .peek(t -> {
                    t.setTaskStatus(ImageUpdateTaskStatusEnum.CANCELED.getCode());
                    setRevised(t);
                })
                .toList();
        imageUpdateTaskRepository.updateBatchById(updateList);
        //通知款式管理修改状态
        notifyStyleStatus(tasks, ImageUpdateTaskStatusEnum.CANCELED.getCode());
        return true;
    }


    @Override
    public ImageUpdateTaskDetailResp detail(Long taskId) {
        var task = imageUpdateTaskRepository.obtainById(taskId, "任务不存在！");
        final var detail = BasicConvert.copy(task, ImageUpdateTaskDetailResp.class);
        var pictureList = imageUpdatePictureRepository.listByTaskIds(List.of(taskId));
        var pictureResultList = imageUpdateResultRepository.listByTaskIds(List.of(taskId));
        detail.setSkcList(ImageUpdateTaskConvert.buildPictureDetail(pictureList, pictureResultList, setOriginPicture(task)));
        return detail;
    }

    private List<ImageUpdatePictureDTO> setOriginPicture(ImageUpdateTask task) {
        if (task.spotSpuSource() && !task.getTaskType().equals(PrototypeMaterialTypeEnum.VIDEO.getCode())) {
            var materialList = spotStylePictureRepository.listByTaskIds(List.of(task.getSpuId())).stream().filter(SpotStylePicture::skcImage).collect(Collectors.toList());
            final Map<Long, List<SpotStylePicture>> resultImageMap = BasicConvert.groupingBy(materialList, SpotStylePicture::getTaskId);
            if (resultImageMap.containsKey(task.getSpuId())) {
                return ImageUpdateTaskConvert.buildSpotOriginalPicture(resultImageMap.get(task.getSpuId()));
            }
        } else if (task.designStyleSpuSource()) {
            var materialList = prototypeMaterialRepository.listByStyleCodesAndType(List.of(task.getSpuCode()), task.getTaskType());
            final Map<String, List<PrototypeMaterial>> resultImageMap = BasicConvert.groupingBy(materialList, PrototypeMaterial::getStyleCode);
            if (resultImageMap.containsKey(task.getSpuCode())) {
                return ImageUpdateTaskConvert.buildPicture(resultImageMap.get(task.getSpuCode()));
            }
        }
        return new ArrayList<>();
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean edit(List<ImageUpdateTaskEditReq> req) {
        var taskIds = req.stream().map(ImageUpdateTaskEditReq::getTaskId).collect(Collectors.toList());
        Map<Long, ImageUpdateTaskEditReq> editMap = req.stream()
                .collect(Collectors.toMap(ImageUpdateTaskEditReq::getTaskId, v -> v));
        List<ImageUpdateTask> tasks = imageUpdateTaskRepository.listByIds(taskIds);
        if (CollectionUtil.isEmpty(tasks)) {
            return false;
        }
        if (tasks.stream().anyMatch(t -> !t.getTaskStatus().equals(ImageUpdateTaskStatusEnum.PENDING.getCode()))) {
            throw new ValidationException("仅任务状态等于待处理可操作");
        }
        imageUpdatePictureRepository.deleteByTaskIds(taskIds);
        List<ImageUpdatePicture> allPictures = new ArrayList<>();
        for (ImageUpdateTask task : tasks) {
            ImageUpdateTaskEditReq r = editMap.get(task.getTaskId());
            if (r == null) {
                continue;
            }
            setRevised(task);
            task.setRepairDescribe(r.getRepairDescribe());
            task.setRepairAttachment(r.getRepairAttachment());
            r.getSkc().forEach(t -> {
                List<ImageUpdatePicture> pictures = IntStream.range(0, t.getPictures().size()).mapToObj(i -> ImageUpdateTaskConvert.buildPictureAdd(t.getPictures().get(i), t, task, i + 1)).collect(Collectors.toList());
                allPictures.addAll(pictures);
            });
        }
        if (!allPictures.isEmpty()) {
            imageUpdatePictureRepository.saveBatch(allPictures, 1000);
        }
        return imageUpdateTaskRepository.updateBatchById(tasks);
    }

    private void setRevised(ImageUpdateTask task) {
        task.setRevisedTime(LocalDateTime.now());
        task.setReviserId(SsoContext.userId());
        task.setReviserName(SsoContext.username());
    }

    @Override
    public List<ImageUpdateTaskDTO> selectBySpu(ImageUpdateQueryReq req) {
        List<ImageUpdateTaskDTO> resp = new ArrayList<>();
        final var iamgeUpdateList = imageUpdateTaskRepository.selectBySpuCodesAndType(req.getSpuCodes(), req.getTaskType());
        //款式管理
        fillDesignSpu(req, resp,iamgeUpdateList);
        //现货管理
        fillSpotStyle(req, resp,iamgeUpdateList);
        return resp;
    }

    @Override
    public void refreshSkcPicture(List<String> styleCodes) {
        final var tasks = imageUpdateTaskRepository.selectBySpuCodes(styleCodes);
        if (CollectionUtil.isNotEmpty(tasks)) {
            final var taskIds = tasks.stream().map(ImageUpdateTask::getTaskId).toList();
            final var spotList = tasks.stream().filter(t -> t.spotSpuSource()).toList();
            final var designList = tasks.stream().filter(t -> !t.spotSpuSource()).toList();
            final var pictures = imageUpdatePictureRepository.listByTaskIds(taskIds);
            final var resultList = imageUpdateResultRepository.listByTaskIds(taskIds);
            final var spuIds = tasks.stream().map(ImageUpdateTask::getSpuId).toList();
            Map<Long, List<ImageUpdateTask>> imageTaskMap = tasks.stream().collect(Collectors.groupingBy(ImageUpdateTask::getTaskId));
            List<ImageUpdatePicture> updatePictureList = new ArrayList<>();
            List<ImageUpdateResult> updateResultList = new ArrayList<>();
            if (CollectionUtil.isNotEmpty(spotList)) {
                dealSpotData(spuIds, pictures, imageTaskMap, resultList, updatePictureList, updateResultList);
            }
            if (CollectionUtil.isNotEmpty(designList)) {
                dealStyleData(spuIds, pictures, imageTaskMap, resultList, updatePictureList, updateResultList);
            }
            if (CollectionUtil.isNotEmpty(updatePictureList)) {
                imageUpdatePictureRepository.updateBatchById(updatePictureList);
            }
            if (CollectionUtil.isNotEmpty(updateResultList)) {
                imageUpdateResultRepository.updateBatchById(updateResultList);
            }
        }

    }

    private void dealStyleData(List<Long> spuIds, List<ImageUpdatePicture> pictures, Map<Long, List<ImageUpdateTask>> imageTaskMap, List<ImageUpdateResult> resultList, List<ImageUpdatePicture> updatePictureList, List<ImageUpdateResult> updateResultList) {
        final var skcList = prototypeRepository.listByDesignStyleIds(spuIds);
        Map<Long, List<Prototype>> skcMap = skcList.stream().collect(Collectors.groupingBy(Prototype::getDesignStyleId));
        Map<Long, List<ImageUpdatePicture>> imageUpdatePictureMap = pictures.stream().collect(Collectors.groupingBy(ImageUpdatePicture::getTaskId));
        Map<Long, List<ImageUpdateResult>> imageUpdateResultMap = resultList.stream().collect(Collectors.groupingBy(ImageUpdateResult::getTaskId));
        imageUpdatePictureMap.forEach((taskId, pictureList) -> {
            final var spuId = imageTaskMap.get(taskId).getFirst().getSpuId();
            final var skcs = skcMap.get(spuId);
            pictureList.forEach(picture -> {
                if (CollectionUtil.isNotEmpty(skcs)) {
                    picture.setSpuId(skcs.getFirst().getDesignStyleId());
                    picture.setSkcId(skcs.getFirst().getPrototypeId());
                    picture.setSkcCode(skcList.getFirst().getDesignCode());
                }
            });
            updatePictureList.addAll(pictureList);
        });
        imageUpdateResultMap.forEach((taskId, results) -> {
            final var spuId = imageTaskMap.get(taskId).getFirst().getSpuId();
            final var skcs = skcMap.get(spuId);
            results.forEach(picture -> {
                if (CollectionUtil.isNotEmpty(skcs)) {
                    picture.setSpuId(skcs.getFirst().getDesignStyleId());
                    picture.setSkcId(skcs.getFirst().getPrototypeId());
                }
            });
            updateResultList.addAll(results);
        });
    }

    private void dealSpotData(List<Long> spuIds, List<ImageUpdatePicture> pictures, Map<Long, List<ImageUpdateTask>> imageTaskMap, List<ImageUpdateResult> resultList, List<ImageUpdatePicture> updatePictureList, List<ImageUpdateResult> updateResultList) {
        final var spuList = spotStyleSkcRepository.listByTaskIds(spuIds);
        Map<Long, List<SpotStyleSkc>> skcMap = spuList.stream().collect(Collectors.groupingBy(SpotStyleSkc::getTaskId));
        Map<Long, List<ImageUpdatePicture>> imageUpdatePictureMap = pictures.stream().collect(Collectors.groupingBy(ImageUpdatePicture::getTaskId));
        Map<Long, List<ImageUpdateResult>> imageUpdateResultMap = resultList.stream().collect(Collectors.groupingBy(ImageUpdateResult::getTaskId));
        imageUpdatePictureMap.forEach((taskId, pictureList) -> {
            final var spuId = imageTaskMap.get(taskId).getFirst().getSpuId();
            final var skcList = skcMap.get(spuId);
            pictureList.forEach(picture -> {
                if (CollectionUtil.isNotEmpty(skcList)) {
                    picture.setSpuId(skcList.getFirst().getTaskId());
                    picture.setSkcId(skcList.getFirst().getSkcId());
                    picture.setSkcCode(skcList.getFirst().getSkcCode());
                }
            });
            updatePictureList.addAll(pictureList);
        });
        imageUpdateResultMap.forEach((taskId, results) -> {
            final var spuId = imageTaskMap.get(taskId).getFirst().getSpuId();
            final var skcList = skcMap.get(spuId);
            results.forEach(picture -> {
                if (CollectionUtil.isNotEmpty(skcList)) {
                    picture.setSpuId(skcList.getFirst().getTaskId());
                    picture.setSkcId(skcList.getFirst().getSkcId());
                }
            });
            updateResultList.addAll(results);
        });
    }

    private void fillSpotStyle(ImageUpdateQueryReq req, List<ImageUpdateTaskDTO> resp,List<ImageUpdateTask> iamgeUpdateList) {
        final var spuCodes = req.getSpuCodes();
        //现货没有视频
        if (CollectionUtil.isEmpty(spuCodes)) {
            return;
        }
        final var processingList = iamgeUpdateList.stream().filter(ImageUpdateTask::doing).toList();

        //查看是否有在进行中的
        final var tasks = this.spotStyleTaskRepository.listByTaskCodes(spuCodes);
        if (CollectionUtil.isNotEmpty(tasks)) {
            var taskIds = tasks.stream().map(SpotStyleTask::getTaskId).toList();
            final var skcList = spotStyleSkcRepository.listByTaskIds(taskIds);
            var materialList = spotStylePictureRepository.listByTaskIds(taskIds).stream().filter(SpotStylePicture::skcImage).collect(Collectors.toList());
            final Map<Long, List<SpotStylePicture>> spuImageMap = BasicConvert.groupingBy(materialList, SpotStylePicture::getTaskId);
            List<DesignerDTO> designerList = selectByDesignerIds(tasks.stream().map(SpotStyleTask::getCreatorId).toList());
            final Map<Long, List<DesignerDTO>> designerMap = BasicConvert.groupingBy(designerList, DesignerDTO::getDesignerId);
            final Map<Long, List<SpotStyleSkc>> spuMap = BasicConvert.groupingBy(skcList, SpotStyleSkc::getTaskId);
            final var respList = tasks.stream()
                    .map(task -> ImageUpdateTaskConvert.buildSpotDetail(task, spuMap, spuImageMap, designerMap, req,processingList)).toList();
            resp.addAll(respList);
        }
    }


    private void fillImageTaskSpu(ImageUpdateQueryReq req, List<ImageUpdateTaskDTO> resp) {
        final var spuCodes = req.getSpuCodes();
        //查看是否有在进行中的
        final var iamgeUpdateList = imageUpdateTaskRepository.selectBySpuCodesAndType(spuCodes, req.getTaskType());
        if (CollectionUtil.isNotEmpty(iamgeUpdateList)) {
            final var processingList = iamgeUpdateList.stream().filter(ImageUpdateTask::doing).toList();
            if (CollectionUtil.isNotEmpty(processingList)) {
                final var creatorIds = processingList.stream().map(ImageUpdateTask::getDesignerId).toList();
                List<DesignerDTO> designerList = selectByDesignerIds(creatorIds);
                final Map<Long, List<DesignerDTO>> designerMap = BasicConvert.groupingBy(designerList, DesignerDTO::getDesignerId);
                final var notCompleteCodes = processingList.stream().map(ImageUpdateTask::getSpuCode).toList();
                var taskIds = processingList.stream().map(ImageUpdateTask::getTaskId).toList();
                var materialList = imageUpdatePictureRepository.listByTaskIds(taskIds);
                final Map<Long, List<ImageUpdatePicture>> resultImageMap = BasicConvert.groupingBy(materialList, ImageUpdatePicture::getTaskId);
                final var respList = processingList.stream().filter(t -> CollectionUtil.isNotEmpty(resultImageMap.get(t.getTaskId())))
                        .map(task -> ImageUpdateTaskConvert.buildImageTaskDetail(task, resultImageMap, designerMap)).toList();
                resp.addAll(respList);
                spuCodes.removeAll(notCompleteCodes);
            }
        }
    }


    private void fillDesignSpu(ImageUpdateQueryReq req, List<ImageUpdateTaskDTO> resp,List<ImageUpdateTask> iamgeUpdateList) {
        if (CollectionUtil.isEmpty(req.getSpuCodes())) {
            return;
        }
        final var processingList = iamgeUpdateList.stream().filter(ImageUpdateTask::doing).toList();
        final var spuList = designStyleRepository.listByStyleCodes(req.getSpuCodes());
        if (CollectionUtil.isNotEmpty(spuList)) {
            var spuCodes = spuList.stream().map(DesignStyle::getStyleCode).toList();
            final var spuIds = spuList.stream().map(DesignStyle::getDesignStyleId).toList();
            final var skcList = prototypeRepository.listByDesignStyleIds(spuIds);
            var materialList = prototypeMaterialRepository.listByStyleCodesAndType(spuCodes, req.getTaskType());
            final var spuMap = BasicConvert.groupingBy(skcList, Prototype::getDesignStyleId);
            final Map<Long, List<PrototypeMaterial>> skcMaterialMap = BasicConvert.groupingBy(materialList, PrototypeMaterial::getPrototypeId);
            List<DesignerDTO> designerList = selectByDesignerIds(spuList.stream().map(DesignStyle::getCreatorId).toList());
            final Map<Long, List<DesignerDTO>> designerMap = BasicConvert.groupingBy(designerList, DesignerDTO::getDesignerId);
            final var spuRespList = spuList.stream()
                    .map(spu -> ImageUpdateTaskConvert.buildSpuDetail(spu, spuMap, skcMaterialMap, designerMap,processingList)).toList();
            resp.addAll(spuRespList);
        }
    }

    @Override
    public void job() {

    }

    @Override
    public void callback(AiTaskCallbackReq req) {

    }
}
