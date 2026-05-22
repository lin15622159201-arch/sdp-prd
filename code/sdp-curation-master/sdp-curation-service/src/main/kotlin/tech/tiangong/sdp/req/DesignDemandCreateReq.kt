package tech.tiangong.sdp.req

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotEmpty
import jakarta.validation.constraints.NotNull
import tech.tiangong.sdp.dao.bo.AttachmentBo
import java.io.Serializable
import java.time.LocalDateTime

class DesignDemandCreateReq(
    @field:NotNull(message = "来源业务id不能为空")
    var sourceBizId: Long? = null,

    var inspirationStyleId: Long? = null,

    var planningId: Long? = null,

    var runNo: String? = null,

    var runCreatorName: String? = null,

    @field:NotBlank(message = "供给方式名称不能为空")
    var supplyModeName: String? = null,

    @field:NotBlank(message = "供给方式编码不能为空")
    var supplyModeCode: String? = null,

    var productLink: String? = null,

    var category: String? = null,

    var categoryName: String? = null,

    var suggestedStyle: String? = null,

    var suggestedStyleCode: String? = null,

    var countrySiteCode: String? = null,

    var countrySiteName: String? = null,

    var storeId: Long? = null,

    var storeName: String? = null,

    var sellingPrice: String? = null,

    var expectedCostPrice: String? = null,

    var sceneName: String? = null,

    var sceneCode: String? = null,

    var submitUserName: String? = null,

    var submitUserId: Long? = null,

    var planningSourceName: String? = null,

    var planningSourceCode: String? = null,

    var waveBandCode: String? = null,

    var waveBandName: String? = null,

    var palletTypeName: String? = null,

    var palletTypeCode: String? = null,

    var aigcRemark: String? = null,

    /**
     * 灵感图来源code
     */
    var inspirationImageSourceCode: String? = null,
    /**
     * 灵感图来源
     */
    var inspirationImageSource: String? = null,
    /**
     * 灵感图品牌code
     */
    var inspirationBrandCode: String? = null,

    /**
     * 灵感图品牌
     */
    var inspirationBrand: String? = null,
    /**
     * 【商品主题】编号 v3.10.1
     */
    var productThemeCode: String? = null,

    /**
     * 【商品主题】名称 v3.10.1
     */
    var productThemeName: String? = null,

    /**
     * 附件
     */
    var attachments: List<AttachmentBo>? = null,

    var chosenId: Long? = null,

    var chosenName: String? = null,

    var chosenTime: LocalDateTime? = null,

    @field:NotBlank(message = "原图不能为空")
    var originalImage: String? = null,

    @field:NotEmpty(message = "灵感图不能为空")
    var inspirationImageList: List<ImageInfo> = emptyList(),

    var suggestedMaterialList: List<SuggestedMaterialInfo> = emptyList()
) : Serializable {
    companion object {
        private const val serialVersionUID = -5767605240003307797L
    }

    data class SuggestedMaterialInfo(
        @field:NotNull(message = "序号不能为空")
        var sortNum: Int? = null,

        var commodityName: String? = null,

        @field:NotNull(message = "序号不能为空")
        var spuId: Long? = null,

        @field:NotBlank(message = "spu编码不能为空")
        var spuCode: String? = null,

        @field:NotNull(message = "序号不能为空")
        var skuId: Long? = null,

        @field:NotBlank(message = "sku编码不能为空")
        var skuCode: String? = null
    ) : Serializable {
        companion object {
            private const val serialVersionUID = 3599315951020878776L
        }
    }
}

data class ImageInfo(
    /**
     * 原图url
     */
    @field:NotBlank(message = "原图不能为空")
    var imageUrl: String,

    ) {
    /**
     * 4k高清图url
     */
    var ultraHdUrl: String? = null

    /**
     * 是否是主图，0-不是，1-是
     */
    var mainImage: Int? = null
}