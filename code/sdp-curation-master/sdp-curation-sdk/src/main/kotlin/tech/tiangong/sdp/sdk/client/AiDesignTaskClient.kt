package tech.tiangong.sdp.sdk.client

import org.springframework.cloud.openfeign.FeignClient
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import team.aikero.blade.core.annotation.feign.InnerFeign
import team.aikero.blade.core.protocol.DataResponse
import tech.tiangong.sdp.common.constant.Constant

/**
 * AI设计任务相关接口
 * @author zjh
 * @date 2024/12/18 20:11
 */
@FeignClient(
    value = Constant.APPLICATION_NAME,
    path = Constant.CONTEXT_PATH + "/inner/v1/ai-design-task",
    contextId = "AiDesignTaskClient",
    url = "\${domain.ola}",
)
@InnerFeign
interface AiDesignTaskClient {

    @PostMapping("/update/status/by-task-ids")
    fun updateStatusByTaskIds(@Validated @RequestBody taskIdList: List<Long>): DataResponse<Unit>

}