package tech.tiangong.sdp.req.picking

import jakarta.validation.constraints.NotNull

/**
 * 选款结果批量确认请求
 *
 * @author yanjiaming@zj.tech
 * @date 2024/8/7
 */

class PickingBatchConfirmReq {

    /**
     * 批量选款集合
     */
    @NotNull(message = "选款不能为空")
    var confirmDetailIds: List<PickingConfirmReq>? = null
}
