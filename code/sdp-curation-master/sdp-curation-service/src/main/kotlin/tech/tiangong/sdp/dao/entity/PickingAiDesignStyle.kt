package tech.tiangong.sdp.dao.entity

import com.baomidou.mybatisplus.annotation.*

import team.aikero.blade.data.mybatis.entity.BaseEntityWithNamedAndReviser

import java.math.BigDecimal
import java.time.LocalDateTime

/**
 * 选款-AI设计款式(PickingAiDesignStyle)表名: picking_ai_design_style
 *
 * @author zjh
 * @since 2024-12-19 14:56:17
 */
@TableName(value = "picking_ai_design_style")
data class PickingAiDesignStyle(
    /**
     * 款式id
     */
    @TableId(value = "picking_style_id", type = IdType.ASSIGN_ID)
    var pickingStyleId: Long? = null,

    /**
     * 选款id
     */
    @TableField(value = "picking_id")
    var pickingId: Long? = null,
    /**
     * 选款状态：0待选中,1已选中,2未选中
     */
    @TableField(value = "picking_state")
    var pickingState: Int? = null,
    /**
     * 款式名称(款式1,款式2..)
     */
    @TableField(value = "style_name")
    var styleName: String? = null,
    /**
     * 排序号
     */
    @TableField(value = "sort")
    var sort: Int? = null,
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
     * 建议店铺
     */
    @TableField(value = "suggested_shop_short_code")
    var suggestedShopShortCode: String? = null,
    /**
     * 建议店铺
     */
    @TableField(value = "suggested_shop_name")
    var suggestedShopName: String? = null,
    /**
     * 建议印花(字典code)
     */
    @TableField(value = "suggested_printing_code")
    var suggestedPrintingCode: String? = null,
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
     * 货盘编号
     */
    @TableField(value = "cargo_tray_code")
    var cargoTrayCode: String? = null,
    /**
     * 商品主题编码（来自字典）
     */
    @TableField(value = "product_theme_code")
    var productThemeCode: String? = null,
    /**
     * 商品主题名称（来自字典）
     */
    @TableField(value = "product_theme_name")
    var productThemeName: String? = null,
    /**
     * 备注
     */
    @TableField(value = "remark")
    var remark: String? = null,
    /**
     * 附件
     */
    @TableField(value = "attachments")
    var attachments: String? = null,
    /**
     * 跑图问题反馈code
     */
    @TableField(value = "running_problem_code")
    var runningProblemCode: String? = null,
    /**
     * 跑图问题反馈name
     */
    @TableField(value = "running_problem_name")
    var runningProblemName: String? = null,
    /**
     * 更新版本号(随机)
     */
    @TableField(value = "update_version")
    var updateVersion: Long? = null,
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
     * 租户ID
     */
    @TableField(value = "tenant_id")
    var tenantId: Long? = null,
) : BaseEntityWithNamedAndReviser()


