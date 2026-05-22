package tech.tiangong.sdp.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

/**
 * 智脑配置
 * @author zjh
 * @date 2024-12-18 16:02:21
 */
@ConfigurationProperties(prefix = "aidc.aliexpress")
@Configuration
class AliexpressProperties {
    var domain: String? = null
    var app: String? = null
    var secret: String? = null
}
