package tech.tiangong.sdp.dao.repository

import com.baomidou.mybatisplus.extension.kotlin.KtQueryWrapper
import org.springframework.stereotype.Repository
import team.aikero.blade.data.mybatis.repository.BaseRepository
import tech.tiangong.sdp.dao.entity.AliexpressJobTime
import tech.tiangong.sdp.dao.mapper.AliexpressJobTimeMapper

/**
 * Aliexpress定时任务时间(AliexpressJobTime)表数据库访问层
 *
 * @author zjh
 * @since 2025-01-10 18:26:43
 */
@Repository
class AliexpressJobTimeRepository : BaseRepository<AliexpressJobTimeMapper, AliexpressJobTime>() {
    fun selectLastDate(): AliexpressJobTime? {
        return getOne(
            KtQueryWrapper(AliexpressJobTime::class.java)
                .orderByDesc(AliexpressJobTime::lastDate)
                .last("limit 1"), false
        )
    }
}

