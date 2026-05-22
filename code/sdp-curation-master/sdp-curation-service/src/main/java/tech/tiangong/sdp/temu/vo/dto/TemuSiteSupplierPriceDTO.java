package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

/**
 * TemuSiteSupplierPriceDTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:06
 */
@Data
public class TemuSiteSupplierPriceDTO {
    /**
     * 申报价格站点 id
     */
    private Long siteId;
    /**
     * 站点申报价格，单位 人民币：分，美元：美分
     */
    private Integer supplierPrice;
}
