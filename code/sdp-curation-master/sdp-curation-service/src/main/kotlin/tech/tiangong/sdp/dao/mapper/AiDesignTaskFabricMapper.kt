package tech.tiangong.sdp.dao.mapper

import com.baomidou.mybatisplus.core.mapper.BaseMapper
import org.apache.ibatis.annotations.Param
import tech.tiangong.sdp.dao.entity.AiDesignTaskFabric

/**
 * AI设计任务-推荐面料(AiDesignTaskFabric)表数据库访问层
 *
 * @author zjh
 * @since 2024-11-29 11:00:23
 */
interface AiDesignTaskFabricMapper : BaseMapper<AiDesignTaskFabric> {
    /**
     * 根据任务id物理删除
     * @param taskId
     */
    fun deleteByTaskId(@Param("taskId") taskId: Long)
}

