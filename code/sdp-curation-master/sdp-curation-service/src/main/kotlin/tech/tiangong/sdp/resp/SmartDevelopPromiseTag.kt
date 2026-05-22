package tech.tiangong.sdp.resp

import java.io.Serial
import java.io.Serializable

data class SmartDevelopPromiseTag(
    /**
     * 智能设计任务ID
     */
    var taskId: Long? = null,
    /**
     * 智能设计生成图履约标签列表
     */
    var promiseTagList: MutableList<SmartDevelopOutputGroupTag>? = null,

    ) : Serializable {

    fun add(promiseTagList: List<SmartDevelopOutputGroupTag>) {
        if (this.promiseTagList == null) {
            this.promiseTagList = mutableListOf()
        }
        this.promiseTagList!!.addAll(promiseTagList)
    }


    companion object {
        @Serial
        private const val serialVersionUID: Long = 1L
    }
}