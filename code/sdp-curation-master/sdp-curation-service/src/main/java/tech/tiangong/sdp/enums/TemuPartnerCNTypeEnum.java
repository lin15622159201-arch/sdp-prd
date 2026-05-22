package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * Temu国区平台接口枚举
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/23 16:11
 */
@Getter
@AllArgsConstructor
public enum TemuPartnerCNTypeEnum {
    GOODS_CATS("bg.goods.cats.get", "商品-品类"),
    GOODS_TEMPLATE("bg.goods.attrs.get", "商品-模板"),
    GOODS_PARENT_SPEC("bg.goods.parentspec.get", "商品-父规格"),
    GOODS_SIZE_ELEMENT("bg.goods.sizecharts.settings.get", "商品-尺码模板规则"),
    WAREHOUSE_LIST("bg.goods.warehouse.list.get", "查询可绑定的发货仓库信息接口"),
    SIZE_CHARTS_CLASS("bg.goods.sizecharts.class.get", "查询尺码分组配置"),
    SIZE_CHARTS_TEMPLATE_CREATE("bg.goods.sizecharts.template.create", "创建尺码表模板"),
    SIZE_CHARTS_CREATE("bg.goods.sizecharts.create", "新增尺码表"),

    ;
    private final String code;
    private final String vale;

    public static TemuPartnerCNTypeEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("TemuPartnerCNTypeEnum not found by code " + code));
    }
}
