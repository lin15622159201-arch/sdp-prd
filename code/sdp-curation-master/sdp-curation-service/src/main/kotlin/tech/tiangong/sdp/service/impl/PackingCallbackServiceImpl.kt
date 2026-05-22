package tech.tiangong.sdp.service.impl

import org.springframework.stereotype.Service
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import tech.tiangong.sdp.dao.entity.PickingAiDesignResult
import tech.tiangong.sdp.dao.repository.PickingAiDesignResultRepository
import tech.tiangong.sdp.dto.mq.DesignDemandCreateSpuMqDto
import tech.tiangong.sdp.dto.mq.DesignDemandEliminateMqDto
import tech.tiangong.sdp.enums.PickingOpenStyleStateEnum
import tech.tiangong.sdp.service.PackingCallbackService
import java.time.LocalDateTime

/**
 * 选款相关回调逻辑
 * @author zjh
 * @date 2024/11/20 09:55
 */
@Slf4j
@Service
class PackingCallbackServiceImpl(
    private val packingResultRepository: PickingAiDesignResultRepository,
) : PackingCallbackService {
    /**
     * 回调-淘汰
     * @param req 淘汰请求DTO
     */
    override fun eliminate(req: DesignDemandEliminateMqDto) {
        // 获取选款结果
        val result = packingResultRepository.getById(req.sourceBizId)
            ?: run {
                log.error { "选款结果不存在 - pickingStyleId: ${req.sourceBizId}" }
                return
            }

        // 检查状态
        if (result.openStyleState != PickingOpenStyleStateEnum.WAIT_PROCESS.code) {
            log.error { "选款结果状态异常 - pickingStyleId: ${req.sourceBizId}, 当前状态: ${result.openStyleState}" }
            return
        }

        // 构建更新对象
        val updateResult = PickingAiDesignResult().apply {
            pickingResultId = result.pickingResultId
            styleDesignDemandId = req.designDemandId
            styleSourceBizId = req.sourceBizId
            styleEliminateReason = req.noPassReason
            styleEliminateUserId = req.noPassUserId
            styleEliminateUserName = req.noPassUserName
            styleEliminateTime = req.noPassTime ?: LocalDateTime.now()  // 如果时间为空，设为当前时间
            openStyleState = PickingOpenStyleStateEnum.ELIMINATED.code
        }

        // 执行更新
        try {
            val updated = packingResultRepository.updateById(updateResult)
            if (updated) {
                log.info { "选款结果淘汰成功 - pickingStyleId: ${req.sourceBizId}, userId: ${req.noPassUserId}" }
            } else {
                log.error { "选款结果淘汰失败 - pickingStyleId: ${req.sourceBizId}" }
            }
        } catch (e: Exception) {
            log.error(e) { "选款结果淘汰异常 - pickingStyleId: ${req.sourceBizId}" }
            throw e
        }
    }

    /**
     * 回调-开款
     * @param req 开款请求DTO
     */
    override fun openStyle(req: DesignDemandCreateSpuMqDto) {
        // 获取选款结果
        val result = packingResultRepository.getById(req.sourceBizId)
            ?: run {
                log.error { "选款结果不存在 - pickingStyleId: ${req.sourceBizId}" }
                return
            }

        // 检查状态
        if (result.openStyleState != PickingOpenStyleStateEnum.WAIT_PROCESS.code) {
            log.error { "选款结果状态异常 - pickingStyleId: ${req.sourceBizId}, 当前状态: ${result.openStyleState}" }
            return
        }

        // 构建更新对象
        val updateResult = PickingAiDesignResult().apply {
            pickingResultId = result.pickingResultId
            styleDesignDemandId = req.designDemandId
            styleSourceBizId = req.sourceBizId
            styleSpuCode = req.styleCode
            styleSkcCode = req.designCode
            styleSpuCreateTime = req.createSpuTime ?: LocalDateTime.now()
            openStyleState = PickingOpenStyleStateEnum.OPEN.code
        }

        // 执行更新
        try {
            val updated = packingResultRepository.updateById(updateResult)
            if (updated) {
                log.info { "选款结果更新成功 - pickingStyleId: ${req.sourceBizId}, styleSpuCode: ${req.styleCode}" }
            } else {
                log.error { "选款结果更新失败 - pickingStyleId: ${req.sourceBizId}" }
            }
        } catch (e: Exception) {
            log.error(e) { "选款结果更新异常 - pickingStyleId: ${req.sourceBizId}" }
            throw e
        }
    }
}
