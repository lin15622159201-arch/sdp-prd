package tech.tiangong.inspiration.vo.req.base;

import java.io.Serial
import java.io.Serializable

/**
 * 用户Req
 *
 * @author chazz
 */
open class UserReq(
    /**
     * 创建人ID
     */
    var creatorId: Long? = null,
    /**
     * 创建人名称
     */
    var creatorName: String? = null,

    ) : Serializable {
    companion object {
        @Serial
        private const val serialVersionUID: Long = 1L
    }
}
