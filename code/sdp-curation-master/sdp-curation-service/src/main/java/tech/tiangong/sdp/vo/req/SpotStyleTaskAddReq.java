package tech.tiangong.sdp.vo.req;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
 * 现货管理 - 新增
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 10:50
 */
@Data
public class SpotStyleTaskAddReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 6738833745671252507L;
    /**
     * 主图url
     */
    private String mainImgUrl;

    /**
     * 供给方式
     */
    private String supplyModeName;

    /**
     * 供给方式编码
     */
    private String supplyModeCode;

    /**
     * 店铺id
     */
    @NotNull(message = "店铺id不能为空")
    private Long storeId;

    /**
     * 店铺名称
     */
    @NotEmpty(message = "店铺名称不能为空")
    private String storeName;

    /**
     * 场景名称
     */
    private String sceneName;

    /**
     * 场景编码
     */
    private String sceneCode;

    /**
     * 品质等级
     */
    @NotEmpty(message = "品质等级不能为空")
    private String qualityLevelName;

    /**
     * 品质等级编号
     */
    @NotEmpty(message = "品质等级编号不能为空")
    private String qualityLevelCode;

    /**
     * 款式等级
     */
    @NotEmpty(message = "款式等级不能为空")
    private String styleLevelName;

    /**
     * 款式等级编号
     */
    @NotEmpty(message = "款式等级编号不能为空")
    private String styleLevelCode;

    /**
     * 织造方式code
     */
    @NotEmpty(message = "织造方式编号不能为空")
    private String weaveModeCode;

    /**
     * 织造方式
     */
    @NotEmpty(message = "织造方式不能为空")
    private String weaveModeName;

    /**
     * 波段编码
     */
    @NotEmpty(message = "波段编码不能为空")
    private String waveBandCode;

    /**
     * 波段名称
     */
    @NotEmpty(message = "波段名称不能为空")
    private String waveBandName;

    /**
     * 款式品类编码
     */
    @NotEmpty(message = "款式品类编码不能为空")
    private String categoryCode;

    /**
     * 款式品类名
     */
    @NotEmpty(message = "款式品类名不能为空")
    private String categoryName;

    /**
     * 尺码标准
     */
    @NotEmpty(message = "尺码标准不能为空")
    private String sizeStandardName;

    /**
     * 尺码标准编号
     */
    @NotEmpty(message = "尺码标准编号不能为空")
    private String sizeStandardCode;

    /**
     * 款式风格编码
     */
    @NotEmpty(message = "款式风格编码不能为空")
    private String clothingStyleName;

    /**
     * 款式风格名称
     */
    @NotEmpty(message = "款式风格名称不能为空")
    private String clothingStyleCode;

    /**
     * 现货类型编码
     */
    @NotEmpty(message = "现货类型编码不能为空")
    private String spotStyleTypeCode;

    /**
     * 现货类型名称
     */
    @NotEmpty(message = "现货类型名称不能为空")
    private String spotStyleTypeName;

    /**
     * 平台编码
     */
    @NotEmpty(message = "平台编码不能为空")
    private String platformCode;

    /**
     * 平台名称
     */
    @NotEmpty(message = "平台名称不能为空")
    private String platformName;

    /**
     * 印花编码
     */
    @NotEmpty(message = "印花编码不能为空")
    private String printingCode;

    /**
     * 印花名称
     */
    @NotEmpty(message = "印花名称不能为空")
    private String printingName;

    /**
     * 版型编码
     */
    @NotEmpty(message = "版型编码不能为空")
    private String patternCode;

    /**
     * 版型名称
     */
    @NotEmpty(message = "版型名称不能为空")
    private String patternName;

    /**
     * 弹性编码
     */
    @NotEmpty(message = "弹性编码不能为空")
    private String elasticCode;

    /**
     * 弹性名称
     */
    @NotEmpty(message = "弹性名称不能为空")
    private String elasticName;

    /**
     * 季节编码
     */
    @NotEmpty(message = "季节编码不能为空")
    private String seasonCode;

    /**
     * 季节名称
     */
    @NotEmpty(message = "季节名称不能为空")
    private String seasonName;

    /**
     * 节日编码
     */
//    @NotEmpty(message = "节日编码不能为空")
    private String galaCode;

    /**
     * 节日名称
     */
//    @NotEmpty(message = "节日名称不能为空")
    private String galaName;

    /**
     * 视觉形式编码
     */
    @NotEmpty(message = "视觉形式编码不能为空")
    private String visualFormCode;

    /**
     * 视觉形式名称
     */
    @NotEmpty(message = "视觉形式名称不能为空")
    private String visualFormName;

    /**
     * sku类别编码
     */
    private String skuClassCode;

    /**
     * sku类别名称
     */
    private String skuClassName;
    /**
     * 套装件数
     */
    private Integer suitPiece;
    /**
     * 款式标签编码
     */
    @NotEmpty(message = "款式标签编码不能为空")
    private String styleLabelCode;
    /**
     * 款式标签名称
     */
    @NotEmpty(message = "款式标签名称不能为空")
    private String styleLabelName;

    /**
     * 货盘类型名称
     */
    private String palletTypeName;

    /**
     * 货盘类型编码
     */
    private String palletTypeCode;
    /**
     * 成衣毛重
     */
    private BigDecimal clothGrossWeight;
    /**
     * 商品链接
     */
    @Size(max = 512 , message = "商品链接不能大于512")
    private String commodityLink;
    /**
     * 开款类型
     */
    private String styleType;
    /**
     * 数据来源
     */
    private String sourceType;

    /**
     * 数据来源ID
     */
    private Long sourceId;

    /**
     * 成分
     */
    @Valid
    @NotEmpty(message = "成分不能为空")
    private List<SpotStyleIngredientAddReq> ingredients;
    /**
     * 供应商
     */
    @Valid
    @NotEmpty(message = "供应商不能为空")
    private List<SpotStyleSupplierAddReq> suppliers;
    /**
     * SKC
     */
    @Valid
    @NotEmpty(message = "SKC不能为空")
    private List<SpotStyleSkcAddReq> skcs;
    /**
     * 商品图片
     */
    @NotEmpty(message = "商品图片不能为空")
    @Size(max = 20, message = "商品图片不能超过20")
    private List<String> productImages;
    /**
     * 尺码图片
     */
    @NotEmpty(message = "尺码图片不能为空")
    private List<String> sizeImages;
}
