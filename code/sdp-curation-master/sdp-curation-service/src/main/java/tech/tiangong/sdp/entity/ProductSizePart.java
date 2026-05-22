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
 * 商品 尺码部位表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "product_size_part")
public class ProductSizePart extends BaseMessageEntity {

    /**
     * 主键 id
     */
    @TableId(value = "size_part_id", type = IdType.AUTO)
    private Long sizePartId;

    /**
     * 商品 ID
     */
    @TableField("product_id")
    private Long productId;

    /**
     * 商品尺码模板
     */
    @TableField("product_size_id")
    private Long productSizeId;

    /**
     * 部位 id
     */
    @TableField("part_id")
    private Long partId;

    /**
     * 部位名称
     */
    @TableField("part_name")
    private String partName;

    /**
     * 部位值
     */
    @TableField("part_value")
    private BigDecimal partValue;

    /**
     * 部位档差值
     */
    @TableField("part_diff")
    private BigDecimal partDiff;

    /**
     * 尺码
     */
    @TableField("size")
    private String size;

    /**
     * 平台尺码
     */
    @TableField("platform_size")
    private String platformSize;
}
