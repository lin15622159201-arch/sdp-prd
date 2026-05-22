package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.temu.vo.TemuCommonReq;

import java.io.Serial;
import java.util.List;

/**
 * Temu商品-货品供货价查询
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class TemuProductPriceListGetReq extends TemuCommonReq {

    @Serial
    private static final long serialVersionUID = 6199164491261587974L;
    /**
     * SKU ID
     */
    private List<Long> productSkuIds;

}
