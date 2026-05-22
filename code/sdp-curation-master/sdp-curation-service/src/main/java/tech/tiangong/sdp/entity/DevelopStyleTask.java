package tech.tiangong.sdp.entity;

import cn.hutool.core.text.CharSequenceUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.butted.common.enums.TaskStatusEnum;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.enums.DevelopStyleCheckResultEnum;
import tech.tiangong.sdp.enums.DevelopStyleTaskStatusEnum;
import tech.tiangong.sdp.enums.DevelopStyleTypeEnum;
import tech.tiangong.sdp.enums.TaskStatusViewEnum;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

/**
 * 开款任务(develop_style_task)实体类
 * <ol>
 *     <li>000000000000000000000001:品类识别</li>
 *     <li>000000000000000000000010:款式分类</li>
 *     <li>000000000000000000000100:提取标签</li>
 *     <li>000000000000000000001000:图片解析</li>
 *     <li>000000000000000000010000:fashion分析</li>
 *     <li>000000000000000000100000:图片特征提取</li>
 * </ol>
 *
 * @author qinwenxuan@zj.tech
 * @since 2025-11-03 14:39:38
 */
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Data
@TableName(value = "develop_style_task")
public class DevelopStyleTask extends BasicBinTask {
    public static final int CATEGORY_REC = 0b000000000000000000000001;
    public static final int PATTERN_CHECK = 0b000000000000000000000010;
    public static final int CLIP_VIT_L_14 = 0b000000000000000000000100;
    public static final int FABRIC_IDENTIFY = 0b000000000000000000001000;
    public static final int FASHION_ANALYSIS = 0b000000000000000000010000;
    public static final int MULFEAT_EXTRACT = 0b000000000000000000100000;
    /**
     * 选款结果ID
     */
    @TableField(value = "picking_result_id")
    private Long pickingResultId;
    /**
     * 款式id
     */
    @TableField(value = "picking_style_id")
    private Long pickingStyleId;
    /**
     * 开款类型
     */
    @TableField(value = "style_type")
    private String styleType;

    /**
     * 开款数据来源类型
     */
    @TableField(value = "task_source")
    private String taskSource;


    /**
     * 供应商款号
     */
    @TableField(value = "supplier_style_code")
    private String supplierStyleCode;

    /**
     * 供应商名称
     */
    @TableField(value = "supplier_name")
    private String supplierName;
    /**
     * 商品链接
     */
    @TableField(value = "commodity_link")
    private String commodityLink;
    /**
     * 价格
     */
    @TableField(value = "price")
    private BigDecimal price;
    /**
     * 波段编码
     */
    @TableField(value = "waveband_code")
    private String wavebandCode;
    /**
     * 波段名称
     */
    @TableField(value = "waveband_name")
    private String wavebandName;
    /**
     * 款式品类编码
     */
    @TableField(value = "category_code")
    private String categoryCode;
    /**
     * 款式品类名称
     */
    @TableField(value = "category_name")
    private String categoryName;
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
     * 店铺ID
     */
    @TableField(value = "store_id")
    private Long storeId;
    /**
     * 店铺名称
     */
    @TableField(value = "store_name")
    private String storeName;
    /**
     * 主图url
     */
    @TableField(value = "main_img_url")
    private String mainImgUrl;
    /**
     * 款号
     */
    @TableField(value = "spu_code")
    private String spuCode;

    /**
     * 审款人
     */
    @TableField(value = "style_checker_name")
    private String styleCheckerName;

    /**
     * 审款人ID
     */
    @TableField(value = "style_checker_id")
    private Long styleCheckerId;

    /**
     * 审款时间
     */
    @TableField(value = "check_time")
    private LocalDateTime checkTime;

    /**
     * 审款结果：0-未审款；1-淘汰；2-通过
     */
    @TableField(value = "check_result")
    private Integer checkResult;

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
     * 提交时间
     */
    @TableField(value = "submit_time")
    private LocalDateTime submitTime;

    /**
     * 开款人id
     */
    @TableField(value = "developer_id")
    private Long developerId;

    /**
     * 开款人名称
     */
    @TableField(value = "developer_name")
    private String developerName;

    /**
     * 关联类型
     */
    @TableField(value = "rela_type")
    private String relaType;

    /**
     * 关联ID
     */
    @TableField(value = "rela_id")
    private Long relaId;
    /**
     * 关联编号
     */
    @TableField(value = "rela_code")
    private String relaCode;
    /**
     * AI任务状态：0-排队中；10-生成中；20-已中止；30-已完成；50-失败；60-超时失败；
     *
     * @see TaskStatusEnum
     */
    @TableField(value = "ai_task_status")
    private Integer aiTaskStatus;

