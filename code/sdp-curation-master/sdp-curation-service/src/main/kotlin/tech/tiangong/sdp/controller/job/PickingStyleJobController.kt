package tech.tiangong.sdp.controller.job

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import team.aikero.blade.auth.annotation.PreCheckIgnore
import team.aikero.blade.core.protocol.DataResponse
import team.aikero.blade.core.protocol.ok
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import tech.tiangong.sdp.service.PickingStyleService

/**
 * picking-style job
 */
@Slf4j
@RestController
@RequestMapping("/job/picking-style")
@PreCheckIgnore
class PickingStyleJobController(
    private val pickingStyleService: PickingStyleService,
) {

    /**
     * 扫描生成中的选款任务的图片4K图生成情况
     */
    @PostMapping("scan/finished-ultra-hd-task")
    fun scanFinishedHdTask(): DataResponse<Unit> {
        log.info { "scanFinishedHdTask come in..." }
        pickingStyleService.scanFinishedHdTask()
        return ok()
    }

    /**
     * 推送选款到sdp-design
     */
    @PostMapping("/push")
    fun pushPickingResult(): DataResponse<Unit> {
        log.info { "pushPickingResult come in..." }
        pickingStyleService.pushPickingResult()
        return ok()
    }


}