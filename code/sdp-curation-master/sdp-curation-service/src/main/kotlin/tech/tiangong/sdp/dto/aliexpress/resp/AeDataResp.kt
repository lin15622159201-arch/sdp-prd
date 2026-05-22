package tech.tiangong.sdp.dto.aliexpress.resp

import com.fasterxml.jackson.annotation.JsonProperty

/**
 * @author zjh
 * @date 2025/1/10 15:40
 */
data class AeDataResp(
    @JsonProperty("cur_segment_num")
    var curSegmentNum: Int? = null,
    @JsonProperty("error_msg")
    var errorMsg: String? = null,
    @JsonProperty("request_id")
    var requestId: String? = null,
    @JsonProperty("success")
    var success: Boolean? = null,
    @JsonProperty("total_count")
    var totalCount: Int? = null,
    @JsonProperty("total_page")
    var totalPage: Int? = null,
    @JsonProperty("data")
    var data: String? = null,
)