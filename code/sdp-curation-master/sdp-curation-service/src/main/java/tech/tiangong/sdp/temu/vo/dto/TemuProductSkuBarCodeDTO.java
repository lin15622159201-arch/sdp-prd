package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

/**
 * TemuProductSkuBarCodeDTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuProductSkuBarCodeDTO {

    /**
     * 条码
     */
    private String code;
    /**
     * 条码类型 (1: EAN, 2: UPC, 3: ISBN)
     */
    private Integer codeType;
}
