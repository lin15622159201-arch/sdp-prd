package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.butted.common.enums.TaskStatusEnum;
import tech.tiangong.sdp.entity.TemuAccessLog;
import tech.tiangong.sdp.entity.TemuAccessLog;
import tech.tiangong.sdp.enums.SourceEnum;
import tech.tiangong.sdp.mapper.TemuAccessLogMapper;

import java.time.LocalDateTime;
import java.util.List;

/**
 * temu 日志表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class TemuAccessLogRepository extends ManualBaseRepository<TemuAccessLogMapper, TemuAccessLog> {
    public Integer delId(final Long logId) {
        return this.baseMapper.delId(logId);
    }

    public List<TemuAccessLog> jobs() {
        return this.list(new LambdaQueryWrapper<TemuAccessLog>()
                .eq(TemuAccessLog::getDeleted, Bool.NO.getCode())
                .le(TemuAccessLog::getCreatedTime, LocalDateTime.now().toLocalDate().minusDays(7))
                .last("LIMIT 512")
        )
                ;
    }
}
