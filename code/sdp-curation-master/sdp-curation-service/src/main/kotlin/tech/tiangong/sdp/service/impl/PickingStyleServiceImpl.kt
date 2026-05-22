package tech.tiangong.sdp.service.impl

import com.alibaba.excel.EasyExcel
import com.alibaba.excel.context.AnalysisContext
import com.alibaba.excel.event.AnalysisEventListener
import com.alibaba.fastjson2.parseArray
import com.alibaba.fastjson2.parseObject
import com.baomidou.mybatisplus.extension.kotlin.KtQueryWrapper
import jakarta.servlet.http.HttpServletResponse
import jakarta.validation.Valid
import org.apache.commons.collections4.CollectionUtils
import org.apache.commons.lang3.StringUtils
import org.apache.poi.ss.usermodel.WorkbookFactory
import org.redisson.api.RAtomicLong
import org.redisson.api.RBucket
import org.redisson.api.RLock
import org.redisson.api.RedissonClient
import org.springframework.amqp.core.Message
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.stereotype.Service
import org.springframework.transaction.PlatformTransactionManager
import org.springframework.transaction.annotation.Transactional
import org.springframework.transaction.support.TransactionTemplate
import org.springframework.web.multipart.MultipartFile
import team.aikero.admin.common.vo.DictVo
import team.aikero.blade.auth.withUser
import team.aikero.blade.core.constant.DatePatternConstants.NORM_DATETIME_PATTERN
import team.aikero.blade.core.enums.Bool
import team.aikero.blade.core.exception.BusinessException
import team.aikero.blade.core.protocol.PageVo
import team.aikero.blade.core.toolkit.isNotBlank
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.sequence.code.generate.BusinessCodeGenerator
import team.aikero.blade.sequence.id.IdHelper
import team.aikero.blade.user.entity.CurrentUser
import team.aikero.blade.user.holder.CurrentUserHolder
import team.aikero.blade.user.holder.DefaultCurrentUserContentSetter
import team.aikero.blade.util.json.parseJsonList
import team.aikero.blade.util.json.toJson
import team.aikero.blade.util.spring.SpringContextHolder
import tech.tiangong.butted.common.enums.TaskStatusEnum
import tech.tiangong.butted.common.req.InspirationIdentifyReq
import tech.tiangong.butted.common.vo.SmartDesignTaskVo
import tech.tiangong.butted.common.vo.SmartIdentifyTaskVo
import tech.tiangong.inspiration.client.SmartDevelopClient
import tech.tiangong.inspiration.common.req.ImageGroupProblemFeedbackSaveReq
import tech.tiangong.inspiration.common.vo.ImageGroupProblemFeedbackVo
import tech.tiangong.inspiration.common.vo.SmartDevelopStyleTaskExternalDetailVo
import tech.tiangong.pop.common.req.PlanningSupplyQuantityReq
import tech.tiangong.sdp.common.enums.PickingTypeEnum
import tech.tiangong.sdp.common.enums.YesOrNoEnum
import tech.tiangong.sdp.common.req.picking.PatternApplyPickingReq
import tech.tiangong.sdp.common.req.picking.PickingAddReq
import tech.tiangong.sdp.constants.MqConstant
import tech.tiangong.sdp.convert.PickStyleConvert
import tech.tiangong.sdp.convert.SpotStyleTaskConvert
import tech.tiangong.sdp.dao.bo.*
import tech.tiangong.sdp.dao.entity.*
import tech.tiangong.sdp.dao.repository.*
import tech.tiangong.sdp.dto.AIGCExportDTO
import tech.tiangong.sdp.dto.PickingResultExportDTO
import tech.tiangong.sdp.dto.PickingStyleExcelImportDTO
import tech.tiangong.sdp.dto.PickingStyleResultDto
import tech.tiangong.sdp.dto.mq.PickingStyleConfirmMqCacheDto
import tech.tiangong.sdp.dto.mq.PickingStyleConfirmMqDto
import tech.tiangong.sdp.dto.mq.SmartIdentifyDto
import tech.tiangong.sdp.entity.SpotStylePicture
import tech.tiangong.sdp.entity.SpotStyleSkc
import tech.tiangong.sdp.enums.*
import tech.tiangong.sdp.external.*
import tech.tiangong.sdp.repository.*
import tech.tiangong.sdp.req.inspiration.callback.IdentifyCallbackReq
import tech.tiangong.sdp.req.picking.*
import tech.tiangong.sdp.resp.SmartDevelopOutputGroupTag
import tech.tiangong.sdp.resp.SmartDevelopPromiseTag
import tech.tiangong.sdp.resp.picking.*
import tech.tiangong.sdp.resp.picking.PickingStyleImportResultVo.FailureDetail
import tech.tiangong.sdp.resp.picking.PickingStylePageVo.PickingStylePageResultDetailVo
import tech.tiangong.sdp.resp.picking.PickingStylePageVo.PickingStylePageResultDetailVo.PickingStylePageResultImageVo
import tech.tiangong.sdp.resp.picking.PickingStyleResultDetailVo.PickingDetail
import tech.tiangong.sdp.resp.picking.PickingStyleResultDetailVo.RecommendFabricDetail
import tech.tiangong.sdp.service.*
import tech.tiangong.sdp.service.component.PickingImageComponent
import tech.tiangong.sdp.utils.FileExportUtils
import tech.tiangong.sdp.utils.TransactionHelper
import tech.tiangong.sdp.utils.UserInvoke
import tech.tiangong.sdp.vo.req.PickingStyleDevelopReq
import java.io.IOException
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.*
import java.util.concurrent.TimeUnit
import java.util.concurrent.atomic.AtomicInteger


/**
 * 选款
 * @author zjh
 * @date 2024-11-28 18:21:27
 */
