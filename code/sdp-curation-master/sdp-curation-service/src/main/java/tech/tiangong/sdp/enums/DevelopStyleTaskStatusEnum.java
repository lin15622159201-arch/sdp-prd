package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * 开款状态
 * 任务状态：0-待审核；10-待开款；20-已淘汰；30-已开款；50-失败；
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 17:24
 */
@Getter
@AllArgsConstructor
public enum DevelopStyleTaskStatusEnum {
    PENDING_REVIEW(0, "待审核"),
    PAYMENT_PENDING(10, "待开款"),
    ELIMINATED(20, "已淘汰"),
    DEVELOP_STYLE(30, "已开款"),
    ;
    private final Integer code;
    private final String vale;
}
