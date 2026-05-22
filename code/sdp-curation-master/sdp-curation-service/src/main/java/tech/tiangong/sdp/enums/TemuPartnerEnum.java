package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * Temu平台枚举
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/23 16:11
 */
@Getter
@AllArgsConstructor
public enum TemuPartnerEnum {
    CN("cn", "国区"),
    CN_PA("pa", "国区-PA"),
    GLOBAL("global", "全球"),
    US("us", "美区"),
    OTHER("other", "其他"),

    ;
    private final String code;
    private final String vale;

    public static TemuPartnerEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("TemuPartnerEnum not found by code " + code));
    }
}
