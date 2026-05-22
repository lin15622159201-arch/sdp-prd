package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.butted.common.enums.TaskStatusEnum;
import tech.tiangong.sdp.entity.MulfeatExtractTask;
import tech.tiangong.sdp.enums.SourceEnum;
import tech.tiangong.sdp.mapper.MulfeatExtractTaskMapper;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 服装特征提取任务表Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class MulfeatExtractTaskRepository extends ManualBaseRepository<MulfeatExtractTaskMapper, MulfeatExtractTask> {
    public List<MulfeatExtractTask> listByBusIds(final List<Long> busIds, final SourceEnum source) {
        return this.list(new LambdaQueryWrapper<MulfeatExtractTask>()
                .eq(MulfeatExtractTask::getDeleted, Bool.NO.getCode())
                .eq(MulfeatExtractTask::getBusType, source.getCode())
                .in(MulfeatExtractTask::getBusId, busIds))
                ;
    }

    public List<MulfeatExtractTask> listByBusId(final Long busId, final SourceEnum source) {
        return this.listByBusIds(List.of(busId), source)
                ;
    }

    public List<MulfeatExtractTask> jobs(final SourceEnum source) {
        return this.list(new LambdaQueryWrapper<MulfeatExtractTask>()
                .eq(MulfeatExtractTask::getDeleted, Bool.NO.getCode())
                .eq(MulfeatExtractTask::getBusType, source.getCode())
                .in(MulfeatExtractTask::getTaskStatus, List.of(TaskStatusEnum.QUEUEING.getCode(), TaskStatusEnum.GENERATING.getCode()))
                .ge(MulfeatExtractTask::getCreatedTime, LocalDateTime.now().toLocalDate().minusDays(7))
        )
                ;
    }
}
