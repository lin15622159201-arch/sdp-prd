package tech.tiangong.sdp.dto

import com.alibaba.excel.annotation.ExcelProperty
import org.apache.commons.lang3.StringUtils
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

/**
 * 选款历史数据导入
 * @author zjh
 * @date 2024/11/20 10:35
 */
class PickingOldDataImportDTO {
    @ExcelProperty(value = ["选中日期"], index = 0)
    var selectedDate: String? = null

    @ExcelProperty(value = ["国家"], index = 1)
    var country: String? = null

    @ExcelProperty(value = ["商品URL"], index = 2)
    var productUrl: String? = null

    @ExcelProperty(value = ["灵感图来源"], index = 3)
    var inspirationImageSource: String? = null

    @ExcelProperty(value = ["原图URL"], index = 4)
    var originalImageUrl: String? = null

    @ExcelProperty(value = ["生成图URL(1)"], index = 5)
    var generatedImageUrl1: String? = null

    @ExcelProperty(value = ["生成图URL(2)"], index = 6)
    var generatedImageUrl2: String? = null

    @ExcelProperty(value = ["生成图URL(3)"], index = 7)
    var generatedImageUrl3: String? = null

    @ExcelProperty(value = ["生成图URL(4)"], index = 8)
    var generatedImageUrl4: String? = null

    @ExcelProperty(value = ["任务编号"], index = 9)
    var taskCode: String? = null

    @ExcelProperty(value = ["指导价格"], index = 10)
    var guidancePrice: String? = null

    @ExcelProperty(value = ["买手备注"], index = 11)
    var buyerRemark: String? = null

    @ExcelProperty(value = ["设计师"], index = 12)
    var designer: String? = null

    @ExcelProperty(value = ["选图人"], index = 13)
    var imageSelector: String? = null

    @ExcelProperty(value = ["货盘类型"], index = 14)
    var productDiskType: String? = null

    @ExcelProperty(value = ["系统对应品类"], index = 15)
    var systemCategory: String? = null

    @ExcelProperty(value = ["系统对应店铺"], index = 16)
    var systemShop: String? = null

    @ExcelProperty(value = ["系统对应商品来源渠道"], index = 17)
    var systemProductSourceChannel: String? = null

    @ExcelProperty(value = ["系统风格标签"], index = 18)
    var systemStyleTag: String? = null

    @ExcelProperty(value = ["设计款号"], index = 19)
    var designStyleCode: String? = null

    @ExcelProperty(value = ["拆板日期"], index = 20)
    var dismantlingDate: String? = null

    @ExcelProperty(value = ["最终确认的系统波段"], index = 21)
    var systemWaveBand: String? = null

    @ExcelProperty(value = ["流转状态判定"], index = 22)
    var flowStatusJudgment: String? = null

    @ExcelProperty(value = ["淘汰原因"], index = 23)
    var eliminationReason: String? = null

    @ExcelProperty(value = ["设计备注"], index = 24)
    var designRemark: String? = null

    @ExcelProperty(value = ["SPU"], index = 25)
    var spuCode: String? = null

    companion object {
        /**
         * 日期格式转换(入参格式:1114)
         *
         * @param date
         * @return
         */
        fun convertDate(date: String?): LocalDateTime? {
            if (StringUtils.isBlank(date)) {
                return null
            }
            val all = "2024$date"
            val formatter = DateTimeFormatter.ofPattern("yyyyMMdd")
            val localDate = LocalDate.parse(all, formatter)
            val localDateTime = localDate.atStartOfDay()
            return localDateTime
        }

        /**
         * 日期格式转换(入参格式:24/11/21)
         *
         * @param date
         * @return
         */
        fun convertDateV2(date: String?): LocalDateTime? {
            if (StringUtils.isBlank(date)) {
                return null
            }
            val formatter = DateTimeFormatter.ofPattern("yy/M/d")
            return date?.let { LocalDate.parse(it, formatter).atStartOfDay() }
        }

    }
}