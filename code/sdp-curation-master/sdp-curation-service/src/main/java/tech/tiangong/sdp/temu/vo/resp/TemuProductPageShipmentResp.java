package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * 商品列表查询-货运
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/17 18:32
 */
@Data
public class TemuProductPageShipmentResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 8939411224902188778L;
    private String freightTemplateId;
    private Integer shipmentLimitSecond;
    private List<Integer> warehouseRegionId1List;
}
