package tech.tiangong.sdp.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import team.aikero.blade.core.constant.UrlVersionConstant;
import team.aikero.blade.core.protocol.DataResponse;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.service.SizeDiffService;
import tech.tiangong.sdp.vo.req.SizeDiffAddReq;
import tech.tiangong.sdp.vo.req.SizeDiffEditReq;
import tech.tiangong.sdp.vo.req.SizeDiffPageReq;
import tech.tiangong.sdp.vo.resp.SizeDiffResp;

/**
 * 档差管理 - WEB
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/14 11:34
 */
@RestController
@RequestMapping(UrlVersionConstant.WEB + UrlVersionConstant.VERSION_V1 + "/size-diff/")
@RequiredArgsConstructor
public class SizeDiffController implements BasicController {
    private final SizeDiffService SizeDiffService;

    /**
     * 创建
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("create")
    public DataResponse<Boolean> create(final @Valid @RequestBody SizeDiffAddReq req) {
        return one(() -> SizeDiffService.create(req));
    }


    /**
     * 分页
     *
     * @param req 参数
     * @return 列表
     */
    @PostMapping("page")
    public DataResponse<PageVo<SizeDiffResp>> page(final @Valid @RequestBody SizeDiffPageReq req) {
        return page(() -> SizeDiffService.page(req));
    }

    /**
     * 编辑
     *
     * @param req 参数
     * @return 结果
     */
    @PutMapping("edit")
    public DataResponse<Boolean> edit(final @Valid @RequestBody SizeDiffEditReq req) {
        return one(() -> SizeDiffService.edit(req));
    }
}
