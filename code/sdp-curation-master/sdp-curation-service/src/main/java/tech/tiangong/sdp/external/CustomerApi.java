package tech.tiangong.sdp.external;

import cn.hutool.extra.spring.SpringUtil;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.core.protocol.PageVo;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.vo.req.CustomerIdInnerReq;
import tech.tiangong.sdp.vo.req.CustomerPageReq;
import tech.tiangong.sdp.vo.req.CustomerSearchInnerReq;
import tech.tiangong.sdp.vo.resp.BrandChannelCooperationDetailInnerVo;
import tech.tiangong.sdp.vo.resp.CustomerDetailInnerVo;
import tech.tiangong.sdp.vo.resp.CustomerResp;

import java.util.Objects;

/**
 * 客户远程接口
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/21 18:18
 */
@Slf4j
@UtilityClass
public class CustomerApi {
    private final CustomerClient customerClient = SpringUtil.getBean(CustomerClient.class);
    /**
     * 客户查询
     */
    public PageVo<CustomerResp> page(final CustomerPageReq req) {
        log.info("客户查询参数\t{}", JsonsKt.toJsonPretty(req));
        final var inner = new CustomerSearchInnerReq() ;
        BasicConvert.copy(req, inner);
        final var data = BasicConvert.invoke("客户查询失败", () -> customerClient.searchCustomer(inner));
        if (Objects.isNull(data)) {
            throw new BusinessException("客户为空");
        }
        return data;
    }


    /**
     * 客户-详情
     */
    public CustomerDetailInnerVo detail(final CustomerIdInnerReq req) {
        log.info("客户-详情-查询参数\t{}", JsonsKt.toJsonPretty(req));
        final var data = BasicConvert.invoke("客户-详情查询失败", () -> customerClient.detail(req));
        if (Objects.isNull(data)) {
            throw new BusinessException("客户详情信息为空");
        }
        return data;
    }

    /**
     * 客户-合作模式
     */
    public BrandChannelCooperationDetailInnerVo brandChannelCooperationDetail(final Long customerId) {
        log.info("客户-合作模式-查询参数\t{}", JsonsKt.toJsonPretty(customerId));
        final var data = BasicConvert.invoke("客户-合作模式查询失败", () -> customerClient.brandChannelCooperationDetail(customerId));
        if (Objects.isNull(data)) {
            throw new BusinessException("客户-合作模式信息不存在，客户ID：" + customerId);
        }
        log.info("客户-合作模式-返回参数\t{}", JsonsKt.toJsonPretty(data));
        return data;
    }
}
