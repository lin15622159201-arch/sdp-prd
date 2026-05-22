package tech.tiangong.sdp.common.dto.picking

/**
 * 标签
 * @author zjh
 * @date 2024/9/12 11:54
 */
data class LabelDto(
    /**
     * 中文标签
     */
    var cn: LabelValueDto? = null,
    /**
     * 英文标签
     */
    var en: LabelValueDto? = null,
    /**
     * coloro的编码，非颜色标签不存在此字段；多个颜色用逗号分隔
     */
    var coloroCodes: String? = null,
)