package tech.tiangong.sdp.dao.mapper

import com.baomidou.mybatisplus.core.mapper.BaseMapper
import com.baomidou.mybatisplus.extension.plugins.pagination.Page
import org.apache.ibatis.annotations.Param
import tech.tiangong.sdp.dao.bo.PickingStateCountBo
import tech.tiangong.sdp.dao.entity.PickingAiDesign
import tech.tiangong.sdp.req.picking.PickingStylePageReq

/**
 * 选款-AI设计(PickingAiDesign)表数据库访问层
 *
 * @author zjh
 * @since 2024-11-28 16:56:51
 */
interface PickingAiDesignMapper : BaseMapper<PickingAiDesign> {

    /**
     * 分页
     *
     * @param req
     * @return
     */
    fun selectListPage(@Param("page") page: Page<PickingAiDesign>, @Param("req") req: PickingStylePageReq): Page<PickingAiDesign>

    /**
     * 统计选款状态数量
     *
     * @param req
     * @return
     */
    fun countPickingStatus(@Param("req") req: PickingStylePageReq): List<PickingStateCountBo>

}

