package tech.tiangong.sdp.service.impl

import org.apache.commons.lang3.StringUtils
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor
import org.springframework.stereotype.Service
import org.springframework.transaction.PlatformTransactionManager
import org.springframework.transaction.support.TransactionTemplate
import team.aikero.admin.common.vo.DictVo
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.sequence.id.IdHelper
import team.aikero.blade.util.json.toJson
import tech.tiangong.sdp.dao.entity.Inspiration
import tech.tiangong.sdp.dao.entity.InspirationAidcSource
import tech.tiangong.sdp.dao.repository.InspirationAidcSourceRepository
import tech.tiangong.sdp.dao.repository.InspirationRepository
import tech.tiangong.sdp.dto.lazada.req.TrendCenterQueryTaskImageListReqDto
import tech.tiangong.sdp.dto.lazada.req.TrendCenterQueryTaskListReqDto
import tech.tiangong.sdp.enums.InspirationDataSourceTypeEnum
import tech.tiangong.sdp.enums.PlanningSourceEnum
import tech.tiangong.sdp.external.AliexpressClientExternal
import tech.tiangong.sdp.external.LazadaClientExternal
import tech.tiangong.sdp.req.inspiration.ThirdInspirationSaveReq
import tech.tiangong.sdp.service.InspirationAidcService
import tech.tiangong.sdp.service.component.InspirationImageComponent
import java.time.Instant
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.format.DateTimeFormatter

/**
 * 灵感-AIDC
 * @author zjh
 * @date 2024-12-25 11:12:32
 */
