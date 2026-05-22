package tech.tiangong.sdp.dto

import cn.afterturn.easypoi.excel.annotation.Excel
import cn.afterturn.easypoi.excel.annotation.ExcelTarget
import java.math.BigDecimal
import java.time.LocalDateTime

/**
 * 灵感导出DTO
 * @author zjh
 * @date 2024/11/20 10:35
 */
@ExcelTarget("InspirationExportDTO")
class InspirationExportDTO {
    @Excel(name = "企划来源", orderNum = "0", width = 15.0)
    var planningSource: String? = null

    @Excel(name = "波次", orderNum = "1", width = 15.0)
    var waveBatchCode: String? = null

    @Excel(name = "灵感图", orderNum = "2", width = 20.0)
    var inspirationImage: String? = null

    @Excel(name = "外部品类", orderNum = "3", width = 55.0)
    var externalCategory: String? = null

    @Excel(name = "灵感图来源", orderNum = "4", width = 16.0)
    var inspirationImageSource: String? = null

    @Excel(name = "来源国家站点", orderNum = "5", width = 16.0)
    var sourceCountrySiteName: String? = null

    @Excel(name = "划线价(US)", orderNum = "6", width = 16.0)
    var retailPrice: String? = null

    @Excel(name = "售价(US)", orderNum = "7", width = 16.0)
    var salePrice: String? = null

    @Excel(name = "建议供给方式", orderNum = "8", width = 16.0)
    var suggestedSupplyMethod: String? = null

    @Excel(name = "灵感创建时间", orderNum = "9", format = "yyyy-MM-dd HH:mm:ss", width = 20.0)
    var inspirationCreatedTime: LocalDateTime? = null

    @Excel(name = "数据来源", orderNum = "10", width = 16.0)
    var dataSource: String? = null

    @Excel(name = "商品链接", orderNum = "11", width = 20.0)
    var productLink: String? = null

    @Excel(name = "识别品类", orderNum = "12", width = 12.0)
    var identifiedCategory: String? = null

    @Excel(name = "识别结果", orderNum = "13", width = 12.0)
    var identifiedStatus: String? = null

    @Excel(name = "识别标签", orderNum = "14", width = 30.0)
    var identifiedLabel: String? = null

    @Excel(name = "款式类型", orderNum = "15", width = 12.0)
    var styleType: String? = null

    @Excel(name = "灵感提交次数", orderNum = "16", width = 16.0, type = 10)
    var submitCount: Int? = null

    @Excel(name = "状态", orderNum = "17", width = 12.0)
    var submitStatus: String? = null
}