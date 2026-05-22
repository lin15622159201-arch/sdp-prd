package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import team.aikero.blade.core.enums.Bool;

import java.util.Arrays;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Temu SKC同步状态
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/23 16:11
 */
@Getter
@AllArgsConstructor
public enum TemuSkcSyncStatusEnum {
    // 初始化
    INIT(-1, "初始化"),
    // 未同步
    UN_SYNC(Bool.NO.getCode(), "未同步"),
    SYNC(Bool.YES.getCode(), "已经同步"),


    ;
    private final int code;
    private final String vale;

    public static TemuSkcSyncStatusEnum from(final int code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("TemuSkcSyncStatusEnum not found by code " + code));
    }

}
