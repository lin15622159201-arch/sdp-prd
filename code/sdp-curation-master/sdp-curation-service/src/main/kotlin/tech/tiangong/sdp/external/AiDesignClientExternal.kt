package tech.tiangong.sdp.external

import org.apache.commons.lang3.StringUtils
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import team.aikero.blade.core.exception.BusinessException
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.util.json.toJson
import tech.tiangong.butted.client.ButtedInspirationDesignClient
import tech.tiangong.butted.common.vo.SmartDesignTaskVo
import tech.tiangong.sdp.req.InspirationDesignReq
import tech.tiangong.sdp.resp.InspirationDesignCreateResult

/**
 * AI设计-跑图任务
 * @author zjh
 * @date 2024/12/2 14:17
 */
@Slf4j
@Component
class AiDesignClientExternal(
    private val inspirationDesignClient: InspirationDesignClient,
    private val buttedInspirationDesignClient: ButtedInspirationDesignClient,
    @Value("\${callback.ai-design}") private val callbackAiDesignApi: String,
) {
    /**
     * 创建
     * @param req SmartDesignTaskReq
     */
    fun create(req: InspirationDesignReq): InspirationDesignCreateResult? {
        if (req.categoryCode.isNullOrBlank()) {
            throw BusinessException("品类为空, 不能提交AIGC任务")
        }
        try {
            req.filterBack = if (req.filterBack == null) 1 else req.filterBack
            req.faceRepair = if (req.faceRepair == null) 1 else req.faceRepair
            // 根据品类获取是否履约增强的配置，可以履约增强的时候增强下，不可以履约增强的时候不用管
            req.promiseEnhanced = if (req.promiseEnhanced == null) 0 else req.promiseEnhanced
            if (StringUtils.isNotBlank(req.modelMaterialUrl)) {
                // 模特不为空时, 则关闭脸部修复
                req.faceRepair = 0
            }
            req.callback = callbackAiDesignApi
            log.info { "AI设计跑图任务-创建 请求参数: ${req.toJson()}" }
            val dataResponse = inspirationDesignClient.create(req)
            log.info { "AI设计跑图任务-创建 响应结果: ${dataResponse.toJson()}" }
            if (!dataResponse.successful) {
                throw RuntimeException(dataResponse.message)
            }
            return dataResponse.data
        } catch (e: Exception) {
            log.error {
                "AI设计跑图任务-创建 失败 errMessage: ${e.stackTraceToString()}"
            }
            throw e
        }
    }

    /**
     * 根据busId获取详情
     * @param busId 业务主键ID
     * @return SmartDesignTaskVo
     */
    fun getByBusId(busId: Long): SmartDesignTaskVo? {
        try {
            log.info { "AI设计跑图任务-查询详情 请求参数: $busId" }
            val dataResponse = buttedInspirationDesignClient.getByBusId(busId)
            log.info { "AI设计跑图任务-查询详情 响应结果: ${dataResponse.toJson()}" }
            if (!dataResponse.successful) {
                throw RuntimeException(dataResponse.message)
            }
            return dataResponse.data
        } catch (e: Exception) {
            log.error {
                "AI设计跑图任务-查询详情 失败 errMessage: ${e.stackTraceToString()}"
            }
            throw e
        }
    }

    /**
     * 根据busId终止
     */
    fun suspendByBusId(busId: Long) {
        try {
            log.info { "AI设计跑图任务-终止 请求参数: $busId" }
            val dataResponse = buttedInspirationDesignClient.suspendByBusId(busId)
            log.info { "AI设计跑图任务-终止 响应结果: ${dataResponse.toJson()}" }
            if (!dataResponse.successful) {
                throw RuntimeException(dataResponse.message)
            }
        } catch (e: Exception) {
            log.error {
                "AI设计跑图任务-终止 失败 errMessage: ${e.stackTraceToString()}"
            }
            throw e
        }
    }

}