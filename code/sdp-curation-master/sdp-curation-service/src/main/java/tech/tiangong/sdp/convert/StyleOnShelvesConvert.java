package tech.tiangong.sdp.convert;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.extra.spring.SpringUtil;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.zjkj.aigc.common.exception.BaseBizException;
import lombok.experimental.UtilityClass;
import org.springframework.beans.BeanUtils;
import team.aikero.admin.common.vo.DictVo;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.sequence.id.IdHelper;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.butted.common.req.AutoCropTaskReq;
import tech.tiangong.butted.common.req.base.CompanyUserBatchReq;
import tech.tiangong.sdp.config.DomainProperties;
import tech.tiangong.sdp.entity.*;
import tech.tiangong.sdp.enums.*;
import tech.tiangong.sdp.external.DictClientExternal;
import tech.tiangong.sdp.external.PlmConvertHelper;
import tech.tiangong.sdp.util.StreamUtil;
import tech.tiangong.sdp.utils.SsoContext;
import tech.tiangong.sdp.vo.dto.*;
import tech.tiangong.sdp.vo.query.StyleOnShelvesQuery;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 上架
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/11 16:19
 */
@UtilityClass
public class StyleOnShelvesConvert {
    private static final String PLUS_SIZE_Y = "L XL XXL XXXL";
    private static final String PLUS_SIZE_N = "S M L XL XXL";
    private final static String CALLBACK = "/open/v1/style-on-shelves/callback/";
    private final static BigDecimal WIDTH = new BigDecimal("1340.00");
    private final static BigDecimal HEIGHT = new BigDecimal("1785.00");

    private final DictClientExternal dictClientExternal = SpringUtil.getBean(DictClientExternal.class);

    public StyleOnShelves convert(final SpotStyleTask task) {
        final var e = new StyleOnShelves();
        BasicConvert.copy(task, e);
        e.setStyleId(task.getTaskId());
        e.setStyleCode(task.getTaskCode());
        e.setStyleType(SpotStyleTypeEnum.SPOT_STYLE.getVale());
        e.setDesignerId(task.getDesignerId());
        e.setDesignerName(task.getDesignerName());
        e.setCreatorId(SsoContext.userId());
        e.setCreatorName(SsoContext.username());
        e.setCreatedTime(LocalDateTime.now());
        if (StrUtil.isNotBlank(task.getSourceType())) {
            e.setSourceType(SourceTypeEnum.from(task.getSourceType()).getVale());
        }
        e.setDeveloperId(task.getDesignerId());
        e.setDeveloperName(task.getDesignerName());
        Optional.ofNullable(task.getDevelopStyle()).ifPresent(it -> {
            if (StringUtils.isNotBlank(it.getPatternData())) {
                e.setPattern(JsonsKt.parseJson(it.getPatternData(), PatternDataDTO.class).result());
            }
            e.setFabricStyle(it.getFabricMaterial());
            e.setFabricMaterial(it.getFabricMaterial());
            e.setFabricTexture(it.getFabricTexture());
            e.setTransparency(it.getTransparency());
        });
        if (StrUtil.isNotBlank(task.getUsableLabels())) {
            final var map = PlmConvertHelper.mapLabel(task.getUsableLabels());
            final var list = new ArrayList<String>();
            map.forEach((k, v) -> list.add(k + ":" + v));
            e.setUsableLabels(String.join(";", list));
        }
        if (StrUtil.isNotBlank(task.getTitleData())) {
            Optional.ofNullable(JsonsKt.parseJson(task.getTitleData(), FashionTitleAnalysisDTO.class)).map(FashionTitleAnalysisDTO::getResult)
                    .ifPresent(it -> {
                        if (StrUtil.isNotBlank(it.getStyle())) {
                            e.setFabricStyle(StrUtil.split(it.getStyle(), "]").getLast());
                        }
                        if (StrUtil.isNotBlank(it.getDetails())) {
                            e.setDetails(it.getDetails().replaceAll("\\[\\d+]", ""));
                        }
                        e.setChineseTitle(it.getChineseTitle());
                        e.setEnglishTitle(it.getEnglishTitle());
                    });
        }
        final var pictures = task.getPictures();
        final var ingredients = task.getIngredients();
        final var skcs = task.getSkcs();
        if (CollectionUtil.isNotEmpty(ingredients)) {
            e.setStyleIngredient(JsonsKt.toJson(ingredients.stream().map(it -> new SpotStyleIngredientDTO(it.getIngredientName(), it.getIngredientRatio())).toList()));
        }
        final var onShelvesPictures = new ArrayList<StyleSkcOnShelvesPicture>();
        if (CollectionUtil.isNotEmpty(pictures)) {
            final var spuImages = pictures.stream().filter(SpotStylePicture::spuImage).map(SpotStylePicture::getPictureUrl).toList();
            final var sizeImages = pictures.stream().filter(SpotStylePicture::sizeImage).map(SpotStylePicture::getPictureUrl).toList();
            if (CollectionUtil.isNotEmpty(spuImages)) {
                e.setAttachment(JsonsKt.toJson(spuImages));
                onShelvesPictures.addAll(styleOnShelvesPicture(spuImages, task, 0));
            }
            if (CollectionUtil.isNotEmpty(sizeImages)) {
                e.setSizeAttachment(JsonsKt.toJson(sizeImages));
                onShelvesPictures.addAll(styleOnShelvesPicture(sizeImages, task, 1));
            }
        }
        if (CollectionUtil.isNotEmpty(skcs)) {
            final var skcPicture = CollectionUtil.isNotEmpty(pictures) ? BasicConvert.groupingBy(pictures, SpotStylePicture::getSkcId) : new HashMap<Long, List<SpotStylePicture>>();
            e.setSkcs(skcs.stream().filter(it -> !it.cancelled()).map(it -> {
                final var skc = new SkcOnShelves();
                BasicConvert.copy(it, skc);
                skc.setSizeStandardName(task.getSizeStandardName());
                skc.setSizeStandardCode(task.getSizeStandardCode());
                skc.setSizeName(it.getSizeStandardName());
                skc.setSizeCode(it.getSizeStandardCode());
                skc.setStyleId(it.getTaskId());
                final var skcPictures = skcPicture.get(it.getSkcId());
                if (CollectionUtil.isNotEmpty(skcPictures)) {
                    skc.setAttachment(JsonsKt.toJson(skcPictures.stream().map(SpotStylePicture::getPictureUrl).toList()));
                }
                return skc;
            }).toList());
            if (CollectionUtil.isNotEmpty(pictures)) {
                final var skcPictures = pictures.stream().filter(SpotStylePicture::skcImage).toList();
                if (CollectionUtil.isNotEmpty(skcPictures)) {
                    onShelvesPictures.addAll(skcOnShelvesPicture(skcPictures, task));
                }
            }
        }

        if (CollectionUtil.isNotEmpty(onShelvesPictures)) {
            e.setPictures(onShelvesPictures);
        }
        return e;
    }

