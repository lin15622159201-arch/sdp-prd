package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuReq;

import java.io.Serial;

/**
 * Temu商品-同意核价单建议价
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuProductPriceItemReq implements TemuReq {
    @Serial
    private static final long serialVersionUID = -3548494248514595454L;
    /**
     * SKU ID
     */
    private Long productSkuId;
    /**
     * 价格 分
     */
    private String price;
}
