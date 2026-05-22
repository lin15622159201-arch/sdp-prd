package tech.tiangong.sdp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.aikero.blade.core.constant.UrlVersionConstant;
import team.aikero.blade.core.protocol.DataResponse;
import tech.tiangong.sdp.service.DesignLogService;
import tech.tiangong.sdp.vo.req.DesignLogBizListReq;
import tech.tiangong.sdp.vo.req.DesignLogListReq;
import tech.tiangong.sdp.vo.resp.DesignLogVO;

import java.util.List;

/**
 * 操作日志-web
 * <br>CreateDate August 10,2021
 *
 * @author lujunxuan
 * @since 1.0
 */

@RestController
@RequiredArgsConstructor
@RequestMapping(UrlVersionConstant.WEB + UrlVersionConstant.VERSION_V1 + "/design/log")
public class DesignLogController implements BasicController {

    private final DesignLogService designLogService;

    /**
     * SKC日志查询
     *
     * @param req 查询入参
     * @return 设计打版操作日志实体
     */
    @PostMapping("/list")
    public DataResponse<List<DesignLogVO>> dateList(@RequestBody @Validated DesignLogListReq req) {
        return list(() -> designLogService.dateList(req));
    }


    /**
     * 日志查询
     *  调用页面: 灵感任务, 数码印花款, 采购齐套管理, 采购申请管理, 现货管理
     *
     * @param req 查询入参
     * @return 设计打版操作日志实体
     */
    @PostMapping("/biz/list")
    public DataResponse<List<DesignLogVO>> dateBizList(@RequestBody @Validated DesignLogBizListReq req) {
        return DataResponse.ok(designLogService.dateBizList(req));
    }

}
