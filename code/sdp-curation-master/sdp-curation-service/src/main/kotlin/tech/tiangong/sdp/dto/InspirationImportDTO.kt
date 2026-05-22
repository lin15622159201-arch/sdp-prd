package tech.tiangong.sdp.dto

import com.alibaba.excel.annotation.ExcelProperty
import java.math.BigDecimal

/**
 * 灵感导入DTO
 * @author zjh
 * @date 2024/11/20 10:35
 */
class InspirationImportDTO {

    @ExcelProperty(value = ["*供给方式"], index = 0)
    var suggestedSupplyMethod: String? = null

    @ExcelProperty(value = ["*企划来源"], index = 1)
    var planningSource: String? = null

    @ExcelProperty(value = ["*选择波次"], index = 2)
    var waveBatchCode: String? = null

    @ExcelProperty(value = ["来源国家站点"], index = 3)
    var sourceCountrySiteName: String? = null

    @ExcelProperty(value = ["*图片URL"], index = 4)
    var sourceImage: String? = null

    @ExcelProperty(value = ["商品URL"], index = 5)
    var productLink: String? = null

    @ExcelProperty(value = ["外部品类"], index = 6)
    var externalCategory: String? = null

    @ExcelProperty(value = ["灵感图来源"], index = 7)
    var inspirationImageSource: String? = null

    @ExcelProperty(value = ["灵感源品牌"], index = 8)
    var inspirationBrand: String? = null

    @ExcelProperty(value = ["划线价(US)"], index = 9)
    var retailPrice: BigDecimal? = null

    @ExcelProperty(value = ["售价(US)"], index = 10)
    var salePrice: BigDecimal? = null

    @ExcelProperty(value = ["风格"], index = 11)
    var styleName: String? = null

    @ExcelProperty(value = ["年龄"], index = 12)
    var ageName: String? = null

    @ExcelProperty(value = ["爆款"], index = 13)
    var popularName: String? = null

    @ExcelProperty(value = ["款式来源"], index = 14)
    var styleSourceName: String? = null
}