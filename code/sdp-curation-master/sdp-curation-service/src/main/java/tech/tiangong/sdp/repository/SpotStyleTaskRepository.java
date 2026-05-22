package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.SpotStyleTask;
import tech.tiangong.sdp.mapper.SpotStyleTaskMapper;
import tech.tiangong.sdp.vo.query.SpotStyleTaskQuery;

import java.util.List;

/**
 * 现货款表Repository
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:15
 */
@Repository
public class SpotStyleTaskRepository extends ManualBaseRepository<SpotStyleTaskMapper, SpotStyleTask> {
    public IPage<SpotStyleTask> webPage(final SpotStyleTaskQuery req) {
        return this.baseMapper.page(new Page<>(req.getPageNum(), req.getPageLimit()), req);
    }

    public List<SpotStyleTask> listByTaskCodes(final List<String> taskCodes) {
        return this.list(new LambdaQueryWrapper<SpotStyleTask>()
                .eq(SpotStyleTask::getDeleted, Bool.NO.getCode())
                .in(SpotStyleTask::getTaskCode, taskCodes)
                .orderByDesc(SpotStyleTask::getCreatedTime)
        )

                ;
    }
}
