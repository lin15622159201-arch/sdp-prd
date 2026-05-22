package tech.tiangong.sdp.convert


import com.alibaba.fastjson2.parseArray
import org.apache.commons.collections4.CollectionUtils
import org.apache.commons.lang3.StringUtils
import team.aikero.blade.core.exception.BusinessException
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.sequence.id.IdHelper
import team.aikero.blade.user.holder.CurrentUserHolder
import team.aikero.blade.util.json.toJson
import tech.tiangong.butted.common.req.UltraHdTaskCreateReq
import tech.tiangong.butted.common.vo.ResRepairImgVo
import tech.tiangong.butted.common.vo.SmartDesignTaskVo
import tech.tiangong.inspiration.common.vo.SmartDevelopStyleTaskExternalDetailVo
import tech.tiangong.sdp.common.dto.picking.PickingAddPictureDto
import tech.tiangong.sdp.common.dto.picking.ResRepairImgDto
import tech.tiangong.sdp.common.enums.PickingTypeEnum
import tech.tiangong.sdp.common.enums.YesOrNoEnum
import tech.tiangong.sdp.common.req.picking.PickingAddReq
import tech.tiangong.sdp.dao.bo.AttachmentBo
import tech.tiangong.sdp.dao.bo.PickingResultImageInfoBo
import tech.tiangong.sdp.dao.entity.*
import tech.tiangong.sdp.dao.repository.InspirationRepository
import tech.tiangong.sdp.dao.repository.PickingAiDesignPictureRepository
import tech.tiangong.sdp.dao.repository.PickingAiDesignStyleRepository
import tech.tiangong.sdp.enums.*
import tech.tiangong.sdp.enums.DesignSubmitStatusEnum
import tech.tiangong.sdp.enums.DevelopStyleTypeEnum
import tech.tiangong.sdp.enums.DictEnum
import tech.tiangong.sdp.enums.PickingStateEnum
import tech.tiangong.sdp.external.DictClientExternal
import tech.tiangong.sdp.req.DesignDemandCreateReq
import tech.tiangong.sdp.req.ImageInfo
import tech.tiangong.sdp.req.picking.PickingStyleConfirmReq
import tech.tiangong.sdp.resp.picking.PickingStyleResultDetailVo.RecommendFabricDetail
import tech.tiangong.sdp.vo.req.DevelopStyleTaskAddReq
import java.time.LocalDateTime

