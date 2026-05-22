package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * 飞书日志类型
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/4/16 18:46
 */
@Getter
@AllArgsConstructor
public enum FeishuNoticeTypeEnum {
    PROTOTYPE("prototype", "款式"),
    ;
    private final String code;
    private final String vale;
    public static FeishuNoticeTypeEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("FeishuNoticeTypeEnum not found by code " + code));
    }
}
