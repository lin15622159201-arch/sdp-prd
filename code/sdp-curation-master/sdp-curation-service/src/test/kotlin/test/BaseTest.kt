package test

import com.alibaba.fastjson2.toJSONString
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.user.entity.CurrentUser
import team.aikero.blade.user.holder.DefaultCurrentUserContentSetter

/**
 * @author zjh
 * @date 2024/11/21 15:50
 */
@Slf4j
open class BaseTest {
    /**
     * 模拟一个测试用户
     * @param T
     * @param action
     */
    fun <T> mockedUser(action: () -> T) {
        // 弄一个假用户
        val user = CurrentUser(
            tenantId = 1487,
            id = 7097773421496389689,
            name = "测试回滚",
            code = "FASHION"
        )
        DefaultCurrentUserContentSetter.set(user)
        executeWithExceptionHandling {
            action()
        }

    }

    /**
     * 用于执行带异常处理的操作
     * @param T
     * @param action
     * @return
     */
    fun <T> executeWithExceptionHandling(action: () -> T): T? {
        return try {
            val r = action()
            log.info { "执行成功:${r.toJSONString()}" }
            r
        } catch (e: Exception) {
            log.error { "执行异常: ${e.printStackTrace()}" }
            null
        }
    }
}