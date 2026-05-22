package tech.tiangong.sdp.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import team.aikero.blade.core.constant.UrlVersionConstant;
import team.aikero.blade.core.protocol.DataResponse;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.service.ShopService;
import tech.tiangong.sdp.vo.req.ShopAddReq;
import tech.tiangong.sdp.vo.req.ShopEditReq;
import tech.tiangong.sdp.vo.req.ShopEnableReq;
import tech.tiangong.sdp.vo.req.ShopPageReq;
import tech.tiangong.sdp.vo.resp.ShopResp;

import java.util.List;

/**
 * 店铺管理 - WEB
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/14 11:34
 */
@RestController
@RequestMapping(UrlVersionConstant.WEB + UrlVersionConstant.VERSION_V1 + "/shop/")
@RequiredArgsConstructor
public class ShopController implements BasicController {
    private final ShopService shopService;

    /**
     * 批量创建
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("batch-create")
    public DataResponse<Boolean> batchCreate(final @Valid @RequestBody List<ShopAddReq> req) {
        return one(() -> shopService.batchCreate(req));
    }

    /**
     * 批量删除
     *
     * @param shopIds 店铺 ID集合
     * @return 结果
     */
    @PostMapping("batch-remove")
    public DataResponse<Boolean> batchRemove(final @Valid @RequestBody List<Long> shopIds) {
        return one(() -> shopService.batchRemove(shopIds));
    }

    /**
     * 批量启用
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("batch-enable")
    public DataResponse<Boolean> batchEnable(final @Valid @RequestBody List<ShopEnableReq> req) {
        return one(() -> shopService.batchEnable(req));
    }

    /**
     * 分页
     *
     * @param req 参数
     * @return 列表
     */
    @PostMapping("page")
    public DataResponse<PageVo<ShopResp>> page(final @Valid @RequestBody ShopPageReq req) {
        return page(() -> shopService.page(req));
    }

    /**
     * 编辑
     *
     * @param req 参数
     * @return 结果
     */
    @PutMapping("edit")
    public DataResponse<Boolean> edit(final @Valid @RequestBody ShopEditReq req) {
        return one(() -> shopService.edit(req));
    }
}
