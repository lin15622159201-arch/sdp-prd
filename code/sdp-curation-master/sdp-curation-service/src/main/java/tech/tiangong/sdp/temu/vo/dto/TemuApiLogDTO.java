package tech.tiangong.sdp.temu.vo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * Temu日志
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:43
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TemuApiLogDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 4304468609779884978L;
    /**
     * 日志 ID
     */
    private Long logId;

    /**
     * APP KEY
     */
    private String appKey;

    /**
     * 成功的 0 否 1是
     */
    private Integer successful;

    /**
     * 请求地址
     */
    private String requestUrl;

    /**
     * 请求 ID
     */
    private String requestId;

    /**
     * 请求参数
     */
    private String requestParams;

    /**
     * Temu接口
     */
    private String requestType;

    /**
     * 请求方式
     */
    private String requestMethod;

    /**
     * 请求时间
     */
    private LocalDateTime requestTime;

    /**
     * 响应时间
     */
    private LocalDateTime responseTime;

    /**
     * 执行时间
     */
    private Long executeTime;

    /**
     * 响应体
     */
    private String responseBody;

    /**
     * 响应 CODE
     */
    private String responseCode;

    /**
     * 响应提示语
     */
    private String responseMessage;

    /**
     * 响应数据
     */
    private String responseData;

    /**
     * 异常堆栈
     */
    private String stackTrace;
}
