package tech.tiangong.sdp.vo.req;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

/**
 * 商品-库存
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/13 15:16
 */
@Data
public class WarehouseStockQuantityReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 6551704927147823803L;
    /**
     * 主键 ID
     */
    private Long warehouseRouteId;
    /**
     * 默认传:0
     */
    private String targetStockAvailable;
    /**
     * 仓库 ID
     */
    private String warehouseId;
    public boolean add () {
        return Objects.isNull(this.warehouseRouteId) || this.warehouseRouteId < 1;
    }
}
