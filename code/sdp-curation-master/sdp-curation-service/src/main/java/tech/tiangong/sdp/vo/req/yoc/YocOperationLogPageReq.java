package tech.tiangong.sdp.vo.req.yoc;

import lombok.*;
import team.aikero.blade.core.protocol.PageReq;

import java.io.Serial;
import java.time.LocalDateTime;

/**
 * YOC操作日志查询请求
 *
 * @author while
 * @since 1.0.0
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class YocOperationLogPageReq extends PageReq {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 租户ID
     */
    private Long tenantId;

    /**
     * 操作类型：1-审核通过，2-审核驳回，3-新增店铺，4-编辑店铺，5-启用店铺，6-停用店铺
     */
    private Integer operationType;

    /**
     * 业务ID
     */
    private Long businessId;

    /**
     * 创建人ID（操作人ID）
     */
    private Long creatorId;

    /**
     * 创建人姓名（操作人姓名）
     */
    private String creatorName;

    /**
     * 操作开始时间
     */
    private LocalDateTime operationStartTime;

    /**
     * 操作结束时间
     */
    private LocalDateTime operationEndTime;
}
