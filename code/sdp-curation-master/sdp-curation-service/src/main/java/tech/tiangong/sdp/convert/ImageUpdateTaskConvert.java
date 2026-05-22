package tech.tiangong.sdp.convert;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import lombok.experimental.UtilityClass;
import org.springframework.beans.BeanUtils;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.sequence.id.IdHelper;
import tech.tiangong.sdp.entity.*;
import tech.tiangong.sdp.enums.*;
import tech.tiangong.sdp.external.SdpMaterialDesignerApi;
import tech.tiangong.sdp.utils.SsoContext;
import tech.tiangong.sdp.vo.dto.DesignerDTO;
import tech.tiangong.sdp.vo.dto.ImageUpdatePictureDTO;
import tech.tiangong.sdp.vo.dto.ImageUpdateTaskDTO;
import tech.tiangong.sdp.vo.query.ImageUpdateTaskQuery;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.ImageUpdatePictureResp;
import tech.tiangong.sdp.vo.resp.ImageUpdateResultResp;
import tech.tiangong.sdp.vo.resp.ImageUpdateTaskDetailResp;
import tech.tiangong.sdp.vo.resp.ImageUpdateTaskPageResp;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * ImageUpdateTaskConvert
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/4 16:08
 */
@UtilityClass
public class ImageUpdateTaskConvert {


    public static ImageUpdateTaskQuery buildWebPage(ImageUpdateTaskPageReq req) {
        final var query = BasicConvert.copy(req, ImageUpdateTaskQuery.class);
        query.setTenantId(SsoContext.tenantId());
        if (StrUtil.isNotBlank(req.getSpuCode())) {
            query.setSpuCodes(StrUtil.split(req.getSpuCode().replaceAll(" ", StrUtil.COMMA), StrUtil.COMMA));
        }
        if (StrUtil.isNotBlank(req.getTaskCode())) {
            query.setTaskCode(null);
            query.setTaskCodes(StrUtil.split(req.getTaskCode().replaceAll(" ", StrUtil.COMMA), StrUtil.COMMA));
        }
        queryDesigner(query);
        return query;
    }

    private void queryDesigner(ImageUpdateTaskQuery queryDTO) {

        final var creatorIds = new HashSet<Long>();
        queryDTO.setCreatorIds(creatorIds);
        if (Objects.equals(Bool.YES, queryDTO.getSameGroup())) {
            final var ids = SdpMaterialDesignerApi.listDesignerIds();
            if (CollectionUtil.isNotEmpty(ids)) {
                creatorIds.addAll(ids);
                // 同组不包含为空
                if ((Objects.nonNull(queryDTO.getCreatorId()))) {
                    queryDTO.setEmpty(!ids.contains(queryDTO.getCreatorId()));
                }
            } else {
                queryDTO.setEmpty(Boolean.TRUE);
            }
        }
        // 同组包含优先创建人
        if (Objects.nonNull(queryDTO.getCreatorId()) && !queryDTO.getEmpty()) {
            queryDTO.setCreatorIds(Set.of(queryDTO.getCreatorId()));
        }
    }

    private void setDesignerIds(HashSet<Long> designerIds, List<Long> ids, ImageUpdateTaskQuery queryDTO) {
        if (CollectionUtil.isNotEmpty(ids)) {
            designerIds.addAll(ids);
            // 同组不包含为空
            if (null != queryDTO.getCreatorId()) {
                boolean notInSameGroup = !new HashSet<>(ids).containsAll(Set.of(queryDTO.getCreatorId()));
                queryDTO.setEmpty(notInSameGroup);
            }
        } else {
            queryDTO.setEmpty(Boolean.TRUE);
        }
    }

