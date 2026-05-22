package tech.tiangong.sdp.temu.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;

/**
 * Temu视频结果
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/24 15:42
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TemuVideoResp implements TemuResp {
    private final static int SUCCESS_CODE = 1000000;
    @Serial
    private static final long serialVersionUID = 2780847524683756023L;

    /**
     * 请求 ID
     */
    private String requestId;
    /**
     * 响应码
     */
    @JsonProperty(value = "error_code")
    private Integer errorCode;
    /**
     * 提示
     */
    @JsonProperty(value = "error_msg")
    private String errorMsg;

}
