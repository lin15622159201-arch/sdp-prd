package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品站点供应商价格信息
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/17 18:32
 */
@Data
public class TemuProductSkuSupplierPriceResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = -8944537004184469082L;
    private String currencyType;
    private Long productSkuId;
    private Long productId;
    private List<TemuProductSiteSupplierPriceResp> siteSupplierPrices;
    private Long productSkcId;
    private Integer supplierPrice;
}
