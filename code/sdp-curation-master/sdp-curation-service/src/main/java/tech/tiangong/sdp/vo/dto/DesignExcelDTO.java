package tech.tiangong.sdp.vo.dto;

import com.alibaba.excel.annotation.ExcelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 款式管理任务(Excel导入)Dto
 *
 * @author liuhongfu@zj.tech
 * @since 2025-11-03 14:39:39
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DesignExcelDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = -5697174772476386379L;

    /**
     * spuId主键
     */
    @ExcelProperty(value = "design_style_id", index = 0)
    private Long designStyleId;

    /**
     * SPU编码
     */
    @ExcelProperty(value = "style_code", index = 1)
    private String styleCode;

    /**
     * SKC编码: SPU+2色号流水
     */
    @ExcelProperty(value = "design_code", index = 2)
    private String designCode;

    /**
     * 款式状态: 1-待提交; 2-已提交
     */
    @ExcelProperty(value = "style_status", index = 3)
    private Integer styleStatus;

    /**
     * SPU来源，用户新建:upload，开款任务：develop_style_task
     */
    @ExcelProperty(value = "task_source", index = 4)
    private String taskSource;

    /**
     * 款式品类名
     */
    @ExcelProperty(value = "category_name", index = 5)
    private String categoryName;

    /**
     * 品类编码
     */
    @ExcelProperty(value = "category_code", index = 6)
    private String categoryCode;

    /**
     * 设计图片{多张以英文逗号分隔}
     */
    @ExcelProperty(value = "design_picture", index = 7)
    private String designPicture;

    /**
     * 款式标签名称
     */
    @ExcelProperty(value = "style_label_name", index = 8)
    private String styleLabelName;

    /**
     * 店铺名称
     */
    @ExcelProperty(value = "store_name", index = 9)
    private String storeName;

    /**
     * 尺码标准
     */
    @ExcelProperty(value = "size_standard_name", index = 10)
    private String sizeStandardName;

    /**
     * 波段名称
     */
    @ExcelProperty(value = "wave_band_name", index = 11)
    private String waveBandName;

    /**
     * 款式等级
     */
    @ExcelProperty(value = "style_level_name", index = 12)
    private String styleLevelName;

    /**
     * 品质等级
     */
    @ExcelProperty(value = "quality_level_name", index = 13)
    private String qualityLevelName;

    /**
     * 织造方式
     */
    @ExcelProperty(value = "weave_mode_name", index = 14)
    private String weaveModeName;

    /**
     * 款式风格名称
     */
    @ExcelProperty(value = "clothing_style_name", index = 15)
    private String clothingStyleName;

    /**
     * 印花名称
     */
    @ExcelProperty(value = "printing_name", index = 16)
    private String printingName;

    /**
     * 季节名称
     */
    @ExcelProperty(value = "season_name", index = 17)
    private String seasonName;

    /**
     * 节日名称
     */
    @ExcelProperty(value = "gala_name", index = 18)
    private String galaName;

    /**
     * 版型名称
     */
    @ExcelProperty(value = "pattern_name", index = 19)
    private String patternName;

    /**
     * 弹性名称
     */
    @ExcelProperty(value = "elastic_name", index = 20)
    private String elasticName;

    /**
     * 场景名称
     */
    @ExcelProperty(value = "scene_name", index = 21)
    private String sceneName;

    /**
     * 视觉形式名称
     */
    @ExcelProperty(value = "visual_form_name", index = 22)
    private String visualFormName;

    /**
     * sku类别名称
     */
    @ExcelProperty(value = "sku_class_name", index = 23)
    private String skuClassName;

    /**
     * 套装件数
     */
    @ExcelProperty(value = "suit_piece", index = 24)
    private Integer suitPiece;

    /**
     * 款式类型名称
     */
    @ExcelProperty(value = "design_type_name", index = 25)
    private String designTypeName;

    /**
     * 项目类型名称
     */
    @ExcelProperty(value = "project_type_name", index = 26)
    private String projectTypeName;

    /**
     * 颜色名称
     */
    @ExcelProperty(value = "color", index = 27)
    private String color;

    /**
     * plm设计师名称【设计师】
     */
    @ExcelProperty(value = "plm_designer_name", index = 28)
    private String plmDesignerName;

    /**
     * 设计师名称【设计师】
     */
    @ExcelProperty(value = "designer_name", index = 29)
    private String designerName;

    /**
     * 商品链接
     */
    @ExcelProperty(value = "commodity_link", index = 30)
    private String commodityLink;

    /**
     * 上架状态: 0-待推送; 1-待上架;2-已上架；3-下架
     */
    @ExcelProperty(value = "listing_status", index = 31)
    private Integer listingStatus;

    /**
     * 款式类型: 1-正常款; 2-复色款
     */
    @ExcelProperty(value = "skc_type", index = 32)
    private Integer skcType;

    /**
     * 制作方式： 1-实物样 2-3D样
     */
    @ExcelProperty(value = "make_clothes_type", index = 33)
    private Integer makeClothesType;

    /**
     * 前置拆版状态 0=否 1=是
     */
    @ExcelProperty(value = "pre_disassembly_state", index = 34)
    private Integer preDisassemblyState;

    /**
     * 测价通过状态 0=否 1=是
     */
    @ExcelProperty(value = "price_passed_state", index = 35)
    private Integer pricePassedState;

    /**
     * 测价通过时间
     */
    @ExcelProperty(value = "price_passed_time", index = 36)
    private LocalDateTime pricePassedTime;

    /**
     * 拆版是否完成 0=否 1=是
     */
    @ExcelProperty(value = "disassembly_finished", index = 37)
    private Integer disassemblyFinished;

    /**
     * 拆版完成时间
     */
    @ExcelProperty(value = "disassembly_finished_time", index = 38)
    private LocalDateTime disassemblyFinishedTime;

    /**
     * 版单取消时间
     */
    @ExcelProperty(value = "cancel_time", index = 39)
    private LocalDateTime cancelTime;

    /**
     * 样衣尺码
     */
    @ExcelProperty(value = "sample_size", index = 40)
    private String sampleSize;

    /**
     * 复色款号
     */
    @ExcelProperty(value = "make_same_design_code", index = 41)
    private String makeSameDesignCode;

    /**
     * 版本完成 0 否 1是
     */
    @ExcelProperty(value = "is_done_version", index = 42)
    private Integer isDoneVersion;

    /**
     * 提交时间
     */
    @ExcelProperty(value = "submit_time", index = 43)
    private LocalDateTime submitTime;

    /**
     * SKC（款）生成时间
     */
    @ExcelProperty(value = "skc_created_time", index = 44)
    private LocalDateTime skcCreatedTime;

    /**
     * SPU生成时间
     */
    @ExcelProperty(value = "spu_created_time", index = 45)
    private LocalDateTime spuCreatedTime;

    /**
     * 第一次拆版完成时间
     */
    @ExcelProperty(value = "first_version_done_time", index = 46)
    private LocalDateTime firstVersionDoneTime;

    /**
     * 业务渠道: 1-zj; 2-jv; 3-jv新系统;
     */
    @ExcelProperty(value = "biz_channel", index = 47)
    private Integer bizChannel;

    /**
     * 推送plm任务状态：0-待推送，1-已推送；2-推送失败,3-已取消
     */
    @ExcelProperty(value = "push_plm_status", index = 48)
    private Integer pushPlmStatus;

    /**
     * 商品属性
     */
    @ExcelProperty(value = "commodity_attr", index = 49)
    private String commodityAttr;

    /**
     * 最新提交时间
     */
    @ExcelProperty(value = "latest_submit_time", index = 50)
    private LocalDateTime latestSubmitTime;

    /**
     * 租户id
     */
    @ExcelProperty(value = "tenant_id", index = 51)
    private Long tenantId;

    /**
     * 创建人ID
     */
    @ExcelProperty(value = "creator_id", index = 52)
    private Long creatorId;

    /**
     * 创建人姓名
     */
    @ExcelProperty(value = "creator_name", index = 53)
    private String creatorName;

    /**
     * 创建时间
     */
    @ExcelProperty(value = "created_time", index = 54)
    private LocalDateTime createdTime;

    /**
     * 更新人ID
     */
    @ExcelProperty(value = "reviser_id", index = 55)
    private Long reviserId;

    /**
     * 更新人姓名
     */
    @ExcelProperty(value = "reviser_name", index = 56)
    private String reviserName;

    /**
     * 更新时间
     */
    @ExcelProperty(value = "revised_time", index = 57)
    private LocalDateTime revisedTime;

    /**
     * 逻辑删除：0-否；1-是
     */
    @ExcelProperty(value = "deleted", index = 58)
    private Integer deleted;

}