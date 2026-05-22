package tech.tiangong.sdp.sdk.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import team.aikero.blade.core.annotation.feign.InnerFeign;
import team.aikero.blade.core.protocol.DataResponse;
import tech.tiangong.sdp.common.constant.Constant;
import tech.tiangong.sdp.common.req.DevelopStyleRelaAddReq;

import java.util.List;

/**
 * 开款任务
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 14:41
 */
@FeignClient(
        value = Constant.APPLICATION_NAME,
        path = Constant.CONTEXT_PATH + "/inner/v1/develop-style/",
        contextId = "DevelopStyleTaskInnerClient",
        url = "${domain.ola}"
)
@InnerFeign
public interface DevelopStyleTaskInnerClient {
    /**
     * 关联任务
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("batch-rela")
    DataResponse<Boolean> batchRela(final @Validated @RequestBody List<DevelopStyleRelaAddReq> req);
}
