package tech.tiangong.sdp.service.impl

import com.baomidou.mybatisplus.core.toolkit.Assert
import org.springframework.stereotype.Service
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.util.json.toJson
import tech.tiangong.butted.common.enums.TaskStatusEnum
import tech.tiangong.sdp.dao.repository.*
import tech.tiangong.sdp.service.AiDesignTaskService

/**
 * AI设计
 * @author liuhongfu
 * @date 2024/11/20 09:55
 */
@Service
@Slf4j
class AiDesignTaskServiceImpl(
    private val designTaskRepository: AiDesignTaskRepository,
    ) : AiDesignTaskService {

    override fun updateStatusByTaskIds(taskIdList: List<Long>) {
        log.info { "需要修改的AI设计任务id${taskIdList.toJson()}" }
        Assert.notEmpty(taskIdList, "任务ID不能为空")
        var list = designTaskRepository.getByBusIds(taskIdList)
        list.forEach {
            it.taskStatus = TaskStatusEnum.COMPLETED.code
        }
        designTaskRepository.updateBatchById(list)
    }


}