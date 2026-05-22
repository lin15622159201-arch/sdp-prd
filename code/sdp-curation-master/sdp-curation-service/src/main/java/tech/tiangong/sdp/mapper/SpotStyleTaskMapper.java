package tech.tiangong.sdp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.ibatis.annotations.Param;
import tech.tiangong.sdp.entity.SpotStyleTask;
import tech.tiangong.sdp.vo.query.SpotStyleTaskQuery;

/**
 * 现货款表Mapper
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 15:13
 */
public interface SpotStyleTaskMapper extends BaseMapper<SpotStyleTask> {
    Page<SpotStyleTask> page(@Param("page") Page<SpotStyleTask> page, @Param("req") SpotStyleTaskQuery req);
}
