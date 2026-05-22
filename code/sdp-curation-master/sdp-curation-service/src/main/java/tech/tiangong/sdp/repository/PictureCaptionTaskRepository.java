package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.butted.common.enums.TaskStatusEnum;
import tech.tiangong.sdp.entity.PictureCaptionTask;
import tech.tiangong.sdp.enums.SourceEnum;
import tech.tiangong.sdp.mapper.PictureCaptionTaskMapper;

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
public class PictureCaptionTaskRepository extends ManualBaseRepository<PictureCaptionTaskMapper, PictureCaptionTask> {
    public List<PictureCaptionTask> listByBusIds(final List<Long> busIds, final SourceEnum source) {
        return this.list(new LambdaQueryWrapper<PictureCaptionTask>()
                .eq(PictureCaptionTask::getDeleted, Bool.NO.getCode())
                .eq(PictureCaptionTask::getBusType, source.getCode())
                .in(PictureCaptionTask::getBusId, busIds))
                ;
    }

    public List<PictureCaptionTask> listByBusId(final Long busId, final SourceEnum source) {
        return this.listByBusIds(List.of(busId), source)
                ;
    }

    public List<PictureCaptionTask> listByDevelopStyleJobs() {
        return this.list(new LambdaQueryWrapper<PictureCaptionTask>()
                .eq(PictureCaptionTask::getDeleted, Bool.NO.getCode())
                .eq(PictureCaptionTask::getBusType, SourceEnum.DEVELOP_STYLE.getCode())
                .in(PictureCaptionTask::getTaskStatus, List.of(TaskStatusEnum.QUEUEING.getCode(), TaskStatusEnum.GENERATING.getCode()))
                .ge(PictureCaptionTask::getCreatedTime, LocalDateTime.now().toLocalDate().minusDays(7))
        )
                ;
    }
}
