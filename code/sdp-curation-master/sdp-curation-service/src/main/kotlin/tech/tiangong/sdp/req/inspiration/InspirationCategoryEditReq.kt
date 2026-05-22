package tech.tiangong.sdp.req.inspiration

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import java.io.Serializable

/**
 * 更新灵感图
 *
 * @author     ：qinwenxuan@zj.tech
 * @date       ：2025/7/17 17:15
 * @version    :1.0
 */
class InspirationCategoryEditReq(
    /**
     * 灵感ID
     */
    @field:NotNull(message = "灵感ID不能为空")
    var inspirationId: Long? = null,
    /**
     * 品类编码
     */
    @field:NotBlank(message = "品类编码不能为空")
    var categoryCode: String? = null,

    /**
     * 品类名称
     */
    @field:NotBlank(message = "品类名称不能为空")
    var categoryName: String? = null
) : Serializable {
    companion object {
        private const val serialVersionUID: Long = -2275603370047587847L
    }

}