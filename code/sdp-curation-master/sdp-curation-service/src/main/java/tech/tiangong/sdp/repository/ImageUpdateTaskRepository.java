package tech.tiangong.sdp.repository;

import cn.hutool.core.collection.CollectionUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.ImageUpdateTask;
import tech.tiangong.sdp.mapper.ImageUpdateTaskMapper;
import tech.tiangong.sdp.vo.dto.ImageUpdateTaskGroupDTO;
import tech.tiangong.sdp.vo.query.ImageUpdateTaskQuery;

import java.util.List;

/**
 * 图片修复任务Repository
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 15:15
 */
@Repository
public class ImageUpdateTaskRepository extends ManualBaseRepository<ImageUpdateTaskMapper, ImageUpdateTask> {

    public Page<ImageUpdateTask> webPage(ImageUpdateTaskQuery query) {
        final var findPage = this.baseMapper.page(new Page(query.getPageNum(), query.getPageSize()), query);
        return findPage;
    }

    public List<ImageUpdateTaskGroupDTO> groupTotal(ImageUpdateTaskQuery query) {
        return baseMapper.selectGroupByTaskStatus(query);
    }

    public List<ImageUpdateTask> selectBySpuCodesAndType(List<String> spuCodes, Integer taskType) {
        return baseMapper.selectList(new QueryWrapper<ImageUpdateTask>().lambda().in(ImageUpdateTask::getSpuCode, spuCodes)
                .eq(ImageUpdateTask::getTaskType, taskType)
                .eq(ImageUpdateTask::getDeleted, Bool.NO.getCode())
        );
    }

    public List<ImageUpdateTask> selectBySpuCodes(List<String> spuCodes) {
        return baseMapper.selectList(new QueryWrapper<ImageUpdateTask>().lambda().
                in(CollectionUtil.isNotEmpty(spuCodes), ImageUpdateTask::getSpuCode, spuCodes)
                .eq(ImageUpdateTask::getDeleted, Bool.NO.getCode())
        );
    }
}
