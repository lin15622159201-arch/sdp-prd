package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;

/**
 * Temu商品站点供应商价格信息
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/17 18:32
 */
@Data
public class TemuProductSiteSupplierPriceResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = -1761798643117604012L;
    private String priceReviewStatus;
    private Integer siteId;
    private Integer supplierPrice;
}
