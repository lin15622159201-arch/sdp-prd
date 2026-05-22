package tech.tiangong.sdp.service;

import jakarta.servlet.http.HttpServletResponse;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.common.req.SpotSkcCancelReq;
import tech.tiangong.sdp.entity.DevelopStyleTask;
import tech.tiangong.sdp.entity.SpotStylePicture;
import tech.tiangong.sdp.entity.TemuOrderSync;
import tech.tiangong.sdp.vo.dto.DesignImageDTO;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.*;

import java.util.ArrayList;
import java.util.List;

/**
 * 现货管理Service
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/6 16:05
 */
public interface SpotStyleTaskService extends BasicService {
    PageVo<SpotStyleTaskPageResp> page(final SpotStyleTaskPageReq req);

    void exportExcel(final SpotStyleTaskPageReq req, final HttpServletResponse response);

    Boolean batchCreate(final List<SpotStyleTaskAddReq> req);

    List<SpotStyleEditProductImageResp> batchEditProductImage(final List<SpotStyleEditProductImageReq> req);

    Boolean edit(final SpotStyleTaskEditReq req);

    Boolean editSkc(final SpotStyleSkcEditReq req);

    Boolean batchReColor(final List<SpotStyleSkcReColorReq> req);

    SpotStyleTaskResp detailId(final Long taskId);

    SpotStyleTaskResp detailCode(final String taskCode);

    List<SpotStyleOptResp> listOpt(final List<Long> taskIds);

    Boolean batchCancel(final List<SpotStyleCancelReq> req);


    Boolean batchOnShelves(final List<Long> taskIds);

    String batchDevelop(final DevelopStyleTask task);

    Boolean batchCancelSkc(List<SpotStyleSkcCancelReq> req);

    Boolean onShelvesResult(List<SpotStyleTaskOnShelvesReviewReq> req);

    Boolean batchImageUpdate(List<SpotStyleImageUpdateReq> reqs);

    List<SpotStyleSupplierResp> listSupplier(List<SpotSupplierListReq> reqs);

    boolean temuSync(final TemuOrderSync sync);

    Boolean pushPlmBuyer(final List<Long> taskIds);

    Boolean batchBuyerCancel(final List<SpotSkcCancelReq> req);

    boolean test(final Long taskId);

    Boolean releaseResult(StyleOnShelvesReleaseReq req);

    List<SkcImageResp> listByDesignImage(List<DesignImageDTO> spotVectors);

    void historyVector() ;

    Boolean updateProductTag(Long taskId, List<SpotStylePicture> skcPictures, List<String> updatePictures);

    void designerChange(SpotStyleChangeDesignerReq req);
}
