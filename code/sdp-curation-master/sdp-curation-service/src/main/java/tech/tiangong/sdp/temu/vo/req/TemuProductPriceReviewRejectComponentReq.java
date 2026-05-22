package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuReq;

import java.io.Serial;

/**
 * Temu商品-驳回核价单建议价
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuProductPriceReviewRejectComponentReq implements TemuReq {
    @Serial
    private static final long serialVersionUID = -3548494248514595454L;

    /**
     * 具体原因
     */
    private String reason;
    /**
     * 重新报价原因类型. 可选值含义说明:[0:材质;1:功能;2:其他;3:品类;4:外观;5:版型;6:图案;7:规格尺寸;8:品牌;]
     */
    private Integer reasonType;
}
