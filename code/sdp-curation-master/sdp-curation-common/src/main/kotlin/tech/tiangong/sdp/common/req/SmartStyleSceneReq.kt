package tech.tiangong.sdp.common.req

import team.aikero.blade.core.toolkit.isNotBlank
import team.aikero.blade.core.toolkit.isNotNull
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull

/**
 * AI设计任务创建请求
 */
class SmartStyleSceneReq(
    /**
     * 场景ID
     */
    var sceneId: Long? = null,
    /**
     * 场景名称
     */
    var sceneName: String? = null,

    /**
     * 图片ID
     */
    var pictureId: Long? = null,
    /**
     * 图片路径
     */
    //@field:NotBlank(message = "图片路径不能为空")
    var picturePath: String? = null,
    /**
     * 场景描述
     */
    var pictureCaption: String? = null,

    ) {
    fun valid(): Boolean {
        return pictureId.isNotNull() || sceneId.isNotNull() || picturePath.isNotBlank()
    }

    fun invalid(): Boolean {
        return valid().not()
    }
}