package tech.tiangong.sdp.dto

import cn.afterturn.easypoi.excel.annotation.Excel
import cn.afterturn.easypoi.excel.annotation.ExcelTarget

/**
 * 选款列表导入Excel对象
 *
 * @author yanjiaming@zj.tech
 * @date 2024/8/6
 */
@ExcelTarget("PickingStyleExcelImportDTO")
class PickingStyleExcelImportDTO {

    @Excel(name ="*企划来源", orderNum = "0")
    var planningSource: String? = null

    @Excel(name ="*选择供给方式", orderNum = "1")
    var supplyMethod: String? = null

    @Excel(name ="*选择波次", orderNum = "2")
    var waveBatchCode: String? = null


    @Excel(name ="*灵感来源", orderNum = "3")
    var inspirationSource: String? = null

    @Excel(name ="外部品类", orderNum = "4")
    var externalCategory: String? = null

    @Excel(name ="*灵感图URL", orderNum = "5")
    var inspirationImage: String? = null

    @Excel(name ="*结果图1", orderNum = "6")
    var resultImage1: String? = null

    @Excel(name ="结果图2", orderNum = "7")
    var resultImage2: String? = null

    @Excel(name ="结果图3", orderNum = "8")
    var resultImage3: String? = null

    @Excel(name ="结果图4", orderNum = "9")
    var resultImage4: String? = null

    @Excel(name ="结果图5", orderNum = "10")
    var resultImage5: String? = null

    @Excel(name ="结果图6", orderNum = "11")
    var resultImage6: String? = null

    @Excel(name ="结果图7", orderNum = "12")
    var resultImage7: String? = null

    @Excel(name ="结果图8", orderNum = "13")
    var resultImage8: String? = null

    /**
     * 冗余结果图字段映射 目前模板是八个
     */
    @Excel(name ="结果图9", orderNum = "14")
    var resultImage9: String? = null

    @Excel(name ="结果图10", orderNum = "15")
    var resultImage10: String? = null

    fun getResultImagesMap(): Map<Int, String> {
        val validEntries = mutableListOf<Pair<Int, String>>()
        listOf(
            1 to resultImage1,
            2 to resultImage2,
            3 to resultImage3,
            4 to resultImage4,
            5 to resultImage5,
            6 to resultImage6,
            7 to resultImage7,
            8 to resultImage8,
            9 to resultImage9,
            10 to resultImage10
        ).forEach { (index, value) ->
            if (value != null) {
                validEntries.add(index to value)
            }
        }
        // 重新生成连续的键
        return validEntries.mapIndexed { index, (_, value) -> index + 1 to value }.toMap()
    }
}
