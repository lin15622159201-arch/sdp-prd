package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.PlmStyleLog;
import tech.tiangong.sdp.mapper.PlmStyleLogMapper;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 款式推送表Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class PlmStyleLogRepository extends ManualBaseRepository<PlmStyleLogMapper, PlmStyleLog> {
    public List<PlmStyleLog> jobs() {
        return this.list(new LambdaQueryWrapper<PlmStyleLog>()
                .eq(PlmStyleLog::getDeleted, Bool.NO.getCode())
                .in(PlmStyleLog::getPushStatus, List.of(0, 2))
                .le(PlmStyleLog::getPushTimes, 2)
                .ge(PlmStyleLog::getCreatedTime, LocalDateTime.now().toLocalDate().minusDays(3))
        )
                ;
    }

    public List<PlmStyleLog> getSkcId(final Long skcId) {
        return this.list(new LambdaQueryWrapper<PlmStyleLog>()
                .eq(PlmStyleLog::getDeleted, Bool.NO.getCode())
                .eq(PlmStyleLog::getSkcId, skcId)
                .in(PlmStyleLog::getPushStatus, List.of(0, 2))
        )
                ;
    }
}
