package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.butted.common.enums.TaskStatusEnum;
import tech.tiangong.sdp.enums.TaskStatusViewEnum;

import java.util.Objects;

/**
 * 任务基础实体类
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/19 10:19
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class BasicTask extends BasicMessageTask {
    /**
     * 任务ID
     */
    @TableId(value = "task_id", type = IdType.INPUT)
    private Long taskId;
    /**
     * 任务编码
     */
    @TableField(value = "task_code")
    private String taskCode;
    /**
     * 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；
     *
     * @see TaskStatusEnum
     */
    @TableField(value = "task_status")
    private Integer taskStatus;

    public boolean end() {
        return TaskStatusViewEnum.finished(this.taskStatus);
    }

    public boolean failedOrCanceled() {
        return TaskStatusViewEnum.failedOrAborted(this.taskStatus);
    }

    public boolean failed() {
        return TaskStatusViewEnum.failed(this.taskStatus);
    }

    public boolean canceled() {
        return TaskStatusViewEnum.aborted(this.taskStatus);
    }

    public boolean completed() {
        return TaskStatusViewEnum.completed(this.taskStatus);
    }

    public boolean processing() {
        return TaskStatusViewEnum.processing(this.taskStatus);
    }

    public boolean queueing() {
        return Objects.equals(TaskStatusEnum.QUEUEING.getCode(), this.taskStatus);
    }

    public boolean queueingOrProcessing() {
        return queueing() || processing();
    }
    public int requireTaskStatus() {
        return Objects.requireNonNullElse(this.taskStatus, 0);
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getTaskCode() {
        return taskCode;
    }

    public void setTaskCode(String taskCode) {
        this.taskCode = taskCode;
    }

    public Integer getTaskStatus() {
        return taskStatus;
    }

    public void setTaskStatus(Integer taskStatus) {
        this.taskStatus = taskStatus;
    }
}
