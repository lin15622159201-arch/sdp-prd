package tech.tiangong.sdp.external

import tech.tiangong.butted.client.InspirationIdentifyClient
import tech.tiangong.butted.common.req.InspirationIdentifyReq
import tech.tiangong.butted.common.vo.SmartIdentifyTaskVo
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.util.json.toJson

/**
 * 图片识别sdk
 * @author zjh
 * @date 2024/12/2 14:10
 */
@Slf4j
@Component
class IdentifyClientExternal(
    private val inspirationIdentifyClient: InspirationIdentifyClient,
    @Value("\${callback.identify}") private val callbackIdentifyApi: String,
) {
    /**
     * 创建
     * @param req InspirationIdentifyReq
     */
    fun create(req: InspirationIdentifyReq): Long? {
        try {
            req.callback = callbackIdentifyApi
            log.info { "图片识别-创建 请求参数: ${req.toJson()}" }
            val dataResponse = inspirationIdentifyClient.create(req)
            log.info { "图片识别-创建 响应结果: ${dataResponse.toJson()}" }
            if (!dataResponse.successful) {
                throw RuntimeException(dataResponse.message)
            }
            return dataResponse.data
        } catch (e: Exception) {
            log.error {
                "图片识别-创建 失败 errMessage: ${e.stackTraceToString()}"
            }
            throw e
        }
    }
    fun createMq(req: InspirationIdentifyReq,path:String): Long? {
        try {
            req.callback = callbackIdentifyApi+path
            log.info { "图片识别-创建 请求参数: ${req.toJson()}" }
            val dataResponse = inspirationIdentifyClient.create(req)
            log.info { "图片识别-创建 响应结果: ${dataResponse.toJson()}" }
            if (!dataResponse.successful) {
                throw RuntimeException(dataResponse.message)
            }
            return dataResponse.data
        } catch (e: Exception) {
            log.error {
                "图片识别-创建 失败 errMessage: ${e.stackTraceToString()}"
            }
            throw e
        }
    }

    /**
     * 根据busId获取详情
     * @param busId 业务主键ID
     * @return SmartIdentifyTaskVo
     */
    fun getByBusId(busId: Long): SmartIdentifyTaskVo? {
        try {
            log.info { "图片识别-查询详情 请求参数: busId=$busId" }
            val dataResponse = inspirationIdentifyClient.getByBusId(busId)
            log.info { "图片识别-查询详情 响应结果: ${dataResponse.toJson()}" }
            if (!dataResponse.successful) {
                throw RuntimeException(dataResponse.message)
            }
            return dataResponse.data
        } catch (e: Exception) {
            log.error {
                "图片识别-查询详情 失败 errMessage: ${e.stackTraceToString()}"
            }
            throw e
        }
    }

    /**
     * 根据busId终止
     */
    fun suspendByBusId(busId: Long) {
        try {
            log.info { "图片识别-终止 请求参数: busId=$busId" }
            val dataResponse = inspirationIdentifyClient.suspendByBusId(busId)
            log.info { "图片识别-终止 响应结果: ${dataResponse.toJson()}" }
            if (!dataResponse.successful) {
                throw RuntimeException(dataResponse.message)
            }
        } catch (e: Exception) {
            log.error {
                "图片识别-终止 失败 errMessage: ${e.stackTraceToString()}"
            }
            throw e
        }
    }
}