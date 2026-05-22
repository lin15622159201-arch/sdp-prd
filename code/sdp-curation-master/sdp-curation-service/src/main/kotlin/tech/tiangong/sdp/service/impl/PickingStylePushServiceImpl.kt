package tech.tiangong.sdp.service.impl

import com.alibaba.fastjson2.parseArray
import com.alibaba.fastjson2.parseObject
import org.apache.commons.lang3.StringUtils
import org.springframework.amqp.core.MessageBuilder
import org.springframework.amqp.rabbit.connection.CorrelationData
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.scheduling.annotation.Async
import org.springframework.stereotype.Service
import team.aikero.blade.core.exception.BusinessException
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.sequence.code.generate.BusinessCodeGenerator
import team.aikero.blade.sequence.id.IdHelper
import team.aikero.blade.util.json.toJson
import tech.tiangong.sdp.common.req.picking.PatternApplyPickingReq
import tech.tiangong.sdp.common.req.picking.PickingAddReq
import tech.tiangong.sdp.constants.MqConstant
import tech.tiangong.sdp.dao.bo.AiDesignModelBo
import tech.tiangong.sdp.dao.bo.AiDesignSceneBo
import tech.tiangong.sdp.dao.bo.KeyValueBo
import tech.tiangong.sdp.dao.entity.MqLog
import tech.tiangong.sdp.dao.entity.PickingAiDesignPicture
import tech.tiangong.sdp.dao.entity.PickingAiDesignStyle
import tech.tiangong.sdp.dao.repository.*
import tech.tiangong.sdp.dto.mq.PickingAiDesignMqDto
import tech.tiangong.sdp.dto.mq.PickingAiDesignMqDto.*
import tech.tiangong.sdp.enums.CodeRuleEnum
import tech.tiangong.sdp.enums.SupplyModeEnum
import tech.tiangong.sdp.service.PickingStylePushService
import java.math.BigDecimal
import java.time.LocalDateTime

