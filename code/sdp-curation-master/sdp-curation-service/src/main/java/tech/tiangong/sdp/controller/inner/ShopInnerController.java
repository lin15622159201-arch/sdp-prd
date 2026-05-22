package tech.tiangong.sdp.controller.inner;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import team.aikero.blade.auth.annotation.PreCheckIgnore;
import team.aikero.blade.core.constant.UrlVersionConstant;
import team.aikero.blade.core.protocol.DataResponse;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.common.req.ShopInnerPageReq;
import tech.tiangong.sdp.common.resp.ShopInnerResp;
import tech.tiangong.sdp.controller.BasicController;
import tech.tiangong.sdp.service.ShopService;

/**
 * 店铺 - INNER
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 14:36
 */
@RestController
@RequestMapping(UrlVersionConstant.INNER + UrlVersionConstant.VERSION_V1 + "/shop/")
@RequiredArgsConstructor
public class ShopInnerController implements BasicController {
    private final ShopService shopService;

    /**
     * 分页查询
     *
     * @param req 参数
     * @return 结果
     */
    @PreCheckIgnore
    @PostMapping("page")
    public DataResponse<PageVo<ShopInnerResp>> page(final @Valid @RequestBody ShopInnerPageReq req) {
        return page(() -> shopService.pageInner(req));
    }
}
