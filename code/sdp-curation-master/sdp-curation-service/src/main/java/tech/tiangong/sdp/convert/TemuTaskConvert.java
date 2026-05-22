package tech.tiangong.sdp.convert;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import jakarta.validation.ValidationException;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.entity.*;
import tech.tiangong.sdp.enums.TemuSizeEnum;
import tech.tiangong.sdp.temu.vo.dto.TemuSizeChartsContentMetaDTO;
import tech.tiangong.sdp.temu.vo.dto.TemuSizeChartsContentRecordDTO;
import tech.tiangong.sdp.temu.vo.req.*;
import tech.tiangong.sdp.temu.vo.resp.TemuIdNameResp;
import tech.tiangong.sdp.vo.dto.SuitDTO;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.function.BiConsumer;
import java.util.stream.Collectors;

/**
 * Temu任务工具类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/18 16:35
 */
@UtilityClass
@Slf4j
public class TemuTaskConvert {
    /*
  ----请求----
{"type": "bg.goods.sizecharts.create", "timestamp": 1751012517, "app_key": "47bb4bb7769e12d9f7aa93cf029fe529", "data_type": "JSON", "access_token": "dezmbeow3ennvuwsrjdgsusvoxzedy7yu2eognml5w2pjpzqhf9wpyp9",
"catId": 29069, "classId": 5,
"content": {"generalSizeType": 1, "localSizeSource": 1,
"meta": {"elementList": [{"id": 10002, "name": "胸围全围"}, {"id": 10003, "name": "衣长"}],
"groupList": [{"id": 1, "name": "尺码"}]},
"records": [{"values": {"1": "S", "10002": "60", "10003": "60"}}]}, "name": "test", "reusable": false,
"sign": "B7209D2165C7C648E3C774DFD4340EB5"}
   */
    public TemuSizeChartsCreateReq buildSizeCreateReq(final ProductSize size,
                                                      final TemuProductCategory category,
                                                      final Product product) {
        final TemuSizeChartsCreateReq req = new TemuSizeChartsCreateReq();
        try {
            final var mapPart = BasicConvert.groupingBy(size.getSizeParts(), ProductSizePart::getSize);
            req.setName(category.getCategoryName() + "-尺码模板");
            if (StrUtil.isNotBlank(size.getTemplateName())) {
                req.setName(size.getTemplateName());
            }
            final var klass = category.getSizeClass();
            req.setClassId(klass.getClassId().intValue());
            // 非套装
            if (Objects.equals(Bool.NO.getCode(), category.getSuiting())) {
                req.setCatId(category.getCategoryId());
            }
            req.setReusable(false);
            final var content = new TemuSizeChartsContentReq();
            /* ** 不知道什么意思,但是必填的**/
            content.setLocalSizeSource(1);
            content.setGeneralSizeType(1);
            /* ** 不知道什么意思,但是必填的**/
            req.setContent(content);
            final var mate = new TemuSizeChartsContentMetaDTO();
            content.setMeta(mate);
            final var records = new ArrayList<TemuSizeChartsContentRecordDTO>();
            content.setRecords(records);
            final var groupMate = new TemuIdNameResp();
            groupMate.setId(Long.valueOf(TemuSizeEnum.SIZE.getCode()));
            groupMate.setName(TemuSizeEnum.SIZE.getVale());
            mate.setGroupList(List.of(groupMate));
            //尺码顺序
            final var sizes = JsonsKt.parseJsonList(product.getSize(), String.class);
            sizes.forEach(s -> {
                final var rm = new TemuSizeChartsContentRecordDTO();
                final var parts = mapPart.get(s);
                final Map<String, String> values = new HashMap<>();
                values.putIfAbsent(TemuSizeEnum.SIZE.getCode(), parts.getFirst().getPlatformSize());
                parts.forEach(it ->
                        values.putIfAbsent(Objects.toString(it.getPartId()),
                                it.getPartValue().setScale(2, RoundingMode.HALF_UP).toString())
                );
                rm.setValues(values);
                records.add(rm);
            });
//        mapPart.forEach((k, v) -> {
//            final var rm = new TemuSizeChartsContentRecordDTO();
//            final Map<String, String> values = new HashMap<>();
//            values.putIfAbsent(TemuSizeEnum.SIZE.getCode(), k);
//            v.forEach(it ->
//                    values.putIfAbsent(Objects.toString(it.getPartId()),
//                            it.getPartValue().setScale(2, RoundingMode.HALF_UP).toString())
//            );
//            rm.setValues(values);
//            records.add(rm);
//        });
            mate.setElementList(JsonsKt.parseJsonList(size.getElement(), TemuIdNameResp.class));
        } catch (Exception e) {
            log.error("构建尺码模板参数失败\t{}", e.getLocalizedMessage(), e);
            throw new ValidationException("尺码信息不合法,请重新维护尺码信息");
        }
        return req;
    }

