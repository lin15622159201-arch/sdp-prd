package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * SourceTypeEnum
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/7 14:42
 */
@Getter
@AllArgsConstructor
public enum SourceTypeEnum {
    USER_UPLOAD("user_upload", "用户上传"),
    DEVELOP_STYLE("develop_style", "开款"),
    ;
    private final String code;
    private final String vale;

    public static SourceTypeEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("SourceTypeEnum not found by code " + code));
    }
}
