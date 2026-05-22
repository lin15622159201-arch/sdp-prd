package tech.tiangong.sdp.dao.repository

import com.baomidou.mybatisplus.extension.kotlin.KtQueryWrapper
import com.baomidou.mybatisplus.extension.plugins.pagination.Page
import org.apache.commons.lang3.StringUtils
import org.springframework.stereotype.Repository
import team.aikero.blade.data.mybatis.repository.BaseRepository
import tech.tiangong.sdp.common.enums.YesOrNoEnum
import tech.tiangong.sdp.dao.entity.Inspiration
import tech.tiangong.sdp.dao.mapper.InspirationMapper
import tech.tiangong.sdp.enums.InspirationDataSourceTypeEnum
import tech.tiangong.sdp.req.inspiration.InspirationPageReq

/**
 * 灵感数据(Inspiration)表数据库访问层
 *
 * @author zjh
 * @since 2024-11-22 17:19:40
 */
@Repository
class InspirationRepository : BaseRepository<InspirationMapper, Inspiration>() {
    /**
     * 列表分页
     *
     * @param req
     * @return
     */
    fun listPage(req: InspirationPageReq): Page<Inspiration> {
        if (StringUtils.isNotBlank(req.dataSourceCode)) {
            req.dataSourceCode = req.dataSourceCode?.let { InspirationDataSourceTypeEnum.getByCode(it)?.content }
        }
        return baseMapper.selectListPage(Page(req.pageNum.toLong(), req.pageSize.toLong()), req)
    }

    /**
     * 第三方灵感id查询
     *
     * @param thirdInspirationId
     */
    fun getThirdInspirationId(thirdInspirationId: Long): List<Inspiration> {
        return list(
            KtQueryWrapper(Inspiration::class.java)
                .eq(Inspiration::thirdInspirationId, thirdInspirationId)
                .eq(Inspiration::deleted, YesOrNoEnum.NO.code)
        )
    }

    /**
     * 获取第三方灵感源数据
     * @param thirdInspirationIds
     * @return 已存在的第三方id
     */
    fun getThirdInspiration(thirdInspirationIds: List<String>): List<String> {
        return list(
            KtQueryWrapper(Inspiration::class.java)
                .`in`(Inspiration::thirdInspirationId, thirdInspirationIds)
                .select(Inspiration::thirdInspirationId)
        )
            .mapNotNull { it.thirdInspirationId }
            .distinct()
            .map { it }
    }

    /**
     * 获取第三方灵感源数据
     * @param thirdInspirationIds
     * @return
     */
    fun getThirdInspirationList(thirdInspirationIds: List<String>): List<Inspiration> {
        return list(
            KtQueryWrapper(Inspiration::class.java)
                .`in`(Inspiration::thirdInspirationId, thirdInspirationIds)
        )
    }

    /**
     * 获取第三方灵感源数据
     * @param thirdInspirationId
     * @return 数量
     */
    fun getThirdInspiration(thirdInspirationId: String): Long {
        return count(
            KtQueryWrapper(Inspiration::class.java)
                .eq(Inspiration::thirdInspirationId, thirdInspirationId)
        )
    }

    fun cleanAndUpdateStatus(newInspirationId : Long,inspirationId: Long) {
        return baseMapper.cleanAndUpdateStatus(newInspirationId,inspirationId);
    }
}

