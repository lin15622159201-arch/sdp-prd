package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Objects;
import java.util.stream.Stream;

/**
 * 推送PLM状态枚举
 *
 * @author while
 */
@Getter
@AllArgsConstructor
public enum PushPlmStatusEnum {

    /**
     * 待推送
     */
    WAIT_PUSH(0, "待推送"),

    /**
     * 已推送
     */
    COMPLETED(1, "已推送"),

    /**
     * 推送失败
     */
    FAIL(2, "推送失败"),


    /**
     * 已取消
     */
    CANCEL(3, "已取消"),


    ;

    private final Integer code;
    private final String desc;


    public static PushPlmStatusEnum findByCode(Integer code) {
        return Stream.of(PushPlmStatusEnum.values()).filter(e -> Objects.equals(e.getCode(), code)).findFirst().orElse(null);
    }
}
