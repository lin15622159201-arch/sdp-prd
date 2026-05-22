package tech.tiangong.sdp.external;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import team.aikero.blade.core.protocol.DataResponse;
import tech.tiangong.sdp.vo.dto.DesignerDTO;
import tech.tiangong.sdp.vo.req.DesignerRemoteReq;
import tech.tiangong.sdp.yibuyun.SDPOpenFeignUserInterceptor;

import java.util.List;

/**
 * SdpMaterialDesignerClient
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/5 9:58
 */
@FeignClient(
        contextId = "sdpMaterialDesignerClient",
        value = "sdp-clothing-foundation-material-service",
        url = "${domain.nest-api}",
        path = "/sdp-clothing-material/v1/inner/material/",
        configuration = SDPOpenFeignUserInterceptor.class
)
public interface SdpMaterialDesignerClient {
    /**
     * 根据条件查询设计师信息
     *
     * @param req 查询信息
     * @return {@link <DataResponse<DesignerDTO>>}
     */
    @PostMapping("designer/designer-list")
    DataResponse<List<DesignerDTO>> designerInfoList(@RequestBody DesignerRemoteReq req);
}
