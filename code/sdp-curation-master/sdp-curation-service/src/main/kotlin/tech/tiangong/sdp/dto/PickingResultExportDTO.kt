package tech.tiangong.sdp.dto

import cn.afterturn.easypoi.excel.annotation.Excel
import cn.afterturn.easypoi.excel.annotation.ExcelIgnore
import java.io.Serializable

/**
 * 修图数据导出DTO
 */
data class PickingResultExportDTO(
    @Excel(name = "任务ID", width = 20.0, orderNum = "1")
    val designTaskId: Long?,

    @Excel(name = "跑图任务编号", width = 20.0, orderNum = "2")
    val designTaskCode: String?,

    @Excel(name = "灵感图编号", width = 20.0, orderNum = "3")
    val inspirationCode: String?,

    @ExcelIgnore
    val problemImages: List<String>,

    @Excel(name = "修图建议", width = 50.0, orderNum = "5")
    val attachments: String,

    @Excel(name = "选款人", width = 15.0, orderNum = "6")
    val selectorName: String?,

    @Excel(name = "选款日期", width = 20.0, orderNum = "7")
    val selectionTime: String?,

    @Excel(name = "开款状态", width = 15.0, orderNum = "8")
    val openStyleState: String?,

    @Excel(name = "款号", width = 20.0, orderNum = "9")
    val styleSpuCode: String?,

    @Excel(name = "备注", width = 30.0, orderNum = "10")
    val remark: String?
) : Serializable {
    companion object {
        private const val serialVersionUID = 1L
    }
}
