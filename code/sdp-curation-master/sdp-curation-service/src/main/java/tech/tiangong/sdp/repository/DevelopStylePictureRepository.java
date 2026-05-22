package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.DevelopStylePicture;
import tech.tiangong.sdp.mapper.DevelopStylePictureMapper;

import java.util.List;

/**
 * 开款任务图Repository
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:15
 */
@Repository
public class DevelopStylePictureRepository extends ManualBaseRepository<DevelopStylePictureMapper, DevelopStylePicture> {
    public List<DevelopStylePicture> listByTaskIds(final List<Long> taskIds) {
        return this.list(new LambdaQueryWrapper<DevelopStylePicture>()
                .eq(DevelopStylePicture::getDeleted, Bool.NO.getCode())
                .in(DevelopStylePicture::getTaskId, taskIds))
                ;
    }
}