@Slf4j
@Service
class PickingStylePushServiceImpl(
    private val aiDesignTaskRepository: AiDesignTaskRepository,
    private val aiDesignTaskFabricRepository: AiDesignTaskFabricRepository,
    private val pickingAiDesignRepository: PickingAiDesignRepository,
    private val pickingAiDesignStyleRepository: PickingAiDesignStyleRepository,
    private val pickingAiDesignPictureRepository: PickingAiDesignPictureRepository,
    private val inspirationRepository: InspirationRepository,
    private val businessCodeGenerator: BusinessCodeGenerator,
    private val inspirationLabelRepository: InspirationLabelRepository,
    private val mqLogRepository: MqLogRepository,
    private val rabbitTemplate: RabbitTemplate
) : PickingStylePushService {

    @Async
    override fun push2Xiniu(pickingId: Long) {
        log.info { "选款创建完成推送给xiniu-开始:${pickingId}" }
        val pick = pickingAiDesignRepository.getById(pickingId) ?: throw BusinessException("选款ID不存在")
        val inspiration =
            inspirationRepository.getById(pick.inspirationId) ?: throw BusinessException("灵感源数据不存在")
        val designTask =
            aiDesignTaskRepository.getById(pick.designTaskId!!) ?: throw BusinessException("AI设计任务数据不存在")
        val taskFabrics = aiDesignTaskFabricRepository.selectByTaskId(designTask.taskId)
        val labels = inspirationLabelRepository.getLabelByInspirationId(inspiration.inspirationId!!)
        val designStyles = pickingAiDesignStyleRepository.selectByPickingId(pickingId)
        val designStylesPictures = pickingAiDesignPictureRepository.getByPickingId(pickingId)

        val mqDto = PickingAiDesignMqDto()
        mqDto.pickingId = pickingId
        mqDto.busId = businessCodeGenerator.generate(CodeRuleEnum.INSPIRATION_SUBMIT_CODE)
        mqDto.supplyMethodCode = SupplyModeEnum.AIGC.code
        mqDto.waveBatchCode = inspiration.waveBatchCode
        mqDto.planningSourceCode = inspiration.planningSourceCode
        mqDto.countrySiteCode = inspiration.countrySiteCode
        mqDto.inspirationImageSourceCode = inspiration.inspirationImageSource
        mqDto.styleSourceCode = inspiration.styleSourceCode
        mqDto.taskTypeCode = SupplyModeEnum.AIGC.code
        mqDto.inspirationBrandCode = inspiration.inspirationBrandCode
        mqDto.inspirationCode = inspiration.inspirationCode
        mqDto.inspirationImage = inspiration.inspirationImage
        mqDto.creatorName = inspiration.creatorName
        mqDto.inspirationCreatedTime = inspiration.inspirationCreatedTime
        mqDto.externalImageStyleCode = inspiration.styleCode
        mqDto.externalImageAgeCode = inspiration.ageCode
        mqDto.aiTaskCode = pick.designTaskCode
        mqDto.modeCode = designTask.modeCode
        mqDto.modeName = designTask.modeName
        mqDto.externalCategory = designTask.categoryName
        mqDto.refWeight = designTask.refWeight
        mqDto.generateMode = designTask.generateMode
        mqDto.sceneInfo = designTask.sceneInfo.parseObject<AiDesignSceneBo>()
        mqDto.pictureCaption = mqDto.sceneInfo?.pictureCaption
        //传给淘天的模特包括人种和指定模特
        mqDto.modelInfo = if (!designTask.modelMaterialUrl.isNullOrEmpty()) {
            AiDesignModelBo().apply {
                aiModelName = designTask.modelMaterialName
                aiModelUrl = designTask.modelMaterialUrl
            }
        } else {
            designTask.modelInfo.parseObject<AiDesignModelBo>()
        }

        mqDto.modelCaption = ""  //todo 没这个信息
        mqDto.filterBack = designTask.filterBack
        mqDto.faceRepair = designTask.faceRepair
        mqDto.promiseEnhanced = designTask.promiseEnhanced
        mqDto.generateNum = designTask.genCount
        mqDto.taskCreatorName = designTask.creatorName
        mqDto.taskCreatedTime = designTask.createdTime
        mqDto.styleSourceCode = pick.origin
        // 款式列表
        mqDto.pickingStyles = buildPickingStyles(designStyles, designStylesPictures)
        // 原图标签
        mqDto.identifiedLabel = labels.map { it ->
            KeyValueBo().apply {
                key = it.labelName
                value = it.labelValueName
            }
        }.takeIf { it.isNotEmpty() } ?: listOf(KeyValueBo().apply {
            key = null
            value = null
        })
        // 面料列表
        mqDto.recommendFabricDetails = taskFabrics.filter { it.commodityId != null }.map { fabric ->
            RecommendFabricDetailDto().apply {
                sourceCommodityId = fabric.sourceCommodityId
                commodityId = fabric.commodityId
                commodityCode = fabric.commodityCode
                commodityName = fabric.commodityName
                commodityPicture = fabric.commodityPicture
                colorPicture = fabric.colorPicture
                skuId = fabric.skuId
                skuCode = fabric.skuCode
                colorCode = fabric.colorCode
                rgb = fabric.rgb
            }
        }
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

        // 发送mq
        sendMq(mqDto)
    }


    @Async
    override fun push2XiniuByUserUpload(pickingId: Long, req: PickingAddReq) {
        log.info { "用户自己创建的任务推送给xiniu-开始:${pickingId}" }
        val pick = pickingAiDesignRepository.getById(pickingId) ?: throw BusinessException("选款ID不存在")
        val designStyles = pickingAiDesignStyleRepository.selectByPickingId(pickingId)
        val designStylesPictures = pickingAiDesignPictureRepository.getByPickingId(pickingId)

        val mqDto = PickingAiDesignMqDto()
        mqDto.pickingId = pickingId
        mqDto.busId = businessCodeGenerator.generate(CodeRuleEnum.INSPIRATION_SUBMIT_CODE)
        //灵感相关信息置为空，小单快反为可空
        mqDto.supplyMethodCode = req.supplyMethodCode
        mqDto.taskTypeCode =  req.supplyMethodCode
        mqDto.waveBatchCode = null
        mqDto.planningSourceCode = null
        mqDto.countrySiteCode = null
        mqDto.inspirationImageSourceCode = null
        mqDto.inspirationBrandCode = null
        mqDto.inspirationCode = null
        mqDto.inspirationImage = pick.inspirationImage
        mqDto.creatorName = req.creatorName
        mqDto.inspirationCreatedTime = null
        mqDto.externalImageStyleCode = null
        mqDto.externalImageAgeCode = null
        mqDto.aiTaskCode = pick.designTaskCode
        mqDto.modeCode = req.pickingAddDto!!.modeCode
        mqDto.modeName = req.pickingAddDto!!.modeName
        mqDto.externalCategory = req.pickingAddDto!!.category
        mqDto.refWeight = BigDecimal.valueOf(1.0)
        mqDto.generateMode = 0
        mqDto.sceneInfo = req.pickingAddDto!!.bgImgUrl.let {
            AiDesignSceneBo().apply {
                picturePath = it
            }
        }
        mqDto.pictureCaption = req.pickingAddDto!!.bgImgDesc
        //传给淘天的模特包括人种和指定模特
        mqDto.modelInfo = if (! req.pickingAddDto!!.modelImgUrl.isNullOrEmpty()) {
            AiDesignModelBo().apply {
                aiModelUrl = req.pickingAddDto!!.modelImgUrl
            }
        } else {
            null
        }

        mqDto.modelCaption = ""  //todo 没这个信息
        mqDto.filterBack = 0
        mqDto.faceRepair = 0
        mqDto.promiseEnhanced = 0
        mqDto.generateNum = req.pickingAddDto!!.generateNum
        mqDto.taskCreatorName = pick.creatorName
        mqDto.taskCreatedTime = pick.createdTime
        // 款式列表
        mqDto.pickingStyles = buildPickingStyles(designStyles, designStylesPictures)

        // 原图标签
        mqDto.identifiedLabel = listOf(
            KeyValueBo().apply {
                key = null
                value = null
            }
        )
        // 发送mq
        sendMq(mqDto)
    }

    @Async
    override fun push2XiniuByInspiration(pickingId: Long, req: PickingAddReq) {
        log.info { "灵感源信息推送给xiniu-开始:${pickingId}" }
        val pick = pickingAiDesignRepository.getById(pickingId) ?: throw BusinessException("选款ID不存在")
        val inspiration =
            inspirationRepository.getById(pick.inspirationId) ?: throw BusinessException("灵感源数据不存在")
        val designStyles = pickingAiDesignStyleRepository.selectByPickingId(pickingId)
        val labels = inspirationLabelRepository.getLabelByInspirationId(inspiration.inspirationId!!)
        val designStylesPictures = pickingAiDesignPictureRepository.getByPickingId(pickingId)

        val mqDto = PickingAiDesignMqDto()
        mqDto.pickingId = pickingId
        mqDto.busId = businessCodeGenerator.generate(CodeRuleEnum.INSPIRATION_SUBMIT_CODE)
        mqDto.supplyMethodCode = req.supplyMethodCode
        mqDto.waveBatchCode = inspiration.waveBatchCode
        mqDto.planningSourceCode = inspiration.planningSourceCode
        mqDto.countrySiteCode = inspiration.countrySiteCode
        mqDto.inspirationImageSourceCode = inspiration.inspirationImageSource
        mqDto.taskTypeCode =  req.supplyMethodCode
        mqDto.inspirationBrandCode = inspiration.inspirationBrandCode
        mqDto.inspirationCode = inspiration.inspirationCode
        mqDto.inspirationImage = inspiration.inspirationImage
        mqDto.creatorName = inspiration.creatorName
        mqDto.inspirationCreatedTime = inspiration.inspirationCreatedTime
        mqDto.externalImageStyleCode = inspiration.styleCode
        mqDto.externalImageAgeCode = inspiration.ageCode
        mqDto.styleSourceCode = inspiration.styleSourceCode
        mqDto.aiTaskCode = pick.designTaskCode
        mqDto.modeCode = req.pickingAddDto!!.modeCode
        mqDto.modeName = req.pickingAddDto!!.modeName
        mqDto.externalCategory = req.pickingAddDto!!.category
        mqDto.refWeight = BigDecimal.valueOf(1.0)
        mqDto.generateMode = 0
        mqDto.sceneInfo = req.pickingAddDto!!.bgImgUrl.let {
            AiDesignSceneBo().apply {
                picturePath = it
            }
        }
        mqDto.pictureCaption = req.pickingAddDto!!.bgImgDesc
        //传给淘天的模特包括人种和指定模特
        mqDto.modelInfo = if (! req.pickingAddDto!!.modelImgUrl.isNullOrEmpty()) {
            AiDesignModelBo().apply {
                aiModelUrl = req.pickingAddDto!!.modelImgUrl
            }
        } else {
            null
        }

        mqDto.modelCaption = ""  //todo 没这个信息
        mqDto.filterBack = 0
        mqDto.faceRepair = 0
        mqDto.promiseEnhanced = 0
        mqDto.generateNum = req.pickingAddDto!!.generateNum
        mqDto.taskCreatorName = pick.creatorName
        mqDto.taskCreatedTime = pick.createdTime
        // 款式列表
        mqDto.pickingStyles = buildPickingStyles(designStyles, designStylesPictures)

        // 原图标签
        mqDto.identifiedLabel = labels.map { it ->
            KeyValueBo().apply {
                key = it.labelName
                value = it.labelValueName
            }
        }.takeIf { it.isNotEmpty() } ?: listOf(KeyValueBo().apply {
            key = null
            value = null
        })

        // 发送mq
        sendMq(mqDto)
    }

    override fun push2XiniuByPatternApply(pickingId: Long, req: PatternApplyPickingReq) {
        log.info { "花型上身完成后推送给xiniu-开始:${pickingId}" }
        val pick = pickingAiDesignRepository.getById(pickingId) ?: throw BusinessException("选款ID不存在")
        val inspiration = inspirationRepository.getById(pick.inspirationId) ?: throw BusinessException("灵感源数据不存在")
        val designStyles = pickingAiDesignStyleRepository.selectByPickingId(pickingId)
        val labels = inspirationLabelRepository.getLabelByInspirationId(inspiration.inspirationId!!)
        val designStylesPictures = pickingAiDesignPictureRepository.getByPickingId(pickingId)

        val mqDto = PickingAiDesignMqDto()
        mqDto.pickingId = pickingId
        mqDto.busId = businessCodeGenerator.generate(CodeRuleEnum.INSPIRATION_SUBMIT_CODE)
        mqDto.supplyMethodCode = inspiration.suggestedSupplyModeCode
        mqDto.waveBatchCode = inspiration.waveBatchCode
        mqDto.planningSourceCode = inspiration.planningSourceCode
        mqDto.countrySiteCode = inspiration.countrySiteCode
        mqDto.inspirationImageSourceCode = inspiration.inspirationImageSource
        mqDto.inspirationBrandCode = inspiration.inspirationBrandCode
        mqDto.inspirationCode = inspiration.inspirationCode
        mqDto.inspirationImage = inspiration.inspirationImage
        mqDto.creatorName = inspiration.creatorName
        mqDto.inspirationCreatedTime = inspiration.inspirationCreatedTime
        mqDto.externalImageStyleCode = inspiration.styleCode
        mqDto.externalImageAgeCode = inspiration.ageCode
        mqDto.aiTaskCode = pick.designTaskCode
        mqDto.modeName = req.patternApplyTask!!.modelName
        mqDto.externalCategory = req.patternApplyTask!!.categoryName
        mqDto.refWeight = null
        mqDto.generateMode =null

        mqDto.filterBack = null
        mqDto.faceRepair = null
        mqDto.promiseEnhanced = null
        mqDto.generateNum = req.patternApplyTask!!.count
        mqDto.taskCreatorName = pick.creatorName
        mqDto.taskCreatedTime = pick.createdTime

        // 原图标签
        mqDto.identifiedLabel = labels.map {
            KeyValueBo().apply {
                key = it.labelName
                value = it.labelValueName
            }
        }.takeIf { it.isNotEmpty() } ?: listOf(KeyValueBo().apply {
            key = null
            value = null
        })
        // 款式列表
        mqDto.pickingStyles = buildPickingStyles(designStyles, designStylesPictures)
        // 发送mq
        sendMq(mqDto)
    }

    private fun buildPickingStyles(
        designStyles: List<PickingAiDesignStyle>,
        designStylesPictures: List<PickingAiDesignPicture>
    ): List<PickingAiDesignStyleDto> {
        return designStyles.map { style ->
            val styleDto = PickingAiDesignStyleDto()
            styleDto.pickingStyleId = style.pickingStyleId
            styleDto.styleName = style.styleName
            // 图片列表
            styleDto.stylePictures = designStylesPictures
                .filter { it -> it.pickingStyleId == style.pickingStyleId }
                .map { stylePicture ->
                    val pictureDto = PickingAiDesignPictureDto()
                    pictureDto.pickingPictureId = stylePicture.pickingPictureId
                    pictureDto.pictureUrl = stylePicture.pictureUrl
                    pictureDto.repairImgUrl = stylePicture.repairImgUrl
                    pictureDto.serialNum = stylePicture.serialNum
                    pictureDto.groupNum = stylePicture.groupNum
                    pictureDto.mainImageType = stylePicture.mainImageType
                    pictureDto.fixImageType = stylePicture.fixImageType
                    pictureDto.eliminateType = stylePicture.eliminateType
                    pictureDto.eliminateReasonCodes = if (StringUtils.isNotBlank(stylePicture.eliminateReason)) {
                        stylePicture.eliminateReason.parseArray<String>()
                    } else {
                        listOf()
                    }
                    pictureDto
                }
            styleDto
        }
    }

    private fun sendMq(mqDto: PickingAiDesignMqDto) {
        val body = mqDto.toJson()

        val msgId = IdHelper.getId()
        val msg = MessageBuilder
            .withBody(body.toByteArray())
            .setMessageId(msgId.toString())
            .setCorrelationId(msgId.toString())
            .setContentType("text/plain")
            .build()

        log.info { "选款创建完成推送给xiniu-body: ${body}" }
        val mqLog = MqLog();
        mqLog.busId = mqDto.pickingId
        mqLog.subBusId = mqDto.pickingId
        mqLog.taskCode = mqDto.aiTaskCode
        mqLog.mqTime = LocalDateTime.now()
        mqLog.state = 1
        mqLog.msg = body
        try {
            val correlationData = CorrelationData(msgId.toString())
            rabbitTemplate.send(
                MqConstant.PACKING_STYLE_CREATE_E,
                MqConstant.PACKING_STYLE_CREATE_R,
                msg,
                correlationData
            )
        } catch (e: Exception) {
            mqLog.state = 0
            log.error {
                "选款创建完成推送给xiniu-errMessage: ${e.stackTraceToString()}"
            }
        } finally {
            mqLogRepository.save(mqLog)
        }
    }
}