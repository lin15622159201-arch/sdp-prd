package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.SpotStyleSkc;
import tech.tiangong.sdp.mapper.SpotStyleSkcMapper;

import java.util.List;

/**
 * 现货skc表Repository
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:15
 */
@Repository
public class SpotStyleSkcRepository extends ManualBaseRepository<SpotStyleSkcMapper, SpotStyleSkc> {
    public List<SpotStyleSkc> listByTaskIds(final List<Long> taskIds) {
        return this.list(new LambdaQueryWrapper<SpotStyleSkc>()
                .eq(SpotStyleSkc::getDeleted, Bool.NO.getCode())
                .in(SpotStyleSkc::getTaskId, taskIds)
                .orderByDesc(SpotStyleSkc::getCreatedTime)
        )

                ;
    }

    public List<SpotStyleSkc> listByTaskIdAndCodes(final List<Long> taskIds, final List<String> skcCodes) {
        return this.list(new LambdaQueryWrapper<SpotStyleSkc>()
                .eq(SpotStyleSkc::getDeleted, Bool.NO.getCode())
                .in(SpotStyleSkc::getTaskId, taskIds)
                .and(
                        c -> skcCodes
                                .forEach(
                                        it -> c.or().like(SpotStyleSkc::getSkcCode, it)
                                )
                )
                .orderByDesc(SpotStyleSkc::getCreatedTime)
        )

                ;
    }

    public List<SpotStyleSkc> listBySkcCodes(final List<String> skcCodes) {
        return this.list(new LambdaQueryWrapper<SpotStyleSkc>()
                .eq(SpotStyleSkc::getDeleted, Bool.NO.getCode())
                .in(SpotStyleSkc::getSkcCode, skcCodes)
                .orderByDesc(SpotStyleSkc::getCreatedTime)
        );
    }
}
