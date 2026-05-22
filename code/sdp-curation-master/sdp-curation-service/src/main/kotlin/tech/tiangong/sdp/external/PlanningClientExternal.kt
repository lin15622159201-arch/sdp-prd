package tech.tiangong.sdp.external

import org.springframework.stereotype.Component
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.util.json.toJson
import tech.tiangong.pop.common.req.PlanningSupplyQuantityReq
import tech.tiangong.pop.common.resp.PlanningSupplyQuantityResp
import tech.tiangong.pop.sdk.client.PlanningClient

/**
 * 企划
 * @author zjh
 * @date 2024/12/6 18:23
 */
@Slf4j
@Component
class PlanningClientExternal(
    private val planningClient: PlanningClient,
) {

    /**
     * 查询统计企划供给数量
     * @param req
     * @return
     */
    fun getSupplyQuantity(req: PlanningSupplyQuantityReq): PlanningSupplyQuantityResp? {
        try {
            log.info { "查询统计企划供给数量 请求参数: ${req.toJson()}" }
            val dataResponse = planningClient.supplyQuantityCategory(req)
            log.info { "查询统计企划供给数量 响应结果: ${dataResponse.toJson()}" }
            if (!dataResponse.successful) {
                throw RuntimeException(dataResponse.message)
            }
            return dataResponse.data
        } catch (e: Exception) {
            log.error {
                "查询统计企划供给数量 失败 errMessage: ${e.stackTraceToString()}"
            }
            throw e
        }
    }
}