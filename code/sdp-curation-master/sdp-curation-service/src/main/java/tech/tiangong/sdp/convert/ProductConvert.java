package tech.tiangong.sdp.convert;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import lombok.experimental.UtilityClass;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.sequence.id.IdHelper;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.entity.*;
import tech.tiangong.sdp.enums.*;
import tech.tiangong.sdp.temu.vo.resp.TemuIdNameResp;
import tech.tiangong.sdp.utils.SsoContext;
import tech.tiangong.sdp.vo.dto.DesignerDTO;
import tech.tiangong.sdp.vo.dto.SuitDTO;
import tech.tiangong.sdp.vo.query.ProductQuery;
import tech.tiangong.sdp.vo.req.ProductAddReq;
import tech.tiangong.sdp.vo.req.ProductPageReq;
import tech.tiangong.sdp.vo.req.ProductSkcAddReq;
import tech.tiangong.sdp.vo.req.StyleOnShelvesReviewReq;
import tech.tiangong.sdp.vo.resp.*;

import java.util.*;

/**
 * 商品工具类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/18 16:35
 */
@UtilityClass
public class ProductConvert {
    public StyleOnShelvesReviewReq toReviewReq(final ProductAddReq req) {
        final var e = new StyleOnShelvesReviewReq();
        e.setPass(req.getPass());
        e.setReviewFailReason(req.getReviewFailReason());
        e.setStyleId(req.getStyleId());
        return e;
    }

    public StyleReviewLog reviewLog(final ProductAddReq req) {
        final var e = new StyleReviewLog();
        e.setReviewFailReason(req.getReviewFailReason());
        e.setReviewStatus(Bool.NO.getCode());
        if (Objects.nonNull(req.getPass()) && req.getPass()) {
            e.setReviewStatus(Bool.YES.getCode());
        }
        e.setStyleId(req.getStyleId());
        e.setContent(JsonsKt.toJson(req));
        BasicConvert.entityInit(e, e::setLogId);
        return e;
    }


    public Product convert(final ProductAddReq req, final StyleOnShelves style) {
        final var product = product(req, style);
        attrs(req, product);
        specAttrs(req, product, true);
        skcs(req, product, true);
        sizes(req, product, true);
        return product;
    }


    public void convert(final ProductAddReq req, final Product product) {
        product.setTaskOptType(TemuTaskOptTypeEnum.EDIT_SKC);
        product.setTaskParentId(IdHelper.getId());
        BasicConvert.setRevised(product);
        product.setTasks(new ArrayList<>());
        product.setFiles(new ArrayList<>());
        product.setMainSpecs(new ArrayList<>());
        product.setSkus(new ArrayList<>());
        product.setPrices(new ArrayList<>());
        product.setSkuSpecs(new ArrayList<>());
        product.setSkcs(new ArrayList<>());
        product.setSizeParts(new ArrayList<>());
        product.setSize(JsonsKt.toJson(req.getSizes()));
        product.setWarehouses(new ArrayList<>());
        specAttrs(req, product, false);
        skcs(req, product, false);
        // 先注释,复色多尺码前端处理不了
        sizes(req, product, false);
        product.getTasks().add(temuTask(TemuTaskTypeEnum.PRODUCT_ADD, product));
    }

    public void addNewSkcToProduct(final ProductAddReq req, final Product product) {
        final var skcs = req.getSkcReqs();
        if (CollectionUtil.isEmpty(skcs)) {
            return;
        }
        product.setSkcs(new ArrayList<>());
        product.setSkus(new ArrayList<>());
        skcs.forEach(it -> {
            final var skc = new ProductSkc();
            BasicConvert.copy(it, skc);
            product.getSkcs().add(skc);
            BasicConvert.entityInit(skc, skc::setProductSkcId);
            skc.setPlatformSkcId(0L);
            skc.setShopId(product.getShopId());
            skc.setProductId(product.getProductId());
            skc.setCarouselUrl(String.join(StrUtil.COMMA, it.getImages()));
            skc.setSyncStatus(TemuSkcSyncStatusEnum.INIT.getCode());
            skc.setSyncTimes(0);
            skc.setSkcState(Bool.NO.getCode());
            final var skus = it.getSkuReqs();
            if (CollectionUtil.isNotEmpty(skus)) {
                skus.forEach(s -> {
                    final var sku = new ProductSku();
                    product.getSkus().add(sku);
                    BasicConvert.copy(s, sku);
                    sku.setPlatformSkuId(0L);
                    sku.setColor(skc.getColor());
                    sku.setPlatformColor(skc.getPlatformColor());
                    sku.setProductId(product.getProductId());
                    sku.setProductSkcId(skc.getProductSkcId());
                    sku.setSkuState(Bool.NO.getCode());
                    // 单品默认是1
                    if (sku.singleSku()) {
                        sku.setNumberOfPieces(1);
                    }
                    sku.setCurrencyType("CNY");
                    BasicConvert.entityInit(sku, sku::setProductSkuId);
                });
            }
        });
    }

