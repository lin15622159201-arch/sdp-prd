package tech.tiangong.sdp.dao.mapper

import com.baomidou.mybatisplus.core.mapper.BaseMapper
import com.baomidou.mybatisplus.extension.plugins.pagination.Page
import org.apache.ibatis.annotations.Param
import tech.tiangong.sdp.dao.entity.PickingAiDesignResult
import tech.tiangong.sdp.req.picking.PickingStyleResultPageReq

/**
 * 选款-AI设计-选款结果(PickingAiDesignResult)表数据库访问层
 *
 * @author zjh
 * @since 2024-11-28 16:56:52
 */
interface PickingAiDesignResultMapper : BaseMapper<PickingAiDesignResult> {
    /**
     * 分页
     *
     * @param req
     * @return
     */
    fun selectListPage(@Param("page") page: Page<PickingAiDesignResult>, @Param("req") req: PickingStyleResultPageReq): Page<PickingAiDesignResult>

}

