package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import tech.tiangong.sdp.enums.ShopReviewStatusEnum;
import tech.tiangong.sdp.enums.SpotStyleTypeEnum;
import tech.tiangong.sdp.enums.StyleOnShelveReleaseStatusEnum;
import tech.tiangong.sdp.enums.StyleOnShelveReviewEnum;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

/**
 * 款上架表
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/11 10:33
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "style_on_shelves", autoResultMap = true)
public class StyleOnShelves extends BaseMessageEntity {
    /**
     * 款ID
     */
    @TableId(value = "style_id", type = IdType.INPUT)
    private Long styleId;

    /**
     * 款号
     */
    @TableField("style_code")
    private String styleCode;

    /**
     * 开款类型
     */
    @TableField("style_type")
    private String styleType;

    /**
     * 数据来源
     */
    @TableField("source_type")
    private String sourceType;



    /**
     * 审核状态，0-待审核，1-已通过，2-已驳回
     */
    @TableField("review_status")
    private Integer reviewStatus;

    /**
     * 发布状态，0-待发布，1-发布中，2-已发布，3-发布失败
     */
    @TableField("release_status")
    private Integer releaseStatus;

    /**
     * 审核人ID
     */
    @TableField("review_user_id")
    private Long reviewUserId;


    /**
     * 审核人名称
     */
    @TableField("review_user_name")
    private String reviewUserName;

    /**
     * 审核时间
     */
    @TableField("review_time")
    private LocalDateTime reviewTime;

    /**
     * 审核不通过原因
     */
    @TableField("review_fail_reason")
    private String reviewFailReason;


    /**
     * 店铺审核状态，1-已通过，2-已驳回 0-待审核
     */
    @TableField("shop_review_status")
    private Integer shopReviewStatus;

    /**
     * 店铺审核人ID
     */
    @TableField("shop_review_user_id")
    private Long shopReviewUserId;

    /**
     * 店铺审核人名称
     */
    @TableField("shop_review_user_name")
    private String shopReviewUserName;

    /**
     * 店铺审核时间
     */
    @TableField("shop_review_time")
    private LocalDateTime shopReviewTime;

    /**
     * 店铺审核驳回原因
     */
    @TableField("shop_review_fail_reason")
    private String shopReviewFailReason;


    /**
     * 发布失败原因
     */
    @TableField("release_fail_reason")
    private String releaseFailReason;


    /**
     * 设计师id【设计师】
     */
    @TableField("designer_id")
    private Long designerId;


    /**
     * 设计师名称【设计师】
     */
    @TableField("designer_name")
    private String designerName;

    /**
     * 套装件数
     */
    @TableField("suit_piece")
    private Integer suitPiece;

    /**
     * 主图url
     */
    @TableField("main_img_url")
    private String mainImgUrl;

    /**
     * 供给方式编码
     */
    @TableField("supply_mode_code")
    private String supplyModeCode;


    /**
     * 供给方式
     */
    @TableField("supply_mode_name")
    private String supplyModeName;

    /**
     * 店铺id
     */
    @TableField(value = "store_id")
    private Long storeId;


    /**
     * 店铺名称
     */
    @TableField("store_name")
    private String storeName;

    /**
     * 场景编码
     */
    @TableField(value = "scene_code")
    private String sceneCode;


    /**
     * 场景名称
     */
    @TableField("scene_name")
    private String sceneName;

    /**
     * 品质等级编号
     */
    @TableField(value = "quality_level_code")
    private String qualityLevelCode;


    /**
     * 品质等级
     */
    @TableField("quality_level_name")
    private String qualityLevelName;

    /**
     * 款式等级编号
     */
    @TableField(value = "style_level_code")
    private String styleLevelCode;

    /**
     * 款式等级
     */
    @TableField("style_level_name")
    private String styleLevelName;

    /**
     * 织造方式code
     */
    @TableField(value = "weave_mode_code")
    private String weaveModeCode;


    /**
     * 织造方式
     */
    @TableField("weave_mode_name")
    private String weaveModeName;

    /**
     * 波段编码
     */
    @TableField(value = "wave_band_code")
    private String waveBandCode;


    /**
     * 波段名称
     */
    @TableField("wave_band_name")
    private String waveBandName;

    /**
     * 款式品类编码
     */
    @TableField(value = "category_code")
    private String categoryCode;


    /**
     * 款式品类名
     */
    @TableField("category_name")
    private String categoryName;


    /**
     * 尺码标准编号
     */
    @TableField(value = "size_standard_code")
    private String sizeStandardCode;


    /**
     * 尺码标准
     */
    @TableField("size_standard_name")
    private String sizeStandardName;

    /**
     * 款式风格编码
     */
    @TableField(value = "clothing_style_code")
    private String clothingStyleCode;

    /**
     * 款式风格名称
     */
    @TableField("clothing_style_name")
    private String clothingStyleName;

    /**
     * 现货类型编码
     */
    @TableField(value = "spot_style_type_code")
    private String spotStyleTypeCode;

    /**
     * 现货类型名称
     */
    @TableField("spot_style_type_name")
    private String spotStyleTypeName;

    /**
     * 货盘类型编码
     */
    @TableField("pallet_type_code")
    private String palletTypeCode;

    /**
     * 货盘类型名称
     */
    @TableField("pallet_type_name")
    private String palletTypeName;

    /**
     * 平台编码
     */
    @TableField(value = "platform_code")
    private String platformCode;

    /**
     * 平台名称
     */
    @TableField("platform_name")
    private String platformName;

    /**
     * 印花编码
     */
    @TableField(value = "printing_code")
    private String printingCode;


    /**
     * 印花名称
     */
    @TableField("printing_name")
    private String printingName;

    /**
     * 版型编码
     */
    @TableField(value = "pattern_code")
    private String patternCode;

    /**
     * 版型名称
     */
    @TableField("pattern_name")
    private String patternName;

    /**
     * 弹性编码
     */
    @TableField(value = "elastic_code")
    private String elasticCode;


    /**
     * 弹性名称
     */
    @TableField("elastic_name")
    private String elasticName;

    /**
     * 季节编码
     */
    @TableField(value = "season_code")
    private String seasonCode;


    /**
     * 季节名称
     */
    @TableField("season_name")
    private String seasonName;

    /**
     * 节日编码
     */
    @TableField(value = "gala_code")
    private String galaCode;

    /**
     * 节日名称
     */
    @TableField("gala_name")
    private String galaName;

    /**
     * 视觉形式编码
     */
    @TableField(value = "visual_form_code")
    private String visualFormCode;


    /**
     * 视觉形式名称
     */
    @TableField("visual_form_name")
    private String visualFormName;

    /**
     * sku类别编码
     */
    @TableField(value = "sku_class_code")
    private String skuClassCode;


    /**
     * sku类别名称
     */
    @TableField("sku_class_name")
    private String skuClassName;

    /**
     * 款式标签编码
     */
    @TableField(value = "style_label_code")
    private String styleLabelCode;


    /**
     * 款式标签名称
     */
    @TableField("style_label_name")
    private String styleLabelName;

    /**
     * 商品链接
     */
    @TableField("commodity_link")
    private String commodityLink;

    /**
     * 开发人id
     */
    @TableField(value = "developer_id")
    private Long developerId;

    /**
     * 开发人名称
     */
    @TableField("developer_name")
    private String developerName;

    /**
     * 成衣毛重
     */
    @TableField("cloth_gross_weight")
    private BigDecimal clothGrossWeight;

    /**
     * 标题数据
     */
    @TableField(value = "title_data")
    private String titleData;
    /**
     * 标题详情
     */
    @TableField(value = "details")
    private String details;
    /**
     * 中文标题
     */
    @TableField(value = "chinese_title")
    private String chineseTitle;
    /**
     * 英文标题
     */
    @TableField(value = "english_title")
    private String englishTitle;

    /**
     * 可用的标签
     */
    @TableField(value = "usable_labels")
    private String usableLabels;

    /**
     * 面料材质
     */
    @TableField("fabric_material")
    private String fabricMaterial;

    /**
     * 面料风格
     */
    @TableField("fabric_style")
    private String fabricStyle;
    /**
     * 面料纹理
     */
    @TableField(value = "fabric_texture")
    private String fabricTexture;
    /**
     * 面料图案
     */
    @TableField("pattern")
    private String pattern;

    /**
     * 成分
     */
    @TableField(value = "style_ingredient")
    private String styleIngredient;

    /**
     * 附件[]字符串数组
     */
    @TableField(value = "attachment")
    private String attachment;

    /**
     * 尺码附件[]字符串数组
     */
    @TableField(value = "size_attachment")
    private String sizeAttachment;

    /**
     * 透明度
     */
    @TableField("transparency")
    private String transparency;

    /**
     * 最近一次操作发布商品时间====
     */
    @TableField("latest_push_time")
    private LocalDateTime latestPushTime;

    @TableField(exist = false)
    private List<SkcOnShelves> skcs;

    @TableField(exist = false)
    private List<StyleSkcOnShelvesPicture> pictures;


    public Boolean canNotReleaseProduct (){
        return Objects.equals(StyleOnShelveReleaseStatusEnum.RELEASE_ING.getCode(), this.getReleaseStatus())
                || Objects.equals(StyleOnShelveReleaseStatusEnum.RELEASE.getCode(), this.getReleaseStatus()) ;
    }

    public Boolean spotType (){
        return Objects.equals(SpotStyleTypeEnum.SPOT_STYLE.getVale(), this.getStyleType());
    }

    public Boolean reviewPass (){
        return Objects.equals(StyleOnShelveReviewEnum.REVIEW_PASS.getCode(), this.getReviewStatus());
    }

    /**
     * 待发布状态
     */
    public Boolean waitRelease (){
        return null == this.releaseStatus || Objects.equals(this.releaseStatus,0);
    }

    /**
     * 已发布（成功）
     */
    public Boolean releaseSuccess (){
        return Objects.equals(this.releaseStatus,StyleOnShelveReleaseStatusEnum.RELEASE.getCode());
    }

    /**
     * 已发布（失败）
     */
    public Boolean releaseFail (){
        return Objects.equals(this.releaseStatus,StyleOnShelveReleaseStatusEnum.RELEASE_FAIL.getCode());
    }

    /**
     * 已否是店主已驳回
     */
    public Boolean shopReviewNotPass (){
        return Objects.equals(this.shopReviewStatus, ShopReviewStatusEnum.REVIEW_NOT_PASS.getCode());
    }



    /**
     * 店主已审核通过
     */
    public Boolean shopReviewPass (){
        return Objects.equals(this.shopReviewStatus, ShopReviewStatusEnum.REVIEW_PASS.getCode());
    }






}
