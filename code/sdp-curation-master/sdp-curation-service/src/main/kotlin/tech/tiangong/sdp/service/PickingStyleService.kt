package tech.tiangong.sdp.service

import jakarta.servlet.http.HttpServletResponse
import org.springframework.web.multipart.MultipartFile
import team.aikero.blade.core.protocol.PageVo
import tech.tiangong.butted.common.vo.SmartDesignTaskVo
import tech.tiangong.sdp.enums.PickingDataSourceTypeEnum
import tech.tiangong.sdp.req.inspiration.callback.IdentifyCallbackReq
import tech.tiangong.sdp.req.picking.*
import tech.tiangong.sdp.resp.picking.*
import tech.tiangong.inspiration.common.req.ImageGroupProblemFeedbackSaveReq
import tech.tiangong.inspiration.common.vo.SmartDevelopStyleTaskExternalDetailVo
import tech.tiangong.sdp.common.req.picking.PatternApplyPickingReq
import tech.tiangong.sdp.common.req.picking.PickingAddReq

/**
 * 选款
 * @author zjh
 * @date 2024-11-28 16:54:25
 */
interface PickingStyleService {
    /**
     * 分页
     *
     * @param req 入参
     * @return
     */
    fun page(req: PickingStylePageReq): PageVo<PickingStylePageVo>

    /**
     * 统计选款状态数量
     *
     * @param req 查询参数（复用 PickingStylePageReq）
     * @return
     */
    fun countPickingStatus(req: PickingStylePageReq): PickingStyleCountStatusVo

    /**
     * 确认选款
     * @param req
     */
    fun confirm(req: PickingConfirmReq)
    fun batchConfirm(req: BatchPickingConfirmReq)

    fun identifyCallback(req: IdentifyCallbackReq)

    /**
     * 确认选款推MQ
     * @param req
     */
    fun confirmMq(req: PickingConfirmReq)

    fun confirmMqRefactor(req: PickingConfirmReq)

    /**
     * 选款结果 分页
     *
     * @param req 入参
     * @return
     */
    fun pageResult(req: PickingStyleResultPageReq): PageVo<PickingStyleResultPageVo>

    /**
     * 选款结果 详情
     *
     * @param pickingResultId
     * @return
     */
    fun detailResult(pickingResultId: Long): PickingStyleResultDetailVo

    /**
     * 查询选图历史记录
     *
     * @param pickingId 选款id
     * @return
     */
    fun getPickingStyleHistory(pickingId: Long): List<PickingStyleHistoryVo>

    /**
     * 导入选款
     *
     * @param file 文件
     * @return
     */
    fun importPickingStyleList(file: MultipartFile): PickingStyleImportResultVo

    /**
     * 保存选款数据
     *
     * @param businessId
     * @param dataSourceEnum
     */
    fun savePicking(businessId: Long, dataSourceEnum: PickingDataSourceTypeEnum)

    /**
     * 查询统计供给数量
     *
     * @param req
     * @return
     */
    fun getTotalSupplyQuantity(req: TotalSupplyQuantityReq): TotalSupplyQuantityResp

    /**
     * 导出修图数据
     *
     * @param response
     * @param req
     */
    fun exportPickingResults(response: HttpServletResponse, req: PickingStyleResultPageReq)
    fun exportPickingResultImage(req: PickingStyleResultPageReq): List<PickingResultImageResp>

    fun exportAIGCResults(response: HttpServletResponse, req: PickingStylePageReq)

    /**
     * 推送选款到sdp-design
     */
    fun pushPickingResult()

    /**
     * 扫描生成中的选款任务的图片4K图生成情况
     */
    fun scanFinishedHdTask()

    /**
     * 扫描生成中的选款任务的图片4K图生成情况
     */
    fun getDesignTask(taskId: Long): PickingDesignResp?

    fun problemFeedbackAdd(req: ImageGroupProblemFeedbackSaveReq)

    /**
     * 创建选款
     */
    fun createByType(req: PickingAddReq) : Long


    fun createByPatternApply(req: PatternApplyPickingReq) : Long
    fun savePickingBySmartDesignUpload(
        result: SmartDesignTaskVo,
        vo: SmartDevelopStyleTaskExternalDetailVo
    )
}
