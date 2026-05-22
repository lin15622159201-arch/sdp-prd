package tech.tiangong.sdp.dao.entity

import com.baomidou.mybatisplus.annotation.*

import team.aikero.blade.data.mybatis.entity.BaseEntityWithNamedAndReviser

import java.time.LocalDateTime

/**
 * 灵感数据-aidc源数据(InspirationAidcSource)表名: inspiration_aidc_source
 *
 * @author zjh
 * @since 2025-01-14 10:47:41
 */
@TableName(value = "inspiration_aidc_source")
data class InspirationAidcSource(
    /**
     * 灵感id
     */
    @TableId(value = "inspiration_id", type = IdType.ASSIGN_ID)
    var inspirationId: Long? = null,

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
     * 灵感图来源
     */
    @TableField(value = "inspiration_image_source")
    var inspirationImageSource: String? = null,
    /**
     * 导入灵感图原图URL
     */
    @TableField(value = "source_image")
    var sourceImage: String? = null,
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
     * 处理状态: 0待处理,1已处理
     */
    @TableField(value = "handle_status")
    var handleStatus: Int? = null,
    /**
     * 处理信息
     */
    @TableField(value = "handle_message")
    var handleMessage: String? = null,
) : BaseEntityWithNamedAndReviser()


