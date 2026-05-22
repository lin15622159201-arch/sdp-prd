package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tech.tiangong.sdp.convert.BasicConvert;

import java.util.Objects;

/**
 * 买手分码表
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/2 18:34
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "spot_buyer_code")
public class SpotBuyerCode extends BaseMessageEntity {
    // 推送成功
    public static final int PUSH_Y = 0b000000000000000000000001;
    // 同步成功
    public static final int SYNC_Y = 0b000000000000000000000010;
    /**
     * 任务ID
     */
    @TableId(value = "task_id", type = IdType.INPUT)
    private Long taskId;
    /**
     * 操作ID
     */
    @TableField(value = "log_id")
    private Long logId;
    /**
     * 父任务ID
     */
    @TableField(value = "parent_id")
    private Long parentId;
    /**
     * 买手编码
     */
    @TableField(value = "gen_code")
    private String genCode;

    /**
     * 分码状态
     */
    @TableField(value = "code_status")
    private Integer codeStatus;

    public boolean pushed() {
        return BasicConvert.contains(requireCodeStatus(), PUSH_Y);
    }

    public int requireCodeStatus() {
        return Objects.requireNonNullElse(this.codeStatus, 0);
    }
    public boolean yesSpu() {
        return Objects.equals(Objects.requireNonNullElse(this.parentId, 0L),this.parentId);
    }
    public boolean yesSkc() {
        return Objects.requireNonNullElse(this.parentId, 0L) > 0L;
    }
}
