package tech.tiangong.sdp.resp

/**
 * 灵感设计创建结果
 */
data class InspirationDesignCreateResult(

    /**
     * 任务ID
     */
    var taskId: Long? = null,
    /**
     * 任务编码
     */
    var taskCode: String? = null,

    ) {
    companion object {
        private const val serialVersionUID = 1L
    }

}
