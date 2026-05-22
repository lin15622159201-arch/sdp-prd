package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * fashion分析任务
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/21 16:12
 */
@Data
@TableName("fashion_analysis_task")
@EqualsAndHashCode(callSuper = true)
public class FashionAnalysisTask extends BasicAIImgTask {

    /**
     * 标题风格
     */
    @TableField(value = "title_style")
    private String titleStyle;
    /**
     * 标题季节
     */
    @TableField(value = "title_season")
    private String titleSeason;
    /**
     * 标题数据
     */
    @TableField(value = "title_data")
    private String titleData;
    /**
     * 花型结果
     */
    @TableField(value = "pattern_result")
    private String patternResult;
    /**
     * 花型数据
     */
    @TableField(value = "pattern_data")
    private String patternData;
    /**
     * 颜色结果
     */
    @TableField(value = "color_result")
    private String colorResult;
    /**
     * 颜色数据
     */
    @TableField(value = "color_data")
    private String colorData;

}
