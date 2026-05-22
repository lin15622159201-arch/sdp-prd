package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 图片修复审核结果(image_update_review_result)实体类
 *
 * @author liuhongfu
 * @since 2025-11-03 14:39:38
 */
@EqualsAndHashCode(callSuper = true)
@Data
@TableName(value = "image_update_result")
public class ImageUpdateResult extends BasicMessageTask {
    /**
     * 审核结果ID
     */
    @TableId(value = "result_id", type = IdType.INPUT)
    private Long resultId;


    /**
     * 图片修复任务ID
     */
    @TableField(value = "task_id")
    private Long taskId;

    /**
     * spu-ID
     */
    @TableField(value = "spu_id")
    private Long spuId;


    /**
     * skc-ID
     */
    @TableField(value = "skc_id")
    private Long skcId;


    /**
     * 图片URL
     */
    @TableField(value = "picture_url")
    private String pictureUrl;


}


