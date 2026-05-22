package tech.tiangong.sdp.vo.dto;

import lombok.Data;

/**
 * 套装
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/4/2 10:25
 */
@Data
public class SuitDTO {
    /**
     * 品类 ID
     */
    private Integer catId;
    /**
     * 品类 ID
     */
    private String catName;
    /**
     * sku分类单品数量，sku分类为单品的默认是1，sku分类为混合套装时，单品数量需要等于包装清单物品数量之和
     */
    private Integer numberOfPieces;
}
