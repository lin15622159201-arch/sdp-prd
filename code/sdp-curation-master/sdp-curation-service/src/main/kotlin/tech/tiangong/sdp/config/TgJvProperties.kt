package tech.tiangong.sdp.config

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

/**
 * 选款平台配置
 *
 * @version :1.0
 * @date ：2024/3/6 下午5:29
 */
@ConfigurationProperties(prefix = "jv-tg.domain")
@Configuration
class TgJvProperties {
    /**
     * tg字典服务
     */
    var dicUrl: String? = null
}
