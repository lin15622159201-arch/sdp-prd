package tech.tiangong.sdp.vo.dto;


import com.alibaba.excel.annotation.ExcelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

/**
 * SKC图片(Excel导入)Dto
 *
 * @author qinwenxuan@zj.tech
 * @since 2025-11-03 14:39:39
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SkcImageExcelDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = -5697174772476386379L;
    /**
     * SKC编码
     */
    @ExcelProperty(value = "SKC", index = 0)
    private String skcCode;

    /**
     * 图片地址
     */
    @ExcelProperty(value = "图片链接", index = 1)
    private String imageUrl;
}
