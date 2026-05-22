package tech.tiangong.sdp.yibuyun;

import lombok.Data;
import lombok.experimental.Accessors;

import java.io.Serial;
import java.io.Serializable;

/**
 * UserInfo
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/5 10:43
 */
@Data
@Accessors(chain = true)
public class UserInfo implements Serializable {
    @Serial
    private static final long serialVersionUID = -4218476096101745406L;
    /**
     * 用户id
     */
    private Long id;
    /**
     * 用户名
     */
    private String name;
    /**
     * 租户id
     */
    private Long tenantId;
    /**
     * 编号
     */
    private String code;

    /**
     * 组织ID
     */
    private Long organizationId;
}
