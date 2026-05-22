package tech.tiangong.sdp.service.impl

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import team.aikero.blade.auth.withUser
import team.aikero.blade.core.exception.BusinessException
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.sequence.id.IdHelper
import team.aikero.blade.user.entity.CurrentUser
import team.aikero.blade.user.holder.CurrentUserHolder
import team.aikero.blade.util.json.toJson
import tech.tiangong.butted.client.UltraHdClient
import tech.tiangong.butted.common.req.UltraHdTaskCreateReq
import tech.tiangong.sdp.common.enums.YesOrNoEnum
import tech.tiangong.sdp.common.req.picking.AiDesignPickingReq
import tech.tiangong.sdp.convert.PickStyleConvert
import tech.tiangong.sdp.dao.bo.PickingResultImageInfoBo
import tech.tiangong.sdp.dao.entity.*
import tech.tiangong.sdp.dao.repository.*
import tech.tiangong.sdp.enums.*
import tech.tiangong.sdp.req.picking.ImportOldPickingDataReq
import tech.tiangong.sdp.req.picking.UltraHdTaskCallbackReq
import tech.tiangong.sdp.service.AiDesignPickingService
import java.time.LocalDateTime

/**
 * I设计-选款
 * @author zjh
 * @date 2025-1-8 14:36:35
 */
