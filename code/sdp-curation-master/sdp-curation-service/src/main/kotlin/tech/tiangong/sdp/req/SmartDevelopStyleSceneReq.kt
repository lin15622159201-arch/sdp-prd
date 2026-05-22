package tech.tiangong.sdp.req

import team.aikero.blade.core.toolkit.isNotBlank
import team.aikero.blade.core.toolkit.isNotNull

/**
 * 智能开款场景Req
 */
open class SmartDevelopStyleSceneReq(
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