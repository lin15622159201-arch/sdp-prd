package tech.tiangong.sdp.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.time.LocalDateTime;

/**
 * temu 日志表
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 14:50
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName(value = "temu_access_log", autoResultMap = true)
public class TemuAccessLog extends BaseTenantUserEntity {

    /**
     * 日志 ID
     */
    @TableId(value = "log_id", type = IdType.INPUT)
    private Long logId;

    /**
     * APP KEY
     */
    @TableField(value = "app_key")
    private String appKey;

    /**
     * 成功的 0 否 1是
     */
    @TableField(value = "successful")
    private Integer successful;

    /**
     * 请求地址
     */
    @TableField(value = "request_url")
    private String requestUrl;

    /**
     * 请求 ID
     */
    @TableField(value = "request_id")
    private String requestId;

    /**
     * 请求参数
     */
    @TableField(value = "request_params")
    private String requestParams;

    /**
     * Temu接口
     */
    @TableField(value = "request_type")
    private String requestType;

    /**
     * 请求方式
     */
    @TableField(value = "request_method")
    private String requestMethod;

    /**
     * 请求时间
     */
    @TableField(value = "request_time")
    private LocalDateTime requestTime;

    /**
     * 响应时间
     */
    @TableField(value = "response_time")
    private LocalDateTime responseTime;

    /**
     * 执行时间
     */
    @TableField(value = "execute_time")
    private Long executeTime;

    /**
     * 响应体
     */
    @TableField(value = "response_body")
    private String responseBody;

    /**
     * 响应 CODE
     */
    @TableField(value = "response_code")
    private String responseCode;

    /**
     * 响应提示语
     */
    @TableField(value = "response_message")
    private String responseMessage;

    /**
     * 响应数据
     */
    @TableField(value = "response_data")
    private String responseData;

    /**
     * 异常堆栈
     */
    @TableField(value = "stack_trace")
    private String stackTrace;

    /**
     * 链路 ID
     */
    @TableField(value = "trace_id")
    private String traceId;
}
