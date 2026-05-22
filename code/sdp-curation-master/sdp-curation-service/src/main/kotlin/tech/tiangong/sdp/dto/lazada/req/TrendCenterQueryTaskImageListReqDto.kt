package tech.tiangong.sdp.dto.lazada.req

/**
 * 趋势中心-任务详情分页接口
 * @author zjh
 * @date 2024/12/16 10:58
 */
class TrendCenterQueryTaskImageListReqDto {

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
     * 任务id
     */
    var taskId: String? = null

}