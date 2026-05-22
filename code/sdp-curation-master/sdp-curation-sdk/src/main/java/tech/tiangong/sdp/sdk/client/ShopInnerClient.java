package tech.tiangong.sdp.sdk.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import team.aikero.blade.core.annotation.feign.InnerFeign;
import team.aikero.blade.core.protocol.DataResponse;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.common.constant.Constant;
import tech.tiangong.sdp.common.req.ShopInnerPageReq;
import tech.tiangong.sdp.common.resp.ShopInnerResp;

/**
 * 店铺
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 14:41
 */
@FeignClient(
        value = Constant.APPLICATION_NAME,
        path = Constant.CONTEXT_PATH + "/inner/v1/shop/",
        contextId = "ShopInnerClient",
        url = "${domain.ola}"
)
@InnerFeign
public interface ShopInnerClient {
    /**
     * 分页查询
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("page")
    DataResponse<PageVo<ShopInnerResp>>  page(final @RequestBody ShopInnerPageReq req);
}
