package tech.tiangong.sdp.vo.resp;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class CustomerBaseInfoInnerVo implements Serializable {


    private static final long serialVersionUID = 3178281571881958367L;
    /**
     * 客户id
     */
    private Long customerId;

    /**
     * 客户编码
     */
    private String customerCode;

    /**
     * 客户全称
     */
    private String customerName;

    /**
     * 客户状态；1:禁用，2：启用，3：未准入，4：已禁用
     *
     */
    private Integer customerState;

    /**
     * 客户授信状态
     *
     */
    private Integer creditGrantingState;

    /**
     * 客户类型
     * 1--外部客户，2--内部客户
     *
     */
    private Integer customerType;

    /**
     * 法人联系电话
     */
    private String artificialPersonPhone;

    /**
     * 注册地址
     */
    private String registrationAddress;

    /**
     * 注册地址-省份
     */
    private String registrationProvince;

    /**
     * 注册地址-城市
     */
    private String registrationCity;

    /**
     * 注册地址-区/县
     */
    private String registrationRegion;

    /**
     * 集团id
     */
    private Long groupId;

    /**
     * bdid
     */
    private Long workerId;

    /**
     * 百布-bdid
     */
    private Long baibuWorkerId;

    /**
     * bd名称
     */
    private String workerName;

    /**
     * 是否开通金融钱包
     */
    private Integer isWallet;

    /**
     * 激活状态：1-已激活、0-未激活（旧客户）
     */
    private Integer isActive;

    /**
     * 是否是代理商:0-否,1-是
     */
    private Integer isAgency;

    /**
     * 合同类型（1--自营，2--平台）
     *
     */
    private Integer contractType;

    /**
     * ops 区域code
     */
    private String regionCode;
    /**
     * ops 区域名字
     */
    private String regionName;

    /**
     * 业务id
     */
    @JsonIgnore
    private Long businessId;
}
