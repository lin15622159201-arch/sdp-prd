package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Temu公共字段枚举
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/23 16:11
 */
@Getter
@AllArgsConstructor
public enum TemuCommonFieldEnum {
    TYPE("type", "API 名称"),
    APP_KEY("app_key", "APP KEY"),
    TIMESTAMP("timestamp", "时间戳"),
    SIGN("sign", "签名"),
    ACCESS_TOKEN("access_token", "请求 TOKEN"),
    DATA_TYPE("data_type", "数据格式"),
    VERSION("version", "接口版本"),
    SUCCESS("success", "响应成功"),
    REQUEST_ID("requestId", "请求 ID"),
    ERROR_CODE("errorCode", "响应编码"),
    ERROR_MSG("errorMsg", "响应提示"),
    ERROR_CODE_2("error_code", "响应编码"),
    ERROR_MSG_2("error_msg", "响应提示"),
    VIDEO_FILE("file", "视频文件"),
    VIDEO_CREATE_MEDIA("create_media", "固定值，true"),
    // 用于校验实际收到的数据和发起方本地的数据是否一致
    VIDEO_CONTENT_MD5("content_md5", "文件MD5值"),
    // 文件上传 Sign
    VIDEO_SIGN("sign", "签名"),
    ;
    private final String code;
    private final String vale;
}
