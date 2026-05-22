package tech.tiangong.sdp.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.aikero.blade.core.constant.UrlVersionConstant;
import team.aikero.blade.core.protocol.DataResponse;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.service.PlatformCategoryMappingService;
import tech.tiangong.sdp.vo.req.PlatformCategoryMappingAddReq;
import tech.tiangong.sdp.vo.req.PlatformCategoryMappingPageReq;
import tech.tiangong.sdp.vo.resp.PlatformCategoryMappingResp;

import java.util.List;

/**
 * 品类关联管理 - WEB
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/14 11:34
 */
@RestController
@RequestMapping(UrlVersionConstant.WEB + UrlVersionConstant.VERSION_V1 + "/category-mapping/")
@RequiredArgsConstructor
public class PlatformCategoryMappingController implements BasicController {
    private final PlatformCategoryMappingService platformCategoryMappingService;

    /**
     * 批量创建
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("batch-create")
    public DataResponse<Boolean> batchCreate(final @Valid @RequestBody List<PlatformCategoryMappingAddReq> req) {
        return one(() -> platformCategoryMappingService.batchCreate(req));
    }

    /**
     * 批量删除
     *
     * @param mappingIds 关联 ID集合
     * @return 结果
     */
    @PostMapping("batch-remove")
    public DataResponse<Boolean> batchRemove(final @Valid @RequestBody List<Long> mappingIds) {
        return one(() -> platformCategoryMappingService.batchRemove(mappingIds));
    }

    /**
     * 分页
     *
     * @param req 参数
     * @return 列表
     */
    @PostMapping("page")
    public DataResponse<PageVo<PlatformCategoryMappingResp>> page(final @Valid @RequestBody PlatformCategoryMappingPageReq req) {
        return page(() -> platformCategoryMappingService.page(req));
    }
}
