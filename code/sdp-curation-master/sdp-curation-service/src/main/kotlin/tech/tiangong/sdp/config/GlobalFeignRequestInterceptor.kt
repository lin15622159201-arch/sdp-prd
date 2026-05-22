package tech.tiangong.sdp.config

import feign.RequestInterceptor
import feign.RequestTemplate
import jakarta.servlet.http.HttpServletRequest
import org.springframework.http.HttpHeaders
import org.springframework.stereotype.Component
import org.springframework.web.context.request.RequestContextHolder
import org.springframework.web.context.request.ServletRequestAttributes
import team.aikero.blade.core.annotation.InnerApi
import team.aikero.blade.core.annotation.feign.InnerFeign
import team.aikero.blade.core.constant.HeaderConstants.TOKEN_PREFIX
import team.aikero.blade.core.toolkit.isNotBlank
import team.aikero.blade.user.holder.TokenHolder

@Component
class GlobalFeignRequestInterceptor : RequestInterceptor {
    override fun apply(requestTemplate: RequestTemplate) {
//        if (MockHeaderContextHolder.get() || hasAnno(requestTemplate)) {
//            return
//        }
        try {
            var authorization = try {
                TokenHolder.get().authorization
            } catch (e: Throwable) {
                getHttpServletRequest()?.getHeader(HttpHeaders.AUTHORIZATION)
            }
            if (authorization.isNotBlank()) {
                requestTemplate.removeHeader(HttpHeaders.AUTHORIZATION)
                if (!authorization!!.startsWith(TOKEN_PREFIX)) {
                    authorization = TOKEN_PREFIX + authorization
                }
                requestTemplate.header(HttpHeaders.AUTHORIZATION, authorization)
            }
        } catch (_: Throwable) {
        }

    }


    /**
     * 这个方法获取HttpServletRequest。它用于异步调用，需要设置请求上下文。
     * @return HttpServletRequest: HttpServletRequest。
     * @throws RuntimeException 如果无法获取HttpServletRequest。
     */
    private fun getHttpServletRequest(): HttpServletRequest? {
        return try {
            val requestAttributes = RequestContextHolder.getRequestAttributes() ?: return null
            (requestAttributes as ServletRequestAttributes).request
        } catch (e: Exception) {
            null
        }
    }

    private fun hasAnno(requestTemplate: RequestTemplate) =
        with(requestTemplate) {
            feignTarget().type().let { feignClass ->
                feignClass.annotations.any { it is InnerFeign || it is InnerApi }
                        || methodMetadata().method().annotations.any { it is InnerFeign || it is InnerApi }
            }
        }
}