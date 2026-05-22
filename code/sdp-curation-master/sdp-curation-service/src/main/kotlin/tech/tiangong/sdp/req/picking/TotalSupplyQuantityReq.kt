package tech.tiangong.sdp.req.picking

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull

class TotalSupplyQuantityReq {
    /**
     * 品类code
     */
    @field:NotBlank(message = "品类不能为空")
    var categoryCode: String? = null

    /**
     * 供给方式code
     */
    @field:NotBlank(message = "供给方式不能为空")
    var supplyModeCode: String? = null

    /**
     * 店铺id
     */
    @field:NotNull(message = "店铺不能为空")
    var shopId: Long? = null
}