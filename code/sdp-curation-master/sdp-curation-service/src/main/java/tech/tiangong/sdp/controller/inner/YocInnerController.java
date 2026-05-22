package tech.tiangong.sdp.controller.inner;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import team.aikero.blade.auth.UserContexts;
import team.aikero.blade.auth.annotation.PreCheckIgnore;
import team.aikero.blade.core.constant.UrlVersionConstant;
import team.aikero.blade.core.protocol.DataResponse;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.aspect.YocOperationLogMark;
import tech.tiangong.sdp.controller.BasicController;
import tech.tiangong.sdp.enums.YocOperationTypeEnum;
import tech.tiangong.sdp.service.*;
import tech.tiangong.sdp.service.yoc.YocIntegrationService;
import tech.tiangong.sdp.service.yoc.YocOperationLogService;
import tech.tiangong.sdp.temu.vo.dto.TemuFreightTemplateDTO;
import tech.tiangong.sdp.temu.vo.dto.TemuWarehouseDTO;
import tech.tiangong.sdp.temu.vo.resp.TemuGoodsPropertyResp;
import tech.tiangong.sdp.vo.dto.StyleOnShelvesGroupDTO;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.req.yoc.*;
import tech.tiangong.sdp.vo.resp.*;
import tech.tiangong.sdp.vo.resp.yoc.YocOperationLogResp;
import tech.tiangong.sdp.vo.resp.yoc.YocProductReviewResp;
import tech.tiangong.sdp.vo.resp.yoc.YocUserQueryResp;

import java.util.List;

/**
 * YOC店铺运营中心 调用接口
 *
 * @author while
 * @since 1.0.0
 */
@PreCheckIgnore
@RestController
@RequestMapping(UrlVersionConstant.INNER + UrlVersionConstant.VERSION_V1 + "/yoc")
@RequiredArgsConstructor
public class YocInnerController implements BasicController {

    private final StyleOnShelvesService styleOnShelvesService;
    private final ShopService shopService;
    private final TemuService temuService;
    private final PlatformCategoryMappingService platformCategoryMappingService;
    private final YocIntegrationService yocIntegrationService;
    private final YocOperationLogService yocOperationLogService;
    private final SizeTemplateService sizeTemplateService;
    private final ProductService productService;

    // ==================== temu待上架商品管理接口 ====================

    /**
     * 待上架-列表查询
     *
     * @param req 查询请求参数
     * @return 商品列表分页数据
     */
    @PostMapping("/style-on-shelves/page")
    public DataResponse<PageVo<StyleOnShelvesPageResp>> onShelvePage(final @Valid @RequestBody StyleOnShelvesPageReq req) {
        return page(() -> yocIntegrationService.onShelvePage(req));
    }

    /**
     * 待上架-任务总数
     *
     * @param req 参数
     * @return 列表
     */
    @PostMapping("/style-on-shelves/state-total")
    public DataResponse<StyleOnShelvesGroupDTO> onShelveStateTotal(final @Validated @RequestBody StyleOnShelvesPageReq req) {
        return one(() -> yocIntegrationService.stateTotal(req));
    }

    /**
     * 待上架-详情
     *
     * @param styleId SPU主键ID
     * @return 返回
     */
    @GetMapping("/style-on-shelves/detail/{styleId}")
    public DataResponse<StyleOnShelvesResp> detail(@PathVariable(value = "styleId") Long styleId) {
        return one(() -> styleOnShelvesService.detail(styleId));
    }

    /**
     * 待上架-店铺审核
     *
     * @param req     审核请求参数
     * @return 操作结果
     */
    @PostMapping("/style-on-shelves/audit")
    @YocOperationLogMark(
            operationType = YocOperationTypeEnum.AUDIT_PASS,
            businessIdParam = "req.styleId"
    )
    public DataResponse<Boolean> onShelveShopAudit(@Valid @RequestBody YocStyleOnShelvesAuditReq req) {
        return one(() -> yocIntegrationService.shopAudit(req));
    }

    /**
     * 批量店主审核
     *
     */
    @PostMapping("/style-on-shelves/update-shop-review")
    public DataResponse<Integer> updateShopReview(@Valid @RequestBody List<String> styleCodeList) {
        return one(() -> yocIntegrationService.updateShopReview(styleCodeList));
    }
    // ==================== 商品管理接口 ====================

