package tech.tiangong.sdp.req.inspiration

import java.time.LocalDateTime


data class ThirdInspirationSaveReq(
    /**
     * 第三方灵感id
     */
    var thirdInspirationId: String? = null,
    /**
     * 第三方灵感信息
     */
    var thirdInspirationInfo: String? = null,
    /**
     * 企划来源
     */
    var planningSourceCode: String? = null,
    /**
     * 企划来源
     */
    var planningSourceName: String? = null,
    /**
     * 灵感图
     */
    var inspirationImage: String? = null,
    /**
     * 导入灵感图原图URL
     */
    var sourceImage: String? = null,
    /**
     * 商品链接
     */
    var productLink: String? = null,
    /**
     * 外部品类
     */
    var externalCategory: String? = null,
    /**
     * 灵感图来源
     */
    var inspirationImageSource: String? = null,
    /**
     * 来源国家站点code
     */
    var countrySiteCode: String? = null,
    /**
     * 来源国家站点name
     */
    var countrySiteName: String? = null,
    /**
     * 划线价(US)
     */
    var retailPrice: String? = null,
    /**
     * 销售价(US)
     */
    var salePrice: String? = null,
    /**
     * 灵感创建时间
     */
    var inspirationCreatedTime: LocalDateTime? = null,
    /**
     * 数据来源
     */
    var dataSource: String? = null,
)