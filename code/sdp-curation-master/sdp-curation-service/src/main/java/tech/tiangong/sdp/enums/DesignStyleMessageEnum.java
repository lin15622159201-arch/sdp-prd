package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * SourceEnum
 *
 * @author ：liuhongfu@zj.tech
 * @version :1.0
 * @date ：2025/11/18 11:15
 */
@Getter
@AllArgsConstructor
public enum DesignStyleMessageEnum {

    /**
     * PLM
     */
    PLM("plm", "PLM"),

    /**
     * 算法
     */
    BUTTED("butted", "算法"),

    ;
    private final String code;
    private final String desc;


    public static DesignStyleMessageEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("SpotTaskMessageEnum not found by code " + code));
    }
}
