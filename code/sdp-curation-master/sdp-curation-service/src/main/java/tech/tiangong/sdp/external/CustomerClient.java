package tech.tiangong.sdp.external;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import team.aikero.blade.core.protocol.DataResponse;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.vo.req.CustomerIdInnerReq;
import tech.tiangong.sdp.vo.req.CustomerSearchInnerReq;
import tech.tiangong.sdp.vo.resp.BrandChannelCooperationDetailInnerVo;
import tech.tiangong.sdp.vo.resp.CustomerDetailInnerVo;
import tech.tiangong.sdp.vo.resp.CustomerResp;
import tech.tiangong.sdp.yibuyun.ZjOpenFeignUserContentConfig;

@FeignClient(value = "crm-customer-service",
        contextId = "customerInfoClient", configuration = ZjOpenFeignUserContentConfig.class,
        path = "/crm-customer/inner/v1/customer-info",
        url = "${plm.domain.url}")
public interface CustomerClient {
    /**
     * 搜索客户列表
     *
     * @param req 请求参数
     * @return 客户列表基本信息
     */
    @PostMapping("/search-customer")
    DataResponse<PageVo<CustomerResp>> searchCustomer(@RequestBody CustomerSearchInnerReq req);


    /**
     * 客户详情
     *
     * @param req 请求参数
     * @return 客户详情信息
     */
    @PostMapping("/detail")
    DataResponse<CustomerDetailInnerVo> detail(@RequestBody CustomerIdInnerReq req);


    /**
     * 客户合作模式详情
     *
     * @param purchaserId 客户ID
     * @return 客户详情信息
     */
    @GetMapping("/brand-channel-cooperation/{purchaserId}")
    DataResponse<BrandChannelCooperationDetailInnerVo> brandChannelCooperationDetail(@PathVariable(value = "purchaserId") Long purchaserId);


}
