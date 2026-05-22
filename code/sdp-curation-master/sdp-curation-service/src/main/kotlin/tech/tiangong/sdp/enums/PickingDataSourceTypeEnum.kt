package tech.tiangong.sdp.enums

/**
 * 选款数据来源枚举
 * @author zjh
 * @date 2024-11-28 17:24:13
 */
enum class PickingDataSourceTypeEnum(val content: String) {
    IMPORT("导入"),
    AIGC("AIGC"),
    POSTURE_CHANGE("姿势裂变"),
    DIGITAL_PRINT("数码印花"),
    FLORAL_PATTERN("花型上身"),
    FASHION_VIRTUAL_TRY_ON("虚拟换衣"),
    STYLE_GEN("风格化衍生"),
    ;

}
