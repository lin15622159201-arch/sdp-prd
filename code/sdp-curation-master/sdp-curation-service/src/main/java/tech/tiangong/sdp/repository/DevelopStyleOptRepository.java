package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.DevelopStyleOpt;
import tech.tiangong.sdp.mapper.DevelopStyleOptMapper;

import java.util.List;

/**
 * 开款操作表Repository
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:15
 */
@Repository
public class DevelopStyleOptRepository extends ManualBaseRepository<DevelopStyleOptMapper, DevelopStyleOpt> {
    public List<DevelopStyleOpt> listByTaskIds(final List<Long> taskIds) {
        return this.list(new LambdaQueryWrapper<DevelopStyleOpt>()
                .eq(DevelopStyleOpt::getDeleted, Bool.NO.getCode())
                .in(DevelopStyleOpt::getTaskId, taskIds)
                .orderByDesc(DevelopStyleOpt::getCreatedTime)
        )

                ;
    }
}