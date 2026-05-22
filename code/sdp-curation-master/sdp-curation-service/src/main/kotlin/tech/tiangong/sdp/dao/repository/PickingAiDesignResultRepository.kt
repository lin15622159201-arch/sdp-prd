package tech.tiangong.sdp.dao.repository

import com.baomidou.mybatisplus.extension.kotlin.KtQueryWrapper
import com.baomidou.mybatisplus.extension.plugins.pagination.Page
import org.springframework.stereotype.Repository
import team.aikero.blade.data.mybatis.repository.BaseRepository
import tech.tiangong.sdp.common.enums.YesOrNoEnum
import tech.tiangong.sdp.dao.entity.PickingAiDesignResult
import tech.tiangong.sdp.dao.mapper.PickingAiDesignResultMapper
import tech.tiangong.sdp.enums.DesignSubmitStatusEnum
import tech.tiangong.sdp.req.picking.PickingStyleResultPageReq

/**
 * 选款-AI设计-选款结果(PickingAiDesignResult)表数据库访问层
 *
 * @author zjh
 * @since 2024-11-28 16:56:53
 */
@Repository
class PickingAiDesignResultRepository : BaseRepository<PickingAiDesignResultMapper, PickingAiDesignResult>() {
    /**
     * 分页
     *
     * @param req
     * @return
     */
    fun selectListPage(req: PickingStyleResultPageReq): Page<PickingAiDesignResult> {
        return baseMapper.selectListPage(Page(req.pageNum.toLong(), req.pageSize.toLong()), req)
    }


    /**
     * pickingId获取
     * @param pickingId
     * @return
     */
    fun selectListByPickingId(pickingId: Long): List<PickingAiDesignResult> {
        return list(
            KtQueryWrapper(PickingAiDesignResult::class.java)
                .eq(PickingAiDesignResult::pickingId, pickingId)
                .eq(PickingAiDesignResult::deleted, YesOrNoEnum.NO.code)
                .orderByDesc(PickingAiDesignResult::createdTime)
        )?:listOf()
    }

    fun listGenerating(): List<PickingAiDesignResult> {
        return list(
            KtQueryWrapper(PickingAiDesignResult::class.java)
                .eq(PickingAiDesignResult::designSubmitStatus, DesignSubmitStatusEnum.GENERATING.code)
                .eq(PickingAiDesignResult::deleted, YesOrNoEnum.NO.code)
                .orderByAsc(PickingAiDesignResult::createdTime)
        )
    }

    fun listAwait(): List<PickingAiDesignResult> {
        return list(
            KtQueryWrapper(PickingAiDesignResult::class.java)
                .eq(PickingAiDesignResult::designSubmitStatus, DesignSubmitStatusEnum.AWAIT.code)
                .eq(PickingAiDesignResult::deleted, YesOrNoEnum.NO.code)
                .orderByAsc(PickingAiDesignResult::createdTime)
        )
    }
}