    public ProductQuery buildWebPage(final ProductPageReq req) {
        final var q = BasicConvert.copy(req, ProductQuery.class);
        q.setTenantId(SsoContext.tenantId());
        q.setHidden(Bool.NO.getCode());
        q.setDeleted(Bool.NO.getCode());
        if (StrUtil.isNotBlank(req.getPlatformProductId())) {
            q.setPlatformProductIds(StrUtil.split(req.getPlatformProductId()
                            .replaceAll(" ", StrUtil.COMMA), StrUtil.COMMA)
                    .stream().map(Long::parseLong).toList());
        }
        if (StrUtil.isNotBlank(req.getStyleCode())) {
            q.setStyleCodes(StrUtil.split(req.getStyleCode()
                    .replaceAll(" ", StrUtil.COMMA), StrUtil.COMMA));
        }
        if (StrUtil.isNotBlank(req.getSkcCode())) {
            q.setSkcCodes(StrUtil.split(req.getSkcCode()
                    .replaceAll(" ", StrUtil.COMMA), StrUtil.COMMA));
        }
        if (StrUtil.isNotBlank(req.getSkuCode())) {
            q.setSkuCodes(StrUtil.split(req.getSkuCode()
                    .replaceAll(" ", StrUtil.COMMA), StrUtil.COMMA));
        }
        if (StrUtil.isNotBlank(req.getPlatformSkcId())) {
            q.setPlatformSkcIds(StrUtil.split(req.getPlatformSkcId()
                            .replaceAll(" ", StrUtil.COMMA), StrUtil.COMMA)
                    .stream().map(Long::parseLong).toList());
        }
        if (StrUtil.isNotBlank(req.getPlatformSkuId())) {
            q.setPlatformSkuIds(StrUtil.split(req.getPlatformSkuId()
                            .replaceAll(" ", StrUtil.COMMA), StrUtil.COMMA)
                    .stream().map(Long::parseLong).toList());
        }
        return q;
    }

    public ProductPageResp convert(final Product product, final Map<Long, List<ProductSkc>> skcMap,
                                   final Map<Long, List<ProductSku>> skuMap,
                                   final Map<Long, Shop> shopMap,
                                   final Map<Long, DesignerDTO> mapDesigner,
                                   final Map<Long, SkcOnShelves> skcGroup,
                                   final Map<Long,DesignStyle> styleMap) {
        final var resp = new ProductPageResp();
        BasicConvert.copy(product, resp);
        Optional.ofNullable(shopMap.get(product.getShopId())).ifPresent(it -> {
            resp.setStoreId(it.getShopId());
            resp.setStoreName(it.getShopName());
            resp.setBusinessOperatorId(it.getBusinessOperatorId());
            resp.setBusinessOperatorName(it.getBusinessOperatorName());
        });
        Optional.ofNullable(mapDesigner.get(product.getDesignerId())).ifPresent(it -> resp.setDesignerGroupName(it.getDesignerGroupName()));
        Optional.ofNullable(styleMap.get(product.getStyleId())).ifPresent(it -> resp.setProjectTypeName(it.getProjectTypeName()));
        if (StrUtil.isNotBlank(product.getProductTag())) {
            resp.setLabels(JsonsKt.parseJsonList(product.getProductTag(), String.class));
        }
        resp.setOnShelvesId(product.getOnShelverId());
        resp.setOnShelvesName(product.getOnShelverName());
        resp.setOnShelvesTime(product.getOnShelvesTime());
        resp.setCategoryCode(product.getPlatformCategoryCode());
        resp.setCategoryName(product.getPlatformCategoryName());
        resp.setWaveBandName(product.getWavebandName());
        final var map = BasicConvert.groupingBy(skuMap.get(product.getProductId()), ProductSku::getProductSkcId);
        resp.setSkcs(skcMap.get(product.getProductId()).stream().map(it -> {
            final var skc = BasicConvert.copy(it, ProductSkcListResp.class);
            skc.setSkus(map.get(it.getProductSkcId()).stream().map(s -> BasicConvert.copy(s, ProductSkuListResp.class)).toList());
            Optional.ofNullable(skcGroup.get(it.getSkcId())).ifPresent(s -> skc.setPreDisassemblyState(s.getPreDisassemblyState()));
            return skc;
        }).toList());
        return resp;
    }

