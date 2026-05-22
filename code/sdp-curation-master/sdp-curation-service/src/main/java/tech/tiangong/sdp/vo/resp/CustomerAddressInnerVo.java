package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

/**
 * 店铺
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:09
 */
@EqualsAndHashCode(callSuper = false)
@Data
public class CustomerAddressInnerVo implements Serializable {


    private static final long serialVersionUID = 1L;

    /**
     * 客户地址id，主键
     */
    private Long customerAddressId;

    /**
     * 关联表的主键id
     */
    private Long customerId;

    /**
     * 收件人
     */
    private String recipient;

    /**
     * 收件人电话
     */
    private String recipientPhone;

    /**
     * 省份
     */
    private String province;

    /**
     * 城市
     */
    private String city;

    /**
     * 区域
     */
    private String region;

    /**
     * 街道详细地址
     */
    private String addressDetail;

    /**
     * 合作业务Id
     */
    private Long businessId;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 地址类型: bulk_address 大货地址、 sample_address 样衣地址
     */
    private String type;

    /**
     * 是否默认
     */
    private Integer isDefault;

}
