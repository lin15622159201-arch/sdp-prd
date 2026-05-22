package tech.tiangong.sdp.vo.req.yoc;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

/**
 * YOC店铺审核请求
 *
 * @author while
 * @since 1.0.0
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class YocStyleOnShelvesAuditReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 商品ID
     */
    @NotNull(message = "商品ID不能为空")
    private Long styleId;

    /**
     * 审核状态：1-审核通过，2-审核拒绝 0-待审核
     */
    @NotNull(message = "审核状态不能为空")
    private Integer auditStatus;

    /**
     * 审核原因/驳回原因(审核拒绝时必填)
     */
    private String auditReason;

    /**
     * 审核人ID
     */
    private Long auditorId;

    /**
     * 审核人姓名
     */
    private String auditorName;
}
