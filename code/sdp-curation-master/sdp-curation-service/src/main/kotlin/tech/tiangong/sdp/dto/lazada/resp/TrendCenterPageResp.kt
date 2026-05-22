package tech.tiangong.sdp.dto.lazada.resp

/**
 * Lazada 趋势中心 分页响应体
 * @author zjh
 * @date 2024/12/16 11:36
 */
open class TrendCenterPageResp<T> {

    /**
     * 总条数
     */
    var totalCount: Int = 0

    /**
     * 当前页
     */
    var currentPageNo: Int = 1

    /**
     * 每页大小
     */
    var pageSize: Int = 20

    /**
     * 数据记录
     */
    var records: List<T> = emptyList()
}