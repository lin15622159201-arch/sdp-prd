package tech.tiangong.sdp.service

import tech.tiangong.sdp.common.req.picking.AiDesignPickingReq
import tech.tiangong.sdp.req.picking.ImportOldPickingDataReq
import tech.tiangong.sdp.req.picking.UltraHdTaskCallbackReq

/**
 * AI设计-选款
 * @author zjh
 * @date 2025/1/8 14:34
 */
interface AiDesignPickingService {

    /**
     * AI设计创建选款
     */
    fun createByAiDesign(req: AiDesignPickingReq): Long

    /**
     * 导入旧选款数据(导入到结果表)
     */
    fun importOldPickingData(req: ImportOldPickingDataReq)
    /**
     * 4K图任务回调
     *
     */
    fun ultraHdTaskCallback(req: UltraHdTaskCallbackReq)
}