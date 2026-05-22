package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * 商品-文件类型
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 18:33
 */
@Getter
@AllArgsConstructor
public enum ProductFileTypeEnum {
    VIDEO("video", "视频"),
    MAIN_IMAGE("main_image", "主图"),
    PRODUCT_IMAGE("product_image", "商品图"),
    SIZE_IMAGE("size_image", "尺码图"),
    MATERIAL_IMAGE("material_image", "素材图"),
    CAROUSEL_IMAGE("carousel_image", "轮播图"),
    ;
    private final String code;
    private final String vale;

    public static ProductFileTypeEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("ProductFileTypeEnum not found by code " + code));
    }

}
