package tech.tiangong.sdp.dao.mapper

import com.baomidou.mybatisplus.core.mapper.BaseMapper
import com.baomidou.mybatisplus.extension.plugins.pagination.Page
import org.apache.ibatis.annotations.Param
import tech.tiangong.sdp.dao.entity.Inspiration
import tech.tiangong.sdp.req.inspiration.InspirationPageReq

/**
 * 灵感数据(Inspiration)表数据库访问层
 *
 * @author zjh
 * @since 2024-11-22 17:19:39
 */
interface InspirationMapper : BaseMapper<Inspiration> {

    fun selectListPage(@Param("page") page: Page<Inspiration>, @Param("req") req: InspirationPageReq): Page<Inspiration>

    fun updateCreateById(
        @Param("inspirationId") inspirationId: Long,
        @Param("creatorId") creatorId: Long,
        @Param("creatorName") creatorName: String
    )

    fun cleanAndUpdateStatus(
        @Param("newInspirationId") newInspirationId: Long,
        @Param("inspirationId") inspirationId: Long
    )

}

