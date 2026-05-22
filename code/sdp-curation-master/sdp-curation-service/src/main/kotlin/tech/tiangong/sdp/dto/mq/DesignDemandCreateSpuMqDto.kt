package tech.tiangong.sdp.dto.mq

import java.time.LocalDateTime

/**
 * 灵感任务开款MQ
 * @author zjh
 * @date 2024/12/5 10:50
 */
class DesignDemandCreateSpuMqDto {
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
     * 开款spu编码
     */
    var styleCode: String? = null

    /**
     * 开款skc编码
     */
    var designCode: String? = null

    /**
     * 开款时间
     */
    var createSpuTime: LocalDateTime? = null
}