package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import tech.tiangong.sdp.common.enums.DevelopStyleRelaSourceEnum;

import java.util.Arrays;
import java.util.Objects;

/**
 * 开款关联类型
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 17:10
 */
@Getter
@AllArgsConstructor
public enum DevelopStyleRelaTypeEnum {
    VIRTUAL_TRY_ON(DevelopStyleRelaSourceEnum.VIRTUAL_TRY_ON.getCode(), DevelopStyleRelaSourceEnum.VIRTUAL_TRY_ON.getVale()),
    POSTURE_FISSION(DevelopStyleRelaSourceEnum.POSTURE_FISSION.getCode(), DevelopStyleRelaSourceEnum.POSTURE_FISSION.getVale()),
    UN_RELA("un_rela", "未关联"),
    ;
    private final String code;
    private final String vale;

    public static DevelopStyleRelaTypeEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("DevelopStyleRelaTypeEnum not found by code " + code));
    }
}
