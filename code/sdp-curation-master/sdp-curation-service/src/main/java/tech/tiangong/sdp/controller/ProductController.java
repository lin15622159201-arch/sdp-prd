package tech.tiangong.sdp.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import team.aikero.blade.core.constant.UrlVersionConstant;
import team.aikero.blade.core.protocol.DataResponse;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.service.ProductService;
import tech.tiangong.sdp.vo.dto.ProductStateGroupDTO;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.CheckBeforeBatchPublishResp;
import tech.tiangong.sdp.vo.resp.ProductPageResp;
import tech.tiangong.sdp.vo.resp.ProductResp;

import java.util.List;

import static team.aikero.blade.core.protocol.DataResponseExtKt.ok;

/**
 * 商品管理 - WEB
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/14 11:34
 */
@RestController
@RequestMapping(UrlVersionConstant.WEB + UrlVersionConstant.VERSION_V1 + "/product/")
@RequiredArgsConstructor
public class ProductController implements BasicController {
    private final ProductService productService;

    /**
     * 新增商品
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("create")
    public DataResponse<Boolean> create(final @Valid @RequestBody ProductAddReq req) {
        return one(() -> productService.create(req));
    }

    /**
     * 编辑商品图
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("file-edit")
    public DataResponse<Boolean> fileEdit(final @Valid @RequestBody ProductFileEditReq req) {
        return one(() -> productService.fileEdit(req));
    }

    /**
     * 编辑SKC
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("skc-upsert")
    public DataResponse<Boolean> skcUpsert(final @Valid @RequestBody ProductAddReq req) {
        return one(() -> productService.skcUpsert(req));
    }

    /**
     * 查询款审核信息
     *
     * @param styleId 款式 ID
     * @return 审核信息
     */
    @GetMapping("review/{styleId}")
    public DataResponse<ProductAddReq> getReview(@PathVariable final Long styleId) {
        return one(() -> productService.getReview(styleId));
    }

    /**
     * 查询详情信息
     *
     * @param productId 商品 ID
     * @return 审核信息
     */
    @GetMapping("detail/{productId}")
    public DataResponse<ProductResp> detail(@PathVariable final Long productId) {
        return one(() -> productService.detail(productId));
    }

    /**
     * 分页
     *
     * @param req 参数
     * @return 列表
     */
    @PostMapping("page")
    public DataResponse<PageVo<ProductPageResp>> page(final @Valid @RequestBody ProductPageReq req) {
        return page(() -> productService.page(req));
    }

    /**
     * 查询商品总数
     *
     * @param req 参数
     * @return 列表
     */
    @PostMapping("state-total")
    public DataResponse<List<ProductStateGroupDTO>> stateTotal(final @Valid @RequestBody ProductPageReq req) {
        return list(() -> productService.stateTotal(req));
    }

    /**
     * 批量发布
     *
     * @param styleIds 商品 ID集合
     * @return 结果
     */
    @PostMapping("batch-publish")
    public DataResponse<Boolean> batchPublish(final @Valid @RequestBody List<Long> styleIds) {
        return one(() -> productService.batchPublish(styleIds));
    }

    /**
     * 批量发布前校验平台上是否已经有同款商品
     *
     * @param styleIds 款 ID集合
     * @return 结果
     */
    @PostMapping("check-before-batch-publish")
    public DataResponse<CheckBeforeBatchPublishResp> checkBeforeBatchPublish(final @Valid @RequestBody List<Long> styleIds) {
        return one(() -> productService.checkBeforeBatchPublish(styleIds));
    }

    /**
     * 批量发布或关联平台商品
     * @param req
     * @return
     */
    @PostMapping("batch-publish-or-associate")
    public DataResponse<Void> batchPublishOrAssociate(final @Valid @RequestBody BatchPublishOrAssociateReq req) {
        productService.batchPublishOrAssociate(req);
        return ok();
    }

    /**
     * 测价
     *
     * @param reqs 测价参数
     * @return 结果
     */
    @PostMapping("batch-test-price")
    public DataResponse<Boolean> batchTestPrice(final @Valid @RequestBody List<ProductTestPriceReq> reqs) {
        return one(() -> productService.batchTestPrice(reqs));
    }

}
