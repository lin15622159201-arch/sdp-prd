package tech.tiangong.sdp.controller;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import team.aikero.blade.core.constant.UrlVersionConstant;
import team.aikero.blade.core.protocol.DataResponse;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.service.SpotStyleTaskService;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.*;

import java.util.List;

import static team.aikero.blade.core.protocol.DataResponseExtKt.ok;

/**
 * 现货管理 - WEB
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 16:52
 */
@RestController
@RequestMapping(UrlVersionConstant.WEB + UrlVersionConstant.VERSION_V1 + "/spot-style/")
@RequiredArgsConstructor
public class SpotStyleTaskController implements BasicController {
    private final SpotStyleTaskService spotStyleTaskService;

    /**
     * 查询任务列表
     *
     * @param req 参数
     * @return 列表
     */
    @PostMapping("page")
    public DataResponse<PageVo<SpotStyleTaskPageResp>> page(final @Valid @RequestBody SpotStyleTaskPageReq req) {
        return page(() -> spotStyleTaskService.page(req));
    }

    /**
     * 导出Excel
     *
     * @param req 参数
     */
    @PostMapping("export-excel")
    public void exportExcel(final @Valid @RequestBody SpotStyleTaskPageReq req, final HttpServletResponse response) {
        non(() -> spotStyleTaskService.exportExcel(req, response));
    }

    /**
     * 创建任务
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("batch-create")
    public DataResponse<Boolean> batchCreate(final @Valid @RequestBody List<SpotStyleTaskAddReq> req) {
        return one(() -> spotStyleTaskService.batchCreate(req));
    }

    /**
     * 编辑商品图
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("batch/edit-image")
    public DataResponse<List<SpotStyleEditProductImageResp>> batchEditProductImage(final @Valid @RequestBody List<SpotStyleEditProductImageReq> req) {
        return list(() -> spotStyleTaskService.batchEditProductImage(req));
    }

    /**
     * 编辑
     *
     * @param req 参数
     * @return 结果
     */
    @PutMapping("edit")
    public DataResponse<Boolean> edit(final @Valid @RequestBody SpotStyleTaskEditReq req) {
        return one(() -> spotStyleTaskService.edit(req));
    }

    /**
     * 编辑SKC
     *
     * @param req 参数
     * @return 结果
     */
    @PutMapping("edit-sck")
    public DataResponse<Boolean> editSkc(final @Valid @RequestBody SpotStyleSkcEditReq req) {
        return one(() -> spotStyleTaskService.editSkc(req));
    }

    /**
     * 复色
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("batch/re-color")
    public DataResponse<Boolean> batchReColor(final @Valid @RequestBody List<SpotStyleSkcReColorReq> req) {
        return one(() -> spotStyleTaskService.batchReColor(req));
    }

    /**
     * 根据ID查看详情
     *
     * @param taskId 任务ID
     * @return 详情
     */
    @GetMapping("detail/{taskId}")
    public DataResponse<SpotStyleTaskResp> detailId(final @PathVariable("taskId") Long taskId) {
        return one(() -> spotStyleTaskService.detailId(taskId));
    }

    /**
     * 根据编码查看详情
     *
     * @param taskCode 任务编码
     * @return 详情
     */
    @GetMapping("detail-code/{taskCode}")
    public DataResponse<SpotStyleTaskResp> detailCode(final @PathVariable("taskCode") String taskCode) {
        return one(() -> spotStyleTaskService.detailCode(taskCode));
    }

    /**
     * 查询操作列表
     *
     * @param taskIds 参数
     * @return 列表
     */
    @PostMapping("list-opt")
    public DataResponse<List<SpotStyleOptResp>> listOpt(final @RequestBody List<Long> taskIds) {
        return list(() -> spotStyleTaskService.listOpt(taskIds));
    }

    /**
     * 批量取消
     *
     * @param req 参数
     * @return 结果
     */
    @PutMapping("batch-cancel")
    public DataResponse<Boolean> batchCancel(final @Valid @RequestBody List<SpotStyleCancelReq> req) {
        return one(() -> spotStyleTaskService.batchCancel(req));
    }

    /**
     * 批量取消 - SKC
     *
     * @param req 参数
     * @return 结果
     */
    @PutMapping("batch-cancel/skc")
    public DataResponse<Boolean> batchCancelSkc(final @Valid @RequestBody List<SpotStyleSkcCancelReq> req) {
        return one(() -> spotStyleTaskService.batchCancelSkc(req));
    }

    /**
     * 批量上架
     *
     * @param taskIds 任务ID集合
     * @return 结果
     */
    @PutMapping("batch/on-shelves")
    public DataResponse<Boolean> batchOnShelves(final @Valid @RequestBody List<Long> taskIds) {
        return one(() -> spotStyleTaskService.batchOnShelves(taskIds));
    }

    /**
     * 查询供应商列表
     *
     * @param reqs 参数
     * @return 结果
     */
    @PostMapping("list-supplier")
    public DataResponse<List<SpotStyleSupplierResp>> listSupplier(final @Valid @RequestBody List<SpotSupplierListReq> reqs) {
        return list(() -> spotStyleTaskService.listSupplier(reqs));
    }

    /**
     * 推送PLM买手
     *
     * @param taskIds 参数
     * @return 结果
     */
    @PutMapping("push-buyer")
    public DataResponse<Boolean> pushBuyer(final @RequestBody List<Long> taskIds) {
        return one(() -> spotStyleTaskService.pushPlmBuyer(taskIds));
    }

    /**
     * 设计师变更
     *
     * @param req 设计师变更请求信息
     */
    @PostMapping("/designer-change")
    public DataResponse<Void> designerChange(@RequestBody @Validated SpotStyleChangeDesignerReq req) {
        spotStyleTaskService.designerChange(req);
        return ok();
    }
}
