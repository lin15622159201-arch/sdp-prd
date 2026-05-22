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
 * SKU 站点供货价表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "product_sku_site_supplier_price")
public class ProductSkuSiteSupplierPrice extends BaseMessageEntity {

    /**
     * 主键 ID
     */
    @TableId(value = "supplier_price_id", type = IdType.INPUT)
    private Long supplierPriceId;

    /**
     * 商品 ID
     */
    @TableField("product_id")
    private Long productId;

    /**
     * 商品SKU ID
     */
    @TableField("product_sku_id")
    private Long productSkuId;

    /**
     * 站点申报价格，单位 人民币：分，美元：美分
     */
    @TableField("supplier_price")
    private BigDecimal supplierPrice;
    /**
     * 站点供货价格，单位 人民币：分，美元：美分
     */
    @TableField("supply_price")
    private BigDecimal supplyPrice;

    /**
     * 申报价格站点 id
     */
    @TableField("site_id")
    private Long siteId;

}
