package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * 开款任务图(develop_style_picture)实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:20
 */
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "develop_style_picture")
public class DevelopStylePicture extends BasicMessageTask {

    /**
     * 图片ID
     */
    @TableId(value = "picture_id", type = IdType.INPUT)
    private Long pictureId;
    /**
     * 任务ID
     */
    @TableField(value = "task_id")
    private Long taskId;
    /**
     * 开款图
     */
    @TableField(value = "picture_url")
    private String pictureUrl;

    /**
     * 图类型
     */
    @TableField(value = "picture_type")
    private String pictureType;
}
