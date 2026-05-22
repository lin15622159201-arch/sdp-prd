package tech.tiangong.sdp.vo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 飞书消息
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/4/16 15:35
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FeishuMessageDTO {
    /**
     * 业务Id
     */
    private Long busId;

    /**
     * 业务类型
     */
    private String busType;
    /**
     * 消息
     */
    private String message;
    /**
     * 标题
     */
    private String title;
    /**
     * 手机号
     */
    private String mobile;
    /**
     * 类型
     */
    private String noticeType;
}
