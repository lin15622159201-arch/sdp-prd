package tech.tiangong.sdp.controller.inspiration.inner

import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import team.aikero.blade.auth.annotation.PreCheckIgnore
import team.aikero.blade.core.protocol.DataResponse
import team.aikero.blade.core.protocol.ok
import tech.tiangong.sdp.service.AiDesignTaskService

/**
 * AI设计任务内部相关接口
 * @author zjh
 * @date 2024-12-18 20:04:16
 */
@RestController
@RequestMapping("/inner/v1/ai-design-task")
@PreCheckIgnore
class AiDesignTaskInnerController(
    private val designTaskService: AiDesignTaskService,
) {

    /**
     * 修改状态
     * @param taskIdList
     * @return
     */
    @PreCheckIgnore
    @PostMapping("/update/status/by-task-ids")
    fun updateStatusByTaskIds(@Validated @RequestBody taskIdList: List<Long>): DataResponse<Unit> {
        designTaskService.updateStatusByTaskIds(taskIdList)
        return ok()
    }


}
