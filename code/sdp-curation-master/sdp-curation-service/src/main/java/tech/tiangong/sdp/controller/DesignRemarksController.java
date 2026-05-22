package tech.tiangong.sdp.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.aikero.blade.core.constant.UrlVersionConstant;
import team.aikero.blade.core.protocol.DataResponse;
import tech.tiangong.sdp.vo.req.DesignRemarksBatchListReq;
import tech.tiangong.sdp.vo.req.DesignRemarksReq;
import tech.tiangong.sdp.vo.resp.DesignRemarksVO;
import tech.tiangong.sdp.service.DesignRemarksService;

import java.util.List;
import java.util.Map;

/**
*
* 备注信息-web
* <br>CreateDate August 10,2021
* @author lujunxuan
* @since 1.0
*/
@RestController
@RequiredArgsConstructor
@RequestMapping(UrlVersionConstant.WEB + UrlVersionConstant.VERSION_V1 + "/design/remarks")
public class DesignRemarksController implements BasicController {

    private final DesignRemarksService designRemarksService;

    /**
    * 新建
    *
    * @param req 设计打版备注信息对象
    * @return 设计打版备注信息实体
    */
    @PostMapping("/save")
    public DataResponse<DesignRemarksVO> create(@RequestBody @Validated DesignRemarksReq req) {
        return one(() -> designRemarksService.create(req));
    }

    /**
     * 批量查询-根据设计款号批量查询
     *
     * @param req 设计打版备注信息对象
     * @return 设计打版备注信息实体
     */
    @PostMapping("/batch/list")
    public DataResponse<Map<Long, List<DesignRemarksVO>>> batchDataList(@RequestBody @Validated DesignRemarksBatchListReq req) {
        Map<Long, List<DesignRemarksVO>> longListMap = designRemarksService.batchDataList(req);
        return DataResponse.ok(longListMap);
    }


}
