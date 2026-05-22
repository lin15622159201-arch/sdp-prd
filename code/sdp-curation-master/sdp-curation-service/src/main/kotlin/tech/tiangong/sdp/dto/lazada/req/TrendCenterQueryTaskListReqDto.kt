package tech.tiangong.sdp.dto.lazada.req

import java.time.LocalDateTime

/**
 * 趋势中心-任务分页接口
 * @author zjh
 * @date 2024/12/16 10:58
 */
class TrendCenterQueryTaskListReqDto {

    /**
     * 页码
     */
    var pageNum: Int = 1

    /**
     * 每页大小
     */
    var pageSize: Int = 20

    /**
     * 国家(TH)
     */
    var venture: String? = null

    /**
     * 开始时间
     */
    var createDateStartStr: LocalDateTime? = null

    /**
     * 结束时间
     */
    var createDateEndStr: LocalDateTime? = null

}