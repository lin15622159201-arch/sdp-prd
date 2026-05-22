package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.SpotStylePicture;
import tech.tiangong.sdp.mapper.SpotStylePictureMapper;

import java.util.List;

/**
 * 现货图Repository
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:15
 */
@Repository
public class SpotStylePictureRepository extends ManualBaseRepository<SpotStylePictureMapper, SpotStylePicture> {
    public List<SpotStylePicture> listByTaskIds(final List<Long> taskIds) {
        return this.list(new LambdaQueryWrapper<SpotStylePicture>()
                .eq(SpotStylePicture::getDeleted, Bool.NO.getCode())
                .in(SpotStylePicture::getTaskId, taskIds)
                .orderByAsc(SpotStylePicture::getCreatedTime, SpotStylePicture::getPictureId)
        )

                ;
    }

    public List<SpotStylePicture> listBySkcIds(final List<Long> skcIds) {
        return this.list(new LambdaQueryWrapper<SpotStylePicture>()
                .eq(SpotStylePicture::getDeleted, Bool.NO.getCode())
                .in(SpotStylePicture::getSkcId, skcIds)
                .orderByAsc(SpotStylePicture::getCreatedTime, SpotStylePicture::getPictureId)
        )

                ;
    }
}
