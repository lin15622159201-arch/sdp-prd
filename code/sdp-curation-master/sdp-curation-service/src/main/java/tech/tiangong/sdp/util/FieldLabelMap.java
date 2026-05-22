package tech.tiangong.sdp.util;

import java.util.Map;

/**
 * SPU字段名 → 中文标签映射
 * <p>
 * 新增字段时，只需在此处加一行映射即可，无需修改日志写入逻辑。
 * 未在此映射中的字段，日志展示时将使用原始字段名。
 * </p>
 */
public final class FieldLabelMap {

    public static final Map<String, String> LABELS = Map.ofEntries(
            Map.entry("designTypeCode", "款式类型编码"),
            Map.entry("designTypeName", "款式类型名称"),
            Map.entry("categoryCode", "款式品类编码"),
            Map.entry("categoryName", "款式品类名"),
            Map.entry("styleLabelCode", "款式标签编码"),
            Map.entry("styleLabelName", "款式标签名称"),
            Map.entry("storeId", "店铺ID"),
            Map.entry("storeName", "店铺名称"),
            Map.entry("sizeStandardName", "尺码标准"),
            Map.entry("sizeStandardCode", "尺码标准编号"),
            Map.entry("waveBandCode", "波段编码"),
            Map.entry("waveBandName", "波段名称"),
            Map.entry("styleLevelName", "款式等级"),
            Map.entry("styleLevelCode", "款式等级编号"),
            Map.entry("qualityLevelName", "品质等级"),
            Map.entry("qualityLevelCode", "品质等级编号"),
            Map.entry("weaveModeCode", "织造方式编码"),
            Map.entry("weaveModeName", "织造方式名称"),
            Map.entry("clothingStyleName", "款式风格名称"),
            Map.entry("clothingStyleCode", "款式风格编码"),
            Map.entry("printingCode", "印花编码"),
            Map.entry("printingName", "印花名称"),
            Map.entry("seasonCode", "季节编码"),
            Map.entry("seasonName", "季节名称"),
            Map.entry("visualFormCode", "视觉形式编码"),
            Map.entry("visualFormName", "视觉形式名称"),
            Map.entry("galaCode", "节日编码"),
            Map.entry("galaName", "节日名称"),
            Map.entry("patternCode", "版型编码"),
            Map.entry("patternName", "版型名称"),
            Map.entry("elasticCode", "弹性编码"),
            Map.entry("elasticName", "弹性名称"),
            Map.entry("sceneName", "场景名称"),
            Map.entry("sceneCode", "场景编码"),
            Map.entry("projectTypeCode", "项目类型编码"),
            Map.entry("projectTypeName", "项目类型名称"),
            Map.entry("commodityLink", "商品链接"),
            Map.entry("skuClassCode", "SKU类别编码"),
            Map.entry("skuClassName", "SKU类别名称"),
            Map.entry("suitPiece", "套装件数")
    );

    private FieldLabelMap() {
    }
}
