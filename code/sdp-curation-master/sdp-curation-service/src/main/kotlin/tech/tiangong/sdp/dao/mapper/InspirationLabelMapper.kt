package tech.tiangong.sdp.dao.mapper

import com.baomidou.mybatisplus.core.mapper.BaseMapper
import org.apache.ibatis.annotations.Param
import tech.tiangong.sdp.dao.entity.InspirationLabel

/**
 * 灵感数据-标签(InspirationLabel)表数据库访问层
 *
 * @author zjh
 * @since 2024-12-02 16:34:57
 */
interface InspirationLabelMapper : BaseMapper<InspirationLabel> {

    /**
     * 根据灵感id物理删除数据
     * @param inspirationId
     */
    fun deleteByInspirationId(@Param("inspirationId") inspirationId: Long)
}

