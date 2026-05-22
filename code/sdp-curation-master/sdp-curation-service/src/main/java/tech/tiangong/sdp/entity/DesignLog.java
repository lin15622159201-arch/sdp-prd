package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
* 设计打版操作日志
* <br>CreateDate August 10,2021
* @author lujunxuan
* @since 1.0
*/
@Data
@TableName(value = "design_log")
public class DesignLog implements Serializable {
    private static final long serialVersionUID = -1698580294206216185L;
    /**
      * 自增id
      */
    @TableId(value = "design_log_id", type = IdType.INPUT)
    private Long designLogId;
    /**
     * 业务id
     */
    @TableField(value = "biz_id")
    private Long bizId;

    /**
     * 业务类型
     */
    @TableField(value = "biz_type")
    private String bizType;

    /**
     * 成衣SPU(款式SPU)
     */
    @TableField(value = "style_code")
    private String styleCode;

    /**
     * 设计款号
     */
    @TableField(value = "design_code")
    private String designCode;

    /**
     * 业务版本号
     */
    @TableField(value = "biz_version_num")
    private Integer bizVersionNum;

    /**
     * 日志信息
     */
    @TableField(value = "content")
    private String content;

    /**
     * 操作人id
     */
    @TableField(value = "creator_id" , fill = FieldFill.INSERT)
    private Long creatorId;

    /**
     * 操作人名称
     */
    @TableField(value = "creator_name", fill = FieldFill.INSERT)
    private String creatorName;

    /**
     * 创建时间
     */
    @TableField(value = "created_time" , fill = FieldFill.INSERT)
    private LocalDateTime createdTime;

}