package tech.tiangong.sdp.external

import org.apache.commons.collections4.CollectionUtils
import org.springframework.stereotype.Component
import team.aikero.blade.auth.withSystemUser
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.util.json.toJson
import tech.tiangong.sdp.convert.StyleGenTaskConvert
import tech.tiangong.sdp.dao.entity.StyleGenTask
import tech.tiangong.sdp.req.StyleGenTaskAddReq
import tech.tiangong.sdp.resp.StyleGenTaskResp

/**
 * 灵感风格小模型
 * @author zjh
 * @date 2024/12/2 14:17
 */
@Slf4j
@Component
class StyleGenClientExternal(
    private val inspirationStyleGenClient: InspirationStyleGenClient,
) {
    /**
     * 创建
     * @param task StyleGenTask
     */
    fun create(task: StyleGenTask): Long? {
        var id: Long? = 0
        withSystemUser {
            id = this.create(StyleGenTaskConvert.convert(task))
        }
        return id
    }

    fun listByIds(ids: List<Long>): List<StyleGenTaskResp>? {
        if (CollectionUtils.isEmpty(ids)) {
            return null
        }
        try {
            log.info { "灵感风格小模型任务-查询详情 请求参数: $ids" }
            val dataResponse = inspirationStyleGenClient.listByIds(ids)
            log.info { "灵感风格小模型任务-查询详情 响应结果: ${dataResponse.toJson()}" }
            if (!dataResponse.successful) {
                throw RuntimeException(dataResponse.message)
            }
            return dataResponse.data
        } catch (e: Exception) {
            log.error(e) {
                "灵感风格小模型任务-查询详情 失败 errMessage:  ${e.localizedMessage}"
            }
            throw e
        }
    }

    /**
     * 创建
     * @param req StyleGenTaskAddReq
     */
    fun create(req: StyleGenTaskAddReq): Long? {
        try {
            log.info { "灵感风格小模型任务-创建 请求参数: ${req.toJson()}" }
            val dataResponse = inspirationStyleGenClient.create(req)
            log.info { "灵感风格小模型任务-创建 响应结果: ${dataResponse.toJson()}" }
            if (!dataResponse.successful) {
                throw RuntimeException(dataResponse.message)
            }
            return dataResponse.data
        } catch (e: Exception) {
            log.error(e) {
                "灵感风格小模型任务-创建 失败 errMessage: ${e.localizedMessage}"
            }
            throw e
        }
    }
}