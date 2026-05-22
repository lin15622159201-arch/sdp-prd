package tech.tiangong.sdp.dto.mq

import java.time.LocalDateTime

/**
 * 灵感任务淘汰MQ
 * @author zjh
 * @date 2024/12/5 10:44
 */
class DesignDemandEliminateMqDto {
    /**
     * 设计需求id
     */
    var designDemandId: Long? = null

    /**
     * 来源业务id
     */
    var sourceBizId: Long? = null

    /**
     * 灵感选款ID
     */
    var inspirationStyleId: Long? = null

    /**
     * 淘汰原因
     */
    var noPassReason: String? = null

    /**
     * 淘汰人id
     */
    var noPassUserId: Long? = null

    /**
     * 淘汰人名称
     */
    var noPassUserName: String? = null

    /**
     * 淘汰时间
     */
    var noPassTime: LocalDateTime? = null
}