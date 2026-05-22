package tech.tiangong.sdp.controller.inner;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.aikero.blade.auth.annotation.PreCheckIgnore;
import team.aikero.blade.core.constant.UrlVersionConstant;
import team.aikero.blade.core.protocol.DataResponse;
import tech.tiangong.sdp.common.req.SpotSkcCancelReq;
import tech.tiangong.sdp.controller.BasicController;
import tech.tiangong.sdp.service.SpotStyleTaskService;

import java.util.List;

/**
 * 现货 - INNER
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 14:36
 */
@RestController
@RequestMapping(UrlVersionConstant.INNER + UrlVersionConstant.VERSION_V1 + "/spot-style/")
@RequiredArgsConstructor
public class SpotStyleTaskInnerController implements BasicController {
    private final SpotStyleTaskService spotStyleTaskService;

    /**
     * 批量取消
     *
     * @param req 参数
     * @return 结果
     */
    @PreCheckIgnore
    @PutMapping("batch-cancel")
    public DataResponse<Boolean> batchCancel(final @Valid @RequestBody List<SpotSkcCancelReq> req) {
        return one(() -> spotStyleTaskService.batchBuyerCancel(req));
    }
}
