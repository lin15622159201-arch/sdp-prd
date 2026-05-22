package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Objects;
import java.util.stream.Stream;

/**
 * spu提交状态: 1-待提交; 2-已提交
 *
 * @author while
 * */
@Getter
@AllArgsConstructor
public enum StyleStatusEnum {

    /**
     * 1-待提交;
     */
    WAIT_SUBMIT(1, "待提交"),

    /**
     * 2-已提交
     */
    SUBMITTED(2, "已提交"),

    ;

    private final Integer code;
    private final String desc;


    public static StyleStatusEnum findByCode(Integer code) {
        return Stream.of(StyleStatusEnum.values()).filter(e -> Objects.equals(e.getCode(), code)).findFirst().orElse(null);
    }
}
