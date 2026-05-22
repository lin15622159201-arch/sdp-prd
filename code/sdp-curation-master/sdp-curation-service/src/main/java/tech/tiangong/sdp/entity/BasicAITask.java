package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

/**
 * BasicAITask
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/18 11:37
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class BasicAITask extends BasicTask{
    /**
     * 业务主键ID
     */
    @TableField(value = "bus_id")
    private Long busId;
    /**
     * 业务来源
     */
    @TableField(value = "bus_type")
    private String busType;

    /**
     * 推送状态：0-未推送；1-已推送；2-推送失败
     */
    @TableField(value = "push_status")
    private Integer pushStatus;
    /**
     * 推送时间
     */
    @TableField(value = "push_time")
    private LocalDateTime pushTime;
    /**
     * 推送次数
     */
    @TableField(value = "push_times")
    private Integer pushTimes;
    /**
     * 拉取时间
     */
    @TableField(value = "pull_time")
    private LocalDateTime pullTime;

    /**
     * 拉取次数
     */
    @TableField(value = "pull_times")
    private Integer pullTimes;

    /**
     * AI开始处理时间
     */
    @TableField(value = "ai_start_time")
    private LocalDateTime aiStartTime;
    /**
     * AI结束处理时间
     */
    @TableField(value = "ai_end_time")
    private LocalDateTime aiEndTime;
}
