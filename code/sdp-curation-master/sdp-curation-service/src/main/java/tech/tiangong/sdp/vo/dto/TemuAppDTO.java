package tech.tiangong.sdp.vo.dto;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * Temu APP
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/18 16:50
 */
@Data
public class TemuAppDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = 9052521414007293806L;
    /**
     * token
     */
    private String accessToken;

    /**
     * APP Key
     */
    private String appKey;
    /**
     * APP 密钥
     */
    private String appSecret;

    /**
     * 订单 token
     */
    private String orderToken;

    /**
     * 店铺名称
     */
    private String shopName;

    /**
     * 店铺Id
     */
    private Long shopId;
}
