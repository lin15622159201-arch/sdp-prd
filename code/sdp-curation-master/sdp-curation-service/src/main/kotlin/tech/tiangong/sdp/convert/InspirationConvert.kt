package tech.tiangong.sdp.convert


import com.alibaba.fastjson2.parseObject
import org.apache.commons.collections4.CollectionUtils
import org.apache.commons.lang3.StringUtils
import team.aikero.admin.common.vo.DictVo
import team.aikero.blade.core.enums.Bool
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.sequence.code.generate.BusinessCodeGenerator
import team.aikero.blade.sequence.id.IdHelper
import team.aikero.blade.user.holder.CurrentUserHolder
import team.aikero.blade.util.json.toJson
import tech.tiangong.bfg.sdk.client.FmClient
import tech.tiangong.pop.common.enums.YesOrNoEnum
import tech.tiangong.sdp.common.req.AiDesignTaskCreateExt
import tech.tiangong.sdp.common.req.ExternalSubmitInspirationReq
import tech.tiangong.sdp.dao.bo.AiDesignModelBo
import tech.tiangong.sdp.dao.bo.AiDesignSceneBo
import tech.tiangong.sdp.dao.entity.AiDesignMaterial
import tech.tiangong.sdp.dao.entity.AiDesignTask
import tech.tiangong.sdp.dao.entity.Inspiration
import tech.tiangong.sdp.dao.entity.SubmitDownstreamLog
import tech.tiangong.sdp.enums.*
import tech.tiangong.sdp.req.*
import tech.tiangong.sdp.req.inspiration.InspirationSubmitReq
import tech.tiangong.sdp.req.inspiration.InspirationTaskSubmitReq
import tech.tiangong.sdp.req.inspiration.ModelMaterialInfoReq
import tech.tiangong.sdp.resp.inspiration.InspirationTaskSubmitResp
import java.time.LocalDateTime

object InspirationConvert {
    @JvmStatic
    fun convert(
        inspiration: Inspiration,
        aiDesignTask: AiDesignTask,
        taskReSubmitDetail: InspirationTaskSubmitResp,
        bizId: Long,
        createExtParam: AiDesignTaskCreateExt?
    ): InspirationSubmitReq {
        val inspirationSubmitReq = InspirationSubmitReq(
            inspiration.inspirationId ?: 0,
            taskReSubmitDetail.waveBatchCode ?: "",
            taskReSubmitDetail.supplyMethodCode ?: ""
        )
        inspirationSubmitReq.styleGenCount = aiDesignTask.styleGenerateNum
        inspirationSubmitReq.generateMode = taskReSubmitDetail.generateMode
        inspirationSubmitReq.filterBack = taskReSubmitDetail.filterBack
        inspirationSubmitReq.faceRepair = taskReSubmitDetail.faceRepair
        inspirationSubmitReq.sceneInfo = taskReSubmitDetail.sceneInfo
        inspirationSubmitReq.modelInfo = taskReSubmitDetail.modelInfo
        val modelMaterialInfoReq = ModelMaterialInfoReq()
        modelMaterialInfoReq.modelMaterialId = taskReSubmitDetail.modelMaterialInfo?.modelMaterialId
        modelMaterialInfoReq.modelMaterialName = taskReSubmitDetail.modelMaterialInfo?.modelMaterialName
        modelMaterialInfoReq.modelMaterialUrl = taskReSubmitDetail.modelMaterialInfo?.modelMaterialUrl
        inspirationSubmitReq.modelMaterialInfo = modelMaterialInfoReq
        inspirationSubmitReq.generateNum = taskReSubmitDetail.generateNum
        inspirationSubmitReq.expectedCostPrice = inspiration.expectedCostPrice
//        inspirationSubmitReq.categoryCode =
//        inspirationSubmitReq.categoryName =
//        inspirationSubmitReq.syncCategory =
        inspirationSubmitReq.modeCode = aiDesignTask.modeCode
        inspirationSubmitReq.modeName = aiDesignTask.modeName
        inspirationSubmitReq.fastForward = aiDesignTask.fastForward
//        inspirationSubmitReq.refWeight =
        inspirationSubmitReq.createExtParam = createExtParam
        createExtParam?.let {
            inspirationSubmitReq.generateMode = it.multiPose
            inspirationSubmitReq.filterBack = it.filterBack
            inspirationSubmitReq.promiseEnhanced = it.promiseEnhanced
            inspirationSubmitReq.faceRepair = it.faceRepair
            it.sceneInfo?.let { scene ->
                val aiDesignSceneBo = AiDesignSceneBo()
                aiDesignSceneBo.sceneId = scene.sceneId
                aiDesignSceneBo.sceneName = scene.sceneName
                aiDesignSceneBo.pictureId = scene.pictureId
                aiDesignSceneBo.picturePath = scene.picturePath
                aiDesignSceneBo.pictureCaption = scene.pictureCaption
                inspirationSubmitReq.sceneInfo = aiDesignSceneBo
            }
            it.aiModelCode?.let { aiModelCode ->
                val modelInfo = AiDesignModelBo()
                modelInfo.aiModelCode = aiModelCode
                inspirationSubmitReq.modelInfo = modelInfo
            }
            inspirationSubmitReq.generateNum = it.genCount
            inspirationSubmitReq.modeCode = it.modeCode
            inspirationSubmitReq.modeName = it.modeName
            inspirationSubmitReq.refWeight = it.refWeight
            it.parentBusId = bizId
        }
        return inspirationSubmitReq
    }

