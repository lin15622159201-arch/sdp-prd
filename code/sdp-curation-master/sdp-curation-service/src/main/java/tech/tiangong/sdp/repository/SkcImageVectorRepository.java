package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.SkcImageVector;
import tech.tiangong.sdp.mapper.SkcImageVectorMapper;

import java.util.List;

/**
 * 款式图片信息表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class SkcImageVectorRepository extends ManualBaseRepository<SkcImageVectorMapper, SkcImageVector> {
    public List<SkcImageVector> listBySkcCode(final String skcCode) {
        return this.list(new LambdaQueryWrapper<SkcImageVector>()
                .eq(SkcImageVector::getDeleted, Bool.NO.getCode())
                .in(SkcImageVector::getSkcCode, List.of(skcCode))
                .orderByAsc(SkcImageVector::getCreatedTime)
        )
                ;
    }
}
