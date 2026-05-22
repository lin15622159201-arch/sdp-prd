package tech.tiangong.sdp.req.inspiration

import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size


data class InspirationImportImageReq(
    /**
     * 供给方式
     */
    var supplyMethodCode: String? = null,
    /**
     * 波次
     */
    var waveBatchCode: String? = null,
    /**
     * 企划来源
     */
    var planningSourceCode: String? = null,
    /**
     * 灵感图来源 v3.10.1
     */
    var inspirationImageSourceCode: String? = null,
    /**
     * 国家站点code
     */
    var countrySiteCode: String? = null,
    /**
     * 灵感图(多个url)
     */
    @field:NotNull(message = "灵感图不能为空")
    @field:Size(min = 1, message = "灵感图不能为空")
    var inspirationImages: List<InspirationImageReq>? = null,

    /**
     * 灵感源品牌 v3.10.1
     */
    var inspirationBrandCode: String? = null,


    /**
     * 风格code
     */
    var styleCode: String? = null,

    /**
     * 年龄code
     */
    var ageCode: String? = null,

    /**
     * 爆款code
     */
    var popularCode: String? = null,

    /**
     * 款式来源code
     */
    var styleSourceCode: String? = null,

    /**
     * 款式来源name
     */
    var styleSourceName: String? = null

    )

