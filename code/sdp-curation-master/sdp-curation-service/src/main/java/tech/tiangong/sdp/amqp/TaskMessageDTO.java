package tech.tiangong.sdp.amqp;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 任务消息
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/20 18:04
 */
@Data
public class TaskMessageDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -7601734092289601260L;

    public TaskMessageDTO() {
    }

    public TaskMessageDTO(Long taskId) {
        this.taskId = taskId;
    }

    private Long taskId;

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }
}
