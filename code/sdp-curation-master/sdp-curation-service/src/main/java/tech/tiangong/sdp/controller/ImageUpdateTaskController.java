package tech.tiangong.sdp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import team.aikero.blade.core.constant.UrlVersionConstant;
import team.aikero.blade.core.protocol.DataResponse;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.service.ImageUpdateTaskService;
import tech.tiangong.sdp.vo.dto.ImageUpdateTaskDTO;
import tech.tiangong.sdp.vo.dto.ImageUpdateTaskGroupDTO;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.*;

import java.util.List;

import static team.aikero.blade.core.protocol.DataResponseExtKt.ok;

/**
 * 图片修复任务 - WEB
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/5 16:52
 */
@RestController
@RequestMapping(UrlVersionConstant.WEB + UrlVersionConstant.VERSION_V1 + "/image-update/")
@RequiredArgsConstructor
public class ImageUpdateTaskController implements BasicController {

    private final ImageUpdateTaskService imageUpdateTaskService;

    /**
     * 查询任务列表
     *
     * @param req 参数
     * @return 列表
     */
    @PostMapping("page")
    public DataResponse<PageVo<ImageUpdateTaskPageResp>> page(final @Validated @RequestBody ImageUpdateTaskPageReq req) {
        return page(() -> imageUpdateTaskService.page(req));
    }

    /**
     * 查询任务总数
     *
     * @param req 参数
     * @return 列表
     */
    @PostMapping("state-total")
    public DataResponse<List<ImageUpdateTaskGroupDTO>> stateTotal(final @Validated @RequestBody ImageUpdateTaskPageReq req) {
        return list(() -> imageUpdateTaskService.stateTotal(req));
    }

    /**
     * 创建任务
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("batch-create")
    public DataResponse<Boolean> batchCreate(final @Validated @RequestBody List<ImageUpdateTaskAddReq> req) {
        return one(() -> imageUpdateTaskService.batchCreate(req));
    }

    /**
     * 编辑任务
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("edit")
    public DataResponse<Boolean> edit(final @Validated @RequestBody List<ImageUpdateTaskEditReq> req) {
        return one(() -> imageUpdateTaskService.edit(req));
    }


    /**
     * 上传图片/视频
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("batch-upload")
    public DataResponse<Boolean> batchUpload(final @Validated @RequestBody List<ImageUpdateTaskUploadReq> req) {
        return one(() -> imageUpdateTaskService.batchUpload(req));
    }


    /**
     * 审核任务
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("batch-check")
    public DataResponse<Boolean> batchCheck(final @Validated @RequestBody List<ImageUpdateTaskCheckReq> req) {
        return one(() -> imageUpdateTaskService.batchCheck(req));
    }


   /**
     * 根据spu查找信息
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("select-by-spu")
    public DataResponse<List<ImageUpdateTaskDTO>> selectBySpu(final @Validated  @RequestBody ImageUpdateQueryReq req) {
        return one(() -> imageUpdateTaskService.selectBySpu(req));
    }


    /**
     * 取消
     *
     * @param taskIds 参数
     * @return 结果
     */
    @PostMapping("cancel")
    public DataResponse<Boolean> cancel(@RequestBody List<Long> taskIds) {
        return one(() -> imageUpdateTaskService.cancel(taskIds));
    }


    /**
     * 任务详情
     *
     * @param taskId 任务ID
     * @return 结果
     */
    @GetMapping("detail/{taskId}")
    public DataResponse<ImageUpdateTaskDetailResp> detail(@PathVariable Long taskId) {
        return one(() -> imageUpdateTaskService.detail(taskId));
    }

    /**
     *  历史数据刷树，图片由SPU维度改为SKC维度
     */
    @PostMapping("/refresh-skc-picture")
    public DataResponse<Void> refreshSkcPicture(@RequestBody List<String> styleCodes) {
        imageUpdateTaskService.refreshSkcPicture(styleCodes);
        return ok();
    }

}
