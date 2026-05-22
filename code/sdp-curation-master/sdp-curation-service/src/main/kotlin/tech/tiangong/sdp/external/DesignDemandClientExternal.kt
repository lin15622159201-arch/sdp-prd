package tech.tiangong.sdp.external

import org.springframework.stereotype.Component
import team.aikero.blade.core.exception.BusinessException
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.user.holder.CurrentUserHolder
import team.aikero.blade.util.json.toJson
import tech.tiangong.sdp.req.DesignDemandCreateReq
import tech.tiangong.sdp.resp.DesignDemandCreateVo

/**
 * 灵感设计
 * @author zjh
 * @date 2024/11/28 11:33
 */
@Slf4j
@Component
class DesignDemandClientExternal(
    private val designDemandClient: DesignDemandClient,
) {

    /**
     * 创建灵感设计
     *
     * @return
     */
    fun create(req: DesignDemandCreateReq): DesignDemandCreateVo {
        try {
            log.info { "灵感设计-创建 请求参数: req: ${req.toJson()}" }
            val dataResponse = designDemandClient.add(req)
            log.info { "灵感设计-创建 响应结果: resp: ${dataResponse.toJson()}" }
            if (!dataResponse.successful) {
                throw RuntimeException(dataResponse.message)
            }
            return dataResponse.data?: throw BusinessException("灵感设计-创建 失败"+dataResponse.message)
        } catch (e: Exception) {
            log.error {
                "灵感设计-创建 失败 errMessage: ${e.stackTraceToString()}"
            }
            throw e
        }
    }
}
