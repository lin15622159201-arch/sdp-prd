package tech.tiangong.sdp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import tech.tiangong.sdp.entity.ImageUpdateResult;

import java.util.List;

/**
 * 图片修复审核结果Mapper
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/6 15:13
 */
public interface ImageUpdateResultMapper extends BaseMapper<ImageUpdateResult> {
    void deleteByTaskIds(@Param("taskIds") List<Long> taskIds);
}
