package tech.tiangong.sdp.service.component

import org.springframework.beans.factory.annotation.Value
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import team.aikero.blade.auth.withUser
import team.aikero.blade.core.toolkit.isNotEmpty
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.user.entity.CurrentUser
import team.aikero.blade.util.json.toJson
import tech.tiangong.butted.client.UltraHdClient
import tech.tiangong.butted.common.req.UltraHdTaskCreateReq
import tech.tiangong.sdp.convert.PickStyleConvert
import tech.tiangong.sdp.dao.entity.PickingAiDesignResult
import tech.tiangong.sdp.dao.repository.PickingAiDesignResultRepository
import tech.tiangong.sdp.dao.repository.UltraHdTaskRepository
import tech.tiangong.sdp.enums.DesignSubmitStatusEnum


@Slf4j
@Component
class UltraHdTaskComponent(
    private val ultraHdClient: UltraHdClient,
    private val ultraHdTaskRepository: UltraHdTaskRepository,
    private val pickingAiDesignResultRepository: PickingAiDesignResultRepository,
    @Value("\${domain.nest-api}") private val host: String,
) {

    /**
     * 推送
     */
    @Transactional(rollbackFor = [Exception::class])
    @Async("commonExecutor")
    fun createTask(results: List<PickingAiDesignResult>) {
        val first = results.first()
        val tasks = PickStyleConvert.convert(results)
        withUser(CurrentUser(first.selectorId ?: 0, first.selectorName ?: "", "", first.tenantId ?: 0, false, null)) {
            val pickingResultIds: MutableSet<Long> = mutableSetOf()
            tasks.forEach {
                val req: UltraHdTaskCreateReq = PickStyleConvert.convert(it, first, host)
                log.info { "manualCreate req=${req.toJson()}" }
                val resp = ultraHdClient.manualCreate(req)
                log.info { "manualCreate resp=${resp.toJson()}" }
                if (resp.successful) {
                    it.taskStatus = 10
                    pickingResultIds.add(it.pickingResultId)
                }
            }
            ultraHdTaskRepository.saveBatch(tasks)
            // 更新选款结果提交状态
            if (pickingResultIds.isNotEmpty()) {
                val pickingAiDesignResults = pickingResultIds.map {
                    PickingAiDesignResult().apply {
                        pickingResultId = it
                        designSubmitStatus = DesignSubmitStatusEnum.GENERATING.code
                    }
                }
                if (pickingAiDesignResults.isNotEmpty()) {
                    pickingAiDesignResultRepository.updateBatchById(pickingAiDesignResults)
                }
            }
        }
    }


}