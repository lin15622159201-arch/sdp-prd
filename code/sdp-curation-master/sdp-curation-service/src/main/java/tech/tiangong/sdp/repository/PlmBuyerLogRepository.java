package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.PlmBuyerLog;
import tech.tiangong.sdp.mapper.PlmBuyerLogMapper;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 现货买手推送表Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class PlmBuyerLogRepository extends ManualBaseRepository<PlmBuyerLogMapper, PlmBuyerLog> {
    public List<PlmBuyerLog> jobs() {
        return this.list(new LambdaQueryWrapper<PlmBuyerLog>()
                .eq(PlmBuyerLog::getDeleted, Bool.NO.getCode())
                .in(PlmBuyerLog::getPushStatus, List.of(0, 2))
                .le(PlmBuyerLog::getPushTimes, 2)
                .ge(PlmBuyerLog::getCreatedTime, LocalDateTime.now().toLocalDate().minusDays(3))
        )
                ;
    }
}
