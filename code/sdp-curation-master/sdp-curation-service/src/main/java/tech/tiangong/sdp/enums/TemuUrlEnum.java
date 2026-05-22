package tech.tiangong.sdp.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Temu地址
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/23 16:11
 */
@Getter
@AllArgsConstructor
public enum TemuUrlEnum {
    // 默认请求地址
    OPENAPI_ROUTER("router", "openapi/router"),
    // 20M以下视频上传地址
    STORE_VIDEO("store_video", "api/galerie/v1/store_video"),
    // 20MB以上视频上传初始化
    UPLOAD_INIT("upload_init", "api/galerie/large_file/v1/video/upload_init"),
    // 20MB以上视频分片上传
    UPLOAD_PART("upload_part", "api/galerie/large_file/v1/video/upload_part"),
    // 20MB以上视频分片上传完成接口
    UPLOAD_COMPLETE("upload_complete", "api/galerie/large_file/v1/video/upload_complete"),

    ;
    private final String code;
    private final String vale;
}
