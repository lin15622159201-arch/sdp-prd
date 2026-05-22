package tech.tiangong.sdp.req

import jakarta.validation.Valid
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import java.math.BigDecimal

//import tech.tiangong.inspiration.common.req.SmartDevelopStyleSceneReq

/**
 * 灵感设计Req
 */
data class InspirationDesignReq(
    /**
     * 模型编码（字典配置编码）
     */
    var modeCode: String? = null,

    /**
     * 模型名称（字典配置名称）
     */
    var modeName: String? = null,
    /**
     * 智能识别ID
     */
    @field:NotNull(message = "智能识别ID不能空")
    var smartIdentifyId: Long? = null,
    /**
     * 父业务主键ID（复制的时候一定要带过来）
     */
    var parentBusId: Long? = null,
    /**
     * 业务主键ID
     */
    @field:NotNull(message = "业务主键ID不能空")
    var busId: Long? = null,
    /**
     * 业务编号
     */
    @field:NotBlank(message = "业务编号不能空")
    var busCode: String? = null,

    /**
     * 灵感ID
     */
    var inspirationId: Long? = null,

    /**
     * 灵感编号
     */
    var inspirationCode: String? = null,

    /**
     * 参考图url
     */
    @field:NotBlank(message = "参考图url不能为空")
    var refImgUrl: String? = null,
    /**
     * 参考图名称
     */
    var refImgName: String? = null,
    /**
     * 参考图权重，值越大，参考度越低，建议1~8的浮点数（默认0）
     */
    var refWeight: BigDecimal? = null,
    /**
     * 品类编号
     */
    @field:NotBlank(message = "品类编号不能为空")
    var categoryCode: String? = null,
    /**
     * 品类名称
     */
    @field:NotBlank(message = "品类名称不能为空")
    var categoryName: String? = null,
    /**
     * 是否生成多姿势，1-是，0-否
     */
    @field:NotNull(message = "是否生成多姿势不能为空")
    var multiPose: Int? = null,
    /**
     * 背景增强：0-否；1-是
     */
    @field: NotNull(message = "背景增强不能为空")
    var filterBack: Int? = null,
    /**
     * 履约增强：0-否；1-是
     */
    var promiseEnhanced: Int? = null,
    /**
     * 脸部修复：0-否；1-是
     */
    @field: NotNull(message = "脸部修复不能为空")
    var faceRepair: Int? = null,

    /**
     * 场景信息
     */
    @field:Valid
    var sceneInfo: SmartDevelopStyleSceneReq? = null,
    /**
     * AI模特（字典编码）
     */
    var aiModelCode: String? = null,


    /**
     * 模特素材ID（手动上传模特素材图为空）
     */
    var modelMaterialId: Long? = null,
    /**
     * 模特素材名称（手动上传模特素材图为空）
     */
    var modelMaterialName: String? = null,
    /**
     * 模特素材URL（可以手动上传模特素材图）
     */
    var modelMaterialUrl: String? = null,
    /**
     * 生成图片数量
     */
    @field:NotNull(message = "生成图片数量不能为空")
//    @field:Min(value = 1, message = "生成图片数量不能小于1")
//    @field:Max(value = 10, message = "生成图片数量不能大于10")
    var genCount: Int? = null,
    /**
     * 任务属性：0-单任务，1-批量任务
     */
    var taskAttribute: Int? = null,
    /**
     * 回调URL
     */
    @field:NotBlank(message = "回调URL不能为空")
    var callback: String? = null,

    /**
     * 是否使用加速推理
     * 0-否；1-是
     */
    var fastForward: Int? = null,
    /**
     * 是否同步修改灵感识别品类1-是 0-否
     */
    var syncCategory: Int? = null,
    /**
     * 款生成数量
     */
    var styleGenCount: Int? = null,

    /**
     * 模特人种
     */
    var modelEthnicity: String? = null,

    /**
     * 素材
     */
    @field: Valid
    var materials: List<AiDesignMaterialReq> = listOf()
) {
    companion object {
        private const val serialVersionUID = 1L
    }

}
