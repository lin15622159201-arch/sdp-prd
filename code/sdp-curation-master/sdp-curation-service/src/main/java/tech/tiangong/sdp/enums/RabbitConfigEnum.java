package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import tech.tiangong.sdp.amqp.RabbitConstant;

/**
 * Rabbit配置
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/20 18:15
 */
@AllArgsConstructor
public enum RabbitConfigEnum {

    PUSH_DEVELOP_STYLE(RabbitConstant.PUSH_DEVELOP_STYLE_EXCHANGE,
            RabbitConstant.PUSH_DEVELOP_STYLE_ROUTING_KEY,
            RabbitConstant.PUSH_DEVELOP_STYLE_QUEUE),
    SUSPEND_DEVELOP_STYLE(RabbitConstant.SUSPEND_DEVELOP_STYLE_EXCHANGE,
            RabbitConstant.SUSPEND_DEVELOP_STYLE_ROUTING_KEY,
            RabbitConstant.SUSPEND_DEVELOP_STYLE_QUEUE),

    PULL_PLM_STYLE_CODE(RabbitConstant.PULL_PLM_STYLE_CODE_EXCHANGE,
            RabbitConstant.PULL_PLM_STYLE_CODE_ROUTING_KEY,
            RabbitConstant.PULL_PLM_STYLE_CODE_QUEUE),
    PUSH_PLM_STYLE(RabbitConstant.PUSH_PLM_STYLE_EXCHANGE,
            RabbitConstant.PUSH_PLM_STYLE_ROUTING_KEY,
            RabbitConstant.PUSH_PLM_STYLE_QUEUE),

    PUSH_MULFEAT_EXTRACT_TASK(RabbitConstant.PUSH_MULFEAT_EXTRACT_EXCHANGE,
            RabbitConstant.PUSH_MULFEAT_EXTRACT_ROUTING_KEY,
            RabbitConstant.PUSH_MULFEAT_EXTRACT_QUEUE),

    PUSH_PLM_SPU_SKC(RabbitConstant.PUSH_PLM_SPU_SKC_EXCHANGE,
            RabbitConstant.PUSH_PLM_SPU_SKC_ROUTING_KEY,
            RabbitConstant.PUSH_PLM_SPU_SKC_QUEUE),
    PUSH_PLM_BUYER(RabbitConstant.PUSH_PLM_BUYER_EXCHANGE,
            RabbitConstant.PUSH_PLM_BUYER_ROUTING_KEY,
            RabbitConstant.PUSH_PLM_BUYER_QUEUE),

    PUSH_CROP_TASK(RabbitConstant.PUSH_CROP_TASK_EXCHANGE,
            RabbitConstant.PUSH_CROP_TASK_ROUTING_KEY,
            RabbitConstant.PUSH_CROP_TASK_QUEUE),

    PUSH_TEMU(RabbitConstant.PUSH_TEMU_EXCHANGE,
            RabbitConstant.PUSH_TEMU_ROUTING_KEY,
            RabbitConstant.PUSH_TEMU_QUEUE),
    ;
    private final String exchange;
    private final String routingKey;
    private final String queue;

    public String getExchange() {
        return exchange;
    }

    public String getRoutingKey() {
        return routingKey;
    }

    public String getQueue() {
        return queue;
    }
}
