package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.TemuOrderSync;
import tech.tiangong.sdp.mapper.TemuOrderSyncMapper;

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
public class TemuOrderSyncRepository extends ManualBaseRepository<TemuOrderSyncMapper, TemuOrderSync> {
    public List<TemuOrderSync> jobs() {
        return this.list(new LambdaQueryWrapper<TemuOrderSync>()
                .eq(TemuOrderSync::getDeleted, Bool.NO.getCode())
                .eq(TemuOrderSync::getSyncStatus, Bool.NO.getCode())
                .ge(TemuOrderSync::getCreatedTime, LocalDateTime.now().toLocalDate().minusDays(3))
        )
                ;
    }
}