    public ProductResp convert(final Product product, final Shop shop, final List<DesignerDTO> designers,
                               final Map<Long, SkcOnShelves> skcGroup) {
        final var resp = new ProductResp();
        BasicConvert.copy(product, resp);
        if (StrUtil.isNotBlank(product.getProductTag())) {
            resp.setLabels(JsonsKt.parseJsonList(product.getProductTag(), String.class));
        }
        if (StrUtil.isNotBlank(product.getSize())) {
            resp.setSizes(JsonsKt.parseJsonList(product.getSize(), String.class));
        }
        if (StrUtil.isNotBlank(product.getSiteId())) {
            resp.setSiteIds(JsonsKt.parseJsonList(product.getSiteId(), Long.class));
        }
        if (StrUtil.isNotBlank(product.getSizeUrl())) {
            resp.setSizeImages(StrUtil.split(product.getSizeUrl(), StrUtil.COMMA));
        }
        if (StrUtil.isNotBlank(product.getSize())) {
            resp.setSizes(JsonsKt.parseJsonList(product.getSize(), String.class));
        }
        Optional.ofNullable(shop).ifPresent(it -> {
            resp.setStoreId(it.getShopId());
            resp.setStoreName(it.getShopName());
            resp.setBusinessOperatorId(it.getBusinessOperatorId());
            resp.setBusinessOperatorName(it.getBusinessOperatorName());
        });
        if (CollectionUtil.isNotEmpty(designers)) {
            resp.setDesignerGroupName(designers.getFirst().getDesignerGroupName());
        }
        resp.setCatId(Integer.valueOf(product.getPlatformCategoryCode()));
        resp.setCatName(product.getPlatformCategoryName());
        resp.setOnShelvesId(product.getOnShelverId());
        resp.setOnShelvesName(product.getOnShelverName());
        resp.setOnShelvesTime(product.getOnShelvesTime());
        resp.setWarehouseIds(product.getWarehouseRoutes().stream().map(ProductWarehouseRoute::getWarehouseId).distinct().toList());
        resp.setAttrs(product.getAttrs().stream().map(it -> BasicConvert.copy(it, ProductAttrResp.class)).toList());
        resp.setSpecAttrs(product.getSpecAttrs().stream().map(it -> BasicConvert.copy(it, ProductSpecAttrResp.class)).toList());
        final var partMap = BasicConvert.groupingBy(product.getSizeParts(), ProductSizePart::getProductSizeId);
        final var skuMap = BasicConvert.groupingBy(product.getSkus(), ProductSku::getProductSkcId);
        final var mainSpecMap = BasicConvert.groupingBy(product.getMainSpecs(), ProductSkuMainSpec::getProductSkcId);
        final var skuSpecMap = BasicConvert.groupingBy(product.getSkuSpecs(), ProductSkuSpec::getProductSkuId);
        final var warehouseMap = BasicConvert.groupingBy(product.getWarehouses(), ProductSkuWarehouse::getProductSkuId);
        final var priceMap = BasicConvert.groupingBy(product.getPrices(), ProductSkuSiteSupplierPrice::getProductSkuId);
        resp.setSizeTemplates(product.getProductSizes().stream().map(it -> {
            final var temp = new ProductSizeTemplateResp();
            BasicConvert.copy(it, temp);
            temp.setName(it.getTemplateName());
            temp.setShow(Bool.NO);
            if (Objects.nonNull(it.getShowSize()) && Objects.equals(it.getShowSize(), Bool.YES.getCode())) {
                temp.setShow(Bool.YES);
            }
            if (StrUtil.isNotBlank(it.getElement())) {
                temp.setElementList(JsonsKt.parseJsonList(it.getElement(), TemuIdNameResp.class));
            }
            temp.setParts(partMap.get(it.getProductSizeId()).stream().map(p -> {
                final var part = BasicConvert.copy(p, ProductSizePartResp.class);
                part.setSizePartId(p.getSizePartId());
                part.setPartId(p.getPartId());
                part.setPartName(p.getPartName());
                part.setDiff(p.getPartDiff());
                part.setValue(p.getPartValue());
                return part;
            }).toList());
            return temp;
        }).toList());
        resp.setSkcs(product.getSkcs().stream().map(it -> {
            final var skc = BasicConvert.copy(it, ProductSkcResp.class);
            if (StrUtil.isNotBlank(it.getCarouselUrl())) {
                skc.setImages(StrUtil.split(it.getCarouselUrl(), StrUtil.COMMA));
            }
            if (null != mainSpecMap.get(it.getProductSkcId())) {
                skc.setMainSpecs(mainSpecMap.get(it.getProductSkcId()).stream().map(m -> BasicConvert.copy(m, ProductSkcMainSpecResp.class)).toList());
            }
            Optional.ofNullable(skcGroup.get(it.getSkcId())).ifPresent(s -> skc.setPreDisassemblyState(s.getPreDisassemblyState()));
            skc.setSkus(skuMap.get(it.getProductSkcId()).stream().map(s -> {
                final var sku = BasicConvert.copy(s, ProductSkuResp.class,"packingList");
                sku.setLen(null != s.getVolumeLen() ? s.getVolumeLen().intValue() : 0);
                sku.setWidth(null != s.getVolumeWidth() ? s.getVolumeWidth().intValue() : 0);
                sku.setHeight(null != s.getVolumeHeight() ? s.getVolumeHeight().intValue() : 0);
                sku.setSkuWeightValue(null != s.getWeight() ? s.getWeight().intValue() : 0);
                final var prices = priceMap.get(s.getProductSkuId());
                if (CollectionUtil.isNotEmpty(prices)) {
                    sku.setSupplierPrice(prices.getFirst().getSupplierPrice());
                }
                if (null != skuSpecMap.get(s.getProductSkuId())) {
                    sku.setSkuSpecs(skuSpecMap.get(s.getProductSkuId()).stream().map(m -> BasicConvert.copy(m, ProductSkuSpecResp.class)).toList());
                }
                if (null != warehouseMap.get(s.getProductSkuId())) {
                    sku.setWarehouseStockQuantities(warehouseMap.get(s.getProductSkuId()).stream().map(m -> BasicConvert.copy(m, WarehouseStockQuantityResp.class)).toList());
                }
                if (StrUtil.isNotBlank(s.getPackingList())) {
                    sku.setPackingList(JsonsKt.parseJsonList(s.getPackingList(), SuitDTO.class));
                }
                return sku;
            }).toList());
            return skc;
        }).toList());
        return resp;
    }

