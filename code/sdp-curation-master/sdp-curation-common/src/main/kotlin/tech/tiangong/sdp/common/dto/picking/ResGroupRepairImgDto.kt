package tech.tiangong.sdp.common.dto.picking

/**
 * @author zjh
 * @date 2025/1/8 15:23
 */
data class ResGroupRepairImgDto(
    /**
     * 组号
     */
    var groupNum: Int? = null,
    /**
     * 生成图片列表
     */
    var resImgList: List<ResRepairImgDto>? = null,
)
