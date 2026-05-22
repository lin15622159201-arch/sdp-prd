package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.TemuSize;
import tech.tiangong.sdp.entity.TemuSize;
import tech.tiangong.sdp.mapper.TemuSizeMapper;

import java.util.List;

/**
 * Temu尺码表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class TemuSizeRepository extends ManualBaseRepository<TemuSizeMapper, TemuSize> {
    public List<TemuSize> listByTemplateId(final Long templateId) {
        return this.list(new LambdaQueryWrapper<TemuSize>()
                .eq(TemuSize::getDeleted, Bool.NO.getCode())
                .eq(TemuSize::getTemplateId, templateId)
                .orderByDesc(TemuSize::getCreatedTime)
        )

                ;
    }
}
