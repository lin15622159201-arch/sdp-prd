package tech.tiangong.sdp.dao.repository

import com.baomidou.mybatisplus.extension.kotlin.KtQueryWrapper
import org.springframework.stereotype.Repository
import team.aikero.blade.data.mybatis.repository.BaseRepository
import tech.tiangong.sdp.dao.entity.InspirationAidcSource
import tech.tiangong.sdp.dao.mapper.InspirationAidcSourceMapper

/**
 * 灵感数据-aidc源数据(InspirationAidcSource)表数据库访问层
 *
 * @author zjh
 * @since 2024-12-26 18:15:18
 */
@Repository
class InspirationAidcSourceRepository : BaseRepository<InspirationAidcSourceMapper, InspirationAidcSource>() {
    /**
     * 获取第三方灵感源数据
     * @param thirdInspirationIds
     * @return 已存在的第三方id
     */
    fun getThirdInspiration(thirdInspirationIds: List<String>): List<String> {
        return list(
            KtQueryWrapper(InspirationAidcSource::class.java)
                .`in`(InspirationAidcSource::thirdInspirationId, thirdInspirationIds)
                .select(InspirationAidcSource::thirdInspirationId)
        )
            .mapNotNull { it.thirdInspirationId }
            .distinct()
            .map { it }
    }

    /**
     * 获取未处理数据
     * @return
     */
    fun getByNoHandle(): List<InspirationAidcSource> {
        return list(
            KtQueryWrapper(InspirationAidcSource::class.java)
                .eq(InspirationAidcSource::handleStatus, 0)
                .orderByAsc(InspirationAidcSource::createdTime)
                .last("limit 2000")
        )
    }

    /**
     * 物理删除
     */
    fun deletePhysicalById(id: Long) {
        this.baseMapper.deletePhysicalById(id)
    }
}

