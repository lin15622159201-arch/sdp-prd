package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

import java.util.List;

/**
 * TemuProductSkuSameReferPriceDTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/5 10:51
 */
@Data
public class TemuProductSkuWhExtAttrDTO {
    /**
     * SKU 重量（必填）
     */
    private TemuProductSkuWeightDTO productSkuWeightReq;
    /**
     * 同款参考
     */
    private TemuProductSkuSameReferPriceDTO productSkuSameReferPriceReq;
    /**
     * SKU 敏感限制（必填）
     */
    private TemuProductSkuSensitiveLimitDTO productSkuSensitiveLimitReq;

    /**
     * SKU 体积（必填）
     */
    private TemuProductSkuVolumeDTO productSkuVolumeReq;

    /**
     * SKU 条码
     */
    private List<TemuProductSkuBarCodeDTO> productSkuBarCodeReqs;

    /**
     * SKU 敏感属性（必填）
     */
    private TemuProductSkuSensitiveAttrDTO productSkuSensitiveAttrReq;
}
