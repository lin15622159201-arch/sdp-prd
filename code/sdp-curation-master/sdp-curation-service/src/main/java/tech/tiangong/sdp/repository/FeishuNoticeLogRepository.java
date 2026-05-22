package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.FeishuNoticeLog;
import tech.tiangong.sdp.mapper.FeishuNoticeLogMapper;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 飞书通知日志表Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class FeishuNoticeLogRepository extends ManualBaseRepository<FeishuNoticeLogMapper, FeishuNoticeLog> {
    public List<FeishuNoticeLog> jobs() {
        return this.list(new LambdaQueryWrapper<FeishuNoticeLog>()
                .eq(FeishuNoticeLog::getDeleted, Bool.NO.getCode())
                .in(FeishuNoticeLog::getPushStatus, List.of(0, 2))
                .le(FeishuNoticeLog::getPushTimes, 2)
                .ge(FeishuNoticeLog::getCreatedTime, LocalDateTime.now().toLocalDate().minusDays(3))
        )
                ;
    }
}
