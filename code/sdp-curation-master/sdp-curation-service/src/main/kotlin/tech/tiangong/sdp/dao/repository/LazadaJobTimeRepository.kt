package tech.tiangong.sdp.dao.repository

import com.baomidou.mybatisplus.extension.kotlin.KtQueryWrapper
import org.springframework.stereotype.Repository
import team.aikero.blade.data.mybatis.repository.BaseRepository
import tech.tiangong.pop.common.enums.YesOrNoEnum
import tech.tiangong.sdp.dao.entity.LazadaJobTime
import tech.tiangong.sdp.dao.mapper.LazadaJobTimeMapper

/**
 * Lazada定时任务时间(LazadaJobTime)表数据库访问层
 *
 * @author zjh
 * @since 2024-12-16 16:25:35
 */
@Repository
class LazadaJobTimeRepository : BaseRepository<LazadaJobTimeMapper, LazadaJobTime>() {

    fun selectLastByCountryCode(countryCode: String): LazadaJobTime? {
        return getOne(
            KtQueryWrapper(LazadaJobTime::class.java)
                .eq(LazadaJobTime::countrySiteCode, countryCode)
                .eq(LazadaJobTime::deleted, YesOrNoEnum.NO.code)
                .orderByDesc(LazadaJobTime::createdTime)
                .last("limit 1"), false
        )
    }
}

