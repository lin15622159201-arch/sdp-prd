package tech.tiangong.sdp.service;

import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.common.req.AiTaskCallbackReq;
import tech.tiangong.sdp.entity.StyleOnShelves;
import tech.tiangong.sdp.entity.TemuOrderSync;
import tech.tiangong.sdp.vo.dto.StyleOnShelvesGroupDTO;
import tech.tiangong.sdp.vo.req.PushShopReviewReq;
import tech.tiangong.sdp.vo.req.StyleOnShelvesPageReq;
import tech.tiangong.sdp.vo.req.StyleOnShelvesReleaseReq;
import tech.tiangong.sdp.vo.req.StyleOnShelvesReviewReq;
import tech.tiangong.sdp.vo.resp.StyleOnShelvesPageResp;
import tech.tiangong.sdp.vo.resp.StyleOnShelvesResp;

import java.util.List;


/**
 * 上架
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/11 15:36
 */
public interface StyleOnShelvesService extends BasicService{
    void onShelves(final StyleOnShelves style);
    void test();

    void callBackCrop(AiTaskCallbackReq req);

    PageVo<StyleOnShelvesPageResp> page(StyleOnShelvesPageReq req);

    StyleOnShelvesResp detail(Long styleId);

    StyleOnShelvesResp detailAll(Long styleId);

    Boolean review(StyleOnShelvesReviewReq req);

    Boolean releaseResult(StyleOnShelvesReleaseReq req);

    Boolean offShelves(Long  styleId);


    Boolean releaseProduct(Long styleId);

    boolean temuOrderSync(TemuOrderSync req);

    StyleOnShelvesGroupDTO stateTotal(StyleOnShelvesPageReq req);

    Boolean addProductUpdateTag(Long styleId);

    Boolean pushShopReview(PushShopReviewReq req);


    void refreshSkcPicture(List<String> styleCodes);
}
