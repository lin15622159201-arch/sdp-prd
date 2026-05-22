package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 款式分类任务
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/21 16:12
 */
@Data
@TableName("pattern_check_task")
@EqualsAndHashCode(callSuper = true)
public class PatternCheckTask extends BasicAIImgTask {
    /**
     * 品类
     */
    @TableField(value = "category")
    private String category;
    /**
     * 标签
     */
    @TableField(value = "label")
    private String label;

}
