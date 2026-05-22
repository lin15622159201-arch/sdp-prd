package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tech.tiangong.butted.common.enums.TaskStatusEnum;

import java.util.List;

/**
 * 开款-SPU表(develop_style_spu)实体类
 *
 * @author qinwenxuan@zj.tech
 * @since 2025-11-03 14:39:38
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "develop_style_spu")
public class DevelopStyleSpu extends BasicMessageTask {
    /**
     * SPU ID
     */
    @TableId(value = "spu_id", type = IdType.INPUT)
    private Long spuId;
    /**
     * 任务ID
     */
    @TableField(value = "task_id")
    private Long taskId;
    /**
     * 套装件数
     */
    @TableField(value = "suit_piece")
    private Integer suitPiece;
    /**
     * 任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；
     *
     * @see TaskStatusEnum
     */
    @TableField(value = "task_status")
    private Integer taskStatus;
    /**
     * 任务状态
     */
    @TableField(value = "task_state")
    private Integer taskState;
    /**
     * 推送状态
     */
    @TableField(value = "push_status")
    private Integer pushStatus;
    /**
     * 需要进行的任务
     */
    @TableField(value = "required_task")
    private Integer requiredTask;
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
     * 商品链接
     */
    @TableField(value = "commodity_link")
    private String commodityLink;
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
    /**
     * sku类别名称
     */
    @TableField(value = "sku_class_name")
    private String skuClassName;
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
    @TableField(exist = false)
    private List<DevelopStyleSkc> skcs;
}


