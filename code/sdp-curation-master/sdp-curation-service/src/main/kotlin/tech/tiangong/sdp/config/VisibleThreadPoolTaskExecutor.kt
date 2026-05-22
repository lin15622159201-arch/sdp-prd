package tech.tiangong.sdp.config

import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor
import org.springframework.util.concurrent.ListenableFuture
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import java.util.concurrent.Callable
import java.util.concurrent.Future
import java.util.concurrent.ThreadPoolExecutor

/**
 * @author zhoujiliang
 * @desc 线程池监控类
 * @Date 2021/8/20 20:20
 */
@Slf4j
class VisibleThreadPoolTaskExecutor : ThreadPoolTaskExecutor() {
    private fun showThreadPoolInfo(prefix: String) {
        val threadPoolExecutor: ThreadPoolExecutor = threadPoolExecutor
        log.info {
            "${this.threadNamePrefix}, $prefix, " +
                    "taskCount [${threadPoolExecutor.getTaskCount()}], " +
                    "completedTaskCount [${threadPoolExecutor.getCompletedTaskCount()}], " +
                    "activeCount [${threadPoolExecutor.getActiveCount()}], " +
                    "queueSize [${threadPoolExecutor.queue.size}]"
        }
    }

    override fun execute(task: Runnable) {
        showThreadPoolInfo("1. do execute")
        super.execute(task)
    }

    override fun execute(task: Runnable, startTimeout: Long) {
        showThreadPoolInfo("2. do execute")
        super.execute(task, startTimeout)
    }

    override fun submit(task: Runnable): Future<*> {
        showThreadPoolInfo("1. do submit")
        return super.submit(task)
    }

    override fun <T> submit(task: Callable<T>): Future<T> {
        showThreadPoolInfo("2. do submit")
        return super.submit(task)
    }

    override fun submitListenable(task: Runnable): ListenableFuture<*> {
        showThreadPoolInfo("1. do submitListenable")
        return super.submitListenable(task)
    }

    override fun <T> submitListenable(task: Callable<T>): ListenableFuture<T> {
        showThreadPoolInfo("2. do submitListenable")
        return super.submitListenable(task)
    }
}
