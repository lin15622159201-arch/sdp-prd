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
import tech.tiangong.sdp.service.ApsService;
import tech.tiangong.sdp.vo.req.SupplierReq;
import tech.tiangong.sdp.vo.resp.SupplierInfoVo;

import java.util.List;

/**
 * 供应商
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/11 18:34
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(UrlVersionConstant.WEB + UrlVersionConstant.VERSION_V1 + "/aps")
public class ApsController implements BasicController {
    private final ApsService apsService;

    /**
     * 供应商查询
     *
     * @param req 入参
     * @return List<SupplierInfoVo>
     */
    @PostMapping("/supplier/query")
    public DataResponse<List<SupplierInfoVo>> supplierQuery(@RequestBody @Validated final SupplierReq req) {
        return list(() -> apsService.supplierQuery(req));
    }
}
