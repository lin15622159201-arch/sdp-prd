package tech.tiangong.sdp.vo.resp;


import lombok.Data;
import lombok.EqualsAndHashCode;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.common.resp.BasicVO;
import tech.tiangong.sdp.enums.SpotStyleTypeEnum;
import java.io.Serial;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 现货管理 - 详情
 *
 * @author qinwenxuan@zj.tech
 * @since 2025-11-03 14:39:39
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class SpotStyleTaskResp extends BasicVO {

    @Serial
    private static final long serialVersionUID = 6893407299442429267L;
    /**
     * 商品主图
     * 1：已齐全
     */
    private Bool hasMainImg;
    /**
     * 资料状态
     * 1：已完善
     */
    private Bool dataCompleted;
    /**
     * 已取消
     * 1：已取消
     */
    private Bool cancelled;
    /**
     * 开款类型
     */
    private SpotStyleTypeEnum styleType;
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
    private Long storeId;

    /**
     * 店铺名称
     */
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
    private String qualityLevelName;

    /**
     * 品质等级编号
     */
    private String qualityLevelCode;

    /**
     * 款式等级
     */
    private String styleLevelName;

    /**
     * 款式等级编号
     */
    private String styleLevelCode;

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
     * 尺码标准
     */
    private String sizeStandardName;

    /**
     * 尺码标准编号
     */
    private String sizeStandardCode;

    /**
     * 款式风格编码
     */
    private String clothingStyleName;

    /**
     * 款式风格名称
     */
    private String clothingStyleCode;

    /**
     * 现货类型编码
     */
    private String spotStyleTypeCode;

    /**
     * 现货类型名称
     */
    private String spotStyleTypeName;

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
     * 提交时间
     */
    private LocalDateTime submitTime;
    /**
     * 款式标签编码
     */
    private String styleLabelCode;
    /**
     * 款式标签名称
     */
    private String styleLabelName;

    /**
     * 核价id
     */
    private Long checkPriceId;
    /**
     * 核价人
     */
    private String checkPricer;

    /**
     * 核价时间
     */
    private LocalDateTime checkPriceTime;
    /**
     * 成衣毛重
     */
    private BigDecimal clothGrossWeight;

    /**
     * 图片修复id
     */
    private Long imageUpdateId;
    /**
     * image_update_code
     */
    private String imageUpdateCode;
    /**
     * 图片修复状态
     */
    private Integer imageUpdateStatus;
    /**
     * 图片修复时间
     */
    private LocalDateTime imageUpdateTime;
    /**
     * 货盘类型名称
     */
    private String palletTypeName;

    /**
     * 货盘类型编码
     */
    private String palletTypeCode;
    /**
     * 套装件数
     */
    private Integer suitPiece;
    /**
     * 更新时间
     */
    private LocalDateTime revisedTime;

    /**
     * 设计师id【设计师】
     */
    private Long designerId;

    /**
     * 设计师名称【设计师】
     */
    private String designerName;

    /**
     * 成分
     */
    private List<SpotStyleIngredientResp> ingredients;
    /**
     * 供应商
     */
    private List<SpotStyleSupplierResp> suppliers;
    /**
     * SKC
     */
    private List<SpotStyleSkcResp> skcs;
    /**
     * 商品图片
     */
    private List<SpotStylePictureResp> productImages;
    /**
     * 尺码图片
     */
    private List<SpotStylePictureResp> sizeImages;
    /**
     * 操作日志
     */
    private List<SpotStyleOptResp> opts;

}
