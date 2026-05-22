package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

import java.util.List;

/**
 * WarehouseRoute
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:06
 */
@Data
public class TemuProductSkuStockQuantityDTO {
    /**
     * 发货仓库存库存请求列表
     */
    private List<TemuWarehouseStockQuantityDTO> warehouseStockQuantityReqs;
    /**
     * 货品skc外部编码，没有的场景传空字符串
     */
    private String extCode;
}
