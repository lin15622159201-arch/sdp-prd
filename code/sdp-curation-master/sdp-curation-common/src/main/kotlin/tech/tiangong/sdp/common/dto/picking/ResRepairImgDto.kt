package tech.tiangong.sdp.common.dto.picking

/**
 * @author zjh
 * @date 2025/1/8 15:23
 */
data class ResRepairImgDto(
    /**
     * 生成图
     */
    var resImg: String? = null,
    /**
     * 修复图
     */
    var repairImg: String? = null,
    /**
     * 序号
     */
    var serialNum: Int? = null,
)
