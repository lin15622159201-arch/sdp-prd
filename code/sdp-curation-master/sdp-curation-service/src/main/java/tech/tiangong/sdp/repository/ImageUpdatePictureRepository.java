package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.ImageUpdatePicture;
import tech.tiangong.sdp.mapper.ImageUpdatePictureMapper;
import java.util.List;

/**
 * 图片修复任务-图片Repository
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 15:15
 */
@Repository
public class ImageUpdatePictureRepository extends ManualBaseRepository<ImageUpdatePictureMapper, ImageUpdatePicture> {

    public List<ImageUpdatePicture> listByTaskIds(final List<Long> taskIds) {
        return this.list(new LambdaQueryWrapper<ImageUpdatePicture>()
                .eq(ImageUpdatePicture::getDeleted, Bool.NO.getCode())
                .in(ImageUpdatePicture::getTaskId, taskIds))
                ;
    }

    public void deleteByTaskIds(List<Long> taskIds) {
        baseMapper.deleteByTaskIds(taskIds);
    }
}
