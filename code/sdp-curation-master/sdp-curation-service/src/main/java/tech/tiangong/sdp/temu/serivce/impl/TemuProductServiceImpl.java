package tech.tiangong.sdp.temu.serivce.impl;

import cn.hutool.core.util.StrUtil;
import jakarta.annotation.PostConstruct;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.core.exception.BusinessException;
import tech.tiangong.sdp.enums.*;
import tech.tiangong.sdp.temu.config.TemuPlatformProperties;
import tech.tiangong.sdp.temu.convert.TemuConvert;
import tech.tiangong.sdp.temu.external.TemuRestApi;
import tech.tiangong.sdp.temu.http.RestRequestContext;
import tech.tiangong.sdp.temu.http.TemuShopContext;
import tech.tiangong.sdp.temu.serivce.TemuProductService;
import tech.tiangong.sdp.temu.vo.TemuCommonReq;
import tech.tiangong.sdp.temu.vo.TemuCommonResp;
import tech.tiangong.sdp.temu.vo.dto.RestLogDTO;
import tech.tiangong.sdp.temu.vo.dto.TemuFreightTemplateDTO;
import tech.tiangong.sdp.temu.vo.dto.TemuRequestDTO;
import tech.tiangong.sdp.temu.vo.dto.TemuSizeSpecClassCatDTO;
import tech.tiangong.sdp.temu.vo.req.*;
import tech.tiangong.sdp.temu.vo.resp.*;
import tech.tiangong.sdp.util.ImageUtils;
import tech.tiangong.sdp.util.TemuUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * Temu商品Service
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 11:03
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class TemuProductServiceImpl implements TemuProductService {
    private final TemuPlatformProperties usTemuProperties;
    private final TemuPlatformProperties gloTemuProperties;
    private final TemuPlatformProperties cnTemuProperties;
    private final TemuPlatformProperties paTemuProperties;
    private final Map<TemuPartnerEnum, TemuPlatformProperties> mapProperties = new HashMap<>();

    @Override
    public List<TemuGoodsCatResp> getGoodsCatListFormUS(TemuGoodsCatReq req) {
        final var data = request(new TemuRequestDTO<>(TemuPartnerEnum.US, req,
                new ParameterizedTypeReference<TemuCommonResp<TemuGoodsCatListResp>>() {
                }));
        return data.getGoodsCatsList();
    }

    @Override
    public List<TemuGoodsCatResp> getGoodsCatList(TemuGoodsCatReq req) {
        final var data = request(new TemuRequestDTO<>(TemuPartnerEnum.CN, req,
                new ParameterizedTypeReference<TemuCommonResp<TemuGoodsCatListResp>>() {
                }));
        return data.getGoodsCatsList();
    }

    @Override
    public TemuGoodsTemplateResultResp getGoodsTemplateFormUS(Long catId) {
        final var req = new TemuGoodsTemplateReq();
        req.setType(TemuPartnerUSTypeEnum.GOODS_TEMPLATE.getCode());
        req.setCatId(catId);
        return request(new TemuRequestDTO<>(TemuPartnerEnum.US, req,
                new ParameterizedTypeReference<>() {
                }));
    }

    @Override
    public TemuGoodsTemplateResultResp getGoodsTemplate(Long catId) {
        final var req = new TemuGoodsTemplateReq();
        req.setType(TemuPartnerCNTypeEnum.GOODS_TEMPLATE.getCode());
        req.setCatId(catId);
        return request(new TemuRequestDTO<>(TemuPartnerEnum.CN, req,
                new ParameterizedTypeReference<>() {
                }));
    }

    @Override
    public TemuSizeSpecClassCatDTO getSizeSpecClass(Long catId) {
        final var req = new TemuSizeSpecClassCatReq();
        req.setType(TemuPartnerCNTypeEnum.SIZE_CHARTS_CLASS.getCode());
        req.setCatId(catId);
        return request(new TemuRequestDTO<>(TemuPartnerEnum.CN, req,
                new ParameterizedTypeReference<TemuCommonResp<TemuSizeSpecClassResultResp>>() {
                })).getSizeSpecClassCat();
    }

    @Override
    public TemuGoodsSizeSpecElementRuleResp getGoodsSizeSpecElementFormUS(Long catId) {
        final var req = new TemuGoodsSizeElementReq();
        req.setType(TemuPartnerUSTypeEnum.GOODS_SIZE_ELEMENT.getCode());
        req.setCatId(catId);
        final var data = request(new TemuRequestDTO<>(TemuPartnerEnum.US, req,
                new ParameterizedTypeReference<TemuCommonResp<TemuGoodsSizeSpecElementResultResp>>() {
                }));
        return data.getSizeSpecElementRule();
    }

    @Override
    public TemuSizeResultResp getGoodsSize(Long catId) {
        final var req = new TemuGoodsSizeElementReq();
        req.setType(TemuPartnerCNTypeEnum.GOODS_SIZE_ELEMENT.getCode());
        req.setCatId(catId);
        return request(new TemuRequestDTO<>(TemuPartnerEnum.CN, req,
                new ParameterizedTypeReference<>() {
                }));
    }

    @Override
    public Long sizeChartsTemplateCreate(Long businessId) {
        final var req = new TemuSizeChartsTemplateCreateReq();
        req.setType(TemuPartnerCNTypeEnum.SIZE_CHARTS_TEMPLATE_CREATE.getCode());
        req.setBusinessId(businessId);
        return request(new TemuRequestDTO<>(TemuPartnerEnum.CN, req,
                new ParameterizedTypeReference<TemuCommonResp<TemuSizeChartsTemplateCreateResp>>() {
                })).getTempBusinessId();
    }

    @Override
    public TemuSizeChartsCreateResp sizeChartsCreate(TemuSizeChartsCreateReq req) {
        req.setType(TemuPartnerCNTypeEnum.SIZE_CHARTS_CREATE.getCode());
        return request(new TemuRequestDTO<>(TemuPartnerEnum.CN, req,
                new ParameterizedTypeReference<>() {
                }));
    }

    @Override
    public TemuProductAddResp addProduct(TemuGoodsAddReq req) {
        req.setType(TemuPartnerPATypeEnum.GOODS_ADD.getCode());
        return request(new TemuRequestDTO<>(TemuPartnerEnum.CN_PA, req,
                new ParameterizedTypeReference<>() {
                }));
    }

    @Override
    public TemuFileUploadResp fileUpload(String url) {
        final var req = new TemuFileUploadReq();
        req.setImage(TemuUtils.imageBase64(url));
        req.setImageBizType(Bool.NO.getCode());
        req.setType(TemuPartnerPATypeEnum.IMAGE_UPLOAD.getCode());
        return request(new TemuRequestDTO<>(TemuPartnerEnum.CN_PA, req,
                new ParameterizedTypeReference<>() {
                }));
    }

    @Override
    public List<TemuWarehouseResp> getWarehouse(TemuWarehouseGetReq req) {
        req.setType(TemuPartnerPATypeEnum.WAREHOUSE_LIST.getCode());
        return request(new TemuRequestDTO<>(TemuPartnerEnum.CN_PA, req,
                new ParameterizedTypeReference<TemuCommonResp<TemuWarehouseResultResp>>() {
                })).getWarehouseDTOList();
    }

    @Override
    public List<TemuFreightTemplateDTO> getLogisticsTemplate(TemuLogisticsTemplateGetReq req) {
        req.setType(TemuPartnerPATypeEnum.LOGISTICS_TEMPLATE.getCode());
        return request(new TemuRequestDTO<>(TemuPartnerEnum.CN_PA, req,
                new ParameterizedTypeReference<TemuCommonResp<TemuFreightTemplateResp>>() {
                })).getFreightTemplates();
    }

    @Override
    public String videoSign() {
        final var req = new TemuCommonReq();
        req.setType(TemuPartnerPATypeEnum.VIDEO_UPLOAD_SIGN.getCode());
        return request(new TemuRequestDTO<>(TemuPartnerEnum.CN_PA, req,
                new ParameterizedTypeReference<TemuCommonResp<TemuVideoUploadSignResp>>() {
                })).getSign();
    }

    @Override
    public String galerieStoreVideo(TemuGalerieStoreVideoReq req) {
        final var type = TemuUrlEnum.STORE_VIDEO.getVale();
        final var httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);
        final var httpEntity = new HttpEntity<Object>(req.toMap(), httpHeaders);
        RestRequestContext.set(new RestLogDTO(TemuPartnerEnum.CN_PA, type, false, true));
        final var resp = TemuRestApi.post(httpEntity, storeVideoUrl(type),
                new ParameterizedTypeReference<TemuGalerieStoreVideoResp>() {
                });
        return resp.getVid();
    }

    @Override
    public TemuVideoResultResp getVideoResult(TemuVideoResultGetReq req) {
        req.setType(TemuPartnerPATypeEnum.VIDEO_UPLOAD_RESULT.getCode());
        return request(new TemuRequestDTO<>(TemuPartnerEnum.CN_PA, req,
                new ParameterizedTypeReference<>() {
                }));
    }

    @Override
    public TemuSearchProductResultResp searchProduct(TemuSearchProductReq req) {
        req.setType(TemuPartnerPATypeEnum.PRODUCT_SEARCH.getCode());
        return request(new TemuRequestDTO<>(TemuPartnerEnum.CN_PA, req,
                new ParameterizedTypeReference<>() {
                }));
    }

    @Override
    public boolean editProductPictures(TemuProductEditPicturesReq req) {
        req.setType(TemuPartnerPATypeEnum.EDIT_PICTURES.getCode());
        request(new TemuRequestDTO<>(TemuPartnerEnum.CN_PA, req,
                new ParameterizedTypeReference<>() {
                }));
        return true;
    }

    @Override
    public TemuTokenResultResp getTokenInfo() {
        final var req = new TemuCommonReq();
        req.setType(TemuPartnerPATypeEnum.ACCESS_TOKEN_INFO.getCode());
        return request(new TemuRequestDTO<>(TemuPartnerEnum.CN_PA, req,
                new ParameterizedTypeReference<>() {
                }));
    }

    @Override
    public TemuProductPriceReviewPageResultResp pagePriceReview(TemuProductPriceReviewPageReq req) {
        req.setType(TemuPartnerPATypeEnum.PRICE_REVIEW_PAGE.getCode());
        return request(new TemuRequestDTO<>(TemuPartnerEnum.CN_PA, req,
                new ParameterizedTypeReference<>() {
                }));
    }

    @Override
    public boolean rejectPriceReview(TemuProductPriceReviewRejectReq req) {
        req.setType(TemuPartnerPATypeEnum.GOODS_PRICE_REVIEW_REJECT.getCode());
        request(new TemuRequestDTO<>(TemuPartnerEnum.CN_PA, req,
                new ParameterizedTypeReference<>() {
                }));
        return true;
    }

    @Override
    public boolean confirmPriceReview(TemuProductPriceReviewConfirmReq req) {
        req.setType(TemuPartnerPATypeEnum.GOODS_PRICE_REVIEW_CONFIRM.getCode());
        request(new TemuRequestDTO<>(TemuPartnerEnum.CN_PA, req,
                new ParameterizedTypeReference<>() {
                }));
        return true;
    }

    @Override
    public TemuProductPageResultResp pageListGetProduct(TemuProductListGetPageReq req) {
        req.setType(TemuPartnerPATypeEnum.GOODS_LIST_GET.getCode());
        return request(new TemuRequestDTO<>(TemuPartnerEnum.CN_PA, req,
                new ParameterizedTypeReference<>() {
                }));
    }

    @Override
    public TemuProductStockResultResp getStockQuantity(TemuProductQuantityGetReq req) {
        req.setType(TemuPartnerPATypeEnum.GOODS_STOCK_QUANTITY_GET.getCode());
        return request(new TemuRequestDTO<>(TemuPartnerEnum.CN_PA, req,
                new ParameterizedTypeReference<>() {
                }));
    }

    @Override
    public TemuProductSupplierPriceResultResp getPriceList(TemuProductPriceListGetReq req) {
        req.setType(TemuPartnerPATypeEnum.GOODS_PRICE_LIST_GET.getCode());
        return request(new TemuRequestDTO<>(TemuPartnerEnum.CN_PA, req,
                new ParameterizedTypeReference<>() {
                }));
    }

    @Override
    public TemuProductAccessoriesResultResp getAccessoriesList(TemuProductAccessoriesListGetPageReq req) {
        req.setType(TemuPartnerPATypeEnum.GOODS_ACCESSORIES_GET.getCode());
        return request(new TemuRequestDTO<>(TemuPartnerEnum.CN_PA, req,
                new ParameterizedTypeReference<>() {
                }));
    }

    private String storeVideoUrl(final String path) {
        return StrUtil.replace(paTemuProperties.getUrl(), TemuUrlEnum.OPENAPI_ROUTER.getVale(), path);
    }

    private <R extends TemuCommonReq, T> T request(final TemuRequestDTO<R, T> dto) {
        final var req = dto.req();
        final var type = dto.type();
        RestRequestContext.set(new RestLogDTO(type, req.getType(), true, true));
        final var prop = this.mapProperties.get(type);
        final var app = TemuShopContext.get();
        req.setAccessToken(app.getAccessToken());
        req.setAppKey(app.getAppKey());
        req.setTimestamp(String.valueOf(TemuConvert.getTimestamp()));
        req.setSign(TemuUtils.sign(TemuConvert.convert(req), app.getAppSecret()));
        final var resp = TemuRestApi.post(prop.getUrl(), TemuConvert.writeValueAsString(req), dto.typeReference());
        if (resp.succeed()) {
            return resp.getResult();
        }
        if (Objects.equals(TemuErrorCodeEnum.ACCESS_TOKEN_INVALID.getCode(), resp.getErrorCode())) {
            throw new ValidationException(resp.getErrorMsg());
        }
        throw new BusinessException(resp.getErrorCode() + ":" + resp.getErrorMsg());
    }

    @PostConstruct
    void init() {
        mapProperties.putIfAbsent(TemuPartnerEnum.US, this.usTemuProperties);
        mapProperties.putIfAbsent(TemuPartnerEnum.CN, this.cnTemuProperties);
        mapProperties.putIfAbsent(TemuPartnerEnum.CN_PA, this.paTemuProperties);
        mapProperties.putIfAbsent(TemuPartnerEnum.GLOBAL, this.gloTemuProperties);
        ImageUtils.initDirection();
    }
}
