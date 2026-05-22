package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.req.TemuCarouselImageI18nReq;

import java.util.List;

/**
 * WarehouseRoute
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:06
 */
@Data
public class TemuProductSkuDTO {
    /**
     * 币种（CNY / USD，默认 CNY）（必填）
     */
    private String currencyType;


    /**
     * 供货价
     */
    private Integer supplierPrice;


    /**
     * 预览图
     */
    private String thumbUrl;

    /**
     * 货品 skc 外部编码，没有的场景传空字符串（必填）
     */
    private String extCode;
    /**
     * 多包规请求
     */
    private TemuProductSkuMultiPackDTO productSkuMultiPackReq;

    /**
     * SKU 建议价格
     */
    private TemuProductSkuSuggestedPriceDTO productSkuSuggestedPriceReq;
    /**
     * 站点供货价列表，仅半托管场景使用
     */
    private List<TemuSiteSupplierPriceDTO> siteSupplierPrices;

    /**
     * SKU 美国建议价格
     */
    private TemuProductSkuUsSuggestedPriceDTO productSkuUsSuggestedPriceReq;

    /**
     * SKU 库存请求
     */
    private TemuProductSkuStockQuantityDTO productSkuStockQuantityReq;

    /**
     * SKU 预览图多语言
     */
    private List<TemuCarouselImageI18nReq> productSkuThumbUrlI18nReqs;

    /**
     * SKU 包装清单
     */
    private TemuProductSkuAccessoriesDTO productSkuAccessoriesReq;

    /**
     * SKU 扩展属性（必填）
     */
    private TemuProductSkuWhExtAttrDTO productSkuWhExtAttrReq;

    /**
     * SKU 规格列表（必填）
     */
    private List<TemuProductSkuSpecDTO> productSkuSpecReqs;

}
