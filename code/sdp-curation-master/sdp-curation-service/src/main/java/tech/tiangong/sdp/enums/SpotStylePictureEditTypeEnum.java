package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * 开款-图片类型
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 18:33
 */
@Getter
@AllArgsConstructor
public enum SpotStylePictureEditTypeEnum {
    SPU_CODE("spu", "SPU"),
    SUPPLIER_CODE("supplier", "供应商"),
    ;
    private final String code;
    private final String vale;

    public static SpotStylePictureEditTypeEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("StylePictureTypeEnum not found by code " + code));
    }

}
