package tech.tiangong.sdp.temu.serivce;

import tech.tiangong.sdp.temu.vo.dto.TemuFreightTemplateDTO;
import tech.tiangong.sdp.temu.vo.dto.TemuSizeSpecClassCatDTO;
import tech.tiangong.sdp.temu.vo.req.*;
import tech.tiangong.sdp.temu.vo.resp.*;

import java.util.List;

/**
 * Temu商品Service
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 11:03
 */
public interface TemuProductService {
    List<TemuGoodsCatResp> getGoodsCatListFormUS(final TemuGoodsCatReq req);

    List<TemuGoodsCatResp> getGoodsCatList(final TemuGoodsCatReq req);

    TemuGoodsTemplateResultResp getGoodsTemplateFormUS(final Long catId);

    TemuGoodsTemplateResultResp getGoodsTemplate(final Long catId);

    TemuSizeSpecClassCatDTO getSizeSpecClass(final Long catId);

    TemuGoodsSizeSpecElementRuleResp getGoodsSizeSpecElementFormUS(final Long catId);

    TemuSizeResultResp getGoodsSize(final Long catId);

    Long sizeChartsTemplateCreate(final Long businessId);

    TemuSizeChartsCreateResp sizeChartsCreate(final TemuSizeChartsCreateReq req);

    TemuProductAddResp addProduct(final TemuGoodsAddReq req);

    TemuFileUploadResp fileUpload(final String url);

    List<TemuWarehouseResp> getWarehouse(final TemuWarehouseGetReq req);

    List<TemuFreightTemplateDTO> getLogisticsTemplate(final TemuLogisticsTemplateGetReq req);

    String videoSign();
    String galerieStoreVideo(final TemuGalerieStoreVideoReq req);
    TemuVideoResultResp getVideoResult(final TemuVideoResultGetReq req);
    TemuSearchProductResultResp searchProduct(final TemuSearchProductReq req);
    boolean editProductPictures(final TemuProductEditPicturesReq req);
    TemuTokenResultResp getTokenInfo();
    TemuProductPriceReviewPageResultResp pagePriceReview(final TemuProductPriceReviewPageReq req);
    boolean rejectPriceReview(final TemuProductPriceReviewRejectReq req);
    boolean confirmPriceReview(final TemuProductPriceReviewConfirmReq req);
    TemuProductPageResultResp pageListGetProduct(final TemuProductListGetPageReq req);
    TemuProductStockResultResp getStockQuantity(final TemuProductQuantityGetReq req);
    TemuProductSupplierPriceResultResp getPriceList(final TemuProductPriceListGetReq req);
    TemuProductAccessoriesResultResp getAccessoriesList(final TemuProductAccessoriesListGetPageReq req);
}
