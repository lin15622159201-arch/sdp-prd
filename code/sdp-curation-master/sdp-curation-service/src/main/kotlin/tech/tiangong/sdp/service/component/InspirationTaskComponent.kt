package tech.tiangong.sdp.service.component

import com.zjkj.aigc.common.req.LogoIdentifyTaskCreateReq
import org.apache.commons.collections4.CollectionUtils
import org.springframework.stereotype.Component
import team.aikero.blade.logging.core.annotation.Slf4j
import team.aikero.blade.logging.core.annotation.Slf4j.Companion.log
import team.aikero.blade.sequence.code.generate.BusinessCodeGenerator
import team.aikero.blade.sequence.id.IdHelper
import team.aikero.blade.user.holder.CurrentUserHolder
import team.aikero.blade.util.json.toJson
import tech.tiangong.sdp.convert.InspirationConvert
import tech.tiangong.sdp.dao.entity.AiDesignTask
import tech.tiangong.sdp.dao.entity.Inspiration
import tech.tiangong.sdp.dao.entity.SubmitDownstreamLog
import tech.tiangong.sdp.dao.repository.AiDesignMaterialRepository
import tech.tiangong.sdp.dao.repository.AiDesignTaskRepository
import tech.tiangong.sdp.dao.repository.SubmitDownstreamLogRepository
import tech.tiangong.sdp.enums.CodeRuleEnum
import tech.tiangong.sdp.enums.DictEnum
import tech.tiangong.sdp.enums.SupplyModeEnum
import tech.tiangong.sdp.enums.TaskStateEnum
import tech.tiangong.sdp.external.AiDesignClientExternal
import tech.tiangong.sdp.external.DesignDemandClientExternal
import tech.tiangong.sdp.external.DictClientExternal
import tech.tiangong.sdp.external.LogoIdentityTaskClientExternal

/**
 * 提交任务
 * @author zjh
 * @date 2024/12/2 10:46
 */
@Slf4j
@Component
class InspirationTaskComponent(
    private val aiDesignClientExternal: AiDesignClientExternal,
    private val logoIdentityTaskClientExternal: LogoIdentityTaskClientExternal,
    private val submitDownstreamLogRepository: SubmitDownstreamLogRepository,
    private val aiDesignTaskRepository: AiDesignTaskRepository,
    private val businessCodeGenerator: BusinessCodeGenerator,
    private val designDemandClientExternal: DesignDemandClientExternal,
    private val dictClientExternal: DictClientExternal,
    private val aiDesignMaterialRepository: AiDesignMaterialRepository,
) {

    /**
     * 提交AI设计
     *
     * @param waveBatchCode
     * @param aiDesignTask
     * @param supplyMode
     */
    fun submitAiDesignTask(aiDesignTask: AiDesignTask, inspiration: Inspiration) {
        val req = InspirationConvert.convert(aiDesignTask,inspiration)
        val createReq = aiDesignClientExternal.create(req)
        aiDesignTask.aiTaskId = createReq?.taskId
        aiDesignTask.aiTaskCode = createReq?.taskCode
        aiDesignTaskRepository.save(aiDesignTask)
        val materials = aiDesignTask.materials
        if (CollectionUtils.isNotEmpty(materials)) {
            aiDesignMaterialRepository.saveBatch(materials, materials.size)
        }
    }

    /**
     * 提交数码印花
     *
     * @param waveBatchCode
     * @param inspiration
     * @param supplyMode
     */
    fun submitDigitalPrintingTask(inspiration: Inspiration): Long? {
        val user = CurrentUserHolder.get()
        val req = LogoIdentifyTaskCreateReq()
        req.inspireSourceId = inspiration.inspirationId
        req.fileName = inspiration.inspirationCode
        req.fileUrl = inspiration.inspirationImage
        req.userId = user.id
        req.userName = user.name
        req.tenantId = user.tenantId
        return logoIdentityTaskClientExternal.create(req)


    }

    /**
     * 提交灵感设计
     *
     * @param waveBatchCode
     * @param inspiration
     * @param supplyMode
     */
    fun submitDesignTask(inspiration: Inspiration, supplyMode: SupplyModeEnum) {
        // key=字典值code,value=字典值vo
        val dictCodeMap =
            dictClientExternal.getTopByDictCode(DictEnum.PLM_CLOTHING_BAND)?.children?.associateBy(
                { it.dictCode },
                { it })
        // 发送灵感设计(下游)
        val sdkReq = InspirationConvert.convert(inspiration, supplyMode, dictCodeMap)
        log.info { "submitDesignTask req:${sdkReq.toJson()}" }
        val respVo = designDemandClientExternal.create(sdkReq)

        // 新增一个新的记录
        val log = SubmitDownstreamLog()
        log.logId = IdHelper.getId()
        log.inspirationId = inspiration.inspirationId
        log.businessId = sdkReq.sourceBizId
        log.businessCode = businessCodeGenerator.generate(CodeRuleEnum.INSPIRATION_SUBMIT_CODE)
        log.waveBatchCode = inspiration.waveBatchCode
        log.downstreamTaskId = respVo.designDemandId
        log.taskStatus = TaskStateEnum.SUBMIT.code
        log.generationType = supplyMode.code
        log.request = sdkReq.toJson()
        submitDownstreamLogRepository.save(log)
    }
}