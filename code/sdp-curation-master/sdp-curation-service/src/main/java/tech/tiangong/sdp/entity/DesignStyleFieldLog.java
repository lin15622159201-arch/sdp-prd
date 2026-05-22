package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * SPU字段变更日志
 * <p>记录每次SPU编辑时，具体字段的旧值→新值变更</p>
 *
 * @author auto-generated
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "design_style_field_log")
public class DesignStyleFieldLog implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.INPUT)
    private Long id;

    /**
     * SPU ID
     */
    @TableField(value = "design_style_id")
    private Long designStyleId;

    /**
     * SPU编码
     */
    @TableField(value = "style_code")
    private String styleCode;

    /**
     * 版本号（变更后的版本号）
     */
    @TableField(value = "version_num")
    private Integer versionNum;

    /**
     * 字段名（Java属性名，驼峰）
     */
    @TableField(value = "field_name")
    private String fieldName;

    /**
     * 字段中文名
     */
    @TableField(value = "field_label")
    private String fieldLabel;

    /**
     * 旧值
     */
    @TableField(value = "old_value")
    private String oldValue;

    /**
     * 新值
     */
    @TableField(value = "new_value")
    private String newValue;

    /**
     * 租户ID
     */
    @TableField(value = "tenant_id")
    private String tenantId;

    /**
     * 操作人ID
     */
    @TableField(value = "creator_id")
    private Long creatorId;

    /**
     * 操作人名称
     */
    @TableField(value = "creator_name")
    private String creatorName;

    /**
     * 创建时间
     */
    @TableField(value = "create_time")
    private LocalDateTime createTime;
}