    @JvmStatic
    fun convert(req: InspirationTaskSubmitReq): List<InspirationSubmitReq> {
        return req.inspirationIds.map {
            val inspirationSubmitReq = InspirationSubmitReq(it, req.waveBatchCode, req.supplyMethod)
            inspirationSubmitReq.refImgUrl = req.refImgUrl
            inspirationSubmitReq.generateMode = req.generateMode
            inspirationSubmitReq.filterBack = req.filterBack
            inspirationSubmitReq.faceRepair = req.faceRepair
            inspirationSubmitReq.promiseEnhanced = req.promiseEnhanced
            inspirationSubmitReq.sceneInfo = req.sceneInfo
            inspirationSubmitReq.modelInfo = req.modelInfo
            inspirationSubmitReq.modelMaterialInfo = req.modelMaterialInfo
            inspirationSubmitReq.generateNum = req.generateNum
            inspirationSubmitReq.expectedCostPrice = req.expectedCostPrice
            inspirationSubmitReq.categoryCode = req.categoryCode
            inspirationSubmitReq.categoryName = req.categoryName
            inspirationSubmitReq.syncCategory = req.syncCategory
            inspirationSubmitReq.modeCode = req.modeCode
            inspirationSubmitReq.modeName = req.modeName
            inspirationSubmitReq.refWeight = req.refWeight
            inspirationSubmitReq.fastForward = req.fastForward
            inspirationSubmitReq.styleGenCount = req.styleGenCount
            inspirationSubmitReq.modelEthnicity = req.modelEthnicity
            inspirationSubmitReq.styleModelId = req.styleModelId
            inspirationSubmitReq.prompt = req.prompt
            inspirationSubmitReq.enableDistill = req.enableDistill
            inspirationSubmitReq.enableFollowability = req.enableFollowability
            inspirationSubmitReq.loraName = req.loraName
            inspirationSubmitReq.clothType = req.clothType
            inspirationSubmitReq.imgSize = req.imgSize
            inspirationSubmitReq.materials = req.materials
            inspirationSubmitReq
        }.toMutableList()

    }

