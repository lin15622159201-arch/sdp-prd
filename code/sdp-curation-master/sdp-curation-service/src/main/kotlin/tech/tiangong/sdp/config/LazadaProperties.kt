package tech.tiangong.sdp.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

/**
 * Lazada配置
 * @author zjh
 * @date 2024-12-14 18:41:37
 */
@ConfigurationProperties(prefix = "aidc.lazada")
@Configuration
class LazadaProperties {
    var domain: String? = null
    var appKey: String? = null
    var appSecret: String? = null
    var connectTimeout: Int? = null
    var readTimeout: Int? = null
    var notRequested: Boolean? = null
}
