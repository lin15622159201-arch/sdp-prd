package tech.tiangong.sdp.common.req;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tech.tiangong.sdp.common.enums.DevelopStyleRelaSourceEnum;

import java.io.Serial;

/**
 * 开款关联
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 14:33
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DevelopStyleRelaAddReq extends BaseTenantUserReq {
    @Serial
    private static final long serialVersionUID = -1325801486454136557L;
    /**
     * 任务id
     */
    @NotNull(message = "任务id不能为空")
    private Long taskId;
    /**
     * 数据来源
     */
    @NotNull(message = "数据来源不能为空")
    private DevelopStyleRelaSourceEnum sourceType;

    /**
     * 数据来源ID
     */
    @NotNull(message = "数据来源ID不能为空")
    private Long sourceId;

    /**
     * 数据来源编号
     */
    @NotBlank(message = "数据来源编号不能为空")
    private String sourceCode;
}
