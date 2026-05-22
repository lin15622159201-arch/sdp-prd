package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Objects;

/**
 * 基础实体
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 14:48
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class BasicBinTask extends BasicTask {
    /**
     * 父任务ID
     */
    @TableField(value = "parent_id")
    private Long parentId;
    /**
     * 任务状态
     */
    @TableField(value = "task_state")
    private Integer taskState;
    /**
     * 推送状态
     */
    @TableField(value = "push_status")
    private Integer pushStatus;
    /**
     * 需要进行的任务
     */
    @TableField(value = "required_task")
    private Integer requiredTask;
    public int requirePushStatus() {
        return Objects.requireNonNullElse(this.pushStatus, 0);
    }

    public int requireTaskState() {
        return Objects.requireNonNullElse(this.taskState, 0);
    }
    public int requiredTask() {
        return Objects.requireNonNullElse(this.requiredTask, 0);
    }
}
