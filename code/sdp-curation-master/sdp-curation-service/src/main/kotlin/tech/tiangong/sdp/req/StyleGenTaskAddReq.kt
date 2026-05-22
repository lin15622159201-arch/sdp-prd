package tech.tiangong.sdp.req

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import tech.tiangong.sdp.dao.bo.AiDesignSceneBo
import tech.tiangong.sdp.req.inspiration.ModelMaterialInfoReq
import java.io.Serializable
import java.math.BigDecimal

/**
 * 风格小模型任务新增参数
 *
 * @author     : qinwenxuan@zj.tech
 * @date       : 2025/8/25 16:51
 * @version    : 1.0
 */
class StyleGenTaskAddReq : Serializable{
   var userId: @NotNull(message = "用户ID不能为空") Long? = null
   var userName: @NotBlank(message = "用户名不能为空") String? = null
   var tenantId: @NotNull(message = "租户ID不能为空") Long? = null

    /**
     * 参考图
     */
   var refImgUrl: @NotBlank(message = "参考图不能为空") String? = null

    /**
     * 提示词
     */
   var prompt: String? = null

    /**
     * 脸部修复(1:开启, 0:关闭)
     */
   var faceFix: @NotNull(message = "脸部修复不能为空") Int? = null

    /**
     * 生成数量
     */
   var genCount: @NotNull(message = "生成数量不能为空") Int? = null

    /**
     * 风格模型ID
     */
   var styleModelId: @NotNull(message = "风格模型ID不能为空") Long? = null

    /**
     * 分辨率
     */
   var imgSize: @NotBlank(message = "分辨率不能为空") String? = null

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
     * 来源业务id
     */
   var sourceBusinessId: @NotNull(message = "来源业务ID不能为空") Long? = null

    /**
     * 来源业务编号
     */
   var sourceBusinessCode: @NotBlank(message = "来源业务编号不能为空") String? = null
    /**
     * 是否使用蒸馏加速
     */
    var enableDistill: Int? = null
    /**
     * 是否增强跟随性
     */
    var enableFollowability: BigDecimal? = null
    /**
     * 场景
     */
    var bg: AiDesignSceneBo? = null

    /**
     * 模特素材
     */
    var model: ModelMaterialInfoReq? = null

    companion object {
        private const val serialVersionUID: Long = -3414769200939726088L
    }
}