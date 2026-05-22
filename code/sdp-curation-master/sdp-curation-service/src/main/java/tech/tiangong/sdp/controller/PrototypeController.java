package tech.tiangong.sdp.controller;


import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import team.aikero.blade.core.constant.UrlVersionConstant;
import team.aikero.blade.core.protocol.DataResponse;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.service.PrototypeService;
import tech.tiangong.sdp.util.ExcelExportUtil;
import tech.tiangong.sdp.vo.query.PrototypeQuery;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.*;

import java.util.List;

import static team.aikero.blade.core.protocol.DataResponseExtKt.ok;

/**
 * 款式管理-SKC-web
 *
 * @author cenlijin
 * @since 2021-08-09 14:43:19
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(UrlVersionConstant.WEB + UrlVersionConstant.VERSION_V1 + "/prototype-manage")
public class PrototypeController implements BasicController {

    private final PrototypeService manageService;

    /**
     * 查询列表（分页）
     *
     * @param queryDTO 分页对象
     * @return 设计款号分页列表
     */
    @PostMapping("/page")
    public DataResponse<PageVo<PrototypeQueryResp>> page(@RequestBody @Validated PrototypeQuery queryDTO) {
        return page(() -> manageService.page(queryDTO));
    }


    /**
     * 设计款详情-(SPU + SKC)
     *
     * @param prototypeId SKC主键ID
     * @return 返回
     */
    @GetMapping("/base-info/{prototypeId}")
    public DataResponse<PrototypeTagVo> spuSkcInfo(@PathVariable(value = "prototypeId") Long prototypeId) {
        return one(() -> manageService.spuSkcInfo(prototypeId));
    }


    /**
     * 提交
     *
     * @param req 请求参数对象
     * @return skc下最新版本的bomId
     */
    @PutMapping("/save")
    public DataResponse<PrototypeSubmitVo> save(@RequestBody @Validated PrototypeOperateReq req) {
        return one(() -> manageService.save(req, false));
    }

    /**
     * 复色
     *
     * @param req 入参
     * @return 响应结果
     */
    @PostMapping("/colors-making")
    public DataResponse<Long> colorsMaking(@RequestBody @Validated ColorsMakingReq req) {
        return one(() -> manageService.colorsMaking(req));
    }


    /**
     * 设计师变更
     *
     * @param req 设计师变更请求信息
     */
    @PostMapping("/designer-change")
    public DataResponse<Void> designerChange(@RequestBody @Validated ChgDesignerReq req) {
        manageService.designerChange(req);
        return ok();
    }

    /**
     * 取消设计款
     *
     * @param cancelReq 取消请求对象
     * @return Void
     */
    @PostMapping("/cancel")
    public DataResponse<Void> cancelDesign(@RequestBody @Validated PrototypeCancelReq cancelReq) {
        manageService.cancelDesign(cancelReq);
        return ok();
    }

    /**
     * 批量查询设计版单打印信息
     *
     * @param req 入参
     * @return 版单打印信息集合
     */
    @PostMapping("/print-batch")
    public DataResponse<List<PrototypePrintInfoVo>> getPrintInfoByDesignCode(@RequestBody @Validated BatchPrintReq req) {
        return one(() -> manageService.batchPrintInfo(req));
    }

    /**
     * 导出款式数据---最多导出5K条记录
     */
    @PostMapping("/export/excel")
    public DataResponse<Void> prototypeManageExportExcel(@RequestBody @Validated PrototypeQuery queryDTO, HttpServletResponse response) throws Exception {
        List<PrototypeExcelResp> resp = manageService.prototypeManageExportExcel(queryDTO, response);
        ExcelExportUtil.prototypeTemplateExport(resp, response);
        return ok();
    }

    /**
     * 推送PLM
     *
     * @param req 请求
     * @return Void
     */
    @PostMapping("/push-plm")
    public DataResponse<Void> pushPlm(@RequestBody @Validated PushPlmReq req) {
        manageService.pushPlm(req);
        return ok();
    }

    /**
     * 批量上架
     *
     * @param taskIds SKC的ID数组
     * @return 结果
     */
    @PutMapping("/batch/on-shelves")
    public DataResponse<Boolean> batchOnShelves(final @Valid @RequestBody List<Long> taskIds) {
        return one(() -> manageService.batchOnShelves(taskIds));
    }

    /**
     * 手动获取plm编码
     *
     * @param req 请求
     * @return Void
     */
    @PostMapping("/get-code-by-plm")
    public DataResponse<Void> getCodeByPlm(@RequestBody @Validated DesignStyleCreateSendMqReq req) {
//        manageService.getCodeByPlm(req);
        return ok();
    }


    /**
     * 手动推送PLM-SPU-SKC
     *
     * @param req 请求
     * @return Void
     */
    @PostMapping("/push-spu-skc")
    public DataResponse<Void> pushSpuSkc(@RequestBody @Validated PushPlmSendReq req) {
//        manageService.pushSpuSkc(req);
        return ok();
    }

    /**
     *  营销图由SPU维度变为SKC维度刷数
     */
    @PostMapping("/refresh-skc-picture")
    public DataResponse<Void> refreshSkcPicture(@RequestBody List<String> styleCodes) {
        manageService.refreshSkcPicture(styleCodes);
        return ok();
    }

    /**
     *  款式历史向量处理
     */
    @PostMapping("/history-vector")
    public DataResponse<Void> historyVector(@RequestBody List<String> styleCodes) {
        manageService.historyVector(styleCodes);
        return ok();
    }


}