package tech.tiangong.sdp.vo.resp.yoc;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * YOC商品SKU审核信息-响应
 *
 * @author while
 * @since 1.0.0
 */
@Data
public class YocProductSkuResp implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 商品SKU ID
     */
    private Long productSkuId;

    /**
     * SKU ID
     */
    private Long skuId;

    /**
     * SKU编码
     */
    private String skuCode;

    /**
     * 供货价
     */
    private BigDecimal supplierPrice;
}
