package tech.tiangong.sdp.service.impl

import com.alibaba.excel.EasyExcel
import com.alibaba.excel.context.AnalysisContext
import com.alibaba.excel.event.AnalysisEventListener
import com.baomidou.mybatisplus.extension.kotlin.KtQueryWrapper
import com.baomidou.mybatisplus.extension.kotlin.KtUpdateWrapper
import org.apache.commons.collections4.CollectionUtils
import org.apache.commons.lang3.StringUtils
import org.springframework.stereotype.Service
import org.springframework.transaction.PlatformTransactionManager
import org.springframework.web.multipart.MultipartFile
import team.aikero.admin.common.vo.DictVo
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.sequence.id.IdHelper
import team.aikero.blade.user.holder.CurrentUserHolder
import tech.tiangong.sdp.common.enums.YesOrNoEnum
import tech.tiangong.sdp.dao.bo.PickingResultImageInfoBo
import tech.tiangong.sdp.dao.entity.PickingAiDesignResult
import tech.tiangong.sdp.dao.entity.PickingAiHistory2024
import tech.tiangong.sdp.dao.repository.PickingAiDesignResultRepository
import tech.tiangong.sdp.dao.repository.PickingAiHistory2024Repository
import tech.tiangong.sdp.dto.PickingOldDataImportDTO
import tech.tiangong.sdp.enums.DictEnum
import tech.tiangong.sdp.enums.PickingOpenStyleStateEnum
import tech.tiangong.sdp.enums.PickingStateEnum
import tech.tiangong.sdp.enums.SupplyModeEnum
import tech.tiangong.sdp.external.DesignDemandClientExternal
import tech.tiangong.sdp.external.DictClientExternal
import tech.tiangong.sdp.req.DesignDemandCreateReq
import tech.tiangong.sdp.service.PickingHistory2024Service
import java.math.BigDecimal

/**
 * AI设计-选款-历史数据
 * @author zjh
 * @date 2025-2-7 11:09:00
 */
