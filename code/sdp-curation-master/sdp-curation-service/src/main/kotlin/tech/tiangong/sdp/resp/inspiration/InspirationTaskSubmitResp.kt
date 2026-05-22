package tech.tiangong.sdp.resp.inspiration

import tech.tiangong.sdp.dao.bo.AiDesignModelBo
import tech.tiangong.sdp.dao.bo.AiDesignSceneBo
import java.math.BigDecimal

/**
 * @author zjh
 * @date 2024/12/4 17:56
 */
class InspirationTaskSubmitResp {

    /**
     * 灵感id
     */
    var inspirationId: Long? = null

    /**
     * 波次
     */
    var waveBatchCode: String? = null

    /**
     * 供给方式
     * @see tech.tiangong.sdp.enums.SupplyModeEnum
     */
    var supplyMethodCode: String? = null

    /**
     * 生成模式1:多姿势0:单姿势
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
    var modelMaterialInfo: ModelMaterialInfoResp? = null


    /**
     * 生成数量
     */
    var generateNum: Int? = null

    /**
     * 模型编码（字典配置编码）
     */
    var modeCode: String? = null

    /**
     * 模型名称（字典配置名称）
     */
    var modeName: String? = null

    /**
     * 是否使用加速推理
     * 0-否；1-是
     */
    var fastForward: Int? = null

    /**
     * 参考图
     */
    var refImgUrl: String? = null

    /**
     * 提示词
     */
    var prompt: String? = null

    /**
     * 背景图描述
     */
    var bgImgDesc: String? = null

    /**
     * 背景图url
     */
    var bgImgUrl: String? = null

    /**
     * 模特图描述
     */
    var modelImgDesc: String? = null

    /**
     * 模特图url
     */
    var modelImgUrl: String? = null

    /**
     * 风格模型ID
     */
    var styleModelId: Long? = null
    /**
     * 生图的尺寸
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

}

/**
 * 模特素材
 */
data class ModelMaterialInfoResp(
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