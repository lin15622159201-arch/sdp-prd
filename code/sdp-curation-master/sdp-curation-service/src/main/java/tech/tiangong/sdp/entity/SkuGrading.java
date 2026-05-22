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
 * SKU放码表(sku_grading)实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "sku_grading")
public class SkuGrading extends BaseMessageEntity {
    /**
     * 主键 id
     */
    @TableId(value = "sku_grading_id", type = IdType.INPUT)
    private Long skuGradingId;

    /**
     * 款ID
     */
    @TableField("style_id")
    private Long styleId;

    /**
     * 款号
     */
    @TableField("style_code")
    private String styleCode;

    /**
     * SKC ID
     */
    @TableField("skc_id")
    private Long skcId;

    /**
     * SKC 编码
     */
    @TableField("skc_code")
    private String skcCode;

    /**
     * SKU 编码
     */
    @TableField("sku_code")
    private String skuCode;

    /**
     * 放码状态：0；
     */
    @TableField("grading_status")
    private Integer gradingStatus;

    /**
     * 衣长尺寸
     */
    @TableField("clothes_length_size")
    private BigDecimal clothesLengthSize;

    /**
     * 袖长尺寸
     */
    @TableField("sleeve_length_size")
    private BigDecimal sleeveLengthSize;

    /**
     * 裙长尺寸
     */
    @TableField("skirt_length_size")
    private BigDecimal skirtLengthSize;

    /**
     * 裤长尺寸
     */
    @TableField("pant_length_size")
    private BigDecimal pantLengthSize;

    /**
     * 裤内长尺寸
     */
    @TableField("inseam_length_size")
    private BigDecimal inseamLengthSize;

    /**
     * 肩宽尺寸
     */
    @TableField("shoulder_width_size")
    private BigDecimal shoulderWidthSize;

    /**
     * 胸围尺寸
     */
    @TableField("bust_size")
    private BigDecimal bustSize;

    /**
     * 腰围尺寸
     */
    @TableField("waistline_size")
    private BigDecimal waistlineSize;

    /**
     * 臀围尺寸
     */
    @TableField("hipline_size")
    private BigDecimal hiplineSize;

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
     * 尺码标准
     */
    @TableField("size_standard_code")
    private String sizeStandardCode;

    /**
     * 尺码标准名称
     */
    @TableField("size_standard_name")
    private String sizeStandardName;

    /**
     * 尺码名称
     */
    @TableField("size_name")
    private String sizeName;

    /**
     * 尺码
     */
    @TableField("size_code")
    private String sizeCode;

    /**
     * 可用的标签
     */
    @TableField(value = "usable_labels")
    private String usableLabels;

}
