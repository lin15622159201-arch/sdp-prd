package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

import java.util.List;

/**
 * TemuProductSkuSensitiveAttrDTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuProductSkuSensitiveAttrDTO {

    /**
     * 敏感类型，
     * PURE_ELECTRIC(1, "纯电"),
     * INTERNAL_ELECTRIC(2, "内电"),
     * MAGNETISM(3, "磁性"),
     * LIQUID(4, "液体"),
     * POWDER(5, "粉末"),
     * PASTE(6, "膏体"),
     * CUTTER(7, "刀具")
     */
    private List<Integer> sensitiveTypes;
    /**
     * 是否敏感属性，0：非敏感，1：敏感
     */
    private Integer isSensitive;
    /**
     * 敏感类型
     * PURE_ELECTRIC(110001, "纯电"),
     * INTERNAL_ELECTRIC(120001, "内电"),
     * MAGNETISM(130001, "磁性"),
     * LIQUID(140001, "液体"),
     * POWDER(150001, "粉末"),
     * PASTE(160001, "膏体"),
     * CUTTER(170001, "刀具")
     */
    private List<Integer> sensitiveList;
}
