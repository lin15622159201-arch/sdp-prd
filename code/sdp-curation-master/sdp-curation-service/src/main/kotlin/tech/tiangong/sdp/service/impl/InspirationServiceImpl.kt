package tech.tiangong.sdp.service.impl

import com.alibaba.excel.EasyExcel
import com.alibaba.excel.context.AnalysisContext
import com.alibaba.excel.event.AnalysisEventListener
import jakarta.servlet.http.HttpServletResponse
import org.apache.commons.collections4.CollectionUtils
import org.apache.commons.lang3.StringUtils
import org.springframework.beans.BeanUtils
import org.springframework.stereotype.Service
import org.springframework.transaction.PlatformTransactionManager
import org.springframework.transaction.annotation.Transactional
import org.springframework.transaction.support.TransactionTemplate
import org.springframework.web.multipart.MultipartFile
import team.aikero.blade.core.enums.Bool
import team.aikero.blade.core.exception.BusinessException
import team.aikero.blade.core.protocol.PageVo
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.sequence.code.generate.BusinessCodeGenerator
import team.aikero.blade.sequence.id.IdHelper
import team.aikero.blade.user.holder.CurrentUserHolder
import team.aikero.blade.util.json.parseJson
import team.aikero.blade.util.json.toJson
import team.aikero.blade.util.json.toJsonPretty
import tech.tiangong.bfg.sdk.client.FmClient
import tech.tiangong.pop.common.enums.YesOrNoEnum
import tech.tiangong.sdp.common.req.AiDesignTaskCreateExt
import tech.tiangong.sdp.common.req.AiDesignTaskCreateReq
import tech.tiangong.sdp.common.req.ExternalSubmitInspirationReq
import tech.tiangong.sdp.common.resp.GetInspirationOrPickingIdResp
import tech.tiangong.sdp.common.resp.GetInspirationOrPickingIdResp.InspirationInfoResp
import tech.tiangong.sdp.common.resp.GetInspirationOrPickingIdResp.PickingInfoResp
import tech.tiangong.sdp.common.resp.InspirationDetailVo
import tech.tiangong.sdp.common.resp.VirtualTryOnTaskVO
import tech.tiangong.sdp.convert.InspirationConvert
import tech.tiangong.sdp.convert.StyleGenTaskConvert
import tech.tiangong.sdp.dao.bo.AiDesignModelBo
import tech.tiangong.sdp.dao.bo.AiDesignSceneBo
import tech.tiangong.sdp.dao.bo.KeyValueBo
import tech.tiangong.sdp.dao.entity.Inspiration
import tech.tiangong.sdp.dao.entity.InspirationLabel
import tech.tiangong.sdp.dao.entity.SubmitDownstreamLog
import tech.tiangong.sdp.dao.repository.*
import tech.tiangong.sdp.dto.InspirationExportDTO
import tech.tiangong.sdp.dto.InspirationImportDTO
import tech.tiangong.sdp.enums.*
import tech.tiangong.sdp.external.*
import tech.tiangong.sdp.req.AiDesignMaterialReq
import tech.tiangong.sdp.req.inspiration.*
import tech.tiangong.sdp.resp.PostureFissionTaskExternalVo
import tech.tiangong.sdp.resp.StyleGenTaskResp
import tech.tiangong.sdp.resp.inspiration.*
import tech.tiangong.sdp.service.InspirationService
import tech.tiangong.sdp.service.component.InspirationImageComponent
import tech.tiangong.sdp.service.component.InspirationTaskComponent
import tech.tiangong.sdp.service.component.LazadaComponent
import tech.tiangong.sdp.utils.FileExportUtils
import tech.tiangong.sdp.utils.TransactionHelper
import java.io.IOException
import java.math.BigDecimal
import java.time.LocalDateTime
import javax.validation.ValidationException

/**
 * 灵感源
 * @author zjh
 * @date 2024/11/20 09:55
 */
