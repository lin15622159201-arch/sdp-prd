package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Objects;
import java.util.stream.Stream;

/**
 * 打版类型
 *
 * @author while
 * */
@Getter
@AllArgsConstructor
public enum SkcTypeEnum {

    /**
     * 正常款
     */
    NORMAL(1, "正常款"),

    /**
     * 复色款
     */
    COMPOUND_COLORS(2, "复色款"),

    ;

    private final Integer code;
    private final String desc;


    public static SkcTypeEnum findByCode(Integer code) {
        return Stream.of(SkcTypeEnum.values()).filter(e -> Objects.equals(e.getCode(), code)).findFirst().orElse(null);
    }
}
