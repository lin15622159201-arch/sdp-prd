package tech.tiangong.sdp.service.component

import org.redisson.api.RLock
import org.redisson.api.RedissonClient
import org.springframework.stereotype.Component
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import java.util.concurrent.TimeUnit

/**
 * Redisson处理工具类
 *
 * @author     ：qinwenxuan@zj.tech
 * @date       ：2025/4/27 17:14
 * @version    :1.0
 */
@Component
class RedissonHelper(private val redissonClient: RedissonClient) {
    fun lock(lockKey: String, leaseTime: Long, fn: () -> Unit) {
        val lock = getLock(lockKey)
        try {
            if (lock.tryLock(1, leaseTime, TimeUnit.SECONDS)) {
                fn()
            } else {
                log.warn { "获取锁失败${lock.name}" }
            }
        } catch (e: Exception) {
            log.error(e) { "执行失败\t${e.message}" }
        } finally {
            if (lock.isLocked && lock.isHeldByCurrentThread) {
                log.info { "释放锁成功${lock.name}" }
                lock.unlock()
            }
        }
    }

    fun <T> lock(key: String, time: Long, fn: () -> T): T = lock(key, time * 2, time, fn)

    fun <T> lock(key: String, waitTime: Long, leaseTime: Long, fn: () -> T): T =
        lock(key, waitTime, leaseTime, TimeUnit.SECONDS, fn)

    fun <T> lock(key: String, waitTime: Long, leaseTime: Long, unit: TimeUnit, fn: () -> T): T =
        lock(getLock(key), waitTime, leaseTime, unit, fn)

    fun <T> lock(lock: RLock, waitTime: Long, leaseTime: Long, unit: TimeUnit, fn: () -> T): T =
        lock.run {
            try {
                if (this.tryLock(waitTime, leaseTime, unit)) {
                    log.debug { "获取锁成功${lock.name}" }
                    return fn()
                } else {
                    throw RuntimeException("获取锁失败${lock.name}")
                }
            } finally {
                if (this.isLocked && this.isHeldByCurrentThread) {
                    log.debug { "释放锁成功${lock.name}" }
                    this.unlock()
                }
            }
        }

    private fun getLock(key: String): RLock = redissonClient.getLock(key)
}