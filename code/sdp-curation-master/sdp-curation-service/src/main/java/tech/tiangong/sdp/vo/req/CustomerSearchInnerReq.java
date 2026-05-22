package tech.tiangong.sdp.vo.req;

import lombok.Data;
import lombok.EqualsAndHashCode;
import team.aikero.blade.core.protocol.PageReq;

import java.io.Serial;
import java.util.List;

/**
 * 客户查询
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/14 15:11
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class CustomerSearchInnerReq extends PageReq {
    @Serial
    private static final long serialVersionUID = 1092885329904055006L;
    /**
     * 客户名称|编号
     */
    private String keyword;
    /**
     * 客户名称
     */
    private String customerName;

    /**
     * 客户id列表
     */
    private List<Long> customerIds;

    /**
     * 客户编码列表
     */
    private List<String> customerCodes;

    /**
     * 是否包含旧客户
     */
    private Boolean includeOld;

    /**
     * 私海客户-1、公海客户-2 (默认返回所有)
     */
    private Integer followState;

    /**
     * 客户类型
     * 1--外部客户，2--内部客户
     *
     */
    private Integer customerType;

    /**
     * 合作业务：1-天工业务
     */
    private Integer cooperationBusiness = 1;

    /**
     * 是否是代理商:0-否,1-是，默认全部
     */
    private Integer isAgency;

    /**
     * 业务类型 (默认自营，传0查全部)
     * SELF_OPERATED_BUSINESS(1, "自营业务"),
     * PLATFORM_BUSINESS(2, "平台业务"),
     * PROMOTE_STYLE_BUSINESS(3, "推款业务"),
     */
    private Integer businessType;

    /**
     * 是否过滤未准入客户 true为过滤(只查询已启用的客户)，false为不过滤（为准入与已启用的用户都查询），默认为true
     */
    private Boolean isFilterNotAllow = true;

    /**
     * 合同类型（1--自营，2--平台）
     *
     */
    private Integer contractType;
}
