package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 服装特征提取任务
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/21 16:12
 */
@Data
@EqualsAndHashCode(callSuper = true)
@TableName(value = "mulfeat_extract_task", autoResultMap = true)
public class MulfeatExtractTask extends BasicAIImgTask {
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

}
