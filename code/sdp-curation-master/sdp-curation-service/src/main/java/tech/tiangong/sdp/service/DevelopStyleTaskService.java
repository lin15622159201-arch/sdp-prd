package tech.tiangong.sdp.service;

import org.springframework.web.multipart.MultipartFile;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.butted.common.req.base.CompanyUserBatchReq;
import tech.tiangong.sdp.common.req.AiTaskCallbackReq;
import tech.tiangong.sdp.common.req.DevelopStyleRelaAddReq;
import tech.tiangong.sdp.vo.dto.DevelopStyleExcelDTO;
import tech.tiangong.sdp.vo.dto.DevelopStyleStateGroupDTO;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.*;
import tech.tiangong.sdp.vo.resp.DevelopStyleOptResp;
import tech.tiangong.sdp.vo.resp.DevelopStyleRemarkResp;
import tech.tiangong.sdp.vo.resp.DevelopStyleTaskPageResp;
import tech.tiangong.sdp.vo.resp.SkcImageResp;

import java.io.InputStream;
import java.util.List;

/**
 * 开款任务Service
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 15:17
 */
public interface DevelopStyleTaskService extends BasicService {
    PageVo<DevelopStyleTaskPageResp> page(final DevelopStyleTaskPageReq req);
    List<DevelopStyleStateGroupDTO> stateTotal(final DevelopStyleTaskPageReq req);

    Boolean batchCreate(final List<DevelopStyleTaskAddReq> req);

    List<DevelopStyleTaskCreateResp> batchCreateOpen(final CompanyUserBatchReq<DevelopStyleTaskOpenAddReq> req);

    Boolean batchCheck(final List<DevelopStyleTaskCheckReq> req);

    Boolean batchDevelop(final List<DevelopStyleSpuAddReq> req);

    Boolean batchRela(final List<DevelopStyleRelaAddReq> req);

    Boolean batchIdentify(final List<Long> taskIds);

    Boolean addRemark(final DevelopStyleRemarkReq req);

    List<DevelopStyleRemarkResp> listRemark(final List<Long> taskIds);

    List<DevelopStyleOptResp> listOpt(final List<Long> taskIds);

    Boolean batchDeleted(final List<Long> taskIds);

    List<DevelopStyleExcelDTO> importExcel(final MultipartFile file);
    List<DevelopStyleExcelDTO> importExcel(final InputStream inputStream);
    Long pickingStyleDevelop(final  PickingStyleDevelopReq req) ;
    void callbackPatternCheck(AiTaskCallbackReq req);
    void callbackClip (AiTaskCallbackReq req) ;
    void callbackFabricIdentify(AiTaskCallbackReq req);
    void callbackFashionAnalysis(AiTaskCallbackReq req);

    List<DevelopStyleTaskQueryResp> queryList(DevelopStyleTaskOpenQueryReq req);

    void callbackMulfeatExtract(AiTaskCallbackReq req);

    List<SkcImageResp> listSameSkc(List<Long> taskIds);
    void historyVector() ;
}
