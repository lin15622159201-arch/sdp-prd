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
 * 货品仓库路由表实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "product_warehouse_route")
public class ProductWarehouseRoute extends BaseMessageEntity {

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
     * 站点 id
     */
    @TableField("site_id")
    private Long siteId;

    /**
     * 仓库 ID
     */
    @TableField("warehouse_id")
    private String warehouseId;
}
