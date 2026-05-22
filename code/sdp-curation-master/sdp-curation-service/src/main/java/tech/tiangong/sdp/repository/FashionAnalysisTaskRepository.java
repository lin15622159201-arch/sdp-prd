package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.butted.common.enums.TaskStatusEnum;
import tech.tiangong.sdp.entity.FashionAnalysisTask;
import tech.tiangong.sdp.enums.SourceEnum;
import tech.tiangong.sdp.mapper.FashionAnalysisTaskMapper;

import java.time.LocalDateTime;
import java.util.List;

/**
 * fashion分析任务表Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class FashionAnalysisTaskRepository extends ManualBaseRepository<FashionAnalysisTaskMapper, FashionAnalysisTask> {
    public List<FashionAnalysisTask> listByBusIds(final List<Long> busIds, final SourceEnum source) {
        return this.list(new LambdaQueryWrapper<FashionAnalysisTask>()
                .eq(FashionAnalysisTask::getDeleted, Bool.NO.getCode())
                .eq(FashionAnalysisTask::getBusType, source.getCode())
                .in(FashionAnalysisTask::getBusId, busIds))
                ;
    }

    public List<FashionAnalysisTask> listByBusId(final Long busId, final SourceEnum source) {
        return this.listByBusIds(List.of(busId), source)
                ;
    }

    public List<FashionAnalysisTask> listBySourceJobs(final SourceEnum source) {
        return this.list(new LambdaQueryWrapper<FashionAnalysisTask>()
                .eq(FashionAnalysisTask::getDeleted, Bool.NO.getCode())
                .eq(FashionAnalysisTask::getBusType, source.getCode())
                .in(FashionAnalysisTask::getTaskStatus, List.of(TaskStatusEnum.QUEUEING.getCode(), TaskStatusEnum.GENERATING.getCode()))
                .ge(FashionAnalysisTask::getCreatedTime, LocalDateTime.now().toLocalDate().minusDays(7))
        )
                ;
    }

    public List<FashionAnalysisTask> listByTaskCode(final String taskCode, final SourceEnum source) {
        return this.list(new LambdaQueryWrapper<FashionAnalysisTask>()
                .eq(FashionAnalysisTask::getDeleted, Bool.NO.getCode())
                .eq(FashionAnalysisTask::getBusType, source.getCode())
                .eq(FashionAnalysisTask::getTaskCode, taskCode))
                ;
    }
}
