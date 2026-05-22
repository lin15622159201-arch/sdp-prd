package tech.tiangong.sdp.controller.inner;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.aikero.blade.auth.UserContexts;
import team.aikero.blade.auth.annotation.PreCheckIgnore;
import team.aikero.blade.core.constant.UrlVersionConstant;
import team.aikero.blade.core.protocol.DataResponse;
import team.aikero.blade.user.entity.CurrentUser;
import tech.tiangong.butted.common.req.base.CompanyUserBatchReq;
import tech.tiangong.sdp.common.req.DevelopStyleRelaAddReq;
import tech.tiangong.sdp.controller.BasicController;
import tech.tiangong.sdp.service.DevelopStyleTaskService;
import tech.tiangong.sdp.vo.req.DevelopStyleTaskOpenAddReq;
import tech.tiangong.sdp.vo.req.DevelopStyleTaskOpenQueryReq;
import tech.tiangong.sdp.vo.resp.DevelopStyleTaskCreateResp;
import tech.tiangong.sdp.vo.resp.DevelopStyleTaskQueryResp;

import java.util.List;

/**
 * 开款任务 - INNER
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 14:36
 */
@RestController
@RequestMapping(UrlVersionConstant.INNER + UrlVersionConstant.VERSION_V1 + "/develop-style/")
@RequiredArgsConstructor
public class DevelopStyleTaskInnerController implements BasicController {
    private final DevelopStyleTaskService developStyleTaskService;

    /**
     * 关联任务
     *
     * @param req 参数
     * @return 结果
     */
    @PreCheckIgnore
    @PostMapping("batch-rela")
    public DataResponse<Boolean> batchRela(final @Validated @RequestBody List<DevelopStyleRelaAddReq> req) {
        return one(() -> developStyleTaskService.batchRela(req));
    }


    /**
     * 创建开款任务
     *
     * @param req 参数
     * @return 结果
     */
    @PreCheckIgnore
    @PostMapping("batch-create")
    public DataResponse<List<DevelopStyleTaskCreateResp>> batchCreate(final @Valid @RequestBody CompanyUserBatchReq<DevelopStyleTaskOpenAddReq> req) {
        CurrentUser user = new CurrentUser(
                req.getCreatorId(),
                req.getCreatorName(),
                "",
                req.getCompanyId(),
                false, 0L
        );
        return list(() -> UserContexts.withUser(user, () -> developStyleTaskService.batchCreateOpen(req)));
    }

    /**
     * 开款任务查询
     *
     * @param req 参数
     * @return 结果
     */
    @PreCheckIgnore
    @PostMapping("query-list")
    public DataResponse<List<DevelopStyleTaskQueryResp>> queryList(final @Valid @RequestBody DevelopStyleTaskOpenQueryReq req) {
        return one(() -> developStyleTaskService.queryList(req));
    }

}
