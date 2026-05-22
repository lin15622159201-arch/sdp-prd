package tech.tiangong.sdp.dao.repository

import com.baomidou.mybatisplus.extension.kotlin.KtQueryWrapper
import org.springframework.stereotype.Repository
import team.aikero.blade.data.mybatis.repository.BaseRepository
import tech.tiangong.sdp.common.enums.YesOrNoEnum
import tech.tiangong.sdp.dao.entity.AiDesignTaskFabric
import tech.tiangong.sdp.dao.mapper.AiDesignTaskFabricMapper
import tech.tiangong.sdp.resp.picking.PickingStyleResultDetailVo.RecommendFabricDetail

/**
 * AI设计任务-推荐面料(AiDesignTaskFabric)表数据库访问层
 *
 * @author zjh
 * @since 2024-11-29 11:00:23
 */
@Repository
class AiDesignTaskFabricRepository : BaseRepository<AiDesignTaskFabricMapper, AiDesignTaskFabric>() {
    fun selectByTaskId(taskId: Long?): List<AiDesignTaskFabric> {
        return list(
            KtQueryWrapper(AiDesignTaskFabric::class.java)
                .eq(AiDesignTaskFabric::taskId, taskId)
                .eq(AiDesignTaskFabric::deleted, YesOrNoEnum.NO.code)
        )
    }

    /**
     * 任务id获取标签面料
     * @param taskId
     * @return
     */
    fun getRecommendFabricDetailByTaskId(taskId: Long?): List<RecommendFabricDetail> {
        if (taskId == null) {
            return emptyList()
        }
        val fabrics = list(
            KtQueryWrapper(AiDesignTaskFabric::class.java)
                .eq(AiDesignTaskFabric::taskId, taskId)
                .eq(AiDesignTaskFabric::deleted, YesOrNoEnum.NO.code)
        )
        if (fabrics.isEmpty()) {
            return emptyList()
        }
        return fabrics.map {
            RecommendFabricDetail().apply {
                sourceCommodityId = it.sourceCommodityId
                commodityId = it.commodityId
                commodityCode = it.commodityCode
                commodityName = it.commodityName
                commodityPicture = it.commodityPicture
                colorPicture = it.colorPicture
                skuId = it.skuId
                skuCode = it.skuCode
                colorCode = it.colorCode
                rgb = it.rgb
            }
        }
    }

    /**
     * 根据任务id物理删除
     */
    fun deleteByTaskId(taskId: Long) {
        this.baseMapper.deleteByTaskId(taskId)
    }
}

