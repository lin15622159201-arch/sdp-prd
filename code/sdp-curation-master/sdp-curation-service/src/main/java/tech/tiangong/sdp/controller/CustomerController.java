package tech.tiangong.sdp.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.aikero.blade.core.constant.UrlVersionConstant;
import team.aikero.blade.core.protocol.DataResponse;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.external.CustomerApi;
import tech.tiangong.sdp.vo.req.CustomerPageReq;
import tech.tiangong.sdp.vo.resp.CustomerResp;

/**
 * 客户
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/11 18:34
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(UrlVersionConstant.WEB + UrlVersionConstant.VERSION_V1 + "/customer")
public class CustomerController implements BasicController {

    /**
     * 分页
     *
     * @param req 入参
     * @return 客户列表
     */
    @PostMapping("/page")
    public DataResponse<PageVo<CustomerResp>> page(@RequestBody @Validated final CustomerPageReq req) {
        return page(() -> CustomerApi.page(req));
    }
}