    public TemuProductEditPicturesReq buildProductPictureReq(final Product product) {
        final var req = new TemuProductEditPicturesReq();
        final var fileIds = product.getTasks().stream().map(TemuTask::getBusId).collect(Collectors.toSet());
        final var files = product.getFiles().stream()
                .filter(it -> fileIds.contains(it.getFileId())).toList();
        req.setProductId(product.getPlatformProductId());
        // 设置素材
        files.stream()
                .filter(TemuProductFile::material).findFirst()
                .ifPresentOrElse(it -> req.setMaterialImgUrl(it.getTemuFileUrl()),
                        () -> req.setMaterialImgUrl(null));
        final var videos = files.stream()
                .filter(TemuProductFile::video).toList();
        if (CollectionUtil.isNotEmpty(videos)) {
            // 设置视频
            req.setProductCarouseVideoReqList(videos.stream()
                    .map(it -> {
                        final var video = new TemuGoodsAddReq.ProductCarouseVideoReq();
                        video.setVideoUrl(it.getTemuFileUrl());
                        video.setCoverUrl(it.getCoverUrl());
                        video.setWidth(it.getFileWidth().intValue());
                        video.setHeight(it.getFileHeight().intValue());
                        video.setVid(it.getExtVal());
                        return video;
                    }).toList());
        } else {
            req.setProductCarouseVideoReqList(List.of());
        }
        final var images = files.stream()
                .filter(TemuProductFile::carousel).toList();
        if (CollectionUtil.isNotEmpty(images)) {
            final var list = new ArrayList<TemuProductEditPictureSkcReq>();
            BasicConvert.groupingBy(images, TemuProductFile::getProductSkcId).forEach((k, v) -> {
                final var e = new TemuProductEditPictureSkcReq();
                e.setSkcId(k);
                e.setPreviewImgUrls(v.stream().map(TemuProductFile::getTemuFileUrl).toList());
                list.add(e);
            });
            req.setSkcList(list);
        } else {
            req.setSkcList(List.of());
        }
        return req;
    }

