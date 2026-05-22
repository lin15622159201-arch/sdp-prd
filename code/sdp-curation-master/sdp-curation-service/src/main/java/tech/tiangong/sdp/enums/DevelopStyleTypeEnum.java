package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * 开款类型
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 17:10
 */
@Getter
@AllArgsConstructor
public enum DevelopStyleTypeEnum {
    SPOT_STYLE("spot_style", "现货款"),
    AI_STYLE("ai_style", "AI款"),
    SHARED_LISTING("shared_listing_style", "跟卖款"),
    ;
    private final String code;
    private final String vale;

    public static DevelopStyleTypeEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("DevelopStyleTypeEnum not found by code " + code));
    }
}
