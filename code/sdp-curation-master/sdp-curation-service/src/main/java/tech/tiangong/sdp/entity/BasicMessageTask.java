package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 基础实体
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:18
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class BasicMessageTask extends BaseTenantUserEntity{
    /**
     * 信息备注
     */
    @TableField(value = "message")
    private String message;

}
