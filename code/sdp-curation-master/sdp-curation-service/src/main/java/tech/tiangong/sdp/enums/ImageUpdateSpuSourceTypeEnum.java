package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * SourceTypeEnum
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/7 14:42
 */
@Getter
@AllArgsConstructor
public enum ImageUpdateSpuSourceTypeEnum {
    DESIGN_STYLE("prototype_manage", "款式管理"),
    SPOT_STYLE("spot_style", "现货管理"),
    ;
    private final String code;
    private final String vale;

}
