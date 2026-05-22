package tech.tiangong.sdp.dao.entity

import com.baomidou.mybatisplus.annotation.IdType
import com.baomidou.mybatisplus.annotation.TableField
import com.baomidou.mybatisplus.annotation.TableId
import com.baomidou.mybatisplus.annotation.TableName
import team.aikero.blade.core.enums.Bool
import team.aikero.blade.data.mybatis.entity.BaseEntityWithNamedAndReviser
import tech.tiangong.sdp.enums.PickingStateEnum
import java.math.BigDecimal
import java.time.LocalDateTime

/**
 * 选款-AI设计-选款结果(PickingAiDesignResult)表名: picking_ai_design_result
 *
 * @author zjh
 * @since 2024-12-19 14:57:22
 */
@TableName(value = "picking_ai_design_result")
data class PickingAiDesignResult(
    /**
     * 选款结果id
     */
    @TableId(value = "picking_result_id", type = IdType.ASSIGN_ID)
    var pickingResultId: Long? = null,

    /**
     * 灵感id(可能空)
     */
    @TableField(value = "inspiration_id")
    var inspirationId: Long? = null,
    @TableField(value = "design_task_id")
    var designTaskId: Long? = null,
    /**
     * ai任务编号(可空)
     */
    @TableField(value = "design_task_code")
    var designTaskCode: String? = null,
    /**
     * 选款状态：0待选中,1已选中,2未选中
     */
    @TableField(value = "picking_state")
    var pickingState: Int? = null,
    /**
     * 选款id
     */
    @TableField(value = "picking_id")
    var pickingId: Long? = null,
    /**
     * 款式id
     */
    @TableField(value = "picking_style_id")
    var pickingStyleId: Long? = null,
    /**
     * 选中的款式顺序(第几个款)
     */
    @TableField(value = "picking_style_sort")
    var pickingStyleSort: Int? = null,
    /**
     * 选款人ID(买手)
     */
    @TableField(value = "selector_id")
    var selectorId: Long? = null,
    /**
     * 选款人名称(买手)
     */
    @TableField(value = "selector_name")
    var selectorName: String? = null,
    /**
     * 选款时间
     */
    @TableField(value = "selection_time")
    var selectionTime: LocalDateTime? = null,
    /**
     * 建议价格
     */
    @TableField(value = "suggested_price")
    var suggestedPrice: BigDecimal? = null,
    /**
     * 建议风格
     */
    @TableField(value = "suggested_style_code")
    var suggestedStyleCode: String? = null,
    /**
     * 建议风格
     */
    @TableField(value = "suggested_style_name")
    var suggestedStyleName: String? = null,


    /**
     * 波段编码
     */
    @TableField(value = "wave_band_code")
    var waveBandCode: String? = null,

    /**
     * 波段名称
     */
    @TableField(value = "wave_band_name")
    var waveBandName: String? = null,

    /**
     * 店铺ID
     */
    @TableField(value = "store_id")
    var storeId: Long? = null,

    /**
     * 店铺名称
     */
    @TableField(value = "store_name")
    var storeName: String? = null,


    /**
     * 开款任务ID
     */
    @TableField(value = "develop_style_task_id")
    var developStyleTaskId: Long? = null,


    /**
     * 开款任务编码
     */
    @TableField(value = "develop_style_task_code")
    var developStyleTaskCode: String? = null,


    /**
     * 建议品类
     */
    @TableField(value = "suggested_category_code")
    var suggestedCategoryCode: String? = null,
    /**
     * 建议品类
     */
    @TableField(value = "suggested_category_name")
    var suggestedCategoryName: String? = null,
    /**
     * 建议波段
     */
    @TableField(value = "suggested_wave_batch_code")
    var suggestedWaveBatchCode: String? = null,
    /**
     * 建议店铺id
     */
    @TableField(value = "suggested_shop_id")
    var suggestedShopId: Long? = null,
    /**
     * 建议店铺code
     */
    @TableField(value = "suggested_shop_code")
    var suggestedShopCode: String? = null,
    /**
     * 建议店铺name
     */
    @TableField(value = "suggested_shop_name")
    var suggestedShopName: String? = null,
    /**
     * 建议国家站点
     */
    @TableField(value = "suggested_country_site_code")
    var suggestedCountrySiteCode: String? = null,
    /**
     * 建议国家站点
     */
    @TableField(value = "suggested_country_site_name")
    var suggestedCountrySiteName: String? = null,
    /**
     * 建议印花(字典code)
     */
    @TableField(value = "suggested_printing_code")
    var suggestedPrintingCode: String? = null,
    /**
     * 货盘编号
     */
    @TableField(value = "cargo_tray_code")
    var cargoTrayCode: String? = null,
    /**
     * 附件
     */
    @TableField(value = "attachments")
    var attachments: String? = null,
    /**
     * 备注
     */
    @TableField(value = "remark")
    var remark: String? = null,
    /**
     * 创建人ID
     */
    @TableField(value = "picking_creator_id")
    var pickingCreatorId: Long? = null,
    /**
     * 创建人姓名
     */
    @TableField(value = "picking_creator_name")
    var pickingCreatorName: String? = null,
    /**
     * 创建时间
     */
    @TableField(value = "picking_created_time")
    var pickingCreatedTime: LocalDateTime? = null,
    /**
     * 开款状态(下游返回) 0待处理、1已开款、2已淘汰
     */
    @TableField(value = "open_style_state")
    var openStyleState: Int? = null,
    /**
     * 设计需求id(设计需求)
     */
    @TableField(value = "style_design_demand_id")
    var styleDesignDemandId: Long? = null,
    /**
     * 来源业务id(设计需求)
     */
    @TableField(value = "style_source_biz_id")
    var styleSourceBizId: Long? = null,
    /**
     * 开款spu编码(设计需求-开款)
     */
    @TableField(value = "style_spu_code")
    var styleSpuCode: String? = null,
    /**
     * 开款skc编码(设计需求-开款)
     */
    @TableField(value = "style_skc_code")
    var styleSkcCode: String? = null,
    /**
     * 开款时间(设计需求-开款)
     */
    @TableField(value = "style_spu_create_time")
    var styleSpuCreateTime: LocalDateTime? = null,
    /**
     * 开款淘汰原因(设计需求-淘汰)
     */
    @TableField(value = "style_eliminate_reason")
    var styleEliminateReason: String? = null,
    /**
     * 淘汰人id(设计需求-淘汰)
     */
    @TableField(value = "style_eliminate_user_id")
    var styleEliminateUserId: Long? = null,
    /**
     * 淘汰人名称(设计需求-淘汰)
     */
    @TableField(value = "style_eliminate_user_name")
    var styleEliminateUserName: String? = null,
    /**
     * 淘汰时间(设计需求-淘汰)
     */
    @TableField(value = "style_eliminate_time")
    var styleEliminateTime: LocalDateTime? = null,
    /**
     * 选择图片信息[{图片url, 图片顺序, 主图标识, 修图标识}]
     */
    @TableField(value = "result_image_info")
    var resultImageInfo: String? = null,
    /**
     * 场景code  v3.9
     */
    @TableField(value = "scene_code")
    var sceneCode: String? = null,

    /**
     * 场景名称 v3.9
     */
    @TableField(value = "scene_name")
    var sceneName: String? = null,

    /**
     * 提交sdp-design状态 10-待推送 20-已推送 30-推送失败  v3.11
     * @see tech.tiangong.sdp.enums.DesignSubmitStatusEnum
     */
    @TableField(value = "design_submit_status")
    var designSubmitStatus: Int? = null,
    /**
     * 租户ID
     */
    @TableField(value = "tenant_id")
    var tenantId: Long? = null,
) : BaseEntityWithNamedAndReviser() {

    fun pickingResult(): Bool = when (pickingState) {
        PickingStateEnum.NOT_AVAILABLE.state, PickingStateEnum.NOT_SELECTED.state -> Bool.NO
        else -> Bool.YES
    }
}


