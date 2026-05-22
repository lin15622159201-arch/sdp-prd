package tech.tiangong.sdp.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import team.aikero.blade.core.constant.UrlVersionConstant;
import team.aikero.blade.core.protocol.DataResponse;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.service.SizeTemplateService;
import tech.tiangong.sdp.vo.req.SizeTemplateAddReq;
import tech.tiangong.sdp.vo.req.SizeTemplateEditReq;
import tech.tiangong.sdp.vo.req.SizeTemplateEnableReq;
import tech.tiangong.sdp.vo.req.SizeTemplatePageReq;
import tech.tiangong.sdp.vo.resp.SizeTemplateResp;

import java.util.List;

/**
 * 尺码模板管理 - WEB
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/14 11:34
 */
@RestController
@RequestMapping(UrlVersionConstant.WEB + UrlVersionConstant.VERSION_V1 + "/size-temp/")
@RequiredArgsConstructor
public class SizeTemplateController implements BasicController {
    private final SizeTemplateService sizeTemplateService;

    /**
     * 批量创建
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("batch-create")
    public DataResponse<Boolean> batchCreate(final @Valid @RequestBody List<SizeTemplateAddReq> req) {
        return one(() -> sizeTemplateService.batchCreate(req));
    }

    /**
     * 批量删除
     *
     * @param sizeTemplateIds 尺码模板 ID集合
     * @return 结果
     */
    @PostMapping("batch-remove")
    public DataResponse<Boolean> batchRemove(final @Valid @RequestBody List<Long> sizeTemplateIds) {
        return one(() -> sizeTemplateService.batchRemove(sizeTemplateIds));
    }

    /**
     * 批量启用
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("batch-enable")
    public DataResponse<Boolean> batchEnable(final @Valid @RequestBody List<SizeTemplateEnableReq> req) {
        return one(() -> sizeTemplateService.batchEnable(req));
    }

    /**
     * 分页
     *
     * @param req 参数
     * @return 列表
     */
    @PostMapping("page")
    public DataResponse<PageVo<SizeTemplateResp>> page(final @Valid @RequestBody SizeTemplatePageReq req) {
        return page(() -> sizeTemplateService.page(req));
    }

    /**
     * 编辑
     *
     * @param req 参数
     * @return 结果
     */
    @PutMapping("edit")
    public DataResponse<Boolean> edit(final @Valid @RequestBody SizeTemplateEditReq req) {
        return one(() -> sizeTemplateService.edit(req));
    }
}
