package tech.tiangong.sdp.common.req

import jakarta.validation.constraints.NotNull

/**
 * 商品上架-通知请求
 * @author zjh
 * @date 2024/12/18 20:05
 */
class ProductOnlineNoticeReq {
    @field:NotNull(message = "灵感id不能为空")
    var inspireSourceId: Long = 0

    @field:NotNull(message = "商品id不能为空")
    var onlineSaleItemId: Long = 0
}