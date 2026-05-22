package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

/**
 * TemuProductSkuWeightDTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuProductSkuWeightDTO {
    /**
     * 输入的单位
     */
    private String inputUnit;
    /**
     * 输入的重量值
     */
    private String inputValue;
    /**
     * 重量值，单位mg
     */
    private Integer value;
}
