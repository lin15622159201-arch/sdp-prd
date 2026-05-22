package tech.tiangong.sdp.dto.lazada.resp

import com.fasterxml.jackson.annotation.JsonProperty

/**
 * Lazada 趋势中心 基础响应体
 * @author zjh
 * @date 2024/12/16 11:36
 */
class TrendCenterBaseResp<T> {

    @JsonProperty("data")
    var data: T? = null

    @JsonProperty("success")
    var success: Boolean? = null

    @JsonProperty("msgInfo")
    var msgInfo: String? = null

    @JsonProperty("msgCode")
    var msgCode: String? = null

    @JsonProperty("code")
    var code: String? = null

    @JsonProperty("request_id")
    var requestId: String? = null
}