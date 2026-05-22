package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;

/**
 * 商品列表查询-SKU销售扩展
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/17 18:32
 */
@Data
public class TemuProductPageSkuSaleExtAttrResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = -1938302739457047516L;
    private Integer productSkuShippingMode;
    private Integer productSkuIndividuallyPacked;
}
