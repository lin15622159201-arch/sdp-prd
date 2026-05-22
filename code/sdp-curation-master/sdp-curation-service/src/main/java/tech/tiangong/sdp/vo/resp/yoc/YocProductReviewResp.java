package tech.tiangong.sdp.vo.resp.yoc;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * YOC商品审核信息-响应
 *
 * @author while
 * @since 1.0.0
 */
@Data
public class YocProductReviewResp implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 商品ID
     */
    private Long productId;

    /**
     * 店铺ID
     */
    private Long storeId;

    /**
     * 款ID
     */
    private Long styleId;

    /**
     * 款号
     */
    private String styleCode;

    /**
     * SKC列表
     */
    private List<YocProductSkcResp> skcReqs;
}
