package tech.tiangong.sdp.common.dto.picking


data class PickingAddPictureDto(

    /**
     * 组号
     */
    var groupNum: Int? = 1,
    /**
     * 生成图片列表
     */
    var resImgList: List<ResRepairImgDto>? = null,
)