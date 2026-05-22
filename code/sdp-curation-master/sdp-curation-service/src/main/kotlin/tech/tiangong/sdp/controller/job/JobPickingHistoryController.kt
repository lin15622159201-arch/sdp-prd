package tech.tiangong.sdp.controller.job

import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import team.aikero.blade.auth.annotation.PreCheckIgnore
import team.aikero.blade.auth.withSystemUser
import team.aikero.blade.core.protocol.DataResponse
import team.aikero.blade.core.protocol.ok
import tech.tiangong.sdp.service.PickingHistory2024Service
import tech.tiangong.sdp.service.PickingStylePushService

/**
 * 处理选款历史数据
 *
 * @property pickingHistory2024Service
 */
@RestController
@RequestMapping("/job/v1/picking/history")
@PreCheckIgnore
class JobPickingHistoryController(
    private val pickingHistory2024Service: PickingHistory2024Service,
    private val pickingStylePushService: PickingStylePushService
) {

    /**
     * 导入旧选款数据
     * {"method":"POST","url":"/sdp-curation/job/v1/picking/history/2024/import","system":"ola", "env":"dev"}
     */
    @PostMapping("/2024/import")
    fun import2024(@RequestParam("file") file: MultipartFile): DataResponse<Unit> {
        withSystemUser {
            pickingHistory2024Service.importOldPickingData(file)
        }
        return ok()
    }

    /**
     * 旧选款数据 新增到 选款结果表
     * {"method":"POST","url":"/sdp-curation/job/v1/picking/history/2024/result","system":"ola", "env":"dev"}
     */
    @PostMapping("/2024/result")
    fun oldPickingToResult(@RequestBody pickingResultIdList: List<Long>?): DataResponse<Unit> {
        withSystemUser {
            pickingHistory2024Service.oldPickingToResult(pickingResultIdList)
        }
        return ok()
    }

    /**
     * 旧选款数据 推送到 灵感设计下游
     * {"method":"POST","url":"/sdp-curation/job/v1/picking/history/2024/push","system":"ola", "env":"dev"}
     */
    @PostMapping("/2024/push")
    fun oldPickingPush(@RequestBody pickingResultIdList: List<Long>?): DataResponse<Unit> {
        withSystemUser {
            pickingHistory2024Service.oldPickingPush(pickingResultIdList)
        }
        return ok()
    }

    /**
     * 推送ai款式给xiniu
     */
    @PostMapping("/push2Xiniu")
    fun push2Xiniu(@RequestBody pickingIdList: List<Long>): DataResponse<Unit> {
        withSystemUser {
            pickingIdList.forEach { pickingId ->
                pickingStylePushService.push2Xiniu(pickingId)
            }
        }
        return ok()
    }
}