@Service
@Slf4j
class InspirationAidcServiceImpl(
    private val inspirationRepository: InspirationRepository,
    private val lazadaExternal: LazadaClientExternal,
    private val aliexpressClientExternal: AliexpressClientExternal,
    private val imageHandlerExecutor: ThreadPoolTaskExecutor,
    private val inspirationImageComponent: InspirationImageComponent,
    private val transactionManager: PlatformTransactionManager,
    private val inspirationAidcSourceRepository: InspirationAidcSourceRepository,
) : InspirationAidcService {

    /**
     * 定时-趋势中心-拉取灵感数据
     * @param country
     * @param taskStartTime
     * @param taskEndTime
     */
    override fun trendCenterPullInspiration(country: DictVo, taskStartTime: LocalDateTime, taskEndTime: LocalDateTime) {
        val countryName = country.dictName
        log.info { "定时-趋势中心-拉取灵感数据: 国家站点: $countryName 开始时间:$taskStartTime 结束时间:$taskEndTime" }

        val planningSourceEnum = PlanningSourceEnum.TREND

        // 循环拉取灵感任务
        val taskReq = TrendCenterQueryTaskListReqDto()
        taskReq.pageNum = 1
        taskReq.pageSize = 20
        taskReq.venture = countryName
        taskReq.createDateStartStr = taskStartTime
        taskReq.createDateEndStr = taskEndTime
        while (true) {
            val taskList = lazadaExternal.trendCenterQueryTaskList(taskReq)
            if (taskList == null || taskList.records.isEmpty()) {
                log.warn { "定时-趋势中心-拉取灵感数据-任务列表为空, taskReq: ${taskReq.toJson()}" }
                break
            }
            taskReq.pageNum += 1

            // 循环拉取灵感任务图片
            taskList.records.forEach { task ->
                log.info { "定时-趋势中心-拉取灵感数据-任务: ${task.toJson()}" }
                // 通过taskId循环任务下的图片
                val imageReq = TrendCenterQueryTaskImageListReqDto()
                imageReq.pageNum = 1
                imageReq.pageSize = 500
                imageReq.venture = countryName
                imageReq.taskId = task.taskId
                while (true) {
                    val imageList = lazadaExternal.trendCenterQueryTaskImageList(imageReq)
                    if (imageList == null || imageList.records.isEmpty()) {
                        log.warn { "定时-趋势中心-拉取灵感数据-任务图片列表为空, imageReq: ${imageReq.toJson()}" }
                        break
                    }
                    imageReq.pageNum += 1

                    val inspirationReqList = mutableListOf<ThirdInspirationSaveReq>()

                    imageList.records.forEach { image ->
                        log.info { "定时-趋势中心-拉取灵感数据-任务图片: ${image.toJson()}" }
                        val inReq = ThirdInspirationSaveReq().apply {
                            this.thirdInspirationId = image.itemId
                            this.thirdInspirationInfo = image.toJson()
                            this.planningSourceCode = planningSourceEnum.dictCode
                            this.planningSourceName = planningSourceEnum.diceName
                            this.productLink = image.itemUrl
                            this.inspirationImage = image.mainImgUrl
                            this.sourceImage = image.mainImgUrl
                            this.externalCategory = image.categoryPath
                            this.inspirationImageSource = image.dataSource
                            this.countrySiteCode = country.dictCode
                            this.countrySiteName = country.dictName
                            this.retailPrice = image.price
                            this.salePrice = image.currentPrice
                            this.inspirationCreatedTime = task.createDate
                            this.dataSource = InspirationDataSourceTypeEnum.AIDC_TREND_CENTER.content
                        }
                        inspirationReqList.add(inReq)
                    }

                    if (inspirationReqList.isNotEmpty()) {
                        saveThirdInspiration(inspirationReqList)

                        // 临时修复数据
                        fixProductLink(inspirationReqList)
                    }
                }
            }
        }
    }

    /**
     * 临时修复数据-商品链接
     *
     * @param req
     */
    private fun fixProductLink(req: List<ThirdInspirationSaveReq>) {
        try {
            val thirdInspirationIds = req.mapNotNull { it.thirdInspirationId }.distinct()
            val thirds = inspirationRepository.getThirdInspirationList(thirdInspirationIds)
            val thirdInspirationIdMap = req.associateBy { it.thirdInspirationId }
            val updateList = mutableListOf<Inspiration>()
            if (thirds.isNotEmpty()) {
                thirds.forEach { third ->
                    val inReq = thirdInspirationIdMap[third.thirdInspirationId] ?: return@forEach
                    if (StringUtils.isNotBlank(inReq.productLink) && third.productLink.isNullOrBlank()) {
                        third.productLink = inReq.productLink
                        updateList.add(third)
                    }
                }
            }
            if (updateList.isNotEmpty()) {
                inspirationRepository.updateBatchById(updateList)
            }
        } catch (e: Exception) {
            log.error { "临时修复数据-商品链接失败, e: ${e.message}" }
            e.printStackTrace()
        }
    }

    /**
     * 定时-智脑-拉取灵感数据
     * @param countryNameMap
     * @param taskDate
     */
    override fun aliexpressPullInspiration(countryNameMap: Map<String, DictVo>, taskDate: LocalDate) {
        log.info { "定时-智脑-拉取灵感数据: 日期分区:$taskDate" }

        val planningSourceEnum = PlanningSourceEnum.TOP

        val date = taskDate.format(DateTimeFormatter.ofPattern("yyyyMMdd")).toInt()
        var segmentNum = 1
        val segmentNumMax = 256
        while (segmentNum <= segmentNumMax) {

            var page = 0
            do {
                page++
                val result = aliexpressClientExternal.pullData(date, page, segmentNum)
                log.info { "拉取智脑灵感任务-当前分区: $date 段: $segmentNum 内总数据量: ${result?.totalCount} 段内总页数: ${result?.totalPage} 当前页: $page 当前页数据量: ${result?.data?.size}" }
                if (result == null || result.data.isNullOrEmpty()) {
                    break
                }
                // 入库
                val inspirationReqList = mutableListOf<ThirdInspirationSaveReq>()

                result.data?.forEach { image ->
                    val country = countryNameMap[image.country]
                    val inReq = ThirdInspirationSaveReq().apply {
                        this.thirdInspirationId = image.itemId
                        this.thirdInspirationInfo = image.toJson()
                        this.planningSourceCode = planningSourceEnum.dictCode
                        this.planningSourceName = planningSourceEnum.diceName
                        this.inspirationImage = image.mainImageUrl
                        this.sourceImage = image.mainImageUrl
                        this.externalCategory = image.cateNamePath
                        this.inspirationImageSource = image.webcode
                        this.countrySiteCode = country?.dictCode
                        this.countrySiteName = country?.dictName
                        this.retailPrice = image.listPriceUsdRange
                        this.salePrice = image.priceUsdRange
                        this.inspirationCreatedTime = image.updateTime?.let { LocalDateTime.ofInstant(Instant.ofEpochMilli(it), ZoneId.systemDefault()) }
                        this.dataSource = InspirationDataSourceTypeEnum.AIDC_ALIEXPRESS.content
                    }
                    inspirationReqList.add(inReq)
                }

                if (inspirationReqList.isNotEmpty()) {
                    saveThirdInspiration(inspirationReqList)
                }
            } while (page < (result?.totalPage ?: 0))
            // 段数+1
            segmentNum++
        }
    }

    /**
     * 保存第三方灵感源数据
     * @param req
     */
    fun saveThirdInspiration(req: List<ThirdInspirationSaveReq>) {
        if (req.isEmpty()) {
            return
        }

        // 去重
        val thirdInspirationIds = req.mapNotNull { it.thirdInspirationId }.distinct()
        val thirdIds = inspirationRepository.getThirdInspiration(thirdInspirationIds)
        val sourceThirdIds = inspirationAidcSourceRepository.getThirdInspiration(thirdInspirationIds)

        val inspirationList = mutableListOf<InspirationAidcSource>()
        req.forEach { third ->
            //
            if (thirdIds.contains(third.thirdInspirationId) // 灵感正式表已存在
                || sourceThirdIds.contains(third.thirdInspirationId)    // 灵感AIDC源表已存在
                || third.sourceImage.isNullOrBlank()
            ) {
                return@forEach
            }
            val inspirationInfo = InspirationAidcSource()
            inspirationInfo.inspirationId = IdHelper.getId()
            inspirationInfo.thirdInspirationId = third.thirdInspirationId
            inspirationInfo.thirdInspirationInfo = third.thirdInspirationInfo
            inspirationInfo.planningSourceCode = third.planningSourceCode
            inspirationInfo.planningSourceName = third.planningSourceName
            inspirationInfo.sourceImage = third.sourceImage
            inspirationInfo.productLink = third.productLink
            inspirationInfo.externalCategory = third.externalCategory
            inspirationInfo.inspirationImageSource = third.inspirationImageSource
            inspirationInfo.countrySiteCode = third.countrySiteCode
            inspirationInfo.countrySiteName = third.countrySiteName
            inspirationInfo.retailPrice = third.retailPrice
            inspirationInfo.salePrice = third.salePrice
            inspirationInfo.inspirationCreatedTime = third.inspirationCreatedTime
            inspirationInfo.dataSource = third.dataSource
            inspirationInfo.handleStatus = 0
            inspirationList.add(inspirationInfo)
        }

        if (inspirationList.isNotEmpty()) {
            // 手动事务
            TransactionTemplate(transactionManager).executeWithoutResult {
                inspirationAidcSourceRepository.saveBatch(inspirationList)
            }
        }
    }

    /**
     * 处理灵感AIDC源表(未处理的)
     */
    override fun handleAidcSourceData() {
        val data = inspirationAidcSourceRepository.getByNoHandle()
        log.info { "handleAidcSourceData size: ${data.size}" }
        if (data.isEmpty()) {
            log.info { "无需处理的AIDC源数据" }
            return
        }
        data.chunked(500).forEach {
            imageHandlerExecutor.execute {

                inspirationImageComponent.handlerBatch(it)
            }
        }
    }
}