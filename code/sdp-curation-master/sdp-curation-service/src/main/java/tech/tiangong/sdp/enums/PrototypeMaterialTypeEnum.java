package tech.tiangong.sdp.enums;

import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * 设计商品图类型枚举
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 18:33
 */
@Getter
public enum PrototypeMaterialTypeEnum {
    IMAGE(0, "图片"),
    VIDEO(1, "视频");

    private final Integer code;
    private final String desc;

    PrototypeMaterialTypeEnum(Integer code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    public Integer getCode() {
        return code;
    }

    public String getDesc() {
        return desc;
    }

    public static PrototypeMaterialTypeEnum from(final Integer code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("DesignStyleMaterialTypeEnum not found by code " + code));
    }
}