    /**
     * 预测的标签：不支持品类，则返回品类是其他
     */
    @TableField(value = "pred_labels")
    private String predLabels;
    /**
     * 识别品类
     */
    @TableField(value = "category_rec")
    private String categoryRec;
    /**
     * 识别品类尺码
     */
    @TableField(value = "category_size")
    private String categorySize;
    /**
     * 可用的标签
     */
    @TableField(value = "usable_labels")
    private String usableLabels;
    /**
     * 花型标签
     */
    @TableField(value = "pattern_label")
    private String patternLabel;
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
     * 面料识别
     */
    @TableField(value = "fabric_identify")
    private String fabricIdentify;

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
     * 面料纹理
     */
    @TableField(value = "fabric_texture")
    private String fabricTexture;
    /**
     * 面料材质
     */
    @TableField(value = "fabric_material")
    private String fabricMaterial;
    /**
     * 透明度
     */
    @TableField(value = "transparency")
    private String transparency;
    /**
     * 失败信息
     */
    @TableField(value = "fail_message")
    private String failMessage;

    /**
     * 标题数据
     */
    @TableField(value = "title_data")
    private String titleData;

    /**
     * 花型数据
     */
    @TableField(value = "pattern_data")
    private String patternData;

    /**
     * 颜色数据
     */
    @TableField(value = "color_data")
    private String colorData;
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
     * 颜色名称
     */
    @TableField(value = "color")
    private String color;
    /**
     * 颜色名称编码
     */
    @TableField(value = "color_code")
    private String colorCode;
    /**
     * 失败模型
     */
    @TableField(value = "fail_model")
    private String failModel;
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
     * 图片向量ID
     */
    @TableField(value = "image_vector_id")
    private Long imageVectorId;
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
     * 花型图ID
     */
    @TableField(value = "pattern_picture_id")
    private Long patternPictureId;

    /**
     * 花型图URL
     */
    @TableField(value = "pattern_picture_url")
    private String patternPictureUrl;


    @TableField(exist = false)
    private List<DevelopStylePicture> pictures;
    @TableField(exist = false)
    private List<DevelopStyleOpt> opts;
    @TableField(exist = false)
    private List<DevelopStyleRemark> remarks;
    @TableField(exist = false)
    private List<DevelopStyleSpu> spus;

    @TableField(exist = false)
    private List<DevelopStyleTaskBomOrder> bomOrders;

    @TableField(exist = false)
    private List<DevelopStyleRelaTask> relas;
    @TableField(exist = false)
    private List<CategoryRecTask> recs;
    @TableField(exist = false)
    private List<MulfeatExtractTask> mulfeatExtracts;
    @TableField(exist = false)
    private List<ClipLabelTask> labels;
    @TableField(exist = false)
    private List<PatternCheckTask> patternChecks;
    @TableField(exist = false)
    private List<PictureCaptionTask> captions;
    @TableField(exist = false)
    private List<FashionAnalysisTask> analysis;

    public boolean banCheck() {
        if (Objects.nonNull(this.styleCheckerId)) {
            return true;
        }
        return this.requireTaskStatus() > DevelopStyleTaskStatusEnum.PENDING_REVIEW.getCode();
    }

    public boolean banDevelop() {
        if (Objects.nonNull(this.developerId)) {
            return true;
        }
        return (this.requireTaskStatus() > DevelopStyleTaskStatusEnum.PAYMENT_PENDING.getCode())
                && (this.requireTaskStatus() < DevelopStyleTaskStatusEnum.ELIMINATED.getCode());
    }

    public boolean canEliminate() {
        return this.requireTaskStatus() < DevelopStyleTaskStatusEnum.ELIMINATED.getCode();
    }

    public boolean eliminated() {
        return Objects.equals(this.requireTaskStatus(), DevelopStyleTaskStatusEnum.ELIMINATED.getCode());
    }

    public boolean pass() {
        return Objects.equals(Objects.requireNonNullElse(this.checkResult, Bool.NO.getCode()),
                DevelopStyleCheckResultEnum.PASS.getCode());
    }

    public boolean develop() {
        return Objects.equals(this.requireTaskStatus(), DevelopStyleTaskStatusEnum.DEVELOP_STYLE.getCode());
    }

    public boolean isPushDesignStyleType() {
        return StrUtil.equalsIgnoreCase(this.styleType, DevelopStyleTypeEnum.AI_STYLE.getCode())
                || StrUtil.equalsIgnoreCase(this.styleType, DevelopStyleTypeEnum.SHARED_LISTING.getCode());
    }

    @Override
    public boolean end() {
        return TaskStatusViewEnum.finished(this.requireAiTaskStatus());
    }

    @Override
    public boolean failedOrCanceled() {
        return TaskStatusViewEnum.failedOrAborted(this.requireAiTaskStatus());
    }

    @Override
    public boolean failed() {
        return TaskStatusViewEnum.failed(this.requireAiTaskStatus());
    }

    @Override
    public boolean canceled() {
        return TaskStatusViewEnum.aborted(this.requireAiTaskStatus());
    }

    @Override
    public boolean completed() {
        return TaskStatusViewEnum.completed(this.requireAiTaskStatus());
    }

    @Override
    public boolean processing() {
        return TaskStatusViewEnum.processing(this.requireAiTaskStatus());
    }

