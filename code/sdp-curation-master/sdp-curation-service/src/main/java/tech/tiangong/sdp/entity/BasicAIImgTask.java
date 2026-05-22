package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * BasicAIImgTask
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/18 11:38
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class BasicAIImgTask extends BasicAITask{

    /**
     * 输入图片
     */
    @TableField(value = "input_img")
    private String inputImg;
}