    public TemuGoodsAddReq buildGoodsAddReq(final Product product, final List<TemuProductCategory> cats) {
        final var req = setCategory(product, cats);
        req.setProductName(product.getProductName());
        try {
            // 设置尺码
            req.setSizeTemplateIds(JsonsKt.parseJsonList(product.getSizeTemplateId(), Long.class));
            if (StrUtil.isNotBlank(product.getShowSizeTemplateId())) {
                req.setShowSizeTemplateIds(JsonsKt.parseJsonList(product.getShowSizeTemplateId(), Long.class));
            }
            // 存在则设置
            if (Objects.requireNonNullElse(product.getPlatformProductId(), 0L) > 0L) {
                req.setGoodsId(product.getPlatformProductId());
            }
            final var files = product.getFiles();
            // 设置素材
            files.stream()
                    .filter(TemuProductFile::material).findFirst()
                    .ifPresent(it -> req.setMaterialImgUrl(it.getTemuFileUrl()));
            // 设置视频
            req.setProductCarouseVideoReqList(files.stream()
                    .filter(TemuProductFile::video)
                    .map(it -> {
                        final var video = new TemuGoodsAddReq.ProductCarouseVideoReq();
                        video.setVideoUrl(it.getTemuFileUrl());
                        video.setCoverUrl(it.getCoverUrl());
                        video.setWidth(it.getFileWidth().intValue());
                        video.setHeight(it.getFileHeight().intValue());
                        video.setVid(it.getExtVal());
                        return video;
                    }).toList());
            // 设置站点
            req.setProductSemiManagedReq(new TemuGoodsAddReq.ProductSemiManagedReq());
            req.getProductSemiManagedReq().setBindSiteIds(JsonsKt.parseJsonList(product.getSiteId(), Long.class));
            // 库存仓库配置对象
            final var wRoute = new TemuGoodsAddReq.ProductWarehouseRouteReq();
            wRoute.setTargetRouteList(product.getWarehouseRoutes().stream().map(it -> {
                final var route = new TemuGoodsAddReq.ProductWarehouseRouteReq.TargetRoute();
                route.setSiteIdList(List.of(it.getSiteId()));
                route.setWarehouseId(it.getWarehouseId());
                return route;
            }).toList());
            req.setProductWarehouseRouteReq(wRoute);
            // 设置英文名称
            final var i18n = new TemuGoodsAddReq.ProductI18nReq();
            i18n.setProductName(product.getProductEnName());
            i18n.setLanguage("en");
            req.setProductI18nReqs(List.of(i18n));
            // 运费
            final var ship = new TemuGoodsAddReq.ProductShipmentReq();
            ship.setFreightTemplateId(product.getFreightTemplateId());
            ship.setShipmentLimitSecond(Objects.toString(TimeUnit.DAYS.toSeconds(product.getPromisedDeliveryDay())));
            req.setProductShipmentReq(ship);
            // 货品仓配供应链侧扩展属性
            final var ext = product.getExtAttrs().getFirst();
            final var whExt = new TemuGoodsAddReq.ProductWhExtAttrReq();
            final var origin = new TemuGoodsAddReq.ProductWhExtAttrReq.ProductOrigin();
            origin.setRegion2Id(Long.parseLong(ext.getRegionId()));
            origin.setCountryShortName(ext.getCountryShortName());
            whExt.setOuterGoodsUrl(ext.getOuterGoodsUrl());
            whExt.setProductOrigin(origin);
            req.setProductWhExtAttrReq(whExt);
            // 属性
            req.setProductPropertyReqs(product.getAttrs().stream().map(it -> {
                final var attr = new TemuGoodsAddReq.ProductPropertyReq();
                BasicConvert.copy(it, attr);
                return attr;
            }).toList());
            // 规格属性
            req.setProductSpecPropertyReqs(product.getSpecAttrs().stream().map(it -> {
                final var attr = new TemuGoodsAddReq.ProductSpecPropertyReq();
                BasicConvert.copy(it, attr);
                return attr;
            }).toList());
            final var skcCarousel = BasicConvert.groupingBy(files.stream().filter(TemuProductFile::carousel).toList(),
                    TemuProductFile::getProductSkcId);
            final var skcMainSpec = BasicConvert.groupingBy(product.getMainSpecs(),
                    ProductSkuMainSpec::getProductSkcId);
            final var skuMap = BasicConvert.groupingBy(product.getSkus(),
                    ProductSku::getProductSkcId);
            final var priceMap = BasicConvert.groupingBy(product.getPrices(),
                    ProductSkuSiteSupplierPrice::getProductSkuId);
            final var warehouseMap = BasicConvert.groupingBy(product.getWarehouses(),
                    ProductSkuWarehouse::getProductSkuId);
            final var skuSpecMap = BasicConvert.groupingBy(product.getSkuSpecs(),
                    ProductSkuSpec::getProductSkuId);
            // SKC
            final var productSkcReqs = new ArrayList<TemuGoodsAddReq.ProductSkcReq>();
            req.setProductSkcReqs(productSkcReqs);
            product.getSkcs().forEach(it -> {
                final var carousels = skcCarousel.get(it.getProductSkcId());
                final var skc = new TemuGoodsAddReq.ProductSkcReq();
                skc.setExtCode(it.getSkcCode());
                skc.setPreviewImgUrls(carousels.stream()
                        .map(TemuProductFile::getTemuFileUrl).toList());
                // 主SKU 规格
                skc.setMainProductSkuSpecReqs(skcMainSpec.get(it.getProductSkcId())
                        .stream().map(s -> {
                            final var spec = new TemuGoodsAddReq.ProductSkcReq.MainProductSkuSpecReq();
                            BasicConvert.copy(s, spec);
                            return spec;
                        }).toList());
                // SKU
                skc.setProductSkuReqs(skuMap.get(it.getProductSkcId()).stream().map(s -> {
                    final var sku = new TemuGoodsAddReq.ProductSkcReq.ProductSkuReq();
                    sku.setExtCode(s.getSkuCode());
                    sku.setThumbUrl(carousels.getFirst().getTemuFileUrl());
                    sku.setCurrencyType(s.getCurrencyType());
                    final var packingList = s.getPackingList();
                    if (StrUtil.isNotBlank(packingList)) {
                        final var productSkuAccessoriesReq = new TemuGoodsAddReq.ProductSkcReq.ProductSkuReq.ProductSkuAccessoriesReq();
                        sku.setProductSkuAccessoriesReq(productSkuAccessoriesReq);
                        productSkuAccessoriesReq.setProductSkuAccessories(JsonsKt.parseJsonList(packingList, SuitDTO.class).stream().map(p -> {
                            final var a = new TemuGoodsAddReq.ProductSkcReq.ProductSkuReq.ProductSkuAccessories();
                            a.setVid(p.getCatId());
                            a.setUnitCode(1);
                            a.setNum(p.getNumberOfPieces());
                            return a;
                        }).toList());
                    }
                    // 站点供货价
                    sku.setSiteSupplierPrices(priceMap.get(s.getProductSkuId())
                            .stream().map(p -> {
                                final var price = new TemuGoodsAddReq.ProductSkcReq.ProductSkuReq.SiteSupplierPrice();
                                price.setSiteId(p.getSiteId());
                                // 元转分
                                price.setSupplierPrice(p.getSupplierPrice().multiply(new BigDecimal("100.00")).intValue());
                                return price;
                            }).toList());
                    // SKU 扩展属性
                    final var extAttr = new TemuGoodsAddReq.ProductSkcReq.ProductSkuReq.ProductSkuWhExtAttrReq();
                    sku.setProductSkuWhExtAttrReq(extAttr);
                    // 体积
                    final var volume = new TemuGoodsAddReq.ProductSkcReq.ProductSkuReq.ProductSkuWhExtAttrReq.ProductSkuVolumeReq();
                    volume.setHeight(s.getVolumeHeight().intValue() * 10);
                    volume.setWidth(s.getVolumeWidth().intValue() * 10);
                    volume.setLen(s.getVolumeLen().intValue() * 10);
                    extAttr.setProductSkuVolumeReq(volume);
                    // 重量
                    final var weight = new TemuGoodsAddReq.ProductSkcReq.ProductSkuReq.ProductSkuWhExtAttrReq.ProductSkuWeightReq();
                    weight.setValue(s.getWeight().intValue() * 1000);
                    extAttr.setProductSkuWeightReq(weight);
                    // 敏感属性
                    final var sensitive = new TemuGoodsAddReq.ProductSkcReq.ProductSkuReq.ProductSkuWhExtAttrReq.ProductSkuSensitiveAttrReq();
                    sensitive.setIsSensitive(Bool.NO.getCode());
                    extAttr.setProductSkuSensitiveAttrReq(sensitive);
                    // 发货仓
                    final var quantityReq = new TemuGoodsAddReq.ProductSkcReq.ProductSkuReq.ProductSkuStockQuantityReq();
                    quantityReq.setWarehouseStockQuantityReqs(warehouseMap.get(s.getProductSkuId())
                            .stream().map(w -> {
                                final var stock = new TemuGoodsAddReq.ProductSkcReq.ProductSkuReq.ProductSkuStockQuantityReq.WarehouseStockQuantityReq();
                                stock.setTargetStockAvailable(w.getTargetStockAvailable());
                                stock.setWarehouseId(w.getWarehouseId());
                                return stock;
                            }).toList());
                    sku.setProductSkuStockQuantityReq(quantityReq);
                    // SKU 规格
                    sku.setProductSkuSpecReqs(skuSpecMap.get(s.getProductSkuId())
                            .stream().map(c -> {
                                final var spec = new TemuGoodsAddReq.ProductSkcReq.ProductSkuReq.ProductSkuSpecReq();
                                BasicConvert.copy(c, spec);
                                return spec;
                            }).toList());
                    // 货品多包规
                    if (!s.singleSku()) {
                        final var multi = new TemuGoodsAddReq.ProductSkcReq.ProductSkuReq.ProductSkuMultiPackReq();
                        multi.setIndividuallyPacked(Objects.toString(Bool.NO.getCode()));
                        if (Objects.nonNull(s.getIndividuallyPacked())) {
                            multi.setIndividuallyPacked(Objects.toString(s.getIndividuallyPacked()));
                        }
                        multi.setSkuClassification(s.getSkuClassification());
                        multi.setNumberOfPieces(s.getNumberOfPieces());
                        multi.setPieceUnitCode(1);
                        sku.setProductSkuMultiPackReq(multi);
                    }
                    return sku;
                }).toList());
                productSkcReqs.add(skc);
            });
        } catch (NumberFormatException e) {
            log.error("构建商品发布参数失败\t{}", e.getLocalizedMessage(), e);
            throw new ValidationException("商品信息不合法,请重新维护商品信息");
        }
        return req;
    }

