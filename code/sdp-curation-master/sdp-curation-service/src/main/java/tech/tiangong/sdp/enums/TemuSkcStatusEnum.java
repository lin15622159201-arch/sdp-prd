package tech.tiangong.sdp.enums;

import cn.hutool.core.util.StrUtil;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * TemuSKC状态
 * "selectStatus": 7,--价格申报中
 * "selectStatus": 9,--价格已作废
 * "selectStatus": 10,--未发布到站点
 * "selectStatus": 12,--已发布到站点
 * "selectStatus": 13,--已下架/终止
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/23 16:11
 */
@Getter
@AllArgsConstructor
public enum TemuSkcStatusEnum {
    // 价格申报中
    PRICE_DECLARATION_IN_PROGRESS("7", "价格申报中"),
    // 价格已作废
    PRICE_VOIDED("9", "价格已作废"),
    // 未发布到站点
    NOT_PUBLISHED_TO_SITE("10", "未发布到站点"),
    // 已发布到站点
    PUBLISHED_TO_SITE("12", "已发布到站点"),
    // 已下架/终止
    OFF_SHELF("13", "已下架/终止"),

    ;
    private final String code;
    private final String vale;

    public static TemuSkcStatusEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("TemuSkcStatusEnum not found by code " + code));
    }

    public static Set<String> codes() {
        return Arrays.stream(values()).map(it -> it.code).collect(Collectors.toSet());
    }

    public static boolean offShelf(final String code) {
        return StrUtil.equalsIgnoreCase(OFF_SHELF.code, code);
    }

    public static boolean onShelf(final String code) {
        return Set.of(PUBLISHED_TO_SITE.code,
                        PRICE_VOIDED.code,
                        NOT_PUBLISHED_TO_SITE.code,
                        PRICE_DECLARATION_IN_PROGRESS.code)
                .contains(code);
    }
}
