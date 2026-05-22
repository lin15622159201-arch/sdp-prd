package tech.tiangong.sdp.listener

import org.springframework.amqp.rabbit.annotation.Exchange
import org.springframework.amqp.rabbit.annotation.Queue
import org.springframework.amqp.rabbit.annotation.QueueBinding
import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.stereotype.Component
import team.aikero.blade.auth.withSystemUser
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.util.json.parseJson
import tech.tiangong.sdp.constants.MqConstant
import tech.tiangong.sdp.dto.mq.DesignDemandCreateSpuMqDto
import tech.tiangong.sdp.dto.mq.DesignDemandEliminateMqDto
import tech.tiangong.sdp.service.PackingCallbackService

/**
 * 选款结果 监听
 * @author zjh
 * @date 2024/12/4 15:05
 */
@Slf4j
@Component
class PackingResultListener(
    private val packingCallbackService: PackingCallbackService,
) {

    /**
     * 接收-灵感设计结果-淘汰
     *
     * @param message
     */
    @RabbitListener(
        bindings = [QueueBinding(
            value = Queue(value = MqConstant.DESIGN_DEMAND_ELIMINATE_Q, durable = "true"),
            exchange = Exchange(MqConstant.DESIGN_DEMAND_ELIMINATE_E, delayed = Exchange.TRUE, ignoreDeclarationExceptions = Exchange.TRUE),
            key = [MqConstant.DESIGN_DEMAND_ELIMINATE_R]
        )]
    )
    fun receiveStyleEliminateMessage(message: String) {
        log.info { "[选款-回调淘汰]接收到消息: $message" }
        try {
            withSystemUser {
                packingCallbackService.eliminate(message.parseJson(DesignDemandEliminateMqDto::class.java))
            }
        } catch (e: Exception) {
            log.error { "[选款-回调淘汰]处理失败: $message \n 异常: $e" }
        }
    }

    /**
     * 接收-灵感设计结果-开款
     *
     * @param message
     */
    @RabbitListener(
        bindings = [QueueBinding(
            value = Queue(value = MqConstant.DESIGN_DEMAND_CREATE_SPU_Q, durable = "true"),
            exchange = Exchange(MqConstant.DESIGN_DEMAND_CREATE_SPU_E, delayed = Exchange.TRUE, ignoreDeclarationExceptions = Exchange.TRUE),
            key = [MqConstant.DESIGN_DEMAND_CREATE_SPU_R]
        )]
    )
    fun receiveOpenStyleMessage(message: String) {
        log.info { "[选款-回调开款]接收到消息: $message" }
        try {
            withSystemUser {
                packingCallbackService.openStyle(message.parseJson(DesignDemandCreateSpuMqDto::class.java))
            }
        } catch (e: Exception) {
            log.error { "[选款-回调开款]处理失败: $message \n 异常: $e" }
        }
    }
}