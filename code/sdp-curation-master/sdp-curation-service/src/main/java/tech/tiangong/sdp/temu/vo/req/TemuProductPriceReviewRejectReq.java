package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.temu.vo.TemuCommonReq;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品-驳回核价单建议价
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class TemuProductPriceReviewRejectReq extends TemuCommonReq {
    @Serial
    private static final long serialVersionUID = -3548494248514595454L;
    /**
     * 核价单id
     */
    private Long orderId;
    /**
     * 价格明细
     */
    private List<TemuProductPriceItemReq> priceItemList;
    /**
     * 价格明细
     */
    private List<TemuProductPriceReviewRejectReasonReq> bargainReasonList;
}
