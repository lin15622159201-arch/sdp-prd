package tech.tiangong.sdp.resp.picking

import java.io.Serializable

/**
 * 选款列表导入结果
 *
 * @author yanjiaming@zj.tech
 * @date 2024/8/6
 */

class PickingStyleImportResultVo : Serializable {
    /**
     * 成功导入的记录数
     */
    var successCount: Int = 0

    /**
     * 失败的记录数
     */
    var failCount: Int = 0

    /**
     * 失败的详细信息列表
     */
    var failureDetails: MutableList<FailureDetail> = mutableListOf()


    /**
     * 导入失败的详细信息
     */

    class FailureDetail {
        /**
         * 失败的行号
         */
        var rowNumber: Int? = null

        /**
         * 失败原因
         */
        var reason: String? = null
    }
}
