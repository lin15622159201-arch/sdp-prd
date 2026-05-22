package tech.tiangong.sdp.external

import org.springframework.cloud.openfeign.FeignClient
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import team.aikero.blade.core.protocol.DataResponse
import tech.tiangong.sdp.req.StyleGenTaskAddReq
import tech.tiangong.sdp.resp.StyleGenTaskResp

/**
 * 灵感风格小模型Client
 */
@FeignClient(
    contextId = "inspirationStyleGenClient",
    value = "inspiration-service",
    url = "\${domain.nest-api}",
    path = "/inspiration/inner/v1/style-gen/",
)
interface InspirationStyleGenClient {
    /**
     * 创建
     * @param req InspirationDesignReq
     */
    @PostMapping(value = ["create-sdp"])
    fun create(@Validated @RequestBody req: StyleGenTaskAddReq): DataResponse<Long>

    /**
     * 任务详情
     * @param ids 任务ID
     */
    @PostMapping(value = ["list-id"])
    fun listByIds(@Validated @RequestBody ids: List<Long>): DataResponse<List<StyleGenTaskResp>>

}