package tech.tiangong.sdp.dao.repository

import com.baomidou.mybatisplus.extension.kotlin.KtQueryWrapper
import org.springframework.stereotype.Repository
import team.aikero.blade.data.mybatis.repository.BaseRepository
import tech.tiangong.sdp.common.enums.YesOrNoEnum
import tech.tiangong.sdp.dao.entity.PickingAiDesignStyle
import tech.tiangong.sdp.dao.mapper.PickingAiDesignStyleMapper
import tech.tiangong.sdp.enums.PickingStateEnum
import tech.tiangong.sdp.req.picking.TotalSupplyQuantityReq
import java.time.LocalDate
import java.util.*

/**
 * 选款-AI设计款式(PickingAiDesignStyle)表数据库访问层
 *
 * @author zjh
 * @since 2024-11-28 16:56:53
 */
@Repository
class PickingAiDesignStyleRepository : BaseRepository<PickingAiDesignStyleMapper, PickingAiDesignStyle>() {
    /**
     * 通过picking_id获取
     *
     * @param pickingIds
     * @param pickingState
     * @return
     */
    fun selectByPickingIds(pickingIds: List<Long>, pickingState: Int?): List<PickingAiDesignStyle> {
        val kq = KtQueryWrapper(PickingAiDesignStyle::class.java)
            .`in`(PickingAiDesignStyle::pickingId, pickingIds)
            .eq(PickingAiDesignStyle::deleted, YesOrNoEnum.NO.code)
        // 如果状态是可选/不可选
//        if (Objects.equals(PickingStateEnum.AVAILABLE.state, pickingState) || Objects.equals(PickingStateEnum.NOT_SELECTED.state, pickingState)) {
        if (null != pickingState && PickingStateEnum.WHOLE.state != pickingState) {
            kq.eq(PickingAiDesignStyle::pickingState, pickingState)
        }
        return list(kq)
    }

    /**
     * 查询统计供给数量
     * @param req
     * @return
     */
    fun getTotalQuantity(req: TotalSupplyQuantityReq): Long {
        val monthDayStarTime = LocalDate.now().withDayOfMonth(1).atStartOfDay()
        val monthDayEndTime = LocalDate.now().withDayOfMonth(1).plusMonths(1).atStartOfDay()
        return count(
            KtQueryWrapper(PickingAiDesignStyle::class.java)
                .eq(PickingAiDesignStyle::suggestedCategoryCode, req.categoryCode)
                .eq(PickingAiDesignStyle::suggestedShopId, req.shopId)
                .eq(PickingAiDesignStyle::pickingState, PickingStateEnum.AVAILABLE.state)
                .between(PickingAiDesignStyle::createdTime, monthDayStarTime, monthDayEndTime)
                .eq(PickingAiDesignStyle::deleted, YesOrNoEnum.NO.code)
        )
    }

    fun selectByPickingId(pickingId: Long): List<PickingAiDesignStyle> {
        return list(
            KtQueryWrapper(PickingAiDesignStyle::class.java)
                .`in`(PickingAiDesignStyle::pickingId, pickingId)
                .eq(PickingAiDesignStyle::deleted, YesOrNoEnum.NO.code)
        )
    }

    fun selectByPickingIdAndSort(pickingId: Long, sort: Int): PickingAiDesignStyle? {
        return list(
            KtQueryWrapper(PickingAiDesignStyle::class.java)
                .`in`(PickingAiDesignStyle::pickingId, pickingId)
                .eq(PickingAiDesignStyle::sort, sort)
                .eq(PickingAiDesignStyle::deleted, YesOrNoEnum.NO.code)
        ).firstOrNull()
    }
}

