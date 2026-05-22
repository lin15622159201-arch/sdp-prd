package tech.tiangong.sdp.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.annotation.AsyncConfigurer
import org.springframework.scheduling.annotation.EnableAsync
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import java.util.concurrent.Executor
import java.util.concurrent.ThreadPoolExecutor

/**
 * @author zhoujiliang
 * @desc 线程池
 * @Date 2021/8/20 19:28
 */
@Configuration
@Slf4j
@EnableAsync
class ThreadPoolConfig : AsyncConfigurer {

    @Bean(name = ["commonExecutor"])
    fun commonExecutor(): ThreadPoolTaskExecutor {
        log.info { "start CommonTaskExecutor" }
        val taskExecutor: ThreadPoolTaskExecutor = VisibleThreadPoolTaskExecutor()
        taskExecutor.corePoolSize = 20 //核心线程最大数量，通俗点来讲就是，线程池中常驻线程的最大数量
        taskExecutor.maxPoolSize = 50 //线程池中运行最大线程数(包括核心线程和非核心线程)
        taskExecutor.queueCapacity = 100 //配置队列大小
        taskExecutor.keepAliveSeconds = 60 //线程池中空闲线程（仅适用于非核心线程）所能存活的最长时间
        taskExecutor.threadNamePrefix = "commonTaskExecutor--" //配置线程池中的线程的名称前缀
        taskExecutor.setWaitForTasksToCompleteOnShutdown(true)
        taskExecutor.setAwaitTerminationSeconds(60)
        // rejection-policy：当pool已经达到max size的时候，如何处理新任务
        // CALLER_RUNS：不在新线程中执行任务，而是有调用者所在的线程来执行
        taskExecutor.setRejectedExecutionHandler(ThreadPoolExecutor.CallerRunsPolicy())
        taskExecutor.initialize()
        return taskExecutor
    }

    /**
     * 图片处理线程池
     *
     * @return
     */
    @Bean(name = ["imageHandlerExecutor"])
    fun imageHandlerExecutor(): ThreadPoolTaskExecutor {
        log.info { "start ImageHandlerExecutor" }
        val taskExecutor: ThreadPoolTaskExecutor = VisibleThreadPoolTaskExecutor()
        val corePoolSize = Runtime.getRuntime().availableProcessors()
        val maximumPoolSize = corePoolSize * 2
        val keepAliveTime = 60 * 3
        val queueCapability = 1024 * 4

        taskExecutor.corePoolSize = corePoolSize
        taskExecutor.maxPoolSize = maximumPoolSize
        taskExecutor.queueCapacity = queueCapability
        taskExecutor.keepAliveSeconds = keepAliveTime
        taskExecutor.threadNamePrefix = "image-handler-thread-"
        taskExecutor.setWaitForTasksToCompleteOnShutdown(true)
        taskExecutor.setAwaitTerminationSeconds(60)
        taskExecutor.setRejectedExecutionHandler(ThreadPoolExecutor.CallerRunsPolicy())
        taskExecutor.initialize()
        return taskExecutor
    }

    /**
     * 款式管理-导入处理线程池
     *
     * @return
     */
    @Bean(name = ["designImportHandlerExecutor"])
    fun designImportHandlerExecutor(): ThreadPoolTaskExecutor {
        log.info { "start DesignImportHandlerExecutor" }
        val taskExecutor: ThreadPoolTaskExecutor = VisibleThreadPoolTaskExecutor()
        val corePoolSize = Runtime.getRuntime().availableProcessors()
        val maximumPoolSize = corePoolSize * 2
        val keepAliveTime = 60 * 3
        val queueCapability = 1024 * 4

        taskExecutor.corePoolSize = corePoolSize
        taskExecutor.maxPoolSize = maximumPoolSize
        taskExecutor.queueCapacity = queueCapability
        taskExecutor.keepAliveSeconds = keepAliveTime
        taskExecutor.threadNamePrefix = "design-import-handler-thread-"
        taskExecutor.setWaitForTasksToCompleteOnShutdown(true)
        taskExecutor.setAwaitTerminationSeconds(60)
        taskExecutor.setRejectedExecutionHandler(ThreadPoolExecutor.CallerRunsPolicy())
        taskExecutor.initialize()
        return taskExecutor
    }
}
