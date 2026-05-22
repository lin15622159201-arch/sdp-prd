package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品SKU库存信息
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/17 18:32
 */
@Data
public class TemuProductSkuStockResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 5025843068948140954L;
    private Long productSkuId;
    private Integer skuStockQuantity;
    private String warehouseId;
    private Boolean enablePreSale;
    private Integer preSaleDeliveryDay;
    private Integer preSaleStockQuantity;
    private Integer shippingMode;
    private String warehouseName;
    private Integer tempLockQuantity;
}
