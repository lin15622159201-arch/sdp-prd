package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

import java.util.List;

/**
 * TemuProductNoChargerDTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:06
 */
@Data
public class TemuProductNoChargerDTO {
    /**
     * 无充电器版本货品id (清空传空list)
     */
    private List<Integer> noChargerProductIds;
}
