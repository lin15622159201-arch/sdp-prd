package tech.tiangong.sdp.temu.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;

/**
 * Temu基础实体
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/24 15:42
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TemuCommonReq implements TemuReq {
    @Serial
    private static final long serialVersionUID = -2000627084771261977L;

    /**
     * token
     */
    @JsonProperty("access_token")
    private String accessToken;

    /**
     * APP Key
     */
    @JsonProperty("app_key")
    private String appKey;

    /**
     * 数据类型
     * <pre>
     *     默认 JSON
     * </pre>
     */
    @JsonProperty("data_type")
    private String dataType = "JSON";
    /**
     * 接口编码
     * <pre>
     *     Temu接口编码
     * </pre>
     */
    @JsonProperty("type")
    private String type;

    /**
     * 时间戳
     * <pre>
     *     秒
     * </pre>
     */
    @JsonProperty("timestamp")
    private String timestamp;

    /**
     * 签名
     * <pre>
     *     MD5
     * </pre>
     */
    @JsonProperty("sign")
    private String sign;
}
