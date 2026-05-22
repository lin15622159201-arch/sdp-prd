package tech.tiangong.sdp.external

import org.apache.commons.collections4.CollectionUtils
import org.springframework.stereotype.Component
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.util.json.toJson
import tech.tiangong.sdp.resp.PostureFissionTaskExternalVo

/**
 * 姿势裂变小模型
 * @author lhf
 * @date 2024/12/2 14:17
 */
@Slf4j
@Component
class PostureFissionExternal(
    private val inspirationPostureFissionClient: InspirationPostureFissionClient,
) {

    fun listByIds(ids: List<Long>): List<PostureFissionTaskExternalVo>? {
        if (CollectionUtils.isEmpty(ids)) {
            return null
        }
        try {
            log.info { "姿势裂变任务-查询详情 请求参数: $ids" }
            val dataResponse = inspirationPostureFissionClient.listByIds(ids)
            log.info { "势裂变任务-查询详情 响应结果: ${dataResponse.toJson()}" }
            if (!dataResponse.successful) {
                throw RuntimeException(dataResponse.message)
            }
            return dataResponse.data
        } catch (e: Exception) {
            log.error(e) {
                "势裂变任务-查询详情 失败 errMessage:  ${e.localizedMessage}"
            }
            throw e
        }
    }
}