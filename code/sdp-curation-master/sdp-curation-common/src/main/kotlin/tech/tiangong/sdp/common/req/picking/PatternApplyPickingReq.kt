package tech.tiangong.sdp.common.req.picking

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.NotNull
import tech.tiangong.sdp.common.dto.picking.ResRepairImgGroupDto
import java.time.LocalDateTime

class PatternApplyPickingReq {

    /**
     * 创建人id
     */
    var creatorId: Long? = null

    /**
     * 创建人名称
     */
    var creatorName: String? = null

    /**
     * 创建时间
     */
    var createdTime: LocalDateTime? = null

    /**
     * 租户id
     */
    var tenantId: Long? = null


    /**
     * 灵感数据id
     */
    var inspirationId: Long? = null

    /**
     * 花型上身任务
     */
    var patternApplyTask: PatternApplyTask? = null

    /**
     * 生成图列表
     */
    @field:NotEmpty(message = "生成图列表不能空")
    var imgGroupList: List<ResRepairImgGroupDto>? = null


    class PatternApplyTask(

        /**
         * 任务id
         */
        var taskId: Long? = null,
        /**
         * 任务编码
         */
        var taskCode: String? = null,

        /**
         * 参考图url
         */
        var garmImgUrls: String? = null,

        /**
         * 花型图url
         */
        var patternImgUrl: String? = null,

        /**
         * 满服印花型图id
         */
        var floralPatternId: Long? = null,

        /**
         * 模型名称
         */
        var modelName: String? = null,

        /**
         * 花型上身区域，top garment，bottom garment，one-piece garment
         */
        var garmRegion: String? = null,

        /**
         * 生成图url列表，json列表
         */
        var generatedPicUrls: String? = null,

        /**
         * 生成时间
         */
        var generatedTime: LocalDateTime? = null,

        /**
         * mask 地址列表
         */
        var maskImgUrls: String? = null,

        /**
         * 生成图像数，默认每个服装图生成2张
         */
        var count: Int? = null,

        /**
         * 随机数种子
         */
        var seed: String? = null,

        /**
         * 品类名称
         */
        var categoryName: String? = null,

        /**
         * 品类编号
         */
        var categoryCode: String? = null,

        /**
         * 来源（1：用户上传，2：灵感源）
         */
        var sourceType: Int? = null,

        /**
         * 智能开款任务编号
         */
        var smartDevelopStyleTaskCode: String? = null,

        /**
         * 花型上身参考图url
         */
        var patternApplyGarmImgUrls: String? = null
    )
}