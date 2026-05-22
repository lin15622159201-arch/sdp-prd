package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;
import java.util.Objects;

/**
 * Temu-分页查询半托管核价单
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/31 18:23
 */
@Data
public class TemuProductPriceReviewPageResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 3586638678894388138L;
    /**
     * 商品SKU ID列表
     */
    private List<Long> productSkuIdList;

    /**
     * 价格货币
     */
    private String priceCurrency;

    /**
     * 供应价格（单位：分）
     */
    private Long supplyPrice;

    /**
     * 订单ID
     */
    private Long orderId;

    /**
     * 建议价格货币
     */
    private String suggestPriceCurrency;

    /**
     * 建议供应价格（单位：分）
     */
    private Long suggestSupplyPrice;

    /**
     * 订单状态
     */
    private Integer orderStatus;

    /**
     * 站点ID列表
     */
    private List<Integer> siteIds;

    /**
     * 是否可以议价
     */
    private Boolean canBargain;

    /**
     * 站点名称列表
     */
    private List<String> siteNameList;

    public boolean canBargain () {
        return Objects.requireNonNullElse(canBargain, Boolean.FALSE);
    }
}
