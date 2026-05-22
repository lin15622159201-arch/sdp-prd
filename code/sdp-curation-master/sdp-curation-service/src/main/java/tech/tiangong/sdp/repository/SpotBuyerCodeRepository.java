package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.SpotBuyerCode;
import tech.tiangong.sdp.mapper.SpotBuyerCodeMapper;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 买手分码表Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class SpotBuyerCodeRepository extends ManualBaseRepository<SpotBuyerCodeMapper, SpotBuyerCode> {
    public List<SpotBuyerCode> jobs() {
        return this.list(new LambdaQueryWrapper<SpotBuyerCode>()
                .eq(SpotBuyerCode::getDeleted, Bool.NO.getCode())
                .lt(SpotBuyerCode::getCodeStatus, SpotBuyerCode.PUSH_Y + SpotBuyerCode.SYNC_Y)
                .ge(SpotBuyerCode::getCreatedTime, LocalDateTime.now().toLocalDate().minusDays(3))
        )
                ;
    }

    public List<SpotBuyerCode> listByParentIdAndLogId(final Long parentId,final Long logId) {
        return this.list(new LambdaQueryWrapper<SpotBuyerCode>()
                .eq(SpotBuyerCode::getDeleted, Bool.NO.getCode())
                .eq(SpotBuyerCode::getParentId, parentId)
                .eq(SpotBuyerCode::getLogId, logId)

        )
                ;
    }
    public List<SpotBuyerCode> listByLogId(final Long logId) {
        return this.list(new LambdaQueryWrapper<SpotBuyerCode>()
                .eq(SpotBuyerCode::getDeleted, Bool.NO.getCode())
                .eq(SpotBuyerCode::getLogId, logId)
        )
                ;
    }
}
