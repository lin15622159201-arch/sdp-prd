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
 * 商品SKU 规格表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "product_sku_spec")
public class ProductSkuSpec extends BaseMessageEntity {
    /**
     * 商品SKU规格 id
     */
    @TableId(value = "sku_spec_id", type = IdType.INPUT)
    private Long skuSpecId;

    /**
     * 商品 ID
     */
    @TableField("product_id")
    private Long productId;

    /**
     * SKC id
     */
    @TableField("product_skc_id")
    private Long productSkcId;

    /**
     * SKU id
     */
    @TableField("product_sku_id")
    private Long productSkuId;

    /**
     * 规格 id
     */
    @TableField("spec_id")
    private Long specId;

    /**
     * 规格名称
     */
    @TableField("spec_name")
    private String specName;

    /**
     * 父规格 id
     */
    @TableField("parent_spec_id")
    private Long parentSpecId;

    /**
     * 父规格名称
     */
    @TableField("parent_spec_name")
    private String parentSpecName;

}
