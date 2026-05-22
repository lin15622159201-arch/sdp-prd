package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.ImageUpdateResult;
import tech.tiangong.sdp.mapper.ImageUpdateResultMapper;

import java.util.List;

/**
 * 图片修复任务-审核图片 Repository
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 15:15
 */
@Repository
public class ImageUpdateResultRepository extends ManualBaseRepository<ImageUpdateResultMapper, ImageUpdateResult> {

    public void deleteByTaskIds(List<Long> taskIds) {
        baseMapper.deleteByTaskIds(taskIds);
    }

    public List<ImageUpdateResult> listByTaskIds(List<Long> taskIds) {
        return this.list(new LambdaQueryWrapper<ImageUpdateResult>()
                .eq(ImageUpdateResult::getDeleted, Bool.NO.getCode())
                .in(ImageUpdateResult::getTaskId, taskIds))
                ;
    }
}
