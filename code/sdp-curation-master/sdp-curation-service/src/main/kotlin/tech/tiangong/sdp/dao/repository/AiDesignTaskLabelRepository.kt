package tech.tiangong.sdp.dao.repository

import com.baomidou.mybatisplus.extension.kotlin.KtQueryWrapper
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import team.aikero.blade.data.mybatis.repository.BaseRepository
import team.aikero.blade.user.holder.CurrentUserHolder
import tech.tiangong.butted.common.vo.LabelValueVo
import tech.tiangong.butted.common.vo.PredLabelVo
import tech.tiangong.sdp.common.enums.YesOrNoEnum
import tech.tiangong.sdp.dao.bo.KeyValueBo
import tech.tiangong.sdp.dao.entity.AiDesignTaskLabel
import tech.tiangong.sdp.dao.mapper.AiDesignTaskLabelMapper
import tech.tiangong.sdp.common.dto.picking.LabelDto
import tech.tiangong.sdp.common.dto.picking.LabelValueDto

/**
 * AI设计任务-标签(AiDesignTaskLabel)表数据库访问层
 *
 * @author zjh
 * @since 2024-11-29 11:00:23
 */
@Repository
class AiDesignTaskLabelRepository : BaseRepository<AiDesignTaskLabelMapper, AiDesignTaskLabel>() {

    /**
     * 任务id获取标签
     * @param taskId
     * @return
     */
    fun getKvByTaskId(taskId: Long?): List<KeyValueBo> {
        if (taskId == null) {
            return emptyList()
        }
        val taskLabels = list(
            KtQueryWrapper(AiDesignTaskLabel::class.java)
                .eq(AiDesignTaskLabel::taskId, taskId)
                .eq(AiDesignTaskLabel::deleted, YesOrNoEnum.NO.code)
        )
        if (taskLabels.isEmpty()) {
            return emptyList()
        }
        return taskLabels.map {
            KeyValueBo().apply {
                key = it.labelName
                value = it.labelValueName
            }
        }
    }

    /**
     * 根据任务id物理删除
     */
    fun deleteByTaskId(taskId: Long) {
        this.baseMapper.deleteByTaskId(taskId)
    }

    /**
     * 批量写入标签
     * @param taskId
     * @param tenantId
     * @param req
     */
    @Transactional(rollbackFor = [Exception::class])
    fun insertBatchLabel(taskId: Long, req: List<PredLabelVo>) {
        val user = CurrentUserHolder.get()
        val insertDataList = mutableListOf<AiDesignTaskLabel>()
        for (vo in req) {
            val keyNode: LabelValueVo? = vo.cn
            if (keyNode?.values != null && keyNode.values!!.isNotEmpty()) {
                for (value in keyNode.values!!) {
                    val data = AiDesignTaskLabel()
                    data.taskId = taskId
                    data.labelName = keyNode.name
                    data.labelCode = keyNode.code
                    data.labelValueName = value.name
                    data.labelValueCode = value.code
                    data.tenantId = user.tenantId
                    insertDataList.add(data)
                }
            }
        }
        if (insertDataList.isNotEmpty()) {
            saveBatch(insertDataList)
        }
    }

    /**
     * 批量写入标签
     * @param taskId
     * @param tenantId
     * @param req
     */
    @Transactional(rollbackFor = [Exception::class])
    fun insertBatchLabelDto(taskId: Long, req: List<LabelDto>) {
        val user = CurrentUserHolder.get()
        val insertDataList = mutableListOf<AiDesignTaskLabel>()
        for (vo in req) {
            val keyNode: LabelValueDto? = vo.cn
            if (keyNode?.values != null && keyNode.values!!.isNotEmpty()) {
                for (value in keyNode.values!!) {
                    val data = AiDesignTaskLabel()
                    data.taskId = taskId
                    data.labelName = keyNode.name
                    data.labelCode = keyNode.code
                    data.labelValueName = value.name
                    data.labelValueCode = value.code
                    data.tenantId = user.tenantId
                    insertDataList.add(data)
                }
            }
        }
        if (insertDataList.isNotEmpty()) {
            saveBatch(insertDataList)
        }
    }
}

