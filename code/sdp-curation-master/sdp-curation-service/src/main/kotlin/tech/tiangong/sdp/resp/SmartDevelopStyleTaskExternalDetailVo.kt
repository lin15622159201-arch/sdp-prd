package tech.tiangong.sdp.resp

import com.fasterxml.jackson.annotation.JsonFormat
import team.aikero.blade.core.annotation.convert.ConvertOssPath
import java.io.Serial
import java.io.Serializable
import java.math.BigDecimal
import java.time.LocalDateTime

/**
 * design-智能开款-查询任务详情-响应
 * @author zjh
 * @date 2024/9/2 14:22
 */
open class SmartDevelopStyleTaskExternalDetailVo(
    /**
     * 任务id
     */
    var taskId: Long? = null,

    /**
     * 任务编号
     */
    var taskCode: String? = null,

    /**
     * 任务来源：0-FM用户上传；1-灵感源
     */
    var taskSource: Int? = null,


    /**
     * 前端任务状态:0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；
     */
    var taskStatus: Int? = null,

    /**
     * 灵感ID
     */
    var inspirationId: Long? = null,

    /**
     * 灵感编号
     */
    var inspirationCode: String? = null,

    /**
     * 来源业务id
     */
    var sourceBusinessId: Long? = null,
    /**
     * 来源业务编号
     */
    var sourceBusinessCode: String? = null,

    /**
     * 参考图
     */
    @ConvertOssPath
    var referencePicture: String? = null,
    /**
     * 参考图权重，值越大，参考度越低，建议1~8的浮点数（默认0）
     */
    var refWeight: BigDecimal? = null,

    /**
     * 识别品类Code
     */
    var identifyCategoryCode: String? = null,
    /**
     * 识别品类名称
     */
    var identifyCategoryName: String? = null,

    /**
     * 品类Code
     */
    var categoryCode: String? = null,

    /**
     * 品类名称
     */
    var categoryName: String? = null,

    /**
     * 款式类型：0-净色、1-花型
     */
    var styleType: Int? = null,

    /**
     * 生成模式,1:多姿势,0:单姿势
     */
    var generateMode: Int? = null,


    /**
     * 模特 编号
     */
    var aiModelCode: String? = null,
    /**
     * 模特 名称
     */
    var aiModelName: String? = null,
    /**
     * 模特图片Url
     */
    @ConvertOssPath
    var aiModelUrl: String? = null,

    /**
     * 模特素材ID
     */
    var modelMaterialId: Long? = null,

    /**
     * 模特素材名称
     */
    var modelMaterialName: String? = null,

    /**
     * 模特素材URL
     */
    var modelMaterialUrl: String? = null,

    /**
     * 模特素材描述
     */
    var modelMaterialCaption: String? = null,

    /**
     * Aigc任务描述
     */
    var taskAigcMessage: String? = null,

    /**
     * 背景增强 (1:开启, 0:关闭)
     * - 多姿势:默认开启, 入参传"不开启"才改变值
     * - 单姿势:默认关闭
     */
    var bgEnhanced: Int? = null,
    /**
     * 履约增强：0-否；1-是
     */
    var promiseEnhanced: Int? = null,

    /**
     * 脸部修复(1:开启, 0:关闭)
     */
    var faceFix: Int? = null,


    /**
     * 生成描述词
     */
    var prompts: String? = null,

    /**
     * 创建人id
     */
    var creatorId: Long? = null,

    /**
     * 创建人
     */
    var creatorName: String? = null,

    /**
     * 租户ID
     */
    var tenantId: Long? = null,

    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    var createdTime: LocalDateTime? = null,

    /**
     * 模型编码（字典配置编码）
     */
    var modeCode: String? = null,

    /**
     * 模型名称（字典配置名称）
     */
    var modeName: String? = null,
    /**
     * 是否使用加速推理
     * 0-否；1-是
     */
    var fastForward: Int? = null,
    /**
     * 款生成数量
     */
    var styleGenCount: Int? = null,

    /**
     * 模特人种
     */
    var modelEthnicity: String? = null,

    /**
     * 一拖三(1:开启, 0:关闭)
     */
    var tryonFix: Int? = null,

) : Serializable {
    companion object {
        @Serial
        private const val serialVersionUID: Long = 1L
    }
}
