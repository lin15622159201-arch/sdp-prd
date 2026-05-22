package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.butted.common.enums.TaskStatusEnum;
import tech.tiangong.sdp.entity.CategoryRecTask;
import tech.tiangong.sdp.enums.SourceEnum;
import tech.tiangong.sdp.mapper.CategoryRecTaskMapper;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 品类识别任务表Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class CategoryRecTaskRepository extends ManualBaseRepository<CategoryRecTaskMapper, CategoryRecTask> {
    public List<CategoryRecTask> listByBusIds(final List<Long> busIds, final SourceEnum source) {
        return this.list(new LambdaQueryWrapper<CategoryRecTask>()
                .eq(CategoryRecTask::getDeleted, Bool.NO.getCode())
                .eq(CategoryRecTask::getBusType, source.getCode())
                .in(CategoryRecTask::getBusId, busIds))
                ;
    }

    public List<CategoryRecTask> listByBusId(final Long busId, final SourceEnum source) {
        return this.listByBusIds(List.of(busId), source)
                ;
    }

    public List<CategoryRecTask> listByDevelopStyleJobs() {
        return this.list(new LambdaQueryWrapper<CategoryRecTask>()
                .eq(CategoryRecTask::getDeleted, Bool.NO.getCode())
                .eq(CategoryRecTask::getBusType, SourceEnum.DEVELOP_STYLE.getCode())
                .in(CategoryRecTask::getTaskStatus, List.of(TaskStatusEnum.QUEUEING.getCode(), TaskStatusEnum.GENERATING.getCode()))
                .ge(CategoryRecTask::getCreatedTime, LocalDateTime.now().toLocalDate().minusDays(7))
        )
                ;
    }
}
