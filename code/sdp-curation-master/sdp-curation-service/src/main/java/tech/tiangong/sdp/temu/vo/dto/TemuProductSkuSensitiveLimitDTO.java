package tech.tiangong.sdp.temu.vo.dto;

import lombok.Data;

/**
 * TemuProductSkuSensitiveLimitDTO
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/4 17:55
 */
@Data
public class TemuProductSkuSensitiveLimitDTO {

    /**
     * 最大电池容量 (mWh)
     */
    private Integer maxBatteryCapacityHp;
    /**
     * 最大电池容量 (Wh)
     */
    private Integer maxBatteryCapacity;
    /**
     * 最大液体容量 (mL)
     */
    private Integer maxLiquidCapacity;
    /**
     * 最大液体容量 (μL)
     */
    private Integer maxLiquidCapacityHp;
    /**
     * 最大刀具长度 (mm)
     */
    private Integer maxKnifeLength;
    /**
     * 最大刀具长度 (μm)
     */
    private Integer maxKnifeLengthHp;
    /**
     * 刀尖角度
     */
    private TemuProductKnifeTipAngleDTO knifeTipAngle;
}
