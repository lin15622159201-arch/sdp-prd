package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * 款式图片向量类型
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/18 11:15
 */
@Getter
@AllArgsConstructor
public enum DesignVectorTypeEnum {

    UP("up", "上装区域"),

    DOWN("down", "下装区域"),


    FULL("full", "连身类或全身所有服装区域"),


    WHOLE("whole", "全图的特征"),
    ;
    private final String code;
    private final String desc;


    public static DesignVectorTypeEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("DesignVectorTypeEnum not found by code " + code));
    }
}
