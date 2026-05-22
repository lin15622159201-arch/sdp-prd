package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 创建人
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/11 14:29
 */
@Data
public class CreatorMessageEntity {
    /**
     * 信息备注
     */
    @TableField("message")
    private String message;

    /**
     * 创建人姓名
     */
    @TableField("creator_name")
    private String creatorName;

    /**
     * 创建时间
     */
    @TableField("created_time")
    private LocalDateTime createdTime;
    /**
     * 更新时间
     */
    @TableField("revised_time")
    private LocalDateTime revisedTime;

    /**
     * 逻辑删除：0-否；1-是
     */
    @TableField("deleted")
    private Integer deleted;
}
