package tech.tiangong.sdp.controller.open;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.aikero.blade.auth.annotation.PreCheckIgnore;
import team.aikero.blade.core.protocol.DataResponse;
import tech.tiangong.sdp.common.req.AiTaskCallbackReq;
import tech.tiangong.sdp.controller.BasicController;
import tech.tiangong.sdp.service.PrototypeService;
import tech.tiangong.sdp.service.SpotStyleTaskService;

/**
 * 款式管理任务 - 回调
 *
 * @author ：liuhongfu@zj.tech
 * @version :1.0
 * @date ：2025/11/4 14:36
 */
@RestController
@RequestMapping("/open/v1/design-style/callback/")
@RequiredArgsConstructor
public class DesignStyleTaskOpenController implements BasicController {
    private final PrototypeService prototypeService;


    /**
     * 回调图片特征提取
     *
     * @param req                回调参数
     * @param httpServletRequest HttpServletRequest
     * @return 结果
     */
    @PreCheckIgnore
    @PostMapping("mulfeat-extract")
    public DataResponse<Boolean> callbackMulfeatExtract(@Validated @RequestBody final AiTaskCallbackReq req,
                                                        final HttpServletRequest httpServletRequest) {
        return callback(httpServletRequest, () -> {
            prototypeService.callback(req);
            return true;
        });
    }

}
