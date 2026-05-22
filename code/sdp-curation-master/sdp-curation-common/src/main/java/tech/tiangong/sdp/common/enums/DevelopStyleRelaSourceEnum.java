package tech.tiangong.sdp.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 开款任务关联来源
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 17:06
 */
@Getter
@AllArgsConstructor
public enum DevelopStyleRelaSourceEnum {
    VIRTUAL_TRY_ON("virtual_try_on", "虚拟换衣"),
    POSTURE_FISSION("posture_fission", "姿势裂变"),
    ;
    private final String code;
    private final String vale;
}
