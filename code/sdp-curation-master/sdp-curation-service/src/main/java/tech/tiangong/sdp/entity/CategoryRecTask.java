package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 品类识别任务
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/21 16:12
 */
@Data
@TableName("category_rec_task")
@EqualsAndHashCode(callSuper = true)
public class CategoryRecTask extends BasicAIImgTask {
    /**
     * 品类
     */
    @TableField(value = "category")
    private String category;
    /**
     * 品类尺码
     */
    @TableField(value = "category_size")
    private String categorySize;


}
