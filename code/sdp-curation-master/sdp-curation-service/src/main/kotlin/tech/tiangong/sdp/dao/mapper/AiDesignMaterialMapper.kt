package tech.tiangong.sdp.dao.mapper

import com.baomidou.mybatisplus.core.mapper.BaseMapper
import org.apache.ibatis.annotations.Param
import tech.tiangong.sdp.dao.entity.AiDesignMaterial
import tech.tiangong.sdp.dao.entity.AiDesignTaskFabric

/**
 * AI设计素材表数据库访问层
 *
 * @author     ：qinwenxuan@zj.tech
 * @date       ：2025/7/14 10:35
 * @version    :1.0
 */
interface AiDesignMaterialMapper : BaseMapper<AiDesignMaterial> {
    /**
     * 根据任务id物理删除
     * @param taskId
     */
    fun deleteByTaskId(@Param("taskId") taskId: Long)
}

