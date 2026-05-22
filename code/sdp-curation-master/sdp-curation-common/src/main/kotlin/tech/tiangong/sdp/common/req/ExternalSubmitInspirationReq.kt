package tech.tiangong.sdp.common.req

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull

/**
 * 外部更新灵感信息请求
 */
class ExternalSubmitInspirationReq(
    /**
     * bizId 业务ID
     */
    @field:NotNull(message = "bizId is null")
    var businessId: Long,

    /**
     * 灵感id
     */
    @field:NotNull(message = "inspirationId is null")
    var inspirationId: Long,

    /**
     * 供给方式
     * @see tech.tiangong.sdp.enums.SupplyModeEnum
     */
    @field:NotBlank(message = "supplyMethod is null")
    var supplyMethod: String,

    /**
     * 创建人id
     */
    var creatorId: Long? = null,

    /**
     * 创建人名称
     */
    var creatorName: String? = null,

    /**
     * 租户id
     */
    var tenantId: Long? = null

) {
}