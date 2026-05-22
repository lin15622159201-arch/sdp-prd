package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 店铺
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:09
 */
@EqualsAndHashCode(callSuper = false)
@Data
public class CustomerDetailInnerVo implements Serializable {
    @Serial
    private static final long serialVersionUID = 7507033471735932273L;

    /**
     * 基本信息
     */
    private CustomerBaseInfoInnerVo baseInfo;

    /**
     * 联系人列表
     */
    private List<CustomerContactInnerVo> contactList;

    /**
     * 收货地址
     */
    public List<CustomerAddressInnerVo> addressList;
}
