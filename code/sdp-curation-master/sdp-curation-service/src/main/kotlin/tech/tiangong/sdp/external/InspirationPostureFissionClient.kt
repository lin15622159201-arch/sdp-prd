package tech.tiangong.sdp.external

import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import team.aikero.blade.core.protocol.DataResponse
import tech.tiangong.sdp.resp.PostureFissionTaskExternalVo

/**
 * 虚拟换衣Client
 */
@FeignClient(
    contextId = "virtualTryOnTaskClient",
    value = "inspiration-service",
    url = "\${domain.nest-api}",
    path = "/inspiration/inner/v1/posture-fission-task",
)
interface InspirationPostureFissionClient {

    /**
     *
     * 外部-虚拟换衣信息查询
     * @param taskIds 虚拟换衣Id数组
     */
    @PostMapping("/list-by-ids")
    fun listByIds(@RequestBody taskIds: List<Long>): DataResponse<List<PostureFissionTaskExternalVo>>

}