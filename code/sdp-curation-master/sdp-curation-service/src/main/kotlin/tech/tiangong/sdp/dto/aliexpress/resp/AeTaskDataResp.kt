package tech.tiangong.sdp.dto.aliexpress.resp

/**
 * 程序使用的结构
 * @author zjh
 * @date 2025/1/10 15:40
 */
data class AeTaskDataResp(
    /**
     * 当前段号
     * demo 1
     */
    var curSegmentNum: Int? = null,
    /**
     * 错误描述信息
     * demo segmentNum error
     */
    var errorMsg: String? = null,
    var requestId: String? = null,
    /**
     * 请求是否成功
     * demo true
     */
    var success: Boolean? = null,
    /**
     * 段内总数据量
     * demo 100000
     */
    var totalCount: Int? = null,
    /**
     * 段内总页数
     * demo 10
     */
    var totalPage: Int? = null,
    /**
     * 每页数据集
     */
    var data: List<AeDataTaskResp>? = null,
)