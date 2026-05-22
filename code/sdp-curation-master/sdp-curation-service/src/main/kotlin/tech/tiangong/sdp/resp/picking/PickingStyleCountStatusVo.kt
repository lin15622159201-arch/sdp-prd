package tech.tiangong.sdp.resp.picking

import java.io.Serializable

/**
 * 选款任务状态统计
 *
 * @author yanjiaming@zj.tech
 * @date 2024/8/8
 */

class PickingStyleCountStatusVo : Serializable {
    /**
     * 全部数量
     */
    var total: Int? = null

    /**
     * 待选择数量
     */
    var toBeSelected: Int? = null

    /**
     * 已选中数量
     */
    var selected: Int? = null

    /**
     * 未选中数量
     */
    var unselected: Int? = null

}
