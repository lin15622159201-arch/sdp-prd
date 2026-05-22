package tech.tiangong.sdp.dto.aliexpress.resp

import com.fasterxml.jackson.annotation.JsonProperty

/**
 * @author zjh
 * @date 2025/1/10 15:38
 */
data class AeProxyResp(
    /**
     * 状态码，2000000：成功，其他失败
     */
    @JsonProperty("code")
    var code: String? = null,
    /**
     * 数据，透传aidc接口
     */
    @JsonProperty("data")
    var data: AeResp? = null,
    /**
     * 结果信息
     */
    @JsonProperty("msg")
    var msg: String? = null,
    /**
     * 子状态码
     */
    @JsonProperty("sub_code")
    var subCode: String? = null,
    /**
     * 子信息
     */
    @JsonProperty("sub_msg")
    var subMsg: String? = null,
)
