package tech.tiangong.sdp.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import team.aikero.blade.core.constant.UrlVersionConstant;
import team.aikero.blade.core.protocol.DataResponse;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.service.StyleOnShelvesService;
import tech.tiangong.sdp.vo.dto.StyleOnShelvesGroupDTO;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.*;
import java.util.List;

import static team.aikero.blade.core.protocol.DataResponseExtKt.ok;

/**
 * 待上架列表 - WEB
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 16:52
 */
@RestController
@RequestMapping(UrlVersionConstant.WEB + UrlVersionConstant.VERSION_V1 + "/style-on-shelves/")
@RequiredArgsConstructor
public class StyleOnShelvesController implements BasicController {
    private final StyleOnShelvesService styleOnShelvesService;

    /**
     * 查询任务列表
     *
     * @param req 参数
     * @return 列表
     */
    @PostMapping("page")
    public DataResponse<PageVo<StyleOnShelvesPageResp>> page(final @Valid @RequestBody StyleOnShelvesPageReq req) {
        return page(() -> styleOnShelvesService.page(req));
    }


    /**
     * 查询任务总数
     *
     * @param req 参数
     * @return 列表
     */
    @PostMapping("state-total")
    public DataResponse<StyleOnShelvesGroupDTO> stateTotal(final @Validated @RequestBody StyleOnShelvesPageReq req) {
        return one(() -> styleOnShelvesService.stateTotal(req));
    }

    /**
     * 上架详情
     * @param styleId SPU主键ID
     * @return 返回
     */
    @GetMapping("/detail/{styleId}")
    public DataResponse<StyleOnShelvesResp> detail(@PathVariable(value = "styleId") Long styleId) {
        return one(() -> styleOnShelvesService.detail(styleId));
    }

    /**
     * 上架详情(商品管理专用)
     * @param styleId SPU主键ID
     * @return 返回
     */
    @GetMapping("/detail-all/{styleId}")
    public DataResponse<StyleOnShelvesResp> detailAll(@PathVariable(value = "styleId") Long styleId) {
        return one(() -> styleOnShelvesService.detailAll(styleId));
    }

    /**
     * 审核
     * @param req
     * @return 返回
     */
    @PostMapping("/review")
    public DataResponse<Boolean> review(final @Valid @RequestBody StyleOnShelvesReviewReq req) {
        return one(() -> styleOnShelvesService.review(req));
    }

    /**
     * 推送店家审核
     * @param req
     * @return 返回
     */
    @PostMapping("/push-shop-review")
    public DataResponse<Boolean> pushShopReview(final @Valid @RequestBody PushShopReviewReq req) {
        return one(() -> styleOnShelvesService.pushShopReview(req));
    }

    /**
     *  历史数据刷树，
     *  图片由SPU维度改为SKC维度(只处理款式管理-spu维度的图片)
     */
    @PostMapping("/refresh-skc-picture")
    public DataResponse<Void> refreshSkcPicture(@RequestBody List<String> styleCodes) {
        styleOnShelvesService.refreshSkcPicture(styleCodes);
        return ok();
    }
}