    /**
     * 商品-批量查询款审核-价格信息
     *
     * @param req 批量查询请求参数
     * @return 商品审核信息列表
     */
    @PostMapping("/product/review-price/batch")
    public DataResponse<List<YocProductReviewResp>> batchGetReview(@Valid @RequestBody final YocProductReviewBatchReq req) {
        return list(() -> yocIntegrationService.batchGetReview(req));
    }

    /**
     * 商品-查询款审核信息
     *
     * @param styleId 款式 ID
     * @return 审核信息
     */
    @GetMapping("/product/review/{styleId}")
    public DataResponse<ProductAddReq> getReview(@PathVariable final Long styleId) {
        return one(() -> productService.getReview(styleId));
    }


    // ==================== 店铺管理接口 ====================

    /**
     * 查询主体下关联店铺
     *
     * @param req 查询请求参数
     * @return 店铺列表分页数据
     */
    @PostMapping("/shop/subject/list")
    public DataResponse<List<ShopResp>> shopSubjectList(@Valid @RequestBody final YocShopSubjectReq req) {
        return list(() -> yocIntegrationService.shopSubjectList(req));
    }

    /**
     * 店铺列表查询
     *
     */
    @PostMapping("/shop/list")
    public DataResponse<List<ShopResp>> shopList(@Valid @RequestBody final YocShopListReq req) {
        return list(() -> yocIntegrationService.shopList(req));
    }

    /**
     * 根据店铺名称查询店铺列表
     */
    @PostMapping("/shop/list-by-name")
    public DataResponse<List<ShopResp>> shopList(@Valid @RequestBody List<String> shopNameList) {
        return list(() -> yocIntegrationService.shopList(shopNameList));
    }

    /**
     * 店铺分页查询
     *
     * @param req 查询请求参数
     * @return 店铺列表分页数据
     */
    @PostMapping("/shop/page")
    public DataResponse<PageVo<ShopResp>> shopPage(@Valid @RequestBody final ShopPageReq req) {
        return page(() -> shopService.page(req));
    }

    /**
     * 批量新增店铺
     *
     * @param reqList 店铺创建请求列表
     * @return 操作结果
     */
    @PostMapping("/shop/create")
    @YocOperationLogMark(
            operationType = YocOperationTypeEnum.SHOP_CREATE,
            businessIdParam = ""
    )
    public DataResponse<Boolean> createShop(@Valid @RequestBody final List<ShopAddReq> reqList) {
        return one(() -> shopService.batchCreate(reqList));
    }

    /**
     * 编辑店铺
     *
     * @param req 店铺编辑请求参数
     * @return 操作结果
     */
    @PostMapping("/shop/edit")
    @YocOperationLogMark(
            operationType = YocOperationTypeEnum.SHOP_EDIT,
            businessIdParam = "req.shopId"
    )
    public DataResponse<Boolean> editShop(@Valid @RequestBody final ShopEditReq req) {
        return one(() -> shopService.edit(req));
    }

    /**
     * 批量启用店铺
     *
     * @param reqList 批量启用请求参数
     * @return 操作结果
     */
    @PostMapping("/shop/batch-enable")
    @YocOperationLogMark(
            operationType = YocOperationTypeEnum.SHOP_ENABLE,
            businessIdParam = ""
    )
    public DataResponse<Boolean> batchEnableShop(@Valid @RequestBody final List<ShopEnableReq> reqList) {
        return one(() -> shopService.batchEnable(reqList));
    }

    /**
     * 批量删除
     *
     * @param shopIds 店铺 ID集合
     * @return 结果
     */
    @PostMapping("/shop/batch-remove")
    @YocOperationLogMark(
            operationType = YocOperationTypeEnum.SHOP_ENABLE,
            businessIdParam = ""
    )
    public DataResponse<Boolean> batchRemove(final @Valid @RequestBody List<Long> shopIds) {
        return one(() -> shopService.batchRemove(shopIds));
    }

    // ==================== 用户接口 ====================

    /**
     * uacs用户-根据名称查询
     */
    @PostMapping("/uacs/user-query/findByNames")
    public DataResponse<List<YocUserQueryResp>> userFindByNames(final @RequestBody List<String> names) {
        return list(() -> UserContexts.withSystemUser(() -> yocIntegrationService.userFindByNames(names)));
    }

