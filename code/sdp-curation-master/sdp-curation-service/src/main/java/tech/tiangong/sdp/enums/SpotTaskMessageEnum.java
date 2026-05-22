package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * SourceEnum
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/18 11:15
 */
@Getter
@AllArgsConstructor
public enum SpotTaskMessageEnum {
    /**
     * 买手
     */
    BUYER("buyer", "买手"),
    /**
     * 算法
     */
    BUTTED("butted", "算法"),

    ;
    private final String code;
    private final String desc;


    public static SpotTaskMessageEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("SpotTaskMessageEnum not found by code " + code));
    }
}
