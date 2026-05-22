package tech.tiangong.sdp.external

import org.springframework.cloud.openfeign.FeignClient
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import team.aikero.blade.core.protocol.DataResponse
import tech.tiangong.inspiration.common.vo.SmartDevelopStyleTaskExternalDetailVo
import tech.tiangong.sdp.req.InspirationDesignReq
import tech.tiangong.sdp.resp.InspirationDesignCreateResult
import tech.tiangong.sdp.resp.SmartDevelopPromiseTag

/**
 * 灵感设计Client
 */
@FeignClient(
    contextId = "inspirationDesignClient",
    value = "inspiration-service",
    url = "\${domain.nest-api}",
    path = "/inspiration/inner/inspiration/design",
)
interface InspirationDesignClient {
    /**
     * 创建
     * @param req InspirationDesignReq
     */
    @PostMapping(value = ["/create"])
    fun create(@Validated @RequestBody req: InspirationDesignReq): DataResponse<InspirationDesignCreateResult>



    /**
     * 获取智能设计任务履约标签
     * @param taskIdList 智能设计任务ID列表
     */
    @PostMapping(value = ["/promise-tag/list"])
    fun listSmartDevelopPromiseTag(@Validated @RequestBody taskIdList: List<Long>): DataResponse<List<SmartDevelopPromiseTag>>


    /**
     * 根据ID查询智能开款详情
     * @param taskId 任务ID
     * @return SmartDevelopStyleTaskExternalDetailVo
     */
    @PostMapping("/detail/by/id/{taskId}")
    fun detail(@PathVariable("taskId") taskId: Long): DataResponse<SmartDevelopStyleTaskExternalDetailVo>
}