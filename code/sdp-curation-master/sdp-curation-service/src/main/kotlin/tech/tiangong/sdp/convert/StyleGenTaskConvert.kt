package tech.tiangong.sdp.convert

import org.apache.commons.lang3.StringUtils
import team.aikero.blade.core.enums.Bool
import team.aikero.blade.sequence.id.IdHelper
import team.aikero.blade.user.holder.CurrentUserHolder
import team.aikero.blade.util.json.parseJson
import team.aikero.blade.util.json.toJson
import tech.tiangong.sdp.dao.bo.AiDesignSceneBo
import tech.tiangong.sdp.dao.entity.Inspiration
import tech.tiangong.sdp.dao.entity.StyleGenTask
import tech.tiangong.sdp.req.StyleGenTaskAddReq
import tech.tiangong.sdp.req.inspiration.InspirationSubmitReq
import tech.tiangong.sdp.req.inspiration.ModelMaterialInfoReq

object StyleGenTaskConvert {
    @JvmStatic
    fun convert(
        req: InspirationSubmitReq,
        inspiration: Inspiration
    ): StyleGenTask {
        val e = StyleGenTask(IdHelper.getId())
        // 登录人信息
        val user = CurrentUserHolder.get()
        e.inspirationId = inspiration.inspirationId
        e.inspirationCode = inspiration.inspirationCode
        e.inspirationImage = inspiration.inspirationImage
        e.faceFix = req.faceRepair
        e.genCount = req.generateNum
        e.prompt = req.prompt ?: ""
        req.sceneInfo?.let {
            e.bgImgDesc = it.pictureCaption
            e.bgImgUrl = it.picturePath
        }
        req.modelInfo?.let {
            e.modelImgDesc = it.modelImgDesc
            e.modelImgUrl = it.aiModelUrl
        }
        e.styleModelId = req.styleModelId ?: 0
        e.imgSize = req.imgSize ?: ""
        e.loraName = req.loraName ?: ""
        e.modeName = req.modeName ?: ""
        e.clothType = req.clothType ?: ""
        e.tenantId = user.tenantId
        e.deleted = Bool.NO.code
        e.pushStatus = Bool.NO.code
        e.enableDistill = req.enableDistill
        e.enableFollowability = req.enableFollowability
        if (null != req.sceneInfo) {
            e.bgImgInfo = req.sceneInfo!!.toJson()
        }
        if (null != req.modelMaterialInfo) {
            e.modelImgInfo = req.modelMaterialInfo!!.toJson()
        }
        return e
    }

    @JvmStatic
    fun convert(
        task: StyleGenTask
    ): StyleGenTaskAddReq {
        val e = StyleGenTaskAddReq()
        e.sourceBusinessId = task.inspirationId
        e.sourceBusinessCode = task.inspirationCode
        e.prompt = task.prompt ?: ""
        e.styleModelId = task.styleModelId ?: 0
        e.bgImgDesc = task.bgImgDesc
        e.bgImgUrl = task.bgImgUrl
        e.modelImgDesc = task.modelImgDesc
        e.modelImgUrl = task.modelImgUrl
        e.imgSize = task.imgSize ?: ""
        e.faceFix = task.faceFix ?: Bool.NO.code
        e.genCount = task.genCount ?: 1
        e.userId = task.creatorId
        e.userName = task.creatorName
        e.tenantId = task.tenantId
        e.enableDistill = task.enableDistill
        e.enableFollowability = task.enableFollowability
        if (StringUtils.isBlank(e.refImgUrl)) {
            e.refImgUrl = task.inspirationImage
        }
        if (null != task.bgImgInfo && StringUtils.isNotBlank(task.bgImgInfo)) {
            e.bg = task.bgImgInfo!!.parseJson(AiDesignSceneBo::class.java)
        }
        if (null != task.modelImgInfo&& StringUtils.isNotBlank(task.modelImgInfo)) {
            e.model = task.modelImgInfo!!.parseJson(ModelMaterialInfoReq::class.java)
        }
        return e
    }
}