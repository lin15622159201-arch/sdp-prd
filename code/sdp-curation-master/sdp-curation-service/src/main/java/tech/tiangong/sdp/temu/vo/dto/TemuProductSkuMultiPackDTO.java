package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

/**
 * WarehouseRoute
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:06
 */
@Data
public class TemuProductSkuMultiPackDTO {
    /**
     * sku分类单品数量，sku分类为单品的默认是1，sku分类为混合套装时，单品数量需要等于包装清单物品数量之和
     */
    private Integer numberOfPieces;
    /**
     * 是否独立包装，当sku分类为同款多件装或混合套装时，必填
     */
    private Integer individuallyPacked;

    /** sku 分类 */
    private Integer skuClassification;

    /** 单件单位 */
    private Integer pieceUnitCode;
    /** 净含量请求（传空对象表示清除） */
    private TemuProductSkuNetContentDTO productSkuNetContentReq;
}
