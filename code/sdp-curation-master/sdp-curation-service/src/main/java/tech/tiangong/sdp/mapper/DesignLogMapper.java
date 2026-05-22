package tech.tiangong.sdp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import tech.tiangong.sdp.entity.DesignLog;
import tech.tiangong.sdp.vo.query.DesignLogQuery;

import java.time.LocalDateTime;
import java.util.List;


/**
* 设计打版操作日志 Mapper 接口
* <br>CreateDate August 10,2021
* @author lujunxuan
* @since 1.0
*/
@Mapper
public interface DesignLogMapper extends BaseMapper<DesignLog> {


    /**
    * 批量插入（sql拼接,性能更优）
    * @param entityList 多个数据对象
     */
    void batchInsert(List<DesignLog> entityList);

    /**
    * 通过多个主键 批量删除
    * @param keys 多个主键
     */
    void deleteByKeys(List<String> keys);

    /**
    * 查询数据列表
    * @param queryDTO 查询对象
    * @return 返回结果列表
    */
    List<DesignLog> findDataList(DesignLogQuery queryDTO);

    /**
    * 查询数据总数
    * @param queryDTO 查询对象
    * @return 返回结果数量
    */
    Integer findDataCount(DesignLogQuery queryDTO);

    /**
     * 根据创建时间查询完成设计拆板的日志
     */
    @Select("select * from design_log where biz_type = 1 and content = '完成了【设计拆版】' and created_time >= #{startTime} ORDER BY created_time")
    List<DesignLog> getDonePrototypeByTime(LocalDateTime startTime);
}