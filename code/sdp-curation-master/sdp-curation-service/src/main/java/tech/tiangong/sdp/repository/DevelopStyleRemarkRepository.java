package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.DevelopStyleRemark;
import tech.tiangong.sdp.entity.DevelopStyleRemark;
import tech.tiangong.sdp.mapper.DevelopStyleRemarkMapper;

import java.util.List;

/**
 * 开款备注表Repository
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:15
 */
@Repository
public class DevelopStyleRemarkRepository extends ManualBaseRepository<DevelopStyleRemarkMapper, DevelopStyleRemark> {
    public List<DevelopStyleRemark> listByTaskIds(final List<Long> taskIds) {
        return this.list(new LambdaQueryWrapper<DevelopStyleRemark>()
                .eq(DevelopStyleRemark::getDeleted, Bool.NO.getCode())
                .in(DevelopStyleRemark::getTaskId, taskIds)
                .orderByDesc(DevelopStyleRemark::getCreatedTime)
        )

                ;
    }
}
