package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.common.resp.BaseVO;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 待上架详情
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 18:08
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class StyleOnShelvesResp extends BaseVO implements Serializable {

    @Serial
    private static final long serialVersionUID = -2428963009678792259L;

    /**
     * 款ID
     */
    private Long styleId;

    /**
     * 款号
     */
    private String styleCode;

    /**
     * 开款类型
     */
    private String styleType;

    /**
     * 数据来源
     */
    private String sourceType;

    /**
     * 审核状态，0-待审核，1-已通过，2-已驳回
     */
    private Integer reviewStatus;

    /**
     * 发布状态，0-待发布，1-发布中，2-已发布，3-发布失败
     */
    private Integer releaseStatus;

    /**
     * 审核人ID
     */
    private Long reviewUserId;

    /**
     * 审核人名称
     */
    private String reviewUserName;

    /**
     * 审核时间
     */
    private LocalDateTime reviewTime;

    /**
     * 发布失败原因
     */
    private String releaseFailReason;

    /**
     * 设计师id【设计师】
     */
    private Long designerId;

    /**
     * 设计师名称【设计师】
     */
    private String designerName;

    /**
     * 设计师组别编码
     */
    private String designerGroupCode;
    /**
     * 设计师组别名称
     */
    private String designerGroupName;

    /**
     * 套装件数
     */
    private Integer suitPiece;

    /**
     * 主图url
     */
    private String mainImgUrl;

    /**
     * 供给方式编码
     */
    private String supplyModeCode;

    /**
     * 供给方式
     */
    private String supplyModeName;

    /**
     * 店铺id
     */
    private Long storeId;

    /**
     * 店铺名称
     */
    private String storeName;

    /**
     * 场景编码
     */
    private String sceneCode;

    /**
     * 场景名称
     */
    private String sceneName;

    /**
     * 品质等级编号
     */
    private String qualityLevelCode;

    /**
     * 品质等级
     */
    private String qualityLevelName;

    /**
     * 款式等级编号
     */
    private String styleLevelCode;

    /**
     * 款式等级
     */
    private String styleLevelName;

    /**
     * 织造方式code
     */
    private String weaveModeCode;

    /**
     * 织造方式
     */
    private String weaveModeName;

    /**
     * 波段编码
     */
    private String waveBandCode;

    /**
     * 波段名称
     */
    private String waveBandName;

    /**
     * 款式品类编码
     */
    private String categoryCode;

    /**
     * 款式品类名
     */
    private String categoryName;

    /**
     * 尺码标准编号
     */
    private String sizeStandardCode;

    /**
     * 尺码标准
     */
    private String sizeStandardName;

    /**
     * 款式风格编码
     */
    private String clothingStyleCode;

    /**
     * 款式风格名称
     */
    private String clothingStyleName;

    /**
     * 现货类型编码
     */
    private String spotStyleTypeCode;

    /**
     * 现货类型名称
     */
    private String spotStyleTypeName;

    /**
     * 货盘类型编码
     */
    private String palletTypeCode;

    /**
     * 货盘类型名称
     */
    private String palletTypeName;

    /**
     * 平台编码
     */
    private String platformCode;

    /**
     * 平台名称
     */
    private String platformName;

    /**
     * 印花编码
     */
    private String printingCode;

    /**
     * 印花名称
     */
    private String printingName;

    /**
     * 版型编码
     */
    private String patternCode;

    /**
     * 版型名称
     */
    private String patternName;

    /**
     * 弹性编码
     */
    private String elasticCode;

    /**
     * 弹性名称
     */
    private String elasticName;

    /**
     * 季节编码
     */
    private String seasonCode;

    /**
     * 季节名称
     */
    private String seasonName;

    /**
     * 节日编码
     */
    private String galaCode;

    /**
     * 节日名称
     */
    private String galaName;

    /**
     * 视觉形式编码
     */
    private String visualFormCode;

    /**
     * 视觉形式名称
     */
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
     * 款式标签编码
     */
    private String styleLabelCode;

    /**
     * 款式标签名称
     */
    private String styleLabelName;

    /**
     * 商品链接
     */
    private String commodityLink;

    /**
     * 开发人id
     */
    private Long developerId;

    /**
     * 开发人名称
     */
    private String developerName;

    /**
     * 成衣毛重
     */
    private BigDecimal clothGrossWeight;

    /**
     * 标题数据
     */
    private String titleData;

    /**
     * 标题详情
     */
    private String details;

    /**
     * 中文标题
     */
    private String chineseTitle;

    /**
     * 英文标题
     */
    private String englishTitle;

    /**
     * 可用的标签
     */
    private String usableLabels;

    /**
     * 面料材质
     */
    private String fabricMaterial;

    /**
     * 面料风格
     */
    private String fabricStyle;

    /**
     * 面料纹理
     */
    private String fabricTexture;

    /**
     * 面料图案
     */
    private String pattern;

    /**
     * 成分
     */
    private String styleIngredient;

    /**
     * 附件[]字符串数组
     */
    private String attachment;

    /**
     * 尺码附件[]字符串数组
     */
    private String sizeAttachment;

    /**
     * 透明度
     */
    private String transparency;

    /**
     * SKC数组信息
     */
    private List<SkcOnShelvesVo> skcList;

    /**
     * 现货尺寸图数组
     */
    private List<String> sizeImageList;

    /**
     * 店铺审核状态，1-已通过，2-已驳回
     */
    private Integer shopReviewStatus;

    /**
     * 店铺审核人ID
     */
    private Long shopReviewUserId;

    /**
     * 店铺审核人名称
     */
    private String shopReviewUserName;

    /**
     * 店铺审核时间
     */
    private LocalDateTime shopReviewTime;

    /**
     * 店铺审核驳回原因
     */
    private String shopReviewFailReason;

}