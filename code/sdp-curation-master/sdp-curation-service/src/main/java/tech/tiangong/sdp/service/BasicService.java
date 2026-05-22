package tech.tiangong.sdp.service;

import com.rabbitmq.client.Channel;
import org.springframework.amqp.core.Message;
import tech.tiangong.sdp.common.req.AiTaskCallbackReq;

import java.io.IOException;

/**
 * 任务基础Service
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/19 16:42
 */
public interface BasicService {
    void job();
    void callback (AiTaskCallbackReq req) ;
    void pushTask(Message message, Channel channel) throws IOException;
    void suspendTask(Message message, Channel channel);
    void pushTask(Long taskId);
}
