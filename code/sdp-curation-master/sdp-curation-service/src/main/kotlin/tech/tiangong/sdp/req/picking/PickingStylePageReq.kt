package tech.tiangong.sdp.req.picking

import com.fasterxml.jackson.annotation.JsonFormat
import team.aikero.blade.core.protocol.PageReq
import java.time.LocalDateTime

/**
 * 选款分页查询参数
 *
 * @author yanjiaming@zj.tech
 * @date 2024/8/6
 */

class PickingStylePageReq : PageReq() {
    /**
     * 外部品类
     */
    var externalCategory: String? = null

    /**
     * 创建人名称
     */
    var pickingCreatorName: String? = null

    /**
     * 创建开始时间
     */
    @field:JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    var pickingStartTime: LocalDateTime? = null

    /**
     * 创建结束时间
     */
    @field:JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    var pickingEndTime: LocalDateTime? = null

    /**
     * 灵感来源，ins、shein等
     */
    var inspirationSource: String? = null

    /**
     * 国家站点，东南亚的6个站点
     */
    var countrySiteCode: String? = null

    /**
     * 选款人 买手
     */
    var selectorId: Long? = null

    /**
     * 选款人 买手
     */
    var selectorName: String? = null

    /**
     * 选图时间开始
     */
    @field:JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    var imagePickingStartTime: LocalDateTime? = null

    /**
     * 选图时间结束
     */
    @field:JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    var imagePickingEndTime: LocalDateTime? = null

    /**
     * 波次
     */
    var waveBatchCode: String? = null

    /**
     * 选用状态：null-全部,0待选中,1已选中,2未选中
     * @see tech.tiangong.sdp.enums.PickingStateEnum
     */
    var pickingState: Int? = null

    /**
     * 创建人id v3.10.1
     */
    var creatorIds: Set<Long>? = null

    /**
     * 任务编码  v3.10.1
     */
    var taskCode: Set<String>? = null

    /**
     * 数据来源类型（导入）
     */
    var dataSourceType: String? = null

    /**
     * 数据来源
     * smart_develop_style：AI设计
     * posture_fission ：姿势裂变
     */
    var origin: String? = null

    /**
     * 租户ID
     */
    var tenantId: Long? = null

    companion object {
        private const val serialVersionUID: Long = -4842135689695773810L
    }
}