    public static ImageUpdateTaskPageResp convertPage(ImageUpdateTask task, Map<Long, List<ImageUpdatePicture>> imageMap, Map<Long, List<ImageUpdateResult>> resultImageMap, Map<Long, List<DesignerDTO>> designerMap) {
        final var resp = BasicConvert.copy(task, ImageUpdateTaskPageResp.class);
        final var images = imageMap.get(task.getTaskId());
        final var resultImage = resultImageMap.get(task.getTaskId());
        List<ImageUpdateTaskPageResp.Skc> skcList = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(images)) {
            final Map<Long, List<ImageUpdatePicture>> skcImageMap = BasicConvert.groupingBy(images, ImageUpdatePicture::getSkcId);
            final Map<Long, List<ImageUpdateResult>> skcResultImageMap = BasicConvert.groupingBy(resultImage, ImageUpdateResult::getSkcId);
            skcImageMap.forEach((skcId, pictures) -> {
                ImageUpdateTaskPageResp.Skc skc = new ImageUpdateTaskPageResp.Skc();
                skc.setSkcId(skcId);
                if (!skcImageMap.isEmpty() && skcImageMap.containsKey(skcId)) {
                    final var skcPictures = skcImageMap.get(skcId);
                    skc.setPictures(skcPictures.stream().map(ImageUpdateTaskConvert::obtainPictureResp).toList());
                }
                if (!skcResultImageMap.isEmpty() && skcResultImageMap.containsKey(skcId)) {
                    final var skcResultPictures = skcResultImageMap.get(skcId);
                    List<String> urls = skcResultPictures.stream().map(ImageUpdateResult::getPictureUrl).filter(Objects::nonNull).collect(Collectors.toList());
                    skc.setResultPictures(urls);
                }
                skcList.add(skc);
            });
            resp.setSkcList(skcList);
        }
        if (CollectionUtil.isNotEmpty(designerMap) && designerMap.containsKey(task.getCreatorId())) {
            List<DesignerDTO> designerDTOList = designerMap.get(task.getCreatorId());
            resp.setDesignerId(designerDTOList.get(0).getDesignerId());
            resp.setDesignerName(designerDTOList.get(0).getDesignerName());
            resp.setDesignerGroupCode(designerDTOList.get(0).getDesignerGroupCode());
            resp.setDesignerGroupName(designerDTOList.get(0).getDesignerGroupName());
        }
        return resp;
    }

    private ImageUpdatePictureResp obtainPictureResp(final ImageUpdatePicture picture) {
        final var img = new ImageUpdatePictureResp();
        img.setPictureId(picture.getPictureId());
        img.setSpuId(picture.getSpuId());
        img.setSkcId(picture.getSkcId());
        img.setPictureUrl(picture.getPictureUrl());
        img.setPictureDescribe(picture.getPictureDescribe());
        img.setAttachment(picture.getAttachment());
        return img;
    }

    public static ImageUpdateTask buildAdd(ImageUpdateTaskAddReq req) {
        final var task = BasicConvert.copy(req, ImageUpdateTask.class);
        BasicConvert.taskInit(task, CodeRuleEnum.IMAGE_UPDATE);
        List<ImageUpdatePicture> allPicture = new ArrayList<>();
        req.getSkc().forEach(t -> {
            List<ImageUpdatePicture> pictures = IntStream.range(0, t.getPictures().size()).mapToObj(i -> buildPictureAdd(t.getPictures().get(i), t, task, i + 1)).toList();
            allPicture.addAll(pictures);
        });
        task.setCurrentPictures(allPicture);
        return task;
    }

    public static ImageUpdatePicture buildPictureAdd(ImageUpdatePictureAddReq req, ImageUpdateTaskAddReq.Skc skc, ImageUpdateTask task, int serialNum) {
        final var pic = BasicConvert.copy(req, ImageUpdatePicture.class);
        pic.setSpuId(task.getSpuId());
        pic.setSkcId(skc.getSkcId());
        pic.setSkcCode(skc.getSkcCode());
        pic.setPictureId(IdHelper.getId());
        pic.setTaskId(task.getTaskId());
        pic.setSerialNum(serialNum);
        pic.setTenantId(SsoContext.tenantId());
        return pic;
    }

    public static List<ImageUpdateResult> buildPictureResultSkcAdd(ImageUpdateTaskUploadReq.Skc skc, ImageUpdateTask task) {
        return skc.getPictures().stream().map(s -> ImageUpdateTaskConvert.buildPictureResultAdd(s, skc,task)).toList();
    }

    public static ImageUpdateResult buildPictureResultAdd(String url, ImageUpdateTaskUploadReq.Skc skc,ImageUpdateTask task) {
        ImageUpdateResult result = new ImageUpdateResult();
        result.setResultId(IdHelper.getId());
        result.setTaskId(task.getTaskId());
        result.setSpuId(task.getSpuId());
        result.setSkcId(skc.getSkcId());
        result.setPictureUrl(url);
        result.setTenantId(SsoContext.tenantId());
        return result;
    }

    public static List<ImageUpdateTaskDetailResp.Skc> buildPictureDetail(List<ImageUpdatePicture> pictureList, List<ImageUpdateResult> pictureResultList, List<ImageUpdatePictureDTO> originPictures) {
        if (CollectionUtil.isEmpty(pictureList)) {
            return Collections.emptyList();
        }
        Map<Long, List<ImageUpdatePicture>> skcImageMap = BasicConvert.groupingBy(pictureList, ImageUpdatePicture::getSkcId);
        Map<Long, List<ImageUpdateResult>> resultImageMap = BasicConvert.groupingBy(pictureResultList, ImageUpdateResult::getSkcId);
        Map<Long, List<ImageUpdatePictureDTO>> originImageMap = BasicConvert.groupingBy(originPictures, ImageUpdatePictureDTO::getSkcId);

        List<ImageUpdateTaskDetailResp.Skc> skcList = new ArrayList<>();
        originImageMap.forEach((skcId, pictures) -> {
            ImageUpdateTaskDetailResp.Skc skc = new ImageUpdateTaskDetailResp.Skc();
            skc.setSkcId(skcId);
            if (skcImageMap.containsKey(skcId)){
                List<ImageUpdatePictureResp> pictureDTOs = skcImageMap.get(skcId).stream().map(picture -> {
                    ImageUpdatePictureResp dto = new ImageUpdatePictureResp();
                    BeanUtils.copyProperties(picture, dto);
                    return dto;
                }).toList();
                skc.setCurrentPictures(pictureDTOs);
            }
            if (!resultImageMap.isEmpty() && resultImageMap.containsKey(skcId)) {
                final var resultPic = resultImageMap.get(skcId);
                skc.setUpdatePictures(ImageUpdateTaskConvert.buildPictureResultDetail(resultPic));
            }
            if (!originImageMap.isEmpty()) {
                skc.setPictures(pictures);
            }
            skcList.add(skc);
        });
        return skcList;
    }

    public static List<ImageUpdateResultResp> buildPictureResultDetail(List<ImageUpdateResult> pictureResultList) {
        return pictureResultList.stream().map(p -> BasicConvert.copy(p, ImageUpdateResultResp.class)).collect(Collectors.toList());
    }

    public static List<ImageUpdatePictureDTO> buildSpotOriginalPicture(List<SpotStylePicture> list) {
        if (CollectionUtil.isEmpty(list)) {
            return Collections.emptyList();
        }
        return list.stream().map(p -> {
            ImageUpdatePictureDTO dto = new ImageUpdatePictureDTO();
            dto.setSpuId(p.getTaskId());
            dto.setSkcId(p.getSkcId());
            dto.setPictureUrl(p.getPictureUrl());
            return dto;
        }).collect(Collectors.toList());
    }


    public static List<ImageUpdatePictureDTO> buildPicture(List<PrototypeMaterial> list) {
        if (CollectionUtil.isEmpty(list)) {
            return Collections.emptyList();
        }
        return list.stream().map(p -> {
            ImageUpdatePictureDTO dto = new ImageUpdatePictureDTO();
            dto.setSpuId(p.getDesignStyleId());
            dto.setSkcId(p.getPrototypeId());
            dto.setPictureUrl(p.getMaterialUrl());
            return dto;
        }).collect(Collectors.toList());
    }

    public static List<ImageUpdatePictureDTO> imageTaskSpuBuildPicture(List<ImageUpdatePicture> list) {
        return list.stream().map(p -> BeanUtil.copyProperties(p, ImageUpdatePictureDTO.class)).collect(Collectors.toList());
    }

    public static List<ImageUpdateTaskDTO.Skc> spotSpuBuildPicture(List<SpotStyleSkc> skcList, List<SpotStylePicture> list, ImageUpdateQueryReq req) {
        if (CollectionUtil.isEmpty(list)) {
            return Collections.emptyList();
        }
        if (null != req && req.getTaskType().equals(PrototypeMaterialTypeEnum.VIDEO.getCode())) {
            return Collections.emptyList();
        }
        final Map<Long, List<SpotStylePicture>> skcImageMap = BasicConvert.groupingBy(list, SpotStylePicture::getSkcId);
        return skcList.stream().map(p -> {
            ImageUpdateTaskDTO.Skc skc = new ImageUpdateTaskDTO.Skc();
            skc.setSkcId(p.getSkcId());
            skc.setSkcCode(p.getSkcCode());
            if (skcImageMap.containsKey(p.getSkcId())) {
                final var skcPics = skcImageMap.get(p.getSkcId());
                skc.setPictures(buildSpotSkcPicture(skcPics));
            }
            return skc;
        }).collect(Collectors.toList());
    }

    private static List<ImageUpdatePictureDTO> buildSpotSkcPicture(List<SpotStylePicture> skcPics) {
        return skcPics.stream().map(p -> {
            ImageUpdatePictureDTO dto = new ImageUpdatePictureDTO();
            dto.setSpuId(p.getTaskId());
            dto.setSkcId(p.getSkcId());
            dto.setPictureUrl(p.getPictureUrl());
            return dto;
        }).collect(Collectors.toList());
    }


    private static List<ImageUpdateTaskDTO.Skc> buildSkc(List<Prototype> skcList, Map<Long, List<PrototypeMaterial>> skcMaterialMap) {
        if (CollectionUtil.isEmpty(skcList)) {
            return Collections.emptyList();
        }
        return skcList.stream().map(s -> {
            ImageUpdateTaskDTO.Skc skc = new ImageUpdateTaskDTO.Skc();
            skc.setSkcId(s.getPrototypeId());
            skc.setSkcCode(s.getDesignCode());
            if (skcMaterialMap.containsKey(s.getPrototypeId())) {
                final var resultImageMap = skcMaterialMap.get(s.getPrototypeId());
                skc.setPictures(buildPicture(resultImageMap));
            }
            return skc;
        }).collect(Collectors.toList());
    }


    public static SpotStyleImageUpdateReq buildSpotUpdate(ImageUpdateTask t, Integer status) {
        SpotStyleImageUpdateReq spotStyleImageUpdateReq = new SpotStyleImageUpdateReq();
        spotStyleImageUpdateReq.setTaskId(t.getSpuId());
        spotStyleImageUpdateReq.setImageUpdateId(t.getTaskId());
        spotStyleImageUpdateReq.setImageUpdateCode(t.getTaskCode());
        spotStyleImageUpdateReq.setImageUpdateStatus(status);
        return spotStyleImageUpdateReq;
    }

    public static DesignStyle buildDesignStyleUpdate(ImageUpdateTask t, Integer status) {
        DesignStyle designStyle = new DesignStyle();
        designStyle.setDesignStyleId(t.getSpuId());
        designStyle.setImageUpdateTaskCode(t.getTaskCode());
        designStyle.setImageUpdateTaskId(t.getTaskId());
        designStyle.setImageUpdateStatus(status);
        return designStyle;
    }

    public static void buildCheckResult(List<ImageUpdateResult> allPicturesResult, ImageUpdateTask task, Map<Long, ImageUpdateTaskCheckReq> uploadMap) {
        ImageUpdateTaskCheckReq r = uploadMap.get(task.getTaskId());
        if (r.getResult().equals(ImageUpdateTaskResultEnum.NOT_PASS.getCode())) {
            task.setTaskStatus(ImageUpdateTaskStatusEnum.TO_BE_REPAIR.getCode());
            task.setNotPassDescribePicture(r.getNotPassDescribePicture());
            task.setReason(r.getReason());
        } else {
            task.setTaskStatus(ImageUpdateTaskStatusEnum.COMPLETED.getCode());
        }
        r.getSkcList().forEach(t -> {
            List<ImageUpdateResult> newResults = ImageUpdateTaskConvert.buildPictureResultSkcAdd(t, task);
            allPicturesResult.addAll(newResults);
        });
        task.setRevisedTime(LocalDateTime.now());
        task.setReviserId(SsoContext.userId());
        task.setReviserName(SsoContext.username());
    }

    public static ImageUpdateTaskDTO buildSpuDetail(DesignStyle spu, Map<Long, List<Prototype>> spuMap, Map<Long, List<PrototypeMaterial>> skcMaterialMap, Map<Long, List<DesignerDTO>> designerMap, List<ImageUpdateTask> processingList) {
        ImageUpdateTaskDTO dto = new ImageUpdateTaskDTO();
        dto.setSpuId(spu.getDesignStyleId());
        dto.setSpuCode(spu.getStyleCode());
        dto.setDesignerId(spu.getDesignerId());
        dto.setDesignerName(spu.getDesignerName());
        if (CollectionUtil.isNotEmpty(processingList)) {
            var spuIds = processingList.stream().map(ImageUpdateTask::getSpuId).toList();
            if (spuIds.contains(spu.getDesignStyleId())) {
                dto.setProcessing(Bool.YES);
            }
        }
        if (CollectionUtil.isNotEmpty(designerMap) && designerMap.containsKey(spu.getCreatorId())) {
            List<DesignerDTO> designerDTOList = designerMap.get(spu.getCreatorId());
            dto.setDesignerId(designerDTOList.get(0).getDesignerId());
            dto.setDesignerName(designerDTOList.get(0).getDesignerName());
            dto.setDesignerGroupCode(designerDTOList.get(0).getDesignerGroupCode());
            dto.setDesignerGroupName(designerDTOList.get(0).getDesignerGroupName());
        }
        if (spuMap.containsKey(spu.getDesignStyleId())) {
            final var skcList = spuMap.get(spu.getDesignStyleId());
            dto.setSkcList(ImageUpdateTaskConvert.buildSkc(skcList, skcMaterialMap));
        }

        //dto.setPictures(ImageUpdateTaskConvert.buildPicture(list));
        dto.setSpuSourceType(ImageUpdateSpuSourceTypeEnum.DESIGN_STYLE.getCode());
        dto.setStoreId(spu.getStoreId());
        dto.setStoreName(spu.getStoreName());
        dto.setWavebandCode(spu.getWaveBandCode());
        dto.setWavebandName(spu.getWaveBandName());
        dto.setDevelopStyleTaskId(spu.getSourceBusinessId());
        return dto;
    }

    public static ImageUpdateTaskDTO buildSpotDetail(SpotStyleTask task, Map<Long, List<SpotStyleSkc>> spuMap, Map<Long, List<SpotStylePicture>> spuImageMap, Map<Long, List<DesignerDTO>> designerMap, ImageUpdateQueryReq req, List<ImageUpdateTask> processingList) {
        ImageUpdateTaskDTO dto = new ImageUpdateTaskDTO();
        dto.setSpuId(task.getTaskId());
        dto.setSpuCode(task.getTaskCode());
        if (CollectionUtil.isNotEmpty(processingList)) {
            var spuIds = processingList.stream().map(ImageUpdateTask::getSpuId).toList();
            if (spuIds.contains(task.getTaskId())) {
                dto.setProcessing(Bool.YES);
            }
        }
        if (CollectionUtil.isNotEmpty(designerMap) && designerMap.containsKey(task.getCreatorId())) {
            List<DesignerDTO> designerDTOList = designerMap.get(task.getCreatorId());
            dto.setDesignerId(designerDTOList.get(0).getDesignerId());
            dto.setDesignerName(designerDTOList.get(0).getDesignerName());
            dto.setDesignerGroupCode(designerDTOList.get(0).getDesignerGroupCode());
            dto.setDesignerGroupName(designerDTOList.get(0).getDesignerGroupName());
        }
        if (spuMap.containsKey(task.getTaskId())) {
            final var skcPictures = spuImageMap.get(task.getTaskId());
            final var skcList = spuMap.get(task.getTaskId());
            dto.setSkcList(ImageUpdateTaskConvert.spotSpuBuildPicture(skcList,skcPictures, req));
        }
        dto.setSpuSourceType(ImageUpdateSpuSourceTypeEnum.SPOT_STYLE.getCode());
        dto.setStoreId(task.getStoreId());
        dto.setStoreName(task.getStoreName());
        dto.setWavebandCode(task.getWaveBandCode());
        dto.setWavebandName(task.getWaveBandName());
        dto.setDevelopStyleTaskId(task.getSourceId());
        return dto;
    }

    public static ImageUpdateTaskDTO buildImageTaskDetail(ImageUpdateTask task, Map<Long, List<ImageUpdatePicture>> resultImageMap, Map<Long, List<DesignerDTO>> designerMap) {
        final var imageUpdateTaskDTO = BasicConvert.copy(task, ImageUpdateTaskDTO.class);
        imageUpdateTaskDTO.setSpuSourceType(task.getSpuSource());
        imageUpdateTaskDTO.setProcessing(Bool.YES);
        imageUpdateTaskDTO.setDevelopStyleTaskId(task.getDevelopStyleTaskId());
        if (CollectionUtil.isNotEmpty(designerMap) && designerMap.containsKey(task.getDesignerId())) {
            List<DesignerDTO> designerDTOList = designerMap.get(task.getDesignerId());
            imageUpdateTaskDTO.setDesignerId(designerDTOList.get(0).getDesignerId());
            imageUpdateTaskDTO.setDesignerName(designerDTOList.get(0).getDesignerName());
            imageUpdateTaskDTO.setDesignerGroupCode(designerDTOList.get(0).getDesignerGroupCode());
            imageUpdateTaskDTO.setDesignerGroupName(designerDTOList.get(0).getDesignerGroupName());
        }
        if (resultImageMap.containsKey(task.getTaskId())) {
            final var pictures = resultImageMap.get(task.getTaskId());
            final Map<Long, List<ImageUpdatePicture>> skcMap = BasicConvert.groupingBy(pictures, ImageUpdatePicture::getSkcId);
            imageUpdateTaskDTO.setSkcList(buildProcessSkc(skcMap));
        }
        return imageUpdateTaskDTO;
    }

    public static List<ImageUpdateTaskDTO.Skc> buildProcessSkc(Map<Long, List<ImageUpdatePicture>> skcMap) {
        if (skcMap.isEmpty()) {
            return Collections.emptyList();
        }
        List<ImageUpdateTaskDTO.Skc> skcList = new ArrayList<>();
        skcMap.forEach((skcId, pictureList) -> {
            ImageUpdateTaskDTO.Skc skc = new ImageUpdateTaskDTO.Skc();
            skc.setSkcId(skcId);
            skc.setSkcCode(skcMap.get(skcId).getFirst().getSkcCode());
            List<ImageUpdatePictureDTO> pictureDTOs = pictureList.stream()
                    .map(picture -> {
                        ImageUpdatePictureDTO dto = new ImageUpdatePictureDTO();
                        BeanUtils.copyProperties(picture, dto);
                        return dto;
                    })
                    .collect(Collectors.toList());
            skc.setPictures(pictureDTOs);
            skcList.add(skc);
        });
        return skcList;
    }
}
