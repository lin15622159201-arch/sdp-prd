package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

/**
 * TemuProductSkuAccessoryDTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuProductSkuAccessoryDTO {
    /**
     * 属性值 id
     */
    private Long vid;
    /**
     * 物品数量（支持1~1000）
     */
    private Integer num;
    /**
     * 单位
     */
    private Integer unitCode;
}
