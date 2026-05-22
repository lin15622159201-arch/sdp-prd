package tech.tiangong.sdp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import tech.tiangong.sdp.entity.ImageUpdateTask;
import tech.tiangong.sdp.vo.dto.ImageUpdateTaskGroupDTO;
import tech.tiangong.sdp.vo.query.ImageUpdateTaskQuery;

import java.util.List;

/**
 * 图片修复任务Mapper
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/6 15:13
 */
public interface ImageUpdateTaskMapper extends BaseMapper<ImageUpdateTask> {
    Page<ImageUpdateTask> page(@Param("page") Page page, @Param("req") ImageUpdateTaskQuery query);

    List<ImageUpdateTaskGroupDTO> selectGroupByTaskStatus(@Param("req")ImageUpdateTaskQuery query);

}
