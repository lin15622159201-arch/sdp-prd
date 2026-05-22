package tech.tiangong.sdp.dao.mapper

import com.baomidou.mybatisplus.core.mapper.BaseMapper
import org.apache.ibatis.annotations.Param
import tech.tiangong.sdp.dao.entity.InspirationAidcSource

/**
 * 灵感数据-aidc源数据(InspirationAidcSource)表数据库访问层
 *
 * @author zjh
 * @since 2024-12-26 18:15:17
 */
interface InspirationAidcSourceMapper : BaseMapper<InspirationAidcSource> {

    fun deletePhysicalById(@Param("inspirationId") inspirationId: Long)
}

