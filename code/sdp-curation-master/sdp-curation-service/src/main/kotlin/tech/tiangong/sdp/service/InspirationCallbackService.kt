package tech.tiangong.sdp.service

import team.aikero.admin.common.vo.DictVo
import tech.tiangong.sdp.dao.entity.Inspiration
import tech.tiangong.sdp.req.inspiration.callback.AiDesignCallbackReq
import tech.tiangong.sdp.req.inspiration.callback.IdentifyCallbackReq
import java.time.LocalDateTime

/**
 * 灵感相关回调
 * @author zjh
 * @date 2024/12/2 14:34
 */
interface InspirationCallbackService {

    /**
     * 回调-识别任务
     * @param req
     */
    fun identify(req: IdentifyCallbackReq)

    /**
     * 回调-识别任务
     * @param req
     */
    fun identify(inspiration: Inspiration)

    /**
     * 回调-AI设计任务
     * @param req
     */
    fun aiDesign(req: AiDesignCallbackReq)

    /**
     * 定时-数码印花
     * @param taskIds
     */
    fun digitalPrint(taskIds: List<Long>)

}