package tech.tiangong.sdp.entity;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tech.tiangong.sdp.convert.BasicConvert;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

/**
 * 现货款表(spot_style_task)实体类
 * <ol>
 *     <li>000000000000000000000001:商品图:已补充</li>
 *     <li>000000000000000000000010:资料状态:已完善</li>
 *     <li>000000000000000000000100:取消:已取消</li>
 * </ol>
 *
 * @author qinwenxuan@zj.tech
 * @since 2025-11-03 14:39:38
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "spot_style_task")
public class SpotStyleTask extends BasicBinTask {
    public static final int MAIN_IMG_Y = 0b000000000000000000000001;
    public static final int DATA_Y = 0b000000000000000000000010;
    public static final int CANCEL_Y = 0b000000000000000000000100;
    public static final int PUSH_BUYER_Y = 0b000000000000000010000000;
    /**
     * 套装件数
     */
    @TableField(value = "suit_piece")
    private Integer suitPiece;
    /**
     * 数据来源
     */
    @TableField(value = "source_type")
    private String sourceType;
    /**
     * 开款类型
     */
    @TableField(value = "style_type")
    private String styleType;
    /**
     * 数据来源ID
     */
    @TableField(value = "source_id")
    private Long sourceId;
    /**
     * 主图url
     */
    @TableField(value = "main_img_url")
    private String mainImgUrl;

    /**
     * 供给方式
     */
    @TableField(value = "supply_mode_name")
    private String supplyModeName;

    /**
     * 供给方式编码
     */
    @TableField(value = "supply_mode_code")
    private String supplyModeCode;

    /**
     * 店铺id
     */
    @TableField(value = "store_id")
    private Long storeId;

    /**
     * 店铺名称
     */
    @TableField(value = "store_name")
    private String storeName;

    /**
     * 场景名称
     */
    @TableField(value = "scene_name")
    private String sceneName;

    /**
     * 场景编码
     */
    @TableField(value = "scene_code")
    private String sceneCode;

    /**
     * 品质等级
     */
    @TableField(value = "quality_level_name")
    private String qualityLevelName;

    /**
     * 品质等级编号
     */
    @TableField(value = "quality_level_code")
    private String qualityLevelCode;

    /**
     * 款式等级
     */
    @TableField(value = "style_level_name")
    private String styleLevelName;

    /**
     * 款式等级编号
     */
    @TableField(value = "style_level_code")
    private String styleLevelCode;

    /**
     * 织造方式code
     */
    @TableField(value = "weave_mode_code")
    private String weaveModeCode;

    /**
     * 织造方式
     */
    @TableField(value = "weave_mode_name")
    private String weaveModeName;

    /**
     * 波段编码
     */
    @TableField(value = "wave_band_code")
    private String waveBandCode;

    /**
     * 波段名称
     */
    @TableField(value = "wave_band_name")
    private String waveBandName;

    /**
     * 款式品类编码
     */
    @TableField(value = "category_code")
    private String categoryCode;

    /**
     * 款式品类名
     */
    @TableField(value = "category_name")
    private String categoryName;

    /**
     * 尺码标准
     */
    @TableField(value = "size_standard_name")
    private String sizeStandardName;

    /**
     * 尺码标准编号
     */
    @TableField(value = "size_standard_code")
    private String sizeStandardCode;

    /**
     * 款式风格编码
     */
    @TableField(value = "clothing_style_name")
    private String clothingStyleName;

    /**
     * 款式风格名称
     */
    @TableField(value = "clothing_style_code")
    private String clothingStyleCode;

    /**
     * 现货类型编码
     */
    @TableField(value = "spot_style_type_code")
    private String spotStyleTypeCode;

    /**
     * 现货类型名称
     */
    @TableField(value = "spot_style_type_name")
    private String spotStyleTypeName;

    /**
     * 平台编码
     */
    @TableField(value = "platform_code")
    private String platformCode;

    /**
     * 平台名称
     */
    @TableField(value = "platform_name")
    private String platformName;

    /**
     * 印花编码
     */
    @TableField(value = "printing_code")
    private String printingCode;

    /**
     * 印花名称
     */
    @TableField(value = "printing_name")
    private String printingName;

    /**
     * 版型编码
     */
    @TableField(value = "pattern_code")
    private String patternCode;

    /**
     * 版型名称
     */
    @TableField(value = "pattern_name")
    private String patternName;

    /**
     * 弹性编码
     */
    @TableField(value = "elastic_code")
    private String elasticCode;

    /**
     * 弹性名称
     */
    @TableField(value = "elastic_name")
    private String elasticName;

    /**
     * 季节编码
     */
    @TableField(value = "season_code")
    private String seasonCode;

    /**
     * 季节名称
     */
    @TableField(value = "season_name")
    private String seasonName;

    /**
     * 节日编码
     */
    @TableField(value = "gala_code")
    private String galaCode;

    /**
     * 节日名称
     */
    @TableField(value = "gala_name")
    private String galaName;

    /**
     * 视觉形式编码
     */
    @TableField(value = "visual_form_code")
    private String visualFormCode;

    /**
     * 视觉形式名称
     */
    @TableField(value = "visual_form_name")
    private String visualFormName;

    /**
     * sku类别编码
     */
    @TableField(value = "sku_class_code")
    private String skuClassCode;

    /**
     * sku类别名称
     */
    @TableField(value = "sku_class_name")
    private String skuClassName;

    /**
     * 开发人id
     */
    @TableField(value = "developer_id")
    private Long developerId;

    /**
     * 开发人名称
     */
    @TableField(value = "developer_name")
    private String developerName;

    /**
     * 提交时间
     */
    @TableField(value = "submit_time")
    private LocalDateTime submitTime;
    /**
     * 款式标签编码
     */
    @TableField(value = "style_label_code")
    private String styleLabelCode;
    /**
     * 款式标签名称
     */
    @TableField(value = "style_label_name")
    private String styleLabelName;