    private static List<StyleSkcOnShelvesPicture> skcOnShelvesPicture(List<SpotStylePicture> skcPictures, SpotStyleTask task) {
        return skcPictures.stream().map(t -> {
            final var stylePicture = new StyleSkcOnShelvesPicture();
            stylePicture.setPictureId(IdHelper.getId());
            stylePicture.setStyleId(task.getTaskId());
            stylePicture.setSkcId(t.getSkcId());
            stylePicture.setPictureType(PictureTypeEnum.PRODUCT_IMG.getCode());
            stylePicture.setMaterialType(0);
            stylePicture.setPictureUrl(t.getPictureUrl());
            stylePicture.setTenantId(SsoContext.tenantId());
            return stylePicture;
        }).toList();
    }

    private static List<StyleSkcOnShelvesPicture> styleOnShelvesPicture(List<String> spuImages, SpotStyleTask task, Integer pictureType) {
        return spuImages.stream().map(url -> {
            final var stylePicture = new StyleSkcOnShelvesPicture();
            stylePicture.setPictureId(IdHelper.getId());
            stylePicture.setStyleId(task.getTaskId());
            stylePicture.setSkcId(0L);
            stylePicture.setPictureType(pictureType);
            stylePicture.setMaterialType(0);
            stylePicture.setPictureUrl(url);
            stylePicture.setTenantId(SsoContext.tenantId());
            return stylePicture;
        }).toList();
    }


    public List<SkuGrading> skus(final StyleOnShelves style, final SkcOnShelves skc, final List<GradingSize> sizes) {
        final var usableLabels = style.getUsableLabels();
        if (StrUtil.isBlank(usableLabels)) {
            return blankLabelSkus(style, skc);
        }
        final var categoryName = style.getCategoryName();
        final var plusSize = plusSize(categoryName);
        final var sizeSpecification = sizeSpecification(plusSize);
        final List<String> labels = StrUtil.split(usableLabels, ";");
        final List<GradingSize> filterSizes = filterSize(plusSize, sizes).stream().filter(it -> filterSize(it, categoryName, labels)).toList();
        if (CollectionUtil.isEmpty(filterSizes)) {
            return Collections.emptyList();
        }
        return skus(style, skc, filterSizes, sizeSpecification, plusSize);
    }