object PickStyleConvert {
    @JvmStatic
    fun convert(
        pickingAiDesign: PickingAiDesign,
        pickingAiDesignStyle: PickingAiDesignStyle,
        reqResult: PickingStyleConfirmReq,
        dictClientExternal: DictClientExternal
    ): PickingAiDesignStyle {
        // 登录人信息
        val user = CurrentUserHolder.get()
        pickingAiDesignStyle.updateVersion = IdHelper.getId()

        val hasPicked = reqResult.imageInfos?.any { it.pickingState == PickingStateEnum.AVAILABLE.state }
        pickingAiDesignStyle.pickingState = reqResult.pickingState
        //特殊处理下姿势裂变和虚拟换衣，属于一组任务
        if (pickingAiDesign.oneTaskOneGroup()) {
            if (hasPicked == true) {
                pickingAiDesignStyle.pickingState = PickingStateEnum.AVAILABLE.state
            } else {
                pickingAiDesignStyle.pickingState = PickingStateEnum.NOT_SELECTED.state
            }
        }
        pickingAiDesignStyle.selectorId = user.id
        pickingAiDesignStyle.selectorName = user.name
        pickingAiDesignStyle.selectionTime = LocalDateTime.now()
        pickingAiDesignStyle.tenantId = user.tenantId
        if (reqResult.pickingState == PickingStateEnum.NOT_SELECTED.state) {
            // 未选中, 保存跑图失败原因
            pickingAiDesignStyle.runningProblemCode = reqResult.resultDetail?.runningDiagramProblemCodes?.toJson()
        }
        if (reqResult.pickingState == PickingStateEnum.AVAILABLE.state) {
            // 已选中
            val resultDetail = reqResult.resultDetail
            if (resultDetail != null) {
                pickingAiDesignStyle.suggestedPrice = resultDetail.suggestedPrice
                pickingAiDesignStyle.suggestedStyleCode = resultDetail.suggestedStyleCode
                // 格式:a>b>c, 取最后一个 > 后面的字符
                resultDetail.suggestedStyleCode?.split(">")?.lastOrNull()?.let {
                    pickingAiDesignStyle.suggestedStyleCode = it
                    pickingAiDesignStyle.suggestedStyleName = dictClientExternal.getByDictCode(
                        DictEnum.JV_STYLE,
                        pickingAiDesignStyle.suggestedStyleCode!!
                    )?.dictName
                }
                // 格式:a>b>c, 取最后一个 > 后面的字符
                resultDetail.suggestedCategoryCode?.split(">")?.lastOrNull()?.let {
                    pickingAiDesignStyle.suggestedCategoryCode = it
                    pickingAiDesignStyle.suggestedCategoryName = dictClientExternal.getByDictCode(
                        DictEnum.CLOTHING_CATEGORY,
                        pickingAiDesignStyle.suggestedCategoryCode!!
                    )?.dictName
                }
                pickingAiDesignStyle.suggestedWaveBatchCode = resultDetail.suggestedWaveBatchCode
                pickingAiDesignStyle.suggestedShopId = resultDetail.suggestedShopId
                pickingAiDesignStyle.suggestedShopName = resultDetail.suggestedShopName
                pickingAiDesignStyle.suggestedShopShortCode = resultDetail.suggestedShopCode
                pickingAiDesignStyle.suggestedPrintingCode = resultDetail.suggestedPrintingCode
                if (StringUtils.isNotBlank(resultDetail.suggestedCountrySiteCode)) {
                    pickingAiDesignStyle.suggestedCountrySiteCode = resultDetail.suggestedCountrySiteCode
                    pickingAiDesignStyle.suggestedCountrySiteName = dictClientExternal.getByDictCode(
                        DictEnum.NATIONAL,
                        resultDetail.suggestedCountrySiteCode!!
                    )?.dictName
                }
                pickingAiDesignStyle.cargoTrayCode = resultDetail.cargoTrayCode
                pickingAiDesignStyle.productThemeCode = resultDetail.productThemeCode
                pickingAiDesignStyle.productThemeName = resultDetail.productThemeName
                pickingAiDesignStyle.remark = resultDetail.remark
                pickingAiDesignStyle.attachments = resultDetail.attachments?.toJson()
                pickingAiDesignStyle.sceneCode = resultDetail.sceneCode ?: ""
                pickingAiDesignStyle.sceneName = resultDetail.sceneName ?: ""
            }
        }
        return pickingAiDesignStyle
    }

