package tech.tiangong.sdp.common.req

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import java.io.Serializable

/**
 * 智能开款素材新增参数
 *
 * @author     ：qinwenxuan@zj.tech
 * @date       ：2025/7/14 10:41
 * @version    :1.0
 */
class SmartDesignMaterialReq(
    /**
     * 素材库ID
     */
    @field:NotNull(message = "素材库ID不能空")
    var materialLibraryId: Long? = null,

    /**
     * 素材类型
     */
    @field:NotBlank(message = "素材类型不能空")
    var materialType: String? = null,

    /**
     * 模特图片URL
     */
    @field:NotBlank(message = "模特图片URL不能空")
    var pictureUrl: String? = null,

    /**
     * mask图URL
     */
    var maskPictureUrl: String? = null
) : Serializable {
    companion object {
        private const val serialVersionUID: Long = -1232576055283288722L
    }

}