package tech.tiangong.sdp.temu.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.util.Objects;

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
public class TemuCommonResp<T> implements TemuResp {
    private final static int SUCCESS_CODE = 1000000;
    @Serial
    private static final long serialVersionUID = -1997733730924546680L;
    /**
     * 成功
     */
    private Boolean success;
    /**
     * 请求 ID
     */
    private String requestId;
    /**
     * 响应码
     */
    private Integer errorCode;
    /**
     * 提示
     */
    private String errorMsg;
    /**
     * 结果
     */
    private T result;

    public boolean succeed() {
        return (Objects.nonNull(success) && success) && Objects.equals(SUCCESS_CODE, errorCode);
    }
}