    private List<SkuGrading> skus(final StyleOnShelves style, final SkcOnShelves skc, final List<GradingSize> filterSizes, final List<String> sizes, final boolean plusSize) {
        final var skus = new ArrayList<SkuGrading>();
        BigDecimal decimal0 = null;
        BigDecimal decimal1 = null;
        BigDecimal decimal2 = null;
        BigDecimal decimal3 = null;
        BigDecimal decimal4 = null;
        BigDecimal decimal5 = null;
        BigDecimal decimal6 = null;
        BigDecimal decimal7 = null;
        BigDecimal decimal8 = null;
        for (int i = 0; i < sizes.size(); i++) {
            final var sku = obtainSku(style, skc, i, sizes);
            skus.add(sku);
            // 有标签才放码
            sku.setUsableLabels(style.getUsableLabels());
            // 衣长
            decimal0 = getMean(filterSizes, plusSize, decimal0, i, SkuGradingPositionEnum.CLOTHES_LENGTH.getVale());
            sku.setClothesLengthSize(decimal0);
            // 袖长
            decimal1 = getMean(filterSizes, plusSize, decimal1, i, SkuGradingPositionEnum.SLEEVE_LENGTH.getVale());
            sku.setSleeveLengthSize(decimal1);
            // 裙长
            decimal2 = getMean(filterSizes, plusSize, decimal2, i, SkuGradingPositionEnum.SKIRT_LENGTH.getVale());
            sku.setSkirtLengthSize(decimal2);
            // 裤长
            decimal3 = getMean(filterSizes, plusSize, decimal3, i, SkuGradingPositionEnum.PANT_LENGTH.getVale());
            sku.setPantLengthSize(decimal3);
            // 裤内长
            decimal4 = getMean(filterSizes, plusSize, decimal4, i, SkuGradingPositionEnum.INSEAM_LENGTH.getVale());
            sku.setInseamLengthSize(decimal4);
            // 肩宽
            decimal5 = getMean(filterSizes, plusSize, decimal5, i, SkuGradingPositionEnum.SHOULDER_WIDTH.getVale());
            sku.setShoulderWidthSize(decimal5);
            // 胸围
            decimal6 = getMean(filterSizes, plusSize, decimal6, i, SkuGradingPositionEnum.BUST.getVale());
            sku.setBustSize(decimal6);
            // 腰围
            decimal7 = getMean(filterSizes, plusSize, decimal7, i, SkuGradingPositionEnum.WAISTLINE.getVale());
            sku.setWaistlineSize(decimal7);
            // 臀围
            decimal8 = getMean(filterSizes, plusSize, decimal8, i, SkuGradingPositionEnum.HIPLINE.getVale());
            sku.setHiplineSize(decimal8);
        }
        return skus;
    }

    private BigDecimal getMean(List<GradingSize> filterSizes, boolean plusSize, BigDecimal mean, int i, final String positionName) {
        final var idx = i + 1;
        final var size = gradingSize(filterSizes, positionName);
        if (Objects.nonNull(size)) {
            final List<GradingRuleDTO> gradingRules = JsonsKt.parseJsonList(size.getGradingRule(), GradingRuleDTO.class);
            if (Objects.isNull(mean)) {
                mean = size.getMean();
            }
            if (Objects.isNull(mean)) {
                return null;
            }
            final var gradingSize = gradingSize(plusSize, gradingRules, i);
            // 大码或者是普通码
            return mean.add(gradingSize.multiply(BigDecimal.valueOf((i <= 1 || plusSize) ? idx : (idx - 1 - 1))));
        }
        return null;
    }

    private GradingSize gradingSize(final List<GradingSize> filterSizes, final String positionName) {
        return filterSizes.stream().filter(it -> StrUtil.equalsIgnoreCase(positionName, it.getPositionName())).findFirst().orElse(null);
    }

    private List<SkuGrading> blankLabelSkus(final StyleOnShelves style, final SkcOnShelves skc) {
        final var skus = new ArrayList<SkuGrading>();
        final var categoryName = style.getCategoryName();
        final var size = sizeSpecification(plusSize(categoryName));
        for (int i = 0; i < size.size(); i++) {
            skus.add(obtainSku(style, skc, i, size));
        }
        return skus;
    }

