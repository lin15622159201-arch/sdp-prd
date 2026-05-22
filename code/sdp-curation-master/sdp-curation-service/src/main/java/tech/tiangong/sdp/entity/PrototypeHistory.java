package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * SKC历史表实体类
 *
 * @author while
 */
@Data
@Accessors(chain = true)
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@TableName(value = "prototype_history")
public class PrototypeHistory extends BaseTenantUserEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 业务主键ID
     */
    @TableId(value = "history_id", type = IdType.INPUT)
    private Long historyId;

    /**
     * 打版信息id
     */
    @TableField(value = "prototype_id")
    private Long prototypeId;

    /**
     * 版本号
     */
    @TableField(value = "version_num")
    private Integer versionNum;

    /**
     * SPU版本id(design_style_version表的主键)
     */
    @TableField(value = "design_style_version_id")
    private Long designStyleVersionId;


    /**
     * SPU主键ID
     */
    @TableField(value = "design_style_id")
    private Long designStyleId;

    /**
     * SPU编码: 2年+2月+2日+4流水+2版号流水
     */
    @TableField(value = "style_code")
    private String styleCode;

    /**
     * SKC编码: SPU+2色号流水
     */
    @TableField(value = "design_code")
    private String designCode;

    /**
     * SKC来源: 10-PLM; 20-淘工厂; 30-logo印; 40-灵感设计需求; 5-数码印花款;
     */
    @TableField(value = "skc_source_type")
    private Integer skcSourceType;

    /**
     * 款式类型: 1-正常款; 2-复色款
     */
    @TableField(value = "skc_type")
    private Integer skcType;

    /**
     * 打版信息状态: 1.待拆版 2.已拆版
     */
    @TableField(value = "prototype_status")
    private Integer prototypeStatus;

    /**
     * 是否补做 false 否 true是
     */
    @TableField(value = "is_make_more")
    private Boolean isMakeMore;

    /**
     * 最新补做时间
     */
    @TableField(value = "make_more_latest_time")
    private LocalDateTime makeMoreLatestTime;

    /**
     * 是否取消 0 否 1是
     */
    @TableField(value = "is_canceled")
    private Boolean isCanceled;

    /**
     * 版单取消时间
     */
    @TableField(value = "cancel_time")
    private LocalDateTime cancelTime;

    /**
     * 是否动销: 0-否; 1-是; 默认0
     */
    @TableField(value = "is_on_sale")
    private Boolean isOnSale;

    /**
     * 款式品类(款式品类-商品类型-商品末级分类)(code1-code2-code3)
     */
    @TableField(value = "category_code")
    private String categoryCode;

    /**
     * 款式品类名(三级分类以"-"隔开)（如：女装-上装-T恤）
     */
    @TableField(value = "category_name")
    private String categoryName;

    /**
     * 复色款号
     */
    @TableField(value = "make_same_design_code")
    private String makeSameDesignCode;

    /**
     * 参考款号
     */
    @TableField(value = "reference_design_code")
    private String referenceDesignCode;

    /**
     * 颜色名称
     */
    @TableField(value = "color")
    private String color;

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

    /**
     * 设计组code
     */
    @TableField(value = "designer_group_code")
    private String designerGroupCode;

    /**
     * 设计组
     */
    @TableField(value = "designer_group")
    private String designerGroup;

    /**
     * 制作方式： 1-实物样 2-3D样
     */
    @TableField(value = "make_clothes_type")
    private Integer makeClothesType;

    /**
     * 前置拆版状态 0=否 1=是
     */
    @TableField(value = "pre_disassembly_state")
    private Integer preDisassemblyState;


    /**
     * 测价通过状态 0=否 1=是
     */
    @TableField(value = "price_passed_state")
    private Integer pricePassedState;

    /**
     * 测价通过时间
     */
    @TableField(value = "price_passed_time")
    private LocalDateTime pricePassedTime;


    /**
     * 拆版是否完成 0=否 1=是
     */
    @TableField(value = "disassembly_finished")
    private Integer disassemblyFinished;

    /**
     * 拆版完成时间
     */
    @TableField(value = "disassembly_finished_time")
    private LocalDateTime disassemblyFinishedTime;


    /**
     * 版本完成 0 否 1是
     */
    @TableField(value = "is_done_version")
    private Boolean isDoneVersion;

    /**
     * 提交时间
     */
    @TableField(value = "submit_time")
    private LocalDateTime submitTime;

    /**
     * 是否紧急(1:紧急,0:不紧急)
     */
    @TableField(value = "is_urgent")
    private Boolean isUrgent;

    /**
     * SKC（款）生成时间
     */
    @TableField(value = "skc_created_time")
    private LocalDateTime skcCreatedTime;


}
