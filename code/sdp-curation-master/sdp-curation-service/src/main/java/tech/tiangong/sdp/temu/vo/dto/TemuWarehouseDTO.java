package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

import java.util.List;

/**
 * TemuWarehouseDTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:06
 */
@Data
public class TemuWarehouseDTO {
    /**
     * 仓库是否失效
     */
    private Boolean warehouseDisable;

    /**
     * 仓库 ID
     */
    private String warehouseId;

    /**
     * 仓库名称
     */
    private String warehouseName;

    /**
     * 仓库类型
     * 0: 三方仓, 1:自建仓, 2:家庭仓, 3:其他(仅适用于9个工作日发货时效的商品)
     */
    private String managementType;
}
