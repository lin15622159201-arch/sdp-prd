package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * Temu美区平台接口枚举
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/23 16:11
 */
@Getter
@AllArgsConstructor
public enum TemuPartnerUSTypeEnum {
    GOODS_CATS("bg.local.goods.cats.get", "商品品类"),
    GOODS_TEMPLATE("bg.local.goods.template.get", "商品模板"),
    GOODS_SIZE_ELEMENT("bg.local.goods.size.element.get", "商品尺码属性"),
    ;
    private final String code;
    private final String vale;

    public static TemuPartnerUSTypeEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("TemuPartnerUSTypeEnum not found by code " + code));
    }
}