    private BigDecimal gradingSize(final boolean plusSize, final List<GradingRuleDTO> gradingRules, final int idx) {
        final var min = gradingRules.getFirst();
        final var max = gradingRules.getLast();
        if (plusSize) {
            return min.getGradingSize();
        }
        return idx <= 1 ? min.getGradingSize() : max.getGradingSize();
    }

    private boolean filterSize(final GradingSize size, final String categoryName, final List<String> labels) {
        // 品类命中
        final var contains = StrUtil.contains(size.getCategoryName(), categoryName);
        if (!contains) {
            return false;
        }
        final var positionLabel = size.getPositionLabel();
        if (StrUtil.isBlank(positionLabel)) {
            return true;
        }
        return labels.stream().anyMatch(l -> StrUtil.contains(positionLabel, l));
    }

    private List<GradingSize> filterSize(final boolean plusSize, final List<GradingSize> sizes) {
        final var size = plusSize ? "大码" : "普通";
        return sizes.stream().filter(it -> StrUtil.equalsIgnoreCase(size, it.getCategorySize())).toList();
    }

    private boolean plusSize(final String categoryName) {
        return StrUtil.contains(categoryName, "大码");
    }

    private List<String> sizeSpecification(final boolean plusSize) {
        return StrUtil.split(plusSize ? PLUS_SIZE_Y : PLUS_SIZE_N, " ");
    }

    private SkuGrading obtainSku(final StyleOnShelves style, final SkcOnShelves skc, final int i, final List<String> sizes) {
        final var skcCode = skc.getSkcCode();
        final var idx = i + 1;
        final var sku = new SkuGrading();
        sku.setGradingStatus(Bool.NO.getCode());
        BasicConvert.entityInit(sku, sku::setSkuGradingId);
        sku.setCategoryName(style.getCategoryName());
        sku.setCategoryCode(style.getCategoryCode());
        sku.setSizeStandardName(style.getSizeStandardName());
        sku.setSizeStandardCode(style.getSizeStandardCode());
        sku.setSizeName(sizes.get(i));
        sku.setStyleId(skc.getStyleId());
        sku.setSkcId(skc.getSkcId());
        sku.setSkcCode(skcCode);
        sku.setStyleCode(style.getStyleCode());
        sku.setSkuCode(skcCode + (idx < 10 ? "0" + idx : idx));
        return sku;
    }

    public static CompanyUserBatchReq<AutoCropTaskReq> buildPushCropTaskReq(StyleSkcOnShelvesPicture task, StyleOnShelves style) {
        final var req = BasicConvert.companyUserBatch(task, List.of(new AutoCropTaskReq(task.getPictureId(), style.getStyleCode(), task.getPictureUrl(), Bool.YES.getCode(), WIDTH, HEIGHT)));
        req.setCallback(DomainProperties.buildPath(CALLBACK + "crop"));
        return req;
    }

    public static StyleOnShelvesQuery buildWebPage(StyleOnShelvesPageReq req) {
        final var q = BasicConvert.copy(req, StyleOnShelvesQuery.class);
        q.setPageLimit(req.getPageSize());
        q.setDeleted(Bool.NO.getCode());
        q.setTenantId(SsoContext.tenantId());
        if (StrUtil.isNotBlank(req.getStyleCode())) {
            q.setStyleCodes(StrUtil.split(req.getStyleCode().replaceAll(" ", StrUtil.COMMA), StrUtil.COMMA));
        }
        if (StrUtil.isNotBlank(req.getDesignCode())) {
            q.setDesignCodes(StrUtil.split(req.getDesignCode().replaceAll(" ", StrUtil.COMMA), StrUtil.COMMA));
        }
        return q;
    }

    private StyleSkcOnShelvesPictureVo obtainPictureResp(final StyleSkcOnShelvesPicture picture) {
        final var resp = BasicConvert.copy(picture, StyleSkcOnShelvesPictureVo.class);
        return resp;
    }