    @JvmStatic
    fun convert(
        inspiration: Inspiration,
        supplyMode: SupplyModeEnum,
        dictCodeMap: Map<String, DictVo>?
    ): DesignDemandCreateReq {
        val sdkReq = DesignDemandCreateReq()
        sdkReq.sourceBizId = IdHelper.getId()
        sdkReq.inspirationStyleId = inspiration.inspirationId
        sdkReq.supplyModeName = supplyMode.desc
        sdkReq.supplyModeCode = supplyMode.code
        sdkReq.productLink = inspiration.productLink
        sdkReq.category = inspiration.identifiedCategoryCode
        sdkReq.categoryName = inspiration.identifiedCategory
        sdkReq.countrySiteCode = inspiration.countrySiteCode
        sdkReq.countrySiteName = inspiration.countrySiteName
        sdkReq.sellingPrice = inspiration.salePrice
        sdkReq.expectedCostPrice = inspiration.expectedCostPrice.toString()
        sdkReq.waveBandCode = inspiration.waveBatchCode
        sdkReq.waveBandName = dictCodeMap?.get(inspiration.waveBatchCode)?.dictName
        sdkReq.originalImage = inspiration.sourceImage
        inspiration.inspirationImage?.let {
            sdkReq.inspirationImageList = listOf(ImageInfo(it))
        }
        sdkReq.expectedCostPrice = inspiration.expectedCostPrice.toString()
        val user = CurrentUserHolder.get()
        sdkReq.submitUserName = user.name
        sdkReq.submitUserId = user.id
        sdkReq.planningSourceCode = inspiration.planningSourceCode
        sdkReq.planningSourceName = inspiration.planningSourceName
        sdkReq.inspirationImageSource = inspiration.inspirationImageSource
        sdkReq.inspirationImageSourceCode = inspiration.inspirationImageSourceCode
        sdkReq.inspirationBrandCode = inspiration.inspirationBrandCode
        sdkReq.inspirationBrand = inspiration.inspirationBrand
        return sdkReq
    }

    @JvmStatic
    fun convert(inspiration: Inspiration, req: InspirationSubmitReq): Inspiration {
        // 只有仿款有期望成本价
        inspiration.expectedCostPrice = req.expectedCostPrice
        inspiration.fastForward = req.fastForward
        // 更新波次
        inspiration.waveBatchCode = req.waveBatchCode
        inspiration.submitCount = if (inspiration.submitCount == null) 1 else inspiration.submitCount!! + 1

        // 不是已提交的灵感数据, 更新状态 已提交
        if (SubmitStatusEnum.SUBMITTED.code != inspiration.submitStatus) {
            inspiration.submitStatus = SubmitStatusEnum.SUBMITTED.code
        }
        // 是否推送AIDC
        val planningSourceEnum = PlanningSourceEnum.getByCode(inspiration.planningSourceCode)
        val isPushAidc = planningSourceEnum != null
                && inspiration.submitPushAidc != YesOrNoEnum.YES.code
                && !inspiration.thirdInspirationId.isNullOrBlank()
        if (isPushAidc) {
            inspiration.submitPushAidc = YesOrNoEnum.YES.code
        }
        inspiration.lastSubmitTime = LocalDateTime.now()
        if (req.syncCategory == Bool.YES.code) {
            if (StringUtils.isNotBlank(req.categoryCode) && !StringUtils.equalsIgnoreCase(
                    req.categoryCode, inspiration.identifiedCategoryCode
                )
            ) {
                // 清空识别的标签
                inspiration.identifiedLabel = "{}"
            }
            if (StringUtils.isNotBlank(req.categoryCode)) {
                inspiration.identifiedCategoryCode = req.categoryCode
            }
            if (StringUtils.isNotBlank(req.categoryName)) {
                inspiration.identifiedCategory = req.categoryName
            }
        }
        return inspiration
    }

    @JvmStatic
    fun convert(
        req: InspirationSubmitReq,
        businessCodeGenerator: BusinessCodeGenerator,
        digitalPrintTaskId: Long
    ): SubmitDownstreamLog {
        val log = SubmitDownstreamLog()
        log.logId = IdHelper.getId()
        log.inspirationId = req.inspirationId
        log.businessId = IdHelper.getId()
        log.businessCode = businessCodeGenerator.generate(CodeRuleEnum.INSPIRATION_SUBMIT_CODE)
        log.waveBatchCode = req.waveBatchCode
        log.downstreamTaskId = digitalPrintTaskId
        log.taskStatus = TaskStateEnum.SUBMIT.code
        log.generationType = SupplyModeEnum.getByCode(req.supplyMethod)?.code
        log.taskStatus = TaskStateEnum.SUBMIT.code
        log.request = req.toJson()
        return log
    }

    @JvmStatic
    fun convert(req: InspirationSubmitReq, newAiDesign: AiDesignTask): SubmitDownstreamLog {
        val log = SubmitDownstreamLog()
        log.logId = IdHelper.getId()
        log.inspirationId = newAiDesign.inspirationId
        log.businessId = newAiDesign.busId
        log.waveBatchCode = req.waveBatchCode
        log.businessCode = newAiDesign.busCode
        log.downstreamTaskId = newAiDesign.aiTaskId
        log.generationType = SupplyModeEnum.getByCode(req.supplyMethod)?.code
        log.taskStatus = TaskStateEnum.SUBMIT.code
        log.request = req.toJson()
        return log
    }

