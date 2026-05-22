package tech.tiangong.sdp.amqp;

import cn.hutool.core.util.ObjectUtil;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.MessagePostProcessor;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.connection.CorrelationData;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.retry.support.RetryTemplate;
import org.springframework.stereotype.Component;
import team.aikero.blade.sequence.id.IdHelper;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.component.JavaTransactionalManager;
import tech.tiangong.sdp.util.ExecutorUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;

/**
 * Rabbit生产者
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/20 16:58
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class RabbitProducer implements AutoCloseable {
    private final RabbitTemplate rabbitTemplate;
    private final JavaTransactionalManager javaTransactionalManager;
    private final ExecutorService executor = ExecutorUtils.get("amqpProducerPool", 4096);

    @PostConstruct
    public void init() {
        enhance();
    }

    public void send(final EventMessage message) {
        javaTransactionalManager.afterCommit(() ->
                        CompletableFuture.runAsync(() -> convertAndSend(message), executor)
                                // 1分钟线程超时
//                        .orTimeout(1000 * 60, TimeUnit.MICROSECONDS)
                                .exceptionally(e -> {
                                    log.error("发送消息失败\t{}", JsonsKt.toJsonPretty(message));
                                    return null;
                                })
        );
    }

    @PreDestroy
    @Override
    public void close() throws Exception {
        ExecutorUtils.shutdownExecutor(executor);
    }

    private void convertAndSend(EventMessage message) {
        final var msgId = Objects.toString(IdHelper.getId());
        rabbitTemplate.convertAndSend(message.getExchange(), message.getRoutingKey(), message.getBody(), getMessagePostProcessor(message, msgId), new CorrelationData(msgId));
    }

    private MessagePostProcessor getMessagePostProcessor(final EventMessage message, final String msgId) {
        return m -> {
            final var prop = m.getMessageProperties();
            prop.setMessageId(msgId);
            prop.setContentType(MessageProperties.CONTENT_TYPE_JSON);
            prop.setContentEncoding(StandardCharsets.UTF_8.name());
            final var headers = prop.getHeaders();
            headers.put("operatorId", message.getCreatorId());
            headers.put("operatorName", message.getCreatorName());
            headers.put("tenantId", message.getTenantId());
            headers.put("operateTime", message.getDateTime());
            return m;
        };
    }

    private void enhance() {
        rabbitTemplate.setConfirmCallback((correlationData, ack, cause) -> {
            if (ack) {
                if (ObjectUtil.isNotNull(correlationData)) {
                    log.info("消息投递到exchange成功,correlationData={}", JsonsKt.toJsonPretty(correlationData));
                } else {
                    log.info("消息投递到exchange成功");
                }
            } else {
                if (ObjectUtil.isNotNull(correlationData)) {
                    log.info("消息投递exchange失败,原因={} correlationData={}", cause, JsonsKt.toJsonPretty(correlationData));
                } else {
                    log.info("消息投递exchange失败,原因={}", cause);
                }
            }
        });
        rabbitTemplate.setReturnsCallback(returnCallback -> {
            int replyCode = returnCallback.getReplyCode();
            String exchange = returnCallback.getExchange();
            String routingKey = returnCallback.getRoutingKey();
            String replyText = returnCallback.getReplyText();
            log.error("消息发送失败,应答码={},交换机={},路由={},原因={}", replyCode, exchange, routingKey, replyText);
        });

        rabbitTemplate.setRetryTemplate(RetryTemplate.builder()
                .maxAttempts(3)
                .exponentialBackoff(100, 2.0, 10000)
                .retryOn(IOException.class).traversingCauses().build()
        );
    }
}
