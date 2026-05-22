package tech.tiangong.sdp.common.req.picking

import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.NotNull
import tech.tiangong.sdp.common.dto.picking.PickingAddPictureDto
import tech.tiangong.sdp.common.enums.PickingTypeEnum
import java.time.LocalDateTime

/**
 * @author liuhongfu
 * @date 2025/1/8 14:42
 */
class PickingAddReq {

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
     * 发送类型id
     * 假设灵感来源，该值就是灵感ID
     * 如果是款式来源，该值就是开款任务ID
     */
    var sendTypeId: Long? = null

    /**
     * 发送类型编码
     * 假设灵感来源，该值就是灵感编码
     * 如果是款式来源，该值就是spu编码
     */
    var sendTypeCode: String? = null

    /**
     * SKC-ID
     */
    var skcId: Long? = null

    /**
     * SKC编码
     */
    var skcCode: String? = null


    /**
     * 业务类型
     */
    var businessTypeEnum : PickingTypeEnum? = null

    /**
     * 来源
     * smart_develop_style：AI设计
     * posture_fission ：姿势裂变
     * floral_pattern ： 花型上身
     * style_gen ：风格化衍生
     * fashion_virtual_try_on ；虚拟换衣
     */
    @field:NotNull(message = "任务来源不能空")
    var origin: String? = "smart_develop_style"

    /**
     * 供给方式code
     */
    var supplyMethodCode: String? = null


    /**
     * 选款添加相关信息
     */
    @field:NotNull(message = "选款添加相关信息不能空")
    var pickingAddDto: PickingAddDto? = null


    /**
     * 生成图列表
     */
    @field:NotEmpty(message = "生成图列表不能空")
    var resImgList: List<PickingAddPictureDto>? = null


    class PickingAddDto(

        /**
         * 业务主键ID
         * 姿势裂变表 posture_fission_task的task_id等
         */
        @field:NotNull(message = "业务主键ID不能空")
        var busId: Long? = null,

        /**
         * 业务编号
         */
        var busCode: String? = null,

        /**
         * 参考图url
         */
        var refImgUrl: String? = null,


        /**
         * 模型编码（字典配置编码）
         */
        var modeCode: String? = null,

        /**
         * 模型名称（字典配置名称）
         */
        var modeName: String? = null,

        /**
         * 品类名称
         */
        var category: String? = null,

        /**
         * 背景图描述
         */
        var bgImgDesc: String? = null,

        /**
         * 背景图url
         */
        var bgImgUrl: String? = null,

        /**
         * 模特图描述
         */
        var modelImgDesc: String? = null,

        /**
         * 模特图url
         */
        var modelImgUrl: String? = null,

        /**
         * 生成数量
         */
        var generateNum: Int? = null

    )

}