    fun convert(
        pickStylePair: MutableList<Pair<PickingAiDesignStyle, List<PickingAiDesignPicture>>>,
        pickingAiDesign: PickingAiDesign,
        oldResult: List<PickingAiDesignResult>
    ): MutableList<PickingAiDesignResult> {
        val user = CurrentUserHolder.get()
        //处理一个任务是一个款
        if (pickingAiDesign.oneTaskOneGroup()) {
            val hasSelected = pickStylePair.any { it.first.pickingState == PickingStateEnum.AVAILABLE.state }
            if (hasSelected) {
                pickStylePair.filter { it.first.pickingState == PickingStateEnum.AVAILABLE.state }
            }
        }
        return pickStylePair.map { pair ->
            val newPickingStyle = pair.first
            val newPictureList = pair.second
            PickingAiDesignResult().apply {
                this.pickingResultId = IdHelper.getId()
                this.inspirationId = pickingAiDesign.inspirationId
                this.designTaskId = pickingAiDesign.designTaskId
                this.designTaskCode = pickingAiDesign.designTaskCode
                this.waveBandCode = pickingAiDesign.waveBandCode
                this.waveBandName = pickingAiDesign.waveBandName
                this.storeId = pickingAiDesign.storeId
                this.storeName = pickingAiDesign.storeName

                val old = oldResult.filter { it.pickingStyleId == newPickingStyle.pickingStyleId }
                if (CollectionUtils.isNotEmpty(old)){
                    this.developStyleTaskId = old[0].developStyleTaskId
                }
                //this.developStyleTaskId = pickingAiDesign.sendTypeId
                //this.developStyleTaskCode = pickingAiDesign.sendTypeCode
                this.pickingState = newPickingStyle.pickingState
                if (PickingStateEnum.AVAILABLE.state == this.pickingState) {
                    this.designSubmitStatus = DesignSubmitStatusEnum.INIT.code
                }
                this.pickingId = pickingAiDesign.pickingId
                this.pickingStyleId = newPickingStyle.pickingStyleId
                this.pickingStyleSort = newPickingStyle.sort
                this.selectorId = user.id
                this.selectorName = user.name
                this.selectionTime = LocalDateTime.now()
                this.tenantId = user.tenantId
                this.suggestedPrice = newPickingStyle.suggestedPrice
                this.suggestedStyleCode = newPickingStyle.suggestedStyleCode
                this.suggestedStyleName = newPickingStyle.suggestedStyleName
                this.suggestedCategoryCode = newPickingStyle.suggestedCategoryCode
                this.suggestedCategoryName = newPickingStyle.suggestedCategoryName
                this.suggestedWaveBatchCode = newPickingStyle.suggestedWaveBatchCode

                this.suggestedShopId = pickingAiDesign.storeId
                this.suggestedShopCode = newPickingStyle.suggestedShopShortCode
                this.suggestedShopName = pickingAiDesign.storeName

                this.suggestedPrintingCode = newPickingStyle.suggestedPrintingCode
                this.suggestedCountrySiteCode = newPickingStyle.suggestedCountrySiteCode
                this.suggestedCountrySiteName = newPickingStyle.suggestedCountrySiteName
                this.cargoTrayCode = newPickingStyle.cargoTrayCode
                this.attachments = newPickingStyle.attachments
                this.remark = newPickingStyle.remark
                this.pickingCreatorId = pickingAiDesign.creatorId
                this.pickingCreatorName = pickingAiDesign.creatorName
                this.pickingCreatedTime = pickingAiDesign.createdTime
                // 图片bo
                //姿势裂变和虚拟换衣，选了可用的才到选款结果展示
                var allPicture = newPictureList
                val hasPicked = newPictureList?.any { it.pickingState == PickingStateEnum.AVAILABLE.state }
                if (pickingAiDesign.oneTaskOneGroup() && hasPicked == true) {
                    allPicture = newPictureList.filter { it.pickingState == PickingStateEnum.AVAILABLE.state }
                }
                val imageBoList = allPicture.map {
                    val imageBo = PickingResultImageInfoBo()
                    imageBo.pickingPictureId = it.pickingPictureId
                    imageBo.pictureUrl = it.pictureUrl
                    imageBo.repairImgUrl = it.repairImgUrl
                    imageBo.groupNum = it.groupNum
                    imageBo.serialNum = it.serialNum
                    imageBo.mainImageType = it.mainImageType
                    imageBo.fixImageType = it.fixImageType
                    imageBo.eliminateType = it.eliminateType
                    imageBo.eliminateReasonCodes = it.eliminateReason?.parseArray<String>()
                    imageBo
                }
                this.resultImageInfo = PickingResultImageInfoBo.boListToJson(imageBoList)
                this.sceneCode = newPickingStyle.sceneCode
                this.sceneName = newPickingStyle.sceneName
            }
        }.toMutableList()
    }


    @JvmStatic
    fun convert(results: List<PickingAiDesignResult>): List<UltraHdTask> =
        results.flatMap { pickResult ->
            val json = pickResult.resultImageInfo
            if (json == null) {
                emptyList()
            } else {
                PickingResultImageInfoBo.jsonToBoList(json).map {
                    UltraHdTask(
                        IdHelper.getId(), pickResult.tenantId ?: 0, getPictureUrl(it.pictureUrl, it.repairImgUrl),
                        it.pickingPictureId ?: 0, 0, pickResult.pickingResultId ?: 0
                    )

                }
            }
        }

    @JvmStatic
    fun convert(task: UltraHdTask, result: PickingAiDesignResult, host: String): UltraHdTaskCreateReq {
        val ultraHdTaskCreateReq = UltraHdTaskCreateReq()
        ultraHdTaskCreateReq.busId = task.taskId
        ultraHdTaskCreateReq.taskMode = "SMART_DESIGN"
        ultraHdTaskCreateReq.pictureUrl = task.imageUrl
        ultraHdTaskCreateReq.callback = "$host/sdp-curation/inner/v1/picking/callback/ultra-hd-task"
        ultraHdTaskCreateReq.tenantId = result.tenantId
        ultraHdTaskCreateReq.creatorId = result.selectorId
        ultraHdTaskCreateReq.creatorName = result.selectorName
        return ultraHdTaskCreateReq
    }

