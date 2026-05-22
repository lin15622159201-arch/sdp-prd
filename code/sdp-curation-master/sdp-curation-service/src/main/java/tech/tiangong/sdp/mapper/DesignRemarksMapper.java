package tech.tiangong.sdp.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import tech.tiangong.sdp.entity.DesignRemarks;
import tech.tiangong.sdp.vo.query.DesignRemarksQuery;

import java.util.List;


/**
* 设计打版备注信息 Mapper 接口
* <br>CreateDate August 10,2021
* @author lujunxuan
* @since 1.0
*/
@Mapper
public interface DesignRemarksMapper extends BaseMapper<DesignRemarks> {


    /**
    * 批量插入（sql拼接,性能更优）
    * @param entityList 多个数据对象
    * @return 返回结果列表
    */
    void batchInsert(List<DesignRemarks> entityList);

    /**
    * 通过多个主键 批量删除
    * @param keys 多个主键
    * @return 返回结果列表
    */
    void deleteByKeys(List<String> keys);

    /**
    * 查询数据列表
    * @param queryDTO 查询对象
    * @return 返回结果列表
    */
    List<DesignRemarks> findDataList(DesignRemarksQuery queryDTO);

    /**
    * 查询数据总数
    * @param queryDTO 查询对象
    * @return 返回结果数量
    */
    Integer findDataCount(DesignRemarksQuery queryDTO);
}