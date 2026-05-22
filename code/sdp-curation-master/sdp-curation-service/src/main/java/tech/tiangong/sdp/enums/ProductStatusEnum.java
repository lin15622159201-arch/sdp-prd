package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * 商品-状态
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 18:33
 */
@Getter
@AllArgsConstructor
public enum ProductStatusEnum {
    DRAFT(-1, "草稿"),
    PUBLISHING(0, "发布中"),
    PUBLISHED(1, "已发布"),
    PUBLISH_FAILED(9, "发布失败"),
    EDIT_SKC(10, "编辑-SKC"),
    EDIT_FILE(11, "编辑-图片"),
    EDIT_FAILED(19, "编辑-发布失败"),
    ;
    private final int code;
    private final String vale;

    public static ProductStatusEnum from(final int code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("ProductStatusEnum not found by code " + code));
    }

}
