package tech.tiangong.sdp.external

import org.springframework.cloud.openfeign.FeignClient
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import team.aikero.blade.core.protocol.DataResponse
import tech.tiangong.sdp.req.DesignDemandCreateReq
import tech.tiangong.sdp.resp.DesignDemandCreateVo

@FeignClient(
    value = "sdp-design-service",
    contextId = "designDemandClient",
    url = "\${domain.nest-api}",
)
interface DesignDemandClient {
    @PostMapping(value = ["/sdp-design/inner/v1/design-demand/add"])
    fun add(@RequestBody @Validated req: DesignDemandCreateReq): DataResponse<DesignDemandCreateVo>
}