package tech.tiangong.sdp.dto.aliexpress.resp

import com.fasterxml.jackson.annotation.JsonProperty

/**
 * @author zjh
 * @date 2025/1/10 15:39
 */
data class AeResp(
    @JsonProperty("aidc_share_odps_partition_table_response")
    var aidcShareOdpsPartitionTableResponse: AeDataResp? = null,
    @JsonProperty("sign")
    var sign: String? = null,
)