    public static StyleOnShelvesPageResp convert(StyleOnShelves style, Map<Long, List<SkcOnShelves>> skcMap, Map<Long,
            List<StyleSkcOnShelvesPicture>> pictureMap, List<Shop> shops, Map<Long, DesignStyle> spuMap) {
        final var resp = BasicConvert.copy(style, StyleOnShelvesPageResp.class);
        final var skcs = skcMap.get(style.getStyleId());
        if (CollectionUtil.isNotEmpty(skcs)) {
            resp.setSkcList(skcs.stream().map(t -> StyleOnShelvesConvert.obtainSkcResp(t, pictureMap, style)).toList());
        }
        if (CollectionUtil.isNotEmpty(shops) && null != style.getStoreId()) {
            final Map<Long, List<Shop>> shopMap = BasicConvert.groupingBy(shops, Shop::getShopId);
            if (shopMap.containsKey(style.getStoreId())) {
                resp.setProductPlatformName(shopMap.get(style.getStoreId()).getFirst().getPlatformName());
                resp.setOperationUserName(shopMap.get(style.getStoreId()).getFirst().getBusinessOperatorName());
            }
        }
        if (!spuMap.isEmpty() && spuMap.containsKey(style.getStyleId())) {
            resp.setProjectTypeCode(spuMap.get(style.getStyleId()).getProjectTypeCode());
            resp.setProjectTypeName(spuMap.get(style.getStyleId()).getProjectTypeName());
        }
        return resp;
    }

    private static SkcOnShelvesVo obtainSkcResp(SkcOnShelves skc, Map<Long, List<StyleSkcOnShelvesPicture>> pictureMap, StyleOnShelves style) {
        final var vo = new SkcOnShelvesVo();
        BeanUtils.copyProperties(skc, vo);
        if (!pictureMap.isEmpty()) {
            final var pictures = pictureMap.get(skc.getSkcId());
            if (CollectionUtil.isNotEmpty(pictures)) {
                if (style.spotType()) {
                    vo.setPictures(pictures.stream().filter(t -> t.getSkcId().equals(skc.getSkcId())).map(StyleOnShelvesConvert::obtainPictureResp).toList());
                } else {
                    vo.setPictures(pictures.stream().filter(t -> t.getSkcId().equals(skc.getSkcId()))
                            .filter(t -> t.getPictureType().equals(PictureTypeEnum.MARKETING_IMAGE.getCode())).map(StyleOnShelvesConvert::obtainPictureResp).toList());
                }

            }
        }
        return vo;
    }

    public static StyleOnShelvesResp convertDetail(StyleOnShelves style, List<SkcOnShelves> skcs, List<StyleSkcOnShelvesPicture> pictures, List<DesignerDTO> designerList, List<StyleSkcSku> skus) {
        final var vo = new StyleOnShelvesResp();
        BeanUtils.copyProperties(style, vo);
        vo.setSkcList(skcs.stream().map(it -> convertSkcVo(it, style, pictures, skus)).toList());
        if (Objects.equals(SpotStyleTypeEnum.SPOT_STYLE.getVale(), style.getStyleType())) {
            vo.setSizeImageList(pictures.stream().filter(StyleSkcOnShelvesPicture::spuImage).filter(t -> Objects.equals(PictureTypeEnum.SIZE_IMAGE.getCode(), t.getPictureType())).map(StyleSkcOnShelvesPicture::getPictureUrl).toList());
        }
        if (CollectionUtil.isNotEmpty(designerList)) {
            vo.setDesignerGroupCode(designerList.getFirst().getDesignerGroupCode());
            vo.setDesignerGroupName(designerList.getFirst().getDesignerGroupName());
        }
        return vo;
    }

    private static SkcOnShelvesVo convertSkcVo(SkcOnShelves skc, StyleOnShelves style, List<StyleSkcOnShelvesPicture> pictures, List<StyleSkcSku> skus) {
        final var vo = new SkcOnShelvesVo();
        BeanUtils.copyProperties(skc, vo);
        if (Objects.equals(SpotStyleTypeEnum.SPOT_STYLE.getVale(), style.getStyleType())) {
            vo.setPictures(pictures.stream().filter(t -> t.getSkcId().equals(skc.getSkcId())).filter(StyleSkcOnShelvesPicture::skcImage).map(StyleOnShelvesConvert::obtainPictureResp).toList());
        } else {
            vo.setPictures(
                    pictures.stream().filter(t -> t.getSkcId().equals(skc.getSkcId()))
                            .filter(t -> t.getPictureType().equals(PictureTypeEnum.MARKETING_IMAGE.getCode())).map(StyleOnShelvesConvert::obtainPictureResp).toList());
        }
        if (CollectionUtil.isNotEmpty(skus)) {
            final var skcSkuMap = BasicConvert.groupingBy(skus, StyleSkcSku::getSkcId);
            if (skcSkuMap.containsKey(skc.getSkcId())) {
                final var skuList = skcSkuMap.get(skc.getSkcId());
                vo.setSkuList(convertSkuVo(skuList));
            }
        }
        return vo;
    }

