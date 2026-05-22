package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import team.aikero.blade.core.enums.Bool;

import java.time.LocalDateTime;
import java.util.Objects;

/**
 * 飞书通知日志表(feishu_notice_log)实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "feishu_notice_log")
public class FeishuNoticeLog extends BaseMessageEntity {
    /**
     * 操作ID
     */
    @TableId(value = "log_id", type = IdType.INPUT)
    private Long logId;
    /**
     * 业务Id
     */
    @TableField(value = "bus_id")
    private Long busId;

    /**
     * 业务类型
     */
    @TableField("bus_type")
    private String busType;

    /**
     * 日志类型
     */
    @TableField("log_type")
    private String logType;

    /**
     * 推送状态：0-未推送；1-已推送；2-推送失败
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
     * 日志内容 - JSON类型
     */
    @TableField(value = "content")
    private String content;
    /**
     * 结果 - JSON类型
     */
    @TableField(value = "response_data")
    private String responseData;

    public boolean needPush() {
        return pushStatus != Bool.YES.getCode();
    }

    public int requirePushTimes() {
        return Objects.requireNonNullElse(this.pushTimes, 0);
    }
}
