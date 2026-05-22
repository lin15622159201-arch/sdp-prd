package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import team.aikero.blade.core.enums.Bool;

import java.util.Objects;

/**
 * 开款审核结果
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 18:17
 */
@Getter
@AllArgsConstructor
public enum DevelopStyleCheckResultEnum {
    UN_CHECK(Bool.NO.getCode(), "未审核"),
    DISUSE(Bool.YES.getCode(), "淘汰"),
    PASS(2, "通过"),
    ;
    private final Integer code;
    private final String vale;

    public static boolean check(final Integer code) {
        return Objects.equals(DISUSE.getCode(), code) || Objects.equals(PASS.getCode(), code);
    }
}
