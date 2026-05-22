package tech.tiangong.sdp.config

import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.net.InetAddress
import java.net.UnknownHostException
import java.util.*

/**
 * 实例ID
 *
 * @author yanjiaming@zj.tech
 * @date 2024/9/3
 */
@Configuration
class InstanceIdConfig {
    @Bean
    @Qualifier("instanceIdStr")
    fun instanceIdStr(): String {
        return generateUniqueInstanceId()
    }

    private fun generateUniqueInstanceId(): String {
        val hostAddress = hostAddress
        val shortUuid = UUID.randomUUID().toString().substring(0, 8)
        return String.format("%s-%s", hostAddress, shortUuid)
    }

    private val hostAddress: String
        get() {
            return try {
                InetAddress.getLocalHost().hostAddress
            } catch (e: UnknownHostException) {
                "unknown-host"
            }
        }
}
