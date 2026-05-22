package tech.tiangong.sdp.temu.config;

import lombok.Data;

/**
 * Temu
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/24 15:55
 */
@Data
public class TemuPlatformProperties {
    /*
     * token

    private String accessToken;
     */
    /*
     * APP Key

    private String appKey;
     */
    /*
     * APP 密钥

    private String appSecret;
     */
    /**
     * 请求地址
     */
    private String url;
    /**
     * 店铺 ID
     */
    private Long shopId;

}
