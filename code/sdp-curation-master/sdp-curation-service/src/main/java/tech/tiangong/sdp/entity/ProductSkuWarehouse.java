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
 * 发货仓库存表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "product_sku_warehouse")
public class ProductSkuWarehouse extends BaseMessageEntity {
    /**
     * 主键 ID
     */
    @TableId(value = "warehouse_route_id", type = IdType.INPUT)
    private Long warehouseRouteId;

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
     * 目标库存
     */
    @TableField("target_stock_available")
    private String targetStockAvailable;

    /**
     * 仓库 ID
     */
    @TableField("warehouse_id")
    private String warehouseId;
}
