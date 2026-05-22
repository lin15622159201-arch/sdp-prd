package tech.tiangong.sdp.entity;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.enums.DesignStyleSourceTypeEnum;
import tech.tiangong.sdp.enums.PrototypeOnShelveEnum;
import tech.tiangong.sdp.enums.PrototypeStatusEnum;
import tech.tiangong.sdp.enums.PushPlmStatusEnum;
import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

/**
 * SKC表实体类
 *
 * @author while
 */
@Data
@Accessors(chain = true)
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@TableName(value = "prototype")
public class Prototype extends BaseTenantUserEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    /**
     * 主键id
     */
    @TableId(value = "prototype_id", type = IdType.INPUT)
    private Long prototypeId;
    /**
     * 版本号
     */
    @TableField("version")
    private Long version;
    /**
     * 版本号
     */
    @TableField(value = "version_num")
    private Integer versionNum;

    /**
     * 最新的打版信息id
     */
    @TableField(value = "latest_prototype_id")
    private Long latestPrototypeId;

    /**
     * 最新版本号
     */
    @TableField(value = "latest_version_num")
    private Integer latestVersionNum;

    /**
     * SPU版本id(design_style_version表的主键)
     */
    @TableField(value = "design_style_version_id")
    private Long designStyleVersionId;

    /**
     * SPU-ID
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
     * SKC来源，用户新建:upload，开款任务：develop_style_task'
     */
    @TableField(value = "task_source")
    private String taskSource;


    /**
     * 上架状态: 0-待推送; 1-待上架;2-已上架；3-下架；4-上架失败
     */
    @TableField(value = "listing_status")
    private Integer listingStatus;

    /**
     * 上架失败原因
     */
    @TableField(value = "listing_fail_reason")
    private String listingFailReason;


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
     * 动销时间
     */
    @TableField(value = "sale_time")
    private LocalDateTime saleTime;

    /**
     * 商品属性
     */
    @TableField(value = "commodity_attr")
    private String commodityAttr;

    /**
     * 订单号
     */
    @TableField(value = "order_code")
    private String orderCode;

    /**
     * 应履约件数
     */
    @TableField(value = "order_number")
    private BigDecimal orderNumber;


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
     * SPU生成时间
     */
    @TableField(value = "spu_created_time")
    private LocalDateTime spuCreatedTime;

    /**
     * 第一次拆版完成时间
     */
    @TableField(value = "first_version_done_time")
    private LocalDateTime firstVersionDoneTime;

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
     * 颜色名称
     */
    @TableField(value = "color")
    private String color;

    /**
     * plm设计师id【设计师】
     */
    @TableField(value = "plm_designer_id")
    private Long plmDesignerId;

    /**
     * plm设计师名称【设计师】
     */
    @TableField(value = "plm_designer_name")
    private String plmDesignerName;


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
     * 制作方式： 1-实物样 2-3D样
     */
    @TableField(value = "make_clothes_type")
    private Integer makeClothesType;

    /**
     * 款式信息来源： 1-sdp, 2-plm
     */
    @TableField(value = "import_source")
    private Integer importSource;


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
     * 是否紧急(1:紧急,0:不紧急)
     */
    @TableField(value = "is_urgent")
    private Boolean isUrgent;

    /**
     * SKC（款）生成时间
     */
    @TableField(value = "skc_created_time")
    private LocalDateTime skcCreatedTime;

    /**
     * 业务渠道: 1-zj; 2-jv; 3-jv新系统;
     */
    @TableField(value = "biz_channel")
    private Integer bizChannel;


    /**
     * 推送plm任务状态：0-待推送，1-已推送；2-推送失败,3-已取消
     */
    @TableField(value = "push_plm_status")
    private Integer pushPlmStatus;


    /**
     * 是否结束了操作,0-未结束，1-结束
     */
    @TableField(value = "operator_done")
    private Integer operatorDone;


    /**
     * 推送PLM结果信息
     */
    @TableField(value = "push_plm_result_message")
    private String pushPlmResultMessage;


    /**
     * plm取消版单时间
     */
    @TableField(value = "plm_cancel_time")
    private LocalDateTime plmCancelTime;

    @TableField(exist = false)
    private List<PrototypeMaterial> materialList;


    /**
     * SDP是否是取消
     */
    public boolean sdpCancel() {
        return this.isCanceled;
    }


    /**
     * SDP或者PLM是否是取消
     */
    public boolean anyCancel() {
        return this.isCanceled || Objects.equals(this.pushPlmStatus, PushPlmStatusEnum.CANCEL.getCode());

    }



    /**
     * 测价通过
     */
    public boolean pricePassed() {
        return Objects.equals(this.pricePassedState, Bool.YES.getCode());
    }



    /**
     * 待处理
     */
    public boolean push() {
        return Objects.equals(this.pushPlmStatus, PushPlmStatusEnum.WAIT_PUSH.getCode())
                || Objects.equals(this.pushPlmStatus, PushPlmStatusEnum.FAIL.getCode());
    }

    /**
     * 是否已经推送给
     */
    public boolean isPushCompleted() {
        return Objects.equals(this.pushPlmStatus, PushPlmStatusEnum.COMPLETED.getCode());
    }


    /**
     * 是否可以进行推送图片信息给plm
     */
    public boolean alreadyPushPlm() {
        return Objects.equals(this.pushPlmStatus, PushPlmStatusEnum.COMPLETED.getCode())
                || Objects.equals(this.pushPlmStatus, PushPlmStatusEnum.FAIL.getCode());
    }

    /**
     * 是否可以进行推送spu-skc
     */
    public boolean canPushSpuSkcToPlm() {
        return (Objects.equals(this.pushPlmStatus, PushPlmStatusEnum.WAIT_PUSH.getCode())
                || Objects.equals(this.pushPlmStatus, PushPlmStatusEnum.FAIL.getCode())) &&
                Objects.equals(this.operatorDone, Bool.YES.getCode());
    }

    /**
     * 是否可以进行推送PLM取消
     */
    public boolean canPlmCancel() {
        return (Objects.equals(this.pushPlmStatus, PushPlmStatusEnum.COMPLETED.getCode())
                || Objects.equals(this.pushPlmStatus, PushPlmStatusEnum.FAIL.getCode())) &&
                Objects.equals(this.operatorDone, Bool.YES.getCode());
    }

    public boolean hasCode() {
        return StrUtil.isNotBlank(this.designCode);
    }


    /**
     *  待推送/上架失败-才能推送上架
     */
    public boolean canOnShelve() {
        return this.listingStatus.equals(PrototypeOnShelveEnum.WAIT_PUSH.getCode())
                || this.listingStatus.equals(PrototypeOnShelveEnum.ON_SHELF_FAIL.getCode());
    }


    /**
     *  下架状态
     */
    public boolean offShelve() {
        return this.listingStatus.equals(PrototypeOnShelveEnum.OFF_SHELF.getCode());
    }


    /**
     * 上架状态
     */
    public boolean onShelve() {
        return this.listingStatus.equals(PrototypeOnShelveEnum.ON_SHELVE.getCode());
    }

    /**
     * 待上架状态
     */
    public boolean waitOnShelve() {
        return this.listingStatus.equals(PrototypeOnShelveEnum.WAIT_ON_SHELVE.getCode());
    }

    /**
     * 上架失败
     */
    public boolean onShelveFail() {
        return this.listingStatus.equals(PrototypeOnShelveEnum.ON_SHELF_FAIL.getCode());
    }


    /**
     * 开款类型来源
     */
    public boolean developStyle() {
        return this.taskSource.equals(DesignStyleSourceTypeEnum.DEVELOP_STYLE.getCode());
    }




    /**
     * PLM已拆版
     */
    public boolean disassemblyFinished() {
        return this.disassemblyFinished.equals(Bool.YES.getCode());
    }




    /**
     * 是否提交
     */
    public boolean isSubmit() {
        return Objects.equals(PrototypeStatusEnum.DECOMPOSED.getCode(), this.prototypeStatus);
    }


}
