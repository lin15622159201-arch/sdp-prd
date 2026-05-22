package tech.tiangong.sdp.req.picking

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull

class UltraHdTaskCallbackReq (
    @field:NotBlank(message = "任务类型不能为空")
    var modelType: String,

    @field:NotNull(message = "业务主键ID不能为空")
    var busId: Long,

    var taskId: Long? = null,

    var taskStatus: Int? = null,

    var message: String? = null,

    var taskProgress: Int? = null,
){

}