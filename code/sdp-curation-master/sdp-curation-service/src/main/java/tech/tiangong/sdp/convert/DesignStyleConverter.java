package tech.tiangong.sdp.convert;

import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import tech.tiangong.sdp.entity.*;
import tech.tiangong.sdp.enums.*;
import tech.tiangong.sdp.utils.SsoContext;
import tech.tiangong.sdp.vo.dto.DesignStyleUpdateDto;
import tech.tiangong.sdp.vo.dto.DesignerDTO;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.DesignStyleCreateResp;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;


/**
 * 款式管理-SPU
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/4 16:08
 */
@UtilityClass
public class DesignStyleConverter {


    public static DesignStyle buildSpuCreateEo(DesignStyleCreateReq req, long designStyleId, String styleCode, Integer styleVersionNum, Long currentUserId, DesignerDTO designerDTO) {

        DesignStyle designStyleEo = new DesignStyle();
        designStyleEo.setDesignStyleId(designStyleId);
        designStyleEo.setStyleCode(styleCode);
        designStyleEo.setStyleStatus(StyleStatusEnum.SUBMITTED.getCode());
        designStyleEo.setVersionNum(styleVersionNum);
        designStyleEo.setLatestSubmitTime(LocalDateTime.now());
        BeanUtils.copyProperties(req, designStyleEo);
        if (StringUtils.isBlank(req.getStyleType())){
            designStyleEo.setStyleType(DesignStyleTypeEnum.DESIGN_STYLE.getCode());
        }
        if (StringUtils.isBlank(req.getTaskSource())) {
            req.setTaskSource(DesignStyleSourceTypeEnum.USER_UPLOAD.getCode());
            designStyleEo.setTaskSource(DesignStyleSourceTypeEnum.USER_UPLOAD.getCode());
        }
        //设计师与设计组别
        designStyleEo.setDesignerId(currentUserId);
        if (Objects.nonNull(designerDTO)) {
            designStyleEo.setDesignerCode(designerDTO.getDesignerCode());
            designStyleEo.setDesignerName(designerDTO.getDesignerName());
        }
        designStyleEo.setTenantId(SsoContext.tenantId());
        return designStyleEo;
    }

    public static DesignStyleUpdateDto buildDesignStyleUpdateDto(DesignStyleUpdateReq req, String styleCode, Integer newVersionNum, LocalDateTime now) {
        DesignStyleUpdateDto updateDto = new DesignStyleUpdateDto();
        BeanUtils.copyProperties(req, updateDto);
        updateDto.setVersionNum(newVersionNum);
        updateDto.setStyleCode(styleCode);
        updateDto.setSeasonCode(req.getSeasonCode());
        updateDto.setSeasonName(req.getSeasonName());
        updateDto.setSpuUpdateTime(now);
        if (StringUtils.isNotBlank(updateDto.getSkuClassName()) && updateDto.getSkuClassName().equals("单品")){
            updateDto.setSuitPiece(0);
        }
        if (StringUtils.isBlank(updateDto.getSkuClassCode())){
            updateDto.setSuitPiece(0);
        }
        return updateDto;
    }

    public DesignStyleCreateReq buildDevelopSpuAdd(DevelopStyleTask task) {
        final var spu = task.getSpus().getFirst();
        final var spuAdd = BasicConvert.copy(spu, DesignStyleCreateReq.class);
        spuAdd.setPickingStyleId(task.getPickingStyleId());
        spuAdd.setPickingResultId(task.getPickingResultId());
        spuAdd.setTaskSource((DesignStyleSourceTypeEnum.DEVELOP_STYLE.getCode()));
        spuAdd.setSourceBusinessId(task.getTaskId());
        spuAdd.setSourceBusinessCode(task.getTaskCode());
        spuAdd.setPlatformCode(task.getPlatformCode());
        spuAdd.setPlatformName(task.getPlatformName());
        spuAdd.setStyleType(task.getStyleType());
        spuAdd.setCategoryLabels(task.getUsableLabels());
        spuAdd.setPatternCode(spu.getPatternCode());
        spuAdd.setPatternName(spu.getPatternName());
        spuAdd.setElasticCode(spu.getElasticCode());
        spuAdd.setElasticName(spu.getElasticName());
        return spuAdd;
    }

    public static PrototypeOperateReq buildDevelopSkcAdd(DevelopStyleTask task, DevelopStyleSpu spu, DesignStyleCreateResp spuResp) {
        String color = spu.getSkcs()
                .stream()
                .map(DevelopStyleSkc::getColor)
                .filter(Objects::nonNull)
                .distinct()
                .collect(Collectors.joining("、"));
        final var skcSave = BasicConvert.copy(spu, PrototypeOperateReq.class);
        skcSave.setDesignCode(spuResp.getDesignCode());
        skcSave.setLatestVersionNum(1);
        skcSave.setColor(color);
        skcSave.setPreDisassemblyState(spu.getSkcs().getFirst().getPreDisassemblyState());
        skcSave.setColorInfoList(buildColorInfList(spu.getSkcs()));
        skcSave.setMaterialInfo(buildMaterial(task.getPictures(), spuResp));
        skcSave.setIsSplicing(false);
        skcSave.setPrototypeId(spuResp.getPrototypeId());
        return skcSave;

    }

    private static List<PrototypeOperateReq.PrototypeMaterialInfo> buildMaterial(
            List<DevelopStylePicture> pictures, DesignStyleCreateResp spuResp) {
        //主图排在第一位
        return pictures.stream()
                .sorted(Comparator.comparing(p -> !Objects.equals(p.getPictureType(), DevelopStylePictureTypeEnum.MAIN_IMAGE.getCode())))
                .map(t -> {
                    PrototypeOperateReq.PrototypeMaterialInfo info = new PrototypeOperateReq.PrototypeMaterialInfo();
                    info.setMaterialUrl(t.getPictureUrl());
                    info.setMaterialType(0);
                    info.setDesignStyleId(spuResp.getDesignStyleId());
                    info.setStyleCode(spuResp.getStyleCode());
                    return info;
                })
                .collect(Collectors.toList());
    }

    private static List<PrototypeOperateReq.ColorInfoReq> buildColorInfList(List<DevelopStyleSkc> skcList) {
        return skcList.stream()
                .map(skc -> {
                    PrototypeOperateReq.ColorInfoReq req = new PrototypeOperateReq.ColorInfoReq();
                    req.setColor(skc.getColor());
                    req.setColorCode(skc.getColorCode());
                    req.setColorEnglishName(skc.getColorEnName());
                    return req;
                })
                .collect(Collectors.toList());
    }
}
