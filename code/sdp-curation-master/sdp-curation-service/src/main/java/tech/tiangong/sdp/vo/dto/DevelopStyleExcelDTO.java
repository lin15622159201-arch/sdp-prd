package tech.tiangong.sdp.vo.dto;


import com.alibaba.excel.annotation.ExcelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

/**
 * 开款任务(Excel导入)Dto
 *
 * @author qinwenxuan@zj.tech
 * @since 2025-11-03 14:39:39
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DevelopStyleExcelDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = -5697174772476386379L;
    /**
     * 供应商款号
     */
    @ExcelProperty(value = "供应商款号", index = 0)
    private String supplierStyleCode;

    /**
     * 供应商名称
     */
    @ExcelProperty(value = "供应商", index = 1)
    private String supplierName;

    /**
     * 商品链接
     */
    @ExcelProperty(value = "商品链接", index = 2)
    private String commodityLink;
    /**
     * 主图url
     */
    @ExcelProperty(value = "图片链接1", index = 3)
    private String mainImgUrl;


    /**
     * 图片链接2
     */
    @ExcelProperty(value = "图片链接2", index = 4)
    private String imageUrl2;


    /**
     * 图片链接3
     */
    @ExcelProperty(value = "图片链接3", index = 5)
    private String imageUrl3;


    /**
     * 图片链接4
     */
    @ExcelProperty(value = "图片链接4", index = 6)
    private String imageUrl4;


    /**
     * 图片链接5
     */
    @ExcelProperty(value = "图片链接5", index = 7)
    private String imageUrl5;

    /**
     * 图片链接6
     */
    @ExcelProperty(value = "图片链接6", index = 8)
    private String imageUrl6;

    /**
     * 图片链接7
     */
    @ExcelProperty(value = "图片链接7", index = 9)
    private String imageUrl7;

    /**
     * 图片链接8
     */
    @ExcelProperty(value = "图片链接8", index = 10)
    private String imageUrl8;
    /**
     * 图片链接9
     */
    @ExcelProperty(value = "图片链接9", index = 11)
    private String imageUrl9;

    /**
     * 图片链接10
     */
    @ExcelProperty(value = "图片链接10", index = 12)
    private String imageUrl10;
}
