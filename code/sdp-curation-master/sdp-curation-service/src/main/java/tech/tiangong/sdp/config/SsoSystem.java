package tech.tiangong.sdp.config;

import lombok.Data;

/**
 * SsoSystem
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/11 18:13
 */
@Data
public class SsoSystem {
    private String id;
    private String secretKey;
    private String code;
}
