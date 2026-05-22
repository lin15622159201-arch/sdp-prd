package tech.tiangong.sdp.external;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import team.aikero.blade.core.protocol.DataResponse;
import tech.tiangong.sdp.vo.req.DesignerDataReq;
import tech.tiangong.sdp.vo.resp.DesignerResp;
import tech.tiangong.sdp.yibuyun.SDPOpenFeignUserInterceptor;
import tech.tiangong.sdp.yibuyun.ZjOpenFeignUserContentConfig;
import java.util.List;

/**
 * @author liuhongfu
 */
@FeignClient(value = "clothing-foundation-material-design-service",
        contextId = "designerClient", configuration = SDPOpenFeignUserInterceptor.class,
        path = "/clothing-material/v1/inner/material",
        url = "${plm.domain.url}")

public interface DesignerClient {
    /**
     * 【获取设计师信息】
     */
    @PostMapping("/designer/designer-list")
    DataResponse<List<DesignerResp>> designerInfoList(@RequestBody DesignerDataReq req);

}
