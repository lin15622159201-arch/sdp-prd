package tech.tiangong.sdp.repository;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.StyleReviewLog;
import tech.tiangong.sdp.mapper.StyleReviewLogMapper;

import java.util.List;

/**
 * 款审核日志表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class StyleReviewLogRepository extends ManualBaseRepository<StyleReviewLogMapper, StyleReviewLog> {
    public StyleReviewLog getByStyleId(final Long styleId) {
        return this.getOne(new LambdaQueryWrapper<StyleReviewLog>()
                .eq(StyleReviewLog::getDeleted, Bool.NO.getCode())
                .eq(StyleReviewLog::getStyleId, styleId)
                .orderByDesc(StyleReviewLog::getCreatedTime)
                .last("LIMIT 1")
        );
    }

    public List<StyleReviewLog> getByStyleIds(final List<Long> styleIds) {
        return baseMapper.getByStyleIds(styleIds);
    }
}
