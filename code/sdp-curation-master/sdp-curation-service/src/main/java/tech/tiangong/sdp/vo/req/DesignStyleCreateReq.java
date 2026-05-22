package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import lombok.experimental.SuperBuilder;
import java.io.Serial;
import java.io.Serializable;

/**
 * SPU-创建Req
 *
 * @author while
 */
@Data
@SuperBuilder
@Accessors(chain = true)
@NoArgsConstructor
public class DesignStyleCreateReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;


    /**
     * 开款类型
     */
    private String styleType;

    /**
     * 来源类型
     */
    private String taskSource;

    /**
     * 来源业务id
     */
    private Long sourceBusinessId;

    /**
     * 款式类型编码
     */
    private String designTypeCode;

    /**
     * 款式类型名称
     */
    private String designTypeName;


    /**
     * 来源业务编码
     */
    private String sourceBusinessCode;

    /**
     * AIGC选款结果ID
     */
    private Long pickingResultId;

    /**
     * AIGC款式id
     */
    private Long pickingStyleId;

    /**
     * 平台编码
     */
    private String platformCode;

    /**
     * 平台名称
     */
    private String platformName;

    /**
     * 开款品类标签
     */
    private String categoryLabels;

    /**
     * 款式品类编码
     */
    @NotBlank(message = "款式品类编码不能为空")
    private String categoryCode;

    /**
     * 款式品类名
     */
    @NotBlank(message = "款式品类名不能为空")
    private String categoryName;

    /**
     * 款式标签编码
     */
    @NotBlank(message = "款式标签编码不能为空")
    private String styleLabelCode;

    /**
     * 款式标签名称
     */
    @NotBlank(message = "款式标签名称不能为空")
    private String styleLabelName;

    /**
     * 店铺id
     */
    @NotNull(message = "店铺id不能为空")
    private Long storeId;

    /**
     * 店铺名称
     */
    @NotBlank(message = "店铺名称不能为空")
    private String storeName;

    /**
     * 尺码标准
     */
    @NotBlank(message = "尺码标准不能为空")
    private String sizeStandardName;

    /**
     * 尺码标准编号
     */
    @NotBlank(message = "尺码标准编号不能为空")
    private String sizeStandardCode;

    /**
     * 波段编码
     */
    private String waveBandCode;

    /**
     * 波段名称
     */
    private String waveBandName;

    /**
     * 款式等级
     */
    @NotBlank(message = "款式等级不能为空")
    private String styleLevelName;

    /**
     * 款式等级编号
     */
    @NotBlank(message = "款式等级编号不能为空")
    private String styleLevelCode;

    /**
     * 品质等级
     */
    @NotBlank(message = "品质等级不能为空")
    private String qualityLevelName;

    /**
     * 品质等级编号
     */
    @NotBlank(message = "品质等级编号不能为空")
    private String qualityLevelCode;

    /**
     * 织造方式code
     */
    @NotBlank(message = "织造方式code不能为空")
    private String weaveModeCode;

    /**
     * 织造方式名称
     */
    @NotBlank(message = "织造方式名称不能为空")
    private String weaveModeName;

    /**
     * 款式风格名称
     */
    @NotBlank(message = "织造方式名称不能为空")
    private String clothingStyleName;

    /**
     * 款式风格编码
     */
    @NotBlank(message = "款式风格编码不能为空")
    private String clothingStyleCode;

    /**
     * 印花编码
     */
    @NotBlank(message = "印花编码不能为空")
    private String printingCode;

    /**
     * 印花名称
     */
    @NotBlank(message = "印花名称不能为空")
    private String printingName;

    /**
     * 季节编码
     */
    @NotBlank(message = "季节编码不能为空")
    private String seasonCode;

    /**
     * 季节名称
     */
    @NotBlank(message = "季节名称不能为空")
    private String seasonName;

    /**
     * 视觉形式编码
     */
    @NotBlank(message = "视觉形式编码不能为空")
    private String visualFormCode;

    /**
     * 视觉形式名称
     */
    @NotBlank(message = "视觉形式名称不能为空")
    private String visualFormName;


    /**
     * 节日编码
     */
    private String galaCode;

    /**
     * 节日名称
     */
    private String galaName;

    /**
     * 版型编码
     */
    @NotBlank(message = "版型编码不能为空")
    private String patternCode;

    /**
     * 版型名称
     */
    @NotBlank(message = "版型名称不能为空")
    private String patternName;

    /**
     * 弹性编码
     */
    @NotBlank(message = "弹性编码不能为空")
    private String elasticCode;

    /**
     * 弹性名称
     */
    @NotBlank(message = "弹性名称不能为空")
    private String elasticName;

    /**
     * 场景名称
     */
    private String sceneName;

    /**
     * 场景编码
     */
    private String sceneCode;


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
     * 项目类型编码
     */
    private String projectTypeCode;
    /**
     * 项目类型名称
     */
    private String projectTypeName;

    /**
     * 商品链接
     */
    private String commodityLink;
}