    public void toTask(final Product product) {
        final var files = new ArrayList<TemuProductFile>();
        final var tasks = new ArrayList<TemuTask>();
        product.setTaskOptType(TemuTaskOptTypeEnum.ADD);
        product.setFiles(files);
        product.setTasks(tasks);
        product.setTaskParentId(IdHelper.getId());
        final var sizes = product.getProductSizes();
        if (CollectionUtil.isNotEmpty(sizes)) {
            sizes.forEach(it -> {
                final var t = temuTask(TemuTaskTypeEnum.SIZE_TEMPLATE, product);
                t.setBusId(it.getProductSizeId());
                tasks.add(t);
            });
        }
        if (StrUtil.isNotBlank(product.getVideoUrl())) {
            final var f = productFile(product);
            f.setFileUrl(product.getVideoUrl());
            f.setFileType(ProductFileTypeEnum.VIDEO.getCode());
            files.add(f);
            final var t = temuTask(TemuTaskTypeEnum.VIDEO, product);
            t.setBusId(f.getFileId());
            tasks.add(t);
        }
        if (StrUtil.isNotBlank(product.getMaterialImgUrl())) {
            final var f = productFile(product);
            f.setFileUrl(product.getMaterialImgUrl());
            f.setFileType(ProductFileTypeEnum.MATERIAL_IMAGE.getCode());
            files.add(f);
            final var t = temuTask(TemuTaskTypeEnum.FILE, product);
            t.setBusId(f.getFileId());
            tasks.add(t);
        }
        final var skcs = product.getSkcs();
        if (CollectionUtil.isNotEmpty(skcs)) {
            skcs.stream().filter(it -> StrUtil.isNotBlank(it.getCarouselUrl())).forEach(it -> StrUtil.split(it.getCarouselUrl(), StrUtil.COMMA).forEach(url -> {
                final var f = productFile(product);
                f.setFileUrl(url);
                f.setFileType(ProductFileTypeEnum.CAROUSEL_IMAGE.getCode());
                f.setProductSkcId(it.getProductSkcId());
                files.add(f);
                final var t = temuTask(TemuTaskTypeEnum.FILE, product);
                t.setBusId(f.getFileId());
                tasks.add(t);
            }));
        }
        final var t = temuTask(TemuTaskTypeEnum.PRODUCT_ADD, product);
        tasks.add(t);
    }

