package tech.tiangong.sdp.vo.resp.yoc;

import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * YOC操作日志响应
 *
 * @author while
 * @since 1.0.0
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class YocOperationLogResp implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 日志ID
     */
    private Long id;

    /**
     * 租户ID
     */
    private Long tenantId;

    /**
     * 操作类型：1-审核通过，2-审核驳回，3-新增店铺，4-编辑店铺，5-启用店铺，6-停用店铺
     */
    private Integer operationType;

    /**
     * 操作类型描述
     */
    private String operationTypeDesc;

    /**
     * 业务ID
     */
    private Long businessId;

    /**
     * 请求参数（JSON格式）
     */
    private String requestParams;

    /**
     * 操作时间
     */
    private LocalDateTime operationTime;

    /**
     * 创建人ID（操作人ID）
     */
    private Long creatorId;

    /**
     * 创建人名称（操作人名称）
     */
    private String creatorName;
}
