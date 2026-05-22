package tech.tiangong.sdp.external;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import team.aikero.blade.core.protocol.DataResponse;
import tech.tiangong.sdp.vo.req.AiCategoryMappingBatchQuery;
import tech.tiangong.sdp.vo.resp.AiCategoryMappingVO;
import tech.tiangong.sdp.yibuyun.SDPOpenFeignUserInterceptor;

import java.util.List;

@FeignClient(value ="sdp-clothing-foundation-material-service",
        contextId = "sdpAiCategoryMappingClient",
        configuration = SDPOpenFeignUserInterceptor.class,
        path = /*ClothingMaterialConfig.CONTEXT_PATH + UrlVersionConstant.INNER + UrlVersionConstant.VERSION_V1*/
                "/sdp-clothing-material/inner/v1"
)
public interface AiCategoryMappingClient {


    /**
     * 根据AI品类code批量查询
     *
     * @param query 查询对象
     * @return PageRespVo<AiCategoryMappingVO>
     */
    @PostMapping("/ai-category-mapping/ai-category-by-code-batch")
    DataResponse<List<AiCategoryMappingVO>> findByAiCategoryCode(@RequestBody @Validated AiCategoryMappingBatchQuery query);
}
