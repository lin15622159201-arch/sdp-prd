package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import team.aikero.blade.core.enums.Bool;

/**
 * 图片修复审核结果
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 18:17
 */
@Getter
@AllArgsConstructor
public enum ImageUpdateTaskResultEnum {
    NOT_PASS(Bool.NO.getCode(), "不通过"),
    PASS(Bool.YES.getCode(), "通过"),
    ;
    private final Integer code;
    private final String vale;

}
