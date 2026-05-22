package tech.tiangong.sdp.config

import org.springframework.amqp.rabbit.connection.ConnectionFactory
import org.springframework.amqp.rabbit.core.RabbitTemplate

/**
 * @author: xieyuxiang
 * @Date 2025/5/8
 */
//@Configuration
class RabbitConfig {

    //    @Bean
    fun rabbitTemplate(connectionFactory: ConnectionFactory): RabbitTemplate {
        val template = RabbitTemplate(connectionFactory)
        template.setConfirmCallback { correlationData, ack, cause ->
            if (ack) {
                println("消息发送成功！")
            } else {
                System.err.println("消息发送失败, 原因: $cause")
            }
        }
        return template
    }
}