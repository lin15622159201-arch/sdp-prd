package tech.tiangong.sdp.service

import tech.tiangong.sdp.common.req.picking.PatternApplyPickingReq
import tech.tiangong.sdp.common.req.picking.PickingAddReq

interface PickingStylePushService {

    /**
     * 推送ai款式给xiniu
     */
    fun push2Xiniu(pickingId: Long)


    /**
     * 有灵感源的任务推送ai款式给xiniu
     */
    fun push2XiniuByInspiration(pickingId: Long, req: PickingAddReq)

    /**
     * 用户自建任务推送款式给xiniu
     */
    fun push2XiniuByUserUpload(pickingId: Long, req: PickingAddReq)

    fun push2XiniuByPatternApply(pickingId: Long, req: PatternApplyPickingReq)

}