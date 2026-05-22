package tech.tiangong.sdp.config;

import lombok.Data;

/**
 *  通用常量配置
 */
@Data
public class CommonProperties {

    /**
     * 发布商品时间间隔，秒
     */
    private Long publishIntervalTimeSeconds = 5 * 60L;

}
