package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.Arrays;
import java.util.Objects;

/**
 * 开款数据来源类型
 *
 * @author ：liuhongfu@zj.tech
 * @version :1.0
 * @date ：2025/11/3 17:10
 */
@Getter
@AllArgsConstructor
public enum DevelopStyleTaskSourceEnum {

    /**
     * 手动创建
     */
    USER_UPLOAD("user_upload", "手动创建"),


    /**
     * AIGC选款
     */
    AIGC("aigc", "AIGC选款"),


    /**
     * 以料开款
     */
    STUDIO("studio", "以料开款"),

    /**
     * 未知类型
     */
    UNKNOWN("unknown", "未知类型"),

    ;
    private final String code;
    private final String vale;

    public static DevelopStyleTaskSourceEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code))
                .findFirst()
                .orElse(UNKNOWN);
    }

    public String getCode() {
        return code;
    }

    public String getVale() {
        return vale;
    }
}
