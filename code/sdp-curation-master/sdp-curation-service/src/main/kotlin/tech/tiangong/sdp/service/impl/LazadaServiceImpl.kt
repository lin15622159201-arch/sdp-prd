package tech.tiangong.sdp.service.impl

import org.apache.commons.lang3.StringUtils
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import tech.tiangong.pop.common.enums.YesOrNoEnum
import tech.tiangong.sdp.dao.entity.InspirationOnlineProduct
import tech.tiangong.sdp.dao.repository.InspirationOnlineProductRepository
import tech.tiangong.sdp.dao.repository.InspirationRepository
import tech.tiangong.sdp.dao.repository.PickingAiDesignResultRepository
import tech.tiangong.sdp.dao.repository.SubmitDownstreamLogRepository
import tech.tiangong.sdp.enums.PlanningSourceEnum
import tech.tiangong.sdp.service.LazadaService
import tech.tiangong.sdp.service.component.LazadaComponent

/**
 * Lazada
 * @author zjh
 * @date 2024-12-18 17:08:52
 */
@Service
@Slf4j
class LazadaServiceImpl(
    private val lazadaComponent: LazadaComponent,
    private val submitDownstreamLogRepository: SubmitDownstreamLogRepository,
    private val pickingAiDesignResultRepository: PickingAiDesignResultRepository,
    private val inspirationRepository: InspirationRepository,
    private val inspirationOnlineProductRepository: InspirationOnlineProductRepository,
) : LazadaService {
    /**
     * 回流推送导AIDC-已使用,已上架
     *
     * @param inspireSourceId
     * @param onlineSaleItemId
     */
    @Transactional(rollbackFor = [Exception::class])
    override fun pushAidcOnline(inspireSourceId: Long, onlineSaleItemId: Long) {
        /*
            setSourceBizId 灵感>现货: submit_downstream_log.business_id
            setSourceBizId 选款>AIGC picking_ai_design_result.picking_result_id
            inspirationId 数码印花: inspiration.inspiration_id
         */
        var inspirationId: Long? = inspireSourceId
        val submitDownstreamLog = submitDownstreamLogRepository.getByBusinessId(inspireSourceId)
        if (submitDownstreamLog != null) {
            inspirationId = submitDownstreamLog.inspirationId
        }
        val result = pickingAiDesignResultRepository.getById(inspireSourceId)
        if (result != null) {
            inspirationId = result.inspirationId
        }

        if (inspirationId == null) {
            log.warn { "灵感id不存在: inspireSourceId=$inspireSourceId, onlineSaleItemId=$onlineSaleItemId" }
            return
        }

        val inspiration = inspirationRepository.getById(inspirationId)
        if (inspiration == null) {
            log.warn { "灵感id不存在: inspireSourceId=$inspireSourceId , onlineSaleItemId=$onlineSaleItemId" }
            return
        }

        if (StringUtils.isBlank(inspiration.thirdInspirationId)) {
            log.warn { "非第三方灵感,不需要推送: inspireSourceId=$inspireSourceId, onlineSaleItemId=$onlineSaleItemId" }
            return
        }

        val planningSourceEnum = PlanningSourceEnum.getByCode(inspiration.planningSourceCode)
        if (planningSourceEnum == null) {
            log.warn { "灵感来源不匹配: inspireSourceId=$inspireSourceId, onlineSaleItemId=$onlineSaleItemId, planningSourceCode=$inspiration.planningSourceCode" }
            return
        }
        // 更新灵感上架推送状态 (表示: 推送过灵感)
        if (inspiration.onlinePushAidc != YesOrNoEnum.YES.code) {
            // 更新上架推送状态
            inspiration.onlinePushAidc = YesOrNoEnum.YES.code
            inspirationRepository.updateById(inspiration)
        }

        // 灵感-商品 关系
        val mapper = inspirationOnlineProductRepository.getByInspirationIdAndOnlineSaleItemId(inspirationId, onlineSaleItemId)
        if (mapper.isEmpty()) {
            // 推送AIDC
            val success = lazadaComponent.pushAidcOnline(planningSourceEnum, inspiration, onlineSaleItemId)
            // 保存关系
            inspirationOnlineProductRepository.save(InspirationOnlineProduct().apply {
                this.inspirationId = inspirationId
                this.onlineSaleItemId = onlineSaleItemId
                this.onlinePushAidc = if (success) {
                    YesOrNoEnum.YES.code
                } else {
                    YesOrNoEnum.NO.code
                }
            })
        } else {
            log.info { "灵感-商品 关系已存在: inspireSourceId=$inspireSourceId, onlineSaleItemId=$onlineSaleItemId" }
            mapper
                .filter { it.onlinePushAidc != 1 }
                .forEach {
                    // 推送AIDC
                    val success = lazadaComponent.pushAidcOnline(planningSourceEnum, inspiration, onlineSaleItemId)
                    if (success) {
                        it.onlinePushAidc = YesOrNoEnum.YES.code
                        inspirationOnlineProductRepository.updateById(it)
                    }
                }
        }
    }
}