@Service
@Slf4j
class PickingHistory2024ServiceImpl(
    private val pickingAiHistory2024Repository: PickingAiHistory2024Repository,
    private val pickingAiDesignResultRepository: PickingAiDesignResultRepository,
    private val designDemandClientExternal: DesignDemandClientExternal,
    private val dictClientExternal: DictClientExternal,
    private val transactionManager: PlatformTransactionManager,
) : PickingHistory2024Service {

    private fun checkUrl(url: String?): String? {
        return if (StringUtils.isBlank(url) || "/" == url) {
            null
        } else {
            url?.trim()
        }
    }

    /**
     * 导入旧选款数据
     *
     * @param file
     */
    override fun importOldPickingData(file: MultipartFile) {
        val user = CurrentUserHolder.get()
        val waveBatchDictNameMap = dictClientExternal.getTopByDictCode(DictEnum.PLM_CLOTHING_BAND)?.children?.associateBy({ it.dictName }, { it })
        val countryDictNameMap = dictClientExternal.getTopByDictCode(DictEnum.NATIONAL)?.children?.associateBy({ it.dictName }, { it })
        val trayTypeDictNameMap = dictClientExternal.getTopByDictCode(DictEnum.TRAY_TYPE)?.children?.associateBy({ it.dictName }, { it })
        val styleDictList = dictClientExternal.getTopByDictCode(DictEnum.JV_STYLE)?.children
        val categoryDictList = dictClientExternal.getTopByDictCode(DictEnum.CLOTHING_CATEGORY)?.children
        val shopNameMap = mutableMapOf<String, Pair<Long, String>>().apply {
            put("ClosetCrush Selection", Pair(1798621241880473602, "PH7SCF8K6A"))
            put("BRANCHÉ Selection", Pair(1818231656002404353, "TH1JOM1J00"))
            put("Mia Muse", Pair(7276480307564389700, "cn1091715035cllae"))
        }
        EasyExcel.read(
            file.inputStream, PickingOldDataImportDTO::class.java, object : AnalysisEventListener<PickingOldDataImportDTO>() {
                private val cachedDataList: MutableList<PickingAiHistory2024> = mutableListOf()
                override fun invoke(data: PickingOldDataImportDTO, context: AnalysisContext) {
                    // 遍历每一行数据
                    val pickingAiHistory2024 = PickingAiHistory2024().apply {
                        this.historyId = IdHelper.getId()
                        this.selectedDate = data.selectedDate
                        this.country = data.country
                        this.productUrl = checkUrl(data.productUrl)
                        this.inspirationImageSource = data.inspirationImageSource
                        this.originalImageUrl = checkUrl(data.originalImageUrl)
                        this.generatedImageUrl1 = checkUrl(data.generatedImageUrl1)
                        this.generatedImageUrl2 = checkUrl(data.generatedImageUrl2)
                        this.generatedImageUrl3 = checkUrl(data.generatedImageUrl3)
                        this.generatedImageUrl4 = checkUrl(data.generatedImageUrl4)
                        this.taskCode = data.taskCode
                        this.guidancePrice = data.guidancePrice
                        this.buyerRemark = data.buyerRemark
                        this.designer = data.designer
                        this.imageSelector = data.imageSelector
                        this.productDiskType = data.productDiskType
                        this.systemCategory = data.systemCategory
                        this.systemShop = data.systemShop
                        this.systemProductSourceChannel = data.systemProductSourceChannel
                        this.systemStyleTag = data.systemStyleTag
                        this.designStyleCode = data.designStyleCode
                        this.dismantlingDate = data.dismantlingDate
                        this.systemWaveBand = data.systemWaveBand
                        this.flowStatusJudgment = data.flowStatusJudgment
                        this.eliminationReason = data.eliminationReason
                        this.designRemark = data.designRemark
                        this.spuCode = data.spuCode
                        this.tenantId = user.tenantId

                        // 需要补充的字段
                        this.countryCode = data.country?.let { countryDictNameMap?.get(it)?.dictCode }
                        this.imageSelectorId
                        this.selectedDatetime = PickingOldDataImportDTO.convertDate(data.selectedDate)
                        this.productDiskTypeCode = data.productDiskType?.let { trayTypeDictNameMap?.get(it)?.dictCode }
                        this.systemCategoryCode = data.systemCategory?.let { getDictCodeByCategory(categoryDictList, it) }
                        this.systemShopId = data.systemShop?.let { shopNameMap[it]?.first }
                        this.systemShopCode = data.systemShop?.let { shopNameMap[it]?.second }
                        this.systemStyleTagCode = data.systemStyleTag?.let { getDictCodeByStyle(styleDictList, it) }
                        this.dismantlingDatetime = PickingOldDataImportDTO.convertDateV2(data.dismantlingDate)
                        this.systemWaveBandCode = data.systemWaveBand?.let { waveBatchDictNameMap?.get(it)?.dictCode }
                        val imageBoList = mutableListOf<PickingResultImageInfoBo>()
                        listOf(
                            this.originalImageUrl,
                            this.generatedImageUrl1,
                            this.generatedImageUrl2,
                            this.generatedImageUrl3,
                            this.generatedImageUrl4
                        ).filter { StringUtils.isNotBlank(it) }.forEachIndexed { index, image ->
                            val bo = PickingResultImageInfoBo().apply {
                                this.pickingPictureId = IdHelper.getId()
                                this.pictureUrl = image
                                this.groupNum = 1
                                this.serialNum = index + 1
                                this.mainImageType = if (index == 0) 1 else 0
                                this.fixImageType = 0
                                this.eliminateType = 0
                                this.eliminateReasonCodes = mutableListOf()
                            }
                            imageBoList.add(bo)
                        }
                        this.resultImageInfo = PickingResultImageInfoBo.boListToJson(imageBoList)
                        this.pickingResultId = IdHelper.getId()
                    }
                    cachedDataList.add(pickingAiHistory2024)
                }

                override fun doAfterAllAnalysed(p0: AnalysisContext?) {
                    // 保存数据
                    saveData()
                }

                private fun saveData() {
                    if (CollectionUtils.isEmpty(cachedDataList)) {
                        log.warn { "没有数据，不进行存储" }
                        return
                    }
                    cachedDataList.chunked(500).forEach {
                        pickingAiHistory2024Repository.saveBatch(it)
                    }
                    log.info { "导入选款历史数据-${cachedDataList.size}条数据" }
                }
            }).sheet().doRead()
    }

    override fun oldPickingToResult(pickingResultIdList: List<Long>?) {
        val queryWrapper = KtQueryWrapper(PickingAiHistory2024::class.java)
        // 未创建结果数据的
        queryWrapper.eq(PickingAiHistory2024::isCreatePickingResult, 0)
        // 有参数, 根据参数查询; 没参数, 拿出所有数据
        if (pickingResultIdList != null) {
            queryWrapper.`in`(PickingAiHistory2024::pickingResultId, pickingResultIdList)
        }
        val oldDataList = pickingAiHistory2024Repository.list(queryWrapper)
        if (CollectionUtils.isEmpty(oldDataList)) {
            log.warn { "没有数据，不进行存储" }
            return
        }

        // 提取结果id, 查询结果数据, 并提取已存在的id
        val oldResultIdList = oldDataList.map { it.pickingResultId }.distinct()
        val pickingResultList = pickingAiDesignResultRepository.listByIds(oldResultIdList)
        val existPickingResultIdList = pickingResultList.map { it.pickingResultId }
        // 剔除存在的结果
        val newResultList = oldDataList.filter { !existPickingResultIdList.contains(it.pickingResultId) }
            .map {
                // 转换为结果数据
                val pickingResult = PickingAiDesignResult().apply {
                    this.pickingResultId = it.pickingResultId
                    this.pickingState = PickingStateEnum.AVAILABLE.state

                    this.pickingId = IdHelper.getId()
                    this.pickingStyleId = IdHelper.getId()
                    this.pickingStyleSort = 1
                    this.selectorId = it.imageSelectorId ?: -1  // TODO: 图片选择人id
                    this.selectorName = it.imageSelector
                    this.selectionTime = it.selectedDatetime
                    this.pickingCreatorId = this.selectorId
                    this.pickingCreatorName = this.selectorName
                    this.pickingCreatedTime = this.selectionTime
                    this.resultImageInfo = it.resultImageInfo
                    this.designTaskCode = it.taskCode

//                    this.suggestedPrice = it.guidancePrice // TODO 建议价格(旧数据是范围, 选款结果是一个数值, 因为旧数据只是用来存档, 存0)
                    this.suggestedPrice = BigDecimal.ZERO

                    this.suggestedStyleCode = it.systemStyleTagCode
                    this.suggestedStyleName = it.systemStyleTag
                    this.suggestedCategoryCode = it.systemCategoryCode
                    this.suggestedCategoryName = it.systemCategory
                    this.suggestedWaveBatchCode = it.systemWaveBandCode
                    this.suggestedShopId = it.systemShopId
                    this.suggestedShopCode = it.systemShopCode
                    this.suggestedShopName = it.systemShop
                    this.suggestedCountrySiteCode = it.countryCode
                    this.suggestedCountrySiteName = it.country
                    this.cargoTrayCode = it.productDiskTypeCode
                    this.remark = it.buyerRemark

                    if (PickingOpenStyleStateEnum.OPEN.desc == it.flowStatusJudgment) {
                        this.openStyleState = PickingOpenStyleStateEnum.OPEN.code
                        this.styleSkcCode = it.designStyleCode
                        this.styleSpuCode = it.spuCode
                        this.styleSpuCreateTime = it.dismantlingDatetime
                    } else if (PickingOpenStyleStateEnum.ELIMINATED.desc == it.flowStatusJudgment) {
                        this.openStyleState = PickingOpenStyleStateEnum.ELIMINATED.code
                        this.styleEliminateReason = it.eliminationReason
                        this.styleEliminateTime = it.dismantlingDatetime
//                    this.styleEliminateUserId = it.styleEliminateUserId
//                    this.styleEliminateUserName = it.styleEliminateUserName
                    }
                }
                pickingResult
            }
        if (CollectionUtils.isNotEmpty(newResultList)) {
            // 保存结果数据
            pickingAiDesignResultRepository.saveBatch(newResultList)
            // 更新2024历史数据状态
            pickingAiHistory2024Repository.update(
                KtUpdateWrapper(PickingAiHistory2024::class.java)
                    .set(PickingAiHistory2024::isCreatePickingResult, YesOrNoEnum.YES.code)
                   .`in`(PickingAiHistory2024::pickingResultId, newResultList.map { it.pickingResultId })
            )
        }
    }

    override fun oldPickingPush(pickingResultIdList: List<Long>?) {
        val queryWrapper = KtQueryWrapper(PickingAiHistory2024::class.java)
        // 未创建结果数据的
        queryWrapper.eq(PickingAiHistory2024::isPushInspirationDesign, 0)
        // 有参数, 根据参数查询; 没参数, 拿出所有数据
        if (pickingResultIdList != null) {
            queryWrapper.`in`(PickingAiHistory2024::pickingResultId, pickingResultIdList)
        }
        val oldDataList = pickingAiHistory2024Repository.list(queryWrapper)
        if (CollectionUtils.isEmpty(oldDataList)) {
            log.warn { "没有数据，不进行存储" }
            return
        }

        // 转为map key=result id
        val oldMap = oldDataList.associateBy { it.pickingResultId }

        // 提取结果id, 查询结果数据, 并提取已存在的id
        val oldResultIdList = oldDataList.map { it.pickingResultId }.distinct()
        val pickingResultList = pickingAiDesignResultRepository.listByIds(oldResultIdList)
        pickingResultList.forEach { pickingAiDesignResult ->

            val old = oldMap[pickingAiDesignResult.pickingResultId]

            // 发送灵感设计(下游)
            val sdkReq = DesignDemandCreateReq()
            sdkReq.sourceBizId=pickingAiDesignResult.pickingResultId
            sdkReq.inspirationStyleId=pickingAiDesignResult.pickingResultId
            sdkReq.supplyModeName=SupplyModeEnum.AIGC.desc
            sdkReq.supplyModeCode=SupplyModeEnum.AIGC.code
            sdkReq.productLink=old?.productUrl
            sdkReq.category=pickingAiDesignResult.suggestedCategoryCode
            sdkReq.categoryName=pickingAiDesignResult.suggestedCategoryName
            sdkReq.suggestedStyle=pickingAiDesignResult.suggestedStyleName
            sdkReq.suggestedStyleCode=pickingAiDesignResult.suggestedStyleCode
            sdkReq.countrySiteCode=pickingAiDesignResult.suggestedCountrySiteCode
            sdkReq.countrySiteName=pickingAiDesignResult.suggestedCountrySiteName
            sdkReq.storeId=pickingAiDesignResult.suggestedShopId
            sdkReq.storeName=pickingAiDesignResult.suggestedShopName
            sdkReq.sellingPrice=pickingAiDesignResult.suggestedPrice?.toString()
            sdkReq.waveBandCode=pickingAiDesignResult.suggestedWaveBatchCode
            sdkReq.waveBandName=pickingAiDesignResult.suggestedWaveBatchCode
            sdkReq.chosenId=pickingAiDesignResult.selectorId
            sdkReq.chosenName=pickingAiDesignResult.selectorName
            sdkReq.chosenTime=pickingAiDesignResult.selectionTime
            sdkReq.originalImage=old?.originalImageUrl
            sdkReq.palletTypeCode=pickingAiDesignResult.cargoTrayCode
            sdkReq.palletTypeName=old?.productDiskType
            sdkReq.aigcRemark=pickingAiDesignResult.remark
            sdkReq.runNo=old?.taskCode
            val imageBoList = PickingResultImageInfoBo.jsonToBoList(pickingAiDesignResult.resultImageInfo)
//            sdkReq.inspirationImageList=
//                imageBoList
//                    .filter { YesOrNoEnum.NO.code == it.eliminateType }
//                    // 优先主图第一位:  mainImageType 降序排序，如果 mainImageType 相同，则按 serialNum 升序排序
//                    .sortedWith(compareByDescending<PickingResultImageInfoBo> { it.mainImageType }.thenBy { it.serialNum })
//                    .map { getPictureUrl(it.pictureUrl, it.repairImgUrl) }

            try {
                val respVo = designDemandClientExternal.create(sdkReq)
                // 设计需求id
                pickingAiDesignResult.styleDesignDemandId = respVo.designDemandId
                pickingAiDesignResultRepository.updateById(pickingAiDesignResult)

                // 更新2024历史数据状态
                pickingAiHistory2024Repository.update(
                    KtUpdateWrapper(PickingAiHistory2024::class.java)
                        .set(PickingAiHistory2024::isPushInspirationDesign, YesOrNoEnum.YES.code)
                        .eq(PickingAiHistory2024::pickingResultId, pickingAiDesignResult.pickingResultId)
                )
            } catch (e: Exception) {
                log.error { "发送灵感设计失败: ${e.message}" }
                e.printStackTrace()
            }
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

    /**
     * 风格名称获取字典code(可能存在子级)
     * @param dictVoList
     * @param styleName
     * @return
     */
    fun getDictCodeByStyle(dictVoList: List<DictVo>?, styleName: String?): String? {
        if (CollectionUtils.isEmpty(dictVoList) || styleName?.isBlank() == true) {
            return null
        }
        for (it in dictVoList!!) {
            if (it.dictName == styleName) {
                return it.dictCode
            }
            // 继续向下找子级
            val dictCode = getDictCodeByStyle(it.children!!, styleName)
            if (dictCode?.isNotBlank() == true) {
                return dictCode
            }
        }
        return null
    }

    /**
     * 解析字符串"女装-裙装类-连衣裙", 根据"-"拆分, 逐级匹配, 匹配到返回字典code
     *
     * @param dictVoList
     * @param categoryName
     * @return
     */
    fun getDictCodeByCategory(dictVoList: List<DictVo>?, categoryName: String?): String? {
        if (CollectionUtils.isEmpty(dictVoList) || categoryName?.isBlank() == true) {
            return null
        }
        val categoryNames = categoryName?.split("-")
        if (CollectionUtils.isEmpty(categoryNames)) {
            return null
        }
        var lastCategoryCode: String? = null
        categoryNames?.forEach {
            val dictVo = getDictCodeByCategoryLoop(dictVoList, it)
            if (dictVo != null) {
                lastCategoryCode = dictVo.dictCode
            }
        }
        return lastCategoryCode
    }

    /**
     * 品类名称获取字典code(可能存在子级)
     * @param dictVoList
     * @param categoryName
     * @return
     */
    fun getDictCodeByCategoryLoop(dictVoList: List<DictVo>?, categoryName: String): DictVo? {
        if (CollectionUtils.isEmpty(dictVoList) || categoryName.isBlank()) {
            return null
        }
        for (it in dictVoList!!) {
            if (it.dictName == categoryName) {
                return it
            }
            // 继续向下找子级
            val vo = getDictCodeByCategoryLoop(it.children!!, categoryName)
            if (vo != null) {
                return vo
            }
        }
        return null
    }

}