@Slf4j
@Service
class PickingStyleServiceImpl(
    private val aiDesignTaskRepository: AiDesignTaskRepository,
    private val aiDesignTaskFabricRepository: AiDesignTaskFabricRepository,
    private val aiDesignTaskLabelRepository: AiDesignTaskLabelRepository,
    private val pickingAiDesignRepository: PickingAiDesignRepository,
    private val pickingAiDesignStyleRepository: PickingAiDesignStyleRepository,
    private val pickingAiDesignPictureRepository: PickingAiDesignPictureRepository,
    private val pickingAiDesignResultRepository: PickingAiDesignResultRepository,
    private val submitDownstreamLogRepository: SubmitDownstreamLogRepository,
    private val transactionManager: PlatformTransactionManager,
    private val designDemandClientExternal: DesignDemandClientExternal,
    private val planningClientExternal: PlanningClientExternal,
    private val inspirationRepository: InspirationRepository,
    private val aiDesignTaskPictureRepository: AiDesignTaskPictureRepository,
    private val pickingAiHistory2024Repository: PickingAiHistory2024Repository,
    private val dictClientExternal: DictClientExternal,
    private val businessCodeGenerator: BusinessCodeGenerator,
    private val pickingImageComponent: PickingImageComponent,
    private val inspirationDesignClient: InspirationDesignClient,
    private val smartDevelopClient: SmartDevelopClient,
    private val inspirationLabelRepository: InspirationLabelRepository,
    private val identifyClientExternal: IdentifyClientExternal,
    private val rabbitTemplate: RabbitTemplate,
    private val redissonClient: RedissonClient,
    private val mqLogRepository: MqLogRepository,
    private val aiDesignMaterialRepository: AiDesignMaterialRepository,
    private val pickingStylePushService: PickingStylePushService,
    private val imageGroupProblemFeedbackClient: ImageGroupProblemFeedbackClient,
    private val developStyleTaskService: DevelopStyleTaskService,
    private val prototypeService: PrototypeService,
    private val spotStyleTaskService: SpotStyleTaskService,
    private val spotStyleSkcRepository: SpotStyleSkcRepository,
    private val spotStylePictureRepository: SpotStylePictureRepository,
    ) : PickingStyleService {

    companion object {
        /**
         * 日期时间格式化
         */
        private val DATE_TIME_FORMATTER: DateTimeFormatter = DateTimeFormatter.ofPattern(NORM_DATETIME_PATTERN)

        private val IDENTIFY_DATA_CACHE_IMAGE = "sdp_curation_identify_cache_imge"
        private val IDENTIFY_DATA_CACHE_NUM = "sdp_curation_identify_cache_num"
        private val IDENTIFY_DATA_CACHE_NUM_LOCK = "sdp_curation_identify_cache_num_lock"
        private val IDENTIFY_DATA_CACHE = "sdp_curation_identify_cache"
    }

    /**
     * 分页
     *
     * @param req 入参
     * @return
     */
    override fun page(req: PickingStylePageReq): PageVo<PickingStylePageVo> {
        req.tenantId = CurrentUserHolder.get().tenantId
        val pageData = pickingAiDesignRepository.selectListPage(req)
        if (pageData.records.isEmpty() || pageData.records.isEmpty()) {
            return PageVo(req.pageNum, 0, listOf())
        }

        // 获取款式数据
        val pickingIds = pageData.records.mapNotNull { it.pickingId }.distinct()
        val pickingAiDesignStyleList = pickingAiDesignStyleRepository.selectByPickingIds(pickingIds, req.pickingState)
        val pickingAiDesignStyleMap = pickingAiDesignStyleList.groupBy { it.pickingId }

        // 获取款式图片数据
        val pickingStyleIds = pickingAiDesignStyleList.mapNotNull { it.pickingStyleId }.distinct()
        val pickingAiDesignPictureList = pickingAiDesignPictureRepository.selectByPickingStyleIds(pickingStyleIds)
        val pickingAiDesignPictureMap = pickingAiDesignPictureList.groupBy { it.pickingStyleId }

        // key=字典值code,value=字典值vo
        val waveBatchDictCodeMap =
            dictClientExternal.getTopByDictCode(DictEnum.PLM_CLOTHING_BAND)?.children?.associateBy(
                { it.dictCode },
                { it })
        // key=字典值code,value=字典值vo
        val printingDictCodeMap =
            dictClientExternal.getTopByDictCode(DictEnum.FD_PRINTING)?.children?.associateBy({ it.dictCode }, { it })
        var tags: List<SmartDevelopPromiseTag> = listOf()
        // 查履约情况
        val designTaskIds = pageData.records.mapNotNull { it.designTaskId }
        val aiDesignTasks = mutableListOf<AiDesignTask>()
        if (designTaskIds.isNotEmpty()) {
            aiDesignTasks.addAll(aiDesignTaskRepository.listByIds(designTaskIds))
            aiDesignTasks.mapNotNull { it.busId }.let {
                val resp = inspirationDesignClient.listSmartDevelopPromiseTag(it)
                if (resp.successful) {
                    resp.data?.let { promiseTag ->
                        tags = promiseTag
                    }
                }
            }
        }
        val aiDesignTaskMap = aiDesignTasks.toList().associateBy { it.taskId }
        // 组装
        return PageVo(req.pageNum, pageData.total.toInt(), pageData.records.map {
            val resp = PickingStylePageVo()
            resp.pickingId = it.pickingId
            resp.dataSourceType = it.dataSource
            resp.origin = it.origin
            resp.countrySiteName = it.countrySiteName
            resp.externalCategory = it.externalCategory
            resp.identifyCategoryName = it.identifyCategoryName
            resp.waveBatchName = waveBatchDictCodeMap?.get(it.waveBatchCode)?.dictName
            resp.taskCode = it.designTaskCode
            resp.designTaskId = it.designTaskId
            resp.creatorId = it.creatorId
            resp.creatorName = it.creatorName
            resp.createdTime = it.createdTime
            resp.inspirationImage = it.inspirationImage
            resp.refImgUrl = it.refImgUrl
            resp.inspirationSourceType = it.inspirationSourceType
            resp.retailPrice = it.retailPrice
            resp.salePrice = it.salePrice
            resp.sourceImage = it.sourceImage
            resp.pickingStyleDetails = mutableListOf<PickingStylePageResultDetailVo>().apply {
                pickingAiDesignStyleMap[it.pickingId]?.forEach { pickingAiDesignStyle ->
                    val styleVo = PickingStylePageResultDetailVo()
                    styleVo.pickingStyleId = pickingAiDesignStyle.pickingStyleId
                    styleVo.pickingId = pickingAiDesignStyle.pickingId
                    styleVo.pickingStyleName = pickingAiDesignStyle.styleName
                    styleVo.pickingState = pickingAiDesignStyle.pickingState
                    styleVo.sortOrder = pickingAiDesignStyle.sort
                    styleVo.resultDetail = PickingStylePageResultDetailVo.ResultDetailVo().apply {
                        this.suggestedPrice = pickingAiDesignStyle.suggestedPrice?.toString() ?: ""
                        this.suggestedStyle = pickingAiDesignStyle.suggestedStyleName
                        this.suggestedCategoryCode = pickingAiDesignStyle.suggestedCategoryCode
                        this.suggestedWaveBatchCode = pickingAiDesignStyle.suggestedWaveBatchCode
                        this.suggestedShopName = pickingAiDesignStyle.suggestedShopName
                        this.suggestedShopCode = pickingAiDesignStyle.suggestedShopShortCode
                        this.suggestedPrinting =
                            printingDictCodeMap?.get(pickingAiDesignStyle.suggestedPrintingCode)?.dictName
                        this.suggestedCountrySiteCode = pickingAiDesignStyle.suggestedCountrySiteCode
                        this.cargoTrayCode = pickingAiDesignStyle.cargoTrayCode
                        this.remark = pickingAiDesignStyle.remark
                        this.attachments = AttachmentBo.jsonToBoList(pickingAiDesignStyle.attachments)
                        this.updateVersion = pickingAiDesignStyle.updateVersion
                        this.sceneCode = pickingAiDesignStyle.sceneCode
                        this.sceneName = pickingAiDesignStyle.sceneName
                    }
                    styleVo.pickingStyleImages = mutableListOf<PickingStylePageResultImageVo>().apply {
                        pickingAiDesignPictureMap[pickingAiDesignStyle.pickingStyleId]?.forEach { pickingAiDesignPicture ->
                            val imageVo = PickingStylePageResultImageVo()
                            imageVo.pickingPictureId = pickingAiDesignPicture.pickingPictureId
                            imageVo.pickingId = pickingAiDesignPicture.pickingId
                            imageVo.pickingStyleId = pickingAiDesignPicture.pickingStyleId
                            imageVo.pictureUrl =
                                getPictureUrl(pickingAiDesignPicture.pictureUrl, pickingAiDesignPicture.repairImgUrl)
                            imageVo.repairImgUrl = pickingAiDesignPicture.repairImgUrl
                            imageVo.groupNum = pickingAiDesignPicture.groupNum
                            imageVo.serialNum = pickingAiDesignPicture.serialNum
                            imageVo.mainImageType = pickingAiDesignPicture.mainImageType
                            imageVo.fixImageType = pickingAiDesignPicture.fixImageType
                            imageVo.eliminateType = pickingAiDesignPicture.eliminateType
                            imageVo.pickingState = pickingAiDesignPicture.pickingState
                            imageVo.eliminateReasonCodes =
                                if (StringUtils.isNotBlank(pickingAiDesignPicture.eliminateReason)) {
                                    pickingAiDesignPicture.eliminateReason.parseArray<String>()
                                } else {
                                    listOf()
                                }
                            this.add(imageVo)
                        }
                    }
                    this.add(styleVo)
                }
            }
            // 是否选过
            val isPicked =
                resp.pickingStyleDetails?.any { it2 -> PickingStateEnum.isSelected(it2.pickingState) } == true
            resp.state = if (isPicked) 1 else 0
            if (it.designTaskId != null && it.dataSource.equals("AIGC")) {
                val aiDesignTask = aiDesignTaskMap[it.designTaskId]/* aiDesignTaskRepository.getById(it.designTaskId)*/
                if (aiDesignTask != null) {
                    // 图片履约标签
                    val flatMap =
                        tags.filter { tag -> tag.taskId ==/* aiDesignTaskRepository.getById(it.designTaskId)*/aiDesignTask.busId }
                            .flatMap { tag ->
                                tag.promiseTagList?.map { promiseTag ->
                                    val smartDevelopOutputGroupTag = SmartDevelopOutputGroupTag()
                                    smartDevelopOutputGroupTag.groupNum = promiseTag.groupNum
                                    smartDevelopOutputGroupTag.pictureId = promiseTag.pictureId
                                    smartDevelopOutputGroupTag.promiseEnabled = promiseTag.promiseEnabled
                                    smartDevelopOutputGroupTag.fabricConsistent = promiseTag.fabricConsistent
                                    smartDevelopOutputGroupTag
                                } ?: emptyList() // 如果 promiseTagList 为空，返回空列表
                            }
                    resp.pickingStyleDetails?.forEachIndexed { index, pickingStylePageResultDetailVo ->
                        flatMap.getOrNull(index).let { groupTag ->
                            pickingStylePageResultDetailVo.styleTag = groupTag
                        }
                    }
                }
            }
            resp
        })
    }

    /**
     * 统计选款状态数量
     *
     * @param req 查询参数（复用 PickingStylePageReq）
     * @return
     */
    override fun countPickingStatus(req: PickingStylePageReq): PickingStyleCountStatusVo {
        req.tenantId = CurrentUserHolder.get().tenantId
        val pickingStateCountBoList = pickingAiDesignRepository.countPickingStatus(req)
        // 转为map, key=选款状态, value=数量
        val countMap: MutableMap<Int?, Int?> = mutableMapOf()
        for (pickingStateCountBo in pickingStateCountBoList) {
            countMap[pickingStateCountBo.pickingState] = pickingStateCountBo.count
        }
        return PickingStyleCountStatusVo().apply {
            total = pickingStateCountBoList.mapNotNull { it.count }.sumOf { it }
            toBeSelected = countMap[PickingStateEnum.NOT_AVAILABLE.state] ?: 0
            selected = countMap[PickingStateEnum.AVAILABLE.state] ?: 0
            unselected = countMap[PickingStateEnum.NOT_SELECTED.state] ?: 0
        }
    }

    /**
     * 确认选款
     * @param req
     */
    @Transactional(rollbackFor = [Exception::class])
    override fun confirm(req: PickingConfirmReq) {
        log.info { "确认选款 req: ${req.toJson()}" }
        // verify request params
        val pickingId = req.pickingId
        val selectedStyles = req.result
        verifyConfirmParam(pickingId, selectedStyles)
        val pickingAiDesign = pickingAiDesignRepository.getById(req.pickingId)
        // 所有选款数据，先查出来，不要在循环里面单个调用了
        val pickingStyleIds = selectedStyles.map { it.pickingStyleId }
        val pickingAiDesignStyles = pickingAiDesignStyleRepository.listByIds(pickingStyleIds)
        val pickingAiDesignStyleMap = pickingAiDesignStyles.associateBy { it.pickingStyleId }

        // 收集所有需要查询的图片 ID
        val allPictureIds =
            selectedStyles.flatMap { it -> it.imageInfos?.map { it.pickingPictureId } ?: emptyList() }.distinct()
                .filterNotNull()
        // 批量查询图片信息
        val allPicturesMap = if (allPictureIds.isNotEmpty()) {
            pickingAiDesignPictureRepository.listByIds(allPictureIds).associateBy { it.pickingPictureId }
        } else {
            emptyMap()
        }
        val stylePicturePair = selectedStyles
            .mapNotNull { reqResult ->
                val pickingAiDesignStyle = pickingAiDesignStyleMap[reqResult.pickingStyleId]
                if (pickingAiDesignStyle != null) {
                    val convertedStyle = PickStyleConvert.convert(
                        pickingAiDesign,
                        pickingAiDesignStyle,
                        reqResult,
                        dictClientExternal
                    )
                    val pickingImageList = reqResult.imageInfos?.mapNotNull { imageInfo ->
                        allPicturesMap[imageInfo.pickingPictureId]?.apply {
                            serialNum = imageInfo.serialNum
                            mainImageType = imageInfo.mainImageType
                            fixImageType = imageInfo.fixImageType
                            eliminateType = imageInfo.eliminateType
                            pickingState = imageInfo.pickingState
                            eliminateReason = imageInfo.eliminateReasonCodes?.toJson()
                        }
                    } ?: mutableListOf()
                    Pair(convertedStyle, pickingImageList)
                } else {
                    null
                }
            }.toMutableList() // 将结果转换为 MutableList
        log.info { "要更新的数据 stylePicturePair: ${stylePicturePair.toJson()}" }
        // 新版本需要生成一个结果
        if (stylePicturePair.isEmpty()) {
            log.info { "无更新数据" }
            return
        }
        // 更新picking_ai_design_style
        val updateStyles = stylePicturePair.map { it.first }
        pickingAiDesignStyleRepository.updateBatchById(updateStyles)
        // 更新 picking_ai_design_picture
        val updatePictures = stylePicturePair.flatMap { it.second }
        if (updatePictures.isNotEmpty()) {
            pickingAiDesignPictureRepository.updateBatchById(updatePictures)
        }
        val pickingResults = pickingAiDesignResultRepository.selectListByPickingId(req.pickingId)
        val styleIds = updateStyles.map { it.pickingStyleId }
        pickingResults.filter { styleIds.contains(it.pickingStyleId) }.forEach {
            pickingAiDesignResultRepository.logicDelete(it.pickingResultId ?: 0)
        }
        updatePickingAiDesign(pickingAiDesign, req)
        //收集picking_ai_design_result
        val pickingAiDesignResults: MutableList<PickingAiDesignResult> =
            PickStyleConvert.convert(stylePicturePair, pickingAiDesign, pickingResults)
        log.info { "要插入的选款结果pickingAiDesignResults: ${pickingAiDesignResults.toJson()}" }
        pickingAiDesignResultRepository.saveBatch(pickingAiDesignResults)

        dealStatusChangeNotify(pickingAiDesignStyles, pickingAiDesign, pickingAiDesignResults)

        // v4.1去除生成4K图
//        val designResults = pickingAiDesignResults.filter { PickingStateEnum.AVAILABLE.state == it.pickingState }
//        if (CollectionUtils.isNotEmpty(designResults)) {
//            results.addAll(designResults)
//        }
//        log.info { "要生成4K的选款结果: ${results.toJson()}" }
//        if (results.isNotEmpty()) {
//            TransactionHelper.afterCommitExecute {
//                ultraHdTaskComponent.createTask(results)
//            }
//        }
        // 推犀牛 (xiniu环境才需要推送选款结果)
        // 改成选款创建后就推送
//        if (SpringContextHolder.getProperty("spring.profiles.active")?.contains("xiniu") ?: false) {
//            log.info { "xiniu环境需推送选款结果" }
//            confirmMqRefactor(req)
//        } else {
//            log.info { "非xiniu环境无需推送选款结果" }
//        }
    }

    private fun dealResult(
        selectedStyles: MutableList<@Valid PickingStyleConfirmReq>,
        pickingAiDesign: PickingAiDesign
    ) {
        if (!pickingAiDesign.oneTaskOneGroup()) return
        val filtered = selectedStyles.filter { style ->
            style.imageInfos?.any { it.pickingState == 1 } == true
        }.onEach { it.pickingState = 1 }
        if (filtered.isNotEmpty()) {
            selectedStyles.clear()
            selectedStyles.addAll(filtered)
        }
    }

    private fun dealStatusChangeNotify(
        pickingAiDesignStyle: List<PickingAiDesignStyle>,
        pickingAiDesign: PickingAiDesign,
        pickingAiDesignResults: List<PickingAiDesignResult>
    ) {
        if (CollectionUtils.isEmpty(pickingAiDesignStyle)) {
            return
        }
        if (CollectionUtils.isEmpty(pickingAiDesignResults)) {
            return
        }
        if (pickingAiDesign.isPrototypeManageSendType() && pickingAiDesignResults[0].pickingState == PickingStateEnum.AVAILABLE.state) {
           // val spuId = pickingAiDesign.sendTypeId
            //val spuCode = pickingAiDesign.sendTypeCode
            val skcId = pickingAiDesign.skcId
            val allPictures = pickingPushPicture(pickingAiDesignResults[0])
            if (pickingAiDesign.isSpotStyle()) {
                val updateList = pickingPushPictureToSpot(pickingAiDesign, allPictures!!)
                val skc = spotStyleSkcRepository.getById(skcId);
                if (updateList != null) {
                    buildSpotSkcImageUpdate(skc,updateList)
                }
                return
            }
            if (pickingAiDesign.isDesignType() && null != skcId) {
                prototypeService.pickingPushPictureToPrototype(skcId, allPictures)
                return
            }
        }
        //推送给开款
        pushDevelopStyle(pickingAiDesignResults)
    }

    private fun buildSpotSkcImageUpdate(skc: SpotStyleSkc, allPictures: List<String>) {
        if (allPictures.isEmpty()) {
            return
        }
        spotStyleTaskService.editSkc(SpotStyleTaskConvert.buildSpotSkcImageUpdate(skc,allPictures))
        val spotPictures = spotStylePictureRepository.listByTaskIds(listOf(skc.taskId))
        val skcPictures = spotPictures.stream().filter { p: SpotStylePicture -> p.skcId == skc.skcId }.toList()
        //现货-更新商品标签
        spotStyleTaskService.updateProductTag(skc.taskId, skcPictures, allPictures)
    }


    private fun pickingPushPicture(pickingAiDesignResult: PickingAiDesignResult): List<String> {
        val pickingPictures = PickingResultImageInfoBo.jsonToBoList(pickingAiDesignResult.resultImageInfo)
        return if (pickingPictures.any { it.repairImgUrl.isNotBlank() }) {
            pickingPictures.mapNotNull { it.repairImgUrl }
        } else {
            pickingPictures.mapNotNull { it.pictureUrl }
        }
    }

    fun pickingPushPictureToSpot(
        pickingAiDesign: PickingAiDesign,
        allPictures: List<String?>
    ): List<String>? {
        val existingUrls = spotStylePictureRepository
            .listByTaskIds(listOf(pickingAiDesign.sendTypeId))
            .filter { it.skcId == pickingAiDesign.skcId  }
            .mapNotNull { it.pictureUrl }
        val newUrls = allPictures
            .filterNotNull()
            .filter { it !in existingUrls }
            .take(20 - existingUrls.size)
        if (newUrls.isEmpty()) return emptyList()
        return (existingUrls + newUrls).take(20)
    }

    private fun pushDevelopStyle(
        pickingAiDesignResults: List<PickingAiDesignResult>
    ) {
        pickingAiDesignResults.forEach { result ->
            //发送信息给开款
            val req = PickingStyleDevelopReq()
            req.taskId = result.developStyleTaskId
            req.pickingResultId = result.pickingResultId
            req.pickingStyleId = result.pickingStyleId
            req.result = result.pickingResult()

            val allPictures = pickingPushPicture(result)
            if (CollectionUtils.isEmpty(allPictures)) {
                log.info { "推送给开款任务失败，选款图片信息为空！" }
            }
            req.mainImgUrl = allPictures.firstOrNull()
            req.images = if (allPictures.size > 1) {
                allPictures.drop(1).mapNotNull { it }
            } else {
                emptyList()
            }

            req.storeId = result.storeId
            req.storeName = result.storeName
            req.wavebandCode = result.waveBandCode
            req.wavebandName = result.waveBandName
            req.taskSource = DevelopStyleTaskSourceEnum.AIGC.code

            log.info { "选款操作推送给开款任务信息:${req.toJson()}" }
            val developStyleTaskId = developStyleTaskService.pickingStyleDevelop(req)
            result.developStyleTaskId = developStyleTaskId
            pickingAiDesignResultRepository.updateById(result)
        }
    }

    private fun updatePickingAiDesign(pickingAiDesign: PickingAiDesign, req: PickingConfirmReq) {
        if (req.waveBandName.isNotBlank() || req.storeName.isNotBlank()) {
            pickingAiDesign.waveBandCode = req.waveBandCode
            pickingAiDesign.waveBandName = req.waveBandName
            pickingAiDesign.storeId = req.storeId
            pickingAiDesign.storeName = req.storeName
            pickingAiDesignRepository.updateById(pickingAiDesign)
        }
    }




    @Transactional(rollbackFor = [Exception::class])
    override fun batchConfirm(req: BatchPickingConfirmReq) {
        log.info { "批量选款\t${req.toJson()}" }
        req.confirms.forEach {
            this.confirm(
                PickingConfirmReq(
                    it.pickingId,
                    result = it.result.map { r ->
                        val c = PickingStyleConfirmReq(r.pickingStyleId, r.pickingState)
                        c.imageInfos = r.imageInfos
                        c.updateVersion = r.updateVersion
                        c
                    } as MutableList<@Valid PickingStyleConfirmReq>,
                    it.waveBandCode,
                    it.waveBandName,
                    it.storeId,
                    it.storeName
                )
            )
        }
    }

    // @Async("commonExecutor")
    override fun confirmMqRefactor(req: PickingConfirmReq) {
        val allData = req.result.filter { it.pickingState == 1 }
        if (allData.isNotEmpty()) {
            val pick = pickingAiDesignRepository.getById(req.pickingId) ?: throw BusinessException("选款ID不存在")
            val inspiration =
                inspirationRepository.getById(pick.inspirationId) ?: throw BusinessException("灵感源数据不存在")
            allData.map { r ->
                val pictureNmu = AtomicInteger(0)
                r.imageInfos?.map(
                    {
                        val picture = pickingAiDesignPictureRepository.getById(it.pickingPictureId)
                        try {
                            identifyClientExternal.createMq(
                                InspirationIdentifyReq(
                                    busId = picture.pickingPictureId,
                                    refImgUrl = picture.pictureUrl,
                                    taskAttribute = 0,
                                    callback = "",
                                    inputCategory = inspiration.identifiedCategory

                                ), "/mq"
                            )
                            pictureNmu.incrementAndGet()
                            val cachePicture: RBucket<Long> =
                                redissonClient.getBucket<Long>(IDENTIFY_DATA_CACHE_IMAGE + picture.pickingPictureId)
                            cachePicture.set(r.pickingStyleId)
                        } catch (e: Exception) {
                            log.error {
                                "confirmMqRefactor Message: ${e.stackTraceToString()}"
                            }
                        }
                    }
                )
                if (pictureNmu.get() == 0) {
                    confirmMq(PickingConfirmReq(pickingId = req.pickingId, result = mutableListOf(r)))
                } else {
                    val cacheData = PickingStyleConfirmMqCacheDto()
                    cacheData.pickingId = req.pickingId
                    cacheData.dataJson =
                        PickingConfirmReq(pickingId = req.pickingId, result = mutableListOf(r)).toJson()
                    cacheData.imageIds = r.imageInfos?.map { it.pickingPictureId!! }
                    val reqData: RBucket<String> = redissonClient.getBucket(IDENTIFY_DATA_CACHE + r.pickingStyleId)
                    reqData.set(cacheData.toJson())
                    val imageNum: RAtomicLong = redissonClient.getAtomicLong(IDENTIFY_DATA_CACHE_NUM + r.pickingStyleId)
                    imageNum.set(pictureNmu.toLong())
                }
            }
        }
    }

    override fun identifyCallback(req: IdentifyCallbackReq) {
        log.info { "identifyCallback req: ${req.toJson()}" }
        val taskStatus = TaskStatusEnum.of(req.taskStatus)
        if (taskStatus.completed()) {
            val pickingStyleId: RBucket<Long> = redissonClient.getBucket<Long>(IDENTIFY_DATA_CACHE_IMAGE + req.busId)
            val styleId = pickingStyleId.get()
            val lockKey = IDENTIFY_DATA_CACHE_NUM_LOCK + styleId
            val lock: RLock = redissonClient.getLock(lockKey)
            try {
                if (lock.tryLock(1, TimeUnit.MINUTES)) {
                    try {
                        val reqData: RBucket<String> = redissonClient.getBucket(IDENTIFY_DATA_CACHE + styleId)
                        val cacheData = reqData.get().parseObject<PickingStyleConfirmMqCacheDto>()
                        val imageNum: RAtomicLong = redissonClient.getAtomicLong(IDENTIFY_DATA_CACHE_NUM + styleId)
                        if (cacheData != null && cacheData.imageIds?.contains(req.busId) == true) {
                            val newNum = imageNum.decrementAndGet()  // 原子递减
                            if (newNum == 0L) {
                                var request = cacheData.dataJson.parseObject<PickingConfirmReq>()
                                request = request.apply {
                                    result = request.result.filter { it.pickingStyleId == styleId }.toMutableList()
                                }
                                log.info { "identifyCallback-req: $request" }
                                confirmMq(request)
                            } else {
                                imageNum.set(newNum)
                            }
                        }
                    } finally {
                        lock.unlock()
                    }
                } else {
                    // 未能获取锁，处理这种情况（例如，记录日志或重试）
                    log.warn { "Failed to acquire lock for styleId: $styleId" }
                }
            } catch (e: InterruptedException) {
                // 处理中断异常
                Thread.currentThread().interrupt()
                log.warn(e) { "${"Interrupted while trying to acquire lock for styleId: $styleId"}" }
            }
        }
    }

    //@Async("commonExecutor")
    override fun confirmMq(req: PickingConfirmReq) {
        val allData = req.result.filter { it.pickingState == 1 }
        if (allData.size > 0) {
            val pick = pickingAiDesignRepository.getById(req.pickingId) ?: throw BusinessException("选款ID不存在")
            val inspiration =
                inspirationRepository.getById(pick.inspirationId) ?: throw BusinessException("灵感源数据不存在")
            val design =
                aiDesignTaskRepository.getById(pick.designTaskId!!) ?: throw BusinessException("AI设计任务数据不存在")
            val result = pickingAiDesignResultRepository.selectListByPickingId(pick.pickingId!!)
            val fabricDetail = aiDesignTaskFabricRepository.getRecommendFabricDetailByTaskId(design.taskId)
            val label = inspirationLabelRepository.getLabelByInspirationId(inspiration.inspirationId!!)
            allData.map { r ->
                val mqDto = PickingStyleConfirmMqDto()
                mqDto.busId = businessCodeGenerator.generate(CodeRuleEnum.INSPIRATION_SUBMIT_CODE)
                mqDto.supplyMethodCode = inspiration.suggestedSupplyModeCode
                mqDto.waveBatchCode = inspiration.waveBatchCode
                mqDto.planningSourceCode = inspiration.planningSourceCode
                mqDto.countrySiteCode = inspiration.countrySiteCode
                mqDto.inspirationImageSourceCode = inspiration.inspirationImageSource
                mqDto.inspirationBrandCode = inspiration.inspirationBrandCode
                mqDto.modeCode = design.modeCode
                mqDto.modeName = design.modeName
                mqDto.externalCategory = inspiration.identifiedCategory
                mqDto.refWeight = design.refWeight
                mqDto.generateMode = design.generateMode
                mqDto.sceneInfo = design.sceneInfo.parseObject<AiDesignSceneBo>()
                mqDto.pictureCaption = mqDto.sceneInfo?.pictureCaption
                mqDto.modelInfo = design.modelInfo.parseObject<AiDesignModelBo>()
                mqDto.modelCaption = ""  //todo 没这个信息
                mqDto.filterBack = design.filterBack
                mqDto.faceRepair = design.faceRepair
                mqDto.promiseEnhanced = design.promiseEnhanced
                mqDto.generateNum = design.genCount
                mqDto.inspirationCode = inspiration.inspirationCode
                mqDto.inspirationImage = inspiration.inspirationImage
                mqDto.creatorName = inspiration.creatorName
                mqDto.inspirationCreatedTime = inspiration.inspirationCreatedTime
                mqDto.identifiedLabel = label.map { it ->
                    KeyValueBo().apply {
                        key = it.labelName
                        value = it.labelValueName
                    }
                }.takeIf { it.isNotEmpty() } ?: listOf(KeyValueBo().apply {
                    key = null
                    value = null
                })
                mqDto.aiTaskCode = result.takeIf { it.isNotEmpty() }?.get(0)?.designTaskCode
                mqDto.pickingStyleResultDetails = result.filter { it.pickingState == 1 }.flatMap {
                    PickingResultImageInfoBo.jsonToBoList(it.resultImageInfo)
                        .filter { image ->
                            r.imageInfos?.any { info -> info.pickingPictureId == image.pickingPictureId } ?: false
                        }
                }
                mqDto.mainImgUrl = mqDto.pickingStyleResultDetails
                    ?.filter { it.mainImageType == 1 }
                    ?.firstOrNull()
                    ?.pictureUrl
                mqDto.recommendFabricDetails = fabricDetail.filter { it.commodityId != null }
                mqDto.popularLabel = if (inspiration.popularCode.isNullOrEmpty()) {
                    mutableListOf(
                        KeyValueBo().apply {
                            key = null
                            value = null
                        }
                    )
                } else {
                    mutableListOf(
                        KeyValueBo().apply {
                            key = inspiration.popularCode
                            value = inspiration.popularName
                        }
                    )
                }
                mqDto.externalImageStyleCode = inspiration.styleCode
                mqDto.externalImageAgeCode = inspiration.ageCode
                mqDto.eliminateType = r.pickingState
                mqDto.selectorName = result.takeIf { it.isNotEmpty() }?.get(0)?.selectorName
                mqDto.selectionTime = result.takeIf { it.isNotEmpty() }?.get(0)?.selectionTime
                val identify = r.imageInfos?.mapNotNull { imageInfo ->
                    val smartIdentifyTaskVo = getSmartIdentifyResult(imageInfo.pickingPictureId!!)
                    smartIdentifyTaskVo?.let { taskVo ->
                        SmartIdentifyDto().apply {
                            styleType = taskVo.styleType
                            category = taskVo.category
                            categoryCode = taskVo.categoryCode
                            identifiedLabel = taskVo.clipLabelList?.takeIf { it.isNotEmpty() }?.map { clipLabel ->
                                KeyValueBo().apply {
                                    key = clipLabel.cn?.name
                                    value = clipLabel.cn?.values?.firstOrNull()?.name
                                }
                            } ?: listOf(KeyValueBo().apply {
                                key = null
                                value = null
                            })
                        }
                    } ?: run {
                        SmartIdentifyDto().apply {
                            styleType = null
                            category = null
                            categoryCode = null
                            identifiedLabel = listOf(KeyValueBo().apply {
                                key = null
                                value = null
                            })
                        }
                    }
                }?.toMutableList() ?: mutableListOf()
                mqDto.generateImageInfo = identify
                pushMq(mqDto, pick.pickingId, r.pickingStyleId, mqDto.aiTaskCode)
            }

        }
    }

    private fun pushMq(data: PickingStyleConfirmMqDto, pickingId: Long?, pickingStyleId: Long?, taskCode: String?) {
        val msg = Message(data.toJson().toByteArray())
        log.info { "pushMq: ${data.toJson()}" }
        val mqLog = MqLog();
        mqLog.busId = pickingId
        mqLog.subBusId = pickingStyleId
        mqLog.taskCode = taskCode
        mqLog.mqTime = LocalDateTime.now()
        mqLog.state = 1
        mqLog.msg = data.toJson()
        try {
            rabbitTemplate.send(MqConstant.PACKING_RESULT_CONFIRM_E, MqConstant.PACKING_RESULT_CONFIRM_R, msg)
        } catch (e: Exception) {
            mqLog.state = 0
            log.error {
                "pushMq errMessage: ${e.stackTraceToString()}"
            }
        } finally {
            mqLogRepository.save(mqLog)
        }
    }

    private fun getSmartIdentifyResult(pickingPictureId: Long): SmartIdentifyTaskVo? {
        return identifyClientExternal.getByBusId(pickingPictureId)
    }

    private fun filterStyle(
        pickingAiDesignStyle: PickingAiDesignStyle?,
        pickingStyleConfirmReq: PickingStyleConfirmReq
    ) = !(Objects.equals(
        pickingStyleConfirmReq.updateVersion,
        pickingAiDesignStyle?.updateVersion
    )        // 版本一致, 不需要修改
//            || pickingAiDesignStyle?.pickingState == PickingStateEnum.AVAILABLE.state    // 库中数据为已选中, 不需要修改,v4.1可以修改
            || pickingAiDesignStyle?.pickingState == pickingStyleConfirmReq.pickingState) // 库中数据状态和请求数据状态一致, 不需要修改


    private fun verifyConfirmParam(pickingId: Long?, selectedStyles: MutableList<@Valid PickingStyleConfirmReq>) {
        var pickingAiDesign = pickingAiDesignRepository.getById(pickingId) ?: throw BusinessException("选款ID不存在")
        selectedStyles.map { it.pickingStyleId }.let {
            val pickingAiDesignStyles = pickingAiDesignStyleRepository.listByIds(it)
            if (pickingAiDesignStyles.isEmpty()) {
                throw BusinessException("选款不存在")
            }
        }
        //this.validation()
        //如果是灵感来源的需要添加校验
     /*   if (pickingAiDesign.isInspiration()) {
            val styleGroup = selectedStyles.groupBy { it.pickingStyleId }
            val oldResults = pickingAiDesignResultRepository.selectListByPickingId(pickingId!!)
            if (CollectionUtils.isNotEmpty(oldResults)) {
                oldResults.forEach { t ->
                    if (null != t.developStyleTaskId && t.developStyleTaskId!! > 0L){
                        var developStyleTask = developStyleTaskRepository.obtainById(t.developStyleTaskId, "开款任务ID不存在")
                        val newResult = styleGroup[t.pickingStyleId]
                        if (CollectionUtils.isNotEmpty(newResult)){
                            if (t.pickingState == PickingStateEnum.AVAILABLE.state && developStyleTask.develop() && newResult!![0].pickingState == PickingStateEnum.NOT_SELECTED.state) {
                                log.info { "选款结果任务ID【${t.pickingResultId!!}】，选款数据原来状态是可用，并且已经开款，新的选款状态不能设置为不可用！" }
                                throw ValidationException("选款失败，选款数据原来是可用状态，并且已经开款，新的选款状态不能设置为不可用！！")
                            }
                        }
                    }
                }
            }
        }*/
    }

   /* private fun validation() {
        if (!SdpMaterialDesignerApi.designer()) {
            throw ValidationException("当前用户非设计师,不允许操作")
        }
    }*/

    /**
     * 选款结果 分页
     *
     * @param req 入参
     * @return
     */
    override fun pageResult(req: PickingStyleResultPageReq): PageVo<PickingStyleResultPageVo> {
        req.tenantId = CurrentUserHolder.get().tenantId
        // 1. 获取分页数据
        val pageData = pickingAiDesignResultRepository.selectListPage(req)

        if (pageData.records.isEmpty()) {
            return PageVo(req.pageNum, 0, listOf())
        }

        // 2. 批量获取关联数据
        val pickingAiDesignIds = pageData.records.mapNotNull { it.pickingId }.distinct()
        val pickingResultIds = pageData.records.mapNotNull { it.pickingResultId }.distinct()
        val inspirationIds = pageData.records.mapNotNull { it.inspirationId }.distinct()

        // 获取所有需要的关联数据(历史数据,兼容灵感图展示)
        val picking2024Map: Map<Long, PickingAiHistory2024> = pickingAiHistory2024Repository.list(
            KtQueryWrapper(PickingAiHistory2024::class.java).`in`(
                PickingAiHistory2024::pickingResultId,
                pickingResultIds
            )
        )
            .associateBy { it.pickingResultId!! }

        // 获取所有需要的关联数据
        val pickingAiDesignMap: Map<Long, PickingAiDesign> = pickingAiDesignRepository.listByIds(pickingAiDesignIds)
            .associateBy { it.pickingId!! }
        // 考虑可能为空的情况
        val inspirationMap: Map<Long?, Inspiration> = if (inspirationIds.isNullOrEmpty()) {
            emptyMap()
        } else {
            inspirationRepository.listByIds(inspirationIds)
                .associateBy { it.inspirationId }
        }

        // 获取字典数据
        val waveBatchDictCodeMap = dictClientExternal.getTopByDictCode(DictEnum.PLM_CLOTHING_BAND)
            ?.children
            ?.associateBy({ it.dictCode }, { it })

        val trayTypeDictCodeMap = dictClientExternal.getTopByDictCode(DictEnum.TRAY_TYPE)
            ?.children
            ?.associateBy({ it.dictCode }, { it })

        val printingDictCodeMap = dictClientExternal.getTopByDictCode(DictEnum.FD_PRINTING)
            ?.children
            ?.associateBy({ it.dictCode }, { it })


        // 4. 转换数据
        return PageVo(
            req.pageNum,
            pageData.total.toInt(),
            pageData.records.map { record ->
                convertToPickingStyleResultPageVo(
                    record,
                    pickingAiDesignMap,
                    picking2024Map,
                    inspirationMap,
                    waveBatchDictCodeMap,
                    trayTypeDictCodeMap,
                    printingDictCodeMap
                )
            }
        )
    }

    /**
     * 选款结果 详情
     *
     * @param pickingResultId
     * @return
     */
    override fun detailResult(pickingResultId: Long): PickingStyleResultDetailVo {
        val pickingResult =
            pickingAiDesignResultRepository.getById(pickingResultId) ?: throw BusinessException("选款结果不存在")
        val pickingAiDesign = pickingAiDesignRepository.getById(pickingResult.pickingId)
        var designTask: AiDesignTask? = null
        var designLabel: List<KeyValueBo>? = null
        var fabricDetail: List<RecommendFabricDetail>? = null
        if (pickingAiDesign != null && pickingAiDesign.designTaskId != null) {
            designTask = aiDesignTaskRepository.getById(pickingAiDesign.designTaskId!!)
            if (designTask != null) {
                designLabel = aiDesignTaskLabelRepository.getKvByTaskId(designTask.taskId)
                fabricDetail = aiDesignTaskFabricRepository.getRecommendFabricDetailByTaskId(designTask.taskId)
            }
        }

        return PickingStyleResultDetailVo().apply {
            openStyleState = pickingResult.openStyleState
            styleSpuCode = pickingResult.styleSpuCode ?: ""
            styleSkcCode = pickingResult.styleSkcCode ?: ""
            styleSpuCreateTime = pickingResult.styleSpuCreateTime
            styleEliminateReason = pickingResult.styleEliminateReason ?: ""
            if (pickingAiDesign != null) {
                inspirationDetail = PickingStyleResultDetailVo.InspirationDetail().apply {
                    inspirationImage = pickingAiDesign.inspirationImage
                    externalCategory = pickingAiDesign.externalCategory
                    dataSourceType = pickingAiDesign.dataSource
                    createdTime = pickingAiDesign.createdTime
                    creatorName = pickingAiDesign.creatorName
                    inspirationSourceType = pickingAiDesign.inspirationSourceType
                    countrySiteCode = pickingAiDesign.countrySiteCode
                    retailPrice = pickingAiDesign.retailPrice
                    salePrice = pickingAiDesign.salePrice
                    origin = pickingAiDesign.origin
                    sourceImage = pickingAiDesign.sourceImage
                    refImgUrl = pickingAiDesign.refImgUrl
                    pickingAiDesign.inspirationId?.let {
                        val inspiration = inspirationRepository.getById(it)
                        if (inspiration != null) {
                            inspirationBrand = inspiration.inspirationBrand
                        }
                    }
                }
            }
            if (designTask != null) {
                designTaskDetail = PickingStyleResultDetailVo.DesignTaskDetail().apply {
                    aiTaskCode = designTask.aiTaskCode
                    category = designTask.categoryName
                    styleType = designTask.styleType
                    generateMode = designTask.generateMode
                    bgEnhanced = designTask.filterBack
                    labels = designLabel
                }
            }
            if (PickingSourceTypeEnum.FLORAL_PATTERN.code.equals(pickingAiDesign.origin) ||
                PickingSourceTypeEnum.POSTURE_FISSION.code.equals(pickingAiDesign.origin)
            ) {
                designTaskDetail = PickingStyleResultDetailVo.DesignTaskDetail().apply {
                    aiTaskCode = pickingAiDesign.designTaskCode
                    category = pickingAiDesign.identifyCategoryName
                }
            }
            if (fabricDetail != null) {
                recommendFabricDetails = fabricDetail.filter { it.commodityId != null }
            }
            pickingDetail = pickingResult.let {
                val dto = PickingDetail()
                dto.pickingState = it.pickingState
                dto.selectorId = it.selectorId
                dto.selectorName = it.selectorName
                dto.imagePickingStartTime = it.selectionTime
                dto.suggestedPrice = it.suggestedPrice?.toString()
                dto.suggestedWaveBatchName = it.suggestedWaveBatchCode?.let { it1 ->
                    dictClientExternal.getByDictCode(
                        DictEnum.PLM_CLOTHING_BAND,
                        it1
                    )?.dictName
                }
                if (dto.suggestedWaveBatchName == null) {
                    dto.suggestedWaveBatchName = ""
                }
                dto.suggestedStyleName = it.suggestedStyleName
                dto.suggestedShopName = it.suggestedShopName
                dto.storeName = it.storeName
                dto.suggestedCountrySiteName = it.suggestedCountrySiteName
                dto.suggestedCategoryName = it.suggestedCategoryName
                dto.cargoTrayName =
                    it.cargoTrayCode?.let { it1 -> dictClientExternal.getByDictCode(DictEnum.TRAY_TYPE, it1)?.dictName }
                if (dto.cargoTrayName == null) {
                    dto.cargoTrayName = ""
                }
                dto.suggestedPrintingName = it.suggestedPrintingCode?.let { it1 ->
                    dictClientExternal.getByDictCode(
                        DictEnum.FD_PRINTING,
                        it1
                    )?.dictName
                }
                if (dto.suggestedPrintingName == null) {
                    dto.suggestedPrintingName = ""
                }
                dto.remark = it.remark
                dto.pickingStyleResultDetails = PickingResultImageInfoBo.jsonToBoList(it.resultImageInfo)
                // 特殊处理, 修复图覆盖原图
                dto.pickingStyleResultDetails = dto.pickingStyleResultDetails.map { dtit ->
                    dtit.pictureUrl = getPictureUrl(dtit.pictureUrl, dtit.repairImgUrl)
                    dtit
                }
                dto.sceneCode = it.sceneCode
                dto.sceneName = it.sceneName
                // 商品主题
                pickingResult.pickingStyleId?.let { it1 ->
                    pickingAiDesignStyleRepository.getById(it1)?.let { it2 ->
                        dto.productThemeName = it2.productThemeName
                    }
                }
                dto
            }
        }
    }

    /**
     * 查询选图历史记录
     *
     * @param pickingId 选款id
     * @return
     */
    override fun getPickingStyleHistory(pickingId: Long): List<PickingStyleHistoryVo> {
        val resultList = pickingAiDesignResultRepository.selectListByPickingId(pickingId)
        if (resultList.isEmpty()) {
            return listOf()
        }
        // key=字典值code,value=字典值vo
        val printingDictCodeMap =
            dictClientExternal.getTopByDictCode(DictEnum.FD_PRINTING)?.children?.associateBy({ it.dictCode }, { it })

        return resultList.map {
            val resp = PickingStyleHistoryVo()
            resp.selectorId = it.selectorId
            resp.selectorName = it.selectorName
            resp.selectionTime = it.selectionTime
            resp.pickingStyleResults = mutableListOf<PickingStyleResultDto>().apply {
                val dto = PickingStyleResultDto()
                dto.pickingStyleResultId = it.pickingResultId
                dto.pickingStyleResultDetails = PickingResultImageInfoBo.jsonToBoList(it.resultImageInfo)
                dto.pickingState = it.pickingState
                dto.suggestedPrice = it.suggestedPrice
                dto.serialNum = it.pickingStyleSort
                dto.suggestedStyle = it.suggestedStyleName
                dto.suggestedCategory = it.suggestedCategoryName
                dto.suggestedWave = it.suggestedWaveBatchCode
                dto.suggestedShopName = it.suggestedShopName
                dto.suggestedShopShortCode = it.suggestedShopCode
                dto.suggestedPrinting = printingDictCodeMap?.get(it.suggestedPrintingCode)?.dictName
                dto.suggestedCountrySite = it.suggestedCountrySiteName
                dto.remark = it.remark
                dto.attachments = AttachmentBo.jsonToBoList(it.attachments)
                this.add(dto)
            }
            resp
        }
    }

    /**
     * 导入选款
     *
     * @param file 文件
     * @return
     */
    override fun importPickingStyleList(file: MultipartFile): PickingStyleImportResultVo {
        val user = CurrentUserHolder.get()
        val result = PickingStyleImportResultVo()

        // 字典缓存 key=enum+name
        val dictNameMap = mapOf<String, DictVo?>()

        EasyExcel.read(
            file.inputStream,
            PickingStyleExcelImportDTO::class.java,
            object : AnalysisEventListener<PickingStyleExcelImportDTO>() {
                private val cachedDataList: MutableList<PickingStyleExcelImportDTO> = mutableListOf()

                override fun invoke(data: PickingStyleExcelImportDTO, context: AnalysisContext) {
                    // 在这里处理每一行数据，例如打印出来
                    var isError = false

                    // 抽出公共逻辑
                    fun checkField(check: Boolean, errorMessage: String) {
                        if (check) {
                            val failureDetail = FailureDetail()
                            failureDetail.rowNumber = context.readRowHolder().rowIndex + 1
                            failureDetail.reason = String.format(errorMessage, context.readRowHolder().rowIndex + 1)
                            result.failureDetails.add(failureDetail)
                            isError = true
                        }
                    }

                    fun checkFieldDict(dictName: String?, dictEnum: DictEnum, errorMessage: String) {
                        if (!dictName.isNullOrBlank()) {
                            val key = dictEnum.name + dictName
                            val dictVo: DictVo? = if (dictNameMap.containsKey(key)) {
                                dictNameMap[key]
                            } else {
                                dictClientExternal.getFirstByDictName(dictEnum, dictName)
                            }

                            if (dictVo == null) {
                                val failureDetail = FailureDetail()
                                failureDetail.rowNumber = context.readRowHolder().rowIndex + 1
                                failureDetail.reason = String.format(errorMessage, context.readRowHolder().rowIndex + 1)
                                result.failureDetails.add(failureDetail)
                                isError = true
                            }
                        }

                    }
                    // 校验
                    checkField(StringUtils.isBlank(data.planningSource), "'*企划来源'不能为空!")
                    checkField(StringUtils.isBlank(data.supplyMethod), "'*选择供给方式'不能为空!")
                    checkField(StringUtils.isBlank(data.waveBatchCode), "'*选择波次'不能为空!")
                    checkField(StringUtils.isBlank(data.inspirationSource), "'*灵感来源'不能为空!")
                    checkField(StringUtils.isBlank(data.inspirationImage), "'*灵感图URL'不能为空!")
                    checkField(StringUtils.isBlank(data.resultImage1), "'*结果图1'不能为空!")
                    // 校验字典
                    checkFieldDict(data.planningSource, DictEnum.PLANNING_SOURCE, "'*企划来源'字典不匹配!")
                    checkFieldDict(data.supplyMethod, DictEnum.SUPPLY_MODE, "'*选择供给方式'字典不匹配!")
                    checkFieldDict(data.waveBatchCode, DictEnum.PLM_CLOTHING_BAND, "'*选择波次'字典不匹配!")
                    if (isError) {
                        result.failCount += 1
                        return
                    }
                    cachedDataList.add(data)
                    result.successCount += 1
                }

                override fun doAfterAllAnalysed(p0: AnalysisContext?) {
                    // 保存数据
                    // 异步执行
                    Thread {
                        saveData()
                    }.start()
                }

                private fun saveData() {
                    if (CollectionUtils.isEmpty(cachedDataList)) {
                        log.warn { "没有数据，不进行存储" }
                        return
                    }

                    val pickingAiDesignList = mutableListOf<PickingAiDesign>()
                    val pickingAiDesignStyleList = mutableListOf<PickingAiDesignStyle>()
                    val pickingAiDesignPictureList = mutableListOf<PickingAiDesignPicture>()
                    cachedDataList.forEach { it ->
                        // 选款 picking_ai_design
                        val pickingAiDesign = PickingAiDesign()
                        pickingAiDesign.pickingId = IdHelper.getId()
                        pickingAiDesign.planningSourceCode = it.planningSource?.let { it1 ->
                            dictClientExternal.getFirstByDictName(
                                DictEnum.PLANNING_SOURCE,
                                it1
                            )?.dictCode
                        }
                        pickingAiDesign.planningSourceName = it.planningSource
                        pickingAiDesign.inspirationSourceType = it.inspirationSource
                        pickingAiDesign.dataSource = PickingDataSourceTypeEnum.IMPORT.content
                        pickingAiDesign.supplyMethodCode = SupplyModeEnum.getByDesc(it.supplyMethod)?.code.toString()
                        pickingAiDesign.supplyMethodName = it.supplyMethod
                        pickingAiDesign.waveBatchCode = it.waveBatchCode
                        pickingAiDesign.externalCategory = it.externalCategory
                        pickingAiDesign.inspirationImage = ""
                        pickingAiDesign.sourceImage = it.inspirationImage
                        pickingAiDesign.tenantId = user.tenantId
                        pickingAiDesignList.add(pickingAiDesign)

                        // 款式
                        val pickingAiDesignStyle = PickingAiDesignStyle()
                        pickingAiDesignStyle.pickingStyleId = IdHelper.getId()
                        pickingAiDesignStyle.pickingId = pickingAiDesign.pickingId
                        pickingAiDesignStyle.styleName = "款式1"
                        pickingAiDesignStyle.pickingState = PickingStateEnum.NOT_AVAILABLE.state
                        pickingAiDesignStyle.sort = 1
                        pickingAiDesignStyle.updateVersion = IdHelper.getId()
                        pickingAiDesignStyle.tenantId = user.tenantId
                        pickingAiDesignStyleList.add(pickingAiDesignStyle)
                        // 图片
                        it.getResultImagesMap().forEach { (index, image) ->
                            val pickingAiDesignPicture = PickingAiDesignPicture()
                            pickingAiDesignPicture.pickingPictureId = IdHelper.getId()
                            pickingAiDesignPicture.pickingId = pickingAiDesignStyle.pickingId
                            pickingAiDesignPicture.pickingStyleId = pickingAiDesignStyle.pickingStyleId
                            pickingAiDesignPicture.pictureUrl = ""
                            pickingAiDesignPicture.sourceUrl = image
                            pickingAiDesignPicture.groupNum = 1
                            pickingAiDesignPicture.serialNum = index
                            pickingAiDesignPicture.mainImageType = if (index == 1) {
                                YesOrNoEnum.YES.code
                            } else {
                                YesOrNoEnum.NO.code
                            }
                            pickingAiDesignPicture.fixImageType = YesOrNoEnum.NO.code
                            pickingAiDesignPicture.eliminateType = YesOrNoEnum.NO.code
                            pickingAiDesignPicture.tenantId = user.tenantId
                            pickingAiDesignPictureList.add(pickingAiDesignPicture)
                        }
                    }
                    // 手动事务
                    TransactionTemplate(transactionManager).executeWithoutResult {
                        pickingAiDesignList.let { pickingAiDesignRepository.saveBatch(it) }
                        pickingAiDesignStyleList.let { pickingAiDesignStyleRepository.saveBatch(it) }
                        pickingAiDesignPictureList.let { pickingAiDesignPictureRepository.saveBatch(it) }
                        TransactionHelper.afterCommitExecute {
                            // 开始处理
                            pickingImageComponent.handler(pickingAiDesignList.mapNotNull { it.pickingId })
                        }
                    }
                    log.info { "导入图片-${cachedDataList.size}条数据" }
                }
            }).sheet().doRead()
        return result
    }


    /**
     * 保存选款数据
     *
     * @param req
     */
    @Transactional(rollbackFor = [Exception::class])
    override fun createByType(req: PickingAddReq): Long {
        log.info { "AIGC选款接收推送信息:${req.toJson()}" }
        val pickingId = when (req.businessTypeEnum) {
            PickingTypeEnum.INSPIRATION -> createByInspiration(req)
            PickingTypeEnum.PROTOTYPE_MANAGE
                , PickingTypeEnum.SPOT_STYLE
                , PickingTypeEnum.UPLOAD-> createByPrototype(req)
            else -> throw IllegalArgumentException("不支持的业务类型: ${req.businessTypeEnum}")
        }
        return pickingId
    }

    private fun createByInspiration(req: PickingAddReq) : Long {
        return UserInvoke.doAction(
            userId = req.creatorId!!,
            userName = req.creatorName!!,
            tenantId = req.tenantId!!
        ) {
            var user = CurrentUserHolder.get()
            val inspiration =
                inspirationRepository.getById(req.sendTypeId) ?: throw BusinessException("灵感源数据不存在")
            val pickings = this.pickingAiDesignRepository.listByDesignTaskCodeAndOrigin(
                req.pickingAddDto!!.busCode ?: "",
                req.origin!!
            )
            if (CollectionUtils.isNotEmpty(pickings)) {
                log.info { "选款任务【${req.pickingAddDto!!.busId}】已经存在，选款来源：【${req.origin}】" }
                return@doAction 0L
            }
            // 设置创建用户为 AI任务的创建人(不设置会导致选款的创建人为系统用户)
            if (req.creatorId != null && !req.creatorName.isNullOrBlank()) {
                user = CurrentUser(
                    id = req.creatorId!!,
                    name = req.creatorName!!,
                    code = "",
                    tenantId = req.tenantId!!,
                    false
                )
                DefaultCurrentUserContentSetter.set(user)
            }

            /*
            组装选款数据
            picking_ai_design
            picking_ai_design_style
            picking_ai_design_picture
             */
            val pickingAiDesign = PickingAiDesign()
            pickingAiDesign.pickingId = IdHelper.getId()
            pickingAiDesign.inspirationId = inspiration.inspirationId
            pickingAiDesign.inspirationImage = inspiration.inspirationImage
            pickingAiDesign.inspirationSourceType = inspiration.inspirationImageSource
            pickingAiDesign.waveBatchCode = null
            pickingAiDesign.planningSourceCode = inspiration.planningSourceCode
            pickingAiDesign.planningSourceName = inspiration.planningSourceName
            pickingAiDesign.supplyMethodCode =  req.supplyMethodCode
            pickingAiDesign.supplyMethodName = SupplyModeEnum.getDescByCode(req.supplyMethodCode)

            //使用姿势裂变信息进行填充
            pickingAiDesign.designTaskId = req.pickingAddDto!!.busId
            pickingAiDesign.designTaskCode = req.pickingAddDto!!.busCode
            pickingAiDesign.productLink = inspiration.productLink
            pickingAiDesign.sendTypeId = inspiration.inspirationId
            pickingAiDesign.sendTypeCode = inspiration.inspirationCode
            pickingAiDesign.sendType = PickingTypeEnum.INSPIRATION.code
            pickingAiDesign.refImgUrl = req.pickingAddDto!!.refImgUrl
            pickingAiDesign.dataSource = PickingSourceTypeEnum.getDescByCode(req.origin)
            pickingAiDesign.origin = req.origin
            pickingAiDesign.countrySiteCode = inspiration.countrySiteCode
            pickingAiDesign.countrySiteName = inspiration.countrySiteName
            pickingAiDesign.externalCategory = inspiration.externalCategory
            pickingAiDesign.identifyCategoryCode = inspiration.identifiedCategoryCode
            pickingAiDesign.identifyCategoryName = inspiration.identifiedCategory
            pickingAiDesign.retailPrice = inspiration.retailPrice
            pickingAiDesign.salePrice = inspiration.salePrice
            pickingAiDesign.tenantId = user.tenantId
            pickingAiDesignRepository.save(pickingAiDesign)

            buildPickingStyleListAndSave(req, pickingAiDesign, user)

            // 推送消息给xiniu
            if (SpringContextHolder.getProperty("spring.profiles.active")?.contains("xiniu") ?: false) {
                PickingStyleServiceImpl.log.info { "xiniu环境推送选款-${PickingSourceTypeEnum.getDescByCode(req.origin)}" }
                TransactionHelper.afterCommitExecute {
                    pickingStylePushService.push2XiniuByInspiration(pickingAiDesign.pickingId!!, req)
                }
            } else {
                PickingStyleServiceImpl.log.info { "非xiniu环境无需推送选款数据" }
            }
            return@doAction pickingAiDesign.pickingId!!
        }
    }



    private fun createByPrototype(req: PickingAddReq): Long {
        return UserInvoke.doAction(
            userId = req.creatorId!!,
            userName = req.creatorName!!,
            tenantId = req.tenantId!!
        ) {
            log.info { "款式管理推送创建选款信息开始" }
            var user = CurrentUserHolder.get()
            val pickings = this.pickingAiDesignRepository.listByDesignTaskCodeAndOrigin(
                req.pickingAddDto!!.busCode ?: "",
                req.origin!!
            )
            if (CollectionUtils.isNotEmpty(pickings)) {
                log.info { "选款任务【${req.pickingAddDto!!.busId}】已经存在，选款来源：【${req.origin}】" }
                return@doAction 0L
            }
            // 设置创建用户为 AI任务的创建人(不设置会导致选款的创建人为系统用户)
            if (req.creatorId != null && !req.creatorName.isNullOrBlank()) {
                user = CurrentUser(
                    id = req.creatorId!!,
                    name = req.creatorName!!,
                    code = "",
                    tenantId = req.tenantId!!,
                    false
                )
                DefaultCurrentUserContentSetter.set(user)
            }

            /*
            组装选款数据
            picking_ai_design
            picking_ai_design_style
            picking_ai_design_picture
             */
            val pickingAiDesign = PickingAiDesign()
           /* if (PickingTypeEnum.prototypeManage(req.businessTypeEnum!!.code)) {
                var pictures = designStyleMaterialRepository.listByStyleCodesAndType(
                    listOf(req.sendTypeCode!!),
                    DesignStyleMaterialTypeEnum.IMAGE.code
                )
                if (CollectionUtils.isEmpty(pictures)) {
                    log.info { "选款任务【${req.pickingAddDto!!.busId}】异常，款式管理没有图片信息，任务编码：【${req.sendTypeCode!!}】" }
                    return@doAction 0L
                }
                pickingAiDesign.inspirationImage = pictures[0].materialUrl
            } else if (PickingTypeEnum.isSpot(req.businessTypeEnum!!.code)) {
                var spot = spotStyleTaskRepository.getById(req.sendTypeId!!)
                if (null == spot) {
                    log.info { "选款任务【${req.pickingAddDto!!.busId}】异常，现货管理没有任务信息，任务ID：【${req.sendTypeId!!}】" }
                    return@doAction 0L
                }
                pickingAiDesign.inspirationImage = spot.mainImgUrl
            }*/
            pickingAiDesign.pickingId = IdHelper.getId()
            pickingAiDesign.waveBatchCode = null
            pickingAiDesign.inspirationImage = req.pickingAddDto!!.refImgUrl

            pickingAiDesign.supplyMethodCode = req.supplyMethodCode
            pickingAiDesign.supplyMethodName = SupplyModeEnum.getDescByCode(req.supplyMethodCode)

            //使用款式信息
            pickingAiDesign.designTaskId = req.pickingAddDto!!.busId
            pickingAiDesign.designTaskCode = req.pickingAddDto!!.busCode

            pickingAiDesign.sendTypeId = req.sendTypeId
            pickingAiDesign.sendTypeCode = req.sendTypeCode
            pickingAiDesign.skcId = req.skcId
            pickingAiDesign.skcCode = req.skcCode

            pickingAiDesign.sendType = req.businessTypeEnum!!.code

            pickingAiDesign.refImgUrl = req.pickingAddDto!!.refImgUrl
            pickingAiDesign.dataSource = PickingSourceTypeEnum.getDescByCode(req.origin)
            pickingAiDesign.origin = req.origin
            pickingAiDesign.tenantId = user.tenantId
            pickingAiDesignRepository.save(pickingAiDesign)
            buildPickingStyleListAndSave(req, pickingAiDesign, user)

            // 推送消息给xiniu
            if (SpringContextHolder.getProperty("spring.profiles.active")?.contains("xiniu") ?: false) {
                PickingStyleServiceImpl.log.info { "xiniu环境-非灵感源创建数据推送选款-${PickingSourceTypeEnum.getDescByCode(req.origin)}" }
                TransactionHelper.afterCommitExecute {
                    pickingStylePushService.push2XiniuByUserUpload(pickingAiDesign.pickingId!!, req)
                }
            } else {
                PickingStyleServiceImpl.log.info { "非xiniu环境无需推送选款数据" }
            }
            return@doAction pickingAiDesign.pickingId!!
        }

    }


    private fun buildPickingStyleListAndSave(
        req: PickingAddReq,
        pickingAiDesign: PickingAiDesign,
        user: CurrentUser,
    ) {
        val pickingStyleList = mutableListOf<PickingAiDesignStyle>()
        val pickingPicList = mutableListOf<PickingAiDesignPicture>()
        req.resImgList!!
            .groupBy { it.groupNum }
            .forEach { (group, postureDtos) ->
                val pickingAiDesignStyle = PickingAiDesignStyle().apply {
                    pickingStyleId = IdHelper.getId()
                    pickingId = pickingAiDesign.pickingId
                    pickingState = PickingStateEnum.NOT_AVAILABLE.state
                    styleName = "款式$group"
                    sort = group
                    updateVersion = IdHelper.getId()
                    tenantId = user.tenantId
                }
                pickingStyleList.add(pickingAiDesignStyle)
                var index = 0
                postureDtos.forEach { postureDto ->
                    postureDto.resImgList?.forEach { resRepairImg ->
                        val pickingAiDesignPicture = PickingAiDesignPicture().apply {
                            pickingPictureId = IdHelper.getId()
                            pickingId = pickingAiDesignStyle.pickingId
                            pickingStyleId = pickingAiDesignStyle.pickingStyleId
                            pictureUrl = resRepairImg.resImg
                            repairImgUrl = resRepairImg.repairImg
                            groupNum = postureDto.groupNum
                            serialNum = resRepairImg.serialNum
                            mainImageType = if (index == 0) YesOrNoEnum.YES.code else YesOrNoEnum.NO.code
                            fixImageType = YesOrNoEnum.NO.code
                            eliminateType = YesOrNoEnum.NO.code
                            tenantId = user.tenantId
                        }
                        pickingPicList.add(pickingAiDesignPicture)
                        index += 1
                    }
                }
            }
        if (pickingStyleList.isNotEmpty()) {
            pickingAiDesignStyleRepository.saveBatch(pickingStyleList)
        }
        if (pickingPicList.isNotEmpty()) {
            pickingAiDesignPictureRepository.saveBatch(pickingPicList)
        }
    }

    override fun createByPatternApply(req: PatternApplyPickingReq): Long {
        return UserInvoke.doAction(
            userId = req.creatorId!!,
            userName = req.creatorName!!,
            tenantId = req.tenantId!!
        ) {
            var user = CurrentUserHolder.get()
            val inspiration =
                inspirationRepository.getById(req.inspirationId) ?: throw BusinessException("灵感源数据不存在")
            val pickings = this.pickingAiDesignRepository.listByDesignTaskCode(req.patternApplyTask!!.taskCode ?: "")
            if (CollectionUtils.isNotEmpty(pickings)) {
                log.info { "选款-花型上身【${req.patternApplyTask!!.taskCode}】已经存在" }
                return@doAction 0L
            }
            // 设置创建用户为 AI任务的创建人(不设置会导致选款的创建人为系统用户)
            if (req.creatorId != null && !req.creatorName.isNullOrBlank()) {
                user = CurrentUser(
                    id = req.creatorId!!,
                    name = req.creatorName!!,
                    code = "",
                    tenantId = req.tenantId!!,
                    false
                )
                DefaultCurrentUserContentSetter.set(user)
            }

            val pickingAiDesign = PickingAiDesign()
            pickingAiDesign.pickingId = IdHelper.getId()
            pickingAiDesign.inspirationId = inspiration.inspirationId
            pickingAiDesign.inspirationImage = inspiration.inspirationImage
            pickingAiDesign.sendTypeId = inspiration.inspirationId
            pickingAiDesign.sendTypeCode = inspiration.inspirationCode
            pickingAiDesign.sendType = PickingTypeEnum.INSPIRATION.code
            pickingAiDesign.inspirationSourceType = inspiration.inspirationImageSource
            pickingAiDesign.waveBatchCode = null
            pickingAiDesign.planningSourceCode = inspiration.planningSourceCode
            pickingAiDesign.planningSourceName = inspiration.planningSourceName
            pickingAiDesign.supplyMethodCode = SupplyModeEnum.AIGC.code
            pickingAiDesign.supplyMethodName = SupplyModeEnum.AIGC.desc
            //使用姿势裂变信息进行填充
            pickingAiDesign.designTaskId = req.patternApplyTask!!.taskId
            pickingAiDesign.designTaskCode = req.patternApplyTask!!.taskCode
            pickingAiDesign.productLink = inspiration.productLink
            pickingAiDesign.dataSource = PickingDataSourceTypeEnum.FLORAL_PATTERN.content
            pickingAiDesign.origin = PickingSourceTypeEnum.FLORAL_PATTERN.code
            pickingAiDesign.countrySiteCode = inspiration.countrySiteCode
            pickingAiDesign.countrySiteName = inspiration.countrySiteName
            pickingAiDesign.externalCategory = inspiration.externalCategory
            pickingAiDesign.identifyCategoryCode = inspiration.identifiedCategoryCode
            pickingAiDesign.identifyCategoryName = inspiration.identifiedCategory
            pickingAiDesign.retailPrice = inspiration.retailPrice
            pickingAiDesign.salePrice = inspiration.salePrice
            pickingAiDesign.tenantId = user.tenantId
            pickingAiDesign.sourceImage =
                req.patternApplyTask!!.patternApplyGarmImgUrls?.parseJsonList(String::class.java)?.first()
            pickingAiDesignRepository.save(pickingAiDesign)

            val pickingStyleList = mutableListOf<PickingAiDesignStyle>()
            val pickingPicList = mutableListOf<PickingAiDesignPicture>()
            req.imgGroupList!!
                .groupBy { it.groupNum }
                .forEach { (group, postureDtos) ->
                    val pickingAiDesignStyle = PickingAiDesignStyle().apply {
                        pickingStyleId = IdHelper.getId()
                        pickingId = pickingAiDesign.pickingId
                        pickingState = PickingStateEnum.NOT_AVAILABLE.state
                        styleName = "款式$group"
                        sort = group
                        updateVersion = IdHelper.getId()
                        tenantId = user.tenantId
                    }
                    pickingStyleList.add(pickingAiDesignStyle)
                    var index = 0
                    postureDtos.forEach { postureDto ->
                        postureDto.resImgList?.forEach { resRepairImg ->
                            val pickingAiDesignPicture = PickingAiDesignPicture().apply {
                                pickingPictureId = IdHelper.getId()
                                pickingId = pickingAiDesignStyle.pickingId
                                pickingStyleId = pickingAiDesignStyle.pickingStyleId
                                pictureUrl = resRepairImg.resImg
                                repairImgUrl = resRepairImg.repairImg
                                groupNum = postureDto.groupNum
                                serialNum = resRepairImg.serialNum
                                mainImageType = if (index == 0) YesOrNoEnum.YES.code else YesOrNoEnum.NO.code
                                fixImageType = YesOrNoEnum.NO.code
                                eliminateType = YesOrNoEnum.NO.code
                                tenantId = user.tenantId
                            }
                            pickingPicList.add(pickingAiDesignPicture)
                            index += 1
                        }
                    }
                }
            if (pickingStyleList.isNotEmpty()) {
                pickingAiDesignStyleRepository.saveBatch(pickingStyleList)
            }
            if (pickingPicList.isNotEmpty()) {
                pickingAiDesignPictureRepository.saveBatch(pickingPicList)
            }

            // 推送消息给xiniu
            if (SpringContextHolder.getProperty("spring.profiles.active")?.contains("xiniu") ?: false) {
                PickingStyleServiceImpl.log.info { "xiniu环境推送选款-花型上身" }
                TransactionHelper.afterCommitExecute {
                    pickingStylePushService.push2XiniuByPatternApply(pickingAiDesign.pickingId!!, req)
                }
            } else {
                PickingStyleServiceImpl.log.info { "非xiniu环境无需推送选款-花型上身" }
            }
            return@doAction pickingAiDesign.pickingId!!
        }
    }

    override fun savePickingBySmartDesignUpload(
        result: SmartDesignTaskVo,
        vo: SmartDevelopStyleTaskExternalDetailVo
    ) {
        val push = PickStyleConvert.pickingBySmartDesignUpload(result,vo)
        createByType(push)
    }



    /**
     * 保存选款数据
     *
     * @param businessId
     * @param dataSourceEnum
     */
    @Transactional(rollbackFor = [Exception::class])
    override fun savePicking(businessId: Long, dataSourceEnum: PickingDataSourceTypeEnum) {
        var user = CurrentUserHolder.get()
        UserInvoke.doAction(
            userId = user.id!!,
            userName = user.name!!,
            tenantId = user.tenantId!!
        ) {
            val aiDesignTask =
                aiDesignTaskRepository.getByBusinessId(businessId) ?: throw BusinessException("AI设计任务不存在")
            val aiDesignTaskPictureList = aiDesignTaskPictureRepository.listByTaskId(aiDesignTask.taskId)

            val inspiration =
                inspirationRepository.getById(aiDesignTask.inspirationId) ?: throw BusinessException("灵感源数据不存在")
            val pickings = this.pickingAiDesignRepository.listByDesignTaskCode(aiDesignTask.aiTaskCode ?: "")
            if (CollectionUtils.isNotEmpty(pickings)) {
                log.info { "选款-AI设计【${businessId}】已经存在" }
                return@doAction
            }
            // 设置创建用户为 AI任务的创建人(不设置会导致选款的创建人为系统用户)
            if (aiDesignTask.creatorId != null && !aiDesignTask.creatorName.isNullOrBlank()) {
                user = CurrentUser(
                    id = aiDesignTask.creatorId!!,
                    name = aiDesignTask.creatorName!!,
                    code = "",
                    tenantId = aiDesignTask.tenantId!!,
                    false
                )
                DefaultCurrentUserContentSetter.set(user)
            }

            /*
            组装选款数据
            picking_ai_design
            picking_ai_design_style
            picking_ai_design_picture
             */
            val log = submitDownstreamLogRepository.getByBusinessId(businessId)

            val pickingAiDesign = PickingAiDesign()
            pickingAiDesign.pickingId = IdHelper.getId()
            pickingAiDesign.inspirationId = inspiration.inspirationId
            pickingAiDesign.inspirationImage = inspiration.inspirationImage
            pickingAiDesign.inspirationSourceType = inspiration.inspirationImageSource
            pickingAiDesign.waveBatchCode = log?.waveBatchCode
            pickingAiDesign.planningSourceCode = inspiration.planningSourceCode
            pickingAiDesign.planningSourceName = inspiration.planningSourceName
            pickingAiDesign.supplyMethodCode = SupplyModeEnum.AIGC.code
            pickingAiDesign.supplyMethodName = SupplyModeEnum.AIGC.desc
            pickingAiDesign.origin = PickingSourceTypeEnum.SMART_DEVELOP_STYLE.code
            pickingAiDesign.designTaskId = aiDesignTask.taskId
            pickingAiDesign.designTaskCode = aiDesignTask.aiTaskCode
            pickingAiDesign.productLink = inspiration.productLink
            pickingAiDesign.dataSource = dataSourceEnum.content
            pickingAiDesign.countrySiteCode = inspiration.countrySiteCode
            pickingAiDesign.countrySiteName = inspiration.countrySiteName
            pickingAiDesign.externalCategory = inspiration.externalCategory
            pickingAiDesign.identifyCategoryCode = inspiration.identifiedCategoryCode
            pickingAiDesign.identifyCategoryName = inspiration.identifiedCategory
            pickingAiDesign.retailPrice = inspiration.retailPrice
            pickingAiDesign.salePrice = inspiration.salePrice
            pickingAiDesign.tenantId = user.tenantId
            pickingAiDesignRepository.save(pickingAiDesign)

            val pickingStyleList = mutableListOf<PickingAiDesignStyle>()
            val pickingPicList = mutableListOf<PickingAiDesignPicture>()
            aiDesignTaskPictureList
                .groupBy { it.groupNum }
                .forEach { (groupNum, images) ->
                    val pickingAiDesignStyle = PickingAiDesignStyle()
                    pickingAiDesignStyle.pickingStyleId = IdHelper.getId()
                    pickingAiDesignStyle.pickingId = pickingAiDesign.pickingId
                    pickingAiDesignStyle.pickingState = PickingStateEnum.NOT_AVAILABLE.state
                    pickingAiDesignStyle.styleName = "款式$groupNum"
                    pickingAiDesignStyle.sort = groupNum
                    pickingAiDesignStyle.updateVersion = IdHelper.getId()
                    pickingAiDesignStyle.tenantId = user.tenantId
                    pickingStyleList.add(pickingAiDesignStyle)

                    var index = 0
                    images.forEach {
                        val pickingAiDesignPicture = PickingAiDesignPicture()
                        pickingAiDesignPicture.pickingPictureId = IdHelper.getId()
                        pickingAiDesignPicture.pickingId = pickingAiDesignStyle.pickingId
                        pickingAiDesignPicture.pickingStyleId = pickingAiDesignStyle.pickingStyleId
                        pickingAiDesignPicture.pictureUrl = it.pictureUrl
                        pickingAiDesignPicture.repairImgUrl = it.repairImgUrl
                        pickingAiDesignPicture.groupNum = it.groupNum
                        pickingAiDesignPicture.serialNum = it.serialNum
                        pickingAiDesignPicture.mainImageType = if (index == 0) {
                            YesOrNoEnum.YES.code
                        } else YesOrNoEnum.NO.code
                        pickingAiDesignPicture.fixImageType = YesOrNoEnum.NO.code
                        pickingAiDesignPicture.eliminateType = YesOrNoEnum.NO.code
                        pickingAiDesignPicture.tenantId = user.tenantId
                        pickingPicList.add(pickingAiDesignPicture)
                        index += 1
                    }
                }
            if (pickingStyleList.isNotEmpty()) {
                pickingAiDesignStyleRepository.saveBatch(pickingStyleList)
            }
            if (pickingPicList.isNotEmpty()) {
                pickingAiDesignPictureRepository.saveBatch(pickingPicList)
            }

            // 推送消息给xiniu
            if (SpringContextHolder.getProperty("spring.profiles.active")?.contains("xiniu") ?: false) {
                PickingStyleServiceImpl.log.info { "xiniu环境推送选款" }
                TransactionHelper.afterCommitExecute {
                    pickingStylePushService.push2Xiniu(pickingAiDesign.pickingId!!)
                }
            } else {
                PickingStyleServiceImpl.log.info { "非xiniu环境无需推送选款" }
            }
        }
    }

    /**
     * 查询统计供给数量
     *
     * @param req
     * @return
     */
    override fun getTotalSupplyQuantity(req: TotalSupplyQuantityReq): TotalSupplyQuantityResp {
        // 获取企划总数
        val totalReq = PlanningSupplyQuantityReq().apply {
            this.categoryCode = req.categoryCode
            this.supplyModeCode = req.supplyModeCode
            this.shopId = req.shopId
        }
        val totalResp = planningClientExternal.getSupplyQuantity(totalReq)
        // 获取总数
        val finishTotalQuantity = pickingAiDesignStyleRepository.getTotalQuantity(req)
        return TotalSupplyQuantityResp().apply {
            this.categoryCode = req.categoryCode
            this.supplyModeCode = req.supplyModeCode
            this.shopId = req.shopId
            this.planningTotalQuantity = totalResp?.totalQuantity ?: 0
            this.finishTotalQuantity = finishTotalQuantity.toInt()
        }
    }

    override fun exportPickingResults(response: HttpServletResponse, req: PickingStyleResultPageReq) {
        req.pageNum = 1
        req.pageSize = 500

        val allData = mutableListOf<PickingResultExportDTO>()

        while (true) {
            req.fixImageType = YesOrNoEnum.YES.code
            val pageData = pageResult(req)

            if (pageData.list.isEmpty()) break

            pageData.list.forEach { record ->
                val problemImageUrls = record.pickingStyleResultDetails
                    .filter { it.fixImageType == YesOrNoEnum.YES.code }
                    .map { it.pictureUrl ?: "" }

                val dto = PickingResultExportDTO(
                    designTaskId = record.designTaskId,
                    designTaskCode = record.designTaskCode,
                    inspirationCode = record.inspirationCode,
                    problemImages = problemImageUrls,
                    attachments = record.attachments.joinToString(",") { it.fileUrl ?: "" },
                    selectorName = record.selectorName,
                    selectionTime = record.selectionTime?.format(DATE_TIME_FORMATTER),
                    openStyleState = PickingOpenStyleStateEnum.getByCode(record.openStyleState)?.desc,
                    styleSpuCode = record.styleCode,
                    remark = record.remark
                )
                allData.add(dto)
            }

            req.pageNum += 1
        }

        val fileName = "修图数据" + businessCodeGenerator.generate(CodeRuleEnum.PICKING_RESULTS_EXPORT) + ".xlsx"

        try {
            exportExcelEntityDynamic(fileName, response, allData)
        } catch (e: IOException) {
            log.error(e) { "导出失败: ${e.message}" }
            throw BusinessException("导出失败: ${e.message}")
        }
    }

    override fun exportPickingResultImage(req: PickingStyleResultPageReq): List<PickingResultImageResp> {
        req.pageNum = 1
        req.pageSize = 1000
        val pageData = pageResult(req)
        val list = pageData.list
        if (CollectionUtils.isEmpty(list)) {
            return listOf()
        }
        return list.map {
            PickingResultImageResp(
                it.designTaskCode,
                it.pickingStyleResultDetails
            )
        }
    }

    override fun exportAIGCResults(response: HttpServletResponse, req: PickingStylePageReq) {
        req.pageNum = 1
        req.pageSize = 500
        val allData = mutableListOf<PickingStylePageVo>()
        val dataList = mutableListOf<AIGCExportDTO>()
        while (true) {
            val pageData = pickingAiDesignRepository.selectListPage(req)
            if (pageData.records.isEmpty() || pageData.records.isEmpty()) {
                break
            }
            req.pageNum += 1
            // 获取款式数据
            val pickingIds = pageData.records.mapNotNull { it.pickingId }.distinct()
            val pickingAiDesignStyleList =
                pickingAiDesignStyleRepository.selectByPickingIds(pickingIds, req.pickingState)
            val pickingAiDesignStyleMap = pickingAiDesignStyleList.groupBy { it.pickingId }

            // 获取款式图片数据
            val pickingStyleIds = pickingAiDesignStyleList.mapNotNull { it.pickingStyleId }.distinct()
            val pickingAiDesignPictureList = pickingAiDesignPictureRepository.selectByPickingStyleIds(pickingStyleIds)
            val pickingAiDesignPictureMap = pickingAiDesignPictureList.groupBy { it.pickingStyleId }

            // 组装

            pageData.records.map {
                val resp = PickingStylePageVo()
                resp.pickingId = it.pickingId
                resp.taskCode = it.designTaskCode //任务编码
                resp.creatorName = it.creatorName
                resp.createdTime = it.createdTime
                resp.identifyCategoryName = it.identifyCategoryName
                resp.pickingStyleDetails = mutableListOf<PickingStylePageResultDetailVo>().apply {
                    if (it.designTaskCode != null) {
                        val smart = smartDevelopClient.checkSmartDevelopDetail(it.designTaskCode.toString()).data
                        if (null != smart) {
                            resp.modeName = smart.modeName
                            resp.aiModelUrl = smart.aiModelUrl
                            resp.picturePath = smart.picturePath
                            resp.refWeight = smart.refWeight
                            resp.referencePicture = smart.referencePicture
                        }

                    }
                    pickingAiDesignStyleMap[it.pickingId]?.forEach { pickingAiDesignStyle ->
                        val styleVo = PickingStylePageResultDetailVo()
                        styleVo.pickingStyleName = pickingAiDesignStyle.styleName //款式
                        styleVo.pickingState = pickingAiDesignStyle.pickingState //款式
                        styleVo.selectionTime = pickingAiDesignStyle.selectionTime
                        styleVo.selectorName = pickingAiDesignStyle.selectorName
                        styleVo.pickingStyleImages = mutableListOf<PickingStylePageResultImageVo>().apply {
                            pickingAiDesignPictureMap[pickingAiDesignStyle.pickingStyleId]?.forEach { pickingAiDesignPicture ->
                                val imageVo = PickingStylePageResultImageVo()
                                imageVo.pictureUrl =
                                    getPictureUrl(
                                        pickingAiDesignPicture.pictureUrl,
                                        pickingAiDesignPicture.repairImgUrl
                                    )
                                imageVo.repairImgUrl = pickingAiDesignPicture.repairImgUrl
                                this.add(imageVo)
                            }
                        }
                        this.add(styleVo)
                    }
                }
                // 是否选过
                allData.add(resp)
            }
        }

        allData.forEach { record ->
            record.pickingStyleDetails?.forEach { detail ->
                val dto = AIGCExportDTO().apply {
                    styleName = detail.pickingStyleName ?: ""
                    state = when (detail.pickingState) {
                        0 -> "未选择"
                        1 -> "可用"
                        2 -> "不可用"
                        else -> "未选择"
                    }
                    modeName = record.modeName
                    aiModelUrl = record.aiModelUrl
                    picturePath = record.picturePath
                    refWeight = record.refWeight?.toString()
                    referencePicture = record.referencePicture
                    creatorName = record.creatorName
                    createdTime = record.createdTime?.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) ?: ""
                    selectorName = detail.selectorName
                    selectionTime =
                        detail.selectionTime?.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) ?: ""
                    taskCode = record.taskCode ?: ""
                    identifyCategoryName = record.identifyCategoryName
                    val images = detail.pickingStyleImages ?: emptyList()
                    image1 = images.getOrNull(0)?.pictureUrl ?: ""
                    image2 = images.getOrNull(1)?.pictureUrl ?: ""
                    image3 = images.getOrNull(2)?.pictureUrl ?: ""
                    image4 = images.getOrNull(3)?.pictureUrl ?: ""
                }

                dataList.add(dto)
            }
        }
        val fileName = "AIGC选款" + businessCodeGenerator.generate(CodeRuleEnum.INSPIRATION_EXPORT) + ".xlsx"
        try {
            FileExportUtils.exportExcelEntity(fileName, response, AIGCExportDTO::class.java, dataList)
        } catch (e: IOException) {
            log.error(e) { "导出失败:" }
            throw BusinessException("导出失败")
        }


    }

    /**
     * 推送选款到sdp-design
     */
    @Transactional(rollbackFor = [Exception::class])
    override fun pushPickingResult() {
        // 查待推送的选款数据
        val results: List<PickingAiDesignResult> = pickingAiDesignResultRepository.listAwait()
        log.info { "pushPickingResult size = ${results.size}" }
        if (results.isEmpty()) {
            return
        }
        results.forEach { pickResult ->
            withUser(
                CurrentUser(
                    pickResult.creatorId ?: 0, pickResult.creatorName ?: "", "",
                    pickResult.tenantId ?: 0, false, null
                )
            ) {
                // 推送到sdp-design
                try {
                    pushSdp(pickResult)
                } catch (e: Exception) {
                    log.error { "push sdp failed pickResultId: ${pickResult.pickingResultId}  message: ${e.message}" }
                }
            }

        }

    }

    @Transactional(rollbackFor = [Exception::class])
    fun pushSdp(pickingAiDesignResult: PickingAiDesignResult) {
        // 推送sdp
        val pickingId = pickingAiDesignResult.pickingId
        val pickingAiDesign: PickingAiDesign = pickingAiDesignRepository.getById(pickingId)
        val designTaskId = pickingAiDesign.designTaskId
        val fabrics: List<RecommendFabricDetail>? = designTaskId?.let {
            aiDesignTaskFabricRepository.getRecommendFabricDetailByTaskId(it)
        }
        val aiDesignTask: AiDesignTask? = designTaskId?.let {
            aiDesignTaskRepository.getById(it)
        }
        val sdkReq = PickStyleConvert.convert(
            pickingAiDesignResult,
            pickingAiDesign,
            dictClientExternal,
            aiDesignTask,
            fabrics,
            inspirationRepository,
            pickingAiDesignPictureRepository,
            pickingAiDesignStyleRepository
        )

        val respVo = designDemandClientExternal.create(sdkReq)

        // 新增一个新的记录(选款类型)
        val log = SubmitDownstreamLog()
        log.logId = IdHelper.getId()
        log.inspirationId = pickingAiDesignResult.pickingResultId
        log.logType = 1
        log.businessId = pickingAiDesignResult.pickingResultId
        log.businessCode = ""
        log.waveBatchCode = ""
        log.downstreamTaskId = respVo.designDemandId
        log.taskStatus = TaskStateEnum.SUBMIT.code
        log.generationType = SupplyModeEnum.AIGC.code
        log.request = sdkReq.toJson()
        log.response = respVo.toJson()
        submitDownstreamLogRepository.save(log)
        // 设计需求id
        pickingAiDesignResult.designSubmitStatus = DesignSubmitStatusEnum.PUSHED.code
        pickingAiDesignResult.styleDesignDemandId = respVo.designDemandId
        pickingAiDesignResultRepository.updateById(pickingAiDesignResult)
    }

    /**
     * 扫描生成中的选款任务的图片4K图生成情况
     */

    override fun scanFinishedHdTask() {
        val results: List<PickingAiDesignResult> = pickingAiDesignResultRepository.listGenerating()
        log.info { "scanFinishedHdTask size = ${results.size}" }
        if (results.isEmpty()) {
            return
        }
        results.filter {
            StringUtils.isNotBlank(it.resultImageInfo)
        }.forEach { pickResult ->
            val resultImageInfo = pickResult.resultImageInfo
            val images =
                PickingResultImageInfoBo.jsonToBoList(resultImageInfo).filter { Bool.NO.code == it.eliminateType }
            if (images.isNotEmpty()) {
                val generated: Boolean = scanPickImage(images)
                if (generated) {
                    withUser(
                        CurrentUser(
                            pickResult.creatorId ?: 0, pickResult.creatorName ?: "", "",
                            pickResult.tenantId ?: 0, false, null
                        )
                    ) {
                        // 更新选款结果状态
                        pickResult.designSubmitStatus = DesignSubmitStatusEnum.AWAIT.code
                        pickingAiDesignResultRepository.updateById(pickResult)
                    }

                }
            }
        }


    }

    override fun problemFeedbackAdd(req: ImageGroupProblemFeedbackSaveReq) {
        val pickingAiDesign = pickingAiDesignRepository.getById(req.taskId) ?: throw BusinessException("选款ID不存在")
        val pickingAiDesignStyle =
            pickingAiDesignStyleRepository.selectByPickingIdAndSort(pickingAiDesign.pickingId!!, req.groupNum!!)
                ?: throw BusinessException("AI设计款式不存在")
        val pickingAiDesignPictureList =
            pickingAiDesignPictureRepository.getByPickingStyleId(pickingAiDesignStyle.pickingStyleId!!)
        val aiDesignTask =
            aiDesignTaskRepository.getById(pickingAiDesign.designTaskId) ?: throw BusinessException("AI设计任务不存在")
        if (CollectionUtils.isEmpty(pickingAiDesignPictureList)) {
            throw BusinessException("任务图片信息不存在，请检查！")
        }
        val pictureList = pickingAiDesignPictureList.map { it.showPicture() }
        val addVo = ImageGroupProblemFeedbackVo().apply {
            this.taskId = req.taskId
            this.modeCode = aiDesignTask.modeCode
            this.modeName = aiDesignTask.modeName
            this.fastForward = aiDesignTask.fastForward
            this.referenceImage = pickingAiDesign.inspirationImage
            this.groupNum = req.groupNum
            this.taskCode = pickingAiDesign.designTaskCode
            this.problemFeedbackImageGroupList = pictureList.filterNotNull()
            this.problemFeedbackList = req.problemFeedbackList
            this.supplementPictureList = req.supplementPictureList
            this.description = req.description
            this.origin = req.origin ?: "picking_style"
        }
        imageGroupProblemFeedbackClient.problemFeedbackAdd(addVo)
    }

    fun scanPickImage(images: List<PickingResultImageInfoBo>): Boolean {
        val pickingPictureIds = images.map { it.pickingPictureId }
        val pictures = pickingAiDesignPictureRepository.listByIds(pickingPictureIds)
        if (pictures.isEmpty()) {
            return false
        }
        // 生成成功了，或者重试了三次的
        val count = pictures.count { StringUtils.isNotBlank(it.ultraHdPictureUrl) || (it.ultraHdTryTimes ?: 0) >= 3 }
        return pickingPictureIds.size == count
    }

    override fun getDesignTask(taskId: Long): PickingDesignResp? {
        val task = this.aiDesignTaskRepository.getById(taskId) ?: return null
        val smart = smartDevelopClient.checkSmartDevelopDetail(task.aiTaskCode ?: "").data

        val materials = this.aiDesignMaterialRepository.listByTaskId(taskId) ?: listOf()
        return PickingDesignResp(
            task.filterBack,
            task.generateMode,
            task.promiseEnhanced,
            task.faceRepair,
            task.fastForward,
            task.tryOnFix,
            materials.map { it.pictureUrl ?: "" }).apply {
            if (null != smart) {
                modeName = smart.modeName
                refWeight = smart.refWeight
                aiModelUrl = smart.aiModelUrl
                picturePath = smart.picturePath
            }
        }
    }

    /**
     * 转换单条记录为VO对象
     */
    private fun convertToPickingStyleResultPageVo(
        record: PickingAiDesignResult,
        pickingAiDesignMap: Map<Long, PickingAiDesign>,
        picking2024Map: Map<Long, PickingAiHistory2024>,
        inspirationMap: Map<Long?, Inspiration>,
        waveBatchDictCodeMap: Map<String, DictVo>?,
        trayTypeDictCodeMap: Map<String, DictVo>?,
        printingDictCodeMap: Map<String, DictVo>?,
    ): PickingStyleResultPageVo {
        return PickingStyleResultPageVo().apply {
            // 基本信息
            pickingResultId = record.pickingResultId
            remark = record.remark
            selectorId = record.selectorId
            selectorName = record.selectorName
            selectionTime = record.selectionTime
            suggestedPrice = record.suggestedPrice?.toString()
            suggestedStyleName = record.suggestedStyleName
            suggestedCategoryName = record.suggestedCategoryName
            suggestedWaveBatchName = waveBatchDictCodeMap?.get(record.suggestedWaveBatchCode)?.dictName
            suggestedShopName = record.suggestedShopName
            suggestedCountrySiteName = record.suggestedCountrySiteName
            suggestedPrintingName = printingDictCodeMap?.get(record.suggestedPrintingCode)?.dictName
            cargoTrayName = trayTypeDictCodeMap?.get(record.cargoTrayCode)?.dictName
            pickingState = record.pickingState
            openStyleState = record.openStyleState
            styleCode = record.styleSpuCode
            styleEliminateReason = record.styleEliminateReason

            // 关联数据处理
            pickingAiDesignMap[record.pickingId]?.let {
                inspirationImage = it.inspirationImage
                refImgUrl = it.refImgUrl
                origin = it.origin
                sourceImage = it.sourceImage
            }
            // 关联数据处理(兼容历史选款数据)
            if (picking2024Map.containsKey(record.pickingResultId) && StringUtils.isBlank(inspirationImage)) {
                picking2024Map[record.pickingResultId]?.let {
                    inspirationImage = it.originalImageUrl
                }
            }

            // 新增：灵感图编号
            inspirationCode = inspirationMap[record.inspirationId]?.inspirationCode

            // 只获取修图的数据
            pickingStyleResultDetails = PickingResultImageInfoBo.jsonToBoList(record.resultImageInfo)
            // 特殊处理, 修复图覆盖原图
            pickingStyleResultDetails = pickingStyleResultDetails.map { dtit ->
                dtit.pictureUrl = getPictureUrl(dtit.pictureUrl, dtit.repairImgUrl)
                dtit
            }

            designTaskId = record.designTaskId

            designTaskCode = record.designTaskCode

            attachments = AttachmentBo.jsonToBoList(record.attachments)
        }
    }

    private fun exportExcelEntityDynamic(
        fileName: String,
        response: HttpServletResponse,
        dataList: List<PickingResultExportDTO>,
    ) {
        val workbook = WorkbookFactory.create(true)
        val sheet = workbook.createSheet("Sheet1")

        // 定义列宽配置
        val columnWidths = mapOf(
            "任务ID" to 15,
            "跑图任务编号" to 20,
            "灵感图编号" to 20,
            "修图建议" to 50,
            "选款人" to 15,
            "选款日期" to 20,
            "开款状态" to 15,
            "款号" to 20,
            "备注" to 30
        )

        val baseHeaders = listOf("任务ID", "跑图任务编号", "灵感图编号")
        val middleHeaders = listOf("修图建议", "选款人", "选款日期", "开款状态", "款号", "备注")

        // 计算最大URL数量并创建URL表头
        val maxUrls = dataList.maxOf { it.problemImages.size }
        val urlHeaders = List(maxUrls) { i -> "图片URL${i + 1}" }

        // 重新组合headers，将urlHeaders放在最后
        val headers = baseHeaders + middleHeaders + urlHeaders

        // Set headers
        val headerRow = sheet.createRow(0)
        headers.forEachIndexed { index, header ->
            headerRow.createCell(index).setCellValue(header)
        }

        // Create data rows
        dataList.forEachIndexed { rowIndex, dto ->
            val row = sheet.createRow(rowIndex + 1)

            // 填充基础数据
            with(row) {
                createCell(0).setCellValue(dto.designTaskId?.toString() ?: "")
                createCell(1).setCellValue(dto.designTaskCode ?: "")
                createCell(2).setCellValue(dto.inspirationCode ?: "")
            }

            // 填充中间数据
            val middleOffset = baseHeaders.size
            with(row) {
                createCell(middleOffset).setCellValue(dto.attachments ?: "")
                createCell(middleOffset + 1).setCellValue(dto.selectorName ?: "")
                createCell(middleOffset + 2).setCellValue(dto.selectionTime ?: "")
                createCell(middleOffset + 3).setCellValue(dto.openStyleState ?: "")
                createCell(middleOffset + 4).setCellValue(dto.styleSpuCode ?: "")
                createCell(middleOffset + 5).setCellValue(dto.remark ?: "")
            }

            // 填充URL数据（放在最后）
            val urlOffset = baseHeaders.size + middleHeaders.size
            dto.problemImages.forEachIndexed { index, url ->
                row.createCell(urlOffset + index).setCellValue(url)
            }
        }

        // 设置列宽 - 选择以下两种方式之一

        // 方式1：自动适配列宽
        fun autoSizeColumns() {
            headers.indices.forEach { index ->
                sheet.autoSizeColumn(index)
                // 获取自动调整后的宽度，并增加一点余量
                val currentWidth = sheet.getColumnWidth(index)
                sheet.setColumnWidth(index, (currentWidth * 1.2).toInt())
            }
        }

        // 方式2：固定列宽
        fun setFixedColumnWidths() {
            headers.forEachIndexed { index, header ->
                val width = when {
                    // URL列固定宽度
                    header.startsWith("图片URL") -> 50
                    // 其他列使用预定义宽度，如果没有预定义则使用默认值
                    else -> columnWidths[header] ?: 20
                }
                // 256是Excel的单位转换（1个字符约等于256个单位）
                sheet.setColumnWidth(index, 256 * width)
            }
        }

        // 选择使用哪种方式设置列宽
        // autoSizeColumns() // 自动适配列宽
        setFixedColumnWidths() // 固定列宽

        try {
            FileExportUtils.writeOutputStream(response, fileName) { os ->
                workbook.write(os)
            }
        } finally {
            workbook.close()
        }
    }

    /**
     * 优先使用修复图
     *
     * @param pictureUrl
     * @param repairImgUrl
     * @return
     */
    private fun getPictureUrl(pictureUrl: String?, repairImgUrl: String?): String {
        return if (!repairImgUrl.isNullOrBlank()) {
            repairImgUrl
        } else {
            pictureUrl ?: ""
        }
    }
}
