package tech.tiangong.sdp.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import team.aikero.blade.core.constant.UrlVersionConstant;
import team.aikero.blade.core.protocol.DataResponse;
import tech.tiangong.sdp.service.DesignStyleService;
import tech.tiangong.sdp.vo.req.DesignStyleCreateReq;
import tech.tiangong.sdp.vo.req.DesignStyleUpdateReq;
import tech.tiangong.sdp.vo.resp.DesignStyleCreateResp;
import tech.tiangong.sdp.vo.resp.DesignStyleFieldLogVO;
import tech.tiangong.sdp.vo.resp.DesignStyleVo;

import java.util.List;

import static team.aikero.blade.core.protocol.DataResponseExtKt.ok;


/**
 * SPU管理-web
 *
 * @author while
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping(UrlVersionConstant.WEB + UrlVersionConstant.VERSION_V1 + "/design-spu")
public class DesignStyleController implements BasicController {
    private final DesignStyleService designStyleService;


    /**
     * 新建SPU
     *
     * @param req 请求参数对象
     * @return 响应结果
     */
    @PostMapping("/save")
    public DataResponse<DesignStyleCreateResp> createSpuSkc(@RequestBody @Validated DesignStyleCreateReq req) {
        return one(() -> designStyleService.createSpuSkc(req));
    }

    /**
     * 编辑页详情查询
     *
     * @param designStyleId spu-ID
     * @return 响应结果
     */
    @GetMapping("/web-detail/{designStyleId}")
    public DataResponse<DesignStyleVo> getWebDetail(@PathVariable(value = "designStyleId") Long designStyleId) {
        return one(() -> designStyleService.getLatestVersionByStyleId(designStyleId));
    }

    /**
     * 编辑页详情查询
     *
     * @param designStyleCode spu编码
     * @return 响应结果
     */
    @GetMapping("/web-detail-by-code/{designStyleCode}")
    public DataResponse<DesignStyleVo> getCode(@PathVariable(value = "designStyleCode") String designStyleCode) {
        return one(() -> designStyleService.getLatestVersionByStyleCode(designStyleCode));
    }


    /**
     * 编辑SPU
     *
     * @param req 请求参数对象
     * @return 响应结果
     */
    @PutMapping("/update")
    public DataResponse<Void> updateSpu(@RequestBody @Validated DesignStyleUpdateReq req) {
        designStyleService.updateSpu(req);
        return ok();
    }

    /**
     * 查询SPU字段变更日志
     *
     * @param designStyleId SPU ID
     * @return 字段变更日志列表
     */
    @GetMapping("/field-log/{designStyleId}")
    public DataResponse<List<DesignStyleFieldLogVO>> getFieldLogs(@PathVariable Long designStyleId) {
        return list(() -> designStyleService.getFieldLogs(designStyleId));
    }

}
