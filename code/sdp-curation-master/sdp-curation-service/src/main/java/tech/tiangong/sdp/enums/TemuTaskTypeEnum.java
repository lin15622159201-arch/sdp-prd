package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * Temu任务类型枚举
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/23 16:11
 */
@Getter
@AllArgsConstructor
public enum TemuTaskTypeEnum {
    VIDEO("video", "商品-视频"),
    FILE("file", "商品-文件"),
    SIZE_TEMPLATE("size-template", "尺码模板"),
    PRODUCT_ADD("product-add", "商品-新增"),
    EDIT_PICTURES("edit-pictures", "商品-修改文件"),
    ;
    private final String code;
    private final String vale;

    public static TemuTaskTypeEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("TemuTaskTypeEnum not found by code " + code));
    }
}
