package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuReq;
import tech.tiangong.sdp.temu.vo.dto.TemuWarehouseRouteDTO;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品-货品仓库路由请求
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:04
 */
@Data
public class TemuProductWarehouseRouteReq implements TemuReq {
    @Serial
    private static final long serialVersionUID = -6716197347356247505L;
    /**
     * 目标自发货站点-仓关系（必填）
     */
    private List<TemuWarehouseRouteDTO> targetRouteList;

    /**
     * 当前自发货站点-仓关系（非必填）
     */
    private List<TemuWarehouseRouteDTO> currentRouteList;
}
