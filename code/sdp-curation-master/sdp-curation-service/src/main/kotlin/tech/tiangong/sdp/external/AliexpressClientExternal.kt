package tech.tiangong.sdp.external

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import com.zjkj.aigc.common.util.Md5Utils
import okhttp3.Headers
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.springframework.stereotype.Component
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.util.json.parseJson
import team.aikero.blade.util.json.parseJsonList
import tech.tiangong.sdp.config.AliexpressProperties
import tech.tiangong.sdp.dto.aliexpress.req.AeProxyReq
import tech.tiangong.sdp.dto.aliexpress.req.AeReq
import tech.tiangong.sdp.dto.aliexpress.resp.AeDataTaskResp
import tech.tiangong.sdp.dto.aliexpress.resp.AeProxyResp
import tech.tiangong.sdp.dto.aliexpress.resp.AeTaskDataResp
import java.time.LocalDateTime
import java.time.ZoneId
import java.util.concurrent.TimeUnit

/**
 * 智脑 api 对接
 * @author zjh
 * @date 2024-12-18 16:02:49
 */
@Component
@Slf4j
class AliexpressClientExternal(
    private val aliexpressProperties: AliexpressProperties,
) {

    /**
     * 智脑拉取灵感数据
     * @param date 日期, 格式:20241221
     * @param page 页数
     * @param segmentNum 分段数
     */
    fun pullData(date: Int, page: Int, segmentNum: Int): AeTaskDataResp? {
        // 创建请求数据
        val req = AeProxyReq(
            api_path = "aidc.share.odps.partition.table",
            api_params = AeReq(
                segmentNum = segmentNum,
                curPage = page,
                partition = "ds=$date",
                project = "glb_dataservice_sg",
                tableName = "adi_aidc_pool_jv_task_export_dd"
            ),
            http_method = "GET"
        )
        return post(req)
    }

    private fun post(req: AeProxyReq): AeTaskDataResp? {
        val url = aliexpressProperties.domain
        val app = aliexpressProperties.app
        val secret = aliexpressProperties.secret
        if (url.isNullOrEmpty() || app.isNullOrEmpty() || secret.isNullOrEmpty()) {
            log.error { "智脑灵感接口-配置异常: url or app or secret is empty" }
            return null
        }

        // 压缩 JSON 字符串
        val mapper = jacksonObjectMapper()
        val requestJson = mapper.writeValueAsString(req)

        // 设置头部
        val ts = LocalDateTime.now().atZone(ZoneId.of("Asia/Shanghai")).toEpochSecond()
        val headers = Headers.Builder()
        headers.add("Content-Type", "application/json")
        headers.add("x-api-app", app)
        headers.add("x-api-ts", ts.toString())
        headers.add("x-api-sign", Md5Utils.getMD5(app + requestJson + ts.toString() + secret, "UTF-8"))

        // 创建Request对象
        val request = Request.Builder()
            .url(url)
            .post(requestJson.toRequestBody("application/json".toMediaTypeOrNull()))
            .headers(headers.build())
            .build()

        // 构建客户端, 设置超时时间
        val client = OkHttpClient.Builder()
            .connectTimeout(60, TimeUnit.SECONDS) // 连接超时时间
            .readTimeout(60, TimeUnit.SECONDS) // 读取超时时间
            .writeTimeout(60, TimeUnit.SECONDS) // 写入超时时间
            .build()

        log.info { "请求URL: ${request.url} 请求头部: ${request.headers} 请求参数: $requestJson" }

        // 发送请求并获取响应
        val response = client.newCall(request).execute()

        // 处理响应
        if (response.isSuccessful) {
            val responseBody = response.body?.string()
            try {
                val proxyResp = responseBody?.parseJson<AeProxyResp>()
                val aeResp = proxyResp?.data?.aidcShareOdpsPartitionTableResponse
                if (aeResp?.success == false) {
                    log.error { "智脑灵感接口-请求失败: ${aeResp.errorMsg}" }
                    return null
                }
                val taskListStr = aeResp?.data
                val taskStringList = taskListStr?.parseJsonList(String::class.java)
                val taskList = taskStringList?.map { it.parseJson<AeDataTaskResp>() }

                val result = AeTaskDataResp().apply {
                    if (aeResp != null) {
                        curSegmentNum = aeResp.curSegmentNum
                        errorMsg = aeResp.errorMsg
                        requestId = aeResp.requestId
                        success = aeResp.success
                        totalCount = aeResp.totalCount
                        totalPage = aeResp.totalPage
                        data = emptyList()
                    }
                }
                if (taskList.isNullOrEmpty()) {
                    log.info { "taskList is empty" }
                    log.info { "响应结果: $responseBody" }
                    return result
                }
                result.data = taskList
                return result;
            } catch (e: Exception) {
                log.error { "解析返回结果失败 ${e.message} 响应结果: $responseBody" }
                throw e
            }
        } else {
            println("请求异常: ${response.code} ${response.message}")
        }
        return null
    }
}