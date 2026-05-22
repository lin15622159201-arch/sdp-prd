package tech.tiangong.sdp.vo.req;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 批量发布或关联商品
 */
@Data
public class BatchPublishOrAssociateReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 5045357519325339281L;
    /**
     * 发布新商品 (选择发布新商品时必填)
     */
    private List<Long> styleIds;
    /**
     * 关联商品 (选择关联历史商品时必填)
     */
    private List<AssociateProductReq> associateProductList;

    /**
     * 关联商品请求
     */
    @Data
    public static class AssociateProductReq {
        /**
         * 商品ID (选择关联历史商品时必填)
         */
        private Long productId;
        /**
         * 商品SKC ID (选择关联历史商品时必填)
         */
        private Long productSkcId;
        /**
         * 平台商品ID (选择关联历史商品时必填)
         */
        private Long platformProductId;
        /**
         * 平台商品SKC ID (选择关联历史商品时必填)
         */
        private Long platformSkcId;
        /**
         * 平台SKU列表 (选择关联历史商品时必填)
         */
        private List<AssociateProductSkuReq> platformSkuList;
    }

    @Data
    public static class AssociateProductSkuReq {
        /**
         * 平台SKU ID (选择关联历史商品时必填)
         */
        private Long platformSkuId;
        /**
         * 平台SKU编码 (选择关联历史商品时必填)
         */
        private String extCode;
    }
}
