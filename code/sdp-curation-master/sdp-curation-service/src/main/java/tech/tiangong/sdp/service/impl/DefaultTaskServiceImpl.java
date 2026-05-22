package tech.tiangong.sdp.service.impl;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.extra.spring.SpringUtil;
import com.rabbitmq.client.Channel;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.amqp.EventMessage;
import tech.tiangong.sdp.amqp.RabbitConsumer;
import tech.tiangong.sdp.amqp.RabbitProducer;
import tech.tiangong.sdp.amqp.TaskMessageDTO;
import tech.tiangong.sdp.common.req.AiTaskCallbackReq;
import tech.tiangong.sdp.common.req.BaseTenantUserReq;
import tech.tiangong.sdp.component.JavaTransactionalManager;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.entity.BaseTenantUserEntity;
import tech.tiangong.sdp.entity.BasicTask;
import tech.tiangong.sdp.enums.RabbitConfigEnum;
import tech.tiangong.sdp.external.SdpMaterialDesignerApi;
import tech.tiangong.sdp.service.BasicService;
import tech.tiangong.sdp.service.component.RedissonHelper;
import tech.tiangong.sdp.utils.UserInvoke;
import tech.tiangong.sdp.vo.dto.DesignerDTO;

import javax.validation.ValidationException;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.Callable;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Supplier;

/**
 * DefaultTaskServiceImpl
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 15:18
 */
@Slf4j
abstract class DefaultTaskServiceImpl implements BasicService {
    protected final RabbitProducer rabbitProducer = SpringUtil.getBean(RabbitProducer.class);
    protected final RabbitConsumer rabbitConsumer = SpringUtil.getBean(RabbitConsumer.class);
    protected final JavaTransactionalManager javaTransactionalManager = SpringUtil.getBean(JavaTransactionalManager.class);
    protected final RedissonHelper redissonHelper = SpringUtil.getBean(RedissonHelper.class);

    protected <T extends BasicTask> void send(final T task, final RabbitConfigEnum config) {
        this.send(task, JsonsKt.toJson(new TaskMessageDTO(task.getTaskId())), config);
    }

    protected <T extends BaseTenantUserEntity> void send(final T task, final String body, final RabbitConfigEnum config) {
        final var message = BasicConvert.eventMessage(task, config);
        message.setBody(body);
        this.send(message);
    }

    protected void send(final EventMessage message) {
        this.rabbitProducer.send(message);
    }

    protected <T extends BasicTask> void handle(final Message message, final Channel channel,
                                                final Function<Long, T> task, final Consumer<T> fn) {
        rabbitConsumer.handle(message, channel, () -> {
            final var dto = BasicConvert.message2DTO(message);
            Optional.ofNullable(task.apply(dto.getTaskId()))
                    .ifPresentOrElse(fn, () -> log.warn("任务消费失败【{}】,任务不存在", dto.getTaskId()));
        }, e -> log.error("任务消费失败,{}", e.getLocalizedMessage(), e));
    }

    protected <T> void sendNotTaskId(final T task, final RabbitConfigEnum config) {
        final var message = BasicConvert.eventMessage2(config);
        message.setBody(JsonsKt.toJson(task));
        this.rabbitProducer.send(message);
    }


    protected <T> void handleWithNotTaskId(final Message message, final Channel channel,
                                           final Function<byte[], T> converter, final Consumer<T> fn) {
        rabbitConsumer.handle(message, channel, () -> {
            T taskObj = converter.apply(message.getBody());
            fn.accept(taskObj);
        }, e -> log.error("任务消费失败,{}", e.getLocalizedMessage(), e));
    }


    protected <R> void transaction(final Supplier<R> supplier) {
        javaTransactionalManager.exec(supplier);
    }

    protected void transaction(final Runnable r) {
        transaction(() -> {
            r.run();
            return 0;
        });
    }
    protected void afterCommit(final Runnable r) {
        javaTransactionalManager.afterCommit(r::run);
    }

    protected void lock(final String key, Long time, final Runnable fn) {
        redissonHelper.lock(key, time, () -> {
            fn.run();
            return 0;
        });
    }

    protected <T> void execOrElse(final T task, final Consumer<T> action, final Runnable run) {
        Optional.ofNullable(task).ifPresentOrElse(action, run);
    }

    protected <T> void execOrElseNotEx(final T task, final Consumer<T> action, final Runnable run) {
        Optional.ofNullable(task).ifPresentOrElse(t -> {
            try {
                action.accept(t);
            } catch (Exception e) {
                log.error("执行失败\t{}", e.getLocalizedMessage(), e);
            }
        }, () -> {
            try {
                run.run();
            } catch (Exception e) {
                log.error("执行失败\t{}", e.getLocalizedMessage(), e);
            }
        });
    }

    protected <T extends BaseTenantUserEntity, R> R doAsUser(final T task, final Callable<R> call) {
        return UserInvoke.INSTANCE.doAction(task, () -> {
            try {
                return call.call();
            } catch (Exception e) {
                throw new BusinessException(e);
            }
        });
    }

    protected <T extends BaseTenantUserEntity> void doAsUser(final T task, final Runnable run) {
        doAsUser(task, () -> {
            run.run();
            return 0;
        });
    }

    protected <T extends BaseTenantUserReq> void doAsUser(final T req, final Runnable run) {
        UserInvoke.INSTANCE.doAction(req, () -> {
            run.run();
            return 0;
        });
    }

    protected void designer() {
        if (!SdpMaterialDesignerApi.designer()) {
            throw new ValidationException("当前用户非设计师,不允许操作");
        }
    }

    protected List<DesignerDTO> selectByDesignerIds(List<Long> designerIds) {
        if (CollectionUtil.isEmpty(designerIds)) {
            return Collections.emptyList();
        }
        List<String> strIds = designerIds.stream()
                .map(String::valueOf)
                .toList();
        return SdpMaterialDesignerApi.selectByDesignerIds(strIds);
    }

    protected void tryFinally(final Runnable exec, final Consumer<Exception> ex, final Runnable fn) {
        try {
            exec.run();
        } catch (Exception e) {
            ex.accept(e);
        } finally {
            fn.run();
        }
    }

    @Override
    public void job() {

    }

    @Override
    public void callback(AiTaskCallbackReq req) {

    }

    @Override
    public void pushTask(Message message, Channel channel) throws IOException {

    }

    @Override
    public void suspendTask(Message message, Channel channel) {

    }

    @Override
    public void pushTask(Long taskId) {

    }
}
