package tech.tiangong.sdp.service.impl;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.date.DatePattern;
import cn.hutool.core.date.LocalDateTimeUtil;
import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.google.common.base.Stopwatch;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.aikero.admin.common.vo.AttributeVo;
import team.aikero.blade.auth.UserContexts;
import team.aikero.blade.auth.config.AuthProperties;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.datagroup.cyxf.repository.TemuOrderRepository;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.convert.ProductConvert;
import tech.tiangong.sdp.entity.*;
import tech.tiangong.sdp.enums.*;
import tech.tiangong.sdp.external.DictClientExternal;
import tech.tiangong.sdp.repository.*;
import tech.tiangong.sdp.service.PrototypeService;
import tech.tiangong.sdp.service.ShopService;
import tech.tiangong.sdp.service.SpotStyleTaskService;
import tech.tiangong.sdp.service.TemuSyncService;
import tech.tiangong.sdp.temu.http.TemuShopContext;
import tech.tiangong.sdp.temu.serivce.TemuProductService;
import tech.tiangong.sdp.temu.vo.dto.TemuSyncProductDTO;
import tech.tiangong.sdp.temu.vo.req.*;
import tech.tiangong.sdp.temu.vo.resp.*;
import tech.tiangong.sdp.util.ImageUtils;
import tech.tiangong.sdp.utils.UserInvoke;
import tech.tiangong.sdp.vo.dto.DictDTO;
import tech.tiangong.sdp.vo.dto.TemuAppDTO;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

/**
 * Temu同步服务
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/18 15:58
 */
@Slf4j
@Service
@AllArgsConstructor
public class TemuSyncServiceImpl extends DefaultTaskServiceImpl implements TemuSyncService {
    private final TemuProductService temuProductService;
    private final ProductRepository productRepository;
    private final ProductAttrRepository productAttrRepository;
    private final ProductSkcRepository productSkcRepository;
    private final ProductSkuMainSpecRepository productSkuMainSpecRepository;
    private final ProductSkuRepository productSkuRepository;
    private final ProductSkuSiteSupplierPriceRepository productSkuSiteSupplierPriceRepository;
    private final ProductSkuSpecRepository productSkuSpecRepository;
    private final ProductSkuWarehouseRepository productSkuWarehouseRepository;
    private final ProductSpecAttrRepository productSpecAttrRepository;
    private final ProductWarehouseRouteRepository productWarehouseRouteRepository;
    private final ProductWhExtAttrRepository productWhExtAttrRepository;
    private final ProductSyncLogRepository productSyncLogRepository;
    private final PrototypeRepository prototypeRepository;
    private final DesignStyleRepository designStyleRepository;
    private final SpotStyleTaskRepository spotStyleTaskRepository;
    private final SpotStyleSkcRepository spotStyleSkcRepository;
    private final StyleSkcSkuRepository styleSkcSkuRepository;
    private final TemuOrderRepository temuOrderRepository;
    private final TemuPriceReviewOrderRepository temuPriceReviewOrderRepository;
    private final DictClientExternal dictClientExternal;
    private final SpotStyleTaskService spotStyleTaskService;
    private final PrototypeService prototypeService;
    private final ShopService shopService;
    private final ShopRepository shopRepository;
    private final AuthProperties authProperties;
    private final JdbcTemplate jdbcTemplate;

    @Override
    public void sync(TemuAppDTO app) {
        TemuShopContext.set(app);
        log.info("拉取Temp商品数据开始\t{}", app.getShopName());
        final var watch = Stopwatch.createStarted();
        try {
            UserContexts.withSystemUser(() -> fetchProduct(app));
        } catch (Exception e) {
            log.error("店铺【{}】,循环查询Temu商品列表接口失败\t{}", app.getShopName(), e.getLocalizedMessage(), e);
        } finally {
            watch.stop();
            TemuShopContext.clear();
        }
        log.info("拉取Temp商品数据结束\t{}\t{}", app.getShopName(), watch.elapsed(TimeUnit.MILLISECONDS));
    }

    @Override
    public void syncReviewPrice(final Shop shop) {
        final var app = this.getApp(shop.getShopId());
        TemuShopContext.set(app);
        log.info("拉取Temu核价单开始\t{}", app.getShopName());
        final var watch = Stopwatch.createStarted();
        try {
//            UserContexts.withSystemUser(() -> fetchReviewSamplePrice(app));
            runWith(shop, () -> fetchReviewSamplePrice(app));
        } catch (Exception e) {
            log.error("店铺【{}】,循环查询Temu商品列表接口失败\t{}", app.getShopName(), e.getLocalizedMessage(), e);
        } finally {
            watch.stop();
            TemuShopContext.clear();
        }
        log.info("拉取Temu核价单结束\t{}\t{}", app.getShopName(), watch.elapsed(TimeUnit.MILLISECONDS));
    }

    @Override
    public void sync(Long shopId) {
        log.info("同步店铺商品数据开始\t{}", shopId);
        final var list = productSyncLogRepository.listByShopIds(List.of(shopId), Bool.NO.getCode());
        if (CollectionUtil.isEmpty(list)) {
            log.info("同步店铺商品数据结束,没有需要同步的数据\t{}", shopId);
        }
        final var shop = this.shopRepository.getById(shopId);
        list.forEach(it -> {
            try {
                runWith(shop, () -> this.upsert(it));
            } catch (Exception e) {
                log.error("同步店铺商品数据失败\t{}\t{}", it.getLogId(), e.getLocalizedMessage(), e);
            }
        });
    }

