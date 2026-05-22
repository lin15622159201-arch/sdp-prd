package tech.tiangong.sdp.dto.aliexpress.req

/**
 * @author zjh
 * @date 2025/1/10 15:37
 */
data class AeProxyReq(
    var api_path: String? = null,
    var api_params: AeReq? = null,
    var http_method: String? = null,
)