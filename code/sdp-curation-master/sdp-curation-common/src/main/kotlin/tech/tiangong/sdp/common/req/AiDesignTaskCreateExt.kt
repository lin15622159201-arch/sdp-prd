package tech.tiangong.sdp.common.req

import jakarta.validation.Valid
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import java.math.BigDecimal


/**
 * AI设计生图相关参数
 */
class AiDesignTaskCreateExt(
    /**
     * 参考图权重，值越大，参考度越低，建议1~8的浮点数（默认0）
     */
    var refWeight: BigDecimal? = null,
    /**
     * 是否生成多姿势，1-是，0-否
     */
    @field:NotNull(message = "是否生成多姿势不能为空")
    var multiPose: Int? = null,
    /**
     * 背景增强：0-否；1-是
     */
    @field:NotNull(message = "背景增强不能为空")
    var filterBack: Int? = null,
    /**
     * 履约增强：0-否；1-是
     */
    var promiseEnhanced: Int? = null,
    /**
     * 脸部修复：0-否；1-是
     */
    @field:NotNull(message = "脸部修复不能为空")
    var faceRepair: Int? = null,

    /**
     * 场景信息
     */
    var sceneInfo: SmartStyleSceneReq? = null,
    /**
     * AI模特（字典编码）
     */
    var aiModelCode: String? = null,

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
    var genCount: Int? = null,

    /**
     * 模型编码（字典配置编码）
     */
    var modeCode: String? = null,

    /**
     * 模型名称（字典配置名称）
     */
    var modeName: String? = null,
    /**
     * 父业务主键ID（复制的时候一定要带过来）
     */
    var parentBusId: Long? = null,
    /**
     * 款生成数量
     */
    var styleGenCount: Int? = null,

    /**
     * 素材
     */
    @field:Valid
    var materials: List<SmartDesignMaterialReq> = listOf()
) {

}