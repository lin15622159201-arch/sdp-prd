package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * SKU 信息
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@EqualsAndHashCode(callSuper = false)
@Data
public class TemuProductAddSkuResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = -6780654980797608647L;
    /**
     * sku id
     */
    private Long productSkuId;

    /**
     * Sku External Code
     */
    private String extCode;
    /**
     * skc id
     */
     private Long productSkcId;

    /**
     * Sku Specification
     */
    private List<TemuSkuSpecResp> skuSpecList;

}
