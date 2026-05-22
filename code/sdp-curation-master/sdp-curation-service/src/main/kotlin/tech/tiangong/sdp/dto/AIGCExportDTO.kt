package tech.tiangong.sdp.dto

import cn.afterturn.easypoi.excel.annotation.Excel
import cn.afterturn.easypoi.excel.annotation.ExcelTarget
import com.fasterxml.jackson.annotation.JsonFormat
import java.math.BigDecimal
import java.time.LocalDateTime

/**
 * 灵感导出DTO
 * @author zjh
 * @date 2024/11/20 10:35
 */
@ExcelTarget("AIGCExportDTO")
class AIGCExportDTO {
    @Excel(name = "任务编码", orderNum = "0", width = 15.0)
    var taskCode: String? = null

    @Excel(name = "款式", orderNum = "1", width = 15.0)
    var styleName: String? = null

    @Excel(name = "状态", orderNum = "2", width = 20.0)
    var state: String? = null


    @Excel(name = "模特图", orderNum = "3", width = 20.0)
    var aiModelUrl: String? = null

    @Excel(name = "背景图", orderNum = "4", width = 20.0)
    var picturePath: String? = null

    @Excel(name = "模型", orderNum = "5", width = 20.0)
    var modeName: String? = null

    @Excel(name = "参考权重", orderNum = "6", width = 20.0)
    var refWeight: String? = null

    @Excel(name = "参考图", orderNum = "7", width = 20.0)
    var referencePicture: String? = null

    @Excel(name = "算法品类", orderNum = "8", width = 20.0)
    var identifyCategoryName: String? = null


    @Excel(name = "图片1", orderNum = "9", width = 55.0)
    var image1: String? = null

    @Excel(name = "图片2", orderNum = "10", width = 16.0)
    var image2: String? = null

    @Excel(name = "图片3", orderNum = "11", width = 16.0)
    var image3: String? = null

    @Excel(name = "图片4", orderNum = "12", width = 16.0)
    var image4: String? = null

    @Excel(name = "创建人", orderNum = "13", width = 16.0)
    var creatorName: String? = null

    @Excel(name = "选款人", orderNum = "14", width = 16.0)
    var selectorName: String? = null

    @Excel(name = "创建日期", orderNum = "15", width = 16.0)
    var createdTime: String? = null

    @Excel(name = "选款日期", orderNum = "16", width = 16.0)
    var selectionTime: String? = null





}