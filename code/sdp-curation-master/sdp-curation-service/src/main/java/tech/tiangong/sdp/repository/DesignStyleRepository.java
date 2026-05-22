package tech.tiangong.sdp.repository;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.collection.CollectionUtil;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.user.entity.CurrentUser;
import tech.tiangong.sdp.entity.DesignStyle;
import tech.tiangong.sdp.enums.StyleStatusEnum;
import tech.tiangong.sdp.mapper.DesignStyleMapper;
import tech.tiangong.sdp.vo.dto.DesignStyleUpdateDto;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

/**
 * 款式管理-SPURepository
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 15:15
 */
@Repository
public class DesignStyleRepository extends ManualBaseRepository<DesignStyleMapper, DesignStyle> {

    /**
     * 根据spu编码批量查询
     *
     * @param styleCodeList spu编码集合
     * @return spu集合
     */
    public List<DesignStyle> listByStyleCodes(List<String> styleCodeList) {
        if (CollUtil.isEmpty(styleCodeList)) {
            return Collections.emptyList();
        }
        return lambdaQuery().in(DesignStyle::getStyleCode, styleCodeList)
                .eq(DesignStyle::getDeleted, Bool.NO.getCode())
                .list();
    }

    public List<DesignStyle> listByStyleCodesAndMaterialType(List<String> styleCodeList, Integer materialType) {
        if (CollUtil.isEmpty(styleCodeList)) {
            return Collections.emptyList();
        }
        return baseMapper.listByStyleCodesAndMaterialType(styleCodeList, materialType);
    }

    public List<DesignStyle> history(List<String> styleCodeList) {
        return lambdaQuery()
                //.in(CollectionUtil.isNotEmpty(styleCodeList),DesignStyle::getStyleCode, styleCodeList)
                .eq(DesignStyle::getDeleted, Bool.NO.getCode())
                .list();
    }


    /**
     * 根据styleCode查询spu信息(在design_style表中,一个spu只会有一条记录)
     */
    public DesignStyle getByStyleCode(String styleCode) {
        return lambdaQuery()
                .eq(DesignStyle::getStyleCode, styleCode)
                .eq(DesignStyle::getDeleted, Bool.NO.getCode())
                .one();
    }

