package tech.tiangong.sdp.dao.repository

import com.baomidou.mybatisplus.extension.kotlin.KtQueryWrapper
import org.springframework.stereotype.Repository
import team.aikero.blade.data.mybatis.repository.BaseRepository
import tech.tiangong.sdp.common.enums.YesOrNoEnum
import tech.tiangong.sdp.dao.entity.SubmitDownstreamLog
import tech.tiangong.sdp.dao.mapper.SubmitDownstreamLogMapper
import tech.tiangong.sdp.enums.SupplyModeEnum
import tech.tiangong.sdp.enums.TaskStateEnum

/**
 * 提交下游任务信息(SubmitDownstreamLog)表数据库访问层
 *
 * @author zjh
 * @since 2024-11-22 17:20:10
 */
@Repository
class SubmitDownstreamLogRepository : BaseRepository<SubmitDownstreamLogMapper, SubmitDownstreamLog>() {
    /**
     * 灵感id获取下游任务信息
     * @param inspirationId
     * @return
     */
    fun listByInspirationId(inspirationId: Long): List<SubmitDownstreamLog> {
        return this.list(
            KtQueryWrapper(SubmitDownstreamLog::class.java)
                .eq(SubmitDownstreamLog::inspirationId, inspirationId)
                .eq(SubmitDownstreamLog::deleted, YesOrNoEnum.NO.code)
                .orderByDesc(SubmitDownstreamLog::createdTime)
        )
    }

    /**
     * business获取
     * @param businessId
     * @return
     */
    fun getByBusinessId(businessId: Long): SubmitDownstreamLog? {
        return this.getOne(
            KtQueryWrapper(SubmitDownstreamLog::class.java)
                .eq(SubmitDownstreamLog::businessId, businessId)
                .eq(SubmitDownstreamLog::deleted, YesOrNoEnum.NO.code)
        )
    }

    /**
     * 下游任务id获取下游任务信息
     * @param taskIds
     * @param supplyMode
     * @param taskStateEnums
     * @return
     */
    fun getByDownstreamTaskIds(taskIds: List<Long>, supplyMode: SupplyModeEnum, taskStateEnums: List<TaskStateEnum>): List<SubmitDownstreamLog>? {
        val kt = KtQueryWrapper(SubmitDownstreamLog::class.java)
            .eq(SubmitDownstreamLog::deleted, YesOrNoEnum.NO.code)
            .eq(SubmitDownstreamLog::generationType, supplyMode.code)
            .`in`(SubmitDownstreamLog::taskStatus, taskStateEnums.map { it.code })
        if (taskIds.isNotEmpty()) {
            kt.`in`(SubmitDownstreamLog::downstreamTaskId, taskIds)

        }
        return this.list(kt)
    }
}

