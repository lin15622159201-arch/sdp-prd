package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 提取标签任务
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/21 16:12
 */
@Data
@TableName("clip_label_task")
@EqualsAndHashCode(callSuper = true)
public class ClipLabelTask extends BasicAIImgTask {
    /**
     * 款式类型：0-净色、1-花型
     */
    @TableField(value = "style_type")
    private Integer styleType;
    /**
     * 识别品类名称
     */
    @TableField(value = "category")
    private String category;
    /**
     * 识别品类编号
     */
    @TableField(value = "category_code")
    private String categoryCode;
    /**
     * 扩展处理:1-风格,2-花型识别,3-多姿势,4-面料识别及推荐,5-花型提取,6-场景,7-模特,8-Try换装
     */
    @TableField(value = "extend_actions")
    private String extendActions;

    /**
     * 预测的标签：不支持品类，则返回品类是其他
     */
    @TableField(value = "pred_labels")
    private String predLabels;
    /**
     * 可用的标签
     */
    @TableField(value = "usable_labels")
    private String usableLabels;

}
