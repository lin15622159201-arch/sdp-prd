package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.Objects;
import java.util.stream.Stream;

/**
 * 店铺审核状态
 *
 * @author while
 */
@Getter
@AllArgsConstructor
public enum ShopReviewStatusEnum {

    /**
     * 待审核
     */
    WAIT_REVIEW(0, "待审核"),

    /**
     * 已通过
     */
    REVIEW_PASS(1, "已通过"),

    /**
     * 已驳回
     */
    REVIEW_NOT_PASS(2, "已驳回"),

    ;

    private final Integer code;
    private final String desc;


    public static ShopReviewStatusEnum findByCode(Integer code) {
        return Stream.of(ShopReviewStatusEnum.values()).filter(e -> Objects.equals(e.getCode(), code)).findFirst().orElse(null);
    }
}
