package tech.tiangong.sdp.service.component

import org.redisson.api.RedissonClient
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor
import org.springframework.stereotype.Component
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import tech.tiangong.sdp.dao.repository.PickingAiDesignPictureRepository
import tech.tiangong.sdp.dao.repository.PickingAiDesignRepository
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit

/**
 * 选款图处理逻辑
 * @author zjh
 * @date 2024/12/24 18:40
 */
@Slf4j
@Component
class PickingImageComponent(
    private val pickingAiDesignRepository: PickingAiDesignRepository,
    private val pickingAiDesignPictureRepository: PickingAiDesignPictureRepository,
    private val imageOssComponent: ImageOssComponent,
    private val redissonClient: RedissonClient,
    private val imageHandlerExecutor: ThreadPoolTaskExecutor,
) {

    /**
     * 处理逻辑
     * @param pickingIds
     */
    fun handler(pickingIds: List<Long>) {
        pickingIds.chunked(500).forEach {
            // 计数器
            val latch = CountDownLatch(it.size);
            log.info { "开始处理选款图, 批次条数: ${it.size}" }
            it.forEach { inspirationId ->
                imageHandlerExecutor.execute {
                    try {
                        handler(inspirationId)
                    } finally {
                        latch.countDown(); // 任务完成，计数器减一
                    }
                }
            }
            try {
                latch.await(); // 等待所有批处理任务完成
                log.info { "开始处理选款图, 批次条数: ${it.size} 完成" }
            } catch (e: InterruptedException) {
                log.error { "等待所有批处理任务完成异常 ${e.message}" }
            }
        }
    }

    /**
     * 处理逻辑
     * @param pickingId
     * @return
     */
    fun handler(pickingId: Long) {
        val redisLock = redissonClient.getLock("sdp_curation_image_handler_lock:$pickingId");
        if (redisLock.tryLock(1, TimeUnit.MINUTES)) {
            try {
                val picking = pickingAiDesignRepository.getById(pickingId)
                if (picking == null) {
                    log.warn { "选款id不存在，id：$pickingId" }
                    return
                }
                // 处理主表灵感图的原图
                if (picking.inspirationImage.isNullOrEmpty() && !picking.sourceImage.isNullOrEmpty()) {
                    // 选款图为空, 需要转OSS
                    val ossImageUrl = imageOssComponent.imageUrlToOss(picking.sourceImage!!)
                    if (!ossImageUrl.isNullOrEmpty()) {
                        picking.inspirationImage = ossImageUrl
                        pickingAiDesignRepository.updateById(picking)
                    }
                }
                // 处理选款图片表的原图
                val picList = pickingAiDesignPictureRepository.getByPickingId(pickingId)
                picList.forEach {
                    if (it.pictureUrl.isNullOrEmpty() && !it.sourceUrl.isNullOrEmpty()) {
                        // 选款图为空, 需要转OSS
                        val ossImageUrl = imageOssComponent.imageUrlToOss(it.sourceUrl!!)
                        if (!ossImageUrl.isNullOrEmpty()) {
                            it.pictureUrl = ossImageUrl
                            pickingAiDesignPictureRepository.updateById(it)
                        }
                    }
                }
            } catch (e: Exception) {
                log.error { "选款图处理逻辑异常, inspirationId: $pickingId msg: ${e.message}" }
                e.printStackTrace()
            } finally {
                redisLock.unlock();
            }
        } else {
            log.warn { "选款图处理逻辑-锁冲突, inspirationId: $pickingId" }
        }
    }
}