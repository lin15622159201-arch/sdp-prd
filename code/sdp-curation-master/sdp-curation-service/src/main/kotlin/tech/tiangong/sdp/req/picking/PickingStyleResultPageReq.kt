package tech.tiangong.sdp.req.picking

import com.fasterxml.jackson.annotation.JsonFormat
import tech.tiangong.sdp.common.req.PageParam
import java.io.Serializable
import java.time.LocalDateTime

/**
 * @author yanjiaming@zj.tech
 * @date 2024/8/7
 */

class PickingStyleResultPageReq : PageParam(), Serializable {
    /**
     * 建议品类
     */
    var suggestedCategoryCode: String? = null

    /**
     * 建议国家站点
     */
    var suggestedCountrySiteCode: String? = null

    /**
     * 建议波次
     */
    var suggestedWaveBatchCode: String? = null

    /**
     * 【模糊查询】创建人名称
     */
    var pickingCreatorName: String? = null

    /**
     * 创建开始时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    var pickingStartTime: LocalDateTime? = null

    /**
     * 创建结束时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    var pickingEndTime: LocalDateTime? = null

    /**
     * 【模糊查询】灵感来源，ins、shein等
     */
    var inspirationSource: String? = null

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
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    var imagePickingStartTime: LocalDateTime? = null

    /**
     * 选图时间结束
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    var imagePickingEndTime: LocalDateTime? = null

    /**
     * 选用状态：null-全部,1已选中,2未选中
     * @see tech.tiangong.sdp.enums.PickingStateEnum
     */
    var pickingState: Int? = null

    /**
     * 开款状态：0-待处理 1-已开款 2-已淘汰
     * @see tech.tiangong.sdp.enums.PickingOpenStyleStateEnum
     */
    var openStyleState: Int? = null

    /**
     * 是否修图 1是 0否
     */
    var fixImageType: Int? = null

    /**
     * 款号 v3.10.1
     */
    var styleCode: Set<String>? = null

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
        private const val serialVersionUID: Long = 305087096950892094L
    }
}
