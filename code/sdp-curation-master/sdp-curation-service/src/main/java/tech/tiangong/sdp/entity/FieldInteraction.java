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
 * 字段交互
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "field_interaction")
public class FieldInteraction extends BaseMessageEntity {
    @TableId(value = "interaction_id", type = IdType.INPUT)
    private Long interactionId;

    @TableField("field_id")
    private Long fieldId;

    @TableField("source_field_id")
    private Long sourceFieldId;

    @TableField("interaction_config")
    private String interactionConfig;

}
