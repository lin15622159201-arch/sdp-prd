package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

import java.util.List;

/**
 * TemuProductSecondHandDTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:06
 */
@Data
public class TemuProductSecondHandDTO {
    /**
     * 是否二手货品，二手店铺传true，其他店铺不传值
     */
    private Boolean isSecondHand;

    /**
     * 成色定义，二手货品必传值，非二手货品不可传值
     * 枚举值：（1：接近全新，2：状况极佳，3：状况良好，4：尚可接受）
     */
    private Integer secondHandLevel;
}
