package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 操作枚举
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/23 16:11
 */
@Getter
@AllArgsConstructor
public enum UpsetEnum {
    // 更新
    UPDATE("U"),
    // 插入
    CREATE("C"),
    // 删除
    DELETE("D"),

    ;
    private final String code;
}
