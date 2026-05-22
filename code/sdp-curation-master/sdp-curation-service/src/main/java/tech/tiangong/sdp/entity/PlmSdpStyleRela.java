package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import tech.tiangong.sdp.convert.BasicConvert;

import java.util.Objects;

/**
 * PLM-SDP款式管理编码关联表实体类
 *
 * @author while
 */
@Data
@Accessors(chain = true)
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@TableName(value = "plm_sdp_style_rela", autoResultMap = true)
public class PlmSdpStyleRela extends BasicMessageTask {
    /**
     * 任务ID，spu或者skc表主键ID
     */
    @TableId(value = "task_id", type = IdType.INPUT)
    private Long taskId;

    /**
     * 父任务ID
     */
    @TableField(value = "parent_id")
    private Long parentId;
    /**
     * 操作ID
     */
    @TableField(value = "log_id")
    private Long logId;
    /**
     * PLM-任务编号
     */
    @TableField(value = "plm_task_code")
    private String plmTaskCode;

    /**
     * 任务状态：0-未同步，1-同步成功；2-同步失败
     */
    @TableField(value = "task_status")
    private Integer taskStatus;

    /**
     * 拉取次数
     */
    @TableField(value = "pull_count")
    private Integer pullCount;

    public boolean pushed() {
        return Objects.equals(this.requireTaskStatus(), 1);
    }

    public int requireTaskStatus() {
        return Objects.requireNonNullElse(this.taskStatus, 0);
    }

    public boolean yesSpu() {
        return Objects.equals(Objects.requireNonNullElse(this.parentId, 0L), this.parentId);
    }

    public boolean yesSkc() {
        return Objects.requireNonNullElse(this.parentId, 0L) > 0L;
    }
}
