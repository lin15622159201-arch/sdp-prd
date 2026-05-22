package tech.tiangong.sdp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import team.aikero.blade.core.constant.UrlVersionConstant;
import team.aikero.blade.core.protocol.DataResponse;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.service.DevelopStyleTaskService;
import tech.tiangong.sdp.vo.dto.DevelopStyleExcelDTO;
import tech.tiangong.sdp.vo.dto.DevelopStyleStateGroupDTO;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.DevelopStyleOptResp;
import tech.tiangong.sdp.vo.resp.DevelopStyleRemarkResp;
import tech.tiangong.sdp.vo.resp.DevelopStyleTaskPageResp;
import jakarta.validation.Valid;
import tech.tiangong.sdp.vo.resp.SkcImageResp;

import java.util.List;

/**
 * 开款任务 - WEB
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 16:52
 */
@RestController
@RequestMapping(UrlVersionConstant.WEB + UrlVersionConstant.VERSION_V1 + "/develop-style/")
@RequiredArgsConstructor
public class DevelopStyleTaskController implements BasicController {
    private final DevelopStyleTaskService developStyleTaskService;

    /**
     * 查询任务列表
     *
     * @param req 参数
     * @return 列表
     */
    @PostMapping("page")
    public DataResponse<PageVo<DevelopStyleTaskPageResp>> page(final @Valid @RequestBody DevelopStyleTaskPageReq req) {
        return page(() -> developStyleTaskService.page(req));
    }

    /**
     * 查询任务总数
     *
     * @param req 参数
     * @return 列表
     */
    @PostMapping("state-total")
    public DataResponse<List<DevelopStyleStateGroupDTO>> stateTotal(final @Valid @RequestBody DevelopStyleTaskPageReq req) {
        return list(() -> developStyleTaskService.stateTotal(req));
    }

    /**
     * 创建任务
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("batch-create")
    public DataResponse<Boolean> batchCreate(final @Valid @RequestBody List<DevelopStyleTaskAddReq> req) {
        return one(() -> developStyleTaskService.batchCreate(req));
    }

    /**
     * 备注
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("remark")
    public DataResponse<Boolean> remark(final @Valid @RequestBody DevelopStyleRemarkReq req) {
        return one(() -> developStyleTaskService.addRemark(req));
    }

    /**
     * 审核任务
     *
     * @param req 参数
     * @return 结果
     */
    @PutMapping("batch-check")
    public DataResponse<Boolean> batchCheck(final @Valid @RequestBody List<DevelopStyleTaskCheckReq> req) {
        return one(() -> developStyleTaskService.batchCheck(req));
    }

    /**
     * 开款
     *
     * @param req 参数
     * @return 结果
     */
    @PutMapping("batch-develop")
    public DataResponse<Boolean> batchDevelop(final @Valid @RequestBody List<DevelopStyleSpuAddReq> req) {
        return one(() -> developStyleTaskService.batchDevelop(req));
    }

    /**
     * 查询备注列表
     *
     * @param taskIds 参数
     * @return 列表
     */
    @PostMapping("list-remark")
    public DataResponse<List<DevelopStyleRemarkResp>> listRemark(final @RequestBody List<Long> taskIds) {
        return list(() -> developStyleTaskService.listRemark(taskIds));
    }

    /**
     * 查询操作列表
     *
     * @param taskIds 参数
     * @return 列表
     */
    @PostMapping("list-opt")
    public DataResponse<List<DevelopStyleOptResp>> listOpt(final @RequestBody List<Long> taskIds) {
        return list(() -> developStyleTaskService.listOpt(taskIds));
    }

    /**
     * 批量识别
     *
     * @param taskIds 任务ID集合
     * @return 结果
     */
    @PostMapping("batch-identify")
    public DataResponse<Boolean> batchIdentify(final @RequestBody List<Long> taskIds) {
        return one(() -> developStyleTaskService.batchIdentify(taskIds));
    }

    /**
     * 导入Excel
     *
     * @param file Excel
     * @return 结果
     */
    @PostMapping("import-excel")
    public DataResponse<List<DevelopStyleExcelDTO>> importExcel(final @RequestParam("file") MultipartFile file) {
        return list(() -> developStyleTaskService.importExcel(file));
    }

    /**
     * 批量删除
     *
     * @param taskIds 任务ID集合
     * @return 结果
     */
    @PostMapping("deleted/batch")
    public DataResponse<Boolean> batchDeleted(final @Valid @RequestBody List<Long> taskIds) {
        return one(() -> developStyleTaskService.batchDeleted(taskIds));
    }

    /**
     * 查询同款列表
     *
     * @param taskIds 参数
     * @return 列表
     */
    @PostMapping("list-same-skc")
    public DataResponse<List<SkcImageResp>> listSameSkc(final @RequestBody List<Long> taskIds) {
        return list(() -> developStyleTaskService.listSameSkc(taskIds));
    }
}
