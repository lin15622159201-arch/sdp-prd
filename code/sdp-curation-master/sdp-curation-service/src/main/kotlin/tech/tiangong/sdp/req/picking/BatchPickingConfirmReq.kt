package tech.tiangong.sdp.req.picking

import jakarta.validation.Valid
import jakarta.validation.constraints.NotEmpty
import java.io.Serializable

/**
 *  批量选款确认参数
 *
 * @author     ：qinwenxuan@zj.tech
 * @date       ：2025/8/4 15:37
 * @version    :1.0
 */
class BatchPickingConfirmReq(
    @field: Valid
    @field: NotEmpty(message = "选款确认参数不能为空")
   var confirms: List<PickingConfirm>
) : Serializable {
    companion object {
        private const val serialVersionUID: Long = 6175663533192797304L
    }
}