    private static List<StyleSkcSkuVo> convertSkuVo(List<StyleSkcSku> skuList) {
        return skuList.stream().map(t -> {
            final var vo = new StyleSkcSkuVo();
            BeanUtils.copyProperties(t, vo);
            return vo;
        }).toList();
    }

    public static List<SpotStyleTaskOnShelvesReviewReq> convertSpotReview(StyleOnShelvesReviewReq req) {
        final var reviewReq = new SpotStyleTaskOnShelvesReviewReq();
        reviewReq.setPass(req.getPass());
        reviewReq.setSpuId(req.getStyleId());
        reviewReq.setFailMessage(req.getReviewFailReason());
        return List.of(reviewReq);
    }

    public static List<PrototypeBatchOnShelvesResultReq> convertDesignReview(StyleOnShelvesReviewReq req) {
        final var reviewReq = new PrototypeBatchOnShelvesResultReq();
        reviewReq.setPass(req.getPass());
        reviewReq.setSpuId(req.getStyleId());
        reviewReq.setListingFailReason(req.getReviewFailReason());
        return List.of(reviewReq);
    }

    public static ProductAddReq addProductSkc(StyleOnShelves style, Product product, Map<Long, List<StyleSkcSku>> skcSkuMap, List<ProductSkc> skcList) {
        final var req = new ProductAddReq();
        BeanUtils.copyProperties(product, req);
        req.setSkcReqs(buildProductAddSkc(style, skcSkuMap, skcList));
        final var standardSize = listByDictCode(DictEnum.PLM_STANDARD_SIZE);
        final var sampleSize = standardSize.getChildren().stream().filter(it -> StrUtil.equalsIgnoreCase(style.getSizeStandardCode(), it.getDictCode())).filter(it -> CollectionUtil.isNotEmpty(it.getChildren())).flatMap(it -> it.getChildren().stream()).map(DictVo::getDictName).findFirst().orElse("");
        final var sizeNameList = StrUtil.splitTrim(sampleSize, StrUtil.COMMA);
        req.setSizes(sizeNameList);
        return req;
    }

    private static DictVo listByDictCode(DictEnum dict) {
        final var dictVo = dictClientExternal.listByDictCode(dict.getDictCode());
        if (null == dictVo) {
            throw new BaseBizException(dict.getDesc() + "查询信息映射不存在，编码：" + dict.getDictCode());
        }
        return dictVo;
    }


    private static List<ProductSkcAddReq> buildProductAddSkc(StyleOnShelves style, Map<Long, List<StyleSkcSku>> skcSkuMap, List<ProductSkc> exitSkcList) {
        final var exitSkcIdSet = exitSkcList.stream().map(ProductSkc::getSkcId).collect(Collectors.toSet());
        return style.getSkcs().stream().filter(t -> !exitSkcIdSet.contains(t.getSkcId())).map(t -> {
            final var add = new ProductSkcAddReq();
            add.setSkcId(t.getSkcId());
            add.setSkcCode(t.getSkcCode());
            add.setColor(t.getColor());
            final var list = new ArrayList<StyleSkcOnShelvesPicture>();
            if (Objects.equals(SpotStyleTypeEnum.SPOT_STYLE.getVale(), style.getStyleType())) {
                list.addAll(style.getPictures().stream().filter(StyleSkcOnShelvesPicture::skcImage).toList());
            } else {
                list.addAll(style.getPictures().stream().filter(StyleSkcOnShelvesPicture::designSkcMarketingImage).toList());
            }
            if (CollectionUtil.isNotEmpty(list)) {
                add.setImages(StreamUtil.convertListAndDistinct(list, StyleSkcOnShelvesPicture::getPictureUrl));
            }
            if (!skcSkuMap.isEmpty() && skcSkuMap.containsKey(t.getSkcId())) {
                final var skus = skcSkuMap.get(t.getSkcId());
                if (CollectionUtil.isNotEmpty(skus)) {
                    add.setSkuReqs(skus.stream().map(s -> {
                        final var sku = new ProductSkuAddReq();
                        sku.setSkuId(s.getSkuId());
                        sku.setSkuCode(s.getSkuCode());
                        return sku;
                    }).toList());
                }
            }
            return add;
        }).toList();
    }
}
