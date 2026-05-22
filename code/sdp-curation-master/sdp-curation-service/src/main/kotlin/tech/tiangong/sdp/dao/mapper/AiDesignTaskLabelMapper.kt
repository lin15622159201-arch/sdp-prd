package tech.tiangong.sdp.dao.mapper

import tech.tiangong.sdp.dao.entity.AiDesignTaskLabel
import com.baomidou.mybatisplus.core.mapper.BaseMapper
import org.apache.ibatis.annotations.Param

/**
 * AI设计任务-标签(AiDesignTaskLabel)表数据库访问层
 *
 * @author zjh
 * @since 2024-11-29 11:00:23
 */
interface AiDesignTaskLabelMapper : BaseMapper<AiDesignTaskLabel> {
    /**
     * 根据任务id物理删除
     * @param taskId
     */
    fun deleteByTaskId(@Param("taskId") taskId: Long)
}