    @Override
    public void sync(Long shopId, String skcCode) {
        final var no = LocalDateTimeUtil.format(LocalDateTime.now(), DatePattern.PURE_DATETIME_FORMATTER);
        final var list = new ArrayList<ProductSyncLog>();
        final var app = this.getApp(shopId);
        final var shop = this.shopRepository.getById(shopId);
        TemuShopContext.set(app);
        try {
            final var req = new TemuProductListGetPageReq();
            req.setPage(1);
            req.setPageSize(50);
            req.setSkcExtCode(skcCode);
            final var resp = this.temuProductService.pageListGetProduct(req);
            final var total = resp.getTotalCount();
            log.info("店铺【{}】\t{},Temu查询商品条数\t{}", app.getShopName(), skcCode, total);
            if (Objects.requireNonNullElse(total, 0) < 1) {
                return;
            }
            final var data = resp.getData();
            if (CollectionUtil.isEmpty(data)) {
                return;
            }
            data.forEach(it -> obtain(app, it, list, no));
            log.info("店铺【{}】\t{},同步Temu商品条数\t{}", app.getShopName(), skcCode, list.size());
            productSyncLogRepository.saveBatch(list, list.size());
            list.forEach(it -> runWith(shop, () -> this.upsert(it)));
        } catch (Exception e) {
            log.error("店铺【{}】\t{},同步Temu商品失败\t{}", app.getShopName(), skcCode, e.getLocalizedMessage(), e);
        } finally {
            TemuShopContext.clear();
        }
    }

    @Override
    public void job() {
        log.info("同步Temu数据定时任务开始");
        final var watch = Stopwatch.createStarted();
        final var shops = this.shopRepository.list();
        if (CollectionUtil.isEmpty(shops)) {
            return;
        }
        shops.stream()
                .filter(it -> Objects.equals(Bool.YES.getCode(), it.getEnable()))
                .forEach(this::job);
        watch.stop();
        log.info("同步Temu数据定时任务结束\t{}", watch.elapsed(TimeUnit.MILLISECONDS));
    }

    @Override
    public void syncProduct() {
        log.info("同步Temu商品数据定时任务开始");
        final var watch = Stopwatch.createStarted();
        final var shops = this.shopRepository.list();
        if (CollectionUtil.isEmpty(shops)) {
            return;
        }
        shops.stream()
                .filter(it -> Objects.equals(Bool.YES.getCode(), it.getEnable()))
                .forEach(it -> {
                    try {
                        this.sync(getApp(it.getShopId()));
                    } catch (Exception e) {
                        log.error("同步Temu商品数据失败\t{}\t{}", it.getShopName(), e.getLocalizedMessage(), e);
                    }
                });
//        shops.stream()
//                .filter(it -> Objects.equals(Bool.YES.getCode(), it.getEnable()))
//                .forEach(it -> {
//                    try {
//                        this.sync(it.getShopId());
//                    } catch (Exception e) {
//                        log.error("同步Temu商品数据失败\t{}\t{}", it.getShopName(), e.getLocalizedMessage(), e);
//                    }
//                });
        watch.stop();
        log.info("同步Temu商品数据定时任务结束\t{}", watch.elapsed(TimeUnit.MILLISECONDS));
    }

