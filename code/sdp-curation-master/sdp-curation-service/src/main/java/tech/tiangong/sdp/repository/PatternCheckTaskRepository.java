package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.butted.common.enums.TaskStatusEnum;
import tech.tiangong.sdp.entity.PatternCheckTask;
import tech.tiangong.sdp.enums.SourceEnum;
import tech.tiangong.sdp.mapper.PatternCheckTaskMapper;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 图片描述说明任务表Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class PatternCheckTaskRepository extends ManualBaseRepository<PatternCheckTaskMapper, PatternCheckTask> {
    public List<PatternCheckTask> listByBusIds(final List<Long> busIds, final SourceEnum source) {
        return this.list(new LambdaQueryWrapper<PatternCheckTask>()
                .eq(PatternCheckTask::getDeleted, Bool.NO.getCode())
                .eq(PatternCheckTask::getBusType, source.getCode())
                .in(PatternCheckTask::getBusId, busIds))
                ;
    }

    public List<PatternCheckTask> listByBusId(final Long busId, final SourceEnum source) {
        return this.listByBusIds(List.of(busId), source)
                ;
    }

    public List<PatternCheckTask> listByDevelopStyleJobs() {
        return this.list(new LambdaQueryWrapper<PatternCheckTask>()
                .eq(PatternCheckTask::getDeleted, Bool.NO.getCode())
                .eq(PatternCheckTask::getBusType, SourceEnum.DEVELOP_STYLE.getCode())
                .in(PatternCheckTask::getTaskStatus, List.of(TaskStatusEnum.QUEUEING.getCode(), TaskStatusEnum.GENERATING.getCode()))
                .ge(PatternCheckTask::getCreatedTime, LocalDateTime.now().toLocalDate().minusDays(7))
        )
                ;
    }
}
