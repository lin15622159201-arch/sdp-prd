package tech.tiangong.sdp.req

import tech.tiangong.inspiration.vo.req.base.UserReq
import java.io.Serial

/**
 * 租户用户Req
 *
 * @author chazz
 */
open class TenantUserReq(
    /**
     * 租户ID
     */
    var tenantId: Long? = null,

    ) : UserReq() {
    companion object {
        @Serial
        private const val serialVersionUID: Long = 1L
    }
}
