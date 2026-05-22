package tech.tiangong.sdp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import tech.tiangong.sdp.entity.StyleReviewLog;

import java.util.List;

/**
 * 款审核日志表 Mapper
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:16
 */
public interface StyleReviewLogMapper extends BaseMapper<StyleReviewLog> {
    List<StyleReviewLog> getByStyleIds(@Param("styleIds") List<Long> styleIds);
}
