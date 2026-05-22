package tech.tiangong.sdp.amqp;


import com.rabbitmq.client.Channel;
import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.stereotype.Component;
import tech.tiangong.sdp.util.ExecutorUtils;
import tech.tiangong.sdp.utils.UserInvoke;

import java.io.IOException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.function.Consumer;

/**
 * Rabbit消费者
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/20 18:23
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class RabbitConsumer implements AutoCloseable {
    private final ExecutorService executor = ExecutorUtils.get("amqpConsumerPool", 4096);

    public void handle(final Message message, final Channel channel, final Runnable succeed, final Consumer<Throwable> fail) {
        CompletableFuture.runAsync(() -> exec(message, channel, succeed, fail), executor)
                // 8分钟线程超时
//                .orTimeout(1000 * 60 * 2 * 2 * 2, TimeUnit.MICROSECONDS)
                .exceptionally(e -> {
                    fail.accept(e);
                    return null;
                })
        ;
    }

    @PreDestroy
    @Override
    public void close() {
        ExecutorUtils.shutdownExecutor(executor);
    }

    private void exec(final Message message, final Channel channel, final Runnable succeed, final Consumer<Throwable> fail) {
        final var headers = message.getMessageProperties().getHeaders();
        final var userId = (Long) headers.get("operatorId");
        final var userName = (String) headers.get("operatorName");
        final var tenantId = (Long) headers.get("tenantId");
        UserInvoke.INSTANCE.doAction(userId, userName, tenantId, () -> {
            try {
                succeed.run();
            } catch (Exception e) {
                fail.accept(e);
            } finally {
                basicAck(message, channel);
            }
            return 0;
        });
//        UserContexts.withUser(UserInvoke.INSTANCE.user(userId, userName, tenantId, null), () -> {
//            try {
//                succeed.run();
//            } catch (Exception e) {
//                fail.accept(e);
//            } finally {
//                basicAck(message, channel);
//            }
//        });
    }

    private void basicAck(final Message message, final Channel channel) {
        long tag = message.getMessageProperties().getDeliveryTag();
        try {
            channel.basicAck(tag, false);
        } catch (IOException e) {
            log.error("basicAck error\t{}", e.getMessage(), e);
            try {
                channel.basicNack(tag, false, false);
            } catch (IOException ex) {
                log.error("basicNack error\t{}", e.getMessage(), e);
            }
        }
    }
}
