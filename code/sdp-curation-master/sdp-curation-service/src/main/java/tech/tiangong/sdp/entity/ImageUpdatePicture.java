package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 图片修复任务说明(image_update_picture)实体类
 *
 * @author liuhongfu
 * @since 2025-11-03 14:39:38
 */
@EqualsAndHashCode(callSuper = true)
@Data
@TableName(value = "image_update_picture")
public class ImageUpdatePicture extends BasicMessageTask {
    /**
     * 图片ID
     */
    @TableId(value = "picture_id", type = IdType.INPUT)
    private Long pictureId;


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
     * SKC编码
     */
    @TableField("skc_code")
    private String skcCode;

    /**
     * 图片URL
     */
    @TableField(value = "picture_url")
    private String pictureUrl;

    /**
     * 序号
     */
    @TableField(value = "serial_num")
    private Integer serialNum;


    /**
     * 修图需求说明
     */
    @TableField(value = "picture_describe")
    private String pictureDescribe;


    /**
     * 说明里面添加图片说明信息
     */
    @TableField(value = "attachment")
    private String attachment;


}


