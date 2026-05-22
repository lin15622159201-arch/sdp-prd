package tech.tiangong.sdp.controller.open;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import team.aikero.blade.auth.annotation.PreCheckIgnore;
import team.aikero.blade.core.protocol.DataResponse;
import tech.tiangong.sdp.common.req.AiTaskCallbackReq;
import tech.tiangong.sdp.controller.BasicController;
import tech.tiangong.sdp.service.StyleOnShelvesService;

/**
 * 上架 - INNER
 *
 * @author ：liuhongfu@zj.tech
 * @version :1.0
 * @date ：2025/11/4 14:36
 */
@RestController
@RequestMapping("/open/v1/style-on-shelves/callback/")
@RequiredArgsConstructor
public class StyleOnShelvesOpenController implements BasicController {
    private final StyleOnShelvesService styleOnShelvesService;

    /**
     * 回调裁剪
     *
     * @param req                回调参数
     * @param httpServletRequest HttpServletRequest
     * @return 结果
     */
    @PreCheckIgnore
    @PostMapping("crop")
    public DataResponse<Boolean> callbackCrop(@Validated @RequestBody final AiTaskCallbackReq req,
                                              final HttpServletRequest httpServletRequest) {
        return callback(httpServletRequest, () -> {
            styleOnShelvesService.callBackCrop(req);
            return true;
        });
    }
}
