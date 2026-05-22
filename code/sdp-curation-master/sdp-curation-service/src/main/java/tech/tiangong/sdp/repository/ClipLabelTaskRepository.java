package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.butted.common.enums.TaskStatusEnum;
import tech.tiangong.sdp.entity.ClipLabelTask;
import tech.tiangong.sdp.enums.SourceEnum;
import tech.tiangong.sdp.mapper.ClipLabelTaskMapper;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 提取标签任务表Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class ClipLabelTaskRepository extends ManualBaseRepository<ClipLabelTaskMapper, ClipLabelTask> {
    public List<ClipLabelTask> listByBusIds(final List<Long> busIds, final SourceEnum source) {
        return this.list(new LambdaQueryWrapper<ClipLabelTask>()
                .eq(ClipLabelTask::getDeleted, Bool.NO.getCode())
                .eq(ClipLabelTask::getBusType, source.getCode())
                .in(ClipLabelTask::getBusId, busIds))
                ;
    }

    public List<ClipLabelTask> listByBusId(final Long busId, final SourceEnum source) {
        return this.listByBusIds(List.of(busId), source)
                ;
    }

    public List<ClipLabelTask> listBySourceJobs(final SourceEnum source) {
        return this.list(new LambdaQueryWrapper<ClipLabelTask>()
                .eq(ClipLabelTask::getDeleted, Bool.NO.getCode())
                .eq(ClipLabelTask::getBusType, source.getCode())
                .in(ClipLabelTask::getTaskStatus, List.of(TaskStatusEnum.QUEUEING.getCode(), TaskStatusEnum.GENERATING.getCode()))
                .ge(ClipLabelTask::getCreatedTime, LocalDateTime.now().toLocalDate().minusDays(7))
        )
                ;
    }

    public List<ClipLabelTask> listByTaskCode(final String taskCode, final SourceEnum source) {
        return this.list(new LambdaQueryWrapper<ClipLabelTask>()
                .eq(ClipLabelTask::getDeleted, Bool.NO.getCode())
                .eq(ClipLabelTask::getBusType, source.getCode())
                .eq(ClipLabelTask::getTaskCode, taskCode))
                ;
    }
}
