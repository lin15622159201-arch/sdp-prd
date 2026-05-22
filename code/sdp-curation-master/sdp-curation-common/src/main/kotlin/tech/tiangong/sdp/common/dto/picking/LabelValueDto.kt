package tech.tiangong.sdp.common.dto.picking

/**
 * @author zjh
 * @date 2025/1/8 15:18
 */
data class LabelValueDto(
    /**
     * 标签名
     */
    var name: String? = null,
    /**
     * 标签编号
     */
    var code: String? = null,
    /**
     * 标签值列表
     */
    var values: List<LabelValueDto>? = null,
)