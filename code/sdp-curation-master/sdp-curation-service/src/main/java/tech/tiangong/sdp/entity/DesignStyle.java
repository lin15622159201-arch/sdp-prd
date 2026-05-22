package tech.tiangong.sdp.entity;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.annotation.*;
import lombok.*;
import tech.tiangong.sdp.enums.DesignStyleSourceTypeEnum;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 款式管理-SPU表
 * 表名: design_style
 *
 * @author liuhongfu
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("design_style")
public class DesignStyle extends BasicMessageTask {

    /**
     * spuId主键
     */
    @TableId(value = "design_style_id", type = IdType.ASSIGN_ID)
    private Long designStyleId;

    /**
     * SPU编码: 2年+2月+2日+4流水+2版号流水
     */
    @TableField("style_code")
    private String styleCode;

    /**
     * SPU版本号
     */
    @TableField("version_num")
    private Integer versionNum;


    /**
     * SPU来源，用户新建:upload，开款任务：develop_style_task'
     */
    @TableField("task_source")
    private String taskSource;


    /**
     * 款式状态: 1-待提交; 2-已提交
     */
    @TableField("style_status")
    private Integer styleStatus;

    /**
     * 开款类型
     */
    @TableField("style_type")
    private String styleType;

    /**
     * 来源业务id
     */
    @TableField(value = "source_business_id")
    private Long sourceBusinessId;


    /**
     * 来源业务编码
     */
    @TableField("source_business_code")
    private String sourceBusinessCode;

    /**
     * AIGC选款结果ID
     */
    @TableField(value = "picking_result_id")
    private Long pickingResultId;

    /**
     * AIGC款式id
     */
    @TableField(value = "picking_style_id")
    private Long pickingStyleId;

    /**
     * 修图任务ID
     */
    @TableField(value = "image_update_task_id")
    private Long imageUpdateTaskId;

    /**
     * 修图任务编号
     */
    @TableField("image_update_task_code")
    private String imageUpdateTaskCode;


    /**
     * 任务状态：0-待处理；10-待审核；20-待返修；30-已完成；50-已取消
     */
    @TableField("image_update_status")
    private Integer imageUpdateStatus;

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
     * 开款品类标签
     */
    @TableField(value = "category_labels")
    private String categoryLabels;

    /**
     * 款式品类编码.款式品类编码,(款式品类-商品类型-商品末级分类)(code1-code2-code3)
     */
    @TableField("category_code")
    private String categoryCode;

    /**
     * 款式品类名,(三级分类以"-"隔开)（如：女装-上装-T恤）
     */
    @TableField("category_name")
    private String categoryName;

    /**
     * 款式标签编码
     */
    @TableField("style_label_code")
    private String styleLabelCode;

    /**
     * 款式标签名称
     */
    @TableField("style_label_name")
    private String styleLabelName;

    /**
     * 店铺id
     */
    @TableField("store_id")
    private Long storeId;

    /**
     * 店铺名称
     */
    @TableField("store_name")
    private String storeName;

    /**
     * 尺码标准
     */
    @TableField("size_standard_name")
    private String sizeStandardName;

    /**
     * 尺码标准编号
     */
    @TableField("size_standard_code")
    private String sizeStandardCode;

    /**
     * 波段编码
     */
    @TableField("wave_band_code")
    private String waveBandCode;

    /**
     * 波段名称
     */
    @TableField("wave_band_name")
    private String waveBandName;

    /**
     * 款式等级
     */
    @TableField("style_level_name")
    private String styleLevelName;

    /**
     * 款式等级编号
     */
    @TableField("style_level_code")
    private String styleLevelCode;

    /**
     * 品质等级
     */
    @TableField("quality_level_name")
    private String qualityLevelName;

    /**
     * 品质等级编号
     */
    @TableField("quality_level_code")
    private String qualityLevelCode;

    /**
     * 织造方式code
     */
    @TableField("weave_mode_code")
    private String weaveModeCode;

    /**
     * 织造方式
     */
    @TableField("weave_mode_name")
    private String weaveModeName;

    /**
     * 款式风格编码
     */
    @TableField("clothing_style_name")
    private String clothingStyleName;

    /**
     * 款式风格名称
     */
    @TableField("clothing_style_code")
    private String clothingStyleCode;

    /**
     * 印花编码
     */
    @TableField("printing_code")
    private String printingCode;

    /**
     * 印花名称
     */
    @TableField("printing_name")
    private String printingName;


    /**
     * 季节编码
     */
    @TableField("season_code")
    private String seasonCode;

    /**
     * 季节名称
     */
    @TableField("season_name")
    private String seasonName;

    /**
     * 节日编码
     */
    @TableField("gala_code")
    private String galaCode;

    /**
     * 节日名称
     */
    @TableField("gala_name")
    private String galaName;

    /**
     * 版型编码
     */
    @TableField("pattern_code")
    private String patternCode;

    /**
     * 版型名称
     */
    @TableField("pattern_name")
    private String patternName;

    /**
     * 弹性编码
     */
    @TableField("elastic_code")
    private String elasticCode;

    /**
     * 弹性名称
     */
    @TableField("elastic_name")
    private String elasticName;

    /**
     * 场景名称
     */
    @TableField("scene_name")
    private String sceneName;

    /**
     * 场景编码
     */
    @TableField("scene_code")
    private String sceneCode;

    /**
     * 视觉形式编码
     */
    @TableField("visual_form_code")
    private String visualFormCode;

    /**
     * 视觉形式名称
     */
    @TableField("visual_form_name")
    private String visualFormName;

    /**
     * sku类别编码
     */
    @TableField("sku_class_code")
    private String skuClassCode;

    /**
     * sku类别名称
     */
    @TableField("sku_class_name")
    private String skuClassName;

    /**
     * 套装件数
     */
    @TableField(value = "suit_piece")
    private Integer suitPiece;

    /**
     * 设计师id【设计师】
     */
    @TableField("designer_id")
    private Long designerId;

    /**
     * 设计师编号【设计师】
     */
    @TableField("designer_code")
    private String designerCode;

    /**
     * 设计师名称【设计师】
     */
    @TableField("designer_name")
    private String designerName;

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
     * 商品链接
     */
    @TableField(value = "commodity_link")
    private String commodityLink;


    /**
     * 最新提交时间
     */
    @TableField("latest_submit_time")
    private LocalDateTime latestSubmitTime;

    @TableField(exist = false)
    private List<Prototype> skcs;

    @TableField(exist = false)
    private List<PrototypeMaterial> pictures;

    @TableField(exist = false)
    private List<MulfeatExtractTask> mulfeatExtracts;

    /**
     * 开款类型来源
     */
    public boolean developStyle() {
        return this.taskSource.equals(DesignStyleSourceTypeEnum.DEVELOP_STYLE.getCode());
    }

    public boolean hasCode() {
        return StrUtil.isNotBlank(this.styleCode);
    }
}