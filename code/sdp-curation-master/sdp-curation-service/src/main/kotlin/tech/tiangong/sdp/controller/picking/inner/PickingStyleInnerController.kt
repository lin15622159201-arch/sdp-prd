package tech.tiangong.sdp.controller.picking.inner

import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import team.aikero.blade.auth.annotation.PreCheckIgnore
import team.aikero.blade.auth.withUser
import team.aikero.blade.core.exception.BusinessException
import team.aikero.blade.core.protocol.DataResponse
import team.aikero.blade.core.protocol.ok
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.user.entity.CurrentUser
import team.aikero.blade.util.json.toJson
import tech.tiangong.sdp.common.req.picking.AiDesignPickingReq
import tech.tiangong.sdp.common.req.picking.PatternApplyPickingReq
import tech.tiangong.sdp.common.req.picking.PickingAddReq
import tech.tiangong.sdp.req.picking.ImportOldPickingDataReq
import tech.tiangong.sdp.req.picking.UltraHdTaskCallbackReq
import tech.tiangong.sdp.service.AiDesignPickingService
import tech.tiangong.sdp.service.PickingStyleService
import java.util.concurrent.Callable

/**
 * 选款相关内部接口
 * @author zjh
 * @date 2025/1/8 16:14
 */
@RestController
@RequestMapping("/inner/v1/picking")
@PreCheckIgnore
class PickingStyleInnerController(
    private val aiDesignPickingService: AiDesignPickingService,
    private val pickingStyleService: PickingStyleService,

    ) {

    /**
     * AI设计创建选款
     *
     * @param req
     * @return
     */
    @PostMapping("/aigc/create")
    fun createByAiDesign(@Validated @RequestBody req: AiDesignPickingReq): DataResponse<Long> {
        if (req.creatorId == null || req.creatorName == null || req.tenantId == null) {
            throw BusinessException("创建人信息不能为空")
        }
        val user = CurrentUser(req.creatorId!!, req.creatorName!!, "", req.tenantId!!, false)
        val id: Long = withUser(user, Callable { aiDesignPickingService.createByAiDesign(req) });
        return ok(id)
    }


    /**
     * AI设计创建选款
     * -通过灵感或者款式管理创建
     *
     * @param req
     * @return
     */
    @PreCheckIgnore
    @PostMapping("/aigc/create-by-type")
    fun createByType(@Validated @RequestBody req: PickingAddReq): DataResponse<Long> {
        if (req.creatorId == null || req.creatorName == null || req.tenantId == null) {
            throw BusinessException("创建人信息不能为空")
        }
        val user = CurrentUser(req.creatorId!!, req.creatorName!!, "", req.tenantId!!, false)
        val id: Long = withUser(user, Callable { pickingStyleService.createByType(req) });
        return ok(id)
    }


    /**
     * 花型上新任务创建
     */
    @PostMapping("/aigc/pattern-apply/create")
    fun createFromPatternApply(@Validated @RequestBody req: PatternApplyPickingReq): DataResponse<Long> {
        if (req.creatorId == null || req.creatorName == null || req.tenantId == null) {
            throw BusinessException("创建人信息不能为空")
        }
        val id: Long = withUser(
            CurrentUser(req.creatorId!!, req.creatorName!!, "", req.tenantId!!, false),
            Callable { pickingStyleService.createByPatternApply(req) }
        )
        return ok(id)
    }

    /**
     * 导入旧选款数据(导入到结果表)
     *
     * @param req
     * @return
     */
    @PostMapping("/old/import")
    fun importOldPickingData(@Validated @RequestBody req: ImportOldPickingDataReq): DataResponse<Unit> {
        aiDesignPickingService.importOldPickingData(req)
        return ok()
    }

    /**
     * 4K图任务回调 v3.11
     */
    @PostMapping("/callback/ultra-hd-task")
    fun ultraHdTaskCallback(@Validated @RequestBody req: UltraHdTaskCallbackReq): DataResponse<Unit> {
        log.info { "ultraHdTaskCallback req=${req.toJson()}" }
        aiDesignPickingService.ultraHdTaskCallback(req)
        return ok()
    }
}