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
public enum SourceEnum {
    /**
     * 面料识别
     */
    FABRIC_IDENTIFY("fabric_identify", "面料识别"),
    /**
     * 开款
     */
    DEVELOP_STYLE("develop_style", "开款"),

    /**
     * 现货款
     */
    SPOT_STYLE("spot_style", "现货款"),

    /**
     * SKC
     */
    PROTOTYPE("prototype", "SKC"),
    ;
    private final String code;
    private final String desc;


    public static SourceEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("SourceEnum not found by code " + code));
    }
}
