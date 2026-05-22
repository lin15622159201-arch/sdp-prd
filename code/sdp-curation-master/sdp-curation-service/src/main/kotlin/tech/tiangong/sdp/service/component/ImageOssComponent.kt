package tech.tiangong.sdp.service.component

import okhttp3.OkHttpClient
import okhttp3.Request
import org.apache.commons.lang3.StringUtils
import org.redisson.api.RMapCache
import org.redisson.api.RedissonClient
import org.springframework.stereotype.Component
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.oss.OssTemplate
import team.aikero.blade.sequence.id.IdHelper
import team.aikero.blade.util.json.toJson
import java.net.InetAddress
import java.net.SocketTimeoutException
import java.util.concurrent.TimeUnit

/**
 * 图片oss组件
 * @author zjh
 * @date 2024/12/23 15:24
 */
@Slf4j
@Component
class ImageOssComponent(
    private val ossTemplate: OssTemplate,
//    private var uploaderOssClient: UploaderOssClient,
//    private val uploaderOssProperties: UploaderOssProperties,
    private val redissonClient: RedissonClient,
) {

    private val domainBlackList = "sdp_curation_domain_black_list"

    /**
     * 下载外链图片到oss, 并返回oss图片url
     *
     * @param outUrl     外链图片url
     * @return oss图片url
     */
    fun imageUrlToOss(outUrl: String): String? {
        log.info { "开始下载图片，链接：$outUrl" }
        // 校验图片是否为oss图片, 如果是则直接返回, 如果不是则下载到oss
        if (outUrl.startsWith("https://oss.yunbanfang.cn")) {
            return outUrl
        }
        if (isDomainInBlacklist(outUrl)) {
            log.error { "图片域名在黑名单中，跳过下载，链接：$outUrl" }
            return null
        }

        try {
            // 下载图片到本地
            val client = OkHttpClient()
            val request = Request.Builder()
                .url(outUrl)
                .build()
            val response = client.newCall(request).execute()
            val body = response.body
            val imageBytes = body?.byteStream()!!
            val result = imageBytes.use {
                val upload = ossTemplate.upload(
                    key = "out_${IdHelper.getId()}.png",
                    stream = imageBytes,
                    contentLength = body.contentLength()
                )
                upload
            }
//            val req = UploaderRequestDto("image/jpeg", imageBytes, uploaderOssClient.buildFullyFileName("out_${IdHelper.getId()}.png", false), null)
//            val resp = uploaderOssClient.upload(req)
            if (StringUtils.isBlank(result)) {
                log.error { "外网图片下载到oss失败，返回信息：${result.toJson()}" }
                return null
            }
            log.info { "外网图片下载到oss成功，返回信息：${result.toJson()}" }
            return result
        } catch (e: SocketTimeoutException) {
            log.error { "外网图片下载到oss失败超时，链接：$outUrl, 异常: ${e.message}, 尝试ping域名是否正常" }
            // 尝试ping域名是否正常
            pingUrl(outUrl)
            return null
        } catch (e: Exception) {
            log.error { "外网图片下载到oss失败，链接：$outUrl, 异常: ${e.message}" }
            return null
        }
    }

    // 根据一个url,提取域名,ping是否正常
    fun pingUrl(url: String) {
        try {
            val domain = url.split("/")[2]
            val address = InetAddress.getByName(domain)    // 因服务器没有安装ping命令, 不能使用ProcessBuilder
            val reachable = address.isReachable(5000) // 5000毫秒（5秒）超时时间
            if (!reachable) {
                log.error { "域名无法ping通，域名加入黑名单1分钟 域名: $domain 链接: $url" }
                addToBlacklist(domain, 1, TimeUnit.MINUTES)
            }
        } catch (e: Exception) {
            log.error { "[跳过]ping域名异常 域名: $url, 异常: ${e.message}" }
        }
    }

    // 添加域名到黑名单，并设置过期时间
    fun addToBlacklist(domain: String, expirationTime: Long, timeUnit: TimeUnit) {
        try {// 获取RMapCache实例
            val domainBlacklistMap: RMapCache<String, String> = redissonClient.getMapCache(domainBlackList)
            domainBlacklistMap.put(domain, domain, expirationTime, timeUnit)
        } catch (e: Exception) {
            log.error { "[跳过]添加域名到黑名单失败，域名: $domain, 异常: ${e.message}" }
        }
    }

    // 检查域名是否在黑名单中
    fun isDomainInBlacklist(url: String): Boolean {
        try {
            val domain = url.split("/")[2]
            // 获取RMapCache实例
            val domainBlacklistMap: RMapCache<String, String> = redissonClient.getMapCache(domainBlackList)
            return domainBlacklistMap.containsKey(domain)
        } catch (e: Exception) {
            log.error { "[跳过]检查域名是否在黑名单中失败，域名: $url, 异常: ${e.message}" }
            return false
        }
    }
}