package tech.tiangong.sdp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import tech.tiangong.sdp.entity.ImageUpdatePicture;
import java.util.List;

/**
 * 图片修复任务说明Mapper
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/6 15:13
 */
public interface ImageUpdatePictureMapper extends BaseMapper<ImageUpdatePicture> {

    void deleteByTaskIds(@Param("taskIds") List<Long> taskIds);
}
