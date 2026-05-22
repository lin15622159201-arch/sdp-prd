package tech.tiangong.sdp.external

import org.springframework.cloud.openfeign.FeignClient
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import team.aikero.blade.core.protocol.DataResponse
import tech.tiangong.inspiration.common.vo.ImageGroupProblemFeedbackVo

/**
 * 问题反馈Client
 */
@FeignClient(
    contextId = "imageGroupProblemFeedbackClient",
    value = "inspiration-service",
    url = "\${domain.nest-api}",
    path = "/inspiration/inner/image-group-problem-feedback",
)
interface ImageGroupProblemFeedbackClient {

    @PostMapping("/add")
    fun problemFeedbackAdd(@Validated @RequestBody vo: ImageGroupProblemFeedbackVo): DataResponse<Unit>

}