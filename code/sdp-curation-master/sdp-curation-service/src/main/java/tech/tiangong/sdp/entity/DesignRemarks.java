package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
* 设计打版备注信息
* <br>CreateDate August 10,2021
* @author lujunxuan
* @since 1.0
*/
@Data
@TableName(value = "design_remarks")
public class DesignRemarks implements Serializable {
    private static final long serialVersionUID = -1515946512456511074L;
    /**
      * 自增id
      */
    @TableId(value = "design_remarks_id", type = IdType.INPUT)
    private Long designRemarksId;
    /**
     * 业务id
     */
    @TableField(value = "biz_id")
    private Long bizId;

    /**
     * 业务子id 如：BOM单具体的某个物料主键id
     */
    @TableField(value = "biz_child_id")
    private Long bizChildId;

    /**
     * 业务类型
     */
    @TableField(value = "biz_type")
    private String bizType;

    /**
     * 成衣SPU(款式SPU)。SPU+年份+6位流水号
     */
    @TableField(value = "style_code")
    private String styleCode;

    /**
     * 设计款号。 skc+年月日+4位流水号
     */
    @TableField(value = "design_code")
    private String designCode;

    /**
     * 业务版本号
     */
    @TableField(value = "biz_version_num")
    private Integer bizVersionNum;

    /**
     * 备注信息
     */
    @TableField(value = "remark")
    private String remark;

    /**
     * 暂存状态: 0:非暂存; 1,暂存; (默认0)
     */
    @TableField(value = "transient_state")
    private Integer transientState;

    /**
     * 操作人id
     */
    @TableField(value = "creator_id" , fill = FieldFill.INSERT)
    private Long creatorId;

    /**
     * 操作人名称
     */
    @TableField(value = "created_name")
    private String createdName;

    /**
     * 创建时间
     */
    @TableField(value = "created_time" , fill = FieldFill.INSERT)
    private LocalDateTime createdTime;

}