    /**
     * 更新SPU-编辑SPU调用
     */
    public void updateSpuInfo(DesignStyleUpdateDto updateDto, CurrentUser userContent) {
        //波段、场景、SKU分类字段允许更新为null
        lambdaUpdate()
                .set(DesignStyle::getStyleStatus, StyleStatusEnum.SUBMITTED.getCode())
                .set(DesignStyle::getVersionNum, updateDto.getVersionNum())
                .set(DesignStyle::getLatestSubmitTime, updateDto.getSpuUpdateTime())
                .set(StringUtils.isNotBlank(updateDto.getCategoryName()), DesignStyle::getCategoryName, updateDto.getCategoryName())
                .set(StringUtils.isNotBlank(updateDto.getCategoryCode()), DesignStyle::getCategoryCode, updateDto.getCategoryCode())
                .set(StringUtils.isNotBlank(updateDto.getStyleLabelCode()), DesignStyle::getStyleLabelCode, updateDto.getStyleLabelCode())
                .set(StringUtils.isNotBlank(updateDto.getStyleLabelName()), DesignStyle::getStyleLabelName, updateDto.getStyleLabelName())
                .set(Objects.nonNull(updateDto.getStoreId()), DesignStyle::getStoreId, updateDto.getStoreId())
                .set(StringUtils.isNotBlank(updateDto.getStoreName()), DesignStyle::getStoreName, updateDto.getStoreName())
                .set(StringUtils.isNotBlank(updateDto.getSizeStandardCode()), DesignStyle::getSizeStandardCode, updateDto.getSizeStandardCode())
                .set(StringUtils.isNotBlank(updateDto.getSizeStandardName()), DesignStyle::getSizeStandardName, updateDto.getSizeStandardName())
                .set(DesignStyle::getWaveBandCode, updateDto.getWaveBandCode())
                .set(DesignStyle::getWaveBandName, updateDto.getWaveBandName())
                .set(StringUtils.isNotBlank(updateDto.getStyleLevelCode()), DesignStyle::getStyleLevelCode, updateDto.getStyleLevelCode())
                .set(StringUtils.isNotBlank(updateDto.getStyleLevelName()), DesignStyle::getStyleLevelName, updateDto.getStyleLevelName())
                .set(StringUtils.isNotBlank(updateDto.getQualityLevelCode()), DesignStyle::getQualityLevelCode, updateDto.getQualityLevelCode())
                .set(StringUtils.isNotBlank(updateDto.getQualityLevelName()), DesignStyle::getQualityLevelName, updateDto.getQualityLevelName())
                .set(StringUtils.isNotBlank(updateDto.getWeaveModeCode()), DesignStyle::getWeaveModeCode, updateDto.getWeaveModeCode())
                .set(StringUtils.isNotBlank(updateDto.getWeaveModeName()), DesignStyle::getWeaveModeName, updateDto.getWeaveModeName())
                .set(StringUtils.isNotBlank(updateDto.getClothingStyleCode()), DesignStyle::getClothingStyleCode, updateDto.getClothingStyleCode())
                .set(StringUtils.isNotBlank(updateDto.getClothingStyleName()), DesignStyle::getClothingStyleName, updateDto.getClothingStyleName())
                .set(StringUtils.isNotBlank(updateDto.getPrintingCode()), DesignStyle::getPrintingCode, updateDto.getPrintingCode())
                .set(StringUtils.isNotBlank(updateDto.getPrintingName()), DesignStyle::getPrintingName, updateDto.getPrintingName())
                .set(StringUtils.isNotBlank(updateDto.getSeasonCode()), DesignStyle::getSeasonCode, updateDto.getSeasonCode())
                .set(StringUtils.isNotBlank(updateDto.getSeasonName()), DesignStyle::getSeasonName, updateDto.getSeasonName())
                .set(StringUtils.isNotBlank(updateDto.getVisualFormCode()), DesignStyle::getVisualFormCode, updateDto.getVisualFormCode())
                .set(StringUtils.isNotBlank(updateDto.getVisualFormName()), DesignStyle::getVisualFormName, updateDto.getVisualFormName())
                .set(StringUtils.isNotBlank(updateDto.getPatternCode()), DesignStyle::getPatternCode, updateDto.getPatternCode())
                .set(StringUtils.isNotBlank(updateDto.getPatternName()), DesignStyle::getPatternName, updateDto.getPatternName())
                .set(StringUtils.isNotBlank(updateDto.getElasticCode()), DesignStyle::getElasticCode, updateDto.getElasticCode())
                .set(StringUtils.isNotBlank(updateDto.getElasticName()), DesignStyle::getElasticName, updateDto.getElasticName())
                .set(StringUtils.isNotBlank(updateDto.getProjectTypeCode()), DesignStyle::getProjectTypeCode, updateDto.getProjectTypeCode())
                .set(StringUtils.isNotBlank(updateDto.getProjectTypeName()), DesignStyle::getProjectTypeName, updateDto.getProjectTypeName())
                .set(StringUtils.isNotBlank(updateDto.getDesignTypeCode()), DesignStyle::getDesignTypeCode, updateDto.getDesignTypeCode())
                .set(StringUtils.isNotBlank(updateDto.getDesignTypeName()), DesignStyle::getDesignTypeName, updateDto.getDesignTypeName())
                .set(DesignStyle::getGalaCode, updateDto.getGalaCode())
                .set(DesignStyle::getGalaName, updateDto.getGalaName())
                .set(DesignStyle::getCommodityLink, updateDto.getCommodityLink())
                .set(DesignStyle::getSuitPiece, updateDto.getSuitPiece())
                .set(DesignStyle::getSceneCode, updateDto.getSceneCode())
                .set(DesignStyle::getSceneName, updateDto.getSceneName())
                .set(DesignStyle::getSkuClassCode, updateDto.getSkuClassCode())
                .set(DesignStyle::getSkuClassName, updateDto.getSkuClassName())
                .set(DesignStyle::getRevisedTime, Objects.isNull(updateDto.getSpuUpdateTime()) ? LocalDateTime.now() : updateDto.getSpuUpdateTime())
                .set(DesignStyle::getReviserId, userContent.getId())
                .set(DesignStyle::getReviserName, userContent.getName())
                .eq(DesignStyle::getDesignStyleId, updateDto.getDesignStyleId())
                .update();
    }

    public List<DesignStyle> selectImportList(List<String> styleCodes) {
        return lambdaQuery().eq(DesignStyle::getDeleted, Bool.NO.getCode())
                .in(CollectionUtil.isNotEmpty(styleCodes), DesignStyle::getStyleCode, styleCodes)
                .eq(DesignStyle::getMessage, "导入旧的PLM款式操作")
                .list();
    }
}
