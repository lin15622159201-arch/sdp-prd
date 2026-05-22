package tech.tiangong.sdp.external

import com.zjkj.aigc.client.LogoIdentityTaskClient
import com.zjkj.aigc.common.req.LogoIdentifyTaskCreateReq
import com.zjkj.aigc.common.resp.LogoIdentifyTaskDTO
import org.springframework.stereotype.Component
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.user.holder.CurrentUserHolder
import team.aikero.blade.util.json.toJson

/**
 * 数码印花
 * @author zjh
 * @date 2024/12/2 10:36
 */
@Slf4j
@Component
class LogoIdentityTaskClientExternal(
    private val logoIdentityTaskClient: LogoIdentityTaskClient,
) {

    /**
     * 创建
     * @param req
     * @return
     */
    fun create(req: LogoIdentifyTaskCreateReq): Long? {

        try {
            log.info { "数码印花-创建 请求参数: ${req.toJson()}" }
            val dataResponse = logoIdentityTaskClient.create(req)
            log.info { "数码印花-创建 响应结果: ${dataResponse.toJson()}" }
            if (!dataResponse.isSuccessful) {
                throw RuntimeException(dataResponse.message)
            }
            return dataResponse.data
        } catch (e: Exception) {
            log.error {
                "数码印花-创建 失败 errMessage: ${e.stackTraceToString()}"
            }
            throw e
        }
    }

    /**
     * 创建
     * @param req
     * @return
     */
    fun queryByTaskId(taskId: Long): LogoIdentifyTaskDTO? {
        val user = CurrentUserHolder.get()

        try {
            log.info { "数码印花-查询 请求参数: $taskId" }
            val dataResponse = logoIdentityTaskClient.queryByTaskId(taskId)
            log.info { "数码印花-查询 响应结果: ${dataResponse.toJson()}" }
            if (!dataResponse.isSuccessful) {
                throw RuntimeException(dataResponse.message)
            }
            return dataResponse.data
        } catch (e: Exception) {
            log.error {
                "数码印花-查询 失败 errMessage: ${e.stackTraceToString()}"
            }
            throw e
        }
    }

}