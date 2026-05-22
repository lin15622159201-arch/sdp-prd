package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * 图片修复任务状态枚举
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 18:33
 */
@Getter
@AllArgsConstructor
public enum ImageUpdateTaskStatusEnum {

    PENDING(0, "待处理"),
    PENDING_REVIEW(10, "待审核"),
    TO_BE_REPAIR(20, "待返修"),
    COMPLETED(30, "已完成"),
    CANCELED(50, "已取消");

    private final Integer code;
    private final String vale;

    public static ImageUpdateTaskStatusEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("ImageUpdateTaskStatusEnum not found by code " + code));
    }

}
