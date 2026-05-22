package tech.tiangong.sdp.common.req

import java.io.Serializable

/**
 *  分页参数
 *
 * @author     ：qinwenxuan@zj.tech
 * @date       ：2025/8/5 10:15
 * @version    :1.0
 */
open class PageParam : Serializable {

    /**
     * 当前查询的页码
     */
    var pageNum: Int = 1

    /**
     * 当前查询单页的数据量
     */
    var pageSize: Int = 20

    companion object {
        private const val serialVersionUID: Long = -4596936581400029121L
    }
}