package tech.tiangong.sdp.controller.inspiration

import jakarta.servlet.http.HttpServletResponse
import org.apache.commons.lang3.StringUtils
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import team.aikero.blade.core.protocol.DataResponse
import team.aikero.blade.core.protocol.PageVo
import team.aikero.blade.core.protocol.ok
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.util.json.toJson
import tech.tiangong.sdp.convert.InspirationConvert
import tech.tiangong.sdp.req.inspiration.*
import tech.tiangong.sdp.resp.inspiration.InspirationDetailResp
import tech.tiangong.sdp.resp.inspiration.InspirationImportResultVo
import tech.tiangong.sdp.resp.inspiration.InspirationPageResp
import tech.tiangong.sdp.resp.inspiration.InspirationTaskSubmitResp
import tech.tiangong.sdp.service.InspirationService

/**
 * 灵感数据源 v3.11
 * @author zjh
 * @date 2024/11/14 10:55
 */
@RestController
@RequestMapping("/web/v1/inspiration")
class InspirationController(
    private val inspirationService: InspirationService,
    private val commonExecutor: ThreadPoolTaskExecutor,
) {

    /**
     * 列表分页 v3.10.1
     * @param req 请求对象
     * @return
     */
    @PostMapping("/page")
    fun page(@Validated @RequestBody req: InspirationPageReq): DataResponse<PageVo<InspirationPageResp>> {
        return ok(inspirationService.page(req))
    }

    /**
     * 导出
     * @param req 请求对象
     * @return
     */
    @PostMapping("/export")
    fun export(response: HttpServletResponse, @Validated @RequestBody req: InspirationPageReq) {
        inspirationService.export(response, req)
    }

    /**
     * Excel导入 v3.10.1
     * @param file
     */
    @PostMapping("/import")
    fun importExcel(@RequestParam("file") file: MultipartFile): DataResponse<InspirationImportResultVo> {
        return ok(inspirationService.importExcel(file))
    }

    /**
     * 图片导入 v3.10.1
     * @param file
     */
    @PostMapping("/image/import")
    fun importImage(@Validated @RequestBody req: InspirationImportImageReq): DataResponse<Unit> {
        inspirationService.importImage(req)
        return ok()
    }

    /**
     * 详情 v3.10.1
     * @param inspirationId
     */
    @PostMapping("/detail/{inspirationId}")
    fun detail(@PathVariable inspirationId: Long): DataResponse<InspirationDetailResp> {
        return ok(inspirationService.detail(inspirationId))
    }

    /**
     * 批量查询
     * @param inspirationIds 灵感Id集合
     */
    @PostMapping("/list-by-ids")
    fun getListByIds(@RequestBody inspirationIds: List<Long>): DataResponse<List<InspirationDetailResp>> {
        return ok(inspirationService.getListByIds(inspirationIds))
    }


    /**
     * 提交任务 v3.11
     * @param req
     */
    @PostMapping("/task/submit")
    fun taskSubmit(@Validated @RequestBody req: InspirationTaskSubmitReq): DataResponse<Unit> {
        log.info { "taskSubmit req: ${req.toJson()}" }
        // 同步执行
        val requests = InspirationConvert.convert(req)
        log.info { "taskSubmit converted requests: ${requests.toJson()}" }
        if (requests.size > 1) {
            // 多个提交，品类和同步品类不要传, xn1.3需求支持
//            requests.forEach {
//                if (it.syncCategory == 1) {
//                    throw RuntimeException("同步品类不支持多个提交")
//                }
//                if (StringUtils.isNotBlank(it.categoryName) || StringUtils.isNotBlank(it.categoryCode)) {
//                    throw RuntimeException("品类不支持多个提交")
//                }
//            }
            // 异步执行
            requests.forEach {
                this.inspirationService.verifySubmit(it)
                commonExecutor.execute { inspirationService.submitInspiration(it) }
            }
        } else {
            val inspirationSubmitReq = requests.first()
            this.inspirationService.verifySubmit(inspirationSubmitReq)
            inspirationSubmitReq.single = true
            inspirationService.submitInspiration(inspirationSubmitReq)
        }
        return ok()
    }

    /**
     * 重新提交-页面回显
     * @param businessId
     */
    @PostMapping("/task/re-submit/detail/{businessId}")
    fun taskReSubmitDetail(@PathVariable businessId: Long): DataResponse<InspirationTaskSubmitResp> {
        return ok(inspirationService.taskReSubmitDetail(businessId))
    }


    /**
     * 删除 v3.10.1
     */
    @PostMapping("/remove")
    fun remove(@RequestBody inspirationIds: Set<Long>): DataResponse<Unit> {
        inspirationService.remove(inspirationIds)
        return ok()
    }

    /**
     * 重新识别
     */
    @PostMapping("/reIdentification")
    fun reIdentification(@RequestBody req: InspirationReIdentificationReq): DataResponse<Unit> {
        inspirationService.reIdentification(req.inspirationIds!!)
        return ok()
    }

    /**
     * 编辑图片
     */
    @PutMapping("/edit-image")
    fun editImage(@Validated @RequestBody req: InspirationImageEditReq): DataResponse<Unit> {
        inspirationService.editImage(req)
        return ok()
    }

    /**
     * 编辑品类
     */
    @PutMapping("/edit-category")
    fun editCategory(@Validated @RequestBody req: List<InspirationCategoryEditReq>): DataResponse<Unit> {
        inspirationService.editCategory(req)
        return ok()
    }
}