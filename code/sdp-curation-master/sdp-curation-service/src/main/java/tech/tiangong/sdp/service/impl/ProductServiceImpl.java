package tech.tiangong.sdp.service.impl;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.util.StrUtil;
import com.alibaba.fastjson2.JSONObject;
import com.baomidou.mybatisplus.core.metadata.IPage;
import jakarta.validation.ValidationException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.core.protocol.PageVo;
import team.aikero.blade.sequence.id.IdHelper;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.datagroup.cyxf.entity.TemuOrderSkc;
import tech.tiangong.datagroup.cyxf.repository.TemuOrderRepository;
import tech.tiangong.sdp.config.CommonProperties;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.convert.ProductConvert;
import tech.tiangong.sdp.entity.*;
import tech.tiangong.sdp.enums.*;
import tech.tiangong.sdp.external.SdpMaterialDesignerApi;
import tech.tiangong.sdp.repository.*;
import tech.tiangong.sdp.service.*;
import tech.tiangong.sdp.temu.http.TemuShopContext;
import tech.tiangong.sdp.temu.serivce.TemuProductService;
import tech.tiangong.sdp.temu.vo.req.TemuProductListGetPageReq;
import tech.tiangong.sdp.temu.vo.req.TemuSearchProductReq;
import tech.tiangong.sdp.temu.vo.resp.TemuProductPageDataResp;
import tech.tiangong.sdp.temu.vo.resp.TemuProductPageResultResp;
import tech.tiangong.sdp.temu.vo.resp.TemuProductPageSkuSummaryResp;
import tech.tiangong.sdp.temu.vo.resp.TemuSearchSkcResp;
import tech.tiangong.sdp.utils.SsoContext;
import tech.tiangong.sdp.vo.dto.DesignerDTO;
import tech.tiangong.sdp.vo.dto.ProductStateGroupDTO;
import tech.tiangong.sdp.vo.query.ProductQuery;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.CheckBeforeBatchPublishResp;
import tech.tiangong.sdp.vo.resp.ProductPageResp;
import tech.tiangong.sdp.vo.resp.ProductResp;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * 商品
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/18 16:23
 */
@Slf4j
@Service
@AllArgsConstructor
public class ProductServiceImpl extends DefaultTaskServiceImpl implements ProductService {
    private final @Lazy StyleOnShelvesService styleOnShelvesService;
    private final ShopService shopService;
    private final PrototypeService prototypeService;
    private final TemuProductService temuProductService;
    private final StyleOnShelvesRepository styleOnShelvesRepository;
    private final StyleReviewLogRepository styleReviewLogRepository;
    private final ProductRepository productRepository;
    private final ProductAttrRepository productAttrRepository;
    private final ProductSkcRepository productSkcRepository;
    private final ProductSkuMainSpecRepository productSkuMainSpecRepository;
    private final ProductSkuRepository productSkuRepository;
    private final ProductSkuSiteSupplierPriceRepository productSkuSiteSupplierPriceRepository;
    private final ProductSizePartRepository productSizePartRepository;
    private final ProductSizeRepository productSizeRepository;
    private final ProductSkuSpecRepository productSkuSpecRepository;
    private final ProductSkuWarehouseRepository productSkuWarehouseRepository;
    private final ProductSpecAttrRepository productSpecAttrRepository;
    private final ProductWarehouseRouteRepository productWarehouseRouteRepository;
    private final ProductWhExtAttrRepository productWhExtAttrRepository;
    private final TemuProductFileRepository temuProductFileRepository;
    private final TemuTaskRepository temuTaskRepository;
    private final ShopRepository shopRepository;
    private final TemuOrderRepository temuOrderRepository;
    private final SkcOnShelvesRepository skcOnShelvesRepository;
    private final CommonProperties commonProperties;
    private final SpotStyleTaskService spotStyleTaskService;
    private final PrototypeRepository prototypeRepository;
    private final DesignStyleRepository designStyleRepository;
    private final SpotStyleTaskRepository spotStyleTaskRepository;
    private final SpotStyleSkcRepository spotStyleSkcRepository;
    private final StyleSkcSkuRepository styleSkcSkuRepository;
    private final TemuSyncService temuSyncService;
    private final static String LOCK_KEY = "sdp-curation:temu:product:";

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean create(ProductAddReq req) {
        final var style = styleOnShelvesRepository.getById(req.getStyleId());
        if (Objects.isNull(style)) {
            throw new BusinessException("款【" + req.getStyleCode() + "】不存在");
        }
        if (Objects.isNull(req.getPass())) {
            this.styleReviewLogRepository.save(ProductConvert.reviewLog(req));
            return true;
        }
        List<Product> productList = productRepository.listByStyleId(req.getStyleId());
        if (CollectionUtil.isNotEmpty(productList)) {
            boolean isAllProductPublished = productList.stream().allMatch(p -> !isNotPublished(p));
            if (isAllProductPublished) {
                throw new BusinessException("款【" + req.getStyleCode() + "】已经审核通过并且发布");
            }
        }
        // 审核
        styleOnShelvesService.review(ProductConvert.toReviewReq(req));
        //找出还没发布的商品
        Product product = null;
        if (CollectionUtil.isNotEmpty(productList)) {
            product = productList.stream().filter(this::isNotPublished).findFirst().orElse(null);
        }

        if (Objects.nonNull(product)) {
            this.productRepository.logicDelete(product.getProductId());
        }
        this.styleReviewLogRepository.save(ProductConvert.reviewLog(req));
        if (Objects.nonNull(req.getPass()) && !req.getPass()) {
            return false;
        }
        final var e = ProductConvert.convert(req, style);
        productRepository.save(e);
        final var sizeParts = e.getSizeParts();
        if (CollectionUtil.isNotEmpty(sizeParts)) {
            productSizePartRepository.saveBatch(sizeParts, sizeParts.size());
        }
        final var productSizes = e.getProductSizes();
        if (CollectionUtil.isNotEmpty(productSizes)) {
            productSizeRepository.saveBatch(productSizes, productSizes.size());
        }
        final var attrs = e.getAttrs();
        if (CollectionUtil.isNotEmpty(attrs)) {
            productAttrRepository.saveBatch(attrs, attrs.size());
        }
        final var specAttrs = e.getSpecAttrs();
        if (CollectionUtil.isNotEmpty(specAttrs)) {
            productSpecAttrRepository.saveBatch(specAttrs, specAttrs.size());
        }
        final var mainSpecs = e.getMainSpecs();
        if (CollectionUtil.isNotEmpty(mainSpecs)) {
            productSkuMainSpecRepository.saveBatch(mainSpecs, mainSpecs.size());
        }
        final var prices = e.getPrices();
        if (CollectionUtil.isNotEmpty(prices)) {
            productSkuSiteSupplierPriceRepository.saveBatch(prices, prices.size());
        }
        final var skuSpecs = e.getSkuSpecs();
        if (CollectionUtil.isNotEmpty(skuSpecs)) {
            productSkuSpecRepository.saveBatch(skuSpecs, skuSpecs.size());
        }
        final var skus = e.getSkus();
        if (CollectionUtil.isNotEmpty(skus)) {
            productSkuRepository.saveBatch(skus, skus.size());
        }
        final var skcs = e.getSkcs();
        if (CollectionUtil.isNotEmpty(skcs)) {
            productSkcRepository.saveBatch(skcs, skcs.size());
        }
        final var extAttrs = e.getExtAttrs();
        if (CollectionUtil.isNotEmpty(extAttrs)) {
            productWhExtAttrRepository.saveBatch(extAttrs, extAttrs.size());
        }
        final var warehouses = e.getWarehouses();
        if (CollectionUtil.isNotEmpty(warehouses)) {
            productSkuWarehouseRepository.saveBatch(warehouses, warehouses.size());
        }
        final var warehouseRoutes = e.getWarehouseRoutes();
        if (CollectionUtil.isNotEmpty(warehouseRoutes)) {
            productWarehouseRouteRepository.saveBatch(warehouseRoutes, warehouseRoutes.size());
        }
        return true;
    }

