package tech.tiangong.sdp.external

import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import team.aikero.blade.core.protocol.DataResponse
import tech.tiangong.sdp.common.resp.VirtualTryOnTaskVO

/**
 * 虚拟换衣Client
 */
@FeignClient(
    contextId = "inspirationPostureFissionClient",
    value = "inspiration-service",
    url = "\${domain.nest-api}",
    path = "/inspiration/inner/virtual-tryon",
)
interface InspirationVirtualTryOnClient {

    /**
     *
     * 外部-虚拟换衣信息查询
     * @param taskIds 虚拟换衣Id数组
     */
    @PostMapping("/list-by-ids")
    fun listByIds(@RequestBody taskIds: List<Long>): DataResponse<List<VirtualTryOnTaskVO>>

}