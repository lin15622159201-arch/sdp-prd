package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

/**
 * content
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuGoodsLayerContentDTO {
    /**
     * 图片地址--通用
     */
    private String imgUrl;
    /**
     * 文字信息--文字模块
     */
    private String text;
    /**
     * 宽度
     */
    private Integer width;
    /**
     * 高度
     */
    private Integer height;
    /**
     * 文字模块详情
     */
    private TemuGoodsLayerContentTextModuleDTO textModuleDetails;
}
