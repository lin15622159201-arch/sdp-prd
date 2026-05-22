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
public class TemuWarehouseRouteDTO {
    /** 站点ID列表（必填） */
    private List<Integer> siteIdList;

    /** 仓库ID（必填） */
    private String warehouseId;
}
