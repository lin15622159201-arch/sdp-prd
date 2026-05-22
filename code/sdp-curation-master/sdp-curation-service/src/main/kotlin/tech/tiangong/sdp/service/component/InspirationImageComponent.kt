package tech.tiangong.sdp.service.component

import org.redisson.api.RedissonClient
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor
import org.springframework.stereotype.Component
import org.springframework.transaction.PlatformTransactionManager
import org.springframework.transaction.support.TransactionTemplate
import team.aikero.blade.auth.withSystemUser
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.sequence.code.generate.BusinessCodeGenerator
import team.aikero.blade.sequence.id.IdHelper
import team.aikero.blade.util.async.runAsync
import tech.tiangong.butted.common.req.InspirationIdentifyReq
import tech.tiangong.sdp.dao.entity.Inspiration
import tech.tiangong.sdp.dao.entity.InspirationAidcSource
import tech.tiangong.sdp.dao.repository.InspirationAidcSourceRepository
import tech.tiangong.sdp.dao.repository.InspirationRepository
import tech.tiangong.sdp.enums.CodeRuleEnum
import tech.tiangong.sdp.enums.IdentifiedStatusEnum
import tech.tiangong.sdp.external.IdentifyClientExternal
import tech.tiangong.sdp.service.InspirationCallbackService
import tech.tiangong.sdp.utils.TransactionHelper
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit

/**
 * 灵感图处理逻辑
 * @author zjh
 * @date 2024/12/24 18:40
 */