    @Override
    public ProductAddReq getReview(Long styleId) {
        return Optional.ofNullable(styleReviewLogRepository.getByStyleId(styleId))
                .map(it -> JsonsKt.parseJson(it.getContent(), ProductAddReq.class))
                .orElse(null);
    }

    @Override
    public List<ProductAddReq> getReviewListByStyleIds(List<Long> styleIds) {
        List<StyleReviewLog> logs = styleReviewLogRepository.getByStyleIds(styleIds);
        if (CollectionUtil.isEmpty(logs)) {
            return Collections.emptyList();
        }
        return logs.stream()
                .map(StyleReviewLog::getContent)
                .filter(Objects::nonNull)
                .map(content -> JsonsKt.parseJson(content, ProductAddReq.class))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }


    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchPublish(List<Long> styleIds) {
        final var list = this.productRepository.listByStyleIds(styleIds);
        if (CollectionUtil.isEmpty(list)) {
            return false;
        }
        list.forEach(this::publish);
        return true;
    }

    @Override
    public PageVo<ProductPageResp> page(ProductPageReq req) {
        final var query = ProductConvert.buildWebPage(req);
        if (!setQuery(req, query)) {
            return new PageVo<>();
        }
        final var page = this.productRepository.webPage(query);
        final var records = page.getRecords();
        if (CollectionUtil.isEmpty(records)) {
            return new PageVo<>();
        }
        final var productIds = records.stream().map(Product::getProductId).distinct().toList();
        final var shopMap = BasicConvert.toMap(this.shopRepository.listByIds(records.stream()
                .map(Product::getShopId).distinct().toList()), Shop::getShopId);
        final var mapDesigner = BasicConvert.toMap(SdpMaterialDesignerApi.selectByDesignerIds(records.stream()
                        .map(it -> Objects.toString(it.getDesignerId())).toList()),
                DesignerDTO::getDesignerId
        );
        final var styleIds = records.stream().map(Product::getStyleId).filter(it -> Objects.requireNonNullElse(it, 0L) > 1L).distinct().toList();
        final Map<Long, DesignStyle> styleMap = CollectionUtil.isNotEmpty(styleIds) ?
                BasicConvert.toMap(this.designStyleRepository.listByIds(styleIds), DesignStyle::getDesignStyleId) : Map.of();
        final var skcs = this.productSkcRepository.listByProductIds(productIds);
        final var skcMap = BasicConvert.groupingBy(skcs, ProductSkc::getProductId);
        final var skcGroup = BasicConvert.toMap(skcOnShelvesRepository.listByIds(skcs.stream().map(ProductSkc::getSkcId).toList()), SkcOnShelves::getSkcId);
        final var skuMap = BasicConvert.groupingBy(this.productSkuRepository.listByProductIds(productIds), ProductSku::getProductId);
        return BasicConvert.page(page, it -> ProductConvert.convert(it, skcMap, skuMap, shopMap, mapDesigner, skcGroup, styleMap));
    }

    @Override
    public List<ProductStateGroupDTO> stateTotal(ProductPageReq req) {
        final var query = ProductConvert.buildWebPage(req);
        if (!setQuery(req, query)) {
            return List.of();
        }
        query.setSkcStatus(null);
        final var list = this.productRepository.stateTotal(query);
        query.setLabels(List.of(ProductTagEnum.TO_BE_UPDATED.getCode()));
        final var total = this.productRepository.toBeUpdatedTotal(query);
        final var resp = new ArrayList<ProductStateGroupDTO>();
        if (CollectionUtil.isNotEmpty(list)) {
            list.stream()
                    .filter(it -> TemuSkcStatusEnum.codes().contains(Objects.toString(it.getTaskStatus())))
                    .forEach(resp::add);
        }
        if (Objects.nonNull(total)) {
            final var dto = new ProductStateGroupDTO();
            dto.setTotal(total);
            dto.setTaskStatus(100);
            dto.setTotal(total);
            resp.add(dto);
        }
        return resp;
    }

