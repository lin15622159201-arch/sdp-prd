package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * 款式图片向量
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/18 11:15
 */
@Getter
@AllArgsConstructor
public enum DesignVectorEnum {

    DESIGN_VECTOR_NAME("sdp_design_image", "款式图片"),

    IMAGE_ID("imageId", "图片ID"),


    SKC_CODE("skcCode", "SKC编码"),


    SKC_ID("skcId", "SKC ID"),
    TYPE("type", "类型"),
    PARTITION("sdp_curation", "sdp_curation"),
    ;
    private final String code;
    private final String desc;


    public static DesignVectorEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("DesignVectorEnum not found by code " + code));
    }
}
