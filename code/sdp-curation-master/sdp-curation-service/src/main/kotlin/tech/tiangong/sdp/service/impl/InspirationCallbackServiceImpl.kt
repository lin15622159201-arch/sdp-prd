package tech.tiangong.sdp.service.impl

import com.zjkj.aigc.common.enums.LogoIdentifyStatusEnum
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.sequence.id.IdHelper
import team.aikero.blade.user.holder.CurrentUserHolder
import team.aikero.blade.util.json.toJson
import tech.tiangong.butted.common.enums.TaskStatusEnum
import tech.tiangong.inspiration.common.vo.SmartDevelopStyleTaskExternalDetailVo
import tech.tiangong.sdp.dao.entity.*
import tech.tiangong.sdp.dao.repository.*
import tech.tiangong.sdp.dto.InspirationIdentifiedLabelDto
import tech.tiangong.sdp.enums.IdentifiedStatusEnum
import tech.tiangong.sdp.enums.PickingDataSourceTypeEnum
import tech.tiangong.sdp.enums.SupplyModeEnum
import tech.tiangong.sdp.enums.TaskStateEnum
import tech.tiangong.sdp.external.AiDesignClientExternal
import tech.tiangong.sdp.external.IdentifyClientExternal
import tech.tiangong.sdp.external.InspirationDesignClient
import tech.tiangong.sdp.external.LogoIdentityTaskClientExternal
import tech.tiangong.sdp.req.inspiration.callback.AiDesignCallbackReq
import tech.tiangong.sdp.req.inspiration.callback.IdentifyCallbackReq
import tech.tiangong.sdp.service.InspirationCallbackService
import tech.tiangong.sdp.service.PickingStyleService
import tech.tiangong.sdp.service.component.RedissonHelper
import java.util.*

/**
 * 灵感相关回调
 * @author zjh
 * @date 2024/11/20 09:55
 */
