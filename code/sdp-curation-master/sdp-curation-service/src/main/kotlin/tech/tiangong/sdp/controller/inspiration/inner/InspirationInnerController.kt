package tech.tiangong.sdp.controller.inspiration.inner

import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import team.aikero.blade.auth.annotation.PreCheckIgnore
import team.aikero.blade.auth.withSystemUser
import team.aikero.blade.auth.withUser
import team.aikero.blade.core.exception.BusinessException
import team.aikero.blade.core.protocol.DataResponse
import team.aikero.blade.core.protocol.ok
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.user.entity.CurrentUser
import team.aikero.blade.util.json.toJson
import tech.tiangong.sdp.common.req.AiDesignTaskCreateReq
import tech.tiangong.sdp.common.req.ExternalSubmitInspirationReq
import tech.tiangong.sdp.common.req.ProductOnlineNoticeReq
import tech.tiangong.sdp.common.resp.GetInspirationOrPickingIdResp
import tech.tiangong.sdp.common.resp.InspirationDetailVo
import tech.tiangong.sdp.service.InspirationService
import tech.tiangong.sdp.service.LazadaService
import java.util.concurrent.Callable

/**
 * 灵感相关内部接口
 * @author zjh
 * @date 2024-12-18 20:04:16
 */
@RestController
@RequestMapping("/inner/v1/inspiration")
@PreCheckIgnore
class InspirationInnerController(
    private val lazadaService: LazadaService,
    private val inspirationService: InspirationService,
) {
    /**
     * 商品上架通知
     * @param req
     * @return
     */
    @PostMapping("/notice/product/online")
    fun productOnlineNotice(@RequestBody req: ProductOnlineNoticeReq): DataResponse<Unit> {
        withSystemUser {
            lazadaService.pushAidcOnline(req.inspireSourceId, req.onlineSaleItemId)
        }
        return ok()
    }

    /**
     * 灵感id/选款id获取相关信息
     * @param inspirationPickingId
     * @return
     */
    @PostMapping("/get/inspirationOrPicking/{inspirationPickingId}")
    fun getByInspirationOrPickingId(@PathVariable("inspirationPickingId") inspirationPickingId: Long): DataResponse<GetInspirationOrPickingIdResp> {
        var resp = GetInspirationOrPickingIdResp()
        withSystemUser {
            resp = inspirationService.getByInspirationOrPickingId(inspirationPickingId)
        }
        return ok(resp)
    }

    /**
     * 灵感id
     * @param inspirationId
     * @return
     */
    @PostMapping("/get/inspiration/{inspirationId}")
    fun getByInspirationId(@PathVariable("inspirationId") inspirationId: Long): DataResponse<InspirationDetailVo> {
        var resp = InspirationDetailVo()
        withSystemUser {
            resp = inspirationService.getByInspirationId(inspirationId)
        }
        return ok(resp)
    }


    /**
     * 提交AI设计任务
     * @param req
     */
    @PostMapping("/task/submit")
    fun submitAiDesignTask(@Validated @RequestBody req: AiDesignTaskCreateReq): DataResponse<Unit> {
        log.info { "提交AI设计任务 req=${req.toJson()}" }
        val currentUser = CurrentUser(
            id = req.creatorId,
            name = req.creatorName,
            code = "",
            tenantId = req.tenantId
        )
        withUser(currentUser) {
            inspirationService.submitAiDesignTask(req)
        }
        return ok()
    }

    /**
     *
     * 外部更新灵感信息
     * 供给方式选了虚拟换衣、姿势裂变回调
     * @param req
     */
    @PostMapping("/external/submit-inspiration")
    fun externalSubmitInspiration(@Validated @RequestBody req: ExternalSubmitInspirationReq): DataResponse<Unit> {
        log.info { "灵感任务回调 req=${req.toJson()}" }
        if (req.creatorId == null || req.creatorName == null || req.tenantId == null) {
            throw BusinessException("创建人信息不能为空")
        }
        val user = CurrentUser(req.creatorId!!, req.creatorName!!, "", req.tenantId!!, false)
        withUser(user, Callable { inspirationService.externalSubmitInspiration(req) });
        return ok()
    }

}
