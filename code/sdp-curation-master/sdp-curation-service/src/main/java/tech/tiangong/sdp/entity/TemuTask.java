package tech.tiangong.sdp.entity;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.enums.TemuTaskOptTypeEnum;

import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Temu任务表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "temu_task")
public class TemuTask extends BasicTask {
    /**
     * 商品 ID
     */
    @TableField("product_id")
    private Long productId;
    /**
     * 父级 ID
     */
    @TableField("parent_id")
    private Long parentId;

    /**
     * 业务主键 ID
     */
    @TableField("bus_id")
    private Long busId;

    /**
     * 任务类型
     */
    @TableField("task_type")
    private String taskType;

    /**
     * 操作类型
     */
    @TableField("opt_type")
    private String optType;

    /**
     * 结果
     */
    @TableField("response_data")
    private String responseData;

    /**
     * 推送状态：0-未推送；1-已推送；2-推送失败,3:任务取消
     */
    @TableField("push_status")
    private Integer pushStatus;

    /**
     * 推送时间
     */
    @TableField("push_time")
    private LocalDateTime pushTime;

    /**
     * 推送次数
     */
    @TableField("push_times")
    private Integer pushTimes;

    /**
     * 拉取时间
     */
    @TableField("pull_time")
    private LocalDateTime pullTime;

    /**
     * 拉取次数
     */
    @TableField("pull_times")
    private Integer pullTimes;

    /**
     * 同步给业务状态：0-未同步；1-已同步
     */
    @TableField("sync_status")
    private Integer syncStatus;

    /**
     * 同步时间
     */
    @TableField("sync_time")
    private LocalDateTime syncTime;

    /**
     * 同步次数
     */
    @TableField("sync_times")
    private Integer syncTimes;

    public int requirePushTimes() {
        return Objects.requireNonNullElse(this.pushTimes, 0);
    }

    public int requirePushStatus() {
        return Objects.requireNonNullElse(this.pushStatus, 0);
    }

    public boolean parent() {
        return Objects.requireNonNullElse(this.parentId, 0L) < 1L;
    }

    public boolean failed() {
        return requirePushStatus() > 1;
    }

    public boolean succeed() {
        return Objects.equals(Bool.YES.getCode(), requirePushStatus());
    }

    public boolean add() {
        return StrUtil.equalsIgnoreCase(TemuTaskOptTypeEnum.ADD.getCode(), this.optType);
    }

    public boolean addSucceed() {
        return add() && succeed();
    }
}
