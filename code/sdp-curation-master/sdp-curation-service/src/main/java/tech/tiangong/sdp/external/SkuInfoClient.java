package tech.tiangong.sdp.external;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import team.aikero.blade.core.protocol.DataResponse;
import tech.tiangong.sdp.vo.req.SkcBatchQueryReq;
import tech.tiangong.sdp.vo.resp.BaseSkuResp;
import tech.tiangong.sdp.yibuyun.SDPOpenFeignUserInterceptor;

import java.util.List;

/**
 * @author liuhongfu
 */
@FeignClient(value = "tiangong-tk-product-service",
        contextId = "skuInfoClient", configuration = SDPOpenFeignUserInterceptor.class,
        path = "/tiangong-tk-product/web/v1/skus",
        url = "${plm.domain.url}")

public interface SkuInfoClient {

    @PostMapping("/batch-query-by-skc")
    DataResponse<List<BaseSkuResp>> batchQueryBySkc(@RequestBody SkcBatchQueryReq req);
}
