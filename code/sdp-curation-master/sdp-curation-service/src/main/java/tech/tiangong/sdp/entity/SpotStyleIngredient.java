package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * 现货成分(spot_style_ingredient)实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "spot_style_ingredient")
public class SpotStyleIngredient extends BaseTenantUserEntity {

    /**
     * 成分ID
     */
    @TableId(value = "ingredient_id", type = IdType.INPUT)
    private Long ingredientId;
    /**
     * 任务ID
     */
    @TableField(value = "task_id")
    private Long taskId;
    /**
     * 成分编码
     */
    @TableField(value = "ingredient_code")
    private String ingredientCode;

    /**
     * 成分名称
     */
    @TableField(value = "ingredient_name")
    private String ingredientName;

    /**
     * 成分比例
     */
    @TableField(value = "ingredient_ratio")
    private BigDecimal ingredientRatio;
}
