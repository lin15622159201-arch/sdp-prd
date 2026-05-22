package tech.tiangong.sdp.req.inspiration

import java.io.Serial

/**
 * 更新灵感图
 *
 * @author     ：qinwenxuan@zj.tech
 * @date       ：2025/7/17 17:15
 * @version    :1.0
 */
class InspirationImageEditReq(
    /**
     * 灵感ID
     */
    var inspirationId: Long
) : InspirationImageReq() {
    companion object {
        @Serial
        private const val serialVersionUID: Long = 8964776403908097800L
    }
}