    /**
     * uacs用户-分页查询
     */
    @PostMapping("/uacs/user-query/findUserPage")
    public DataResponse<PageVo<YocUserQueryResp>> findUserPage(final @Valid @RequestBody YocUserQueryPageReq req) {
        return page(() -> UserContexts.withSystemUser(() ->  yocIntegrationService.findUserPage(req)));
    }


    // ==================== 品类管理接口 ====================

    /**
     * 品类映射分页查询
     *
     * @param req 查询请求参数
     * @return 分页结果
     */
    @PostMapping("/category-mapping/page")
    public DataResponse<PageVo<PlatformCategoryMappingResp>> categoryMappingPage(final @Valid @RequestBody PlatformCategoryMappingPageReq req) {
        return page(() -> platformCategoryMappingService.page(req));
    }


    // ==================== temu接口 ====================

    /**
     * Temu品类列表查询
     *
     * @return Temu品类列表
     */
    @GetMapping("/temu/category/list")
    public DataResponse<List<TemuCategoryResp>> listTemuCategory() {
        return list(temuService::listCategory);
    }

    /**
     * Temu-商品规格列表查询
     *
     * @return 商品规格列表
     */
    @GetMapping("/temu/product-spec/list")
    public DataResponse<List<TemuProductSpecResp>> listTemuProductSpec() {
        return list(temuService::listProductSpec);
    }

    /**
     * Temu-颜色列表查询
     *
     * @param templateId 模板 ID
     * @return 颜色列表
     */
    @GetMapping("/temu/color/{templateId}")
    public DataResponse<List<TemuColorResp>> listTemuColor(@PathVariable final Long templateId) {
        return list(() -> temuService.listColor(templateId));
    }

    /**
     * Temu-尺码列表查询
     *
     * @param templateId 模板 ID
     * @return 尺码列表
     */
    @GetMapping("/temu/size/{templateId}")
    public DataResponse<List<TemuSizeResp>> listTemuSize(@PathVariable final Long templateId) {
        return list(() -> temuService.listSize(templateId));
    }

    /**
     * Temu-部位列表查询
     *
     * @param templateId 模板 ID
     * @return 部位列表
     */
    @GetMapping("/temu/part/{templateId}")
    public DataResponse<List<TemuPartResp>> listTemuPart(@PathVariable final Long templateId) {
        return list(() -> temuService.listPart(templateId));
    }

    /**
     * Temu-模板列表查询
     *
     * @param templateId 模板 ID
     * @return 部位列表
     */
    @GetMapping("/temu/property/{templateId}")
    public DataResponse<List<TemuGoodsPropertyResp>> listTemuProperty(@PathVariable final Long templateId) {
        return list(() -> temuService.listProperty(templateId));
    }

    /**
     * Temu-运费模板列表查询
     *
     * @param req 参数
     * @return 运费模板列表
     */
    @PostMapping("/temu/logistics-template")
    public DataResponse<List<TemuFreightTemplateDTO>> listTemuLogisticsTemplate(@RequestBody @Valid final LogisticsTemplateReq req) {
        return list(() -> temuService.listLogisticsTemplate(req));
    }

    /**
     * Temu-仓库列表查询
     *
     * @param req 参数
     * @return 仓库列表
     */
    @PostMapping("/temu/warehouse")
    public DataResponse<List<TemuWarehouseDTO>> listTemuWarehouse(@RequestBody @Valid final WarehouseReq req) {
        return list(() -> temuService.listWarehouse(req));
    }


    // ==================== 尺码模板 ====================

    /**
     * 尺码模板-分页
     *
     * @param req 参数
     * @return 列表
     */
    @PostMapping("/size-temp/page")
    public DataResponse<PageVo<SizeTemplateResp>> sizeTemPage(final @Valid @RequestBody SizeTemplatePageReq req) {
        return page(() -> sizeTemplateService.page(req));
    }


    // ==================== 操作日志接口 ====================

    /**
     * 分页查询操作日志
     *
     * @param req 查询请求参数，包含筛选条件和分页信息
     * @return 操作日志列表分页数据
     */
    @PostMapping("/operation-log/page")
    public DataResponse<PageVo<YocOperationLogResp>> operationLogPage(@Valid @RequestBody final YocOperationLogPageReq req) {
        return page(() -> yocOperationLogService.page(req));
    }
}
