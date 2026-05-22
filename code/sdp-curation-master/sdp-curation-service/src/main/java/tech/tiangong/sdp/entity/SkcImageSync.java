package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * SKC图片导入同步记录实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/22 18:29
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "skc_image_sync")
public class SkcImageSync extends BaseMessageEntity {
    /**
     * 同步ID
     */
    @TableId(value = "sync_id", type = IdType.INPUT)
    private Long syncId;

    /**
     * SKC编码
     */
    @TableField("skc_code")
    private String skcCode;

    /**
     * 原图url
     */
    @TableField("src_url")
    private String srcUrl;

    /**
     * 图片url
     */
    @TableField("image_url")
    private String imageUrl;

    /**
     * 上传状态：0-未同步；1-已同步
     */
    @TableField("upload_status")
    private Integer uploadStatus;

    /**
     * 上传时间
     */
    @TableField("upload_time")
    private LocalDateTime uploadTime;

    /**
     * 上传次数
     */
    @TableField("upload_times")
    private Integer uploadTimes;

    /**
     * 同步给业务状态：0-未同步；1-已同步
     */
    @TableField("sync_status")
    private Integer syncStatus;

    /**
     * 同步时间
     */
    @TableField("sync_time")
    private LocalDateTime syncTime;

    /**
     * 同步次数
     */
    @TableField("sync_times")
    private Integer syncTimes;

}
