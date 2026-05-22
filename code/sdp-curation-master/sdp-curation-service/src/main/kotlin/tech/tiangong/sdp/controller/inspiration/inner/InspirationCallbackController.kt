package tech.tiangong.sdp.controller.inspiration.inner

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import team.aikero.blade.auth.annotation.PreCheckIgnore
import team.aikero.blade.auth.withSystemUser
import team.aikero.blade.core.protocol.DataResponse
import team.aikero.blade.core.protocol.ok
import tech.tiangong.sdp.req.inspiration.callback.AiDesignCallbackReq
import tech.tiangong.sdp.req.inspiration.callback.IdentifyCallbackReq
import tech.tiangong.sdp.service.InspirationCallbackService
import tech.tiangong.sdp.service.PickingStyleService

/**
 * 灵感相关回调接口
 * @author zjh
 * @date 2024/12/2 14:28
 */
@RestController
@RequestMapping("/inner/v1/inspiration/callback")
@PreCheckIgnore
class InspirationCallbackController(
    private val inspirationCallbackService: InspirationCallbackService,
    private val pickingStyleService: PickingStyleService
) {
    /**
     * 回调-识别任务
     * @param req
     */
    @PostMapping("/identify")
    fun identify(@RequestBody req: IdentifyCallbackReq): DataResponse<Unit> {
        withSystemUser {
            inspirationCallbackService.identify(req)
        }
        return ok()
    }

    @PostMapping("/identify/mq")
    fun identifyMq(@RequestBody req: IdentifyCallbackReq): DataResponse<Unit> {
        withSystemUser {
            pickingStyleService.identifyCallback(req)
        }
        return ok()
    }

    /**
     * 回调-AI设计任务
     * @param req
     */
    @PostMapping("/ai/design")
    fun aiDesign(@RequestBody req: AiDesignCallbackReq): DataResponse<Unit> {
        withSystemUser {
            inspirationCallbackService.aiDesign(req)
        }
        return ok()
    }

    /**
     * 定时-数码印花任务
     * @param req
     */
    @PostMapping("/digital/print")
    fun aiDesign(@RequestBody req: List<Long>): DataResponse<Unit> {
        withSystemUser {
            inspirationCallbackService.digitalPrint(req)
        }
        return ok()
    }
}
