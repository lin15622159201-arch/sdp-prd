package tech.tiangong.sdp.vo.req.yoc;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * YOC商品审核信息-批量查询请求
 *
 * @author while
 * @since 1.0.0
 */
@Data
public class YocProductReviewBatchReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 款ID列表
     */
    @NotEmpty(message = "款ID列表不能为空")
    private List<Long> styleIdList;
}
