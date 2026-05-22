package tech.tiangong.sdp.dao.entity

import com.baomidou.mybatisplus.annotation.*

import team.aikero.blade.data.mybatis.entity.BaseEntityWithNamedAndReviser
import java.math.BigDecimal

import java.time.LocalDateTime

/**
 * 灵感数据(Inspiration)表名: inspiration
 *
 * @author zjh
 * @since 2025-01-14 10:48:46
 */
@TableName(value = "inspiration")
data class Inspiration(
    /**
     * 灵感id
     */
    @TableId(value = "inspiration_id", type = IdType.ASSIGN_ID)
    var inspirationId: Long? = null,

    /**
     * 灵感编号
     */
    @TableField(value = "inspiration_code")
    var inspirationCode: String? = null,
    /**
     * 第三方灵感id
     */
    @TableField(value = "third_inspiration_id")
    var thirdInspirationId: String? = null,
    /**
     * 第三方灵感信息
     */
    @TableField(value = "third_inspiration_info")
    var thirdInspirationInfo: String? = null,
    /**
     * 企划来源code
     */
    @TableField(value = "planning_source_code")
    var planningSourceCode: String? = null,
    /**
     * 企划来源name
     */
    @TableField(value = "planning_source_name")
    var planningSourceName: String? = null,
    /**
     * 波次编号
     */
    @TableField(value = "wave_batch_code")
    var waveBatchCode: String? = null,
    /**
     * 灵感图
     */
    @TableField(value = "inspiration_image")
    var inspirationImage: String? = null,
    /**
     * 灵感图来源code
     */
    @TableField(value = "inspiration_image_source_code")
    var inspirationImageSourceCode: String? = null,
    /**
     * 灵感图来源
     */
    @TableField(value = "inspiration_image_source")
    var inspirationImageSource: String? = null,
    /**
     * 灵感图品牌code
     */
    @TableField(value = "inspiration_brand_code")
    var inspirationBrandCode: String? = null,

    /**
     * 灵感图品牌
     */
    @TableField(value = "inspiration_brand")
    var inspirationBrand: String? = null,
    /**
     * 导入灵感图原图URL
     */
    @TableField(value = "source_image")
    var sourceImage: String? = null,
    /**
     * 导入灵感图原图名称
     */
    @TableField(value = "source_image_name")
    var sourceImageName: String? = null,
    /**
     * 商品链接URL
     */
    @TableField(value = "product_link")
    var productLink: String? = null,
    /**
     * 外部品类
     */
    @TableField(value = "external_category")
    var externalCategory: String? = null,
    /**
     * 来源国家站点code
     */
    @TableField(value = "country_site_code")
    var countrySiteCode: String? = null,
    /**
     * 来源国家站点name
     */
    @TableField(value = "country_site_name")
    var countrySiteName: String? = null,
    /**
     * 划线价(US)
     */
    @TableField(value = "retail_price")
    var retailPrice: String? = null,
    /**
     * 销售价(US)
     */
    @TableField(value = "sale_price")
    var salePrice: String? = null,
    /**
     * @since v3.9
     * 期望成本价
     */
    @TableField(value = "expected_cost_price")
    var expectedCostPrice: BigDecimal? = null,
    /**
     * 建议供给方式code
     */
    @TableField(value = "suggested_supply_mode_code")
    var suggestedSupplyModeCode: String? = null,
    /**
     * 建议供给方式name
     */
    @TableField(value = "suggested_supply_mode_name")
    var suggestedSupplyModeName: String? = null,
    /**
     * 灵感创建时间
     */
    @TableField(value = "inspiration_created_time")
    var inspirationCreatedTime: LocalDateTime? = null,
    /**
     * 数据来源
     */
    @TableField(value = "data_source")
    var dataSource: String? = null,
    /**
     * 灵感提交次数
     */
    @TableField(value = "submit_count")
    var submitCount: Int? = null,
    /**
     * 状态: 0待提交, 1已提交
     */
    @TableField(value = "submit_status")
    var submitStatus: Int? = null,
    /**
     * 最后提交时间
     */
    @TableField(value = "last_submit_time")
    var lastSubmitTime: LocalDateTime? = null,
    /**
     * 提交-推送到AIDC 1是0否
     */
    @TableField(value = "submit_push_aidc")
    var submitPushAidc: Int? = null,
    /**
     * 上架-推送到AIDC 1是0否
     */
    @TableField(value = "online_push_aidc")
    var onlinePushAidc: Int? = null,
    /**
     * 识别任务id
     */
    @TableField(value = "identified_id")
    var identifiedId: Long? = null,
    /**
     * 识别结果
     */
    @TableField(value = "identified_status")
    var identifiedStatus: Int? = null,
    /**
     * 识别结果描述
     */
    @TableField(value = "identified_message")
    var identifiedMessage: String? = null,
    /**
     * 识别品类
     */
    @TableField(value = "identified_category")
    var identifiedCategory: String? = null,
    /**
     * 识别品类code
     */
    @TableField(value = "identified_category_code")
    var identifiedCategoryCode: String? = null,
    /**
     * 识别标签
     */
    @TableField(value = "identified_label")
    var identifiedLabel: String? = null,
    /**
     * 面料标签-面料市场名
     */
    @TableField(value = "fabric_label_market_name")
    var fabricLabelMarketName: String? = null,
    /**
     * 面料标签-色号
     */
    @TableField(value = "fabric_label_color_code")
    var fabricLabelColorCode: String? = null,
    /**
     * 面料标签-色相/色系
     */
    @TableField(value = "fabric_label_color_hue")
    var fabricLabelColorHue: String? = null,
    /**
     * 款式类型：0-净色、1-花型
     */
    @TableField(value = "style_type")
    var styleType: Int? = null,
    /**
     * 信息备注
     */
    @TableField(value = "message")
    var message: String? = null,


    /**
     * 风格code
     */
    @TableField(value = "style_code")
    var styleCode: String? = null,

    /**
     * 风格name
     */
    @TableField(value = "style_name")
    var styleName: String? = null,

    /**
     * 年龄code
     */
    @TableField(value = "age_code")
    var ageCode: String? = null,

    /**
     * 年龄name
     */
    @TableField(value = "age_name")
    var ageName: String? = null,

    /**
     * 爆款code
     */
    @TableField(value = "popular_code")
    var popularCode: String? = null,

    /**
     * 爆款name
     */
    @TableField(value = "popular_name")
    var popularName: String? = null,

    /**
     * 款式来源code
     */
    @TableField(value = "style_source_code")
    var styleSourceCode: String? = null,

    /**
     * 款式来源name
     */
    @TableField(value = "style_source_name")
    var styleSourceName: String? = null,



    /**
     * 是否使用加速推理
     */
    @TableField(value = "fast_forward")
    var fastForward: Int? = null,
    /**
     * 租户id
     */
    @TableField(value = "tenant_id")
    var tenantId: Long? = null,
) : BaseEntityWithNamedAndReviser()


