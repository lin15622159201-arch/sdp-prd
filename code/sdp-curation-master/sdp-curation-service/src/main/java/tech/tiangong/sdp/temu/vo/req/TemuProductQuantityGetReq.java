package tech.tiangong.sdp.temu.vo.req;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.temu.vo.TemuCommonReq;

import java.io.Serial;

/**
 * Temu商品-半托管商品销售库存查询
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class TemuProductQuantityGetReq extends TemuCommonReq {
    @Serial
    private static final long serialVersionUID = 938990007818792207L;
    /**
     * 用户信息
     */
    private TemuApiUserReq openApiUser;
    /**
     * SKC ID
     */
    private Long productSkcId;

}
