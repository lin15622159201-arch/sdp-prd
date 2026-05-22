package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.Objects;
import java.util.stream.Stream;

/**
 * 图片类型
 *
 * @author while
 * */
@Getter
@AllArgsConstructor
public enum PictureTypeEnum {

    /**
     * 0-商品图;
     */
    PRODUCT_IMG(0, "商品图"),

    /**
     * 1-尺码图
     */
    SIZE_IMAGE(1, "尺码图"),

    /**
     * 2-营销图
     */
    MARKETING_IMAGE(2, "营销图"),

    ;

    private final Integer code;
    private final String desc;


    public static PictureTypeEnum findByCode(Integer code) {
        return Stream.of(PictureTypeEnum.values()).filter(e -> Objects.equals(e.getCode(), code)).findFirst().orElse(null);
    }
}
