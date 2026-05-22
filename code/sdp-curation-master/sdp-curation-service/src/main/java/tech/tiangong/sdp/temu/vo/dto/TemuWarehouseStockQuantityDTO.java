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
public class TemuWarehouseStockQuantityDTO {
    /** 当前库存 */
    private Integer currentStockAvailable;

    /** 目标库存 */
    private Integer targetStockAvailable;
    /** 仓库ID（必填） */
    private String warehouseId;
}
