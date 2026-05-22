package tech.tiangong.sdp.dao.repository

import com.baomidou.mybatisplus.extension.kotlin.KtQueryWrapper
import tech.tiangong.butted.common.vo.LabelValueVo
import tech.tiangong.butted.common.vo.PredLabelVo
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional
import team.aikero.blade.core.toolkit.isNotNull
import team.aikero.blade.data.mybatis.repository.BaseRepository
import tech.tiangong.sdp.common.enums.YesOrNoEnum
import tech.tiangong.sdp.dao.entity.InspirationLabel
import tech.tiangong.sdp.dao.mapper.InspirationLabelMapper

/**
 * 灵感数据-标签(InspirationLabel)表数据库访问层
 *
 * @author zjh
 * @since 2024-12-02 16:34:58
 */
@Repository
class InspirationLabelRepository : BaseRepository<InspirationLabelMapper, InspirationLabel>() {
    /**
     * 根据灵感id物理删除数据
     */
    fun deleteByInspirationId(inspirationId: Long?) {
        if (inspirationId == null) {
            return
        }
        return baseMapper.deleteByInspirationId(inspirationId)
    }

    /**
     * 批量写入标签
     * @param inspirationId
     * @param identifiedId
     * @param tenantId
     * @param req
     */
    @Transactional(rollbackFor = [Exception::class])
    fun insertBatchLabel(inspirationId: Long, identifiedId: Long, tenantId: Long, req: List<PredLabelVo>) {
        val insertDataList = mutableListOf<InspirationLabel>()
        for (vo in req) {
            val keyNode: LabelValueVo? = vo.cn
            if (keyNode?.values != null && keyNode.values!!.isNotEmpty()) {
                for (value in keyNode.values!!) {
                    val data = InspirationLabel()
                    data.inspirationId = inspirationId
                    data.identifiedId = identifiedId
                    data.labelName = keyNode.name
                    data.labelCode = keyNode.code
                    data.labelValueName = value.name
                    data.labelValueCode = value.code
                    data.tenantId = tenantId
                    data.deleted = YesOrNoEnum.NO.code
                    insertDataList.add(data)
                }
            }
        }
        if (insertDataList.isNotEmpty()) {
            saveBatch(insertDataList)
        }
    }

    /**
     * 通过灵感id获取标签
     * @param inspirationId
     * @return
     */
    fun getLabelByInspirationId(inspirationId: Long): List<InspirationLabel> {
        return list(
            KtQueryWrapper(InspirationLabel::class.java)
                .eq(InspirationLabel::inspirationId, inspirationId)
                .eq(InspirationLabel::deleted, YesOrNoEnum.NO.code)
                .orderByAsc(InspirationLabel::labelName, InspirationLabel::labelValueName)
        )
    }

    /**
     * 通过灵感ids获取标签
     * @param inspirationId
     * @return
     */
    fun getLabelsByInspirationIds(inspirationIds: List<Long>): Map<Long, List<InspirationLabel>> {
        val list = list(
            KtQueryWrapper(InspirationLabel::class.java)
                .`in`(InspirationLabel::inspirationId, inspirationIds)
                .eq(InspirationLabel::deleted, YesOrNoEnum.NO.code)
                .orderByAsc(InspirationLabel::labelName, InspirationLabel::labelValueName)
        )
        if (list.isEmpty()) {
            return emptyMap()
        }
        return list.filter { it.inspirationId.isNotNull() }.groupBy { it.inspirationId!! }
    }
}

