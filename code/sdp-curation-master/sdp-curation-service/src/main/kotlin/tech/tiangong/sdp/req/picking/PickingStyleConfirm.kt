package tech.tiangong.sdp.req.picking

import jakarta.validation.constraints.NotNull
import tech.tiangong.sdp.req.picking.PickingStyleConfirmReq.PickingStyleImageConfirmReq

/**
 *  选款结果
 *
 * @author     ：qinwenxuan@zj.tech
 * @date       ：2025/8/4 15:42
 * @version    :1.0
 */
class PickingStyleConfirm(
    /**
     * 款式id
     */
    @field:NotNull(message = "选款任务明细ID不能为空")
    var pickingStyleId: Long,
    /**
     * 选用状态：1已选中,2未选中
     * @see tech.tiangong.sdp.enums.PickingStateEnum
     */
    @field:NotNull(message = "选用状态不能为空")
    var pickingState: Int
) {

    /**
     * 更新版本(不为空则无修改, 空则修改)
     */
    var updateVersion: Long? = null
    /**
     * 图片信息
     */
    var imageInfos: List<PickingStyleImageConfirmReq>? = null
}