    public TemuProductFile productFile(final Product product) {
        final var file = new TemuProductFile();
        BasicConvert.entityInit(file, file::setFileId);
        file.setProductId(product.getProductId());
        file.setProductSkcId(0L);
        file.setCoverUrl("");
        file.setFileHeight(0L);
        file.setFileWidth(0L);
        file.setPushTimes(0);
        file.setPushStatus(Bool.NO.getCode());
        return file;
    }

    public TemuTask temuTask(final TemuTaskTypeEnum type, final Product product) {
        final var e = new TemuTask();
        e.setPushStatus(Bool.NO.getCode());
        e.setPushTimes(Bool.NO.getCode());
        e.setProductId(product.getProductId());
        e.setTaskType(type.getCode());
        e.setBusId(product.getProductId());
        e.setTaskCode(product.getStyleCode());
        if (Objects.nonNull(product.getTaskOptType())) {
            e.setOptType(product.getTaskOptType().getCode());
        }
        e.setParentId(product.getTaskParentId());
        BasicConvert.entityInit(e, e::setTaskId);
        return e;
    }

    public void whExtAttr(final Product product) {
        final var ext = new ProductWhExtAttr();
        ext.setProductId(product.getProductId());
        ext.setRegionId("43000000000006");
        ext.setCountryShortName("CN");
        ext.setOuterGoodsUrl("");
        BasicConvert.entityInit(ext, ext::setAttrId);
        product.setExtAttrs(List.of(ext));
    }

    private Product product(final ProductAddReq req, final StyleOnShelves style) {
        final var product = new Product();
        BasicConvert.copy(req, product);
        BasicConvert.entityInit(product, product::setProductId);
        product.setPlatformProductId(0L);
        product.setShopId(req.getStoreId());
        product.setProductStatus(ProductStatusEnum.DRAFT.getCode());
        if (CollectionUtil.isNotEmpty(req.getSizeImages())) {
            product.setSizeUrl(String.join(StrUtil.COMMA, req.getSizeImages()));
        }
        product.setTasks(new ArrayList<>());
        product.setSkcs(new ArrayList<>());
        product.setSkus(new ArrayList<>());
        product.setMainSpecs(new ArrayList<>());
        product.setPrices(new ArrayList<>());
        product.setSkuSpecs(new ArrayList<>());
        product.setDesignerId(style.getDesignerId());
        product.setDesignerName(style.getDesignerName());
        product.setOnShelverId(style.getCreatorId());
        product.setOnShelverName(style.getCreatorName());
        product.setStyleLabelCode(style.getStyleLabelCode());
        product.setStyleLabelName(style.getStyleLabelName());
        product.setWavebandCode(style.getWaveBandCode());
        product.setWavebandName(style.getWaveBandName());
        product.setStyleType(style.getStyleType());
        product.setSiteId(JsonsKt.toJson(req.getSiteIds()));
        product.setSize(JsonsKt.toJson(req.getSizes()));
        product.setPlatformCategoryCode(Objects.toString(req.getCatId()));
        product.setPlatformCategoryName(req.getCatName());
        Optional.ofNullable(req.getVideo()).ifPresent(it -> product.setVideoUrl(it.getVideoUrl()));
        product.setWarehouses(new ArrayList<>());
        product.setWarehouseRoutes(new ArrayList<>());
        product.setSizeParts(new ArrayList<>());
        req.getSiteIds().forEach(id -> req.getWarehouseIds().forEach(it -> {
            final var w = new ProductWarehouseRoute();
            w.setProductId(product.getProductId());
            w.setWarehouseId(it);
            w.setSiteId(id);
            BasicConvert.entityInit(w, w::setWarehouseRouteId);
            product.getWarehouseRoutes().add(w);
        }));
        whExtAttr(product);
        product.setHidden(Bool.YES.getCode());
        return product;
    }


