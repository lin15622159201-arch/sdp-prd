package tech.tiangong.sdp.util;

import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.ExcelWriter;
import com.alibaba.excel.write.metadata.WriteSheet;
import com.alibaba.excel.write.metadata.fill.FillConfig;
import com.alibaba.excel.write.metadata.fill.FillWrapper;
import jakarta.servlet.http.HttpServletResponse;
import tech.tiangong.sdp.constant.ExcelTemplateConstant;
import tech.tiangong.sdp.vo.resp.PrototypeExcelResp;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Excel导出工具类
 *
 * @author TG
 * @date 2022/4/14 10:52
 */
public class ExcelExportUtil {


	/**
	 * 款式信息模版导出
	 *
	 * @param resp 信息
	 * @param response          响应流
	 * @throws IOException 文件流异常
	 */
	public static void prototypeTemplateExport(List<PrototypeExcelResp> resp, HttpServletResponse response) throws IOException {
		// 先设置响应头
		response.setCharacterEncoding("UTF-8");
		response.addHeader("Access-Control-Expose-Headers", "Content-disposition");
		response.addHeader("content-type", "application/vnd.ms-excel;charset=utf-8");
		String fileName = "款式信息导出" + "-" + LocalDateTime.now() + ".xlsx";
		response.addHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName, StandardCharsets.UTF_8));

		try (ExcelWriter excelWriter = EasyExcel.write(response.getOutputStream())
				.withTemplate(ExcelTemplateConstant.PROTOTYPE_TEMPLATE_RESOURCE.getInputStream())
				.build()) {

			WriteSheet writeSheet = EasyExcel.writerSheet().build();

			//填充明细列表
			FillConfig fillConfig = FillConfig.builder().forceNewRow(Boolean.TRUE).build();
			excelWriter.fill(new FillWrapper("prototype", resp), fillConfig, writeSheet);
		}
	}
}