    @Override
    public ProductResp detail(Long productId) {
        final var product = this.productRepository.obtainById(productId, "商品不存在");
        final var productIds = List.of(productId);
        product.setProductSizes(this.productSizeRepository.listByProductIds(productIds));
        product.setSizeParts(this.productSizePartRepository.listByProductIds(productIds));
        product.setSkcs(this.productSkcRepository.listByProductIds(productIds));
        product.setSkus(this.productSkuRepository.listByProductIds(productIds));
        product.setSkuSpecs(this.productSkuSpecRepository.listByProductIds(productIds));
        product.setMainSpecs(this.productSkuMainSpecRepository.listByProductIds(productIds));
        product.setAttrs(this.productAttrRepository.listByProductIds(productIds));
        product.setSpecAttrs(this.productSpecAttrRepository.listByProductIds(productIds));
        product.setExtAttrs(this.productWhExtAttrRepository.listByProductIds(productIds));
        product.setPrices(this.productSkuSiteSupplierPriceRepository.listByProductIds(productIds));
        product.setWarehouses(this.productSkuWarehouseRepository.listByProductIds(productIds));
        product.setWarehouseRoutes(this.productWarehouseRouteRepository.listByProductIds(productIds));
        final var designer = SdpMaterialDesignerApi.selectByDesignerIds(List.of(Objects.toString(product.getDesignerId())));
        final var skcGroup = BasicConvert.toMap(skcOnShelvesRepository.listByIds(product.getSkcs().stream().map(ProductSkc::getSkcId).toList()), SkcOnShelves::getSkcId);
        final var resp = ProductConvert.convert(product, this.shopRepository.getById(product.getShopId()), designer, skcGroup);
        if (Objects.requireNonNullElse(product.getStyleId(), 0L) > 1L){
            Optional.ofNullable(this.designStyleRepository.getById(product.getStyleId())).ifPresent(it -> resp.setProjectTypeName(it.getProjectTypeName()));
        }
        return resp ;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchTestPrice(List<ProductTestPriceReq> reqs) {
        final var list = this.productRepository.listByIds(reqs.stream()
                .map(ProductTestPriceReq::getProductId).toList());
        if (CollectionUtil.isEmpty(list)) {
            return false;
        }
        final var map = BasicConvert.toMap(reqs, ProductTestPriceReq::getProductId);
        list.stream().filter(it -> map.containsKey(it.getProductId()))
                .filter(it -> !it.hadTestPrice())
                .forEach(it -> testPrice(it, map.get(it.getProductId())));
        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean fileEdit(ProductFileEditReq req) {
        final var product = this.productRepository.obtainById(req.getProductId(), "商品不存在");
        check(product);
        product.setProductStatus(ProductStatusEnum.EDIT_FILE.getCode());
        product.setTaskOptType(TemuTaskOptTypeEnum.EDIT_FILE);
        // 没改传null,删了传"",改了传url
        final var productIds = List.of(product.getProductId());
        product.setTaskParentId(IdHelper.getId());
        final var files = new ArrayList<TemuProductFile>();
        final var tasks = new ArrayList<TemuTask>();
        product.setFiles(files);
        product.setTasks(tasks);
        final var list = this.temuProductFileRepository.listByProductIds(productIds);
        final var upd = fileProduct(req, product, list);
        BasicConvert.setRevised(product);
        if (upd > -1) {
            this.productRepository.updateFile(product);
        }
        skcFile(req, list, product);
        if (CollectionUtil.isNotEmpty(files)) {
            this.temuProductFileRepository.saveBatch(files, files.size());
        }
        final var task = ProductConvert.temuTask(TemuTaskTypeEnum.EDIT_PICTURES, product);
        tasks.add(task);
        temuTaskRepository.saveBatch(tasks, tasks.size());
        // 发送消息
        tasks.forEach(it ->
                this.send(it, RabbitConfigEnum.PUSH_TEMU));
        product.removeProductTag(ProductTagEnum.TO_BE_UPDATED.getCode());
        this.productRepository.updateById(product);
        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean skcUpsert(ProductAddReq req) {
        final var e = this.productRepository.obtainById(req.getProductId(), "商品不存在");
        check(e);
        ProductConvert.convert(req, e);
        e.removeProductTag(ProductTagEnum.TO_BE_UPDATED.getCode());
        e.setProductStatus(ProductStatusEnum.EDIT_SKC.getCode());
        productRepository.updateById(e);
        // 先注释,复色多尺码前端处理不了
        final var sizeParts = e.getSizeParts();
        if (CollectionUtil.isNotEmpty(sizeParts)) {
            final var parts = this.productSizePartRepository.listByProductIds(List.of(req.getProductId()));
            if (CollectionUtil.isNotEmpty(parts)) {
                parts.forEach(it -> this.productSizePartRepository.logicDelete(it.getSizePartId()));
            }
            productSizePartRepository.saveBatch(sizeParts, sizeParts.size());
        }
        final var productSizes = e.getProductSizes();
        if (CollectionUtil.isNotEmpty(productSizes)) {
            final var sizes = this.productSizeRepository.listByProductIds(List.of(req.getProductId()));
            if (CollectionUtil.isNotEmpty(sizes)) {
                sizes.forEach(it -> this.productSizeRepository.logicDelete(it.getProductSizeId()));
            }
            e.setSizeTemplateId(null);
            e.setShowSizeTemplateId(null);
            this.productRepository.removeTemp(e);
            productSizeRepository.saveBatch(productSizes, productSizes.size());
        }
        final var specAttrs = e.getSpecAttrs();
        if (CollectionUtil.isNotEmpty(specAttrs)) {
            productSpecAttrRepository.saveBatch(specAttrs, specAttrs.size());
        }
        final var mainSpecs = e.getMainSpecs();
        if (CollectionUtil.isNotEmpty(mainSpecs)) {
            productSkuMainSpecRepository.saveBatch(mainSpecs, mainSpecs.size());
        }
        final var prices = e.getPrices();
        if (CollectionUtil.isNotEmpty(prices)) {
            productSkuSiteSupplierPriceRepository.saveBatch(prices, prices.size());
        }
        final var skuSpecs = e.getSkuSpecs();
        if (CollectionUtil.isNotEmpty(skuSpecs)) {
            productSkuSpecRepository.saveBatch(skuSpecs, skuSpecs.size());
        }
        final var skus = e.getSkus();
        if (CollectionUtil.isNotEmpty(skus)) {
            final var skuList = productSkuRepository.listByIds(skus.stream().map(ProductSku::getProductSkuId).toList());
            if (CollectionUtil.isEmpty(skuList)) {
                productSkuRepository.saveBatch(skus, skus.size());
            } else {
                final var ups = new ArrayList<ProductSku>();
                final var inserts = new ArrayList<ProductSku>();
                final var skuMap = BasicConvert.toMap(skuList, ProductSku::getProductSkuId);
                skus.forEach(it -> {
                    final var sku = skuMap.get(it.getProductSkuId());
                    if (Objects.isNull(sku)) {
                        inserts.add(it);
                    } else {
                        ups.add(sku);
                    }
                });
                if (CollectionUtil.isNotEmpty(ups)) {
                    productSkuRepository.updateBatchById(ups, ups.size());
                }
                if (CollectionUtil.isNotEmpty(inserts)) {
                    productSkuRepository.saveBatch(inserts, inserts.size());
                }
            }
        }
        final var skcs = e.getSkcs();
        if (CollectionUtil.isNotEmpty(skcs)) {
            productSkcRepository.editBatchById(skcs);
        }
        final var warehouses = e.getWarehouses();
        if (CollectionUtil.isNotEmpty(warehouses)) {
            //删除原来的记录，重新保存库存信息
            List<ProductSkuWarehouse> oldWarehouses = productSkuWarehouseRepository.listByProductIds(List.of(req.getProductId()));
            if (CollectionUtil.isNotEmpty(oldWarehouses)) {
                oldWarehouses.forEach(v -> productSkuWarehouseRepository.logicDelete(v.getWarehouseRouteId()));
            }
            productSkuWarehouseRepository.saveBatch(warehouses, warehouses.size());
        }
        final var files = e.getFiles();
        if (CollectionUtil.isNotEmpty(files)) {
            temuProductFileRepository.saveBatch(files, files.size());
        }
        final var tasks = e.getTasks();
        if (CollectionUtil.isNotEmpty(tasks)) {
            temuTaskRepository.saveBatch(tasks, tasks.size());
            // 发送消息
            tasks.forEach(it ->
                    this.send(it, RabbitConfigEnum.PUSH_TEMU));
        }
        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void addUpdateTag(List<Long> styleIds) {
        if (CollectionUtil.isEmpty(styleIds)) {
            return;
        }
        final var list = this.productRepository.listByStyleIds(styleIds);
        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        list.forEach(it -> addUpdateTag(it, ProductTagEnum.TO_BE_UPDATED));
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void patternMaking(List<Long> styleIds) {
        if (CollectionUtil.isEmpty(styleIds)) {
            return;
        }
        final var list = this.productRepository.listByStyleIds(styleIds);
        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        list.forEach(it -> addUpdateTag(it, ProductTagEnum.PATTERN_MAKING));
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void addNewSkc(ProductAddReq req) {
        log.info("新增SKC\t{}", JsonsKt.toJson(req));
        final var skcReqs = req.getSkcReqs();
        if (CollectionUtil.isEmpty(skcReqs)) {
            return;
        }
        List<Product> productList = new ArrayList<>();
        if (req.getProductId() != null) {
            Product product = productRepository.getById(req.getProductId());
            if (product == null) {
                log.info("商品新增SKC失败，没有找到对应的商品,productId:{}", req.getProductId());
                return;
            }
            productList.add(product);
        } else {
            List<Product> tempProductList = productRepository.listByStyleId(req.getStyleId());
            if (CollectionUtil.isEmpty(tempProductList)) {
                log.info("商品新增SKC失败，没有找到对应的商品,styleId:{}", req.getStyleId());
                return;
            }
            productList.addAll(tempProductList);
        }
        for (Product product : productList) {
            final var skcIds = skcReqs.stream().map(ProductSkcAddReq::getSkcId).toList();
            if (CollectionUtil.isEmpty(skcIds)) {
                log.info("商品新增SKC失败，SKC ID为空,productId:{}", req.getProductId());
                return;
            }
            final var list = this.productSkcRepository.listBySkcIds(skcIds);
            if (CollectionUtil.isNotEmpty(list)) {
                log.info("商品新增SKC失败，SKC ID已存在:productId:{}", req.getProductId());
                return;
            }
            if (!product.published()) {
                log.info("商品新增SKC失败，商品未发布:productId:{}", req.getProductId());
                return;
            }
            product.addProductTag(ProductTagEnum.TO_BE_UPDATED.getCode());
            BasicConvert.setRevised(product);
            //添加新的SKC到商品
            ProductConvert.addNewSkcToProduct(req, product);
            productRepository.updateById(product);
            final var skcs = product.getSkcs();
            if (CollectionUtil.isNotEmpty(skcs)) {
                productSkcRepository.saveBatch(skcs, skcs.size());
            }
            final var skus = product.getSkus();
            if (CollectionUtil.isNotEmpty(skus)) {
                productSkuRepository.saveBatch(skus, skus.size());
            }
        }
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void salesDriving(TemuOrderSync sync) {
        log.info("更新动销款\t{}", sync.getProductId());
        final var product = this.productRepository.getByPlatformProductId(sync.getProductId());
        if (Objects.isNull(product)) {
            return;
        }
        product.addProductTag(ProductTagEnum.SALES_DRIVING_PRODUCT.getCode());
        BasicConvert.setRevised(product);
        productRepository.updateById(product);
        sync.setProduct(product);
        //款式动销
        try {
            this.styleOnShelvesService.temuOrderSync(sync);
        } catch (Exception e) {
            log.error("款式动销更新失败\t{}", e.getMessage(), e);
        }
    }

    @Override
    public void syncTemuDataGroup() {
        int page = 0;
        while (true) {
            final var list = this.productRepository.selectWithoutSalesDriving(page * 512);
            if (CollectionUtil.isEmpty(list)) {
                log.info("没有需要更新动销的数据");
                break;
            }
            page++;
            list.forEach(it -> {
                try {
                    this.syncTemuData(it);
                } catch (Exception e) {
                    log.error("更新动销失败\t{}\t{}", it.getPlatformProductId(), e.getMessage(), e);
                }
            });
        }
    }
    @Deprecated(forRemoval = true)
    @Override
    public void salesDrivings() {
        int pageIndex = 0;
        while (true) {
            final var salesDrivings = this.productSkcRepository.listBySalesDriving(pageIndex * 128, 128);
            if (CollectionUtil.isEmpty(salesDrivings)) {
                log.info("没有需要通知的动销");
                break;
            }
            pageIndex++;
            salesDrivings.forEach(this::salesDrivings);
        }
    }

    @Override
    public void job() {
        final var shops = this.shopRepository.list();
        if (CollectionUtil.isEmpty(shops)) {
            return;
        }
        shops.stream().filter(it -> Objects.equals(Bool.YES.getCode(), it.getEnable()))
                .forEach(this::job);
    }

    @Override
    public CheckBeforeBatchPublishResp checkBeforeBatchPublish(List<Long> styleIds) {
        List<StyleOnShelves> styleOnShelvesList = styleOnShelvesRepository.listByIds(styleIds);
        if (CollectionUtil.isEmpty(styleOnShelvesList)) {
            throw new BusinessException("所选款对应款式记录不存在");
        }
        Map<Long, StyleOnShelves> styleOnShelvesMap = styleOnShelvesList.stream().collect(Collectors.toMap(StyleOnShelves::getStyleId, it -> it, (e1, e2) -> e2));
        styleIds.forEach(styleId -> {
            if (!styleOnShelvesMap.containsKey(styleId)) {
                throw new BusinessException("所选款对应款式记录不存在,styleId:" + styleId);
            }
        });

        var productList = this.productRepository.listByStyleIds(styleIds);
        if (CollectionUtil.isEmpty(productList)) {
            throw new BusinessException("所选款对应商品记录不存在");
        }

        //找出已经关联平台SKC ID
        List<ProductSkc> allProductSkcList = this.productSkcRepository.listByProductIds(productList.stream().map(Product::getProductId).toList());
        Set<Long> existPlatformSkcIds = allProductSkcList.stream().map(ProductSkc::getPlatformSkcId).filter(Objects::nonNull).collect(Collectors.toSet());

        CheckBeforeBatchPublishResp resp = new CheckBeforeBatchPublishResp();
        List<CheckBeforeBatchPublishResp.CheckSkc> allCheckSkcList = new ArrayList<>();

        Map<Long, List<Product>> styleIdToProductListMap = productList.stream().collect(Collectors.groupingBy(Product::getStyleId));
        styleIdToProductListMap.forEach((styleId, pList) -> {
            final var style = styleOnShelvesMap.get(styleId);
            if (null == style) {
                throw new BusinessException("待上架商品信息不存在,styleId:" + styleId);
            }
            if (!style.reviewPass() || !style.shopReviewPass()) {
                throw new BusinessException("仅有审核状态=【已通过】且【店主已审核】状态才能发布商品,styleId:" + styleId);
            }
            for (Product product : pList) {
                if (product.published()) {
                    log.info("商品已经发布\t{}", product.getStyleCode());
                    continue;
                }

                List<ProductSkc> productSkcList = this.productSkcRepository.listByProductIds(List.of(product.getProductId()));

                Map<Long, List<ProductSku>> productSkuMap = new HashMap<>();
                List<ProductSku> productSkuList = productSkuRepository.listByProductIds(List.of(product.getProductId()));
                if (CollectionUtil.isNotEmpty(productSkuList)) {
                    productSkuMap.putAll(productSkuList.stream().collect(Collectors.groupingBy(ProductSku::getProductSkcId)));
                }

                List<CheckBeforeBatchPublishResp.CheckSkc> checkSkcList = productSkcList.stream().map(it -> {
                    CheckBeforeBatchPublishResp.CheckSkc checkSkc = new CheckBeforeBatchPublishResp.CheckSkc();
                    checkSkc.setStyleId(product.getStyleId());
                    checkSkc.setStyleCode(product.getStyleCode());
                    checkSkc.setProductId(it.getProductId());
                    checkSkc.setProductSkcId(it.getProductSkcId());
                    checkSkc.setSkcCode(it.getSkcCode());
                    checkSkc.setLatestPushTime(style.getLatestPushTime());

                    List<ProductSku> tempProductSkuList = productSkuMap.get(it.getProductSkcId());
                    List<CheckBeforeBatchPublishResp.CheckSku> checkSkuList = tempProductSkuList.stream().map(productSku -> {
                        CheckBeforeBatchPublishResp.CheckSku checkSku = new CheckBeforeBatchPublishResp.CheckSku();
                        checkSku.setProductSkuId(productSku.getProductSkuId());
                        checkSku.setSkuCode(productSku.getSkuCode());
                        return checkSku;
                    }).toList();
                    checkSkc.setProductSkuList(checkSkuList);
                    //根据skcCode查询已推送到平台的商品信息对应平台的skc维度的extCode
                    TemuProductListGetPageReq req = new TemuProductListGetPageReq();
                    req.setPage(1);
                    req.setPageSize(100);
                    req.setSkcExtCode(it.getSkcCode());
                    TemuProductPageResultResp temuProductPageResultResp = pageListGetProduct(req, product.getShopId());
                    if (CollectionUtil.isNotEmpty(temuProductPageResultResp.getData())) {
                        List<CheckBeforeBatchPublishResp.PlatformSkc> platformSkcList = temuProductPageResultResp.getData().stream().map(temuProductPageDataResp -> {
                            CheckBeforeBatchPublishResp.PlatformSkc platformSkc = new CheckBeforeBatchPublishResp.PlatformSkc();
                            platformSkc.setPlatformProductId(temuProductPageDataResp.getProductId());
                            platformSkc.setPlatformSkcId(temuProductPageDataResp.getProductSkcId());
                            platformSkc.setExtCode(temuProductPageDataResp.getExtCode());
                            platformSkc.setIsAssociated(existPlatformSkcIds.contains(temuProductPageDataResp.getProductSkcId()) ? 1 : 0);
                            platformSkc.setCreatedAt(LocalDateTimeUtil.of(temuProductPageDataResp.getCreatedAt()));
                            platformSkc.setPlatformSkuList(temuProductPageDataResp.getProductSkuSummaries().stream().map(temuProductPageSkuSummaryResp -> {
                                CheckBeforeBatchPublishResp.PlatformSku platformSku = new CheckBeforeBatchPublishResp.PlatformSku();
                                platformSku.setPlatformSkuId(temuProductPageSkuSummaryResp.getProductSkuId());
                                platformSku.setExtCode(temuProductPageSkuSummaryResp.getExtCode());
                                return platformSku;
                            }).toList());
                            return platformSkc;
                        }).toList();
                        checkSkc.setPlatformSkcList(platformSkcList);
                    }
                    return checkSkc;
                }).toList();

                checkSkcList.forEach(checkSkc -> {
                    //没有成功推送平台，且距离上次推送少于5分钟，提示不能再推送
                    if (CollectionUtil.isEmpty(checkSkc.getPlatformSkcList())
                            && checkSkc.getLatestPushTime() != null
                            && LocalDateTimeUtil.between(checkSkc.getLatestPushTime(), LocalDateTime.now(), ChronoUnit.SECONDS) < commonProperties.getPublishIntervalTimeSeconds()) {
                        checkSkc.setMessage("距离上次商品发布间隔小于5分钟，请稍候后重试");
                    }
                });
                allCheckSkcList.addAll(checkSkcList);
            }
        });
        resp.setProductSkcList(allCheckSkcList);
        return resp;
    }

    private TemuProductPageResultResp pageListGetProduct(TemuProductListGetPageReq req, Long shopId) {
        try {
            TemuShopContext.set(shopService.getApp(shopId));
            return temuProductService.pageListGetProduct(req);
        } finally {
            TemuShopContext.clear();
        }
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void batchPublishOrAssociate(BatchPublishOrAssociateReq req) {
        //批量发布或关联,参考tech.tiangong.sdp.service.impl.ProductServiceImpl.batchPublish
        //和tech.tiangong.sdp.service.impl.TemuTaskServiceImpl.pushProduct
        if (CollectionUtil.isEmpty(req.getStyleIds())
                && CollectionUtil.isEmpty(req.getAssociateProductList())) {
            throw new BusinessException("请选择要发布的商品");
        }
        //直接发布
        if (CollectionUtil.isNotEmpty(req.getStyleIds())) {
            var list = this.productRepository.listByStyleIds(req.getStyleIds());
            if (CollectionUtil.isEmpty(list)) {
                throw new BusinessException("款ID对商品信息不存在");
            }
            List<StyleOnShelves> styleOnShelvesList = styleOnShelvesRepository.listByIds(req.getStyleIds());
            Map<Long, StyleOnShelves> styleOnShelvesMap = styleOnShelvesList.stream().collect(Collectors.toMap(StyleOnShelves::getStyleId, Function.identity(), (e1, e2) -> e1));
            list.forEach(product -> {
                StyleOnShelves styleOnShelves = styleOnShelvesMap.get(product.getStyleId());
                if (styleOnShelves != null
                        && styleOnShelves.getLatestPushTime() != null
                        && LocalDateTimeUtil.between(styleOnShelves.getLatestPushTime(), LocalDateTime.now(), ChronoUnit.SECONDS) < commonProperties.getPublishIntervalTimeSeconds()) {
                    throw new BusinessException("距离上次商品发布间隔小于5分钟，请稍候后重试");
                }
                publish(product);
            });
        }
        //关联平台商品
        if (CollectionUtil.isNotEmpty(req.getAssociateProductList())) {
            req.getAssociateProductList().forEach(this::associatePlatformProduct);
        }
    }

    private void associatePlatformProduct(BatchPublishOrAssociateReq.AssociateProductReq req) {
        Product product = productRepository.getById(req.getProductId());
        if (product == null) {
            throw new BusinessException("商品信息不存在" + req.getProductId());
        }
        Product existPlatformProduct = productRepository.getByPlatformProductId(req.getPlatformProductId());
        if (existPlatformProduct != null) {
            throw new BusinessException("平台商品ID已被关联，platformProductId:" + req.getPlatformProductId());
        }
        product.setProductStatus(ProductStatusEnum.PUBLISHED.getCode());
        product.setPlatformProductId(req.getPlatformProductId());
        product.setHidden(Bool.NO.getCode());
        ProductSkc productSkc = productSkcRepository.getById(req.getProductSkcId());
        productSkc.setPlatformSkcId(req.getPlatformSkcId());
        productSkc.setSyncStatus(TemuSkcSyncStatusEnum.UN_SYNC.getCode());

        List<ProductSku> productSkuList = productSkuRepository.listBySkcIds(List.of(req.getProductSkcId()));
        List<ProductSku> updateProductSkuList = new ArrayList<>();
        Map<String, Long> skuCodeToPlatformSkuIdMap = req.getPlatformSkuList().stream().collect(Collectors.toMap(BatchPublishOrAssociateReq.AssociateProductSkuReq::getExtCode, BatchPublishOrAssociateReq.AssociateProductSkuReq::getPlatformSkuId, (k1, k2) -> k2));
        for (ProductSku productSku : productSkuList) {
            if (StringUtils.isNotBlank(productSku.getSkuCode())) {
                Long platformSkuId = skuCodeToPlatformSkuIdMap.get(productSku.getSkuCode());
                if (productSku.getPlatformSkuId() != null && productSku.getPlatformSkuId() > 0) {
                    throw new BusinessException("SPU:" + product.getStyleCode() + ",SKC:" + productSkc.getSkcCode() + "下sku编码" + productSku.getSkuCode() + "已关联平台SKU");
//                    log.error("SPU:" + product.getStyleCode() + ",SKC:" + productSkc.getSkcCode() + "下sku编码" + productSku.getSkuCode() + "已关联平台SKU");
//                    continue;
                }
                if (platformSkuId != null && platformSkuId > 0) {
                    productSku.setPlatformSkuId(platformSkuId);
                    updateProductSkuList.add(productSku);
                }
            }
        }
        if (CollectionUtil.isEmpty(updateProductSkuList)) {
            throw new BusinessException("SPU:" + product.getStyleCode() + ",SKC:" + productSkc.getSkcCode() + "没有配置需要关联的SKU");
        }
        productRepository.updateById(product);
        productSkcRepository.updateById(productSkc);
        productSkuRepository.updateBatchById(updateProductSkuList);

        StyleOnShelvesReleaseReq styleOnShelvesReleaseReq = new StyleOnShelvesReleaseReq();
        styleOnShelvesReleaseReq.setReleaseSuccess(true);
        styleOnShelvesReleaseReq.setStyleId(product.getStyleId());
        try {
            this.styleOnShelvesService.releaseResult(styleOnShelvesReleaseReq);
        } catch (Exception e) {
            log.error("处理关联Temu商品结果异常\t{}", e.getLocalizedMessage(), e);
        }
    }

    @Override
    public void syncNewSkcTemuId(List<Long> productIds) {
        log.info("====同步Temu商品ID开始====");
        lock(LOCK_KEY + "syncNewSkcTemuId", 90L, () -> {
            boolean doIt = true;
            int pageNum = 1;
            int pageSize = 50;
            do {
                log.info("查询有新增SKC标签的商品入参，pageNum:{},pageSize:{},productIds:{}", pageNum, pageSize, JSONObject.toJSONString(productIds));
                ProductQuery query = new ProductQuery();
                query.setPageNum(pageNum);
                query.setPageSize(pageSize);
                query.setLabels(List.of(ProductTodoTagEnum.ADD_NEW_SKC.getCode()));
                query.setProductIds(productIds);
                IPage<Product> page = productRepository.webPage(query);
                if (page == null || page.getTotal() == 0) {
                    log.info("无新增SKC标签的商品--结束");
                    doIt = false;
                    break;
                } else {
                    log.info("查询有新增SKC标签的商品结果，pageNum:{},pageSize:{},productIds:{},total:{}", pageNum, pageSize, JSONObject.toJSONString(productIds), page.getTotal());
                    List<Product> list = page.getRecords();
                    //根据skcCode查询已推送到平台的商品信息对应平台的skc维度的extCode
                    for (Product product : list) {
                        List<ProductSkc> skcList = productSkcRepository.listByProductIds(List.of(product.getProductId()));
                        Set<Long> existPlatformSkcIds = skcList.stream().map(ProductSkc::getPlatformSkcId).filter(Objects::nonNull).collect(Collectors.toSet());
                        for (ProductSkc productSkc : skcList) {
                            TemuProductPageDataResp platformSkc = null;
                            //查询并平台商品信息
                            TemuProductListGetPageReq req = new TemuProductListGetPageReq();
                            req.setPage(1);
                            req.setPageSize(100);
                            req.setSkcExtCode(productSkc.getSkcCode());
                            TemuProductPageResultResp temuProductPageResultResp = pageListGetProduct(req, product.getShopId());
                            if (CollectionUtil.isNotEmpty(temuProductPageResultResp.getData())) {
                                //筛选出没有被关联的平台skc
                                List<TemuProductPageDataResp> platformSkcList = temuProductPageResultResp.getData().stream()
                                        .filter(it -> !existPlatformSkcIds.contains(it.getProductSkcId())).toList();
                                if (CollectionUtil.isNotEmpty(platformSkcList)) {
                                    platformSkc = platformSkcList.stream().findFirst().orElse(null);
                                }
                            }
                            //找到一个未关联的平台商品
                            if (platformSkc != null) {
                                existPlatformSkcIds.add(platformSkc.getProductSkcId());

                                List<BatchPublishOrAssociateReq.AssociateProductSkuReq> platformSkuReqList = new ArrayList<>();
                                for (TemuProductPageSkuSummaryResp platformSku : platformSkc.getProductSkuSummaries()) {
                                    BatchPublishOrAssociateReq.AssociateProductSkuReq platformSkuReq = new BatchPublishOrAssociateReq.AssociateProductSkuReq();
                                    platformSkuReq.setExtCode(platformSku.getExtCode());
                                    platformSkuReq.setPlatformSkuId(platformSku.getProductSkuId());
                                    platformSkuReqList.add(platformSkuReq);
                                }
                                //关联平台商品
                                try {
                                    BatchPublishOrAssociateReq.AssociateProductReq associateProductReq = new BatchPublishOrAssociateReq.AssociateProductReq();
                                    associateProductReq.setProductId(product.getProductId());
                                    associateProductReq.setProductSkcId(productSkc.getProductSkcId());
                                    associateProductReq.setPlatformProductId(platformSkc.getProductId());
                                    associateProductReq.setPlatformSkcId(platformSkc.getProductSkcId());
                                    associateProductReq.setPlatformSkuList(platformSkuReqList);
                                    associatePlatformProduct(associateProductReq);
                                } catch (Exception e) {
                                    log.error("自动关联Temu商品异常,productId:{}", product.getProductId(), e);
                                }
                            }
                        }
                    }
                    if (list.size() < pageSize) {
                        doIt = false;
                    }
                    pageNum++;
                }
            } while (doIt);
        });
        log.info("====同步Temu商品ID结束====");
    }


    @Override
    public void related() {
        int pageIndex = 0;
        while (true) {
            final var list = this.productSkcRepository.jobs(pageIndex * 100, 100);
            if (CollectionUtil.isEmpty(list)) {
                break;
            }
            pageIndex++;
            list.forEach(this::related);
        }
    }

    @Override
    public void binding(Set<String> spuCodes) {
        if (CollectionUtil.isEmpty(spuCodes)) {
            return;
        }
        final var data = this.productRepository.listByStyleCodes(spuCodes);
        if (CollectionUtil.isEmpty(data)) {
            log.warn("绑定商品为空");
        }
        data.forEach(this::binding);
    }

    @Override
    public void relatedBySkc(Set<String> skcCodes) {
        if (CollectionUtil.isEmpty(skcCodes)) {
            return;
        }
        final var list = this.productSkcRepository.listBySkcCodes(skcCodes);
        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        list.forEach(this::related);
    }

    private void syncTemuData(final Product product) {
        final var skcs = this.productSkcRepository.listByProductIds(List.of(product.getProductId()));
        if (skcs.stream().noneMatch(it -> Objects.equals(Integer.parseInt(TemuSkcStatusEnum.PUBLISHED_TO_SITE.getCode()), it.getSkcStatus()))) {
            log.info("同步Temu数据,SPU【{}】没有已发布到站点的SKC--结束", product.getPlatformProductId());
            return;
        }
        final var data = this.temuOrderRepository.listBySpuId(product.getPlatformProductId());
        if (CollectionUtil.isEmpty(data)) {
            log.info("同步Temu数据,SPU【{}】订单记录为空--结束", product.getPlatformProductId());
            return;
        }
        final var skcMap = BasicConvert.toMap(skcs, ProductSkc::getPlatformSkcId);
        final var skuMap = BasicConvert.toMap(this.productSkuRepository.listByProductIds(List.of(product.getProductId())), ProductSku::getPlatformSkuId);
        product.addProductTag(ProductTagEnum.SALES_DRIVING_PRODUCT.getCode());
        transaction(() -> {
            productRepository.editByIdWithOptimisticLock(product);
            data.forEach(it -> syncTemuData(product, it, skcMap, skuMap));
        });
    }

    private void syncTemuData(final Product product, final TemuOrderSkc order,
                              final Map<Long, ProductSkc> skcMap, final Map<Long, ProductSku> skuMap) {
        boolean syncOnShelves = false;
        try {
            final var sync = new TemuOrderSync();
            final var skcId = order.getSkcId();
            if (StrUtil.isBlank(skcId)) {
                return;
            }
            final var skuId = order.getSkuId();
            final var skc = skcMap.get(Long.valueOf(skcId));
            if (Objects.isNull(skc)) {
                return;
            }
            sync.setSkcId(skc.getSkcId());
            if (Objects.isNull(skc.getOrderTime())) {
                skc.setOrderTime(order.getOrderCreatedTime());
                skc.setSalesDriving(Bool.YES.getCode());
                productSkcRepository.editByIdWithOptimisticLock(skc);
                syncOnShelves = true;
            }
            sync.setSkuId(order.getSkuId());
            if (Objects.nonNull(skuId)) {
                final var sku = skuMap.get(skuId);
                if (Objects.nonNull(sku) && Objects.isNull(sku.getOrderTime())) {
                    sku.setOrderTime(order.getOrderCreatedTime());
                    sku.setSalesDriving(Bool.YES.getCode());
                    productSkuRepository.updateById(sku);
                    sync.setSkuId(sku.getSkuId());
                }
            }
            sync.setSkcSiteStatus(order.getSkcSiteStatus());
            sync.setSkcStatus(order.getSkcStatus());
            if (Objects.nonNull(order.getSpuId())) {
                sync.setProductId(Long.valueOf(order.getSpuId()));
            }
            sync.setSpuCode(product.getStyleCode());
            sync.setOrderCode(order.getOrderCode());
            sync.setOrderStatus(order.getOrderStatus());
            sync.setOrderNumber(order.getOrderNumber());
            sync.setCommodityAttr(order.getCommodityAttr());
            sync.setOrderCreatedTime(order.getOrderCreatedTime());
            sync.setOrder(order);
            sync.setProduct(product);
            if (syncOnShelves) {
                //款式动销
//                final var synced = this.styleOnShelvesService.temuOrderSync(sync);
                // 有款式编码但是没有上架数据
//                if (!synced && StrUtil.isNotBlank(product.getStyleCode())) {
//                    prototypeService.temuOrderSync(sync);
                spotStyleTaskService.temuSync(sync);
//                }
            }
        } catch (Exception e) {
            log.error("款式动销更新失败\t{}\t{}", product.getStyleCode(), e.getMessage(), e);
        }
    }

    private void job(final Shop shop) {
        final var shopId = shop.getShopId();
        int pageIndex = 0;
        while (true) {
            final var list = this.productSkcRepository.jobs(shopId, pageIndex * 100, 100);
            if (CollectionUtil.isEmpty(list)) {
                break;
            }
            pageIndex++;
            jobs(list, shopId);
        }
    }

    private void jobs(final List<ProductSkc> list, final Long shopId) {
        final var skus = this.productSkuRepository.listBySkcIds(list.stream()
                .map(it -> {
                    it.setSyncTime(LocalDateTime.now());
                    it.setSyncStatus(TemuSkcSyncStatusEnum.SYNC.getCode());
                    it.setSyncTimes(it.syncTimes() + 1);
                    return it.getProductSkcId();
                }).toList());
        if (CollectionUtil.isEmpty(skus)) {
            return;
        }
        TemuShopContext.set(shopService.getApp(shopId));
        tryFinally(() -> {
            final var skuIds = new ArrayList<Long>(skus.size());
            BasicConvert.groupingBy(skus, ProductSku::getProductSkcId)
                    .forEach((k, v) -> skuIds.add(v.getFirst().getPlatformSkuId()));
            final var skcMap = searchProduct(skuIds);
            list.forEach(it -> {
                final var skc = skcMap.get(it.getPlatformSkcId());
                if (Objects.nonNull(skc)) {
                    it.setSkcStatus(skc.getSelectStatus());
                }
            });
        }, e -> log.error("同步Temu选品状态失败\t{}", e.getMessage(), e), () -> {
            transaction(() -> {
                this.productSkcRepository.editBatchByIdWithOptimisticLock(list);
                syncCall(list);
            });
            TemuShopContext.clear();
        });
    }

    private void syncCall(final List<ProductSkc> list) {
        final var productIds = list.stream().filter(ProductSkc::offShelf).map(ProductSkc::getProductId).toList();
        if (CollectionUtil.isEmpty(productIds)) {
            return;
        }
        final var products = this.productRepository.listByIds(productIds);
        if (CollectionUtil.isEmpty(products)) {
            return;
        }
        products.forEach(it -> {
            final var style = styleOnShelvesRepository.getById(it.getStyleId());
            if (Objects.nonNull(style)) {
                try {
                    this.styleOnShelvesService.offShelves(it.getStyleId());
                } catch (Exception e) {
                    log.error("同步Temu选品状态失败\t{}\t{}", it.getPlatformProductId(), e.getMessage(), e);
                }
            }
        });
    }

    private Map<Long, TemuSearchSkcResp> searchProduct(final List<Long> skuIds) {
        final var req = new TemuSearchProductReq();
        req.setPageNum(1);
        req.setPageSize(100);
        req.setProductSkuIdList(skuIds);
        final var resp = this.temuProductService.searchProduct(req);
        return BasicConvert.toMap(resp.getDataList().stream()
                        .flatMap(it -> it.getSkcList().stream()).toList(),
                TemuSearchSkcResp::getSkcId);
    }

    private void addUpdateTag(final Product product, final ProductTagEnum tag) {
        if (!product.published()) {
            return;
        }
        product.addProductTag(tag.getCode());
        BasicConvert.setRevised(product);
        productRepository.updateById(product);
    }

    private void skcFile(final ProductFileEditReq req, final List<TemuProductFile> list,
                         final Product product) {
        final var skcs = req.getSkcs();
        if (CollectionUtil.isEmpty(skcs)) {
            return;
        }
        final var files = product.getFiles();
        final var tasks = product.getTasks();
        final var fileMap = BasicConvert.groupingBy(list.stream().filter(TemuProductFile::carousel).toList(),
                TemuProductFile::getProductSkcId);
        final var skcMap = BasicConvert.toMap(this.productSkcRepository.listByIds(skcs.stream()
                        .map(ProductSkcEditReq::getProductSkcId).toList()),
                ProductSkc::getProductSkcId);
        skcs.stream().filter(it -> skcMap.containsKey(it.getProductSkcId()))
                .forEach(it -> {
                    final var skcFiles = fileMap.get(it.getProductSkcId());
                    if (CollectionUtil.isNotEmpty(skcFiles)) {
                        skcFiles.stream().filter(TemuProductFile::carousel)
                                .forEach(f -> temuProductFileRepository.logicDelete(f.getFileId()));
                    }
                    it.getImages().forEach(i -> {
                        // 新增
                        final var file = ProductConvert.productFile(product);
                        file.setFileUrl(i);
                        file.setProductSkcId(it.getProductSkcId());
                        file.setFileType(ProductFileTypeEnum.CAROUSEL_IMAGE.getCode());
                        files.add(file);
                        final var t = ProductConvert.temuTask(TemuTaskTypeEnum.FILE, product);
                        t.setBusId(file.getFileId());
                        tasks.add(t);
                    });
                    final var skc = skcMap.get(it.getProductSkcId());
                    skc.setCarouselUrl(String.join(StrUtil.COMMA, it.getImages()));
                    BasicConvert.setRevised(skc);
                    this.productSkcRepository.updateById(skc);
                });
    }

    private int fileProduct(final ProductFileEditReq req, final Product product,
                            final List<TemuProductFile> list) {
        final var files = product.getFiles();
        final var tasks = product.getTasks();
        final var videoUrl = req.getVideoUrl();
        int r = -1;
        if (Objects.nonNull(videoUrl)) {
            r++;
            product.setVideoUrl(videoUrl);
            if (CollectionUtil.isNotEmpty(list)) {
                list.stream().filter(TemuProductFile::video)
                        .forEach(it -> temuProductFileRepository.logicDelete(it.getFileId()));
            }
            if (StrUtil.isNotBlank(videoUrl)) {
                // 新增
                final var file = ProductConvert.productFile(product);
                file.setFileUrl(videoUrl);
                file.setFileType(ProductFileTypeEnum.VIDEO.getCode());
                files.add(file);
                final var t = ProductConvert.temuTask(TemuTaskTypeEnum.VIDEO, product);
                t.setBusId(file.getFileId());
                tasks.add(t);
            }
        }
        final var materialImgUrl = req.getMaterialImgUrl();
        if (Objects.nonNull(materialImgUrl)) {
            r++;
            product.setMaterialImgUrl(materialImgUrl);
            if (CollectionUtil.isNotEmpty(list)) {
                list.stream().filter(TemuProductFile::material)
                        .forEach(it -> temuProductFileRepository.logicDelete(it.getFileId()));
            }
            if (StrUtil.isNotBlank(materialImgUrl)) {
                // 新增
                final var file = ProductConvert.productFile(product);
                file.setFileUrl(materialImgUrl);
                file.setFileType(ProductFileTypeEnum.MATERIAL_IMAGE.getCode());
                files.add(file);
                final var t = ProductConvert.temuTask(TemuTaskTypeEnum.FILE, product);
                t.setBusId(file.getFileId());
                tasks.add(t);
            }
        }
        return r;
    }

    private void testPrice(final Product product, final ProductTestPriceReq req) {
        check(product);
        final var passReq = new DesignStylePricePassed();
        passReq.setPricePassedState(req.getPass());
        passReq.setDesignStyleIds(List.of(product.getStyleId()));
        final var tag = req.passed() ? ProductTagEnum.PRICE_PASSED.getCode() :
                ProductTagEnum.PRICE_NO_PASSED.getCode();
        product.addProductTag(tag);
        BasicConvert.setRevised(product);
        this.productRepository.updateById(product);
        try {
            this.prototypeService.batchPricePassed(passReq);
        } catch (Exception e) {
            log.error("测价更新失败\t{}", e.getMessage(), e);
        }
    }

    private void publish(final Product product) {
        /*
         * 上传文件
         * 上传视频
         * 创建尺码模板
         * 创建商品
         */
        if (product.published()) {
            log.info("商品已经发布\t{}", product.getStyleCode());
            return;
        }
        final var style = styleOnShelvesRepository.getById(product.getStyleId());
        if (null == style) {
            log.info("待上架商品信息不存在\t{}", product.getStyleCode());
            return;
        }
        if (!style.reviewPass() || !style.shopReviewPass()) {
            log.info("仅有审核状态=【已通过】且【店主已审核】状态才能发布商品\t{}", product.getStyleCode());
            return;
        }
        product.setSkcs(this.productSkcRepository.listByProductIds(List.of(product.getProductId())));
        product.setProductSizes(this.productSizeRepository.listByProductIds(List.of(product.getProductId())));
        ProductConvert.toTask(product);
        final var files = product.getFiles();
        if (CollectionUtil.isNotEmpty(files)) {
            temuProductFileRepository.saveBatch(files, files.size());
        }
        final var tasks = product.getTasks();
        if (CollectionUtil.isNotEmpty(tasks)) {
            temuTaskRepository.saveBatch(tasks, tasks.size());
            // 发送消息
            tasks.forEach(it ->
                    this.send(it, RabbitConfigEnum.PUSH_TEMU));
        }
        product.setProductStatus(ProductStatusEnum.PUBLISHING.getCode());
        BasicConvert.setRevised(product);
        product.setOnShelverId(SsoContext.userId());
        product.setOnShelverName(SsoContext.username());
        product.setOnShelvesTime(LocalDateTime.now());
        productRepository.updateById(product);
        final var releaseProduct = this.styleOnShelvesService.releaseProduct(product.getStyleId());
        log.info("上架发布结果\t{}\t{}", product.getStyleCode(), releaseProduct);
    }

    private void check(final Product product) {
        if (!product.published()) {
            throw new ValidationException("没有发布的商品不允许编辑");
        }
    }

    private boolean isNotPublished(final Product product) {
        if (Objects.isNull(product)) {
            return true;
        }
        if (product.published()) {
            return false;
        }
        final var status = product.getProductStatus();
        return !Objects.equals(ProductStatusEnum.PUBLISHING.getCode(), status) &&
                !Objects.equals(ProductStatusEnum.PUBLISHED.getCode(), status);
    }

    private boolean setQuery(ProductPageReq req, ProductQuery query) {
        if (Objects.nonNull(req.getPreDisassemblyState())) {
            final var skcs = this.skcOnShelvesRepository.listByPreDisassemblyState(req.getPreDisassemblyState());
            if (CollectionUtil.isEmpty(skcs)) {
                return false;
            }
            final var scs = query.getSkcCodes();
            final var codes = skcs.stream().map(SkcOnShelves::getSkcCode).toList();
            if (CollectionUtil.isEmpty(scs)) {
                query.setSkcCodes(codes);
            } else {
                scs.addAll(codes);
            }
        }
        final var shopIds = new ArrayList<Long>();
        query.setShopIds(shopIds);
        if (Objects.nonNull(req.getBusinessOperatorId())) {
            final var shops = this.shopRepository.listByBusinessOperatorId(req.getBusinessOperatorId());
            if (CollectionUtil.isEmpty(shops)) {
                return false;
            }
            shops.forEach(it -> shopIds.add(it.getShopId()));
        }
        if (Objects.nonNull(req.getShopId())) {
            shopIds.add(req.getShopId());
        }
        if (shopIds.isEmpty()) {
            query.setShopIds(null);
        }
        return true;
    }

    private void related(final ProductSkc skc) {
        final var skcCode = skc.getSkcCode();
        if (StrUtil.isBlank(skcCode)) {
            log.info("商品SKC货号为空\t{}", skc.getPlatformSkcId());
            return;
        }
        final var product = this.productRepository.getById(skc.getProductId());
        if (Objects.isNull(product)) {
            log.info("商品SKC货号\t{}\t关联的商品为空", skcCode);
            return;
        }
        try {
            if (prototype(skc, product)) {
                return;
            }
            spot(skc, product);
        } catch (Exception e) {
            log.error("关联商品货号失败\t{}\t{}", skcCode, e.getMessage(), e);
        }
    }

    private boolean prototype(final ProductSkc skc, final Product product) {
        final var prototype = prototypeRepository.getByDesignCode(skc.getSkcCode());
        if (Objects.isNull(prototype)) {
            return false;
        }
        skc.setSkcId(prototype.getPrototypeId());
        log.info("商品SKC货号\t{}\t关联款式", skc.getSkcCode());
        transaction(() -> {
            this.productSkcRepository.editByIdWithOptimisticLock(skc);
            if (StrUtil.isBlank(product.getStyleCode())) {
                product.setStyleCode(prototype.getStyleCode());
                product.setStyleId(prototype.getDesignStyleId());
                this.productRepository.editByIdWithOptimisticLock(product);
            }
            // 判断这个商品下面所有的SKC和商品的款是不是一样
            final var skcs = this.productSkcRepository.listByProductIds(List.of(product.getProductId()));
            final var prototypes = prototypeRepository.listByIds(skcs.stream().map(ProductSkc::getSkcId).toList());
            final var designStyleIds = prototypes.stream().map(Prototype::getDesignStyleId).collect(Collectors.toSet());
            final var diff = prototypes.stream().anyMatch(it -> !Objects.equals(it.getDesignStyleId(), product.getStyleId()));
            // SKC和SPU绑定的款不一样
            if (1 == designStyleIds.size() && diff) {
                product.setStyleCode(prototype.getStyleCode());
                product.setStyleId(prototype.getDesignStyleId());
                this.productRepository.editByIdWithOptimisticLock(product);
            }
        });
        return true;
    }

    private boolean spot(final ProductSkc skc, final Product product) {
        final var spotSkcs = this.spotStyleSkcRepository.listBySkcCodes(List.of(skc.getSkcCode()));
        if (CollectionUtil.isEmpty(spotSkcs)) {
            return false;
        }
        final var spotSkc = spotSkcs.getFirst();
        skc.setSkcId(spotSkc.getSkcId());
        transaction(() -> {
            this.productSkcRepository.editByIdWithOptimisticLock(skc);
            if (StrUtil.isBlank(product.getStyleCode())) {
                final var spot = this.spotStyleTaskRepository.obtainById(spotSkc.getTaskId());
                product.setStyleCode(spot.getTaskCode());
                product.setStyleId(spot.getTaskId());
                this.productRepository.editByIdWithOptimisticLock(product);
            }
            // 判断这个商品下面所有的SKC和商品的款是不是一样
            final var skcs = this.productSkcRepository.listByProductIds(List.of(product.getProductId()));
            final var prototypes = spotStyleSkcRepository.listByIds(skcs.stream().map(ProductSkc::getSkcId).toList());
            final var styleIds = prototypes.stream().map(SpotStyleSkc::getTaskId).collect(Collectors.toSet());
            final var diff = prototypes.stream().anyMatch(it -> !Objects.equals(it.getSkcId(), product.getStyleId()));
            // SKC和SPU绑定的款不一样
            if (1 == styleIds.size() && diff) {
                final var spot = this.spotStyleTaskRepository.obtainById(spotSkc.getTaskId());
                product.setStyleCode(spot.getTaskCode());
                product.setStyleId(spot.getTaskId());
                this.productRepository.editByIdWithOptimisticLock(product);
            }
        });
        log.info("商品SKC货号\t{}\t关联现货", skc.getSkcCode());
        return true;
    }

    private void binding(final Product product) {
        if (Objects.isNull(product)) {
            return;
        }
        final var skcs = this.productSkcRepository.listByProductIds(List.of(product.getProductId()));
        skcs.forEach(it -> temuSyncService.sync(it.getShopId(), it.getSkcCode()));
    }

    private void salesDrivings(final ProductSkc skc) {
        final var orders = this.temuOrderRepository.listBySkcId(Objects.toString(skc.getPlatformSkcId()));
        log.info("通知动销\t{}", JsonsKt.toJson(orders));
        if (CollectionUtil.isEmpty(orders)) {
            return;
        }
        final var data = orders.stream().filter(it -> !StrUtil.equalsIgnoreCase("已取消", it.getOrderStatus())).toList();
        if (CollectionUtil.isEmpty(data)) {
            return;
        }
        final var product = this.productRepository.getById(skc.getProductId());
        final var order = data.getFirst();
        final var sync = new TemuOrderSync();
        sync.setSkcId(skc.getSkcId());
        sync.setSkcSiteStatus(order.getSkcSiteStatus());
        sync.setSkcStatus(order.getSkcStatus());
        sync.setProductId(product.getProductId());
        sync.setSpuCode(product.getStyleCode());
        sync.setOrderCode(order.getOrderCode());
        sync.setOrderStatus(order.getOrderStatus());
        sync.setOrderNumber(order.getOrderNumber());
        sync.setCommodityAttr(order.getCommodityAttr());
        sync.setOrderCreatedTime(order.getOrderCreatedTime());
        sync.setOrder(order);
        sync.setProduct(product);
        log.info("通知动销\t{}", JsonsKt.toJson(sync));
        prototypeService.temuOrderSync(sync);
    }
}