//    /**
//     * 是否复色
//     */
//    private Integer reColor;
//
//    /**
//     * 核价状态: 10-待核价;20-已核价;30-已驳回;40-复核通过
//     */
//    private Integer checkPriceStatus;

    /**
     * 核价id
     */
    @TableField(value = "check_price_id")
    private Long checkPriceId;
    /**
     * 核价人
     */
    @TableField(value = "check_pricer")
    private String checkPricer;

    /**
     * 核价时间
     */
    @TableField(value = "check_price_time")
    private LocalDateTime checkPriceTime;
    /**
     * 成衣毛重
     */
    @TableField(value = "cloth_gross_weight")
    private BigDecimal clothGrossWeight;

    /**
     * 图片修复id
     */
    @TableField(value = "image_update_id")
    private Long imageUpdateId;
    /**
     * image_update_code
     */
    @TableField(value = "image_update_code")
    private String imageUpdateCode;
    /**
     * 图片修复状态
     * 0-待处理；10-待审核；20-待返修；30-已完成；50-已取消；90-未创建；
     */
    @TableField(value = "image_update_status")
    private Integer imageUpdateStatus;
    /**
     * 图片修复时间
     */
    @TableField(value = "image_update_time")
    private LocalDateTime imageUpdateTime;
    /**
     * 货盘类型名称
     */
    @TableField(value = "pallet_type_name")
    private String palletTypeName;
    /**
     * 商品链接
     */
    @TableField(value = "commodity_link")
    private String commodityLink;
    /**
     * 标题数据
     */
    @TableField(value = "title_data")
    private String titleData;
    /**
     * 可用的标签
     */
    @TableField(value = "usable_labels")
    private String usableLabels;
    /**
     * 项目类型编码
     */
    @TableField(value = "project_type_code")
    private String projectTypeCode;
    /**
     * 项目类型名称
     */
    @TableField(value = "project_type_name")
    private String projectTypeName;
    /**
     * 款式类型编码
     */
    @TableField(value = "design_type_code")
    private String designTypeCode;
    /**
     * 款式类型名称
     */
    @TableField(value = "design_type_name")
    private String designTypeName;
    /**
     * 货盘类型编码
     */
    @TableField(value = "pallet_type_code")
    private String palletTypeCode;

    /**
     * 设计师id【设计师】
     */
    @TableField(value = "designer_id")
    private Long designerId;

    /**
     * 设计师编号【设计师】
     */
    @TableField(value = "designer_code")
    private String designerCode;

    /**
     * 设计师名称【设计师】
     */
    @TableField(value = "designer_name")
    private String designerName;

    @TableField(exist = false)
    private List<SpotStylePicture> pictures;
    @TableField(exist = false)
    private List<SpotStyleOpt> opts;
    @TableField(exist = false)
    private List<SpotStyleSupplier> suppliers;
    @TableField(exist = false)
    private List<SpotStyleSkc> skcs;
    @TableField(exist = false)
    private List<SpotStyleIngredient> ingredients;

    @TableField(exist = false)
    private List<SpotStyleSupplier> eSuppliers;
    @TableField(exist = false)
    private List<SpotStyleSkc> eSkcs;
    @TableField(exist = false)
    private List<SpotStyleIngredient> eIngredients;
    @TableField(exist = false)
    private List<SpotBuyerCode> codes;
    @TableField(exist = false)
    private List<PlmBuyerLog> logs;
    @TableField(exist = false)
    private String plmCategoryCodes;
    @TableField(exist = false)
    private String plmCategoryNames;
    @TableField(exist = false)
    private DevelopStyleTask developStyle;
    @TableField(exist = false)
    private List<String> skcImageUrls;
    @TableField(exist = false)
    private List<MulfeatExtractTask> mulfeatExtracts;
    public boolean pushedBuyer() {
        return BasicConvert.contains(requireTaskStatus(), PUSH_BUYER_Y);
    }
    public boolean cancelled() {
        return BasicConvert.contains(requireTaskStatus(), CANCEL_Y);
    }

    public boolean hasMainImg() {
        return BasicConvert.contains(requireTaskStatus(), MAIN_IMG_Y);
    }

    public boolean dataCompleted() {
        return BasicConvert.contains(requireTaskStatus(), DATA_Y);
    }

    public int requireTaskStatus() {
        return Objects.requireNonNullElse(this.getTaskStatus(), 0);
    }

    public String getMainImgUrl() {
        return mainImgUrl;
    }

    public void setMainImgUrl(String mainImgUrl) {
        this.mainImgUrl = mainImgUrl;
    }

    public boolean hasCode() {
        return StrUtil.isNotBlank(this.getTaskCode());
    }
}