    private void sizes(final ProductAddReq req, final Product product, final boolean add) {
        final var sizes = req.getSizeReqs();
        if (CollectionUtil.isEmpty(sizes)) {
            return;
        }
        product.setProductSizes(sizes.stream().filter(it -> add || it.add()).map(it -> {
            final var size = new ProductSize();
            BasicConvert.entityInit(size, size::setProductSizeId);
            size.setProductId(product.getProductId());
            size.setShowSize(Bool.NO.getCode());
            if (Objects.nonNull(it.getShow())) {
                size.setShowSize(it.getShow().getCode());
            }
            size.setTemplateName(it.getName());
            final var srs = it.getSizeReqs();
            final var sizeSet = new HashSet<String>();
            final var platformSizeSet = new HashSet<String>();
            size.setElement(JsonsKt.toJson(it.getElementList()));
            srs.forEach(s -> {
                sizeSet.add(s.getSize());
                platformSizeSet.add(s.getPlatformSize());
                s.getValues().forEach(val -> {
                    final var part = new ProductSizePart();
                    BasicConvert.entityInit(part, part::setSizePartId);
                    part.setProductId(product.getProductId());
                    part.setProductSizeId(size.getProductSizeId());
                    part.setSize(s.getSize());
                    part.setPlatformSize(s.getPlatformSize());
                    part.setPartDiff(val.getDiff());
                    part.setPartValue(val.getValue());
                    part.setPartId(val.getPart().longValue());
                    part.setPartName(val.getPartName());
                    product.getSizeParts().add(part);
                });
            });
            size.setSize(String.join(StrUtil.COMMA, sizeSet));
            size.setPlatformSize(String.join(StrUtil.COMMA, platformSizeSet));
            if (!add && it.add()) {
                final var t = temuTask(TemuTaskTypeEnum.SIZE_TEMPLATE, product);
                t.setBusId(size.getProductSizeId());
                product.getTasks().add(t);
            }
            return size;
        }).toList());
    }

    private void skcs(final ProductAddReq req, final Product product, final boolean add) {
        final var skcs = req.getSkcReqs();
        if (CollectionUtil.isEmpty(skcs)) {
            return;
        }
        // 新增商品||或者编辑SKC
        skcs.stream().filter(it -> add || it.update()).forEach(it -> {
            final var skc = new ProductSkc();
            BasicConvert.copy(it, skc);
            product.getSkcs().add(skc);
            skc.setSkcState(Bool.YES.getCode());
            skc.setPlatformSkcId(0L);
            skc.setShopId(product.getShopId());
            skc.setProductId(product.getProductId());
            if (add) {
                BasicConvert.entityInit(skc, skc::setProductSkcId);
            } else {
                BasicConvert.setRevised(skc);
            }
            skc.setCarouselUrl(String.join(StrUtil.COMMA, it.getImages()));
            skc.setSyncStatus(TemuSkcSyncStatusEnum.INIT.getCode());
            skc.setSyncTimes(0);
            if (it.update()) {
                it.getImages().forEach(url -> {
                    final var f = productFile(product);
                    f.setFileUrl(url);
                    f.setFileType(ProductFileTypeEnum.CAROUSEL_IMAGE.getCode());
                    f.setProductSkcId(it.getProductSkcId());
                    product.getFiles().add(f);
                    final var t = temuTask(TemuTaskTypeEnum.FILE, product);
                    t.setBusId(f.getFileId());
                    product.getTasks().add(t);
                });
            }
            mainSpecs(it, skc, product, add);
            skus(it, skc, product, add);
        });
    }