    @Override
    public void sync() {
        log.info("同步商品数据定时任务开始");
        final var watch = Stopwatch.createStarted();
        final var shops = this.shopRepository.list();
        if (CollectionUtil.isEmpty(shops)) {
            return;
        }
        shops.stream()
                .filter(it -> Objects.equals(Bool.YES.getCode(), it.getEnable()))
                .forEach(it -> {
                    try {
                        this.sync(it.getShopId());
                    } catch (Exception e) {
                        log.error("同步商品数据失败\t{}\t{}", it.getShopName(), e.getLocalizedMessage(), e);
                    }
                });
        watch.stop();
        log.info("同步商品数据定时任务结束\t{}", watch.elapsed(TimeUnit.MILLISECONDS));
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public void test() {
        // 7435930231539986801
        final var e = this.productSyncLogRepository.obtainById(7441112226155005252L);
        runWith(this.shopRepository.getById(e.getShopId()), () -> this.upsert(e));
    }

    @Override
    public void updateProductTenant() {
        log.info("更新商品租户开始");
        final var watch = Stopwatch.createStarted();
        final var shops = this.shopRepository.list();
        if (CollectionUtil.isEmpty(shops)) {
            return;
        }
        shops.stream().filter(it -> Objects.equals(2991L, it.getTenantId()))
//        shops.stream().filter(it -> Objects.equals(1486L, it.getTenantId()))
                .forEach(this::updateProductTenant);
        watch.stop();
        log.info("更新商品租户结束\t{}", watch.elapsed(TimeUnit.MILLISECONDS));
    }

    private void updateProductTenant(final Shop shop) {
        final var products = this.productRepository.listByShopIds(List.of(shop.getShopId()));
        if (CollectionUtil.isEmpty(products)) {
            return;
        }
        products.stream().filter(it -> Objects.equals(1L, it.getTenantId())).forEach(this::updateTenant);
    }

    private void updateTenant(final Product product) {
        final var productId = product.getProductId();
        final var sql = new ArrayList<String>();
        sql.add("UPDATE product SET tenant_id = 2991 WHERE tenant_id=1 AND deleted=0 AND product_id =" + productId + "; ");
        sql.add("UPDATE product_attr SET tenant_id = 2991 WHERE tenant_id=1 AND deleted=0 AND product_id =" + productId + "; ");
        sql.add("UPDATE product_skc SET tenant_id = 2991 WHERE tenant_id=1 AND deleted=0 AND product_id =" + productId + "; ");
        sql.add("UPDATE product_sku SET tenant_id = 2991 WHERE tenant_id=1 AND deleted=0 AND product_id =" + productId + "; ");
        sql.add("UPDATE product_sku_main_spec SET tenant_id = 2991 WHERE tenant_id=1 AND deleted=0 AND product_id =" + productId + "; ");
        sql.add("UPDATE product_sku_site_supplier_price SET tenant_id = 2991 WHERE tenant_id=1 AND deleted=0 AND product_id =" + productId + "; ");
        sql.add("UPDATE product_size SET tenant_id = 2991 WHERE tenant_id=1 AND deleted=0 AND product_id =" + productId + "; ");
        sql.add("UPDATE product_size_part SET tenant_id = 2991 WHERE tenant_id=1 AND deleted=0 AND product_id =" + productId + "; ");
        sql.add("UPDATE product_sku_spec SET tenant_id = 2991 WHERE tenant_id=1 AND deleted=0 AND product_id =" + productId + "; ");
        sql.add("UPDATE product_sku_warehouse SET tenant_id = 2991 WHERE tenant_id=1 AND deleted=0 AND product_id =" + productId + "; ");
        sql.add("UPDATE product_spec_attr SET tenant_id = 2991 WHERE tenant_id=1 AND deleted=0 AND product_id =" + productId + "; ");
        sql.add("UPDATE product_warehouse_route SET tenant_id = 2991 WHERE tenant_id=1 AND deleted=0 AND product_id =" + productId + "; ");
        sql.add("UPDATE product_wh_ext_attr SET tenant_id = 2991 WHERE tenant_id=1 AND deleted=0 AND product_id =" + productId + "; ");
        sql.forEach(it -> {
            log.info("更新租户SQL\t{}", it);
            try {
                final var row = this.jdbcTemplate.update(it);
                log.info("更新租户SQL\t{}\t结果\t{}", it, row);
            } catch (Exception e) {
                log.error("更新租户失败\t{}\t{}", it, e.getLocalizedMessage(), e);
            }
        });
    }

    private void upsert(final ProductSyncLog sync) {
        sync.setSyncTimes(Objects.requireNonNullElse(sync.getSyncTimes(), 0) + 1);
        sync.setSyncTime(LocalDateTime.now());
        sync.setSyncStatus(Bool.YES.getCode());
        final var json = sync.getContent();
        if (StrUtil.isBlank(json)) {
            productSyncLogRepository.updateById(sync);
            return;
        }
        final var resp = JsonsKt.parseJson(json, TemuProductPageDataResp.class);
        final var product = productRepository.getByPlatformProductId(resp.getProductId());
        if (Objects.nonNull(product)) {
            transaction(() -> update(product, resp));
        } else {
            synced(sync);
        }
    }

    private void synced(final ProductSyncLog sync) {
        sync.setSyncTimes(Objects.requireNonNullElse(sync.getSyncTimes(), 0) + 1);
        sync.setSyncTime(LocalDateTime.now());
        sync.setSyncStatus(Bool.YES.getCode());
        final var json = sync.getContent();
        if (StrUtil.isBlank(json)) {
            return;
        }
//        TemuShopContext.set(this.getApp(sync.getShopId()));
        try {
            final var resp = JsonsKt.parseJson(json, TemuProductPageDataResp.class);
            final var productSkcId = resp.getProductSkcId();
//            final var stockResult = getStockQuantity(productSkcId);
//            final var productSkuIds = resp.getProductSkuSummaries().stream().map(TemuProductPageSkuSummaryResp::getProductSkuId).toList();
//            final var priceResult = getPriceList(productSkuIds);
//            final var productId = resp.getProductId();
            final var dto = new TemuSyncProductDTO(resp, null, null);
//            final var product = productRepository.getByPlatformProductId(productId);
//            if (Objects.nonNull(product)) {
//                transaction(() -> update(product, resp));
//                log.info("商品已经存在,开始更新\t{}", resp.getExtCode());
//            } else {
            transaction(() -> save(sync, dto));
//            }
        } catch (Exception e) {
            sync.setSyncStatus(Bool.NO.getCode());
            log.error("同步商品数据失败\t{}", e.getLocalizedMessage(), e);
        } finally {
//            TemuShopContext.clear();
            productSyncLogRepository.updateById(sync);
        }
    }

    private TemuProductSupplierPriceResultResp getPriceList(final List<Long> productSkuIds) {
        final var req = new TemuProductPriceListGetReq();
        req.setProductSkuIds(productSkuIds);
        return this.temuProductService.getPriceList(req);
    }

    private TemuProductStockResultResp getStockQuantity(final Long productSkcId) {
        final var req = new TemuProductQuantityGetReq();
        final var user = new TemuApiUserReq();
        user.setSupplierId(0L);
        req.setOpenApiUser(user);
        req.setProductSkcId(productSkcId);
        return this.temuProductService.getStockQuantity(req);
    }

    private void update(final Product product, final TemuProductPageDataResp resp) {
        log.info("商品已经存在,开始更新\t{}", product.getPlatformProductId());
        // 品类
        Optional.ofNullable(resp.getLeafCat())
                .ifPresent(it -> {
                    product.setPlatformCategoryCode(Objects.toString(it.getCatId()));
                    product.setPlatformCategoryName(it.getCatName());
                });
        final var productSkcId = resp.getProductSkcId();
        product.setPrices(new ArrayList<>());
        product.setWarehouses(new ArrayList<>());
        product.setSkuSpecs(new ArrayList<>());
        final var skcs = this.productSkcRepository.listByProductIds(List.of(product.getProductId()));
        final var platformSkcIds = skcs.stream().map(ProductSkc::getPlatformSkcId).collect(Collectors.toSet());
        if (platformSkcIds.contains(productSkcId)) {
            log.info("SKC已经存在,无需更新\t{}\t{}", product.getPlatformProductId(), productSkcId);
            final var ups = skcs.stream().filter(it -> Objects.equals(productSkcId, it.getPlatformSkcId())).toList();
            product.setSkcs(ups);
            if (CollectionUtil.isNotEmpty(ups)) {
                ups.stream().filter(it -> Objects.requireNonNullElse(it.getSkcId(), 0L) < 1).findFirst()
                        .ifPresent(it -> {
                            it.setSkcCode(resp.getExtCode());
                            it.setSkcId(0L);
                            productSkcRepository.editByIdWithOptimisticLock(it);
                        });
            }
        } else {
            updateSkc(product, resp);
        }
        updateSku(product, resp);
        final var skuSpecs = product.getSkuSpecs();
        if (CollectionUtil.isNotEmpty(skuSpecs)) {
            final var dict = sizeDict();
            if (CollectionUtil.isNotEmpty(dict)) {
                final var sizeArr = product.sizeArr();
                final var attributeMap = BasicConvert.toMap(dict.getFirst().getAttributes(), AttributeVo::getName);
                skuSpecs.stream().filter(it -> Objects.equals(3001L, it.getParentSpecId()))
                        .map(ProductSkuSpec::getSpecName).forEach(it -> {
                            final var size = attributeMap.get(it);
                            if (Objects.nonNull(size) && !sizeArr.contains(size.getCode())) {
                                sizeArr.add(size.getCode());
                            }
                        });
                product.setSize(JsonsKt.toJson(sizeArr));
            }
        }
        this.productRepository.editByIdWithOptimisticLock(product);
        saveData(product);
    }

    private void updateSku(Product product, TemuProductPageDataResp resp) {
        final var summaries = resp.getProductSkuSummaries();
        final var skus = this.productSkuRepository.listByProductIds(List.of(product.getProductId()));
        final var platformSkuIds = skus.stream().map(ProductSku::getPlatformSkuId).collect(Collectors.toSet());
        final var skuSummaries = summaries.stream()
                .filter(it -> !platformSkuIds.contains(it.getProductSkuId())).toList();
        if (CollectionUtil.isEmpty(skuSummaries)) {
            return;
        }
        product.setSkus(new ArrayList<>());
        summaries.forEach(it -> skuSummary(it, product, Map.of(), List.of()));
    }

    private void updateSkc(Product product, TemuProductPageDataResp resp) {
        this.skc(resp, product, List.of(product.getMaterialImgUrl()));
        // 款信息
        final var prototype = prototypeRepository.getByDesignCode(resp.getExtCode());
        final var skc = product.getSkcs().getFirst();
        if (Objects.nonNull(prototype)) {
            skc.setSkcId(prototype.getPrototypeId());
            return;
        }
        final var spotSkcs = this.spotStyleSkcRepository.listBySkcCodes(List.of(resp.getExtCode()));
        if (CollectionUtil.isEmpty(spotSkcs)) {
            return;
        }
        skc.setSkcId(spotSkcs.getFirst().getSkcId());
    }

    private void save(final ProductSyncLog sync, final TemuSyncProductDTO dto) {
        log.info("商品不存在,开始插入\t{}", sync.getSkcCode());
        final var e = this.obtain(dto, sync);
        log.info("插入商品\t{}", JsonsKt.toJsonPretty(e));
        final var syncTemuData = syncTemuData(e);
        productRepository.save(e);
        saveData(e);
        syncTemuData(syncTemuData, e);
    }

    private void saveData(Product product) {
        final var attrs = product.getAttrs();
        if (CollectionUtil.isNotEmpty(attrs)) {
            productAttrRepository.saveBatch(attrs, attrs.size());
        }
        final var specAttrs = product.getSpecAttrs();
        if (CollectionUtil.isNotEmpty(specAttrs)) {
            productSpecAttrRepository.saveBatch(specAttrs, specAttrs.size());
        }
        final var mainSpecs = product.getMainSpecs();
        if (CollectionUtil.isNotEmpty(mainSpecs)) {
            productSkuMainSpecRepository.saveBatch(mainSpecs, mainSpecs.size());
        }
        final var prices = product.getPrices();
        if (CollectionUtil.isNotEmpty(prices)) {
            productSkuSiteSupplierPriceRepository.saveBatch(prices, prices.size());
        }
        final var skuSpecs = product.getSkuSpecs();
        if (CollectionUtil.isNotEmpty(skuSpecs)) {
            productSkuSpecRepository.saveBatch(skuSpecs, skuSpecs.size());
        }
        final var skus = product.getSkus();
        if (CollectionUtil.isNotEmpty(skus)) {
            final var data = this.productSkuRepository.listByIds(skus.stream().map(ProductSku::getProductSkuId).toList());
            if (CollectionUtil.isEmpty(data)) {
                productSkuRepository.saveBatch(skus, skus.size());
            } else {
                final var skuIds = data.stream().map(ProductSku::getProductSkuId).toList();
                final var list = skus.stream().filter(it -> !skuIds.contains(it.getProductSkuId())).toList();
                if (CollectionUtil.isNotEmpty(list)) {
                    productSkuRepository.saveBatch(list, list.size());
                }
            }
        }
        final var skcs = product.getSkcs();
        if (CollectionUtil.isNotEmpty(skcs)) {
            final var data = this.productSkcRepository.listByIds(skcs.stream().map(ProductSkc::getProductSkcId).toList());
            if (CollectionUtil.isEmpty(data)) {
                productSkcRepository.saveBatch(skcs, skcs.size());
            } else {
                final var skcIds = data.stream().map(ProductSkc::getProductSkcId).toList();
                final var list = skcs.stream().filter(it -> !skcIds.contains(it.getProductSkcId())).toList();
                if (CollectionUtil.isNotEmpty(list)) {
                    productSkcRepository.saveBatch(skcs, skcs.size());
                }
            }
        }
        final var extAttrs = product.getExtAttrs();
        if (CollectionUtil.isNotEmpty(extAttrs)) {
            productWhExtAttrRepository.saveBatch(extAttrs, extAttrs.size());
        }
        final var warehouses = product.getWarehouses();
        if (CollectionUtil.isNotEmpty(warehouses)) {
            productSkuWarehouseRepository.saveBatch(warehouses, warehouses.size());
        }
        final var warehouseRoutes = product.getWarehouseRoutes();
        if (CollectionUtil.isNotEmpty(warehouseRoutes)) {
            productWarehouseRouteRepository.saveBatch(warehouseRoutes, warehouseRoutes.size());
        }
    }

    private void fetchProduct(final TemuAppDTO app) {
        int page = 1;
        int pageSize = 50;
        final var no = LocalDateTimeUtil.format(LocalDateTime.now(), DatePattern.PURE_DATETIME_FORMATTER);
        final var list = new ArrayList<ProductSyncLog>();
        do {
            try {
                final var req = new TemuProductListGetPageReq();
                req.setPage(page);
                req.setPageSize(pageSize);
                final var resp = this.temuProductService.pageListGetProduct(req);
                final var total = resp.getTotalCount();
                log.info("店铺【{}】,Temu查询商品条数\t{}", app.getShopName(), total);
                if (Objects.requireNonNullElse(total, 0) < 1) {
                    break;
                }
                final var data = resp.getData();
                if (CollectionUtil.isEmpty(data)) {
                    break;
                }
                page++;
                data.forEach(it -> obtain(app, it, list, no));
            } catch (Exception e) {
                log.error("店铺【{}】\t{}\t{},查询Temu商品列表接口失败\t{}", app.getShopName(), page, pageSize, e.getLocalizedMessage(), e);
                break;
            }
        } while (true);
        if (CollectionUtil.isEmpty(list)) {
            log.info("店铺【{}】,同步Temu商品为空", app.getShopName());
            return;
        }
        log.info("店铺【{}】,同步Temu商品条数\t{}", app.getShopName(), list.size());
        productSyncLogRepository.saveBatch(list, list.size());
    }

    private void fetchReviewSamplePrice(final TemuAppDTO app) {
        int page = 1;
        int pageSize = 50;
        final var list = new ArrayList<TemuPriceReviewOrder>();
        do {
            try {
                final var req = new TemuProductPriceReviewPageReq();
                req.setPageNo(page);
                req.setPageSize(pageSize);
                req.setOrderStatusList(List.of(0, 1, 2, 3, 4, 5));
                final var resp = this.temuProductService.pagePriceReview(req);
                final var total = resp.getTotal();
                log.info("店铺【{}】,Temu查询核价单条数\t{}", app.getShopName(), total);
                if (Objects.requireNonNullElse(total, 0) < 1) {
                    break;
                }
                final var data = resp.getReviewSamplePriceList();
                if (CollectionUtil.isEmpty(data)) {
                    break;
                }
                page++;
                obtainPriceReviewOrder(app, data, list);
            } catch (Exception e) {
                log.error("店铺【{}】\t{}\t{},查询Temu核价单接口失败\t{}", app.getShopName(), page, pageSize, e.getLocalizedMessage(), e);
                break;
            }
        } while (true);
        if (CollectionUtil.isEmpty(list)) {
            log.info("店铺【{}】,同步Temu核价单为空", app.getShopName());
            return;
        }
        log.info("店铺【{}】,同步Temu核价单条数\t{}", app.getShopName(), list.size());
        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        final var news = list.stream()
                .filter(it -> StrUtil.equalsIgnoreCase(UpsetEnum.CREATE.getCode(), it.getUpset()))
                .toList();
        transaction(() -> {
            if (CollectionUtil.isNotEmpty(news)) {
                temuPriceReviewOrderRepository.saveBatch(news, news.size());
            }
            final var olds = list.stream()
                    .filter(it -> StrUtil.equalsIgnoreCase(UpsetEnum.UPDATE.getCode(), it.getUpset()))
                    .toList();
            if (CollectionUtil.isNotEmpty(olds)) {
                temuPriceReviewOrderRepository.updateBatchById(olds, olds.size());
            }
        });
    }

    private void obtainPriceReviewOrder(final TemuAppDTO app,
                                        final List<TemuProductPriceReviewPageResp> data,
                                        final List<TemuPriceReviewOrder> list) {
        final var orders = temuPriceReviewOrderRepository.listByOrderIds(data.stream()
                .map(TemuProductPriceReviewPageResp::getOrderId).toList());
        final var upset = CollectionUtil.isEmpty(orders);
        final List<Long> orderIds = upset ? List.of() : orders.stream().map(TemuPriceReviewOrder::getOrderId).toList();
        data.stream().filter(it -> !orderIds.contains(it.getOrderId()))
                .forEach(it -> {
                    final var siteId = JsonsKt.toJson(it.getSiteIds());
                    list.addAll(it.getProductSkuIdList().stream().map(id -> {
                        final var e = new TemuPriceReviewOrder();
                        BasicConvert.entityInit(e, e::setReviewId);
                        e.setSiteId(siteId);
                        e.setCurrencyType(it.getPriceCurrency());
                        e.setShopId(app.getShopId());
                        e.setPlatformSkuId(id);
                        e.setOrderId(it.getOrderId());
                        e.setOrderStatus(it.getOrderStatus());
                        e.setSyncTimes(0);
                        e.setSyncStatus(Bool.NO.getCode());
                        e.setCanBargain(Bool.NO.getCode());
                        if (it.canBargain()) {
                            e.setCanBargain(Bool.YES.getCode());
                        }
                        e.setSupplyPrice(fen2Yuan(it.getSupplyPrice()));
                        e.setSuggestPrice(fen2Yuan(it.getSuggestSupplyPrice()));
                        e.setUpset(UpsetEnum.CREATE.getCode());
                        return e;
                    }).toList());
                });
        if (!upset) {
            final var groupOrder = BasicConvert.groupingBy(orders, TemuPriceReviewOrder::getOrderId);
            data.stream().filter(it -> orderIds.contains(it.getOrderId()))
                    .forEach(it -> {
                        final var siteId = JsonsKt.toJson(it.getSiteIds());
                        final var orderMap = BasicConvert.toMap(groupOrder.get(it.getOrderId()), TemuPriceReviewOrder::getPlatformSkuId);
                        it.getProductSkuIdList().forEach(id -> {
                            final var e = orderMap.get(id);
                            e.setSiteId(siteId);
                            if (it.canBargain()) {
                                e.setCanBargain(Bool.YES.getCode());
                            }
                            e.setOrderStatus(it.getOrderStatus());
                            e.setSupplyPrice(fen2Yuan(it.getSupplyPrice()));
                            e.setSuggestPrice(fen2Yuan(it.getSuggestSupplyPrice()));
                            e.setUpset(UpsetEnum.UPDATE.getCode());
                            list.add(e);
                        });
                    });
        }
    }


    private void obtain(final TemuAppDTO app, final TemuProductPageDataResp resp,
                        final List<ProductSyncLog> list, final String no) {
        list.add(obtain(app, resp, no));
    }

    private ProductSyncLog obtain(final TemuAppDTO app, final TemuProductPageDataResp resp,
                                  final String no) {
        final var e = new ProductSyncLog();
        BasicConvert.entityInit(e, e::setLogId);
        e.setSkcCode(resp.getExtCode());
        e.setProductId(resp.getProductId());
        e.setShopId(app.getShopId());
        e.setContent(JsonsKt.toJson(resp));
        e.setSyncTimes(0);
        e.setSyncStatus(Bool.NO.getCode());
        e.setPlatformCode("TEMU");
        e.setBatchNo(no);
        return e;
    }

    private Product obtain(final TemuSyncProductDTO dto, final ProductSyncLog sync) {
        final var resp = dto.product();
        final var product = new Product();
        BasicConvert.entityInit(product, product::setProductId);
        product.setShopId(sync.getShopId());
        product.setPlatformProductId(resp.getProductId());
        product.setProductStatus(ProductStatusEnum.PUBLISHED.getCode());
        product.setHidden(Bool.NO.getCode());
        product.setStyleCode("");
        product.setStyleId(0L);
        product.setGroupId(0L);
        product.setProductName(resp.getProductName());
        product.setProductEnName("");
        product.setStyleImgUrl("");
        product.setMaterialImgUrl("");
        product.setSizeUrl("");
        product.setFreightTemplateId("");
        product.setPrices(new ArrayList<>());
        product.setWarehouses(new ArrayList<>());
        product.setSkuSpecs(new ArrayList<>());
        // 品类
        Optional.ofNullable(resp.getLeafCat()).ifPresent(it -> {
            product.setPlatformCategoryCode(Objects.toString(it.getCatId()));
            product.setPlatformCategoryName(it.getCatName());
        });
        // 货品半托管信息,里面没有仓库信息,需要用另外的接口去查询bg.goods.quantity.get
        Optional.ofNullable(resp.getProductSemiManaged())
                .ifPresent(it -> ship(it, product));
        // 图片处理
        final var mainImageUrl = resp.getMainImageUrl();
        final var images = new ArrayList<String>();
        if (StrUtil.isNotBlank(mainImageUrl)) {
            final var name = resp.getProductId() + "_" + FileUtil.getName(mainImageUrl);
            final var url = ImageUtils.upload(ImageUtils.download(mainImageUrl), name);
            product.setStyleImgUrl(url);
            product.setMaterialImgUrl(url);
            images.add(url);
        }
        Optional.ofNullable(resp.getCreatedAt())
                .ifPresent(it -> product.setOnShelvesTime(LocalDateTimeUtil.of(Instant.ofEpochMilli(it))));
        // skc
        skc(resp, product, images);
        // 款信息
        final var prototype = prototypeRepository.getByDesignCode(resp.getExtCode());
        if (Objects.nonNull(prototype)) {
            final var skc = product.getSkcs().getFirst();
            prototype(prototype, product);
            skc.setSkcId(prototype.getPrototypeId());
        } else {
            spot(resp, product);
        }
        whExtAttr(product);
        // 商品属性
        attr(resp, product);
        // 供货价
        final Map<Long, TemuProductSkuSupplierPriceResp> priceMap = Objects.nonNull(dto.price()) ? BasicConvert.toMap(dto.price().getProductSkuSupplierPriceList(),
                TemuProductSkuSupplierPriceResp::getProductSkuId) : Map.of();
        // 仓库
        final List<TemuProductSkuStockResp> stocks = Objects.nonNull(dto.stock()) ? dto.stock().getProductSkuStockList() : List.of();
        // sku概要信息列表
        summaries(resp, product, priceMap, stocks);
        final var dict = sizeDict();
        if (CollectionUtil.isNotEmpty(dict)) {
            final var attributeMap = BasicConvert.toMap(dict.getFirst().getAttributes(), AttributeVo::getName);
            final var sizes = new HashSet<String>();
            product.getSkuSpecs().stream().filter(it -> Objects.equals(3001L, it.getParentSpecId()))
                    .map(ProductSkuSpec::getSpecName).forEach(it -> {
                        final var size = attributeMap.get(it);
                        if (Objects.nonNull(size)) {
                            sizes.add(size.getCode());
                        }
                    });
            if (CollectionUtil.isNotEmpty(sizes))
                product.setSize(JsonsKt.toJson(sizes));
        }
        return product;
    }


    private void skc(final TemuProductPageDataResp resp, final Product product, final List<String> images) {
        final var skc = new ProductSkc();
        BasicConvert.entityInit(skc, skc::setProductSkcId);
        product.setSkcs(List.of(skc));
        skc.setSkcStatus(resp.getSkcSiteStatus());
        skc.setPlatformSkcId(resp.getProductSkcId());
        skc.setSkcCode(resp.getExtCode());
        skc.setShopId(product.getShopId());
        skc.setProductId(product.getProductId());
        skc.setSkcId(0L);
        if (CollectionUtil.isNotEmpty(images)) {
            skc.setCarouselUrl(String.join(StrUtil.COMMA, images));
        }
        skc.setSyncStatus(TemuSkcSyncStatusEnum.INIT.getCode());
        skc.setSyncTimes(0);
    }

    private void summaries(final TemuProductPageDataResp resp,
                           final Product product,
                           final Map<Long, TemuProductSkuSupplierPriceResp> priceMap,
                           final List<TemuProductSkuStockResp> stockList) {
        final var summaries = resp.getProductSkuSummaries();
        product.setSkus(new ArrayList<>());
        summaries.forEach(it -> skuSummary(it, product, priceMap, stockList));
    }

    private void skuSummary(final TemuProductPageSkuSummaryResp summary,
                            final Product product,
                            final Map<Long, TemuProductSkuSupplierPriceResp> priceMap,
                            final List<TemuProductSkuStockResp> stockList) {
        final var whAttr = summary.getProductSkuWhExtAttr();
        final var skc = product.getSkcs().getFirst();
        final var sku = new ProductSku();
        product.getSkus().add(sku);
        BasicConvert.entityInit(sku, sku::setProductSkuId);
        sku.setSkuState(skc.getSkcStatus());
        sku.setColor("");
        sku.setPlatformColor(skc.getPlatformColor());
        sku.setProductId(product.getProductId());
        sku.setPlatformSkuId(summary.getProductSkuId());
        sku.setSkuCode(summary.getExtCode());
        sku.setSkuId(0L);
        sku.setCurrencyType("CNY");
        // 供货价
        Optional.ofNullable(priceMap.get(summary.getProductSkuId()))
                .ifPresent(it -> it.getSiteSupplierPrices()
                        .forEach(s -> {
                            final var p = new ProductSkuSiteSupplierPrice();
                            BasicConvert.entityInit(p, p::setSupplierPriceId);
                            p.setSupplyPrice(fen2Yuan(s.getSupplierPrice().longValue()));
                            p.setProductId(product.getProductId());
                            p.setProductSkuId(sku.getProductSkuId());
                            p.setSiteId(s.getSiteId().longValue());
                            product.getPrices().add(p);
                        }));
        // 仓库库存
        stockList.stream()
                .filter(it -> Objects.equals(it.getProductSkuId(), summary.getProductSkuId()))
                .forEach(it -> {
                    final var sw = new ProductSkuWarehouse();
                    BasicConvert.entityInit(sw, sw::setWarehouseRouteId);
                    sw.setProductId(product.getProductId());
                    sw.setProductSkuId(sku.getProductSkuId());
                    sw.setWarehouseId(it.getWarehouseId());
                    sw.setTargetStockAvailable(Objects.toString(it.getSkuStockQuantity()));
                    product.getWarehouses().add(sw);
                });
        Optional.ofNullable(styleSkcSkuRepository.getByCode(summary.getExtCode()))
                .ifPresent(it -> sku.setSkuId(it.getSkuId()));
        sku.setProductSkcId(skc.getProductSkcId());
        // 重量,需要除以1000
        Optional.ofNullable(whAttr.getProductSkuWeight())
                .ifPresent(it -> sku.setVolumeWidth(it.getValue().longValue() / 1000));
        // 体积,需要除以10
        Optional.ofNullable(whAttr.getProductSkuVolume())
                .ifPresent(it -> {
                    sku.setVolumeHeight(it.getHeight().longValue() / 10);
                    sku.setVolumeWidth(it.getWidth().longValue() / 10);
                    sku.setVolumeLen(it.getLen().longValue() / 10);
                });
        specAttr(summary, product);
    }

    private void specAttr(final TemuProductPageSkuSummaryResp summary, final Product product) {
        final var specs = summary.getProductSkuSpecList();
        if (CollectionUtil.isEmpty(specs)) {
            return;
        }
        // 主要销售属性
        final var skc = product.getSkcs().getFirst();
        final var sku = product.getSkus().stream()
                .filter(it -> Objects.equals(it.getPlatformSkuId(), summary.getProductSkuId())).toList()
                .getFirst();
        final var first = specs.getFirst();
        final var spec = new ProductSkuMainSpec();
        BasicConvert.entityInit(spec, spec::setSkuSpecId);
        spec.setProductId(product.getProductId());
        spec.setProductSkcId(skc.getProductSkcId());
        spec.setParentSpecId(Long.valueOf(first.getParentSpecId()));
        spec.setParentSpecName(first.getParentSpecName());
        spec.setSpecId(Long.valueOf(first.getSpecId()));
        spec.setSpecName(first.getSpecName());
        product.setMainSpecs(List.of(spec));
        product.setSpecAttrs(specs.stream().map(it -> {
            final var attr = new ProductSpecAttr();
            final var skuSpec = new ProductSkuSpec();
            BasicConvert.entityInit(attr, attr::setAttrId);
            BasicConvert.entityInit(skuSpec, skuSpec::setSkuSpecId);
            skuSpec.setProductId(product.getProductId());
            skuSpec.setProductSkcId(skc.getProductSkcId());
            skuSpec.setProductSkuId(sku.getProductSkuId());
            attr.setProductId(sku.getProductSkuId());
            BasicConvert.copy(it, attr);
            BasicConvert.copy(it, skuSpec);
            product.getSkuSpecs().add(skuSpec);
            // 颜色
            if (Objects.equals(1001, it.getParentSpecId())) {
                if (StrUtil.isBlank(skc.getPlatformColor())) {
                    skc.setPlatformColor(it.getSpecName());
                }
            }
            return attr;
        }).toList());
    }

    private void attr(final TemuProductPageDataResp resp, final Product product) {
        final var properties = resp.getProductProperties();
        // 商品属性
        if (CollectionUtil.isEmpty(properties)) {
            return;
        }
        product.setAttrs(properties.stream().map(it -> {
            final var attr = new ProductAttr();
            attr.setProductId(product.getProductId());
            BasicConvert.entityInit(attr, attr::setAttrId);
            BasicConvert.copy(it, attr);
            return attr;
        }).toList());
    }

    private void whExtAttr(final Product product) {
        ProductConvert.whExtAttr(product);
    }

    private void ship(final TemuProductPageSemiManagedResp semi, final Product product) {
        Optional.ofNullable(semi.getProductShipment())
                .ifPresent(ship -> shipment(product, ship));
        // 站点
        final var sites = semi.getBindSites();
        if (CollectionUtil.isNotEmpty(sites)) {
            product.setSiteId(JsonsKt.toJson(sites.stream().map(TemuProductPageBindSiteResp::getSiteId).toList()));
        }
    }

    private void shipment(final Product product, final TemuProductPageShipmentResp ship) {
        final var second = ship.getShipmentLimitSecond();
        // 发货时效
        if (Objects.nonNull(second)) {
            product.setPromisedDeliveryDay((int) TimeUnit.SECONDS.toDays(second));
        }
        // 运费模板 ID
        product.setFreightTemplateId(ship.getFreightTemplateId());
    }

    private void spot(final TemuProductPageDataResp resp, final Product product) {
        final var skcs = this.spotStyleSkcRepository.listBySkcCodes(List.of(resp.getExtCode()));
        if (CollectionUtil.isEmpty(skcs)) {
            return;
        }
        final var skc = skcs.getFirst();
        final var productSkc = product.getSkcs().getFirst();
        productSkc.setSkcId(skc.getSkcId());
        product.setStyleType(SpotStyleTypeEnum.SPOT_STYLE.getVale());
        final var spot = this.spotStyleTaskRepository.obtainById(skc.getTaskId());
        product.setStyleCode(spot.getTaskCode());
        product.setStyleId(spot.getTaskId());
    }

    private void prototype(final Prototype prototype, final Product product) {
        final var style = designStyleRepository.getById(prototype.getDesignStyleId());
        if (StringUtils.isNotBlank(style.getStyleType())) {
            product.setStyleType(DesignStyleTypeEnum.from(style.getStyleType()).getVale());
        }
        product.setStyleCode(prototype.getStyleCode());
        product.setStyleId(prototype.getDesignStyleId());
    }

    private void syncTemuData(final List<TemuOrderSync> list, final Product product) {
        try {
            if (CollectionUtil.isNotEmpty(list) && StrUtil.isNotBlank(product.getStyleType())) {
                if (StrUtil.equalsIgnoreCase(SpotStyleTypeEnum.SPOT_STYLE.getVale(), product.getStyleType())) {
                    // 现货
                    list.forEach(spotStyleTaskService::temuSync);
                } else {
                    // 款式
                    list.forEach(prototypeService::temuOrderSync);
                }
            }
        } catch (Exception e) {
            log.error("推送动销失败\t{}", e.getLocalizedMessage(), e);
        }
    }

    private List<TemuOrderSync> syncTemuData(final Product product) {
        final var data = this.temuOrderRepository.listBySpuId(product.getPlatformProductId());
        if (CollectionUtil.isEmpty(data)) {
            return List.of();
        }
        product.addProductTag(ProductTagEnum.SALES_DRIVING_PRODUCT.getCode());
        if (StrUtil.isBlank(product.getStyleCode())) {
            return List.of();
        }
        final var list = new ArrayList<TemuOrderSync>();
        final var skcMap = BasicConvert.toMap(product.getSkcs(), ProductSkc::getPlatformSkcId);
        final var skuMap = BasicConvert.toMap(product.getSkus(), ProductSku::getPlatformSkuId);
        data.forEach(order -> {
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
            sync.setSpuCode(product.getStyleCode());
            sync.setSkcId(skc.getSkcId());
            skc.setOrderTime(order.getOrderCreatedTime());
            skc.setSalesDriving(Bool.YES.getCode());
            sync.setSkuId(order.getSkuId());
            if (Objects.nonNull(skuId)) {
                final var sku = skuMap.get(skuId);
                sku.setOrderTime(order.getOrderCreatedTime());
                sku.setSalesDriving(Bool.YES.getCode());
                sync.setSkuId(sku.getSkuId());
            }
            sync.setSkcSiteStatus(order.getSkcSiteStatus());
            sync.setSkcStatus(order.getSkcStatus());
            if (Objects.nonNull(order.getSpuId())) {
                sync.setProductId(Long.valueOf(order.getSpuId()));
            }
            sync.setSpuCode(order.getExtCode());
            sync.setOrderCode(order.getOrderCode());
            sync.setOrderStatus(order.getOrderStatus());
            sync.setOrderNumber(order.getOrderNumber());
            sync.setCommodityAttr(order.getCommodityAttr());
            sync.setOrderCreatedTime(order.getOrderCreatedTime());
            sync.setOrder(order);
            sync.setProduct(product);
            list.add(sync);
        });
        return list;
    }

    private TemuAppDTO getApp(final Long shopId) {
        final var app = this.shopService.getApp(shopId);
        app.setShopId(shopId);
        return app;
//        final var dto = new TemuAppDTO();
//        dto.setOrderToken("");
//        dto.setAccessToken("8b1nwwtia3oxxjk2o2plzqbmulmqqeewwzxydxmopc3fpclg84rq99b6");
//        dto.setAppKey("418ae454598d577dc69eb38c4905c8d9");
//        dto.setAppSecret("a10a67bdaf0740512424340dc0b90419731f80cf");
//        dto.setShopId(7426868264300446260L);
//        dto.setShopName("SeaSway Local");
//        return dto;
    }

    private BigDecimal fen2Yuan(final Long fen) {
        if (Objects.isNull(fen)) {
            return null;
        }
        final var decimal100 = new BigDecimal("100.00");
        return new BigDecimal(Objects.toString(fen)).divide(decimal100, 2, RoundingMode.HALF_UP);
    }

    private List<DictDTO> sizeDict() {
        // 尺码标准
        final var dict = dictClientExternal.listByDictCode(DictEnum.PLM_STANDARD_SIZE.getDictCode());
        final var list = new ArrayList<DictDTO>();
        BasicConvert.reverseDict(list, dict, null);
        return list.stream().filter(it -> StrUtil.equalsIgnoreCase("C99", it.getDictCode())).toList();
    }

    private void job(final Shop shop) {
//        this.syncReviewPrice(this.getApp(shop.getShopId()));
        this.syncReviewPrice(shop);
    }

    private void runWith(final Shop shop, final Runnable fn) {
        final var systemUser = authProperties.getSystemUser();
        final var user = UserInvoke.INSTANCE.user(systemUser.getId(), systemUser.getName(), shop.getTenantId(), 0L);
        UserInvoke.INSTANCE.doAction(user, () -> {
            fn.run();
            return 0;
        });
    }
}
