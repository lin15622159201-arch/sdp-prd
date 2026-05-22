package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * Temu属性值引用类型枚举
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/23 16:11
 */
@Getter
@AllArgsConstructor
public enum TemuAttributeReferenceTypeEnum {
    GENERAL("0", "通用"),
    COLOR("1", "颜色"),
    SIZE("2", "尺码"),
    PHONE_MODEL("3", "手机型号"),
    ;
    private final String code;
    private final String vale;

    public static TemuAttributeReferenceTypeEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("TemuPartnerUSTypeEnum not found by code " + code));
    }
}
