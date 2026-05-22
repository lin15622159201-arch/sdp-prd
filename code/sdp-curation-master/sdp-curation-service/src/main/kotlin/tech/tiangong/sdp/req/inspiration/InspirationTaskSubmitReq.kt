package tech.tiangong.sdp.req.inspiration

import jakarta.validation.Valid
import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotEmpty
import tech.tiangong.sdp.dao.bo.AiDesignModelBo
import tech.tiangong.sdp.dao.bo.AiDesignSceneBo
import tech.tiangong.sdp.req.AiDesignMaterialReq
import java.math.BigDecimal

/**
 * @author zjh
 * @date 2024/11/14 11:14
 */

data class InspirationTaskSubmitReq(
    /**
     * 是否使用加速推理
     * 0-否；1-是
     */
    var fastForward: Int? = null,
    /**
     * 灵感id
     */
    @field:NotEmpty(message = "inspirationIds is empty")
    var inspirationIds: List<Long>,
    /**
     * 波次
     */
    // @field:NotBlank(message = "waveBatchCode is blank")
    var waveBatchCode: String,

    /**
     * 供给方式
     * @see tech.tiangong.sdp.enums.SupplyModeEnum
     */
    @field:NotBlank(message = "supplyMethod is blank")
    var supplyMethod: String,
) {

    /**
     * 参考图
     */
    var refImgUrl: String? = null
    /**
     * 生成模式,1:多姿势,0:单姿势
     */
    var generateMode: Int? = null

    /**
     * 背景增强(1:开启, 0:关闭)
     */
    var filterBack: Int? = null

    /**
     * 脸部修复(1:开启, 0:关闭)
     */
    var faceRepair: Int? = null

    /**
     * 履约增强：0-否；1-是 v3.10.1
     */
    var promiseEnhanced: Int? = null

    /**
     * 场景
     */
    var sceneInfo: AiDesignSceneBo? = null

    /**
     * 模特
     */
    var modelInfo: AiDesignModelBo? = null

    /**
     * 模特素材
     */
    var modelMaterialInfo: ModelMaterialInfoReq? = null

    /**
     * 生成数量
     */
    var generateNum: Int? = null

    /**
     * @since v3.9
     * 期望成本价
     */
//    @NotNull(message = "expectedCostPrice is null")
//    @Range(min = 0, message = "expectedCostPrice must be between 0 and 10000", max = 10000)
    var expectedCostPrice: BigDecimal? = null

    /**
     * 品类编码（aigc才可能传）v3.11
     */
//    @NotBlank(message = "categoryCode is blank")
    var categoryCode: String? = null

    /**
     * 品类名称 (aigc才可能传) v3.11
     */
//    @NotBlank(message = "categoryName is blank")
    var categoryName: String? = null

    /**
     * 是否同步修改灵感识别品类1-是 0-否  v3.11
     */
    var syncCategory: Int? = null

    /**
     * 模型编码（字典配置编码）
     */
    var modeCode: String? = null

    /**
     * 模型名称（字典配置名称）
     */
    var modeName: String? = null

    /**
     * 参考图权重，值越大，参考度越低，建议1~8的浮点数（默认0）v3.11
     */
    var refWeight: BigDecimal? = null

    /**
     * 款生成数量
     */
    var styleGenCount: Int? = null


    /**
     * 模特人种
     */
    var modelEthnicity: String? = null

    /**
     * 提示词
     */
    var prompt: String? = null

    /**
     * 模型ID
     */
    var styleModelId: Long? = null
    /**
     * lora的名字
     */
    var loraName: String? = null

    /**
     * 服装类型
     */
    var clothType: String? = null
    /**
     * 分辨率
     */
    var imgSize: String? = null
    /**
     * 是否使用蒸馏加速
     */
    var enableDistill: Int? = null
    /**
     * 是否增强跟随性
     */
    var enableFollowability: BigDecimal? = null
    /**
     * 素材
     */
    @field:Valid
    var materials: List<AiDesignMaterialReq> = listOf()
}

/**
 * 模特素材
 */
data class ModelMaterialInfoReq(
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
)
