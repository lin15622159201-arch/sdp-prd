package tech.tiangong.sdp.external;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import team.aikero.blade.core.protocol.DataResponse;
import tech.tiangong.sdp.vo.resp.ColorCategoryResp;
import tech.tiangong.sdp.yibuyun.SDPOpenFeignUserInterceptor;
import tech.tiangong.sdp.yibuyun.ZjOpenFeignUserContentConfig;

import java.util.List;

/**
 * PLM基础信息远程调用
 * @author liuhongfu
 */
@FeignClient(value = "clothing-foundation-material-color-service",
        contextId = "colorClient", configuration = SDPOpenFeignUserInterceptor.class,
        path = "/clothing-material/inner/v1",
        url = "${plm.domain.url}")

public interface PlmBaseClient {

    /**
     * 全部类别以及下属的颜色
     */
    @GetMapping("/color/all-color-and-category")
    DataResponse<List<ColorCategoryResp>> colorCategory();

}
