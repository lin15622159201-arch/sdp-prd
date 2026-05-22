package tech.tiangong.sdp.vo.dto;

import com.alibaba.excel.annotation.ExcelProperty;
import com.alibaba.excel.annotation.write.style.ColumnWidth;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

/**
 * 现货导出
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/10 10:58
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpotStyleExportDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 8314437384086452533L;
    /**
     * SPU编码
     */
    @ColumnWidth(20)
    @ExcelProperty(value = "SPU")
    private String taskCode;
    /**
     * skc
     */
    @ColumnWidth(20)
    @ExcelProperty(value = "SKC")
    private String skcCode;
    /**
     * 主图url
     */
    @ColumnWidth(60)
    @ExcelProperty(value = "主图")
    private String mainImgUrl;

    /**
     * 颜色名称
     */
    @ColumnWidth(20)
    @ExcelProperty(value = "颜色")
    private String color;

    /**
     * 颜色英文名
     */
    @ColumnWidth(20)
    @ExcelProperty(value = "颜色英文")
    private String colorEnName;

    /**
     * 尺码标准
     */
    @ColumnWidth(40)
    @ExcelProperty(value = "尺码")
    private String sizeStandardName;

    /**
     * 品类
     */
    @ColumnWidth(40)
    @ExcelProperty(value = "品类")
    private String categoryName;
    /*
     * 供给方式

     @ColumnWidth(20)
     @ExcelProperty(value = "供给方式")
     private String supplyModeName;
     */
    /**
     * 店铺
     */
    @ColumnWidth(20)
    @ExcelProperty(value = "店铺")
    private String storeName;

    /*
     * 货盘类型

     @ColumnWidth(20)
     @ExcelProperty(value = "货盘类型")
     private String palletTypeName;
     */
    /**
     * 现货类型
     */
    @ColumnWidth(20)
    @ExcelProperty(value = "现货类型")
    private String spotTypeName;

    /**
     * 商品类型
     */
    @ColumnWidth(20)
    @ExcelProperty(value = "商品类型")
    private String styleType;


    /**
     * 风格名称
     */
    @ColumnWidth(20)
    @ExcelProperty(value = "风格")
    private String clothingStyleName;

    /**
     * 波段名称
     */
    @ColumnWidth(20)
    @ExcelProperty(value = "波段")
    private String waveBandName;

    /**
     * 供应商名称
     */
    @ColumnWidth(40)
    @ExcelProperty(value = "供应商")
    private String supplierName;

    /**
     * 供应商款号
     */
    @ColumnWidth(20)
    @ExcelProperty(value = "供应商款号")
    private String supplierStyleCode;


    /**
     * 收款人
     */
    @ColumnWidth(20)
    @ExcelProperty(value = "收款人")
    private String payeeName;


    /**
     * 商品链接
     */
    @ColumnWidth(80)
    @ExcelProperty(value = "商品链接")
    private String commodityLink;


    /**
     * 开发人名称
     */
    @ColumnWidth(20)
    @ExcelProperty(value = "开款人")
    private String developerName;


    /**
     * 商品图上传时间
     */
    @ColumnWidth(20)
    @ExcelProperty(value = "商品图上传时间")
    private String productPictureUploadTime;

    /**
     * 创建时间
     */
    @ColumnWidth(20)
    @ExcelProperty(value = "创建时间")
    private String createdTime;

    /**
     * 更新时间
     */
    @ColumnWidth(20)
    @ExcelProperty(value = "更新时间")
    private String revisedTime;

}