@Slf4j
@Component
class InspirationImageComponent(
    private val inspirationRepository: InspirationRepository,
    private val inspirationAidcSourceRepository: InspirationAidcSourceRepository,
    private val identifyClientExternal: IdentifyClientExternal,
    private val imageOssComponent: ImageOssComponent,
    private val inspirationCallbackService: InspirationCallbackService,
    private val redissonClient: RedissonClient,
    private val imageHandlerExecutor: ThreadPoolTaskExecutor,
    private val businessCodeGenerator: BusinessCodeGenerator,
    private val transactionManager: PlatformTransactionManager,
) {

    /**
     * 处理逻辑
     * @param inspirationIds
     */
    fun handler(inspirationIds: List<Long>) {
        inspirationIds.chunked(500).forEach {
            runAsync{
                // 计数器
                val latch = CountDownLatch(it.size)
                log.info { "开始处理灵感图, 批次条数: ${it.size}" }
                it.forEach { inspirationId ->
                    imageHandlerExecutor.execute {
                        try {
                            handler(inspirationId)
                        } finally {
                            latch.countDown() // 任务完成，计数器减一
                        }
                    }
                }
                try {
                    latch.await() // 等待所有批处理任务完成
                    log.info { "开始处理灵感图, 批次条数: ${it.size} 完成" }
                } catch (e: InterruptedException) {
                    log.error { "等待所有批处理任务完成异常 ${e.message}" }
                }
            }

        }
    }

    /**
     * 处理逻辑
     * @param inspirationId
     * @return
     */
    private fun handler(inspirationId: Long): Boolean {
        val redisLock = redissonClient.getLock("sdp_curation_image_handler_lock:$inspirationId")
        if (redisLock.tryLock(1, TimeUnit.MINUTES)) {
            try {
                val inspiration = inspirationRepository.getById(inspirationId)
                if (inspiration == null) {
                    log.warn { "灵感id不存在，id：$inspirationId" }
                    return false
                }
                if (inspiration.inspirationImage.isNullOrEmpty()) {
                    if (!inspiration.sourceImage.isNullOrEmpty()) {
                        // 灵感图为空, 可能需要转OSS
                        val ossImageUrl = imageOssComponent.imageUrlToOss(inspiration.sourceImage!!)
                        if (ossImageUrl.isNullOrEmpty()) {
                            log.warn { "灵感图转OSS失败，id：$inspirationId" }
                            return false
                        }
                        inspiration.inspirationImage = ossImageUrl
                        inspirationRepository.updateById(inspiration)
                    } else {
                        log.error { "灵感图原图为空，中止逻辑，id：$inspirationId" }
                        return false
                    }
                }

                // 灵感图已经有了, 开始识别
                if (inspiration.identifiedId == null) {
                    // 没有识别id, 发起识别任务
                    val identifyReq = InspirationIdentifyReq()
                    identifyReq.busId = inspiration.inspirationId
                    identifyReq.refImgUrl = inspiration.inspirationImage
                    identifyReq.taskAttribute = 1 // 0-单任务，1-批量任务
                    val identifyId = identifyClientExternal.create(identifyReq)
                    if (identifyId != null) {
                        inspiration.identifiedId = identifyId
                        inspiration.identifiedStatus = IdentifiedStatusEnum.IDENTIFYING.code
                        inspirationRepository.updateById(inspiration)
                    }
                    return true
                } else {
                    // 有识别id, 查询识别结果(里面会更新)
                    inspirationCallbackService.identify(inspiration)
                    return true
                }
            } catch (e: Exception) {
                log.error { "灵感图处理逻辑异常, inspirationId: $inspirationId msg: ${e.message}" }
                e.printStackTrace()
                return false
            } finally {
                redisLock.unlock()
            }
        } else {
            log.warn { "灵感图处理逻辑-锁冲突, inspirationId: $inspirationId" }
            return false
        }
    }

    /**
     * 处理灵感AIDC源数据
     * @param sources
     */
    fun handlerBatch(sources: List<InspirationAidcSource>) {

        // 计数器
        val latch = CountDownLatch(sources.size)
        log.info { "开始处理灵感图, 批次条数: ${sources.size}" }
        sources.forEach {
//            imageHandlerExecutor.execute {
                try {
                    withSystemUser{
                        handler(it)
                    }
                } finally {
                    latch.countDown() // 任务完成，计数器减一
                }
//            }
        }
        try {
            latch.await() // 等待所有批处理任务完成
            log.info { "开始处理灵感图, 批次条数: ${sources.size} 完成" }
        } catch (e: InterruptedException) {
            log.error { "等待所有批处理任务完成异常 ${e.message}" }
        }
    }

    /**
     * 处理灵感AIDC源数据
     * @param source
     * @param thirdIds
     */
    private fun handler(source: InspirationAidcSource) {
        val redisLock = redissonClient.getLock("sdp_curation_source_image_handler_lock:${source.thirdInspirationId}")
        if (redisLock.tryLock(1, TimeUnit.MINUTES)) {
            try {
                val count = inspirationRepository.getThirdInspiration(source.thirdInspirationId!!)
                if (count > 0) {
                    // 已经存在了
                    source.handleStatus = 1
                    source.handleMessage = "thirdInspirationId已存在灵感正式表 ${source.thirdInspirationId}"
                    inspirationAidcSourceRepository.updateById(source)
                    return
                }

                val inspiration = Inspiration()
                inspiration.inspirationId = IdHelper.getId()
                inspiration.inspirationCode = businessCodeGenerator.generate(CodeRuleEnum.INSPIRATION_EXPORT)
                inspiration.thirdInspirationId = source.thirdInspirationId
                inspiration.thirdInspirationInfo = source.thirdInspirationInfo
                inspiration.planningSourceCode = source.planningSourceCode
                inspiration.planningSourceName = source.planningSourceName
                inspiration.sourceImage = source.sourceImage
                inspiration.productLink = source.productLink
                inspiration.externalCategory = source.externalCategory
                inspiration.inspirationImageSource = source.inspirationImageSource
                inspiration.countrySiteCode = source.countrySiteCode
                inspiration.countrySiteName = source.countrySiteName
                inspiration.retailPrice = source.retailPrice
                inspiration.salePrice = source.salePrice
                inspiration.inspirationCreatedTime = source.inspirationCreatedTime
                inspiration.dataSource = source.dataSource

                // 灵感图转OSS
                val ossImageUrl = imageOssComponent.imageUrlToOss(source.sourceImage!!)
                if (ossImageUrl.isNullOrEmpty()) {
                    log.error { "灵感图转OSS失败，source id：${source.inspirationId}" }
                    source.handleStatus = 1
                    source.handleMessage = "灵感图转OSS失败"
                    inspirationAidcSourceRepository.updateById(source)
                    return
                }
                inspiration.inspirationImage = ossImageUrl

                // 手动事务
                TransactionTemplate(transactionManager).executeWithoutResult {
                    // 保存 灵感正式表
                    inspirationRepository.save(inspiration)
                    // 删除 灵感AIDC源表
                    inspirationAidcSourceRepository.deletePhysicalById(source.inspirationId!!)
                    // 事务提交后执行
                    TransactionHelper.afterCommitExecute {
                        // 识别
                        val identifyReq = InspirationIdentifyReq()
                        identifyReq.busId = inspiration.inspirationId
                        identifyReq.refImgUrl = inspiration.inspirationImage
                        identifyReq.taskAttribute = 1 // 0-单任务，1-批量任务
                        val identifyId = identifyClientExternal.create(identifyReq)
                        if (identifyId != null) {
                            inspiration.identifiedId = identifyId
                            inspiration.identifiedStatus = IdentifiedStatusEnum.IDENTIFYING.code
                            inspirationRepository.updateById(inspiration)
                        }
                    }
                }

            } catch (e: Exception) {
                log.error { "灵感图处理逻辑异常, thirdInspirationId: ${source.thirdInspirationId} msg: ${e.message}" }
                e.printStackTrace()
            } finally {
                redisLock.unlock()
            }
        } else {
            log.warn { "灵感图处理逻辑-锁冲突, thirdInspirationId: ${source.thirdInspirationId}" }
        }
    }
}