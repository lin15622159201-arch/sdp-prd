package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.vo.dto.SuitDTO;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
 * 商品-新增-SKU
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/13 15:06
 */
@Data
public class ProductSkuResp implements Serializable {
    @Serial
    private static final long serialVersionUID = -6121072535667315943L;
    /**
     * 商品SKC id
     */
    private Long productSkuId;

    /**
     * 商品 id
     */
    private Long productId;

    /**
     * 商品SKC id
     */
    private Long productSkcId;
    /**
     * 平台SKC ID
     */
    private Long platformSkuId;
    /**
     * SKu ID
     */
    private Long skuId;
    /**
     * SKu 号
     */
    private String skuCode;
    /**
     * 供货价
     */
    private BigDecimal supplierPrice;
    /**
     * 货品 sku 重量
     */
    private Integer skuWeightValue;
    /**
     * 长
     */
    private Integer len;
    /**
     * 宽
     */
    private Integer width;
    /**
     * 高
     */
    private Integer height;
    /**
     * sku分类单品数量，sku分类为单品的默认是1，sku分类为混合套装时，单品数量需要等于包装清单物品数量之和
     */
    private Integer numberOfPieces;
    /**
     * 包装数量(对应Temu内计共含),2：同款多件装，3：混合套装时候
     */
    private Integer numberOfPack;
    /**
     * sku分类，1：单品，2：同款多件装，3：混合套装
     */
    private Integer skuClassification;
    /**
     * 是否独立包装(0=否 1=是)当sku分类为同款多件装或混合套装时，必填
     */
    private Integer individuallyPacked;
    /**
     * SKU状态
     * 0:待更新
     */
    private Integer skuState;
    /**
     * 发货仓库存库存请求列表
     */
    private List<WarehouseStockQuantityResp> warehouseStockQuantities;
    /**
     * SKU 规格
     */
    private List<ProductSkuSpecResp> skuSpecs;
    /**
     * 包装清单
     */
    private List<SuitDTO> packingList;
}
