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
import tech.tiangong.sdp.service.DevelopStyleTaskService;

/**
 * 开款任务 - 回调
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 14:36
 */
@RestController
@RequestMapping("/open/v1/develop-style/callback/")
@RequiredArgsConstructor
public class DevelopStyleTaskOpenController implements BasicController {
    private final DevelopStyleTaskService developStyleTaskService;

    /**
     * 回调款式分类
     *
     * @param req                回调参数
     * @param httpServletRequest HttpServletRequest
     * @return 结果
     */
    @PreCheckIgnore
    @PostMapping("rec")
    public DataResponse<Boolean> callback(@Validated @RequestBody final AiTaskCallbackReq req,
                                          final HttpServletRequest httpServletRequest) {
        return callback(httpServletRequest, () -> {
            developStyleTaskService.callback(req);
            return true;
        });
    }

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
            developStyleTaskService.callbackMulfeatExtract(req);
            return true;
        });
    }

    /**
     * 回调款式分类
     *
     * @param req                回调参数
     * @param httpServletRequest HttpServletRequest
     * @return 结果
     */
    @PreCheckIgnore
    @PostMapping("pattern-check")
    public DataResponse<Boolean> callbackPatternCheck(@Validated @RequestBody final AiTaskCallbackReq req,
                                                      final HttpServletRequest httpServletRequest) {
        return callback(httpServletRequest, () -> {
            developStyleTaskService.callbackPatternCheck(req);
            return true;
        });
    }

    /**
     * 回调面料识别
     *
     * @param req                回调参数
     * @param httpServletRequest HttpServletRequest
     * @return 结果
     */
    @PreCheckIgnore
    @PostMapping("fabric-identify")
    public DataResponse<Boolean> callbackFabricIdentify(@Validated @RequestBody final AiTaskCallbackReq req,
                                                        final HttpServletRequest httpServletRequest) {
        return callback(httpServletRequest, () -> {
            developStyleTaskService.callbackFabricIdentify(req);
            return true;
        });
    }

    /**
     * 回调标签识别
     *
     * @param req                回调参数
     * @param httpServletRequest HttpServletRequest
     * @return 结果
     */
    @PreCheckIgnore
    @PostMapping("clip")
    public DataResponse<Boolean> callbackClip(@Validated @RequestBody final AiTaskCallbackReq req,
                                              final HttpServletRequest httpServletRequest) {
        return callback(httpServletRequest, () -> {
            developStyleTaskService.callbackClip(req);
            return true;
        });
    }

    /**
     * 回调fashion分析
     *
     * @param req                回调参数
     * @param httpServletRequest HttpServletRequest
     * @return 结果
     */
    @PreCheckIgnore
    @PostMapping("fashion-analysis")
    public DataResponse<Boolean> callbackFashionAnalysis(@Validated @RequestBody final AiTaskCallbackReq req,
                                                         final HttpServletRequest httpServletRequest) {
        return callback(httpServletRequest, () -> {
            developStyleTaskService.callbackFashionAnalysis(req);
            return true;
        });
    }


}
