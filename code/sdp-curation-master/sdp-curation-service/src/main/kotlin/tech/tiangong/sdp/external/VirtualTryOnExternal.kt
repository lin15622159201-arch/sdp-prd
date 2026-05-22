package tech.tiangong.sdp.external

import org.apache.commons.collections4.CollectionUtils
import org.springframework.stereotype.Component
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.util.json.toJson
import tech.tiangong.sdp.common.resp.VirtualTryOnTaskVO

/**
 * 虚拟换衣
 * @author lhf
 * @date 2024/12/2 14:17
 */
@Slf4j
@Component
class VirtualTryOnExternal(
    private val inspirationVirtualTryOnClient: InspirationVirtualTryOnClient,
) {

    fun listByIds(ids: List<Long>): List<VirtualTryOnTaskVO>? {
        if (CollectionUtils.isEmpty(ids)) {
            return null
        }
        try {
            log.info { "虚拟换衣任务-查询详情 请求参数: $ids" }
            val dataResponse = inspirationVirtualTryOnClient.listByIds(ids)
            log.info { "虚拟换衣任务-查询详情 响应结果: ${dataResponse.toJson()}" }
            if (!dataResponse.successful) {
                throw RuntimeException(dataResponse.message)
            }
            return dataResponse.data
        } catch (e: Exception) {
            log.error(e) {
                "虚拟换衣任务-查询详情 失败 errMessage:  ${e.localizedMessage}"
            }
            throw e
        }
    }
}