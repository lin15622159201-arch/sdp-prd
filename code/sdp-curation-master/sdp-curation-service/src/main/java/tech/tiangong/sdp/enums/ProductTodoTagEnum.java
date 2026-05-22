package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * 商品-待办标签
 */
@Getter
@AllArgsConstructor
public enum ProductTodoTagEnum {
    IMAGE_TO_BE_UPDATED("图片待更新"),
    ADD_NEW_SKC("新增SKC"),
    CHECK_PRICE_WAIT_CONFIRM("核价待确认"),
    ;
    private final String code;

    public static ProductTodoTagEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("ProductToDoTagEnum not found by code " + code));
    }
}