    @JvmStatic
    fun convert(aiDesignTask: AiDesignTask,inspiration: Inspiration): InspirationDesignReq {
        val req = InspirationDesignReq()
        req.smartIdentifyId = aiDesignTask.smartIdentifyId
        req.busId = aiDesignTask.busId
        req.parentBusId = aiDesignTask.parentBusId
        req.busCode = aiDesignTask.busCode
        req.inspirationId = aiDesignTask.inspirationId
        req.inspirationCode = inspiration.inspirationCode
        req.refImgUrl = aiDesignTask.inspirationImage
        req.refImgName = aiDesignTask.inspirationImageName
        req.categoryCode = aiDesignTask.categoryCode
        req.categoryName = aiDesignTask.categoryName
        req.multiPose = aiDesignTask.generateMode
        req.filterBack = aiDesignTask.filterBack
        req.faceRepair = aiDesignTask.faceRepair
        req.promiseEnhanced = aiDesignTask.promiseEnhanced
        req.fastForward = aiDesignTask.fastForward
        req.syncCategory = Bool.NO.code
        if (aiDesignTask.enableSyncCategory == true) {
            req.syncCategory = Bool.YES.code
        }
        if (aiDesignTask.sceneInfo != null && StringUtils.isNotBlank(aiDesignTask.sceneInfo)) {
            val sceneInfo = aiDesignTask.sceneInfo.parseObject<SmartDevelopStyleSceneReq>()
            if (sceneInfo != null) {
                req.sceneInfo = sceneInfo
            }
        }
        if (aiDesignTask.modelInfo != null && StringUtils.isNotBlank(aiDesignTask.modelInfo)) {
            val modelInfo = aiDesignTask.modelInfo.parseObject<AiDesignModelBo>()
            if (modelInfo != null) {
                req.aiModelCode = modelInfo.aiModelCode
            }
        }
        req.modelMaterialId = aiDesignTask.modelMaterialId
        req.modelMaterialName = aiDesignTask.modelMaterialName
        req.modelMaterialUrl = aiDesignTask.modelMaterialUrl
        req.genCount = aiDesignTask.genCount
        req.taskAttribute = 0
        req.modeCode = aiDesignTask.modeCode
        req.modeName = aiDesignTask.modeName
        req.refWeight = aiDesignTask.refWeight
        req.styleGenCount = aiDesignTask.styleGenerateNum
        req.modelEthnicity = aiDesignTask.modelEthnicity
        req.materials = aiDesignTask.materials.map {
            AiDesignMaterialReq(it.materialLibraryId, it.materialType, it.pictureUrl, it.maskPictureUrl)
        }
        return req
    }

