package team.aikero.blade.web.exception

import jakarta.servlet.http.HttpServletRequest
import org.springframework.dao.DataAccessException
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.method.annotation.HandlerMethodValidationException
import team.aikero.blade.core.enums.NetworkCode
import team.aikero.blade.core.exception.BusinessException
import team.aikero.blade.core.exception.ResponseCodeException
import team.aikero.blade.core.protocol.DataResponse
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log

/**
 *  异常处理
 *
 * @author     ：qinwenxuan@zj.tech
 * @date       ：2026/3/31 11:27
 * @version    :1.0
 */

@RestControllerAdvice
class GlobalExceptionHandler {

    /**
     * 处理一般业务异常(code固定为400)
     */
    @ExceptionHandler
    fun handleBusinessException(ex: BusinessException): DataResponse<Unit> {
        return DataResponse(
            successful = false,
            code = NetworkCode.BAD_REQUEST.code,
            message = ex.message ?: NetworkCode.BAD_REQUEST.message
        )
    }

    /**
     * 处理自定义业务异常(某些业务场景需要自定义code)
     */
    @ExceptionHandler
    fun handleResponseCodeException(ex: ResponseCodeException): DataResponse<Unit> {
        return DataResponse(
            successful = false,
            code = ex.errorCode?.code ?: NetworkCode.BAD_REQUEST.code,
            message = ex.message ?: NetworkCode.BAD_REQUEST.message
        )
    }

    /**
     * 处理参数校验异常
     */
    @ExceptionHandler
    fun handleMethodArgumentNotValidException(
        ex: MethodArgumentNotValidException,
        request: HttpServletRequest
    ): DataResponse<Unit> {
        log.error(ex) { "参数校验异常" }
        reportError(ex, request)

        val message = when (ex.fieldError) {
            null -> ex.message
            else -> ex.fieldError?.defaultMessage
        }

        return DataResponse(
            successful = false,
            code = NetworkCode.BAD_REQUEST.code,
            message = message ?: NetworkCode.BAD_REQUEST.message
        )
    }

    /**
     * 处理参数校验异常
     */
    @ExceptionHandler
    fun handleHandlerMethodValidationException(
        ex: HandlerMethodValidationException,
        request: HttpServletRequest
    ): DataResponse<Unit> {
        log.error(ex) { "参数校验异常" }
        reportError(ex, request)
        val errors = mutableSetOf<String>()
        ex.allValidationResults.forEach {
            it.resolvableErrors.forEach { e ->
                val msg = e.defaultMessage
                if (null != msg) {
                    errors.add(msg)
                }
            }
        }
        val message = errors.joinToString(", ")
        return DataResponse(
            successful = false,
            code = NetworkCode.BAD_REQUEST.code,
            message = message
        )
    }

    /**
     * 处理数据库异常
     */
    @ExceptionHandler
    fun handleDataAccessException(ex: DataAccessException, request: HttpServletRequest): DataResponse<Unit> {
        log.error(ex) { "数据库异常" }
        reportError(ex, request)
        return DataResponse(
            successful = false,
            code = NetworkCode.SERVER_ERROR.code,
            message = "数据库异常"
        )
    }

    /**
     * 处理未知异常(BUG)
     */
    @ExceptionHandler
    fun handleUnknownException(ex: Exception, request: HttpServletRequest): DataResponse<Unit> {
        log.error(ex) { "系统未知异常" }
        reportError(ex, request)
        return DataResponse(
            successful = false,
            code = NetworkCode.SERVER_ERROR.code,
            message = ex.message ?: NetworkCode.SERVER_ERROR.message
        )
    }

    /**
     * 错误上报
     */
    private fun reportError(ex: Exception, request: HttpServletRequest) {
        log.error(ex) { "异常处理不上报\t${ex.localizedMessage}" }
    }
}
