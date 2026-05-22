package tech.tiangong.sdp.service

import tech.tiangong.sdp.dto.mq.DesignDemandCreateSpuMqDto
import tech.tiangong.sdp.dto.mq.DesignDemandEliminateMqDto

/**
 * 选款相关回调
 * @author zjh
 * @date 2024/12/2 14:34
 */
interface PackingCallbackService {

    /**
     * 回调-淘汰
     * @param req
     */
    fun eliminate(req: DesignDemandEliminateMqDto)

    /**
     * 回调-开款
     * @param req
     */
    fun openStyle(req: DesignDemandCreateSpuMqDto)
}