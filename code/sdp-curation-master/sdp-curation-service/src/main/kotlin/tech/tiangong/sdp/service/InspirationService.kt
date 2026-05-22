package tech.tiangong.sdp.service

import jakarta.servlet.http.HttpServletResponse
import org.springframework.web.multipart.MultipartFile
import team.aikero.blade.core.protocol.PageVo
import tech.tiangong.sdp.common.req.AiDesignTaskCreateReq
import tech.tiangong.sdp.common.req.ExternalSubmitInspirationReq
import tech.tiangong.sdp.common.resp.GetInspirationOrPickingIdResp
import tech.tiangong.sdp.common.resp.InspirationDetailVo
import tech.tiangong.sdp.req.inspiration.InspirationCategoryEditReq
import tech.tiangong.sdp.req.inspiration.InspirationImageEditReq
import tech.tiangong.sdp.req.inspiration.InspirationImportImageReq
import tech.tiangong.sdp.req.inspiration.InspirationPageReq
import tech.tiangong.sdp.req.inspiration.InspirationSubmitReq
import tech.tiangong.sdp.resp.inspiration.InspirationDetailResp
import tech.tiangong.sdp.resp.inspiration.InspirationImportResultVo
import tech.tiangong.sdp.resp.inspiration.InspirationPageResp
import tech.tiangong.sdp.resp.inspiration.InspirationTaskSubmitResp

/**
 * 灵感源
 * @author zjh
 * @date 2024/11/20 09:55
 */
interface InspirationService {

    /**
     * 列表分页
     * @param req 请求对象
     * @return
     */
    fun page(req: InspirationPageReq): PageVo<InspirationPageResp>

    /**
     * 导出
     * @param req 请求对象
     * @return
     */
    fun export(response: HttpServletResponse, req: InspirationPageReq)

    /**
     * Excel导入
     * @param file
     */
    fun importExcel(file: MultipartFile): InspirationImportResultVo

    /**
     * 图片导入
     * @param req
     */
    fun importImage(req: InspirationImportImageReq)

    /**
     * 详情
     * @param inspirationId
     */
    fun detail(inspirationId: Long): InspirationDetailResp


    /**
     * 重新提交-页面回显
     * @param businessId
     */
    fun taskReSubmitDetail(businessId: Long): InspirationTaskSubmitResp

    /**
     * 灵感id/选款id获取相关信息
     * @param inspirationPickingId
     * @return
     */
    fun getByInspirationOrPickingId(inspirationPickingId: Long): GetInspirationOrPickingIdResp

    /**
     * 提交AI设计任务
     * @param req
     */
    fun submitAiDesignTask(req: AiDesignTaskCreateReq)
    fun remove(inspirationIds: Set<Long>)


    /**
     * 提交任务
     * @param req
     */
    fun submitInspiration(req: InspirationSubmitReq)
    fun verifySubmit(req: InspirationSubmitReq)
    fun reIdentification(inspirationIds: List<Long>)
    fun editImage(req: InspirationImageEditReq)
    fun editCategory(req: List<InspirationCategoryEditReq>)
    fun getByInspirationId(inspirationId: Long): InspirationDetailVo
    fun externalSubmitInspiration(req: ExternalSubmitInspirationReq)
    fun getListByIds(inspirationIds: List<Long>): List<InspirationDetailResp>
}