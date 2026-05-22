package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.Objects;
import java.util.stream.Stream;

/**
 * 款式管理推送上架状态枚举
 *
 * @author while
 */
@Getter
@AllArgsConstructor
public enum PrototypeOnShelveEnum {


    /**
     * 待推送
     */
    WAIT_PUSH(0, "待推送"),

    /**
     * 待上架
     */
    WAIT_ON_SHELVE(1, "待上架"),

    /**
     * 已上架
     */
    ON_SHELVE(2, "已上架"),


    /**
     * 下架
     */
    OFF_SHELF(3, "下架"),


    /**
     * 上架失败
     */
    ON_SHELF_FAIL(4, "上架失败"),
    ;

    private final Integer code;
    private final String desc;


    public static PrototypeOnShelveEnum findByCode(Integer code) {
        return Stream.of(PrototypeOnShelveEnum.values()).filter(e -> Objects.equals(e.getCode(), code)).findFirst().orElse(null);
    }
}
