package tech.tiangong.sdp.utils

import cn.afterturn.easypoi.excel.ExcelExportUtil
import cn.afterturn.easypoi.excel.entity.ExportParams
import cn.afterturn.easypoi.excel.entity.enmus.ExcelType
import com.google.common.io.Files
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import java.io.IOException
import java.io.OutputStream
import java.io.UnsupportedEncodingException
import java.net.URLEncoder
import java.util.function.Consumer
import jakarta.servlet.ServletOutputStream
import jakarta.servlet.http.HttpServletResponse

/**
 * 文件导出工具类
 * @author zjh
 * @date 2024/11/20 15:31
 */
@Slf4j
class FileExportUtils {

    companion object {

        private val mediaTypes: MutableMap<String, String> = mutableMapOf<String, String>().apply {
            this["pdf"] = "application/pdf"
            this["xls"] = "application/vnd.ms-excel"
            this["xlsx"] = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }

        /**
         * entity导出
         *
         * @param fileName     文件名
         * @param response     [HttpServletResponse]
         * @param zClass       数据实体class
         * @param dataList     数据
         * @throws IOException [IOException]
         */
        @Throws(IOException::class)
        @JvmStatic
        fun exportExcelEntity(fileName: String, response: HttpServletResponse, zClass: Class<*>, dataList: List<*>) {
            // 设置Excel的标题和表格名称
            val exportParams = ExportParams()
            /*
        在选择使用 HSSF 还是 XSSF 时，需要考虑以下因素：
        文件格式要求：如果需要与旧版本的 Excel 兼容，或者文件大小较小，可以选择 HSSF。如果需要处理较大的文件或者使用 Excel 2007 及更高版本的功能，可以选择 XSSF。
        性能需求：对于较小的文件，HSSF 可能更快；对于较大的文件，XSSF 可能更合适。
        功能需求：XSSF 通常提供更多的功能和灵活性，例如更多的样式选项和对新的 Excel 功能的支持。
         */
            exportParams.type = ExcelType.XSSF
            // 导出
            val workbook = ExcelExportUtil.exportExcel(exportParams, zClass, dataList)
            writeOutputStream(response, fileName) { os: OutputStream ->
                try {
                    workbook.write(os)
                } catch (e: IOException) {
                    e.printStackTrace()
                }
            }
            workbook.close()
        }

        /**
         * workbook 写入响应流
         *
         * @param response 响应流
         * @param consumer
         * @throws IOException
         */
        @Throws(IOException::class)
        fun writeOutputStream(response: HttpServletResponse, fileName: String, consumer: Consumer<OutputStream>) {
            setContentType(response, fileName)
            var os: ServletOutputStream? = null
            try {
                os = response.outputStream
                consumer.accept(os)
            } catch (e: IOException) {
                log.error(e) { "write to outputStream error" }
                throw e
            } finally {
                if (null != os) {
                    os.flush()
                    os.close()
                }
            }
        }

        /**
         * 设置响应头
         *
         * @param response 响应流
         * @param fileName 文件名
         */
        @Throws(UnsupportedEncodingException::class)
        private fun setContentType(response: HttpServletResponse, fileName: String) {
            response.reset()
            val ext = Files.getFileExtension(fileName)
            response.contentType = getContentType(ext)
            response.setHeader("Access-Control-Expose-Headers", "Content-Disposition")
            response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"))
            response.characterEncoding = "UTF-8"
        }

        /**
         * 设置响应头
         *
         * @param ext
         * @return
         */
        private fun getContentType(ext: String): String {
            val contentType: String = mediaTypes[ext] ?: return "application/octet-stream"
            return contentType
        }
    }
}
