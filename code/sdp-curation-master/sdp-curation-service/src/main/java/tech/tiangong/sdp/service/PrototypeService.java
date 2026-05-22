package tech.tiangong.sdp.service;

import jakarta.servlet.http.HttpServletResponse;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.common.req.AiTaskCallbackReq;
import tech.tiangong.sdp.common.req.DisassemblyFinishedNotifyInnerReq;
import tech.tiangong.sdp.common.req.PrototypeBatchCancelReq;
import tech.tiangong.sdp.entity.DesignStyle;
import tech.tiangong.sdp.entity.Prototype;
import tech.tiangong.sdp.entity.PrototypeMaterial;
import tech.tiangong.sdp.entity.TemuOrderSync;
import tech.tiangong.sdp.vo.dto.DesignImageDTO;
import tech.tiangong.sdp.vo.dto.DesignStyleUpdateDto;
import tech.tiangong.sdp.vo.query.PrototypeQuery;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.*;

import java.util.List;
import java.util.Map;

/**
 * 设计款管理-服务接口
 *
 * @author cenlijin
 * @since 2021-08-09 14:43:17
 */
public interface PrototypeService {

    /**
     * 设计款号管理 条件分页查询
     *
     * @param queryDTO 请求参数
     * @return 返回
     */
    PageVo<PrototypeQueryResp> page(PrototypeQuery queryDTO);

    /**
     * 设计款详情-首页(SPU + SKC)
     *
     * @param prototypeId 设计款ID
     * @return 返回
     */
    PrototypeTagVo spuSkcInfo(Long prototypeId);

    NormalSkcCreateResp normalSkcCreate(DesignStyle designStyleEo);

    void updateSpuInfoWithinHistory(DesignStyleUpdateDto updateDto);

    PrototypeSubmitVo save(PrototypeOperateReq req, boolean fromDevelop);

    Boolean materialChange(DesignStyle designStyle, Prototype prototype, PrototypeOperateReq prototypeReq, Map<Long, List<PrototypeMaterial>> originalImageMap) ;

    Long colorsMaking(ColorsMakingReq req);

    /**
     * 复色
     * <p>
     * 业务校验逻辑调用方处理, 当前接口只负责生成数据
     *
     * @param normalPrototypeId 需要复色打版的版单id
     * @return 复色打版的版单id
     */
    Long colorsMakingCreate(Long normalPrototypeId);

    void designerChange(ChgDesignerReq req);

    PrototypeVo cancelDesign(PrototypeCancelReq cancelReq);

    /**
     * 根据主键查询详情
     *
     * @param id 主键
     * @return 数据实体
     */
    PrototypeVo getById(Long id);

    /**
     * 批量查询设计版单打印信息
     *
     * @param req 入参
     * @return 版单打印信息集合
     */
    List<PrototypePrintInfoVo> batchPrintInfo(BatchPrintReq req);

    List<PrototypeExcelResp> prototypeManageExportExcel(PrototypeQuery queryDTO, HttpServletResponse response);

    void addVersionNumAndPushPlm(String styleCode);

    Boolean plmBatchCancel(PrototypeBatchCancelReq req);

    void pushPlm(PushPlmReq req);

    void pushSpuSkc(PushPlmSendReq req);

    void getCodeByPlm(DesignStyleCreateSendMqReq req);

    void job();

    boolean temuOrderSync(TemuOrderSync req);

    Boolean batchOnShelves(List<Long> taskIds);

    Boolean batchOnShelvesResult(List<PrototypeBatchOnShelvesResultReq> list);

    /**
     * 批量测评通过
     * @param designStyleIds
     * @return
     */
    Boolean batchPricePassed(DesignStylePricePassed designStyleIds);

    void  test(List<Long> logIds);

    List<BaseSkuResp> batchQuerySkuBySkc(SkcBatchQueryReq req);

    Boolean disassemblyFinished(DisassemblyFinishedNotifyInnerReq req);

    Boolean releaseResult(StyleOnShelvesReleaseReq req);

    void refreshSkcPicture(List<String> styleCodes);

    void updateMaterialByImageTask(String spuCode, List<Long> skcIds, Integer taskType, ImageUpdateTaskCheckReq req);

    void pickingPushPictureToPrototype(Long skcId, List<String> allPictures);

    void callback(AiTaskCallbackReq req);

    void historyVector(List<String> spuCodes) ;

    List<SkcImageResp> listByDesignImage(List<DesignImageDTO> list);

    void generateSku(DesignStyle style, Prototype prototype) ;

    List<BomOrderMaterialResp> batchQueryBomBySkc(SpuBatchQueryReq req);
    void salesDriving() ;

    void changeSizeStandardCode(DesignStyleUpdateDto designStyle);
}