    @Override
    public boolean queueing() {
        return Objects.equals(TaskStatusEnum.QUEUEING.getCode(), this.requireAiTaskStatus());
    }

    @Override
    public boolean queueingOrProcessing() {
        return queueing() || processing();
    }

    public int requireAiTaskStatus() {
        return Objects.requireNonNullElse(this.aiTaskStatus, 0);
    }

    public boolean banPush() {
        return this.eliminated()/* || this.end()*/;
    }

    /**
     * 需要推送品类识别
     *
     * @return true
     */
    public boolean notPushCategoryRec() {
        return BasicConvert.notContains(requirePushStatus(), CATEGORY_REC);
    }

    /**
     * 需要推送图片向量
     *
     * @return true
     */
    public boolean notPushImageVector() {
        return BasicConvert.notContains(requirePushStatus(), MULFEAT_EXTRACT);
    }

    /**
     * 需要推送Clip标签
     *
     * @return true
     */
    public boolean notPushClipLabel() {
        return BasicConvert.notContains(requirePushStatus(), CLIP_VIT_L_14);
    }

    /**
     * 需要推送款式分类
     *
     * @return true
     */
    public boolean notPushPatternCheck() {
        return BasicConvert.notContains(requirePushStatus(), PATTERN_CHECK);
    }

    /**
     * 需要推送图片解析
     *
     * @return true
     */
    public boolean notPushFabricIdentify() {
        return BasicConvert.notContains(requirePushStatus(), FABRIC_IDENTIFY);
    }

    /**
     * 需要推送fashion分析
     *
     * @return true
     */
    public boolean notPushAnalysis() {
        return BasicConvert.notContains(requirePushStatus(), FASHION_ANALYSIS);
    }

    /**
     * 已经有识别品类
     *
     * @return true
     */
    public boolean hasCategoryRec() {
        return StrUtil.isNotBlank(this.categoryRec) || BasicConvert.contains(requireTaskState(), CATEGORY_REC);
    }

    /**
     * 已经有图片向量
     *
     * @return true
     */
    public boolean hasImageVector() {
        return this.requireImageVectorId() > 0 || BasicConvert.contains(requireTaskState(), MULFEAT_EXTRACT);
    }

    public boolean done() {
        return StrUtil.isNotBlank(this.categoryRec)
                && requireImageVectorId() > 0
                && StrUtil.isNotBlank(this.predLabels)
                && StrUtil.isNotBlank(this.fabricIdentify)
                && StrUtil.isNotBlank(this.patternLabel)
                && (StrUtil.isNotBlank(this.titleData) ||
                StrUtil.isNotBlank(this.colorData) ||
                StrUtil.isNotBlank(this.patternData));
    }

    /**
     * 已经有识别品类
     *
     * @return true
     */
    public boolean hasAnalysis() {
        return
                StrUtil.isNotBlank(this.titleData) ||
                        StrUtil.isNotBlank(this.colorData) ||
                        StrUtil.isNotBlank(this.patternData) ||
                        BasicConvert.contains(requireTaskState(), FASHION_ANALYSIS);
    }

    /**
     * 已经有标签
     *
     * @return true
     */
    public boolean hasPredLabel() {
        return StrUtil.isNotBlank(this.predLabels) || BasicConvert.contains(requireTaskState(), CLIP_VIT_L_14);
    }

    /**
     * 已经有花型标签
     *
     * @return true
     */
    public boolean hasPatternLabel() {
        return StrUtil.isNotBlank(this.patternLabel) || BasicConvert.contains(requireTaskState(), PATTERN_CHECK);
    }

    /**
     * 已经有面料识别
     *
     * @return true
     */
    public boolean hasFabricIdentify() {
        return StrUtil.isNotBlank(this.fabricIdentify) || BasicConvert.contains(requireTaskState(), FABRIC_IDENTIFY);
    }

    public boolean canQueueing() {
        if (failedOrCanceled()) {
            return false;
        }
        return hasCategoryRec() && hasImageVector() && completed() && (this.requireTaskState() < this.requiredTask());
    }

    public boolean canGenerating() {
        if (StrUtil.isNotBlank(failModel)) {
            return false;
        }
        if (failedOrCanceled()) {
            return false;
        }
        // 已经有识别品类
        if (hasCategoryRec() && hasImageVector()) {
            return this.processing() || completed();
        }
        return (this.requireTaskState() < this.requiredTask());
    }

    public boolean canCompleted() {
        if (failedOrCanceled()) {
            return false;
        }
        return (this.requireTaskState() == this.requiredTask()) && this.processing();
    }

    public void addFailModel(final String model) {
        if ((StrUtil.isNotBlank(failModel) || StrUtil.equalsIgnoreCase(CharSequenceUtil.NULL, this.failModel)) &&
                !StrUtil.contains(failModel, model)) {
            this.failModel = this.failModel + StrUtil.COMMA + model;
            return;
        }
        this.failModel = model;
    }

    public Long requireImageVectorId() {
        return Objects.requireNonNullElse(this.imageVectorId, 0L);
    }
}


