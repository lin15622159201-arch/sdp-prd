package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;
import lombok.EqualsAndHashCode;
import team.aikero.blade.data.mybatis.entity.BaseEntityWithNamedAndReviser;

/**
 * BaseTenantUserEntity实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/10/31 9:58
 */
@Data
@EqualsAndHashCode(callSuper = true)
public abstract class BaseTenantUserEntity extends BaseEntityWithNamedAndReviser {
    /**
     * 租户ID
     */
    @TableField(value = "tenant_id")
    private Long tenantId;

    public Long getTenantId() {
        return tenantId;
    }

    public void setTenantId(Long tenantId) {
        this.tenantId = tenantId;
    }
}
