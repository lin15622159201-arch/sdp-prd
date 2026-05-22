package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Objects;
import java.util.stream.Stream;

/**
 * SPU款_创建来源_枚举
 *
 * @author while
 * */
@Getter
@AllArgsConstructor
public enum DesignStyleSourceTypeEnum {


    /**
     * 开款任务
     */
    DEVELOP_STYLE("develop_style", "开款任务"),

    /**
     * 用户新建
     */
    USER_UPLOAD("user_upload", "用户新建"),

    ;

    private final String code;
    private final String desc;


    public static DesignStyleSourceTypeEnum findByCode(String code) {
        return Stream.of(DesignStyleSourceTypeEnum.values()).filter(e -> Objects.equals(e.getCode(), code)).findFirst().orElse(null);
    }

}