    private void skus(final ProductSkcAddReq req, final ProductSkc skc, final Product product, final boolean add) {
        final var skus = req.getSkuReqs();
        if (CollectionUtil.isEmpty(skus)) {
            return;
        }
        final var warehouses = product.getWarehouses();
        final var siteIds = JsonsKt.parseJsonList(product.getSiteId(), Long.class);
        // 新增商品||或者新增SKU||或者编辑SKU
        skus.stream().filter(it -> add || it.add() || it.update()).forEach(it -> {
            final var sku = new ProductSku();
            product.getSkus().add(sku);
            BasicConvert.copy(it, sku);
            sku.setPlatformSkuId(0L);
            sku.setSkuState(Bool.YES.getCode());
            sku.setColor(skc.getColor());
            sku.setPlatformColor(skc.getPlatformColor());
            sku.setProductId(product.getProductId());
            sku.setProductSkcId(skc.getProductSkcId());
            sku.setVolumeHeight(it.getHeight().longValue());
            sku.setVolumeWidth(it.getWidth().longValue());
            sku.setVolumeLen(it.getLen().longValue());
            sku.setWeight(it.getSkuWeightValue().longValue());
            sku.setNumberOfPieces(it.getNumberOfPieces());
            if (CollectionUtil.isNotEmpty(it.getPackingList())) {
                sku.setPackingList(JsonsKt.toJson(it.getPackingList()));
            }
            // 单品默认是1
            if (sku.singleSku()) {
                sku.setNumberOfPieces(1);
            }
            // 币种 (CNY: 人民币, USD: 美元) (默认人民币)
            sku.setCurrencyType("CNY");
            if (add || it.add()) {
                BasicConvert.entityInit(sku, sku::setProductSkuId);
            } else {
                BasicConvert.setRevised(sku);
            }
            product.getPrices().addAll(siteIds.stream().map(id -> {
                final var p = new ProductSkuSiteSupplierPrice();
                p.setSupplierPrice(it.getSupplierPrice());
                p.setProductId(product.getProductId());
                p.setProductSkuId(sku.getProductSkuId());
                p.setSiteId(id);
                BasicConvert.entityInit(p, p::setSupplierPriceId);
                return p;
            }).toList());
            it.getWarehouseStockQuantityReqs().forEach(w -> {
                final var sw = new ProductSkuWarehouse();
                BasicConvert.entityInit(sw, sw::setWarehouseRouteId);
                sw.setProductId(product.getProductId());
                sw.setProductSkuId(sku.getProductSkuId());
                sw.setWarehouseId(w.getWarehouseId());
                sw.setTargetStockAvailable(w.getTargetStockAvailable());
                warehouses.add(sw);
            });
            product.getSkuSpecs().addAll(it.getSkuSpecReqs().stream().map(s -> {
                final var spec = new ProductSkuSpec();
                BasicConvert.copy(s, spec);
                BasicConvert.entityInit(spec, spec::setSkuSpecId);
                spec.setProductId(product.getProductId());
                spec.setProductSkuId(sku.getProductSkuId());
                spec.setProductSkcId(sku.getProductSkcId());
                return spec;
            }).toList());
        });
    }

    private void mainSpecs(final ProductSkcAddReq req, final ProductSkc skc, final Product product, final boolean add) {
        final var specAttrs = req.getMainSpecReqs();
        if (CollectionUtil.isEmpty(specAttrs)) {
            return;
        }
        specAttrs.stream().filter(it -> add || it.add()).forEach(it -> {
            final var spec = new ProductSkuMainSpec();
            BasicConvert.copy(it, spec);
            spec.setProductId(product.getProductId());
            spec.setProductSkcId(skc.getProductSkcId());
            BasicConvert.entityInit(spec, spec::setSkuSpecId);
            product.getMainSpecs().add(spec);
        });
    }

    private void specAttrs(ProductAddReq req, final Product product, final boolean add) {
        final var specAttrs = req.getSpecAttrs();
        if (CollectionUtil.isEmpty(specAttrs)) {
            return;
        }
        product.setSpecAttrs(specAttrs.stream().filter(it -> add || it.add()).map(it -> {
            final var attr = new ProductSpecAttr();
            BasicConvert.copy(it, attr);
            attr.setProductId(product.getProductId());
            BasicConvert.entityInit(attr, attr::setAttrId);
            return attr;
        }).toList());
    }

    private void attrs(final ProductAddReq req, final Product product) {
        final var attrs = req.getAttrs();
        if (CollectionUtil.isEmpty(attrs)) {
            return;
        }
        product.setAttrs(attrs.stream().map(it -> {
            final var attr = new ProductAttr();
            BasicConvert.copy(it, attr);
            attr.setProductId(product.getProductId());
            BasicConvert.entityInit(attr, attr::setAttrId);
            return attr;
        }).toList());
    }
}
