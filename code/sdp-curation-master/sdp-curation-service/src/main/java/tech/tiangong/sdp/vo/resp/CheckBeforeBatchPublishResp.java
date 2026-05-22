package tech.tiangong.sdp.vo.resp;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 *
 * @author ：zhoujiliang@zj.tech
 * @date ：2026/3/23 16:01
 * @version :1.0
 */
@Data
public class CheckBeforeBatchPublishResp {

    /**
     * 选中的商品SKC列表
     */
    private List<CheckSkc> productSkcList;

    @Data
    public static class CheckSkc {
        /**
         * 商品ID
         */
        private Long productId;
        /**
         * 款式ID
         */
        private Long styleId;
        /**
         * 款号
         */
        private String styleCode;
        /**
         * 商品SKC id
         */
        private Long productSkcId;
        /**
         * SKC号
         */
        private String skcCode;
        /**
         * 提示信息
         */
        private String message;
        /**
         * 上次操作上架时间
         */
        private LocalDateTime latestPushTime;
        /**
         * 商品SKU列表
         */
        private List<CheckSku> productSkuList;
        /**
         * 平台SKC列表
         */
        private List<PlatformSkc> platformSkcList;
    }

    @Data
    public static class CheckSku {
        /**
         * 商品SKU id
         */
        private Long productSkuId;
        /**
         * SKU号
         */
        private String skuCode;
    }

    @Data
    public static class PlatformSkc {
        /**
         * 平台商品 ID
         */
        private Long platformProductId;
        /**
         * 平台SKC ID
         */
        private Long platformSkcId;
        /**
         * 平台SKC号
         */
        private String extCode;
        /**
         * 平台SKU List
         */
        private List<PlatformSku> platformSkuList;
        /**
         * 是否已关联 0否 1是
         */
        private Integer isAssociated;
        /**
         * 平台实际上架时间
         */
        private LocalDateTime createdAt;
    }

    @Data
    public static class PlatformSku {
        /**
         * 平台SKU号
         */
        private String extCode;
        /**
         * 平台SKU ID
         */
        private Long platformSkuId;
    }
}
