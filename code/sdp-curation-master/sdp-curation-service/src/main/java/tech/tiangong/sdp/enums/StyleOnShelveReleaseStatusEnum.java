package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.Objects;
import java.util.stream.Stream;

/**
 * 待上架-发布状态枚举
 *
 * @author while
 */
@Getter
@AllArgsConstructor
public enum StyleOnShelveReleaseStatusEnum {

    /**
     * 待发布
     */
    WAIT_RELEASE(0, "待发布"),

    /**
     * 发布中
     */
    RELEASE_ING(1, "发布中"),

    /**
     * 已发布
     */
    RELEASE(2, "已发布"),

    /**
     * 发布失败
     */
    RELEASE_FAIL(3, "发布失败"),

    ;

    private final Integer code;
    private final String desc;


    public static StyleOnShelveReleaseStatusEnum findByCode(Integer code) {
        return Stream.of(StyleOnShelveReleaseStatusEnum.values()).filter(e -> Objects.equals(e.getCode(), code)).findFirst().orElse(null);
    }
}
