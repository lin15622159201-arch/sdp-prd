package tech.tiangong.sdp.resp

import java.io.Serial
import java.io.Serializable

data class SmartDevelopOutputGroupTag(
    /**
     * 组号
     */
    var groupNum: Int? = null,
    /**
     * 履约检查图片ID（给前端拿来查看推荐面料）
     * https://nest-api.tiangong.tech/inspiration/web/smart-develop-picture/recommend/fabric/info?pictureId=7298657141508911371
     */
    var pictureId: Long? = null,
    /**
     * 是否可以履约：不需要展示[-1]；0=不可以[0]；可履约[1]
     */
    var promiseEnabled: Int? = null,
    /**
     * 面料是否一致：不需要展示[-1]；不一致[0]；一致[1]
     */
    var fabricConsistent: Int? = null,

    ) : Serializable {
    companion object {
        @Serial
        private const val serialVersionUID: Long = 1L
    }
}
