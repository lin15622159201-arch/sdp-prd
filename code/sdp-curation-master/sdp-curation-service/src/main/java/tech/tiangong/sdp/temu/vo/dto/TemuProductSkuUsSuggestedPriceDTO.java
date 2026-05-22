package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

/**
 * TemuProductSkuUsSuggestedPriceDTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:06
 */
@Data
public class TemuProductSkuUsSuggestedPriceDTO {
    /**
     * 建议价格币种
     */
    private String suggestedPriceCurrencyType;
    /**
     * 建议价格
     */
    private Integer suggestedPrice;
    /**
     * 特殊的建议价格
     */
    private String specialSuggestedPrice;
}
