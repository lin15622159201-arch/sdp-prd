package tech.tiangong.sdp.config

import org.springframework.beans.factory.BeanInitializationException
import org.springframework.context.ApplicationContext
import org.springframework.context.ApplicationContextAware
import team.aikero.blade.core.toolkit.isBlank

/**
 * APP路径配置工具类
 */
class DomainProperties : ApplicationContextAware {

    override fun setApplicationContext(applicationContext: ApplicationContext) {
        val apiUrl = applicationContext.environment.getProperty("domain.nest-api")
        if (apiUrl.isBlank()) {
            throw BeanInitializationException("domain.nest-api is blank")
        }
        domain = apiUrl!!.trim()
    }

    companion object {

        private lateinit var domain: String

        @JvmStatic
        fun buildPath(requestPath: String): String {
            val host = domain.removeSuffix("/")
            val contextPath = "/sdp-curation"
            return if (requestPath.startsWith("/")) {
                host + contextPath + requestPath
            } else {
                "$host$contextPath/$requestPath"
            }
        }

        @JvmStatic
        fun defaultAiCallbackPath(): String {
            return buildPath("/ai-task/callback")
        }
    }


}