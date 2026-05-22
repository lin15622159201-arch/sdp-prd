package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;

/**
 * Temu-商品搜索SKU
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/31 18:23
 */
@Data
public class TemuSearchSkuResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = -1056090475691257389L;
    /**
     * 货品sku Id
     */
    private Long skuId;

}
