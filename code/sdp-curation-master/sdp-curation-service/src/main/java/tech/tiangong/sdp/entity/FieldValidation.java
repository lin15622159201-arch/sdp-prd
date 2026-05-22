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
 * 字段校验
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "field_validation")
public class FieldValidation extends BaseMessageEntity {
    @TableId(value = "validation_id", type = IdType.INPUT)
    private Long validationId;

    @TableField("field_id")
    private Long fieldId;

    @TableField("rule_id")
    private Long ruleId;

    @TableField("rule_config")
    private String ruleConfig;

}
