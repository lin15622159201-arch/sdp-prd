package tech.tiangong.sdp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import team.aikero.blade.core.constant.UrlVersionConstant;
import team.aikero.blade.core.protocol.DataResponse;
import tech.tiangong.sdp.service.DesignerService;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.*;
import java.util.List;

/**
 * 设计师查询 - WEB
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/5 16:52
 */
@RestController
@RequestMapping(UrlVersionConstant.WEB + UrlVersionConstant.VERSION_V1 + "/designer")
@RequiredArgsConstructor
public class DesignerController implements BasicController {

    private final DesignerService designerService;


    /**
     * 设计师列表查询
     *
     * @param req 参数
     * @return 列表
     */
    @PostMapping("/list")
    public DataResponse<List<DesignerResp>> stateTotal(final @Validated @RequestBody DesignerReq req) {
        return list(() -> designerService.designerInfoList(req));
    }


}
