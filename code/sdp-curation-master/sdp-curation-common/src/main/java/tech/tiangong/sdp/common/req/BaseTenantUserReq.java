package tech.tiangong.sdp.common.req;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

/**
 * 租户用户参数
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 14:28
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BaseTenantUserReq implements Serializable {
    @Serial
    private static final long serialVersionUID = -7473495817267356254L;
    /**
     * 租户ID
     */
    @NotNull(message = "租户ID不能为空")
    private Long tenantId;
    /**
     * 创建人ID
     */
    @NotNull(message = "创建人ID不能为空")
    private Long creatorId;
    /**
     * 创建人名称
     */
    @NotBlank(message = "创建人名称不能为空")
    private String creatorName;

    public Long getTenantId() {
        return tenantId;
    }

    public void setTenantId(Long tenantId) {
        this.tenantId = tenantId;
    }

    public Long getCreatorId() {
        return creatorId;
    }

    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }

    public String getCreatorName() {
        return creatorName;
    }

    public void setCreatorName(String creatorName) {
        this.creatorName = creatorName;
    }
}
