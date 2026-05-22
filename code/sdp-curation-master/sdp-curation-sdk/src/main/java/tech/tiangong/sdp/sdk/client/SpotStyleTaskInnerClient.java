package tech.tiangong.sdp.sdk.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import team.aikero.blade.core.annotation.feign.InnerFeign;
import team.aikero.blade.core.protocol.DataResponse;
import tech.tiangong.sdp.common.constant.Constant;
import tech.tiangong.sdp.common.req.SpotSkcCancelReq;

import java.util.List;

/**
 * 现货任务
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 14:41
 */
@FeignClient(
        value = Constant.APPLICATION_NAME,
        path = Constant.CONTEXT_PATH + "/inner/v1/spot-style/",
        contextId = "SpotStyleTaskInnerClient",
        url = "${domain.ola}"
)
@InnerFeign
public interface SpotStyleTaskInnerClient {
    /**
     * 批量取消
     *
     * @param req 参数
     * @return 结果
     */
    @PutMapping("batch-cancel")
    DataResponse<Boolean> batchCancel(final @RequestBody List<SpotSkcCancelReq> req);
}
