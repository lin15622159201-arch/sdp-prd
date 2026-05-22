package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

/**
 * TemuProductSkuVolumeDTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuProductSkuVolumeDTO {
    /**
     * 输入的单位
     */
    private String inputUnit;
    /**
     * 长，单位mm
     */
    private Integer len;
    /**
     * 输入的最长边
     */
    private String inputLen;
    /**
     * 宽，单位mm
     */
    private Integer width;
    /**
     * 输入的次长边
     */
    private String inputWidth;
    /**
     * 高，单位mm
     */
    private Integer height;
    /**
     * 输入的最短边
     */
    private String inputHeight;
}
