package tech.tiangong.sdp.common.dto.picking

import java.math.BigDecimal

/**
 * @author zjh
 * @date 2025/1/8 15:22
 */
data class FabricRecommendSkuDto(
    /**
     * 家族代表名称
     */
    var familyName: String? = null,
    /**
     * 家族代表分数
     */
    var familyScore: BigDecimal? = null,
    /**
     * 家族代表面料类目
     */
    var familyFabricCategory: String? = null,
    /**
     * 中台主商品ID
     */
    var sourceCommodityId: Long? = null,
    /**
     * 商品ID
     */
    var commodityId: Long? = null,
    /**
     * 商品编码
     */
    var commodityCode: String? = null,
    /**
     * 商品名称
     */
    var commodityName: String? = null,
    /**
     * 商品图片
     */
    var commodityPicture: String? = null,
    /**
     * 纹理色块图
     */
    var colorPicture: String? = null,
    /**
     * SKU-ID
     */
    var skuId: Long? = null,
    /**
     * SKU-编码
     */
    var skuCode: String? = null,
    /**
     * 色号
     */
    var colorCode: String? = null,
    /**
     * SKU色块图RGB值
     */
    var rgb: String? = null,
)
