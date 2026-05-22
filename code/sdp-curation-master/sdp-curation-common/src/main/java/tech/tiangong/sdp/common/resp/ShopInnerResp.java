package tech.tiangong.sdp.common.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;


/**
 * 店铺内部实体
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/22 11:41
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class ShopInnerResp extends BaseVO {
    @Serial
    private static final long serialVersionUID = -5826593455139298075L;
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
     * 是否启用【1启用；0禁用】
     */
    private Integer enable;
}
