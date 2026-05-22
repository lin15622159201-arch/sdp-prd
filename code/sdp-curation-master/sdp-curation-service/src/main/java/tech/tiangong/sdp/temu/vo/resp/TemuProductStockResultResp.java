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
public class TemuProductStockResultResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 6309099929495258758L;
    private List<TemuProductSkuStockResp> productSkuStockList;
}
