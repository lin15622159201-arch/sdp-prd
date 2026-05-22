package tech.tiangong.sdp.service


/**
 * AI设计-任务
 * @author liuhongfu
 * @date 2025/1/8 14:34
 */
interface AiDesignTaskService {
    fun updateStatusByTaskIds(taskIdList: List<Long>)


}