package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.SpotStyleOpt;
import tech.tiangong.sdp.entity.SpotStyleOpt;
import tech.tiangong.sdp.mapper.SpotStyleOptMapper;

import java.util.List;

/**
 * 开款操作表Repository
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:15
 */
@Repository
public class SpotStyleOptRepository extends ManualBaseRepository<SpotStyleOptMapper, SpotStyleOpt> {
    public List<SpotStyleOpt> listByTaskIds(final List<Long> taskIds) {
        return this.list(new LambdaQueryWrapper<SpotStyleOpt>()
                .eq(SpotStyleOpt::getDeleted, Bool.NO.getCode())
                .in(SpotStyleOpt::getTaskId, taskIds)
                .orderByDesc(SpotStyleOpt::getCreatedTime)
        )

                ;
    }
}
