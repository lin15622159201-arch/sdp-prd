package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.PlmSdpStyleRela;
import tech.tiangong.sdp.enums.PushPlmStatusEnum;
import tech.tiangong.sdp.mapper.PlmSdpStyleRelaMapper;

import java.time.LocalDateTime;
import java.util.List;

/**
 * PLM-SDP款式管理编码关联表Repository
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 15:15
 */
@Repository
public class PlmSdpStyleRelaRepository extends ManualBaseRepository<PlmSdpStyleRelaMapper, PlmSdpStyleRela> {

    public List<PlmSdpStyleRela> selectFail() {
        return this.list(new LambdaQueryWrapper<PlmSdpStyleRela>()
                .eq(PlmSdpStyleRela::getDeleted, Bool.NO.getCode())
                .in(PlmSdpStyleRela::getTaskStatus, List.of(PushPlmStatusEnum.WAIT_PUSH.getCode(), PushPlmStatusEnum.FAIL.getCode()))
                .ge(PlmSdpStyleRela::getCreatedTime, LocalDateTime.now().toLocalDate().minusDays(3))
        )
                ;
    }

    public PlmSdpStyleRela selectParent(Long parentId) {
        return lambdaQuery()
                .eq(PlmSdpStyleRela::getTaskId, parentId)
                .eq(PlmSdpStyleRela::getDeleted, Bool.NO.getCode())
                .one();
    }

    public List<PlmSdpStyleRela> listByLogId(final Long logId) {
        return this.list(new LambdaQueryWrapper<PlmSdpStyleRela>()
                .eq(PlmSdpStyleRela::getDeleted, Bool.NO.getCode())
                .eq(PlmSdpStyleRela::getLogId, logId)
        )
                ;
    }
}
