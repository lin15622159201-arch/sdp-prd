package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.DevelopStyleSpu;
import tech.tiangong.sdp.mapper.DevelopStyleSpuMapper;

import java.util.List;

/**
 * 开款-SPU表Repository
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:15
 */
@Repository
public class DevelopStyleSpuRepository extends ManualBaseRepository<DevelopStyleSpuMapper, DevelopStyleSpu> {
    public List<DevelopStyleSpu> listByTaskIds(final List<Long> taskIds) {
        return this.list(new LambdaQueryWrapper<DevelopStyleSpu>()
                .eq(DevelopStyleSpu::getDeleted, Bool.NO.getCode())
                .in(DevelopStyleSpu::getTaskId, taskIds))
                ;
    }
}
