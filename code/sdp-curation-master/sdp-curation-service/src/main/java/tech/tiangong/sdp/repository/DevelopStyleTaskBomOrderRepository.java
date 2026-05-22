package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.DevelopStyleTaskBomOrder;
import tech.tiangong.sdp.mapper.DevelopStyleTaskBomOrderMapper;
import java.util.List;

/**
 * 开款任务Bom信息关联表Repository
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 15:15
 */
@Repository
public class DevelopStyleTaskBomOrderRepository extends ManualBaseRepository<DevelopStyleTaskBomOrderMapper, DevelopStyleTaskBomOrder> {

    public List<DevelopStyleTaskBomOrder> listByTaskIds(final List<Long> taskIds) {
        return this.list(new LambdaQueryWrapper<DevelopStyleTaskBomOrder>()
                .eq(DevelopStyleTaskBomOrder::getDeleted, Bool.NO.getCode())
                .in(DevelopStyleTaskBomOrder::getDevelopStyleTaskId, taskIds))
                ;
    }

}
