package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;

/**
 * 商品列表查询-SKU扩展属性
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/17 18:32
 */
@Data
public class TemuProductPageSkuWhExtAttrResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 7041876720296227355L;
    private TemuProductPageSkuWeightResp productSkuWeight;
    private Integer productSkuSubSellMode;
    private TemuProductPageSkuSensitiveAttrResp productSkuSensitiveAttr;
    private TemuProductPageSkuNewSensitiveAttrResp productSkuNewSensitiveAttr;
    private TemuProductPageSkuVolumeResp productSkuVolume;
    private TemuProductPageSkuSensitiveLimitResp productSkuSensitiveLimit;
}
