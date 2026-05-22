package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Objects;
import java.util.stream.Stream;

/**
 * 打版信息状态
 * <p>
 * 1.待拆版 2.已拆版
 * </p>
 *
 * @Author Husky
 * @create 2021/8/11
 */
@Getter
@AllArgsConstructor
public enum PrototypeStatusEnum {

    /**
     * 1.待拆版
     */
    WAIT_DECOMPOSE(1, "待拆版"),

    /**
     * 2.已拆版
     */
    DECOMPOSED(2, "已拆版"),
    ;

    private final Integer code;
    private final String desc;


    public static PrototypeStatusEnum findByCode(Integer code) {
        return Stream.of(PrototypeStatusEnum.values()).filter(e -> Objects.equals(e.getCode(), code)).findFirst().orElse(null);
    }
}
