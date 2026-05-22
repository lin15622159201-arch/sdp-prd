package tech.tiangong.sdp.vo.resp;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 商品-SKU规格
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/13 15:10
 */
@Data
public class ProductSkuSpecResp implements Serializable {
    @Serial
    private static final long serialVersionUID = 4680714637064684643L;
    /**
     * 商品SKU规格 id
     */
    private Long skuSpecId;

    /**
     * 商品 ID
     */
    private Long productId;

    /**
     * SKC id
     */
    private Long productSkcId;

    /**
     * SKU id
     */
    private Long productSkuId;
    /**
     * 父规格 id
     */
    private Integer parentSpecId;
    /**
     * 父规格名称
     */
    private String parentSpecName;
    /**
     * 规格 id
     */
    private Integer specId;
    /**
     * 规格名称
     */
    private String specName;
}
