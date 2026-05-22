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
 * 校验规则
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "validation_rule")
public class ValidationRule extends BaseMessageEntity {

    @TableId(value = "rule_id", type = IdType.INPUT)
    private Long ruleId;

    @TableField("rule_code")
    private String ruleCode;

    @TableField("rule_name")
    private String ruleName;

    @TableField("rule_status")
    private Integer ruleStatus;
}
