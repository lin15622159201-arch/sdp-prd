package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * Temu任务操作类型枚举
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/23 16:11
 */
@Getter
@AllArgsConstructor
public enum TemuTaskOptTypeEnum {
    ADD("add", "新增"),
    EDIT_FILE("edit-file", "编辑文件"),
    EDIT_SKC("edit-skc", "编辑SKC"),
    ;
    private final String code;
    private final String vale;

    public static TemuTaskOptTypeEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("TemuTaskOptTypeEnum not found by code " + code));
    }
}
