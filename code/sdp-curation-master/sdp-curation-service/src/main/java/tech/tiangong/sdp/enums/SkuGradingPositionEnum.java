package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * SKU 放码部位枚举
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 18:13
 */
@Getter
@AllArgsConstructor
public enum SkuGradingPositionEnum {
    /**
     * 衣长
     */
    CLOTHES_LENGTH("1", "衣长"),
    /**
     * 袖长
     */
    SLEEVE_LENGTH("2", "袖长"),
    /**
     * 裙长
     */
    SKIRT_LENGTH("3", " 裙长"),

    /**
     * 裤长
     */
    PANT_LENGTH("4", "裤长"),

    /**
     * 裤内长
     */
    INSEAM_LENGTH("5", "裤内长"),

    /**
     * 肩宽
     */
    SHOULDER_WIDTH("6", "肩宽"),
    /**
     * 胸围
     */
    BUST("7", "胸围"),
    /**
     * 腰围
     */
    WAISTLINE("8", "腰围"),
    /**
     * 臀围
     */
    HIPLINE("9", "臀围"),

    ;
    private final String code;
    private final String vale;

    public static SkuGradingPositionEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("SpotPlmBuyerTypeEnum not found by code " + code));
    }

}
