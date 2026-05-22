package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 图片描述说明任务
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/21 16:12
 */
@Data
@TableName("picture_caption_task")
@EqualsAndHashCode(callSuper = true)
public class PictureCaptionTask extends BasicAIImgTask {
    /**
     * 来源
     */
    @TableField(value = "source")
    private String source;

    /**
     * 图片描述
     */
    @TableField(value = "caption")
    private String caption;
}