    @JvmStatic
    fun convert(newTask: UltraHdTask, sourceTask: UltraHdTask, host: String): UltraHdTaskCreateReq {
        val ultraHdTaskCreateReq = UltraHdTaskCreateReq()
        ultraHdTaskCreateReq.busId = newTask.taskId
        ultraHdTaskCreateReq.taskMode = "SMART_DESIGN"
        ultraHdTaskCreateReq.pictureUrl = newTask.imageUrl
        ultraHdTaskCreateReq.callback = "$host/sdp-curation/inner/v1/picking/callback/ultra-hd-task"
        ultraHdTaskCreateReq.tenantId = sourceTask.tenantId
        ultraHdTaskCreateReq.creatorId = sourceTask.creatorId
        ultraHdTaskCreateReq.creatorName = sourceTask.creatorName
        return ultraHdTaskCreateReq
    }


    /**
     * 优先使用修复图
     *
     * @param pictureUrl
     * @param repairImgUrl
     * @return
     */
    @JvmStatic
    private fun getPictureUrl(pictureUrl: String?, repairImgUrl: String?): String {
        return if (!repairImgUrl.isNullOrBlank()) {
            repairImgUrl
        } else {
            pictureUrl ?: ""
        }
    }


    @JvmStatic
    fun convert(
        pickingAiDesignResult: PickingAiDesignResult,
        pickingAiDesign: PickingAiDesign,
        dictClientExternal: DictClientExternal,
        aiDesignTask: AiDesignTask?,
        fabrics: List<RecommendFabricDetail>?,
        inspirationRepository: InspirationRepository,
        pickingAiDesignPictureRepository: PickingAiDesignPictureRepository,
        pickingAiDesignStyleRepository: PickingAiDesignStyleRepository
    ): DesignDemandCreateReq {
        val sdkReq = DesignDemandCreateReq()
        sdkReq.sourceBizId = pickingAiDesignResult.pickingResultId
        sdkReq.inspirationStyleId = pickingAiDesignResult.pickingResultId
        sdkReq.supplyModeName = pickingAiDesign.supplyMethodName
        sdkReq.supplyModeCode = pickingAiDesign.supplyMethodCode
        sdkReq.productLink = pickingAiDesign.productLink
        sdkReq.category = pickingAiDesignResult.suggestedCategoryCode
        sdkReq.categoryName = pickingAiDesignResult.suggestedCategoryName
        sdkReq.suggestedStyle = pickingAiDesignResult.suggestedStyleName
        sdkReq.suggestedStyleCode = pickingAiDesignResult.suggestedStyleCode
        sdkReq.countrySiteCode = pickingAiDesignResult.suggestedCountrySiteCode
        sdkReq.countrySiteName = pickingAiDesignResult.suggestedCountrySiteName
        sdkReq.storeId = pickingAiDesignResult.suggestedShopId
        sdkReq.storeName = pickingAiDesignResult.suggestedShopName
        sdkReq.sellingPrice = pickingAiDesignResult.suggestedPrice?.toString()
        sdkReq.waveBandCode = pickingAiDesignResult.suggestedWaveBatchCode
        sdkReq.waveBandName = pickingAiDesignResult.suggestedWaveBatchCode
        sdkReq.chosenId = pickingAiDesignResult.selectorId
        sdkReq.chosenName = pickingAiDesignResult.selectorName
        sdkReq.chosenTime = pickingAiDesignResult.selectionTime
        sdkReq.originalImage = pickingAiDesign.inspirationImage
        sdkReq.palletTypeCode = pickingAiDesignResult.cargoTrayCode
        sdkReq.palletTypeName = pickingAiDesignResult.cargoTrayCode?.let { it1 ->
            dictClientExternal.getByDictCode(
                DictEnum.TRAY_TYPE,
                it1
            )?.dictName
        }
        sdkReq.aigcRemark = pickingAiDesignResult.remark
        val attachments = pickingAiDesignResult.attachments
        if (StringUtils.isNotBlank(attachments)) {
            sdkReq.attachments = attachments.parseArray<AttachmentBo>()
        }
        if (aiDesignTask != null) {
            sdkReq.runNo = aiDesignTask.aiTaskCode
            sdkReq.runCreatorName = aiDesignTask.creatorName
            sdkReq.submitUserId = aiDesignTask.creatorId
            sdkReq.submitUserName = aiDesignTask.creatorName
        }
        sdkReq.inspirationImageList =
            convert(pickingAiDesignResult.resultImageInfo ?: "[]", pickingAiDesignPictureRepository)

        if (CollectionUtils.isEmpty(sdkReq.inspirationImageList)) {
            throw BusinessException("当前没有可用结果图")
        }
        if (!fabrics.isNullOrEmpty()) {
            var index = 0
            val list = fabrics
                .filter { ff -> ff.commodityId != null }
                .map {
                    val fabric = DesignDemandCreateReq.SuggestedMaterialInfo()
                    fabric.sortNum = index
                    fabric.commodityName = it.commodityName
                    fabric.spuId = it.commodityId
                    fabric.spuCode = it.commodityCode
                    fabric.skuId = it.skuId
                    fabric.skuCode = it.skuCode
                    index++
                    fabric
                }
            sdkReq.suggestedMaterialList = list
        }
        sdkReq.sceneCode = pickingAiDesignResult.sceneCode
        sdkReq.sceneName = pickingAiDesignResult.sceneName
        val inspirationId = pickingAiDesignResult.inspirationId
        if (inspirationId != null) {
            val inspiration = inspirationRepository.getById(inspirationId)
            if (inspiration != null) {
                sdkReq.planningSourceCode = inspiration.planningSourceCode
                sdkReq.planningSourceName = inspiration.planningSourceName
                sdkReq.inspirationImageSource = inspiration.inspirationImageSource
                sdkReq.inspirationImageSourceCode = inspiration.inspirationImageSourceCode
                sdkReq.inspirationBrandCode = inspiration.inspirationBrandCode
                sdkReq.inspirationBrand = inspiration.inspirationBrand
            }

        }
        // 商品主题
        pickingAiDesignResult.pickingStyleId?.let {
            pickingAiDesignStyleRepository.getById(it)?.let { style ->
                sdkReq.productThemeCode = style.productThemeCode
                sdkReq.productThemeName = style.productThemeName
            }
        }
        return sdkReq
    }


