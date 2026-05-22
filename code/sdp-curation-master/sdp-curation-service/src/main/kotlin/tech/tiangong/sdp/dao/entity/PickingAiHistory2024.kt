package tech.tiangong.sdp.dao.entity

import com.baomidou.mybatisplus.annotation.*

import team.aikero.blade.data.mybatis.entity.BaseEntityWithNamedAndReviser

import java.time.LocalDateTime

/**
 * 选款-历史数据(2024年)(PickingAiHistory2024)表名: picking_ai_history_2024
 *
 * @author qinwenxuan@zj.tech
 * @since 2025-02-07 16:17:03
 */
@TableName(value = "picking_ai_history_2024")
data class PickingAiHistory2024(
    /**
     * id
     */
    @TableId(value = "history_id", type = IdType.ASSIGN_ID)
    var historyId: Long? = null,

    /**
     * 国家
     */
    @TableField(value = "country_code")
    var countryCode: String? = null,
    /**
     * 国家
     */
    @TableField(value = "country")
    var country: String? = null,
    /**
     * 商品URL
     */
    @TableField(value = "product_url")
    var productUrl: String? = null,
    /**
     * 灵感图来源
     */
    @TableField(value = "inspiration_image_source")
    var inspirationImageSource: String? = null,
    /**
     * 原图URL
     */
    @TableField(value = "original_image_url")
    var originalImageUrl: String? = null,
    /**
     * 生成图URL(1)
     */
    @TableField(value = "generated_image_url1")
    var generatedImageUrl1: String? = null,
    /**
     * 生成图URL(2)
     */
    @TableField(value = "generated_image_url2")
    var generatedImageUrl2: String? = null,
    /**
     * 生成图URL(3)
     */
    @TableField(value = "generated_image_url3")
    var generatedImageUrl3: String? = null,
    /**
     * 生成图URL(4)
     */
    @TableField(value = "generated_image_url4")
    var generatedImageUrl4: String? = null,
    /**
     * 任务编号
     */
    @TableField(value = "task_code")
    var taskCode: String? = null,
    /**
     * 指导价格
     */
    @TableField(value = "guidance_price")
    var guidancePrice: String? = null,
    /**
     * 买手备注
     */
    @TableField(value = "buyer_remark")
    var buyerRemark: String? = null,
    /**
     * 设计师
     */
    @TableField(value = "designer")
    var designer: String? = null,
    /**
     * 选图人
     */
    @TableField(value = "image_selector_id")
    var imageSelectorId: Long? = null,
    /**
     * 选图人
     */
    @TableField(value = "image_selector")
    var imageSelector: String? = null,
    /**
     * 选中日期
     */
    @TableField(value = "selected_date")
    var selectedDate: String? = null,
    /**
     * 选中时间
     */
    @TableField(value = "selected_datetime")
    var selectedDatetime: LocalDateTime? = null,
    /**
     * 货盘类型
     */
    @TableField(value = "product_disk_type_code")
    var productDiskTypeCode: String? = null,
    /**
     * 货盘类型
     */
    @TableField(value = "product_disk_type")
    var productDiskType: String? = null,
    /**
     * 系统对应品类
     */
    @TableField(value = "system_category_code")
    var systemCategoryCode: String? = null,
    /**
     * 系统对应品类
     */
    @TableField(value = "system_category")
    var systemCategory: String? = null,
    /**
     * 系统对应店铺
     */
    @TableField(value = "system_shop_id")
    var systemShopId: Long? = null,
    /**
     * 系统对应店铺
     */
    @TableField(value = "system_shop_code")
    var systemShopCode: String? = null,
    /**
     * 系统对应店铺
     */
    @TableField(value = "system_shop")
    var systemShop: String? = null,
    /**
     * 系统对应商品来源渠道
     */
    @TableField(value = "system_product_source_channel")
    var systemProductSourceChannel: String? = null,
    /**
     * 系统风格标签
     */
    @TableField(value = "system_style_tag_code")
    var systemStyleTagCode: String? = null,
    /**
     * 系统风格标签
     */
    @TableField(value = "system_style_tag")
    var systemStyleTag: String? = null,
    /**
     * SPU编号
     */
    @TableField(value = "spu_code")
    var spuCode: String? = null,
    /**
     * 设计款号
     */
    @TableField(value = "design_style_code")
    var designStyleCode: String? = null,
    /**
     * 拆板日期
     */
    @TableField(value = "dismantling_date")
    var dismantlingDate: String? = null,
    /**
     * 拆板日期
     */
    @TableField(value = "dismantling_datetime")
    var dismantlingDatetime: LocalDateTime? = null,
    /**
     * 最终确认的系统波段
     */
    @TableField(value = "system_wave_band_code")
    var systemWaveBandCode: String? = null,
    /**
     * 最终确认的系统波段
     */
    @TableField(value = "system_wave_band")
    var systemWaveBand: String? = null,
    /**
     * 流转状态判定
     */
    @TableField(value = "flow_status_judgment")
    var flowStatusJudgment: String? = null,
    /**
     * 淘汰原因
     */
    @TableField(value = "elimination_reason")
    var eliminationReason: String? = null,
    /**
     * 设计备注
     */
    @TableField(value = "design_remark")
    var designRemark: String? = null,
    /**
     * 选款结果id
     */
    @TableField(value = "picking_result_id")
    var pickingResultId: Long? = null,
    /**
     * 选择图片信息[{图片url, 图片顺序, 主图标识, 修图标识}]
     */
    @TableField(value = "result_image_info")
    var resultImageInfo: String? = null,
    /**
     * 是否转换url(1是 0否)
     */
    @TableField(value = "is_convert_url")
    var isConvertUrl: Int? = null,
    /**
     * 是否创建结果表(1是 0否)
     */
    @TableField(value = "is_create_picking_result")
    var isCreatePickingResult: Int? = null,
    /**
     * 是否推送下游灵感设计(1是 0否)
     */
    @TableField(value = "is_push_inspiration_design")
    var isPushInspirationDesign: Int? = null,
    /**
     * 租户ID
     */
    @TableField(value = "tenant_id")
    var tenantId: Long? = null,
) : BaseEntityWithNamedAndReviser()


