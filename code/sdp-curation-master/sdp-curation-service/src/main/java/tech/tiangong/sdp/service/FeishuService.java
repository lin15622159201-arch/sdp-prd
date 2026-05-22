package tech.tiangong.sdp.service;

import tech.tiangong.sdp.vo.dto.FeishuMessageDTO;

/**
 * 飞书通知
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/4/16 15:30
 */
public interface FeishuService  extends BasicService{
    void sendMessage(FeishuMessageDTO message);
    void sendGroup(FeishuMessageDTO message);
}
