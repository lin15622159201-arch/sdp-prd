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
import tech.tiangong.sdp.common.req.ExternalSubmitInspirationReq
import tech.tiangong.sdp.common.resp.GetInspirationOrPickingIdResp
import tech.tiangong.sdp.common.resp.InspirationDetailVo

/**
 * 灵感相关接口
 * @author zjh
 * @date 2024/12/18 20:11
 */
@FeignClient(
    value = Constant.APPLICATION_NAME,
    path = Constant.CONTEXT_PATH + "/inner/v1/inspiration",
    contextId = "InspirationExternalClient",
    url = "\${domain.ola}",
)
@InnerFeign
interface InspirationExternalClient {


    /**
     * 提交AI设计任务
     * @param req
     */
    @PostMapping("/task/submit")
    fun submitAiDesignTask(@Validated @RequestBody req: AiDesignTaskCreateReq): DataResponse<Unit>

    /**
     * 获取灵感信息
     * @param inspirationId
     */
    @PostMapping("/get/inspiration/{inspirationId}")
    fun getByInspirationId(@PathVariable("inspirationId") inspirationId: Long): DataResponse<InspirationDetailVo>


    /**
     *
     * 外部更新灵感信息
     * 供给方式选了虚拟换衣、姿势裂变回调
     * @param req
     */
    @PostMapping("/external/submit-inspiration")
    fun externalSubmitInspiration(@Validated @RequestBody req: ExternalSubmitInspirationReq): DataResponse<Unit>
}