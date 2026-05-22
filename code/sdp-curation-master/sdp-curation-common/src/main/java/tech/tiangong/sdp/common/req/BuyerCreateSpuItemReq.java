package tech.tiangong.sdp.common.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 买手取消参数
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/2 14:38
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BuyerCreateSpuItemReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 7933186436345334553L;
    /**
     * spu款
     */
    private BuyerCreateStyleReq designStyle;

    /**
     * 批量skc款
     */
    private List<BuyerCreateSkcReq> prototypes;
}
