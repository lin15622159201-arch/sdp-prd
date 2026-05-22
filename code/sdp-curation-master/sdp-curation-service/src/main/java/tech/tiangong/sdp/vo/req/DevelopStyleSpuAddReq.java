package tech.tiangong.sdp.vo.req;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import tech.tiangong.sdp.enums.DevelopStyleTypeEnum;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 开款任务 - 开款
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 10:50
 */
@Data
public class DevelopStyleSpuAddReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 1439969422803834460L;
    /**
     * 任务id
     */
    @NotNull(message = "任务id不能为空")
    private Long taskId;
    /**
     * 主图url
     */
    @NotEmpty(message = "主图不能为空")
    private String mainImgUrl;

    /**
     * 供给方式
     */
//    @NotEmpty(message = "供给方式不能为空")
    private String supplyModeName;

    /**
     * 供给方式编码
     */
//    @NotEmpty(message = "供给方式编码不能为空")
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
//    @NotEmpty(message = "场景名称不能为空")
    private String sceneName;

    /**
     * 场景编码
     */
//    @NotEmpty(message = "场景编码不能为空")
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
//    @NotEmpty(message = "波段编码不能为空")
    private String waveBandCode;

    /**
     * 波段名称
     */
//    @NotEmpty(message = "波段名称不能为空")
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
//    @NotEmpty(message = "现货类型编码不能为空")
    private String spotStyleTypeCode;

    /**
     * 现货类型名称
     */
//    @NotEmpty(message = "现货类型名称不能为空")
    private String spotStyleTypeName;

    /**
     * 开款类型
     */
    @NotNull(message = "开款类型不能为空")
    private DevelopStyleTypeEnum styleType;


    /**
     * 平台编码
     */
//    @NotEmpty(message = "平台编码不能为空")
    private String platformCode;

    /**
     * 平台名称
     */
//    @NotEmpty(message = "平台名称不能为空")
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
//    @NotEmpty(message = "版型编码不能为空")
    private String patternCode;

    /**
     * 版型名称
     */
//    @NotEmpty(message = "版型名称不能为空")
    private String patternName;

    /**
     * 弹性编码
     */
//    @NotEmpty(message = "弹性编码不能为空")
    private String elasticCode;

    /**
     * 弹性名称
     */
//    @NotEmpty(message = "弹性名称不能为空")
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
//    @NotEmpty(message = "sku类别编码不能为空")
    private String skuClassCode;

    /**
     * sku类别名称
     */
//    @NotEmpty(message = "sku类别名称不能为空")
    private String skuClassName;
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
     * 套装件数
     */
    private Integer suitPiece;

    /**
     * 前置拆版状态 0=否 1=是
     */
    private Integer preDisassemblyState;

    /**
     * 商品链接
     */
    @Size(max = 512, message = "商品链接不能大于512")
    private String commodityLink;
    /**
     * 项目类型编码
     */
    private String projectTypeCode;

    /**
     * 项目类型名称
     */
    private String projectTypeName;
    /**
     * 款式类型编码
     */
    private String designTypeCode;
    /**
     * 款式类型名称
     */
    private String designTypeName;
    @Valid
    @NotEmpty(message = "SKC颜色不能为空")
    private List<DevelopStyleSkcAddReq> skcs;
}
