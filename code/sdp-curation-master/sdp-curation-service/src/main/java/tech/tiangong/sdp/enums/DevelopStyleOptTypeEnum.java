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
public enum DevelopStyleOptTypeEnum {
    /**
     * 新增
     */
    ADD("1", "新增"),

    /**
     * 审核
     */
    CHECK("10", "审核"),
    /**
     * 审核-淘汰
     */
    CHECK_DISUSE("11", "淘汰"),
    /**
     * 审核-通过
     */
    CHECK_PASS("12", "通过"),
    /**
     * 编辑
     */
    EDIT("20", "编辑"),

    /**
     * 开款
     */
    DEVELOP_STYLE("30", "开款"),

    /**
     * 识别
     */
    IDENTIFY("40", "识别"),

    /**
     * 重新识别
     */
    RE_IDENTIFY("41", "重新识别"),

    /**
     * 删除
     */
    REMOVE("90", "删除");;
    private final String code;
    private final String vale;

    public static DevelopStyleOptTypeEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("DevelopStyleOptTypeEnum not found by code " + code));
    }

}
