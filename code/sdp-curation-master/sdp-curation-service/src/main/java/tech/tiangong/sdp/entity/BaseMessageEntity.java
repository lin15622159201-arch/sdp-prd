package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * BaseTenantUserEntity
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/10/31 10:00
 */
@Data
@EqualsAndHashCode(callSuper = true)
public abstract class BaseMessageEntity extends BaseTenantUserEntity {
    /**
     * 信息备注
     */
    @TableField(value = "message")
    private String message;
}
