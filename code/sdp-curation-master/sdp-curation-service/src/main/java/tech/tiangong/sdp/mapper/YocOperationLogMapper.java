package tech.tiangong.sdp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import tech.tiangong.sdp.entity.YocOperationLog;

/**
 * 操作日志Mapper接口
 * <p>
 * 提供操作日志数据的数据库操作方法
 * </p>
 *
 * @author system
 * @version 1.0
 */
@Mapper
public interface YocOperationLogMapper extends BaseMapper<YocOperationLog> {

}