    @JvmStatic
    fun convert(
        req: InspirationSubmitReq,
        inspiration: Inspiration,
        businessCodeGenerator: BusinessCodeGenerator,
        fmClient: FmClient
    ): AiDesignTask {
        // 登录人信息
        val user = CurrentUserHolder.get()
        val newAiDesign = AiDesignTask()
        newAiDesign.taskId = IdHelper.getId()
        newAiDesign.busId = IdHelper.getId()
        newAiDesign.busCode = businessCodeGenerator.generate(CodeRuleEnum.INSPIRATION_SUBMIT_CODE)
        newAiDesign.taskStatus = TaskStateEnum.SUBMIT.code
        newAiDesign.inspirationId = inspiration.inspirationId
        newAiDesign.inspirationImage = inspiration.inspirationImage
        newAiDesign.inspirationImageName = inspiration.sourceImageName
        newAiDesign.smartIdentifyId = inspiration.identifiedId
        newAiDesign.categoryCode = inspiration.identifiedCategoryCode
        newAiDesign.categoryName = inspiration.identifiedCategory
        newAiDesign.fastForward = req.fastForward
        // 1.单独提交 2.aigc
//        if (req.single) {
        val categoryCode = req.categoryCode
        val categoryName = req.categoryName
        if (StringUtils.isNotBlank(categoryCode)) {
            newAiDesign.categoryCode = categoryCode
        }
        if (StringUtils.isNotBlank(categoryName)) {
            newAiDesign.categoryName = categoryName
        }
//        }
        newAiDesign.syncCategory = req.syncCategory
        newAiDesign.generateMode = req.generateMode
        newAiDesign.filterBack = req.filterBack
        newAiDesign.faceRepair = req.faceRepair
        newAiDesign.promiseEnhanced = req.promiseEnhanced
        log.info { "原promiseEnhanced ${newAiDesign.promiseEnhanced}" }
        // 拿品类获取是否能履约增强的配置
        if (req.promiseEnhanced == Bool.YES.code && StringUtils.isNotBlank(newAiDesign.categoryName)) {
            val labelInfo = fmClient.getLabelInfoByName(newAiDesign.categoryName)
            log.info { "categoryName=${newAiDesign.categoryName}  labelInfo=${labelInfo.toJson()}" }
            if (labelInfo !== null && labelInfo.successful) {
                val extendLabel = labelInfo.data?.extendLabel
                if (extendLabel != null && extendLabel != "") {
                    val anyMatch = extendLabel.split(",").stream().anyMatch { it == "9" }
                    if (!anyMatch) {
                        newAiDesign.promiseEnhanced = Bool.NO.code
                    }
                }
            }
        } else {
            newAiDesign.promiseEnhanced = Bool.NO.code
        }
        log.info { "现promiseEnhanced ${newAiDesign.promiseEnhanced}" }
        newAiDesign.modelInfo = req.modelInfo?.toJson()
        newAiDesign.sceneInfo = req.sceneInfo?.toJson()
        if (req.modelMaterialInfo != null) {
            newAiDesign.modelMaterialId = req.modelMaterialInfo!!.modelMaterialId
            newAiDesign.modelMaterialName = req.modelMaterialInfo!!.modelMaterialName
            newAiDesign.modelMaterialUrl = req.modelMaterialInfo!!.modelMaterialUrl
        }
        // 修改后重试的参数重置
        req.createExtParam?.let { ext ->
            newAiDesign.categoryCode = ext.categoryCode
            newAiDesign.categoryName = ext.categoryName
            newAiDesign.modelMaterialId = ext.modelMaterialId
            newAiDesign.modelMaterialName = ext.modelMaterialName
            newAiDesign.modelMaterialUrl = ext.modelMaterialUrl
            newAiDesign.parentBusId = ext.parentBusId
        }
        newAiDesign.genCount = req.generateNum
        newAiDesign.tenantId = user.tenantId
        newAiDesign.modeCode = req.modeCode
        newAiDesign.modeName = req.modeName
        newAiDesign.refWeight = req.refWeight
        newAiDesign.styleGenerateNum = req.styleGenCount
        newAiDesign.modelEthnicity = req.modelEthnicity ?: ""
        newAiDesign.tryOnFix = Bool.NO.code
        if (CollectionUtils.isNotEmpty(req.materials)) {
            newAiDesign.tryOnFix = Bool.YES.code
            newAiDesign.materials = req.materials.map {
                val e = AiDesignMaterial(IdHelper.getId())
                e.inspirationId = newAiDesign.inspirationId
                e.taskId = newAiDesign.taskId
                e.tenantId = newAiDesign.tenantId
                e.deleted = Bool.NO.code
                e.materialLibraryId = it.materialLibraryId
                e.materialType = it.materialType
                e.pictureUrl = it.pictureUrl
                e.maskPictureUrl = it.maskPictureUrl
                e
            }
        }
        return newAiDesign
    }

    fun externalSubmitInspirationConvert(
        req: ExternalSubmitInspirationReq,
        businessCodeGenerator: BusinessCodeGenerator,
        inspiration: Inspiration
    ): SubmitDownstreamLog? {
        val log = SubmitDownstreamLog()
        log.logId = IdHelper.getId()
        log.inspirationId = req.inspirationId
        log.businessId = req.businessId
        log.businessCode = businessCodeGenerator.generate(CodeRuleEnum.INSPIRATION_SUBMIT_CODE)
        log.downstreamTaskId = req.businessId
        log.taskStatus = TaskStateEnum.SUBMIT.code
        log.generationType = SupplyModeEnum.getByCode(req.supplyMethod)?.code
        log.waveBatchCode = inspiration.waveBatchCode
        log.request = req.toJson()
        return log
    }
}