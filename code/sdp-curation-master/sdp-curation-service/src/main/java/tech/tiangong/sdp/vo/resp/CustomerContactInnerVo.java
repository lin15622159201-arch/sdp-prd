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
public class CustomerContactInnerVo implements Serializable {


    /**
     * 客户联系人id(主键)
     */
    private Long customerContactId;

    /**
     * 联系人id
     */
    private Long contactId;

    /**
     * 客户id
     */
    private Long customerId;

    /**
     * 联系人名字
     */
    private String contactName;

    /**
     * 职务
     */
    private String post;

    /**
     * 电话
     */
    private String phone;

    /**
     * 邮箱
     */
    private String email;

    /**
     * 备注
     */
    private String remark;

    /**
     * 合作业务Id
     */
    private Long businessId;

    /**
     * 是否启用 1--启用，0--禁用
     */
    private Integer enable;

}
