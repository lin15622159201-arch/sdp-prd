package tech.tiangong.sdp.vo.resp;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 商品-SKC-主销售属性
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/13 11:39
 */
@Data
public class ProductSkcMainSpecResp implements Serializable {
    @Serial
    private static final long serialVersionUID = 1517713923776836525L;
    /**
     * 商品SKU规格 id
     */
    private Long skuSpecId;

    /**
     * 商品 ID
     */
    private Long productId;

    /**
     * 商品SKC id
     */
    private Long productSkcId;
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