@Service
@Slf4j
class InspirationServiceImpl(
    private val inspirationRepository: InspirationRepository,
    private val inspirationLabelRepository: InspirationLabelRepository,
    private val submitDownstreamLogRepository: SubmitDownstreamLogRepository,
    private val aiDesignMaterialRepository: AiDesignMaterialRepository,
    private val aiDesignTaskRepository: AiDesignTaskRepository,
    private val pickingAiDesignResultRepository: PickingAiDesignResultRepository,
    private val inspirationTaskComponent: InspirationTaskComponent,
    private val dictClientExternal: DictClientExternal,
    private val lazadaComponent: LazadaComponent,
    private val businessCodeGenerator: BusinessCodeGenerator,
    private val transactionManager: PlatformTransactionManager,
    private val inspirationImageComponent: InspirationImageComponent,
    private val fmClient: FmClient,
    private val styleGenTaskRepository: StyleGenTaskRepository,
    private val styleGenClientExternal: StyleGenClientExternal,
    private val postureFissionExternal: PostureFissionExternal,
    private val virtualTryOnExternal: VirtualTryOnExternal,
) : InspirationService {

    /**
     * 列表分页
     * @param req 请求对象
     * @return
     */
    override fun page(req: InspirationPageReq): PageVo<InspirationPageResp> {
        req.tenantId = CurrentUserHolder.get().tenantId
        val pageData = inspirationRepository.listPage(req)
        if (pageData.records.isEmpty() || pageData.records.isEmpty()) {
            return PageVo(req.pageNum, 0, listOf())
        }
        val inspirationIds = pageData.records.mapNotNull { it.inspirationId }
        var labelMap = mapOf<Long, List<InspirationLabel>>()
        if (inspirationIds.isNotEmpty()) {
            labelMap = inspirationLabelRepository.getLabelsByInspirationIds(inspirationIds)
        }

        // key=字典值code,value=字典值vo
        val dictCodeMap =
            dictClientExternal.getTopByDictCode(DictEnum.PLM_CLOTHING_BAND)?.children?.associateBy(
                { it.dictCode },
                { it })

        return PageVo(req.pageNum, pageData.total.toInt(), pageData.records.map {
            val resp = InspirationPageResp()
            resp.inspirationId = it.inspirationId
            resp.inspirationCode = it.inspirationCode
            resp.planningSourceCode = it.planningSourceCode
            resp.planningSourceName = it.planningSourceName
            resp.waveBatchCode = it.waveBatchCode
            resp.waveBatchName = it.waveBatchCode?.let { it1 -> dictCodeMap?.get(it1)?.dictName }
            resp.inspirationImage = it.inspirationImage
            resp.externalCategory = it.externalCategory
            resp.inspirationImageSource = it.inspirationImageSource
            resp.sourceCountrySiteName = it.countrySiteName
            resp.retailPrice = it.retailPrice
            resp.salePrice = it.salePrice
            resp.suggestedSupplyModeCode = it.suggestedSupplyModeCode
            resp.inspirationCreatedTime = it.createdTime
            resp.dataSource = it.dataSource
            resp.identifiedCategory = it.identifiedCategory
            resp.identifiedCategoryCode = it.identifiedCategoryCode
            resp.identifiedStatus = it.identifiedStatus
            val labelKvList = mutableListOf<KeyValueBo>()
            labelMap[it.inspirationId]?.forEach { label ->
                val kv = KeyValueBo()
                kv.key = label.labelName
                kv.value = label.labelValueName
                labelKvList.add(kv)
            }
            resp.identifiedLabel = labelKvList
            resp.styleType = it.styleType?.let { it1 -> StyleTypeEnum.of(it1)?.desc }
            resp.submitCount = it.submitCount
            resp.submitStatus = it.submitStatus
            resp.creatorId = it.creatorId
            resp.creatorName = it.creatorName
            resp.inspirationBrand = it.inspirationBrand
            resp.styleSourceCode = it.styleSourceCode
            resp.styleSourceName = it.styleSourceName
            resp
        })
    }

    /**
     * 导出
     * @param req 请求对象
     * @return
     */
    override fun export(response: HttpServletResponse, req: InspirationPageReq) {
        req.pageNum = 1
        req.pageSize = 500
        val allData: MutableList<InspirationExportDTO> = mutableListOf()
        while (true) {
            val pageData = inspirationRepository.listPage(req)
            if (pageData.records.isEmpty() || pageData.records.isEmpty()) {
                break
            }

            req.pageNum += 1

            val inspirationIds = pageData.records.mapNotNull { it.inspirationId }
            var labelMap = mapOf<Long, List<InspirationLabel>>()
            if (inspirationIds.isNotEmpty()) {
                labelMap = inspirationLabelRepository.getLabelsByInspirationIds(inspirationIds)
            }

            pageData.records.forEach {
                val dto = InspirationExportDTO()
                dto.planningSource = it.planningSourceName
                dto.waveBatchCode = it.waveBatchCode
                dto.inspirationImage = it.inspirationImage
                dto.externalCategory = it.externalCategory
                dto.inspirationImageSource = it.inspirationImageSource
                dto.sourceCountrySiteName = it.countrySiteName
                dto.retailPrice = it.retailPrice
                dto.salePrice = it.salePrice
                dto.suggestedSupplyMethod = SupplyModeEnum.getByCode(it.suggestedSupplyModeCode)?.desc
                dto.inspirationCreatedTime = it.inspirationCreatedTime
                dto.dataSource = it.dataSource
                dto.productLink = it.productLink
                dto.identifiedCategory = it.identifiedCategory
                dto.identifiedStatus = it.identifiedStatus?.let { it1 -> IdentifiedStatusEnum.getByCode(it1)?.desc }
                dto.styleType = it.styleType?.let { it1 -> StyleTypeEnum.of(it1)?.desc }
                dto.submitCount = it.submitCount
                dto.submitStatus = it.submitStatus?.let { it1 -> SubmitStatusEnum.getByCode(it1)?.desc }

                //  labelMap[it.inspirationId] 组装成字符串, 格式:key:value,key1:value1
                val labelKvMap =
                    labelMap[it.inspirationId]?.associateBy({ it1 -> it1.labelName }, { it2 -> it2.labelValueName })
                val labelList = labelKvMap?.entries?.map { it1 -> "${it1.key}:${it1.value}" }
                dto.identifiedLabel = labelList?.joinToString(",")
                allData.add(dto)
            }
        }/*
        InspirationExportDTO
        导出文件名称为模块+日期+批次
        如导出灵感源2024102601
         */
        val fileName = "灵感源" + businessCodeGenerator.generate(CodeRuleEnum.INSPIRATION_EXPORT) + ".xlsx"
        try {
            FileExportUtils.exportExcelEntity(fileName, response, InspirationExportDTO::class.java, allData)
        } catch (e: IOException) {
            log.error(e) { "导出失败:" }
            throw BusinessException("导出失败")
        }
    }

    /**
     * Excel导入
     * @param file
     */
    override fun importExcel(file: MultipartFile): InspirationImportResultVo {
        val result = InspirationImportResultVo()
        EasyExcel.read(
            file.inputStream, InspirationImportDTO::class.java, object : AnalysisEventListener<InspirationImportDTO>() {
                private val cachedDataList: MutableList<InspirationImportDTO> = mutableListOf()

                override fun invoke(data: InspirationImportDTO, context: AnalysisContext) {
                    // 在这里处理每一行数据，例如打印出来
                    var isError = false

                    // 抽出公共逻辑
                    fun checkField(check: Boolean, errorMessage: String) {
                        if (check) {
                            val failureDetail = InspirationImportResultVo.FailureDetail()
                            failureDetail.rowNumber = context.readRowHolder().rowIndex + 1
                            failureDetail.reason = String.format(errorMessage, context.readRowHolder().rowIndex + 1)
                            result.failureDetails.add(failureDetail)
                            isError = true
                        }
                    }
                    // 校验
                    checkField(StringUtils.isBlank(data.suggestedSupplyMethod), "第 %s 行的”供给方式“不能为空！")
                    checkField(StringUtils.isBlank(data.planningSource), "第 %s 行的”企划来源“不能为空！")
                    checkField(StringUtils.isBlank(data.waveBatchCode), "第 %s 行的”波次“不能为空！")
                    checkField(StringUtils.isBlank(data.sourceImage), "第 %s 行的”图片URL“不能为空！")
                    // 判断灵感图来源和灵感图品牌
                    val inspirationImageSource = data.inspirationImageSource
                    if (StringUtils.isNotBlank(inspirationImageSource)) {
                        val find =
                            dictClientExternal.getTopByDictCode(DictEnum.INSPIRATION_IMAGE_SOURCE)?.children?.find { dictVo -> dictVo.dictName == inspirationImageSource }
                        if (find == null) {
                            checkField(true, "第 %s 行的”灵感图来源“未找到！")
                        }
                    }
                    val inspirationBrand = data.inspirationBrand
                    if (StringUtils.isNotBlank(inspirationBrand)) {
                        val find =
                            dictClientExternal.getTopByDictCode(DictEnum.INSPIRATION_BRAND)?.children?.find { dictVo -> dictVo.dictName == inspirationBrand }
                        if (find == null) {
                            checkField(true, "第 %s 行的”灵感图品牌“未找到！")
                        }
                    }
                    val styleSourceName = data.styleSourceName
                    if (StringUtils.isNotBlank(styleSourceName)) {
                        val find =
                            dictClientExternal.getTopByDictCode(DictEnum.STYLE_SOURCE)?.children?.find { dictVo -> dictVo.dictName == styleSourceName }
                        if (find == null) {
                            checkField(true, "第 %s 行的”款式来源“未找到！")
                        }
                    }
                    if (isError) {
                        result.failCount += 1
                        return
                    }
                    cachedDataList.add(data)
                    result.successCount += 1
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

                    // key=字典值name,value=字典值vo
                    val planningSourceNameMap =
                        dictClientExternal.getTopByDictCode(DictEnum.PLANNING_SOURCE)?.children?.associateBy(
                            { it.dictName },
                            { it })
                    // key=字典值code,value=字典值vo
                    val countryNameMap =
                        dictClientExternal.getTopByDictCode(DictEnum.NATIONAL)?.children?.associateBy(
                            { it.dictName },
                            { it })

                    val inspirationImageSource =
                        dictClientExternal.getTopByDictCode(DictEnum.INSPIRATION_IMAGE_SOURCE)?.children?.associateBy(
                            { it.dictName },
                            { it })
                    val inspirationBrand =
                        dictClientExternal.getTopByDictCode(DictEnum.INSPIRATION_BRAND)?.children?.associateBy(
                            { it.dictName },
                            { it })

                    val styleSourceMap =
                        dictClientExternal.getTopByDictCode(DictEnum.STYLE_SOURCE)?.children?.associateBy(
                            { it.dictName },
                            { it })

                    // 20一批
                    cachedDataList.chunked(20).map { batch ->
                        val saveData = batch.map {
                            val inspiration = Inspiration()
                            inspiration.inspirationId = IdHelper.getId()
                            inspiration.inspirationCode =
                                businessCodeGenerator.generate(CodeRuleEnum.INSPIRATION_EXPORT)
                            inspiration.planningSourceCode =
                                it.planningSource?.let { it1 -> planningSourceNameMap?.get(it1)?.dictCode }
                            inspiration.planningSourceName = it.planningSource
                            inspiration.waveBatchCode = it.waveBatchCode
                            inspiration.sourceImage = it.sourceImage
                            inspiration.inspirationImage = ""
                            inspiration.productLink = it.productLink
                            inspiration.externalCategory = it.externalCategory
                            inspiration.inspirationImageSource = it.inspirationImageSource
                            inspiration.inspirationImageSourceCode =
                                it.inspirationImageSource?.let { it1 -> inspirationImageSource?.get(it1)?.dictCode }

                            inspiration.styleSourceName = it.styleSourceName
                            inspiration.styleSourceCode =
                                it.styleSourceName?.let { it1 -> styleSourceMap?.get(it1)?.dictCode }

                            inspiration.inspirationBrand = it.inspirationBrand
                            inspiration.inspirationBrandCode =
                                it.inspirationBrand?.let { it1 -> inspirationBrand?.get(it1)?.dictCode }
                            inspiration.countrySiteCode =
                                it.sourceCountrySiteName?.let { it1 -> countryNameMap?.get(it1)?.dictCode }
                            inspiration.countrySiteName = it.sourceCountrySiteName
                            inspiration.retailPrice = it.retailPrice?.toString()
                            inspiration.salePrice = it.salePrice?.toString()
                            inspiration.suggestedSupplyModeCode =
                                SupplyModeEnum.getByDesc(it.suggestedSupplyMethod)?.code.toString()
                            inspiration.suggestedSupplyModeName =
                                SupplyModeEnum.getByDesc(it.suggestedSupplyMethod)?.desc.toString()
                            inspiration.inspirationCreatedTime = LocalDateTime.now()
                            inspiration.dataSource = InspirationDataSourceTypeEnum.IMPORT.content
                            inspiration.submitCount = 0
                            inspiration.submitStatus = SubmitStatusEnum.PENDING.code
                            inspiration.styleName = it.styleName
                            inspiration.styleCode = it.styleName?.let {
                                dictClientExternal.getTopByDictCode(DictEnum.INSPIRATION_STYLE)?.children?.associateBy(
                                    { it.dictName },
                                    { it })?.get(inspiration.styleName)?.dictCode
                            }
                            inspiration.ageName = it.ageName
                            inspiration.ageCode = it.ageName?.let {
                                dictClientExternal.getTopByDictCode(DictEnum.INSPIRATION_AGE)?.children?.associateBy(
                                    { it.dictName },
                                    { it })?.get(inspiration.ageName)?.dictCode
                            }
                            inspiration.popularName = it.popularName
                            inspiration.popularCode = it.popularName?.let {
                                dictClientExternal.getTopByDictCode(DictEnum.INSPIRATION_POPULAR)?.children?.associateBy(
                                    { it.dictName },
                                    { it })?.get(inspiration.popularName)?.dictCode
                            }
                            inspiration.tenantId = CurrentUserHolder.get().tenantId
                            inspiration
                        }

                        // 手动事务
                        TransactionTemplate(transactionManager).executeWithoutResult {
                            inspirationRepository.saveBatch(saveData)
                            TransactionHelper.afterCommitExecute {
                                // 异步执行
//                                Thread {
                                // 开始处理
                                inspirationImageComponent.handler(saveData.mapNotNull { it.inspirationId })
//                                }.start()
                            }
                        }
                    }
                    log.info { "导入图片-${cachedDataList.size}条数据" }
                }
            }).sheet().doRead()
        return result
    }

    /**
     * 图片导入
     * @param req
     */
    override fun importImage(req: InspirationImportImageReq) {
        // key=字典值code,value=字典值vo
        val planningSourceDictCodeMap =
            dictClientExternal.getTopByDictCode(DictEnum.PLANNING_SOURCE)?.children?.associateBy(
                { it.dictCode },
                { it })
        // key=字典值code,value=字典值vo
        val countryDictCodeMap =
            dictClientExternal.getTopByDictCode(DictEnum.NATIONAL)?.children?.associateBy({ it.dictCode }, { it })
        val inspirationImageSourceCode = req.inspirationImageSourceCode
        if (StringUtils.isNotBlank(inspirationImageSourceCode)) {
            val find =
                dictClientExternal.getTopByDictCode(DictEnum.INSPIRATION_IMAGE_SOURCE)?.children?.find { it.dictCode == inspirationImageSourceCode }
            if (find == null) {
                throw BusinessException("灵感图来源未找到！")
            }
        }
        val inspirationBrandCode = req.inspirationBrandCode
        if (StringUtils.isNotBlank(inspirationBrandCode)) {
            val find =
                dictClientExternal.getTopByDictCode(DictEnum.INSPIRATION_BRAND)?.children?.find { it.dictCode == inspirationBrandCode }
            if (find == null) {
                throw BusinessException("灵感图品牌未找到！")
            }
        }


        // 灵感图来源
        val inspirationSource =
            dictClientExternal.getTopByDictCode(DictEnum.INSPIRATION_IMAGE_SOURCE)?.children?.associateBy(
                { it.dictCode },
                { it })

        // 灵感图品牌
        val inspirationBrand =
            dictClientExternal.getTopByDictCode(DictEnum.INSPIRATION_BRAND)?.children?.associateBy(
                { it.dictCode },
                { it })
        val inspirationList = req.inspirationImages?.map {
            val inspiration = Inspiration()
            inspiration.inspirationId = IdHelper.getId()
            inspiration.inspirationCode = businessCodeGenerator.generate(CodeRuleEnum.INSPIRATION_EXPORT)
            inspiration.planningSourceCode = req.planningSourceCode
            inspiration.planningSourceName =
                req.planningSourceCode?.let { it1 -> planningSourceDictCodeMap?.get(it1)?.dictName }
            inspiration.waveBatchCode = req.waveBatchCode
            inspiration.inspirationImage = ""
            inspiration.sourceImage = it.url
            inspiration.sourceImageName = it.name
            inspiration.inspirationImageSourceCode = req.inspirationImageSourceCode
            inspiration.inspirationImageSource =
                req.inspirationImageSourceCode?.let { it1 -> inspirationSource?.get(it1)?.dictName }
            inspiration.inspirationBrand = req.inspirationBrandCode?.let { it1 -> inspirationBrand?.get(it1)?.dictName }
            inspiration.inspirationBrandCode = req.inspirationBrandCode
            inspiration.countrySiteCode = req.countrySiteCode
            inspiration.countrySiteName = req.countrySiteCode?.let { it1 -> countryDictCodeMap?.get(it1)?.dictName }
            inspiration.suggestedSupplyModeCode = req.supplyMethodCode
            inspiration.suggestedSupplyModeName = SupplyModeEnum.getByCode(req.supplyMethodCode)?.desc
            inspiration.inspirationCreatedTime = LocalDateTime.now()
            inspiration.dataSource = InspirationDataSourceTypeEnum.IMPORT.content
            inspiration.styleSourceCode = req.styleSourceCode
            inspiration.styleSourceName = req.styleSourceName
            inspiration.submitCount = 0
            inspiration.submitStatus = SubmitStatusEnum.PENDING.code
            inspiration.styleCode = req.styleCode
            inspiration.styleName = req.styleCode?.let {
                dictClientExternal.getTopByDictCode(DictEnum.INSPIRATION_STYLE)?.children?.associateBy(
                    { it.dictCode },
                    { it })?.get(req.styleCode)?.dictName
            }
            inspiration.ageCode = req.ageCode
            inspiration.ageName = req.ageCode?.let {
                dictClientExternal.getTopByDictCode(DictEnum.INSPIRATION_AGE)?.children?.associateBy(
                    { it.dictCode },
                    { it })?.get(req.ageCode)?.dictName
            }
            inspiration.popularCode = req.popularCode
            inspiration.popularName = req.popularCode?.let {
                dictClientExternal.getTopByDictCode(DictEnum.INSPIRATION_POPULAR)?.children?.associateBy(
                    { it.dictCode },
                    { it })?.get(req.popularCode)?.dictName
            }
            inspiration.tenantId = CurrentUserHolder.get().tenantId
            inspiration
        }
        if (!inspirationList.isNullOrEmpty()) {
            inspirationRepository.saveBatch(inspirationList)
            TransactionHelper.afterCommitExecute {
                // 异步执行
//                Thread {

                // 开始处理
                inspirationImageComponent.handler(inspirationList.mapNotNull { it.inspirationId })


//                }.start()
            }
        }
    }


    /**
     * 详情
     * @param inspirationId
     */
    @Transactional(rollbackFor = [Exception::class])
    override fun getByInspirationId(inspirationId: Long): InspirationDetailVo {
        val inspiration: Inspiration =
            inspirationRepository.getById(inspirationId) ?: throw BusinessException("灵感源数据不存在")
        val ai = this.aiDesignTaskRepository.getByInspirationId(inspirationId)
        return InspirationDetailVo().apply {
            this.inspirationId = inspiration.inspirationId
            this.fastForward = inspiration.fastForward
            this.planningSourceCode = inspiration.planningSourceCode
            this.waveBatchCode = inspiration.waveBatchCode
            this.inspirationImage = inspiration.inspirationImage
            this.externalCategory = inspiration.externalCategory
            this.inspirationImageSource = inspiration.inspirationImageSource
            this.inspirationBrand = inspiration.inspirationBrand
            this.sourceCountrySiteName = inspiration.countrySiteName
            this.retailPrice = inspiration.retailPrice
            this.salePrice = inspiration.salePrice
            this.suggestedSupplyModeCode = inspiration.suggestedSupplyModeCode
            this.inspirationCreatedTime = inspiration.inspirationCreatedTime
            this.dataSource = inspiration.dataSource
            this.identifiedCategory = inspiration.identifiedCategory
            this.identifiedCategoryCode = inspiration.identifiedCategoryCode
            this.identifiedStatus = inspiration.identifiedStatus
            this.identifiedLabel = inspiration.identifiedLabel
            this.styleType = inspiration.styleType?.let { it1 -> StyleTypeEnum.of(it1)?.desc }
            this.submitCount = inspiration.submitCount
            this.submitStatus = inspiration.submitStatus
            this.creatorName = inspiration.creatorName
            this.createdTime = inspiration.createdTime
            this.productLinkUrl = inspiration.productLink
            this.styleGenCount = ai?.styleGenerateNum ?: 0
            this.modeCode = ai?.modeCode
            this.modeName = ai?.modeName
        }
    }

    /**
     * 详情
     * @param inspirationId
     */
    @Transactional(rollbackFor = [Exception::class])
    override fun detail(inspirationId: Long): InspirationDetailResp {
        val inspiration: Inspiration =
            inspirationRepository.getById(inspirationId) ?: throw BusinessException("灵感源数据不存在")
        val taskList: List<SubmitDownstreamLog> = submitDownstreamLogRepository.listByInspirationId(inspirationId)

        // key=字典值code,value=字典值vo
        val waveBatchDictCodeMap =
            dictClientExternal.getTopByDictCode(DictEnum.PLM_CLOTHING_BAND)?.children?.associateBy(
                { it.dictCode },
                { it })
        val ai = this.aiDesignTaskRepository.getByInspirationId(inspirationId)

        val e = InspirationDetailResp().apply {
            this.inspirationId = inspiration.inspirationId
            this.fastForward = inspiration.fastForward
            this.planningSourceCode = inspiration.planningSourceCode
            this.waveBatchCode = inspiration.waveBatchCode
            this.waveBatchName = waveBatchDictCodeMap?.get(inspiration.waveBatchCode)?.dictName
            this.inspirationImage = inspiration.inspirationImage
            this.externalCategory = inspiration.externalCategory
            this.inspirationImageSource = inspiration.inspirationImageSource
            this.inspirationBrand = inspiration.inspirationBrand
            this.sourceCountrySiteName = inspiration.countrySiteName
            this.retailPrice = inspiration.retailPrice
            this.salePrice = inspiration.salePrice
            this.suggestedSupplyModeCode = inspiration.suggestedSupplyModeCode
            this.inspirationCreatedTime = inspiration.inspirationCreatedTime
            this.dataSource = inspiration.dataSource
            this.identifiedCategory = inspiration.identifiedCategory
            this.identifiedStatus = inspiration.identifiedStatus
            this.identifiedLabel = inspiration.identifiedLabel
            this.styleType = inspiration.styleType?.let { it1 -> StyleTypeEnum.of(it1)?.desc }
            this.submitCount = inspiration.submitCount
            this.submitStatus = inspiration.submitStatus
            this.creatorName = inspiration.creatorName
            this.createdTime = inspiration.createdTime
            this.styleSourceCode = inspiration.styleSourceCode
            this.styleSourceName = inspiration.styleSourceName
            this.productLinkUrl = inspiration.productLink
            this.styleGenCount = ai?.styleGenerateNum ?: 0
            this.modeCode = ai?.modeCode
            this.modeName = ai?.modeName
            this.taskInfo = mutableListOf()
            if (taskList.isNotEmpty()) {
                val genTaskMap =
                    getStyleGenResps(
                        taskList
                            .filter { SupplyModeEnum.STYLE_GEN.code == it.generationType }
                            .map { it.downstreamTaskId ?: 0 }.filter { it > 0 })
                val postureFissionTaskMap =
                    getPostureFissionTaskResps(
                        taskList
                            .filter { SupplyModeEnum.POSTURE_FISSION.code == it.generationType }
                            .map { it.downstreamTaskId ?: 0 }.filter { it > 0 })
                val virtualTryOnTaskMap =
                    getVirtualTryOnTaskResps(
                        taskList
                            .filter { SupplyModeEnum.FASHION_VIRTUAL_TRY_ON.code == it.generationType }
                            .map { it.downstreamTaskId ?: 0 }.filter { it > 0 })
                for (item in taskList) {
                    this.taskInfo!!.add(TaskInfoItem().apply {
                        this.logId = item.logId
                        this.businessId = item.businessId
                        this.businessCode = item.businessCode
                        this.waveBatchName = waveBatchDictCodeMap?.get(item.waveBatchCode)?.dictName
                        this.generationType = item.generationType
                        this.submitterName = item.creatorName
                        this.submitTime = item.createdTime
                        this.taskStatus = item.taskStatus
                        val aiTask = item.businessId?.let { aiDesignTaskRepository.getByBusinessId(it) }
                        this.aiTaskCode = aiTask?.aiTaskCode
                        setAiTask(genTaskMap,postureFissionTaskMap,virtualTryOnTaskMap,item,this)

                    })
                }
            }
        }
        return e
    }

    private fun setAiTask(
        genTaskMap: Map<Long, StyleGenTaskResp?>,
        postureFissionTaskMap: Map<Long, PostureFissionTaskExternalVo?>,
        virtualTryOnTaskMap: Map<Long, VirtualTryOnTaskVO?>,
        item: SubmitDownstreamLog,
        taskInfoItem: TaskInfoItem
    ) {
        if (SupplyModeEnum.FASHION_VIRTUAL_TRY_ON.code == item.generationType){
            val virtualTryOnTask = virtualTryOnTaskMap[item.downstreamTaskId]
            // 虚拟换衣
            if (null != virtualTryOnTask) {
                taskInfoItem.downstreamTaskId = virtualTryOnTask.taskId
                taskInfoItem.aiTaskCode = virtualTryOnTask.taskCode
                taskInfoItem.taskStatus = virtualTryOnTask.taskStatus
            }
        }
        if (SupplyModeEnum.POSTURE_FISSION.code == item.generationType){
            val postureFissionTask = postureFissionTaskMap[item.downstreamTaskId]
            // 姿势裂变
            if (null != postureFissionTask) {
                taskInfoItem.downstreamTaskId = postureFissionTask.taskId
                taskInfoItem.aiTaskCode = postureFissionTask.taskCode
                taskInfoItem.taskStatus = postureFissionTask.taskStatus
            }
        }
        if (SupplyModeEnum.STYLE_GEN.code == item.generationType){
            val gen = genTaskMap[item.downstreamTaskId]
            // 风格化衍生
            if (null != gen) {
                taskInfoItem.downstreamTaskId = gen.taskId
                taskInfoItem.aiTaskCode = gen.taskCode
                taskInfoItem.taskStatus = gen.taskStatus
            }
        }
    }

    private fun getStyleGenResps(styleGenTaskIds: List<Long>): Map<Long, StyleGenTaskResp?> {
        if (CollectionUtils.isEmpty(styleGenTaskIds)) {
            return mapOf()
        }
        val list = styleGenClientExternal.listByIds(styleGenTaskIds) ?: listOf()
        if (CollectionUtils.isEmpty(list)) {
            return mapOf()
        }
        return list.associateBy { it.taskId ?: 0 }
    }


    private fun getVirtualTryOnTaskResps(virtualTryOnTaskIds: List<Long>): Map<Long, VirtualTryOnTaskVO?> {
        if (CollectionUtils.isEmpty(virtualTryOnTaskIds)) {
            return mapOf()
        }
        val list = virtualTryOnExternal.listByIds(virtualTryOnTaskIds) ?: listOf()
        if (CollectionUtils.isEmpty(list)) {
            return mapOf()
        }
        return list.associateBy { it.taskId ?: 0 }
    }

    private fun getPostureFissionTaskResps(postureFissionTaskIds: List<Long>): Map<Long, PostureFissionTaskExternalVo?> {
        if (CollectionUtils.isEmpty(postureFissionTaskIds)) {
            return mapOf()
        }
        val list = postureFissionExternal.listByIds(postureFissionTaskIds) ?: listOf()
        if (CollectionUtils.isEmpty(list)) {
            return mapOf()
        }
        return list.associateBy { it.taskId ?: 0 }
    }


    private fun getStyleGenResp(styleGenTaskId: Long): StyleGenTaskResp? {
        if (styleGenTaskId < 1) {
            return null
        }
        val list = styleGenClientExternal.listByIds(listOf(styleGenTaskId)) ?: listOf()
        if (CollectionUtils.isEmpty(list)) {
            return null
        }
        return list[0]
    }

    /**
     * 重新提交-页面回显
     * @param businessId
     */
    override fun taskReSubmitDetail(businessId: Long): InspirationTaskSubmitResp {
        // 获取已有的log
        val log = submitDownstreamLogRepository.getByBusinessId(businessId) ?: throw BusinessException("记录不存在")
        return InspirationTaskSubmitResp().apply {
            // 通用字段
            this.inspirationId = log.inspirationId
            this.waveBatchCode = log.waveBatchCode
            this.supplyMethodCode = log.generationType
            // 特殊字段
            val oldAiDesign = aiDesignTaskRepository.getByBusinessId(businessId)
            if (oldAiDesign != null) {
                this.generateMode = oldAiDesign.generateMode
                this.sceneInfo = oldAiDesign.sceneInfo?.parseJson(AiDesignSceneBo::class.java)
                this.modelInfo = oldAiDesign.modelInfo?.parseJson(AiDesignModelBo::class.java)
                this.generateNum = oldAiDesign.genCount
                this.filterBack = oldAiDesign.filterBack
                this.faceRepair = oldAiDesign.faceRepair
                this.modelMaterialInfo = ModelMaterialInfoResp().apply {
                    this.modelMaterialId = oldAiDesign.modelMaterialId
                    this.modelMaterialName = oldAiDesign.modelMaterialName
                    this.modelMaterialUrl = oldAiDesign.modelMaterialUrl
                }
                this.modeCode = oldAiDesign.modeCode
                this.modeName = oldAiDesign.modeName
                this.fastForward = oldAiDesign.fastForward
            } else {
                val gen = getStyleGenResp(log.downstreamTaskId ?: 0)
                if (null != gen) {
                    this.generateNum = gen.genCount
                    this.faceRepair = gen.faceFix
                    this.refImgUrl = gen.refImgUrl
                    this.bgImgUrl = gen.bgImgUrl
                    this.bgImgDesc = gen.bgImgDesc
                    this.modelImgUrl = gen.modelImgUrl
                    this.modelImgDesc = gen.modelImgDesc
                    this.prompt = gen.prompt
                    this.styleModelId = gen.styleModelId
                    this.imgSize = gen.imgSize
                    this.enableDistill = gen.enableDistill
                    this.enableFollowability = gen.enableFollowability
                }
            }
        }
    }

    /**
     * 灵感id/选款id获取相关信息
     * @param inspirationPickingId
     * @return
     */
    override fun getByInspirationOrPickingId(inspirationPickingId: Long): GetInspirationOrPickingIdResp {/*
            setSourceBizId 灵感>现货: submit_downstream_log.business_id
            setSourceBizId 选款>AIGC picking_ai_design_result.picking_result_id
            inspirationId 数码印花: inspiration.inspiration_id
         */
        var inspirationId: Long? = inspirationPickingId
        val submitDownstreamLog = submitDownstreamLogRepository.getByBusinessId(inspirationPickingId)
        if (submitDownstreamLog != null) {
            inspirationId = submitDownstreamLog.inspirationId
        }
        val result = pickingAiDesignResultRepository.getById(inspirationPickingId)
        if (result != null) {
            inspirationId = result.inspirationId
        }

        var inspiration: Inspiration? = null
        if (inspirationId != null) {
            inspiration = inspirationRepository.getById(inspirationId)
        }

        /*
        选款 存在, 灵感 存在
        选款 不存在, 灵感 存在
        选款 存在, 灵感 不存在
         */
        return GetInspirationOrPickingIdResp().apply {
            if (inspiration != null) {
                this.inspirationInfo = InspirationInfoResp().apply {
                    this.inspirationImage = inspiration.inspirationImage
                    this.inspirationImageSource = inspiration.inspirationImageSource
                    this.countrySiteCode = inspiration.countrySiteCode
                    this.countrySiteName = inspiration.countrySiteName
                    this.planningSourceCode = inspiration.planningSourceCode
                    this.planningSourceName = inspiration.planningSourceName
                    if (PlanningSourceEnum.TOP.dictCode == inspiration.planningSourceCode) {
                        this.retailPriceRange = inspiration.retailPrice
                        this.salePriceRange = inspiration.salePrice
                    } else {
                        this.retailPrice = inspiration.retailPrice?.toBigDecimal()
                        this.salePrice = inspiration.salePrice?.toBigDecimal()
                    }
                }
            }
            this.pickingInfo = PickingInfoResp().apply {
                if (result != null) {
                    this.countrySiteCode = result.suggestedCountrySiteCode
                    this.countrySiteName = result.suggestedCountrySiteName
                    this.shopId = result.suggestedShopId
                    this.shopCode = result.suggestedShopCode
                    this.shopName = result.suggestedShopName
                    this.remark = result.remark
                    this.cargoTrayCode = result.cargoTrayCode
                    this.cargoTrayName = result.cargoTrayCode?.let { it1 ->
                        dictClientExternal.getByDictCode(
                            DictEnum.TRAY_TYPE, it1
                        )?.dictName
                    }
                    this.suggestedPrice = result.suggestedPrice
                    this.pickingTime = result.createdTime
                }
            }
        }
    }

    /**
     * 提交AI设计任务
     * @param req
     */
    @Transactional(rollbackFor = [Exception::class])
    override fun submitAiDesignTask(req: AiDesignTaskCreateReq) {
        val bizId = req.bizId
        val aiDesignTask =
            aiDesignTaskRepository.getByBusinessId(bizId) ?: throw BusinessException("AI设计任务不存在, busId: $bizId")
        val inspirationId = aiDesignTask.inspirationId
        val inspiration = inspirationRepository.getById(inspirationId)
        val taskReSubmitDetail = taskReSubmitDetail(bizId)
        val createExtParam = req.createExtParam
        val inspirationTaskSubmitReq: InspirationSubmitReq =
            InspirationConvert.convert(inspiration, aiDesignTask, taskReSubmitDetail, bizId, createExtParam)
        if (StringUtils.isBlank(inspirationTaskSubmitReq.categoryCode)) {
            inspirationTaskSubmitReq.categoryCode = inspiration.identifiedCategoryCode
        }
        if (StringUtils.isBlank(inspirationTaskSubmitReq.categoryName)) {
            inspirationTaskSubmitReq.categoryName = inspiration.identifiedCategory
        }
        convertMaterials(req, createExtParam, inspirationTaskSubmitReq, aiDesignTask.taskId)
        // 品类和素材传递进去吧
        log.info { "submitAiDesignTask converted req:${inspirationTaskSubmitReq.toJson()}" }
        submitInspiration(inspirationTaskSubmitReq)
    }

    @Transactional(rollbackFor = [Exception::class])
    override fun remove(inspirationIds: Set<Long>) {
        val inspirations = inspirationRepository.listByIds(inspirationIds) ?: throw BusinessException("数据不存在")
        val user = CurrentUserHolder.get()
        val find = inspirations.find { it ->
            val notYours = (it.creatorId != user.id) || (it.submitStatus != SubmitStatusEnum.PENDING.code)
            notYours
        }
        if (find != null) {
            throw BusinessException("数据不属于当前用户")
        }
        inspirationRepository.removeByIds(inspirationIds)
        println()

    }

    @Transactional(rollbackFor = [Exception::class])
    override fun reIdentification(inspirationIds: List<Long>) {
        val inspirations = inspirationRepository.listByIds(inspirationIds) ?: throw BusinessException("数据不存在")
        val pendingList = inspirations.filter {
            it.submitStatus!! == SubmitStatusEnum.PENDING.code && it.identifiedStatus!! == IdentifiedStatusEnum.FAIL.code
        }
        if (pendingList.size != inspirationIds.size) {
            throw BusinessException("仅可对【待提交】且识别结果=【识别失败】的灵感进行操作")
        }

        //清空识别数据，更新状态,要生成新的id，不然butted服务会报错，busid唯一索引，相关于生成新的任务
        val newIdList = mutableListOf<Long>()
        inspirationIds.map {
            val newId = IdHelper.getId()
            newIdList.add(newId)
            cleanAndUpdateStatus(newId, it)
        }

        TransactionTemplate(transactionManager).executeWithoutResult {
            TransactionHelper.afterCommitExecute {
                // 异步执行
                inspirationImageComponent.handler(newIdList.toList())
            }
        }
    }

    private fun cleanAndUpdateStatus(newInspirationId: Long, inspirationId: Long) {
        inspirationRepository.cleanAndUpdateStatus(newInspirationId, inspirationId);
    }


    /**
     * 提交任务
     * @param req
     */
    @Transactional(rollbackFor = [Exception::class])
    override fun submitInspiration(req: InspirationSubmitReq) {
        val inspiration = inspirationRepository.getById(req.inspirationId)
        val syncCategory = StringUtils.isNotBlank(req.categoryCode) && !StringUtils.equalsIgnoreCase(
            req.categoryCode, inspiration.identifiedCategoryCode
        )
        // 更新灵感
        InspirationConvert.convert(inspiration, req)
        // 调用款式开发平台创建任务
        when (val supplyModeEnum = SupplyModeEnum.getByCode(req.supplyMethod)) {
            SupplyModeEnum.AIGC -> {
                // 新的AI设计任务
                val newAiDesign = InspirationConvert.convert(req, inspiration, businessCodeGenerator, fmClient)
                newAiDesign.enableSyncCategory = syncCategory
                // 调用款式开发平台创建任务
                inspirationTaskComponent.submitAiDesignTask(newAiDesign, inspiration)
                // 新增一个新的记录
                val log = InspirationConvert.convert(req, newAiDesign)
                submitDownstreamLogRepository.save(log)
                if (syncCategory && req.syncCategory == Bool.YES.code) {
                    // 删除标签
//                    val labels =this.inspirationLabelRepository.getLabelByInspirationId(inspiration.inspirationId?:0)
//                    if (CollectionUtils.isNotEmpty(labels)) {
                    this.inspirationLabelRepository.deleteByInspirationId(inspiration.inspirationId ?: 0)
//                    }
                }
            }

            SupplyModeEnum.STYLE_GEN -> {
                // 风格化衍生
                val styleGen = StyleGenTaskConvert.convert(req, inspiration)
                this.styleGenTaskRepository.save(styleGen)
                val genTaskId = styleGenClientExternal.create(task = styleGen)
                styleGen.pushStatus = Bool.YES.code
                styleGen.genTaskId = genTaskId
                this.styleGenTaskRepository.updateById(styleGen)
                // 新增一个新的记录
                val log = InspirationConvert.convert(req, businessCodeGenerator, styleGen.taskId ?: 0)
                log.downstreamTaskId = genTaskId
                log.businessId = styleGen.taskId
                submitDownstreamLogRepository.save(log)
            }

            SupplyModeEnum.LOGO_NUM -> {
                // 调用数码印花
                val digitalPrintTaskId = inspirationTaskComponent.submitDigitalPrintingTask(inspiration)
                // 新增一个新的记录
                val log = InspirationConvert.convert(req, businessCodeGenerator, digitalPrintTaskId ?: 0)
                submitDownstreamLogRepository.save(log)
            }

            else -> {
                if (supplyModeEnum != null) {
                    inspirationTaskComponent.submitDesignTask(inspiration, supplyModeEnum)
                }
            }
        }
        inspirationRepository.updateById(inspiration)
        // 是否推送AIDC
        val planningSourceEnum = PlanningSourceEnum.getByCode(inspiration.planningSourceCode)
        val isPushAidc =
            planningSourceEnum != null && inspiration.submitPushAidc != YesOrNoEnum.YES.code && !inspiration.thirdInspirationId.isNullOrBlank()
        // 调用AIDC推送
        if (isPushAidc) {
            lazadaComponent.pushAidcMark(planningSourceEnum, inspiration)
        }
    }


    @Transactional(rollbackFor = [Exception::class])
    override fun externalSubmitInspiration(req: ExternalSubmitInspirationReq) {
        val inspiration = inspirationRepository.getById(req.inspirationId) ?: throw BusinessException("灵感源数据不存在")
        // 不是已提交的灵感数据, 更新状态 已提交
        if (SubmitStatusEnum.SUBMITTED.code != inspiration.submitStatus) {
            inspiration.submitStatus = SubmitStatusEnum.SUBMITTED.code
            inspiration.lastSubmitTime = LocalDateTime.now()
            inspiration.submitCount = if (inspiration.submitCount == null) 1 else inspiration.submitCount!! + 1
            inspirationRepository.updateById(inspiration)
        }
        val log = InspirationConvert.externalSubmitInspirationConvert(req, businessCodeGenerator,inspiration)
        submitDownstreamLogRepository.save(log)
    }

    override fun getListByIds(inspirationIds: List<Long>): List<InspirationDetailResp> {
        if (CollectionUtils.isEmpty(inspirationIds)){
            throw BusinessException("灵感ID数组不能为空")
        }
        var list = inspirationRepository.listByIds(inspirationIds);
        if (CollectionUtils.isEmpty(list)){
            throw BusinessException("灵感信息不存在")
        }
        return list.map { entity ->
            InspirationDetailResp().apply {
                BeanUtils.copyProperties(entity, this)
            }
        }
    }

    override fun verifySubmit(req: InspirationSubmitReq) {
        this.verifySubmitReq(req)
        val reqCodes = mutableSetOf<String>()
        val disCodes = mutableSetOf<String>()
        this.dictClientExternal.listByDictCode(DictEnum.FG_MODEL_VERSION.dictCode).run {
            val children = this?.children?.filter { CollectionUtils.isNotEmpty(it.attributes) }
            children?.filter { it.attributes?.any { a -> a.name == "REQ" } == true }?.forEach {
                reqCodes.add(it.dictCode)
            }
            children?.filter { it.attributes?.any { a -> a.name == "DIS" } == true }?.forEach {
                disCodes.add(it.dictCode)
            }
        }
        if (reqCodes.contains(req.modeCode)) {
            if (null == req.refWeight) {
                throw RuntimeException("参考权重不能为空")
            }
        }
        if (disCodes.contains(req.modeCode)) {
            if (null != req.refWeight) {
                throw RuntimeException("参考权重必须为空")
            }
        }
        if (StringUtils.equalsIgnoreCase(req.supplyMethod, SupplyModeEnum.STYLE_GEN.code)) {
            if (null == req.styleModelId || (req.styleModelId ?: 0) < 1) {
                throw ValidationException("模型ID不能为空")
            }
        }
    }

    @Transactional(rollbackFor = [Exception::class])
    override fun editImage(req: InspirationImageEditReq) {
        val inspiration =
            inspirationRepository.getById(req.inspirationId) ?: throw BusinessException("灵感源数据不存在")
        inspiration.inspirationImage = req.url
        if (StringUtils.isNotBlank(req.name)) {
            inspiration.sourceImageName = req.name
        }
        this.inspirationRepository.updateById(inspiration)
    }

    @Transactional(rollbackFor = [Exception::class])
    override fun editCategory(req: List<InspirationCategoryEditReq>) {
        val inspirations = inspirationRepository.listByIds(req.map { it.inspirationId ?: 0 })
        if (CollectionUtils.isEmpty(inspirations)) {
            throw BusinessException("灵感源数据不存在")
        }
        val map = req.associateBy { it.inspirationId ?: 0 }
        val list = inspirations.filter { map.containsKey(it.inspirationId ?: 0) }
            .map {
                val category = map[it.inspirationId ?: 0]
                if (null != category) {
                    it.identifiedCategoryCode = category.categoryCode
                    it.identifiedCategory = category.categoryName
                }
                it
            }
        if (CollectionUtils.isNotEmpty(list)) {
            this.inspirationRepository.updateBatchById(list)
        }
    }

    private fun verifySubmitReq(req: InspirationSubmitReq) {
        val inspiration =
            inspirationRepository.getById(req.inspirationId) ?: throw BusinessException("灵感源数据不存在")
        when (SupplyModeEnum.getByCode(req.supplyMethod)) {
            SupplyModeEnum.AIGC -> {
                //XN_1.4放开失败校验
                /* if (inspiration.identifiedStatus != IdentifiedStatusEnum.VALID.code) {
                     throw RuntimeException("识别不通过, 不能提交AIGC跑图任务")
                 }*/
                val categoryCode = req.categoryCode
                val categoryName = req.categoryName
                if (req.single) {
                    if (StringUtils.isBlank(categoryCode)) {
                        throw BusinessException("categoryCode is blank")
                    }
                    if (StringUtils.isBlank(categoryName)) {
                        throw BusinessException("categoryName is blank")
                    }
                }
                if (CollectionUtils.isNotEmpty(req.materials) && (req.styleGenCount ?: 0) < 1) {
                    throw BusinessException("款生成数量不能为空且必须大于0")
                }
                if (CollectionUtils.isNotEmpty(req.materials) && req.materials.size != (req.styleGenCount ?: 0)) {
                    throw BusinessException("款生成数量必须和素材数量相等")
                }
            }

            SupplyModeEnum.STYLE_GEN -> {
                log.info { "风格化衍生提交参数\t${req.toJsonPretty()}" }
            }

            SupplyModeEnum.OBM_REPLICA -> {
                val expectedCostPrice = req.expectedCostPrice
                val inside =
                    expectedCostPrice != null && expectedCostPrice >= BigDecimal("0.00") && expectedCostPrice <= BigDecimal(
                        "9999.99"
                    )
                if (!inside) {
                    throw BusinessException("expectedCostPrice is null or not in range 0-9999.99")
                }
            }

            null -> {
                throw BusinessException("未找到对应的供应方式")
            }

            else -> {}
        }
    }

    private fun convertMaterials(
        req: AiDesignTaskCreateReq,
        createExtParam: AiDesignTaskCreateExt?, inspirationTaskSubmitReq: InspirationSubmitReq, taskId: Long?
    ) {
        if (null == req.tryOnFix || Bool.NO.code == req.tryOnFix) {
            return
        }
        if (null != createExtParam) {
            if (null != createExtParam.styleGenCount) {
                inspirationTaskSubmitReq.styleGenCount = createExtParam.styleGenCount
            }
            if (CollectionUtils.isNotEmpty(createExtParam.materials)) {
                inspirationTaskSubmitReq.materials = createExtParam.materials.map {
                    AiDesignMaterialReq().apply {
                        materialLibraryId = it.materialLibraryId
                        materialType = it.materialType
                        pictureUrl = it.pictureUrl
                        maskPictureUrl = it.maskPictureUrl
                    }
                }
                return
            }
        }
        val materialList = aiDesignMaterialRepository.listByTaskId(taskId)
        if (CollectionUtils.isEmpty(materialList)) {
            return
        }
        inspirationTaskSubmitReq.materials = materialList.map {
            AiDesignMaterialReq().apply {
                materialLibraryId = it.materialLibraryId
                materialType = it.materialType
                pictureUrl = it.pictureUrl
                maskPictureUrl = it.maskPictureUrl
            }
        }
    }
}