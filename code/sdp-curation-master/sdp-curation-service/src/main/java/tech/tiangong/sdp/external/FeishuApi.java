package tech.tiangong.sdp.external;

import cn.hutool.extra.spring.SpringUtil;
import com.zjkj.scf.notification.sdk.client.FeishuClient;
import com.zjkj.scf.notification.sdk.dto.feishu.req.FeishuGroupRobotMegReq;
import com.zjkj.scf.notification.sdk.dto.feishu.req.FeishuMessageReq;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import team.aikero.blade.util.json.JsonsKt;

/**
 * 发送飞书API
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/4/16 10:19
 */
@Slf4j
@UtilityClass
public class FeishuApi {
    private final FeishuClient feishuClient = SpringUtil.getBean(FeishuClient.class);

    public boolean sendGroup(final FeishuGroupRobotMegReq req) {
        log.info("发送飞书群消息\t{}", JsonsKt.toJson(req));
        try {
            final var resp = feishuClient.sendGroupRobotMessage(req);
            log.info("发送飞书群消息\t{}", JsonsKt.toJson(resp));
            if (!resp.isSuccessful()) {
                log.error("发送飞书群消息失败\t{}\t{}", resp.getCode(), resp.getMessage());
                return false;
            }
            return true;
        } catch (Exception e) {
            log.error("发送飞书群消息失败\t{}", e.getLocalizedMessage(), e);
            return false;
        }
    }

    public boolean send(final FeishuMessageReq req) {
        log.info("发送飞书消息\t{}", JsonsKt.toJson(req));
        try {
            final var resp = feishuClient.sendMessage(req);
            log.info("发送飞书消息\t{}", JsonsKt.toJson(resp));
            if (!resp.isSuccessful()) {
                log.error("发送飞书消息失败\t{}\t{}", resp.getCode(), resp.getMessage());
                return false;
            }
            return true;
        } catch (Exception e) {
            log.error("发送飞书消息失败\t{}", e.getLocalizedMessage(), e);
            return false;
        }
    }
}
