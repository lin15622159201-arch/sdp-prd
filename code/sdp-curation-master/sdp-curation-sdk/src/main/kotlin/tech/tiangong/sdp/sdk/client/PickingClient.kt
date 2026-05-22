package tech.tiangong.sdp.sdk.client

import org.springframework.cloud.openfeign.FeignClient
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import team.aikero.blade.core.annotation.feign.InnerFeign
import team.aikero.blade.core.protocol.DataResponse
import tech.tiangong.sdp.common.constant.Constant
import tech.tiangong.sdp.common.req.picking.AiDesignPickingReq
import tech.tiangong.sdp.common.req.picking.PatternApplyPickingReq
import tech.tiangong.sdp.common.req.picking.PickingAddReq

/**
 * 选款相关接口
 * @author zjh
 * @date 2025-1-8 16:20:34
 */
@FeignClient(
    value = Constant.APPLICATION_NAME,
    url = "\${tech.sdp-curation}",
    contextId = "PickingClient"
)
@InnerFeign
interface PickingClient {

    companion object {
        const val PATH = "${Constant.CONTEXT_PATH}/inner/v1/picking"
    }

    /**
     * AI设计创建选款
     *
     * @param req
     * @return 选款id
     */
    @PostMapping("$PATH/aigc/create")
    fun createByAiDesign(@Validated @RequestBody req: AiDesignPickingReq): DataResponse<Long>

    /**
     * AI设计创建选款-姿势裂变
     * @param req
     * @return 选款id
     */
    @PostMapping("$PATH/aigc/create-by-type")
    fun createByType(@Validated @RequestBody req: PickingAddReq): DataResponse<Long>


    /**
     * 花型上新任务创建
     */
    @PostMapping("$PATH/aigc/pattern-apply/create")
    fun createFromPatternApply(@Validated @RequestBody req: PatternApplyPickingReq): DataResponse<Long>
}