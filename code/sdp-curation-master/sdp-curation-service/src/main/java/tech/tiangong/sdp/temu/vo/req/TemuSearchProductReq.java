package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.temu.vo.TemuPageReq;
import tech.tiangong.sdp.temu.vo.TemuResp;
import tech.tiangong.sdp.temu.vo.resp.TemuSearchSkcResp;

import java.io.Serial;
import java.util.List;

/**
 * Temu-商品搜索
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/31 18:23
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class TemuSearchProductReq extends TemuPageReq {

    @Serial
    private static final long serialVersionUID = 5120076172106516883L;
    /**
     * 货品 Id
     */
    private Integer productId;
    /**
     * SKC
     */
    private List<TemuSearchSkcResp> skcList;
    /**
     * SKU ID
     */
    private List<Long> productSkuIdList ;
}
