package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Objects;

/**
 * 现货推送PLM买手类型枚举
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 18:13
 */
@Getter
@AllArgsConstructor
public enum SpotPlmBuyerTypeEnum {
    /**
     * 分码
     */
    CODE("1", "分码"),
    /**
     * 分码
     */
    SKC_CODE("10", "SKC分码"),
    /**
     * 新增
     */
    ADD("2", "新增"),

    /**
     * 上传商品图片
     */
    EDIT_IMAGE("23", "上传商品图片"),

    /**
     * 取消
     */
    CANCEL("50", "取消"),
    ;
    private final String code;
    private final String vale;

    public static SpotPlmBuyerTypeEnum from(final String code) {
        return Arrays.stream(values())
                .filter(t -> Objects.equals(t.getCode(), code)).findFirst().orElseThrow(() ->
                        new IllegalArgumentException("SpotPlmBuyerTypeEnum not found by code " + code));
    }

}
