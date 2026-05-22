package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * 开款操作类型
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 18:13
 */
@Getter
@AllArgsConstructor
public enum SpotStyleOptTypeEnum {
    /**
     * 新增
     */
    ADD("1", "新增"),
    /**
     * 新增SKC
     */
    ADD_SKC("2", "新增-SCK"),

    /**
     * 复色
     */
    RE_COLOR("21", "复色"),
    /**
     * 上架
     */
    ON_SHELVES("22", "上架"),
    /**
     * 推送买手
     */
    PUSH_BUYER("23", "推送买手"),

    /**
     * 编辑
     */
    EDIT("20", "编辑"),
    /**
     * 编辑SKC
     */
    EDIT_SKC("24", "编辑SKC"),
    /**
     * 上传商品图片
     */
    EDIT_IMAGE("25", "上传商品图片"),

    /**
     * 设计师变更
     */
    CHANGE_DESIGNER("26", "设计师变更"),


    /**
     * 取消
     */
    CANCEL("50", "取消"),
    /**
     * 取消SKC
     */
    CANCEL_SKC("51", "取消SKC"),
    /**
     * 买手取消SKC
     */
    BUYER_CANCEL_SKC("52", "买手取消SKC"),

    /**
     * 上架
     */
    ON_SHELVES_SUCCESS("53", "上架"),

    /**
     * 下架
     */
    OFF_SHELVES("54", "下架"),

    /**
     * 上架失败
     */
    ON_SHELVES_FAIL("55", "上架失败"),


    /**
     * 删除
     */
    REMOVE("90", "删除");
    private final String code;
    private final String vale;

    public static SpotStyleOptTypeEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("SpotStyleOptTypeEnum not found by code " + code));
    }

}
