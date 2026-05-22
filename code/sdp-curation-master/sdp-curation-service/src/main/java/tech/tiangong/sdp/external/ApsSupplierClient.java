package tech.tiangong.sdp.external;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import team.aikero.blade.core.protocol.DataResponse;
import tech.tiangong.sdp.vo.req.SupplierInfoDataReq;
import tech.tiangong.sdp.vo.resp.SupplierSimpleResp;
import tech.tiangong.sdp.yibuyun.ZjOpenFeignUserContentConfig;

import java.util.List;

@FeignClient(value = "aps-supplier-service",
        contextId = "apsSupplierClient", configuration = ZjOpenFeignUserContentConfig.class,
        path = "/zj-tg-api/aps-supplier/tg-api/inner/v1/supplier-info",
        url = "${cx-tg.domain.url}")
public interface ApsSupplierClient {
    /**
     * 【获取供应商精简信息】
     */
    @PostMapping("/get-supplier-name")
    DataResponse<List<SupplierSimpleResp>> getSupplierName(@RequestBody @Validated SupplierInfoDataReq req);

}
