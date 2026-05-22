package tech.tiangong.sdp.controller.job

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import team.aikero.blade.auth.annotation.PreCheckIgnore
import team.aikero.blade.auth.withSystemUser
import team.aikero.blade.core.protocol.DataResponse
import team.aikero.blade.core.protocol.ok
import tech.tiangong.sdp.service.InspirationCallbackService

/**
 * 定时任务-数码印花
 * @author zjh
 * @date 2024/12/9 19:32
 */
@RestController
@RequestMapping("/job/v1/digital/print")
@PreCheckIgnore
class JobCategoryController(
    private val inspirationCallbackService: InspirationCallbackService,
) {

    /**
     * 更新数码印花任务状态
     * {"method":"POST","url":"/sdp-curation/job/v1/digital/print/callback/task","system":"ola", "env":"dev"}
     */
    @PostMapping("/callback/task")
    fun callbackTask(): DataResponse<Unit> {
        withSystemUser {
            inspirationCallbackService.digitalPrint(listOf())
        }
        return ok()
    }

}