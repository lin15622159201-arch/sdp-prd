package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import tech.tiangong.sdp.enums.ImageUpdateTaskStatusEnum;
import tech.tiangong.sdp.enums.ImageUpdateSpuSourceTypeEnum;
import tech.tiangong.sdp.utils.SsoContext;

import java.util.List;
import java.util.Objects;
import java.util.Set;

/**
 * 图片修复任务(image_update_task)实体类
 *
 * @author liuhongfu
 * @since 2025-11-06 14:39:38
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "image_update_task")
public class ImageUpdateTask extends BasicTask {

    /**
     * 波段编码
     */
    @TableField(value = "wave_band_code")
    private String wavebandCode;
    /**
     * 波段名称
     */
    @TableField(value = "wave_band_name")
    private String wavebandName;

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
     * 设计师ID
     */
    @TableField(value = "designer_id")
    private Long designerId;

    /**
     * 设计师名称
     */
    @TableField(value = "designer_name")
    private String designerName;


    /**
     * 任务类型,0-图片，1-视频
     */
    @TableField(value = "task_type")
    private Integer taskType;

    /**
     * 开款任务ID
     */
    @TableField(value = "develop_style_task_id")
    private Long developStyleTaskId;

    /**
     * spu的ID
     */
    @TableField(value = "spu_id")
    private Long spuId;

    /**
     * spu编码
     */
    @TableField(value = "spu_code")
    private String spuCode;


    /**
     * 任务状态：0-待处理；10-待审核；20-待返修；30-已完成；50-已取消
     */
    @TableField(value = "task_status")
    private Integer taskStatus;

    /**
     * 任务来源，款式管理：prototype_manage，现货管理：spot_style，用户创建：upload'
     */
    @TableField(value = "task_source")
    private String taskSource;

    /**
     * spu任务来源，款式管理：prototype_manage，现货管理：spot_style
     */
    @TableField(value = "spu_source")
    private String spuSource;


    /**
     * 原因
     */
    @TableField(value = "reason")
    private String reason;

    /**
     * 审核不通过图片说明
     */
    @TableField(value = "not_pass_describe_picture")
    private String notPassDescribePicture;


    /**
     * 修图需求总说明
     */
    @TableField(value = "repair_describe")
    private String repairDescribe;

    /**
     * 修图需求总说明附件
     */
    @TableField(value = "repair_attachment")
    private String repairAttachment;


    /**
     * 信息备注
     */
    @TableField(value = "message")
    private String message;

    /**
     * SPU图片信息
     */
    @TableField(exist = false)
    private List<ImageUpdatePicture> currentPictures;




    /**
     * 是否是现货来源
     */
    public boolean spotSpuSource() {
        return Objects.equals(ImageUpdateSpuSourceTypeEnum.SPOT_STYLE.getCode(),this.spuSource);
    }

    /**
     * 是否是款式来源
     */
    public boolean designStyleSpuSource() {
        return Objects.equals(ImageUpdateSpuSourceTypeEnum.DESIGN_STYLE.getCode(),this.spuSource);
    }

    /**
     * 已完成的任务
     */
    public boolean complete() {
        return Set.of(ImageUpdateTaskStatusEnum.COMPLETED.getCode())
                .contains(this.taskStatus);
    }


    /**
     * 已取消任务
     */
    public boolean cancel() {
        return Set.of(ImageUpdateTaskStatusEnum.CANCELED.getCode())
                .contains(this.taskStatus);
    }

    /**
     * 进行中得任务
     */
    public boolean doing() {
        return Set.of(ImageUpdateTaskStatusEnum.PENDING.getCode(),
                        ImageUpdateTaskStatusEnum.PENDING_REVIEW.getCode(),
                        ImageUpdateTaskStatusEnum.TO_BE_REPAIR.getCode())
                .contains(this.taskStatus);
    }



    /**
     * 允许上传图片操作的状态
     */
    public boolean allowUpload() {
        return Set.of(ImageUpdateTaskStatusEnum.PENDING.getCode(),
                        ImageUpdateTaskStatusEnum.TO_BE_REPAIR.getCode())
                .contains(this.taskStatus);
    }

    /**
     * 允许审核的状态
     */
    public boolean allowCheck() {
        return Objects.equals(this.taskStatus, ImageUpdateTaskStatusEnum.PENDING_REVIEW.getCode());
    }
    /**
     * 允许重新提交
     */
    public boolean allowResubmit() {
        return Objects.equals(this.taskStatus, ImageUpdateTaskStatusEnum.TO_BE_REPAIR.getCode());
    }

    /**
     * 允许取消的状态
     */
    public boolean allowCancel() {
        return Set.of(ImageUpdateTaskStatusEnum.TO_BE_REPAIR.getCode(),
                        ImageUpdateTaskStatusEnum.PENDING_REVIEW.getCode(),
                        ImageUpdateTaskStatusEnum.PENDING.getCode())
                .contains(this.taskStatus);
    }

    /**
     * 是否是当前人操作
     */
    public boolean currentUserOpt() {
        return Set.of(SsoContext.user().getId())
                .contains(this.getCreatorId());
    }
}


