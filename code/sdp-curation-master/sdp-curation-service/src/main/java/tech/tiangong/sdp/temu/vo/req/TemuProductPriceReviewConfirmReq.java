package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.temu.vo.TemuCommonReq;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品-同意核价单建议价
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class TemuProductPriceReviewConfirmReq extends TemuCommonReq {

    @Serial
    private static final long serialVersionUID = -5588270215747826499L;
    /**
     * 核价单id
     */
    private Long orderId;

}
