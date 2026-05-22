package tech.tiangong.sdp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;
import tech.tiangong.sdp.entity.DevelopStyleTask;
import tech.tiangong.sdp.vo.dto.DevelopStyleStateGroupDTO;
import tech.tiangong.sdp.vo.query.DevelopStyleTaskQuery;

import java.util.List;

/**
 * 开款任务Mapper
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:13
 */
public interface DevelopStyleTaskMapper extends BaseMapper<DevelopStyleTask> {
    List<DevelopStyleStateGroupDTO> selectGroupByTaskStatus(@Param("req") DevelopStyleTaskQuery req);
}
