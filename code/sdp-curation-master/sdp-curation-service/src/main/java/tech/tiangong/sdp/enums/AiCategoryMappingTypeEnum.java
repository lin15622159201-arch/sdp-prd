package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * AI品类映射类型枚举
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/14 14:31
 */
@Getter
@AllArgsConstructor
public enum AiCategoryMappingTypeEnum {
    STANDARD_SIZE("1", "普通码"),
    PLUS_SIZE("2", "大码"),
    ;
    private final String code;
    private final String vale;

    public static AiCategoryMappingTypeEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("AiCategoryMappingTypeEnum not found by code " + code));
    }
}
