package tech.tiangong.sdp.req.inspiration.callback

/**
 * @author zjh
 * @date 2024/12/2 14:30
 */
class AiDesignCallbackReq {
    var busId: Long = 0
    var taskId: Long = 0
    var taskStatus: Int = 0
    var taskProgress: Int? = null
    var message: String? = null
}