@Service
@Slf4j
class InspirationCallbackServiceImpl(
    private val inspirationRepository: InspirationRepository,
    private val inspirationLabelRepository: InspirationLabelRepository,
    private val aiDesignTaskRepository: AiDesignTaskRepository,
    private val aiDesignTaskPictureRepository: AiDesignTaskPictureRepository,
    private val aiDesignTaskFabricRepository: AiDesignTaskFabricRepository,
    private val submitDownstreamLogRepository: SubmitDownstreamLogRepository,
    private val aiDesignTaskLabelRepository: AiDesignTaskLabelRepository,
    private val identifyClientExternal: IdentifyClientExternal,
    private val aiDesignClientExternal: AiDesignClientExternal,
    private val logoIdentityTaskClientExternal: LogoIdentityTaskClientExternal,
    private val pickingStyleService: PickingStyleService,
    private val redissonHelper: RedissonHelper,
    private val inspirationDesignClient: InspirationDesignClient,
) : InspirationCallbackService {

    val identifiedCategoryCode = "V240400000"
    val identifiedCategoryName = "其他"

    /**
     * 回调-识别任务
     * @param req
     */
    @Transactional(rollbackFor = [Exception::class])
    override fun identify(req: IdentifyCallbackReq) {
        log.info { "回调识别任务 req: ${req.toJson()}" }
        val inspiration = inspirationRepository.getById(req.busId)
        if (inspiration == null) {
            log.error { "灵感不存在, busId: ${req.busId}" }
            return
        }
        identify(inspiration)
    }

    /**
     * 回调-识别任务
     * @param inspiration
     */
    @Transactional(rollbackFor = [Exception::class])
    override fun identify(inspiration: Inspiration) {
        val result = identifyClientExternal.getByBusId(inspiration.identifiedId!!)
        if (result == null) {
            log.error { "识别任务获取详情为空, busId: ${inspiration.identifiedId}" }
            return
        }

        inspiration.identifiedId = result.smartIdentifyId
        inspiration.identifiedMessage = result.message

        val user = CurrentUserHolder.get()
        val taskStatus = TaskStatusEnum.of(result.taskStatus!!)
        if (taskStatus.failedOrCanceled()) {
            val identifiedStatusEnum = IdentifiedStatusEnum.FAIL
            if (!checkStatus(result.busId!!, result.taskStatus!!, identifiedStatusEnum, inspiration.identifiedStatus)) {
                return
            }
            inspiration.identifiedStatus = identifiedStatusEnum.code
            inspirationRepository.updateById(inspiration)
        } else if (taskStatus.processing()) {
            val identifiedStatusEnum = IdentifiedStatusEnum.IDENTIFYING
            if (!checkStatus(result.busId!!, result.taskStatus!!, identifiedStatusEnum, inspiration.identifiedStatus)) {
                return
            }
            inspiration.identifiedStatus = identifiedStatusEnum.code
            inspirationRepository.updateById(inspiration)
        } else if (taskStatus.completed()) {
            val identifiedStatusEnum = IdentifiedStatusEnum.VALID
            if (!checkStatus(result.busId!!, result.taskStatus!!, identifiedStatusEnum, inspiration.identifiedStatus)) {
                return
            }
            inspiration.identifiedStatus = identifiedStatusEnum.code
            inspiration.identifiedCategoryCode = result.categoryCode
            inspiration.identifiedCategory = result.category
            inspiration.identifiedLabel = InspirationIdentifiedLabelDto().apply {
                this.clipLabelList = result.clipLabelList
                this.flowerPatternLabelList = result.flowerPatternLabelList
               // this.styleLabelList = result.styleLabelList
            }.toJson()
            inspiration.styleType = result.styleType
            if (result.fabricLabel != null) {
                inspiration.fabricLabelMarketName = result.fabricLabel?.marketName
                inspiration.fabricLabelColorCode = result.fabricLabel?.colorCode
                inspiration.fabricLabelColorHue = result.fabricLabel?.colorHue
            }

            if (inspiration.identifiedCategoryCode.isNullOrBlank()) {
                inspiration.identifiedCategoryCode = identifiedCategoryCode
            }
            if (inspiration.identifiedCategory.isNullOrBlank()) {
                inspiration.identifiedCategory = identifiedCategoryName
            }

            inspirationRepository.updateById(inspiration)

            // 物理删除标签
            inspirationLabelRepository.deleteByInspirationId(inspiration.inspirationId)

            // 重新写入标签
           // result.styleLabelList?.isNotEmpty()?.let { inspirationLabelRepository.insertBatchLabel(inspiration.inspirationId!!, result.smartIdentifyId!!, user.tenantId, result.styleLabelList!!) }
            result.flowerPatternLabelList?.isNotEmpty()?.let { inspirationLabelRepository.insertBatchLabel(inspiration.inspirationId!!, result.smartIdentifyId!!, user.tenantId, result.flowerPatternLabelList!!) }
            result.clipLabelList?.isNotEmpty()?.let { inspirationLabelRepository.insertBatchLabel(inspiration.inspirationId!!, result.smartIdentifyId!!, user.tenantId, result.clipLabelList!!) }
        }
    }

    /**
     * 校验识别回调状态
     *
     * @param busId
     * @param taskStatus
     * @param enum
     * @param identifiedStatus
     * @return true通过, false终止
     */
    private fun checkStatus(busId: Long, taskStatus: Int, enum: IdentifiedStatusEnum, identifiedStatus: Int?): Boolean {
        if (Objects.equals(identifiedStatus, enum.code)) {
            log.warn { "回调识别任务状态与数据库一致, 不处理, busId: $busId status: $taskStatus" }
            return false
        }
        return true
    }

    /**
     * 回调-AI设计任务
     * @param req
     */
    @Transactional(rollbackFor = [Exception::class])
    override fun aiDesign(req: AiDesignCallbackReq) {
        log.info { "回调AI设计任务 req: ${req.toJson()}" }
        val aiDesignTask = aiDesignTaskRepository.getByBusinessId(req.busId)
        if (aiDesignTask == null) {
            //处理是AI设计任务创建的情况
            val resp =  inspirationDesignClient.detail(req.busId)
            log.info { "AI设计任务详情返回: ${resp.toJson()}" }
            if (resp.successful) {
                if (null == resp.data) {
                    log.info { "AI设计详情为空, busId: ${req.busId}" }
                    return
                }
                smartDesignCallBack(req,resp.data!!)
            } else {
                log.error { "获取AI设计详情失败, busId: ${req.busId}" }
            }
            return
        }

        val taskStatus = TaskStatusEnum.of(req.taskStatus)
        val localTaskStatus = TaskStateEnum.getByTaskStatusEnum(taskStatus)

        if (localTaskStatus == null || aiDesignTask.taskStatus == localTaskStatus.code) {
            log.warn { "回调AI设计状态与数据库一致, 不处理, busId: ${req.busId} status: ${req.taskStatus}" }
            return
        }

        val result = aiDesignClientExternal.getByBusId(req.busId)
        if (result == null) {
            log.error { "AI设计获取详情为空, busId: ${req.busId}" }
            return
        }
        redissonHelper.lock("sdp:curation:ai:design:callback:${req.busId}",60){
            // 更新任务状态
            val updateTask = AiDesignTask()
            updateTask.taskId = aiDesignTask.taskId
            updateTask.taskStatus = localTaskStatus.code
            aiDesignTaskRepository.updateById(updateTask)
            // 更新log表状态
            val log = submitDownstreamLogRepository.getByBusinessId(req.busId)
            if (log != null) {
                val updateLog = SubmitDownstreamLog()
                updateLog.logId = log.logId
                updateLog.taskStatus = localTaskStatus.code
                updateLog.response = result.toJson()
                submitDownstreamLogRepository.updateById(updateLog)
            }

            if (TaskStatusEnum.COMPLETED.code == req.taskStatus) {
                // 完成状态, 更新其他数据

                // 更新面料
                if (!result.recommendFabricList.isNullOrEmpty()) {
                    val fabricList = result.recommendFabricList?.map {
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
                        aiDesignTaskFabricRepository.deleteByTaskId(aiDesignTask.taskId!!)
                        aiDesignTaskFabricRepository.saveBatch(fabricList)
                    }
                }

                // 更新标签
                aiDesignTaskPictureRepository.deleteByTaskId(aiDesignTask.taskId!!)
                if (!result.clipLabelList.isNullOrEmpty()) {
                    aiDesignTaskLabelRepository.insertBatchLabel(aiDesignTask.taskId!!, result.clipLabelList!!)
                }
                if (!result.flowerPatternLabelList.isNullOrEmpty()) {
                    aiDesignTaskLabelRepository.insertBatchLabel(aiDesignTask.taskId!!, result.flowerPatternLabelList!!)
                }
                /*if (!result.styleLabelList.isNullOrEmpty()) {
                    aiDesignTaskLabelRepository.insertBatchLabel(aiDesignTask.taskId!!, result.styleLabelList!!)
                }*/

                // 更新结果图
                if (!result.resImgList.isNullOrEmpty()) {
                    val resImgList = mutableListOf<AiDesignTaskPicture>()
                    result.resImgList?.forEach { item ->
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
                        aiDesignTaskPictureRepository.deleteByTaskId(aiDesignTask.taskId!!)
                        aiDesignTaskPictureRepository.saveBatch(resImgList)
                    }
                    // 生成AIGC选款数据
                    pickingStyleService.savePicking(aiDesignTask.busId!!, PickingDataSourceTypeEnum.AIGC)
                }
            }
        }
    }

    private fun smartDesignCallBack(
        req: AiDesignCallbackReq,
        smartDevelopStyleDetail: SmartDevelopStyleTaskExternalDetailVo
    ) {
        val taskStatus = TaskStatusEnum.of(req.taskStatus)
        val localTaskStatus = TaskStateEnum.getByTaskStatusEnum(taskStatus)
        val result = aiDesignClientExternal.getByBusId(req.busId)
        if (result == null) {
            log.error { "AI设计获取详情为空, busId: ${req.busId}" }
            return
        }
        redissonHelper.lock("sdp:curation:ai:design:callback:${req.busId}",60){
            // 更新log表状态
            val log = submitDownstreamLogRepository.getByBusinessId(req.busId)
            if (log != null) {
                val updateLog = SubmitDownstreamLog()
                updateLog.logId = log.logId
                updateLog.taskStatus = localTaskStatus!!.code
                updateLog.response = result.toJson()
                submitDownstreamLogRepository.updateById(updateLog)
            }
            if (TaskStatusEnum.COMPLETED.code == req.taskStatus) {
                if (result.resImgList.isNullOrEmpty()) {
                    return@lock
                }
                // 生成AIGC选款数据
                pickingStyleService.savePickingBySmartDesignUpload(result,smartDevelopStyleDetail)
                }
            }
        }


    /**
     * 定时-数码印花
     * @param taskIds
     */
    @Transactional(rollbackFor = [Exception::class])
    override fun digitalPrint(taskIds: List<Long>) {
        log.info { "定时数码印花查询任务-更新日志-执行开始 taskIds: ${taskIds.toJson()}" }
        // 查询log日志
        val logs = submitDownstreamLogRepository.getByDownstreamTaskIds(taskIds, SupplyModeEnum.LOGO_NUM, TaskStateEnum.getEnumByNoFinish())
        if (logs.isNullOrEmpty()) {
            log.warn { "定时数码印花查询任务, 未查询到要处理日志, taskIds: ${taskIds.toJson()}" }
            return
        }
        val updateLogs = mutableListOf<SubmitDownstreamLog>()
        logs.forEach {
            val result = logoIdentityTaskClientExternal.queryByTaskId(it.downstreamTaskId!!)
            if (result == null) {
                log.warn { "定时数码印花查询任务-获取详情为空, busId: $it.downstreamTaskId" }
                return@forEach
            }
            log.info { "定时数码印花查询任务-获取详情: ${result.toJson()}" }
            val statusEnum = LogoIdentifyStatusEnum.getByCode(result.taskStatus)
            if (statusEnum == null) {
                log.warn { "定时数码印花查询任务-获取详情-状态错误, busId: $it.downstreamTaskId status: ${result.taskStatus}" }
                return@forEach
            }
            var newStateCode = it.taskStatus
            when (statusEnum) {
                LogoIdentifyStatusEnum.QUEUEING -> {
                    // 排队中
                    newStateCode = TaskStateEnum.QUEUEING.code
                }

                LogoIdentifyStatusEnum.ING, LogoIdentifyStatusEnum.RENDERING -> {
                    // 生成中
                    newStateCode = TaskStateEnum.GENERATING.code
                }

                LogoIdentifyStatusEnum.FAILED -> {
                    // 失败
                    newStateCode = TaskStateEnum.FAILED.code
                }

                LogoIdentifyStatusEnum.FINISHED -> {
                    // 完成
                    newStateCode = TaskStateEnum.COMPLETED.code
                }
            }

            if (newStateCode == it.taskStatus) {
                log.warn { "定时数码印花查询任务状态与数据库一致, 不处理, downstreamTaskId: ${it.downstreamTaskId} status: ${result.taskStatus}" }
                return@forEach
            }
            it.taskStatus = newStateCode
            updateLogs.add(it)
        }
        // 更新任务状态
        if (updateLogs.isNotEmpty()) {
            log.info { "定时数码印花查询任务-更新日志-需更新数量: ${updateLogs.size}" }
            submitDownstreamLogRepository.updateBatchById(updateLogs)
            log.info { "定时数码印花查询任务-更新日志-需更新数量: ${updateLogs.size} 更新成功" }
        } else {
            log.warn { "定时数码印花查询任务-更新日志-无更新" }
        }
    }
}