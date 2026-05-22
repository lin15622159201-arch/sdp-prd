package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

/**
 * 款式图片信息 实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@TableName(value = "skc_image_vector", autoResultMap = true)
public class SkcImageVector extends BaseMessageEntity {

    /**
     * 图片ID
     */
    @TableId(value = "image_id", type = IdType.INPUT)
    private Long imageId;

    /**
     * 向量ID,多个逗号分割
     */
    @TableField("vector_id")
    private String vectorId;

    /**
     * 图片地址
     */
    @TableField("image_url")
    private String imageUrl;

    /**
     * 开款类型
     */
    @TableField("style_type")
    private String styleType;

    /**
     * 开款任务ID
     */
    @TableField("develop_task_id")
    private Long developTaskId;

    /**
     * SPU ID
     */
    @TableField("spu_id")
    private Long spuId;

    /**
     * SPU编码
     */
    @TableField("spu_code")
    private String spuCode;

    /**
     * SKC ID
     */
    @TableField("skc_id")
    private Long skcId;

    /**
     * SKC编码
     */
    @TableField("skc_code")
    private String skcCode;

    /**
     * 上装区域的特征 (JSON格式)
     */
    @TableField(value = "up_feat")
    private String upFeat;

    /**
     * 下装区域的特征 (JSON格式)
     */
    @TableField(value = "down_feat")
    private String downFeat;

    /**
     * 连身类或全身所有服装区域的特征 (JSON格式)
     */
    @TableField(value = "full_feat")
    private String fullFeat;

    /**
     * 全图的特征，包含服装和背景模特等 (JSON格式)
     */
    @TableField(value = "whole_feat")
    private String wholeFeat;

    /**
     * 同步向量库
     */
    @TableField(value = "sync_status")
    private Integer syncStatus;

    /**
     * 同步时间
     */
    @TableField(value = "sync_time")
    private LocalDateTime syncTime;
}
