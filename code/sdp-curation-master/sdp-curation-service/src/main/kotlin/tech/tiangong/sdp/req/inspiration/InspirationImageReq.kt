package tech.tiangong.sdp.req.inspiration

import jakarta.validation.constraints.NotBlank
import java.io.Serial
import java.io.Serializable

/**
 * 灵感图
 *
 * @author     ：qinwenxuan@zj.tech
 * @date       ：2025/7/7 10:35
 * @version    :1.0
 */
open class InspirationImageReq() : Serializable {
    /**
     * 灵感图
     */
    @field:NotBlank(message = "灵感图不能空")
    var url: String? = null

    /**
     * 灵感图名称
     */
    var name: String? = null
    companion object {
        @Serial
        private const val serialVersionUID: Long = -4550504769416736414L
    }
}