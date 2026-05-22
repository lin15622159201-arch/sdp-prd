package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.common.resp.BaseVO;

import java.io.Serial;
import java.time.LocalDateTime;

/**
 * 店铺
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:09
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class ShopResp extends BaseVO {
    @Serial
    private static final long serialVersionUID = 5072057923302960270L;
    /**
     * 主键 ID
     */
    private Long shopId;

    /**
     * 平台编码
     */
    private String platformCode;

    /**
     * 平台名称
     */
    private String platformName;

    /**
     * 主体编码
     */
    private String subjectCode;

    /**
     * 主体名称
     */
    private String subjectName;

    /**
     * 店铺名
     */
    private String shopName;

    /**
     * 店铺类型
     */
    private String shopType;

    /**
     * 商品 token
     */
    private String productToken;

    /**
     * 订单 token
     */
    private String orderToken;

    /**
     * 标签
     */
    private String label;

    /**
     * 运营人员 ID
     */
    private Long businessOperatorId;

    /**
     * 运营人员名称
     */
    private String businessOperatorName;

    /**
     * 信息备注
     */
    private String message;

    /**
     * 是否启用【1启用；0禁用】
     */
    private Integer enable;
    /**
     * 是否有效【1有效；0无效】
     */
    private Integer expired;
    /**
     * 授权开始时间
     */
    private LocalDateTime authStartTime;
    /**
     * 授权结束时间
     */
    private LocalDateTime authEndTime;
}
