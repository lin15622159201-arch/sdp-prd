package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;

/**
 * 商品列表查询-敏感信息
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/17 18:32
 */
@Data
public class TemuProductPageSkuSensitiveLimitResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = -7839347414906985620L;
    private Integer maxBatteryCapacityHp;
    private Integer maxBatteryCapacity;
    private Integer maxLiquidCapacity;
    private Integer maxLiquidCapacityHp;
    private Integer maxKnifeLength;
    private Integer maxKnifeLengthHp;
}
