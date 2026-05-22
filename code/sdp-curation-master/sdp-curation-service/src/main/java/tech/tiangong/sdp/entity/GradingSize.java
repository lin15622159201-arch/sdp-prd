package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import java.math.BigDecimal;

/**
 * 放码尺寸表(GradingSize)表实体类
 *
 * @author liuhongfu
 * @since 2025-12-17 15:39:12
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "grading_size", autoResultMap = true)
public class GradingSize extends BasicMessageTask {

    @TableId(value = "grading_size_id", type = IdType.INPUT)
    private Long gradingSizeId;

    /**
     * 放码尺寸编码
     */
    @TableField("grading_size_code")
    private String gradingSizeCode;

    /**
     * 放码数量
     */
    @TableField("grading_number")
    private BigDecimal gradingNumber;

    /**
     * 品类尺码
     */
    @TableField("category_size")
    private String categorySize;

    /**
     * 品类
     */
    @TableField("category_code")
    private String categoryCode;

    /**
     * 品类名称
     */
    @TableField("category_name")
    private String categoryName;

    /**
     * 部位编码
     */
    @TableField("position_code")
    private String positionCode;

    /**
     * 部位名称
     */
    @TableField("position_name")
    private String positionName;

    /**
     * 部位标签
     */
    @TableField("position_label")
    private String positionLabel;

    /**
     * 款式编码
     */
    @TableField("style_code")
    private String styleCode;

    /**
     * 款式名称
     */
    @TableField("style_name")
    private String styleName;

    /**
     * 默认的：0-否；1-是
     */
    @TableField("acquiescent")
    private Integer acquiescent;

    /**
     * 最小尺寸
     */
    @TableField("min_size")
    private BigDecimal minSize;

    /**
     * 最大尺寸
     */
    @TableField("max_size")
    private BigDecimal maxSize;

    /**
     * 均值
     */
    @TableField("mean")
    private BigDecimal mean;

    /**
     * 放码规则
     */
    @TableField("grading_rule")
    private String gradingRule;

}
