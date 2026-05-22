package tech.tiangong.sdp.dao.repository

import com.baomidou.mybatisplus.extension.kotlin.KtQueryWrapper
import org.springframework.stereotype.Repository
import team.aikero.blade.core.enums.Bool
import team.aikero.blade.data.mybatis.repository.BaseRepository
import tech.tiangong.sdp.common.enums.YesOrNoEnum
import tech.tiangong.sdp.dao.entity.AiDesignTask
import tech.tiangong.sdp.dao.mapper.AiDesignTaskMapper

/**
 * AI设计任务(AiDesignTask)表数据库访问层
 *
 * @author zjh
 * @since 2024-11-29 11:00:23
 */
@Repository
class AiDesignTaskRepository : BaseRepository<AiDesignTaskMapper, AiDesignTask>() {

    /**
     * business获取
     */
    fun getByBusinessId(businessId: Long): AiDesignTask? {
        return this.getOne(
            KtQueryWrapper(AiDesignTask::class.java)
                .eq(AiDesignTask::busId, businessId)
                .eq(AiDesignTask::deleted, YesOrNoEnum.NO.code)
        )
    }

    fun getByBusIds(busIds: List<Long>): List<AiDesignTask> {
        if (busIds == null) {
            return emptyList()
        }
        return list(
            KtQueryWrapper(AiDesignTask::class.java)
                .`in`(AiDesignTask::busId, busIds)
                .eq(AiDesignTask::deleted, YesOrNoEnum.NO.code)
        )
    }

    fun getByInspirationId(inspirationId: Long): AiDesignTask? =
        ktQuery()
            .eq(AiDesignTask::inspirationId, inspirationId)
            .eq(AiDesignTask::deleted, Bool.NO.code)
            .orderByDesc(AiDesignTask::createdTime)
            .last(" LIMIT 1")
            .one()
}

