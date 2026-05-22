package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * 款审核日志表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "style_review_log")
public class StyleReviewLog extends BaseMessageEntity {

    /**
     * 主键 id
     */
    @TableId(value = "log_id", type = IdType.INPUT)
    private Long logId;

    /**
     * 款式 id
     */
    @TableField("style_id")
    private Long styleId;

    /**
     * 审核状态，0-待审核，1-已通过，2-已驳回
     */
    @TableField("review_status")
    private Integer reviewStatus;

    /**
     * 审核不通过原因
     */
    @TableField("review_fail_reason")
    private String reviewFailReason;

    /**
     * 日志内容
     */
    @TableField("content")
    private String content;
}
