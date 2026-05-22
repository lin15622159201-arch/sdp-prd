package tech.tiangong.sdp.external;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import team.aikero.blade.core.protocol.DataResponse;
import tech.tiangong.sdp.yibuyun.SDPOpenFeignUserInterceptor;
import java.util.List;
import org.springframework.web.bind.annotation.RequestBody;
import tech.tiangong.sdp.vo.resp.DictValueBatchListVo;
/**
 * 字典值Feign接口<br/>
 *
 * @author : zjl
 * @date : 2023-4-25 10:51:17
 */
@FeignClient(
        value = "ufg-service",
        contextId = "tg-DictValueClient",configuration = SDPOpenFeignUserInterceptor.class,
        path = "/ufg/tg-api/inner/v1/dict-value",
        url = "${plm.domain.url}"
)public interface DictValueClient {

    /**
     * 字典值 - 批量查询
     *
     * @param dictCodes 字典编码集合
     * @return DataResponse<List < DictValueVo>>
     */
    @PostMapping("/batch-list")
    DataResponse<List<DictValueBatchListVo>> listByDictCodes(@RequestBody List<String> dictCodes);


}

