package tech.tiangong.sdp.sdk.client

import org.springframework.cloud.openfeign.FeignClient
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import team.aikero.blade.core.annotation.feign.InnerFeign
import team.aikero.blade.core.protocol.DataResponse
import tech.tiangong.sdp.common.constant.Constant
import tech.tiangong.sdp.common.req.AiDesignTaskCreateReq
import tech.tiangong.sdp.common.req.ProductOnlineNoticeReq
import tech.tiangong.sdp.common.resp.GetInspirationOrPickingIdResp

/**
 * 灵感相关接口
 * @author zjh
 * @date 2024/12/18 20:11
 */
@FeignClient(
    value = Constant.APPLICATION_NAME,
    path = Constant.CONTEXT_PATH + "/inner/v1/inspiration",
    contextId = "InspirationClient"
)
@InnerFeign
interface InspirationClient {

    /**
     * 商品上架通知
     * @param req
     */
    @PostMapping("/notice/product/online")
    fun productOnlineNotice(@Validated @RequestBody req: ProductOnlineNoticeReq): DataResponse<Unit>

    /**
     * 灵感id/选款id获取相关信息
     * @param inspirationPickingId
     */
    @PostMapping("/get/inspirationOrPicking/{inspirationPickingId}")
    fun getByInspirationOrPickingId(@PathVariable("inspirationPickingId") inspirationPickingId: Long): DataResponse<GetInspirationOrPickingIdResp>
}