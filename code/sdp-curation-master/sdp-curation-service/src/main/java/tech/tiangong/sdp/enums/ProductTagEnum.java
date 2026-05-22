package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;
import java.util.Set;

/**
 * 商品-标签
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 18:33
 */
@Getter
@AllArgsConstructor
public enum ProductTagEnum {
    SALES_DRIVING_PRODUCT("动销款"),
    TO_BE_UPDATED("待更新"),
    PATTERN_MAKING("已拆版"),
    PRICE_PASSED("测价通过"),
    PRICE_NO_PASSED("测价不通过"),
    ;
    private final String code;

    public static ProductTagEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("ProductTagEnum not found by code " + code));
    }

    public static Set<String> testPrice() {
        return Set.of(PRICE_PASSED.code, PRICE_NO_PASSED.code);
    }
}
