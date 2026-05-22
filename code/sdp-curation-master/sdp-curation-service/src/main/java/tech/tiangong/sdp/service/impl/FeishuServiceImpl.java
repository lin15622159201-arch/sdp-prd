package tech.tiangong.sdp.service.impl;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import com.zjkj.scf.notification.sdk.dto.feishu.req.FeishuContentItemReq;
import com.zjkj.scf.notification.sdk.dto.feishu.req.FeishuGroupRobotMegReq;
import com.zjkj.scf.notification.sdk.dto.feishu.req.FeishuMessageReq;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.entity.FeishuNoticeLog;
import tech.tiangong.sdp.external.FeishuApi;
import tech.tiangong.sdp.repository.FeishuNoticeLogRepository;
import tech.tiangong.sdp.service.FeishuService;
import tech.tiangong.sdp.vo.dto.FeishuMessageDTO;

import java.time.LocalDateTime;
import java.util.function.Supplier;

/**
 * 飞书通知
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/4/16 15:31
 */
@Slf4j
@Service
@AllArgsConstructor
public class FeishuServiceImpl extends DefaultTaskServiceImpl implements FeishuService {
    private final FeishuNoticeLogRepository feishuNoticeLogRepository;
    private final static String APP_TYPE = "Y2_NOTICE_APP";

    @Override
    public void job() {
        final var list = feishuNoticeLogRepository.jobs();
        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        list.forEach(this::job);
    }


    @Override
    public void sendMessage(FeishuMessageDTO message) {
        final var noticeLog = obtain(message);
        final var req = new FeishuMessageReq();
        req.setTitle(message.getTitle());
        req.setMobile(message.getMobile());
        req.setAppType(APP_TYPE);
        req.setTitle(message.getTitle());
        req.setContents(JsonsKt.parseJsonList(message.getMessage(), FeishuContentItemReq.class));
        noticeLog.setContent(JsonsKt.toJson(req));
        feishuNoticeLogRepository.save(noticeLog);
        sendAndUpdate(noticeLog, () -> FeishuApi.send(req));
    }

    @Override
    public void sendGroup(FeishuMessageDTO message) {
        final var noticeLog = obtain(message);
        final var req = new FeishuGroupRobotMegReq();
        req.setNoticeType(message.getNoticeType());
        req.setTitle(message.getTitle());
        req.setContents(JsonsKt.parseJsonList(message.getMessage(), FeishuContentItemReq.class));
        noticeLog.setContent(JsonsKt.toJson(req));
        feishuNoticeLogRepository.save(noticeLog);
        sendAndUpdate(noticeLog, () -> FeishuApi.sendGroup(req));
    }

    private void job(final FeishuNoticeLog noticeLog) {
        try {
            final var message = noticeLog.getContent();
            if (StrUtil.equalsIgnoreCase(APP_TYPE, noticeLog.getLogType())) {
                final var req = JsonsKt.parseJson(message, FeishuMessageReq.class);
                this.sendAndUpdate(noticeLog, () -> FeishuApi.send(req));
            } else {
                final var req = JsonsKt.parseJson(message, FeishuGroupRobotMegReq.class);
                this.sendAndUpdate(noticeLog, () -> FeishuApi.sendGroup(req));
            }
        } catch (Exception e) {
            log.error("发送飞书通知失败\t{}", e.getLocalizedMessage(), e);
        }
    }

    private void sendAndUpdate(final FeishuNoticeLog noticeLog, final Supplier<Boolean> fn) {
        noticeLog.setPushTimes(1);
        noticeLog.setPushTime(LocalDateTime.now());
        noticeLog.setPushStatus(2);
        tryFinally(() -> {
            if (fn.get()) {
                noticeLog.setPushStatus(1);
            }
        }, e -> {
            log.error("发送飞书失败\t{}\t{}", noticeLog.getLogId(), e.getLocalizedMessage(), e);
            noticeLog.setMessage(e.getLocalizedMessage());
        }, () -> feishuNoticeLogRepository.updateById(noticeLog));
    }

    private FeishuNoticeLog obtain(final FeishuMessageDTO message) {
        final var noticeLog = new FeishuNoticeLog();
        BasicConvert.entityInit(noticeLog, noticeLog::setLogId);
        noticeLog.setPushTimes(0);
        noticeLog.setPushStatus(0);
        noticeLog.setLogType(message.getNoticeType());
        // 如果是为空,则说明是私聊
        if (StrUtil.isBlank(noticeLog.getLogType())) {
            noticeLog.setLogType(APP_TYPE);
        }
        noticeLog.setBusType(message.getBusType());
        noticeLog.setBusId(message.getBusId());
        return noticeLog;
    }
}
