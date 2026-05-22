package tech.tiangong.sdp.util;

import cn.hutool.core.thread.ExecutorBuilder;
import cn.hutool.core.thread.NamedThreadFactory;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

/**
 * ExecutorUtils
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/20 17:17
 */
@UtilityClass
@Slf4j
public class ExecutorUtils {
    public ExecutorService get(final String name, final int capacity) {
        return ExecutorBuilder.create()
                .setCorePoolSize(Runtime.getRuntime().availableProcessors())
                .setMaxPoolSize(Runtime.getRuntime().availableProcessors() * 2)
                .setKeepAliveTime(0, TimeUnit.SECONDS)
                .setWorkQueue(new LinkedBlockingQueue<>(capacity))
                .setThreadFactory(new NamedThreadFactory(name, false))
                .build();
    }

    public void shutdownExecutor(final ExecutorService pool) {
        pool.shutdown();
        try {
            if (!pool.awaitTermination(5, TimeUnit.SECONDS)) {
                pool.shutdownNow(); // Force termination
            }
        } catch (InterruptedException e) {
            log.error("释放线程池失败\t{}",e.getMessage(), e);
            pool.shutdownNow();
            Thread.currentThread().interrupt();
        }
    }
}
