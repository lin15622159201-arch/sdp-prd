package tech.tiangong.sdp.common.req

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull

/**
 * AI设计任务创建请求
 */
class AiDesignTaskCreateReq(
    /**
     * bizId 业务ID（原本提交到AI设计的busId）
     */
    @field:NotNull(message = "bizId is null")
    var bizId: Long,
    /**
     * 创建人id
     */
    @field:NotNull(message = "creatorId is null")
    var creatorId: Long,
    /**
     * 创建人名称
     */
    @field:NotBlank(message = "creatorName is blank")
    val creatorName: String,

    /**
     * 租户id
     */
    @field:NotNull(message = "tenantId is null")
    val tenantId: Long

) {
    /**
     * 是否一拖三
     */
    var tryOnFix: Int? = null

    /**
     * 重试ai设计生图参数
     */
    var createExtParam: AiDesignTaskCreateExt? = null
}