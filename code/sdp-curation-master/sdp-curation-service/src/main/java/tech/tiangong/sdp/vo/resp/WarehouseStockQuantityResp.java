package tech.tiangong.sdp.vo.resp;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 商品-库存
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/13 15:16
 */
@Data
public class WarehouseStockQuantityResp implements Serializable {
    @Serial
    private static final long serialVersionUID = -7043412473040347775L;
    /**
     * 主键 ID
     */
    private Long warehouseRouteId;

    /**
     * 商品 ID
     */
    private Long productId;

    /**
     * 商品SKU ID
     */
    private Long productSkuId;
    /**
     * 默认传:0
     */
    private String targetStockAvailable;
    /**
     * 仓库 ID
     */
    private String warehouseId;
}