    // 设置品类
    private TemuGoodsAddReq setCategory(final Product product, final List<TemuProductCategory> cats) {
        final var req = new TemuGoodsAddReq();
        clearCategoryFields(req);
        final var catMap = BasicConvert.toMap(cats, TemuProductCategory::getCategoryId);
        long categoryId = Long.parseLong(product.getPlatformCategoryCode());
        do {
            TemuProductCategory cat = catMap.get(categoryId);
            setCatId(req, cat);
            categoryId = cat.getParentId();
        } while (categoryId != 0L);
        return req;
    }

    private void setCatId(final TemuGoodsAddReq req, final TemuProductCategory category) {
        Optional.ofNullable(CATEGORY_MAPPERS.get(category.getLevel()))
                .ifPresent(it ->
                        it.accept(req, category.getCategoryId().intValue())
                );
    }

    // 清空所有品类字段
    private void clearCategoryFields(final TemuGoodsAddReq req) {
        req.setCat1Id(0);
        req.setCat2Id(0);
        req.setCat3Id(0);
        req.setCat4Id(0);
        req.setCat5Id(0);
        req.setCat6Id(0);
        req.setCat7Id(0);
        req.setCat8Id(0);
        req.setCat9Id(0);
        req.setCat10Id(0);
    }

    private static final Map<Integer, BiConsumer<TemuGoodsAddReq, Integer>> CATEGORY_MAPPERS = new HashMap<>();

    static {
        CATEGORY_MAPPERS.put(1, TemuGoodsAddReq::setCat1Id);
        CATEGORY_MAPPERS.put(2, TemuGoodsAddReq::setCat2Id);
        CATEGORY_MAPPERS.put(3, TemuGoodsAddReq::setCat3Id);
        CATEGORY_MAPPERS.put(4, TemuGoodsAddReq::setCat4Id);
        CATEGORY_MAPPERS.put(5, TemuGoodsAddReq::setCat5Id);
        CATEGORY_MAPPERS.put(6, TemuGoodsAddReq::setCat6Id);
        CATEGORY_MAPPERS.put(7, TemuGoodsAddReq::setCat7Id);
        CATEGORY_MAPPERS.put(8, TemuGoodsAddReq::setCat8Id);
        CATEGORY_MAPPERS.put(9, TemuGoodsAddReq::setCat9Id);
        CATEGORY_MAPPERS.put(10, TemuGoodsAddReq::setCat10Id);
    }

}