    @JvmStatic
    fun convert(
        resultImageInfo: String,
        pickingAiDesignPictureRepository: PickingAiDesignPictureRepository
    ): List<ImageInfo> {
        val imageIds = PickingResultImageInfoBo.jsonToBoList(resultImageInfo)
            .filter { YesOrNoEnum.NO.code == it.eliminateType }
            // 优先主图第一位:  mainImageType 降序排序，如果 mainImageType 相同，则按 serialNum 升序排序
            .map { it.pickingPictureId }
        if (imageIds.isEmpty()) {
            return emptyList()
        }
        val images = pickingAiDesignPictureRepository.listByIds(imageIds)
        if (images.isEmpty()) {
            return emptyList()
        }
        return images.map {
            ImageInfo(it.pictureUrl ?: "")
                .apply {
                    ultraHdUrl = it.ultraHdPictureUrl
                    mainImage = it.mainImageType
                }
        }
    }



    fun pickingBySmartDesignUpload(
        task: SmartDesignTaskVo,
        smartDevelopStyleTaskDetailVo: SmartDevelopStyleTaskExternalDetailVo
    ): PickingAddReq {
        val addReq = PickingAddReq()
        addReq.creatorId = smartDevelopStyleTaskDetailVo.creatorId
        addReq.creatorName = smartDevelopStyleTaskDetailVo.creatorName
        addReq.tenantId = smartDevelopStyleTaskDetailVo.tenantId
        addReq.sendTypeId = smartDevelopStyleTaskDetailVo.sourceBusinessId
        addReq.sendTypeCode = smartDevelopStyleTaskDetailVo.sourceBusinessCode
        if (null != smartDevelopStyleTaskDetailVo.inspirationId) {
            addReq.sendTypeId = smartDevelopStyleTaskDetailVo.inspirationId
            addReq.sendTypeCode = smartDevelopStyleTaskDetailVo.inspirationCode
        }
        addReq.businessTypeEnum = PickingTypeEnum.UPLOAD
        addReq.origin = PickingSourceTypeEnum.SMART_DEVELOP_STYLE.code
        addReq.supplyMethodCode = SupplyModeEnum.AIGC.code

        //AI设计相关信息
        val pickingAdd = PickingAddReq.PickingAddDto()
        pickingAdd.busId = smartDevelopStyleTaskDetailVo.taskId
        pickingAdd.busCode = smartDevelopStyleTaskDetailVo.taskCode
        pickingAdd.refImgUrl = smartDevelopStyleTaskDetailVo.referencePicture
        pickingAdd.modeCode = smartDevelopStyleTaskDetailVo.aiModelCode
        pickingAdd.modeName = smartDevelopStyleTaskDetailVo.aiModelName
        pickingAdd.category = smartDevelopStyleTaskDetailVo.categoryName
        pickingAdd.generateNum = smartDevelopStyleTaskDetailVo.styleGenCount

        //图片信息
        addReq.pickingAddDto = pickingAdd
        addReq.resImgList =  buildImageList(task)

        return addReq
    }

