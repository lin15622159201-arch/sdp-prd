package tech.tiangong.sdp.dao.mapper

import tech.tiangong.sdp.dao.entity.AiDesignTaskPicture
import com.baomidou.mybatisplus.core.mapper.BaseMapper
import org.apache.ibatis.annotations.Param

/**
 * AI设计任务-结果图(AiDesignTaskPicture)表数据库访问层
 *
 * @author zjh
 * @since 2024-11-29 11:00:24
 */
interface AiDesignTaskPictureMapper : BaseMapper<AiDesignTaskPicture> {
    /**
     * 根据任务id物理删除
     * @param taskId
     */
    fun deleteByTaskId(@Param("taskId") taskId: Long)
}

