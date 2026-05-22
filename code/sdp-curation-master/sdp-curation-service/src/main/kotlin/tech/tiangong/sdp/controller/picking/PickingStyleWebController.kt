package tech.tiangong.sdp.controller.picking

import jakarta.servlet.http.HttpServletResponse
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import team.aikero.blade.core.protocol.DataResponse
import team.aikero.blade.core.protocol.PageVo
import team.aikero.blade.core.protocol.ok
import tech.tiangong.sdp.req.picking.*
import tech.tiangong.inspiration.common.req.ImageGroupProblemFeedbackSaveReq
import tech.tiangong.sdp.req.picking.*
import tech.tiangong.sdp.resp.picking.*
import tech.tiangong.sdp.service.PickingStyleService

/**
 * 选款 - WEB
 * @author zjh
 * @date 2024/11/28 16:50
 */
@RestController
@RequestMapping("/web/v1/picking-style")
class PickingStyleWebController(private val pickingStyleService: PickingStyleService) {
    /**
     * 选款任务分页查询 v3.10.1
     *
     * @param req 分页参数
     * @return 结果
     */
    @PostMapping("/page")
    fun page(@Validated @RequestBody req: PickingStylePageReq): DataResponse<PageVo<PickingStylePageVo>> {
        return ok(pickingStyleService.page(req))
    }

    /**
     * 查询当前版本选中/未选中数量
     *
     * @param req 查询参数（复用 PickingStylePageReq）
     * @return 当前版本选中/未选中数量统计
     * @author yanjiaming@zj.tech
     * @date 2024/8/8
     */
    @PostMapping("/count-status")
    fun countPickingStatus(@Validated @RequestBody req: PickingStylePageReq): DataResponse<PickingStyleCountStatusVo> {
        return ok(pickingStyleService.countPickingStatus(req))
    }


    /**
     * 导入选款列表外部数据
     *
     * @param file 导入的 Excel 文件
     * @return 导入结果
     */
    @PostMapping("/import")
    fun importPickingStyleList(@RequestParam("file") file: MultipartFile): DataResponse<PickingStyleImportResultVo> {
        return ok(pickingStyleService.importPickingStyleList(file))
    }

    /**
     * 确认选款 v3.10.1
     *
     * @param req 确认请求
     * @return 操作是否成功
     */
    @PostMapping("/confirm")
    fun confirmPickingStyle(@Validated @RequestBody req: PickingConfirmReq): DataResponse<Void> {
        //如生成4K图失败需要有重试机制，重试失败3次后自动推送；重试间隔：5,15,30min
        pickingStyleService.confirm(req)
        return ok()
    }

    /**
     * 批量确认选款 v4.1
     *
     * @param req 确认请求
     * @return 操作是否成功
     */
    @PostMapping("/batch-confirm")
    fun batchConfirmPickingStyle(@Validated @RequestBody req: BatchPickingConfirmReq): DataResponse<Void> {
        pickingStyleService.batchConfirm(req)
        return ok()
    }

    /**
     * 获取选图历史记录
     *
     * @param pickingId 选款id
     * @return com.zjkj.aigc.common.domian.DataResponse<java.util.List></java.util.List> < PickingStyleHistoryVo>>
     * @author yanjiaming@zj.tech
     * @date 2024/8/8
     */
    @GetMapping("/history/{pickingId}")
    fun getPickingStyleHistory(@PathVariable pickingId: Long): DataResponse<List<PickingStyleHistoryVo>> {
        return ok(pickingStyleService.getPickingStyleHistory(pickingId))
    }

    /**
     * 选款结果-分页查询 v3.10.1
     *
     * @param req 分页查询参数
     * @return 分页结果
     */
    @PostMapping("/result/page")
    fun pageResult(@Validated @RequestBody req: PickingStyleResultPageReq): DataResponse<PageVo<PickingStyleResultPageVo>> {
        return ok(pickingStyleService.pageResult(req))
    }

    /**
     * 选款结果-详情 v3.10.1
     *
     * @param pickingResultId 选款结果id
     * @return 详情
     */
    @PostMapping("/result/detail/{pickingResultId}")
    fun detailResult(@PathVariable pickingResultId: Long): DataResponse<PickingStyleResultDetailVo> {
        return ok(pickingStyleService.detailResult(pickingResultId))
    }

    /**
     * 查询供给落坑数
     *
     * @param req
     * @return
     */
    @PostMapping("/get/total/supply")
    fun getTotalSupplyQuantity(@Validated @RequestBody req: TotalSupplyQuantityReq): DataResponse<TotalSupplyQuantityResp> {
        return ok(pickingStyleService.getTotalSupplyQuantity(req))
    }

    /**
     * 导出修图数据
     *
     * @param response HTTP响应对象，用于文件下载
     * @param req 查询条件请求对象
     */
    @PostMapping("/result/export")
    fun exportPickingResults(
        response: HttpServletResponse,
        @Validated @RequestBody req: PickingStyleResultPageReq
    ) {
        pickingStyleService.exportPickingResults(response, req)
    }


    @PostMapping("/AIGC/export")
    fun exportAIGCResults(
        response: HttpServletResponse,
        @Validated @RequestBody req: PickingStylePageReq
    ) {
        pickingStyleService.exportAIGCResults(response, req)
    }

    /**
     * 获取ai任务
     */
    @GetMapping("/design-task/{taskId}")
    fun getDesignTask(@PathVariable(value = "taskId") taskId: Long): DataResponse<PickingDesignResp?> {
        return ok(pickingStyleService.getDesignTask(taskId))
    }

    /**
     * 导出选款结果图片
     */
    @PostMapping("/result/export-image")
    fun exportPickingResultImage(@Validated @RequestBody req: PickingStyleResultPageReq): DataResponse<List<PickingResultImageResp>> {
        return ok(pickingStyleService.exportPickingResultImage(req))
    }

    /**
     * 新增问题反馈
     * @param req 新增请求参数
     */
    @PostMapping("/image-group-problem-feedback/add")
    fun problemFeedbackAdd(@RequestBody @Validated req: ImageGroupProblemFeedbackSaveReq): DataResponse<Unit> {
        pickingStyleService.problemFeedbackAdd(req)
        return ok()
    }

}