    private fun buildImageList(vo: SmartDesignTaskVo): List<PickingAddPictureDto> {
        return vo.resImgList!!.map { picture ->
            PickingAddPictureDto().apply {
                this.groupNum = picture.groupNum
                this.resImgList = picture.resImgList?.let { buildResImgList(it) }
            }
        }
    }

    private fun buildResImgList(pictures: List<ResRepairImgVo>): List<ResRepairImgDto> {
        return pictures.map { vo ->
            ResRepairImgDto(
                serialNum = vo.serialNum,
                resImg = vo.repairImg.takeIf { StringUtils.isNotBlank(it) } ?: vo.resImg
            )
        }
    }

    /* fun buildDevelopStyleTaskAddReq(
         pickingAiDesignStyle: PickingAiDesignStyle,
         pickingAiDesign: PickingAiDesign,
         pickingAiDesignResults: List<PickingAiDesignResult>,
         pictureList: List<PickingAiDesignPicture>
     ): List<DevelopStyleTaskAddReq> {
         var pickResult = pickingAiDesignResults.filter {
             it.pickingId == pickingAiDesignStyle.pickingId
                     && it.pickingStyleId == pickingAiDesignStyle.pickingStyleId
         }

         if (CollectionUtils.isEmpty(pickResult)) {
             log.error { "选款结果信息为空,选款ID:${pickingAiDesignStyle.pickingId}" }
             return emptyList()
         }
         val pictures = pictureList
             .filter {
                 it.pickingId == pickingAiDesignStyle.pickingId &&
                         it.pickingStyleId == pickingAiDesignStyle.pickingStyleId
             }.sortedBy { it.serialNum }
         if (CollectionUtils.isEmpty(pictures)) {
             log.error { "图片信息为空,选款ID:${pickingAiDesignStyle.pickingId}" }
             return emptyList()
         }
         var addReq = DevelopStyleTaskAddReq()
         addReq.pickingResultId = pickResult[0].pickingResultId
         addReq.pickingStyleId = pickingAiDesignStyle.pickingStyleId
         addReq.styleType = DevelopStyleTypeEnum.AI_STYLE
         addReq.wavebandCode = pickingAiDesign.waveBandCode
         addReq.wavebandName = pickingAiDesign.waveBandName
         addReq.storeId = pickingAiDesign.storeId
         addReq.storeName = pickingAiDesign.storeName
         addReq.mainImgUrl = pictures[0].pictureUrl
         return listOf(addReq)
     }*/

    fun buildDevelopStyleTaskAddReq(
        pickingAiDesignStyle: PickingAiDesignStyle,
        pickingAiDesign: PickingAiDesign,
        pickingAiDesignResults: List<PickingAiDesignResult>,
        pictureList: List<PickingAiDesignPicture>
    ): List<DevelopStyleTaskAddReq> {
        var pickResult = pickingAiDesignResults.filter {
            it.pickingId == pickingAiDesignStyle.pickingId
                    && it.pickingStyleId == pickingAiDesignStyle.pickingStyleId
        }

        if (CollectionUtils.isEmpty(pickResult)) {
            log.error { "选款结果信息为空,选款ID:${pickingAiDesignStyle.pickingId}" }
            return emptyList()
        }
        val pictures = pictureList
            .filter {
                it.pickingId == pickingAiDesignStyle.pickingId &&
                        it.pickingStyleId == pickingAiDesignStyle.pickingStyleId
            }.sortedBy { it.serialNum }
        if (CollectionUtils.isEmpty(pictures)) {
            log.error { "图片信息为空,选款ID:${pickingAiDesignStyle.pickingId}" }
            return emptyList()
        }
        var addReq = DevelopStyleTaskAddReq()
        addReq.pickingResultId = pickResult[0].pickingResultId
        addReq.pickingStyleId = pickingAiDesignStyle.pickingStyleId
        addReq.styleType = DevelopStyleTypeEnum.AI_STYLE
        addReq.wavebandCode = pickingAiDesign.waveBandCode
        addReq.wavebandName = pickingAiDesign.waveBandName
        addReq.storeId = pickingAiDesign.storeId
        addReq.storeName = pickingAiDesign.storeName
        addReq.mainImgUrl = pictures[0].pictureUrl
        return listOf(addReq)
    }
}