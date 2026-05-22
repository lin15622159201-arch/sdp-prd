package tech.tiangong.sdp.dao.repository

import com.baomidou.mybatisplus.extension.kotlin.KtQueryWrapper
import com.baomidou.mybatisplus.extension.plugins.pagination.Page
import org.springframework.stereotype.Repository
import team.aikero.blade.core.enums.Bool
import team.aikero.blade.data.mybatis.repository.BaseRepository
import tech.tiangong.sdp.dao.bo.PickingStateCountBo
import tech.tiangong.sdp.dao.entity.PickingAiDesign
import tech.tiangong.sdp.dao.mapper.PickingAiDesignMapper
import tech.tiangong.sdp.req.picking.PickingStylePageReq

/**
 * 选款-AI设计(PickingAiDesign)表数据库访问层
 *
 * @author zjh
 * @since 2024-11-28 16:56:51
 */
@Repository
class PickingAiDesignRepository : BaseRepository<PickingAiDesignMapper, PickingAiDesign>() {

    /**
     * 分页
     *
     * @param req
     * @return
     */
    fun selectListPage(req: PickingStylePageReq): Page<PickingAiDesign> {
        return baseMapper.selectListPage(Page(req.pageNum.toLong(), req.pageSize.toLong()), req)
    }

    /**
     * 统计选款状态数量
     *
     * @param req
     * @return
     */
    fun countPickingStatus(req: PickingStylePageReq): List<PickingStateCountBo> {
        return baseMapper.countPickingStatus(req)
    }

    fun listByDesignTaskCode(designTaskCode: String): List<PickingAiDesign> {
        return this.list(
            KtQueryWrapper(PickingAiDesign::class.java)
                .eq(PickingAiDesign::deleted, Bool.NO.code)
                .eq(PickingAiDesign::designTaskCode, designTaskCode)
        )
    }

    fun listByDesignTaskCodeAndOrigin(designTaskCode: String,origin: String): List<PickingAiDesign> {
        return this.list(
            KtQueryWrapper(PickingAiDesign::class.java)
                .eq(PickingAiDesign::deleted, Bool.NO.code)
                .eq(PickingAiDesign::designTaskCode, designTaskCode)
                .eq(PickingAiDesign::origin, origin)
        )
    }
}

