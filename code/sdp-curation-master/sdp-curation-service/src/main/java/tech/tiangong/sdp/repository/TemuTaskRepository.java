package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.TemuTask;
import tech.tiangong.sdp.mapper.TemuTaskMapper;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

/**
 * Temu任务表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class TemuTaskRepository extends ManualBaseRepository<TemuTaskMapper, TemuTask> {
    public List<TemuTask> listByProductIds(final List<Long> productIds) {
        return this.list(new LambdaQueryWrapper<TemuTask>()
                .eq(TemuTask::getDeleted, Bool.NO.getCode())
                .in(TemuTask::getProductId, productIds)
                .orderByDesc(TemuTask::getCreatedTime)
        )

                ;
    }

    public List<TemuTask> listByParentId(final Long parentId) {
        return this.list(new LambdaQueryWrapper<TemuTask>()
                .eq(TemuTask::getDeleted, Bool.NO.getCode())
                .eq(TemuTask::getParentId, parentId)
                .orderByDesc(TemuTask::getCreatedTime)
        )

                ;
    }

    public List<TemuTask> jobs() {
        return this.list(new LambdaQueryWrapper<TemuTask>()
                .eq(TemuTask::getDeleted, Bool.NO.getCode())
                .eq(TemuTask::getPushStatus, Bool.NO.getCode())
                .ge(TemuTask::getCreatedTime, LocalDateTime.now().toLocalDate().minusDays(3))
        );
    }

    public List<TemuTask> jobByProductIds(final Set<Long> productIds) {
        return this.list(new LambdaQueryWrapper<TemuTask>()
                .eq(TemuTask::getDeleted, Bool.NO.getCode())
                .eq(TemuTask::getPushStatus, Bool.NO.getCode())
                .in(TemuTask::getProductId, productIds)
        );
    }
}
