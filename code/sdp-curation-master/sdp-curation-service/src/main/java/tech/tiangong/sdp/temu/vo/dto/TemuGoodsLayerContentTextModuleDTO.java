package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

/**
 * TemuGoodsLayerContentTextModuleDTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuGoodsLayerContentTextModuleDTO {
    /**
     * 背景颜色
     */
    private String backgroundColor;
    /**
     * 文字对齐方式，left--左对齐；right--右对齐；center--居中；justify--两端对齐
     */
    private String align;
    /**
     * 文字颜色
     */
    private String fontColor;
    /**
     * 字体类型
     */
    private Integer fontFamily;
    /**
     * 文字模块字体大小
     */
    private Integer fontSize;
}
