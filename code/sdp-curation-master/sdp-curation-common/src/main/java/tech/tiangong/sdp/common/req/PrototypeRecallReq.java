package tech.tiangong.sdp.common.req;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;

/**
 * 取消SKC
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/19 14:24
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class PrototypeRecallReq  extends BaseTenantUserReq{
    @Serial
    private static final long serialVersionUID = -166870025820313440L;
}