@Service
@Slf4j
class AiDesignPickingServiceImpl(
    private val aiDesignTaskRepository: AiDesignTaskRepository,
    private val aiDesignTaskPictureRepository: AiDesignTaskPictureRepository,
    private val aiDesignTaskFabricRepository: AiDesignTaskFabricRepository,
    private val aiDesignTaskLabelRepository: AiDesignTaskLabelRepository,
    private val pickingAiDesignRepository: PickingAiDesignRepository,
    private val pickingAiDesignPictureRepository: PickingAiDesignPictureRepository,
    private val pickingAiDesignStyleRepository: PickingAiDesignStyleRepository,
    private val pickingAiDesignResultRepository: PickingAiDesignResultRepository,
    private val ultraHdTaskRepository: UltraHdTaskRepository,
    private val ultraHdClient: UltraHdClient,
    @Value("\${domain.nest-api}") private val host: String,
) : AiDesignPickingService {

    /**
     * AI设计创建选款
     */
    @Transactional(rollbackFor = [Exception::class])
    override fun createByAiDesign(req: AiDesignPickingReq): Long {

        val check = aiDesignTaskRepository.getByBusinessId(req.busId!!)
        if (check != null) {
            throw BusinessException("AI设计任务已存在" + req.busId!!)
        }

        val user = CurrentUserHolder.get()
        val pickingId = IdHelper.getId()
        val aiDesignTask = AiDesignTask().apply {
            this.taskId = IdHelper.getId()
            this.busId = req.busId
            this.busCode = req.busCode
            this.aiTaskCode = req.busCode
            this.taskStatus = TaskStateEnum.COMPLETED.code
            this.inspirationImage = req.refImgUrl
            this.categoryName = req.category
            this.generateMode = req.resImgList?.size
            this.genCount = req.multiPose
            this.styleType = req.styleType
            this.tenantId = user.tenantId
        }
        aiDesignTaskRepository.save(aiDesignTask)

        // 更新面料
        if (!req.recommendFabricList.isNullOrEmpty()) {
            val fabricList = req.recommendFabricList?.map {
                val fabric = AiDesignTaskFabric()
                fabric.fabricId = IdHelper.getId()
                fabric.taskId = aiDesignTask.taskId
                fabric.familyFabricCategory = it.familyFabricCategory
                fabric.sourceCommodityId = it.sourceCommodityId
                fabric.commodityId = it.commodityId
                fabric.commodityCode = it.commodityCode
                fabric.commodityName = it.commodityName
                fabric.commodityPicture = it.commodityPicture
                fabric.colorPicture = it.colorPicture
                fabric.skuId = it.skuId
                fabric.skuCode = it.skuCode
                fabric.colorCode = it.colorCode
                fabric.rgb = it.rgb
                fabric
            }
            if (!fabricList.isNullOrEmpty()) {
                aiDesignTaskFabricRepository.saveBatch(fabricList)
            }
        }

        // 更新标签
        if (!req.clipLabelList.isNullOrEmpty()) {
            aiDesignTaskLabelRepository.insertBatchLabelDto(aiDesignTask.taskId!!, req.clipLabelList!!)
        }
        if (!req.flowerPatternLabelList.isNullOrEmpty()) {
            aiDesignTaskLabelRepository.insertBatchLabelDto(aiDesignTask.taskId!!, req.flowerPatternLabelList!!)
        }
        if (!req.styleLabelList.isNullOrEmpty()) {
            aiDesignTaskLabelRepository.insertBatchLabelDto(aiDesignTask.taskId!!, req.styleLabelList!!)
        }// 更新结果图
        if (!req.resImgList.isNullOrEmpty()) {
            val resImgList = mutableListOf<AiDesignTaskPicture>()
            req.resImgList?.forEach { item ->
                run {
                    item.resImgList?.forEach {
                        val resImg = AiDesignTaskPicture()
                        resImg.pictureId = IdHelper.getId()
                        resImg.taskId = aiDesignTask.taskId
                        resImg.pictureUrl = it.resImg
                        resImg.repairImgUrl = it.repairImg
                        resImg.groupNum = item.groupNum
                        resImg.serialNum = it.serialNum
                        resImgList.add(resImg)
                    }
                }
            }
            if (resImgList.isNotEmpty()) {
                aiDesignTaskPictureRepository.saveBatch(resImgList)
            }

            // 创建选款
            savePicking(aiDesignTask.taskId!!, req.identifyCategory!!, req.refImgUrl!!)
        }

        return pickingId
    }

    /**
     * 导入旧选款数据(导入到结果表)
     */
    override fun importOldPickingData(req: ImportOldPickingDataReq) {
        val pickingAiDesignResult = PickingAiDesignResult().apply {
            this.pickingResultId = IdHelper.getId()
            this.pickingState = PickingStateEnum.AVAILABLE.state

            this.pickingId = req.pickingId
            this.pickingStyleId = req.pickingStyleId
            this.pickingStyleSort = 1
            this.selectorId = req.selectorId
            this.selectorName = req.selectorName
            this.selectionTime = req.selectionTime
            this.pickingCreatorId = req.pickingCreatorId
            this.pickingCreatorName = req.pickingCreatorName
            this.pickingCreatedTime = req.pickingCreatedTime
            this.resultImageInfo = PickingResultImageInfoBo.boListToJson(req.resultImageInfo)

            this.suggestedPrice = req.suggestedPrice
            this.suggestedStyleCode = req.suggestedStyleCode
            this.suggestedStyleName = req.suggestedStyleName
            this.suggestedCategoryCode = req.suggestedCategoryCode
            this.suggestedCategoryName = req.suggestedCategoryName
            this.suggestedWaveBatchCode = req.suggestedWaveBatchCode
            this.suggestedShopId = req.suggestedShopId
            this.suggestedShopCode = req.suggestedShopCode
            this.suggestedShopName = req.suggestedShopName
            this.suggestedPrintingCode = req.suggestedPrintingCode
            this.suggestedCountrySiteCode = req.suggestedCountrySiteCode
            this.suggestedCountrySiteName = req.suggestedCountrySiteName
            this.cargoTrayCode = req.cargoTrayCode
            this.attachments = req.attachments
            this.remark = req.remark

            this.styleEliminateReason = req.styleEliminateReason
            this.styleEliminateUserId = req.styleEliminateUserId
            this.styleEliminateUserName = req.styleEliminateUserName
            this.styleEliminateTime = req.styleEliminateTime
            this.openStyleState = req.openStyleState
        }
        pickingAiDesignResultRepository.save(pickingAiDesignResult)
    }

    /**
     * 4K图任务回调
     *
     */
    @Transactional(rollbackFor = [Exception::class])
    override fun ultraHdTaskCallback(req: UltraHdTaskCallbackReq) {
        val busId = req.busId
        val ultraHdTask = ultraHdTaskRepository.getById(busId)
        if (ultraHdTask == null) {
            log.info { "ultraHdTaskCallback busId=${busId} 不存在" }
            return
        }
        withUser(
            CurrentUser(
                ultraHdTask.creatorId ?: 0, ultraHdTask.creatorName ?: "", "",
                ultraHdTask.tenantId, false, null
            )
        ) {
            val resp = ultraHdClient.getByBusId(busId)
            log.info { " ultraHdClient.getByBusId resp=${resp.toJson()}" }
            if (resp.successful) {
                resp.data?.let {
                    when (val taskStatus = it.taskStatus) {
                        0, 10, 20, 50, 60 -> {
                            // 失败合集
                            ultraHdTask.taskStatus = taskStatus
                            val picture = PickingAiDesignPicture().apply {
                                pickingPictureId = ultraHdTask.imageId
                                ultraHdTryTimes = (this.ultraHdTryTimes?:0).plus(1)
                            }
                            pickingAiDesignPictureRepository.updateById(picture)
                            if ((picture.ultraHdTryTimes ?: 0) <= 3){
                                val newTask = UltraHdTask(
                                    IdHelper.getId(), ultraHdTask.tenantId, ultraHdTask.imageUrl,
                                    ultraHdTask.imageId, 0, ultraHdTask.pickingResultId
                                )

                                // 重新发起任务
                                val createReq: UltraHdTaskCreateReq = PickStyleConvert.convert(newTask,ultraHdTask, host)
                                log.info { "ultraHdTask recreate req=${createReq.toJson()}" }
                                val manualCreate = ultraHdClient.manualCreate(createReq)
                                log.info { "ultraHdTask recreate resp=${manualCreate.toJson()}" }
                                if (manualCreate.successful){
                                    newTask.taskStatus = 10
                                }
                                ultraHdTaskRepository.save(newTask)
                            }
                        }
                        30 -> {
                            ultraHdTask.taskStatus = 30
                            ultraHdTask.ultraHdImageUrl = it.resImg
                            ultraHdTask.generatedTime = LocalDateTime.now()
                            // 更新图片
                            val picture = PickingAiDesignPicture().apply {
                                pickingPictureId = ultraHdTask.imageId
                                ultraHdPictureUrl = it.resImg
                                ultraHdTryTimes = (this.ultraHdTryTimes?:0).plus(1)
                            }
                            pickingAiDesignPictureRepository.updateById(picture)
                        }
                        else -> { // 类似于 Java 的 default

                        }
                    }
                    ultraHdTaskRepository.updateById(ultraHdTask)
                }
            }
        }

    }

    /**
     * 保存选款数据
     *
     * @param businessId
     * @param dataSourceEnum
     */
    @Transactional(rollbackFor = [Exception::class])
    fun savePicking(taskId: Long, identifyCategory: String, image: String) {
        val dataSourceEnum = PickingDataSourceTypeEnum.AIGC
        val user = CurrentUserHolder.get()

        val aiDesignTask = aiDesignTaskRepository.getById(taskId) ?: throw BusinessException("AI设计任务不存在")
        val aiDesignTaskPictureList = aiDesignTaskPictureRepository.listByTaskId(aiDesignTask.taskId)

        val pickingAiDesign = PickingAiDesign()
        pickingAiDesign.pickingId = IdHelper.getId()
        pickingAiDesign.inspirationImage = image
        pickingAiDesign.sourceImage = image
        pickingAiDesign.supplyMethodCode = SupplyModeEnum.AIGC.code
        pickingAiDesign.supplyMethodName = SupplyModeEnum.AIGC.desc
        pickingAiDesign.designTaskId = aiDesignTask.taskId
        pickingAiDesign.designTaskCode = aiDesignTask.aiTaskCode
        pickingAiDesign.dataSource = dataSourceEnum.content
        pickingAiDesign.identifyCategoryName = identifyCategory
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
    }
}