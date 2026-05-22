package tech.tiangong.sdp.req.picking

import jakarta.validation.Valid
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.NotNull

/**
 *  选款
 *
 * @author     ：qinwenxuan@zj.tech
 * @date       ：2025/8/4 15:41
 * @version    :1.0
 */
class PickingConfirm(
    /**
     * 选款任务ID
     */
    @field:NotNull(message = "选款ID不能为空")
    var pickingId: Long,
    @field: Valid
    @field: NotEmpty(message = "选用结果不能为空")
    var result: List<PickingStyleConfirm>,

    /**
     * 波段编码
     */
    var waveBandCode: String? = null,

    /**
     * 波段名称
     */
    var waveBandName: String? = null,

    /**
     * 店铺ID
     */
    var storeId: Long? = null,

    /**
     * 店铺名称
     */
    var storeName: String? = null
)