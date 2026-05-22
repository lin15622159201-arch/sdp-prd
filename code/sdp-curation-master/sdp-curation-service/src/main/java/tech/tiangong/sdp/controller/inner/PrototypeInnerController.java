package tech.tiangong.sdp.controller.inner;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team.aikero.blade.auth.annotation.PreCheckIgnore;
import team.aikero.blade.core.constant.UrlVersionConstant;
import team.aikero.blade.core.protocol.DataResponse;
import tech.tiangong.sdp.common.req.DisassemblyFinishedNotifyInnerReq;
import tech.tiangong.sdp.common.req.PrototypeBatchCancelReq;
import tech.tiangong.sdp.controller.BasicController;
import tech.tiangong.sdp.service.PrototypeService;
import tech.tiangong.sdp.vo.req.SkcBatchQueryReq;
import tech.tiangong.sdp.vo.req.SpuBatchQueryReq;
import tech.tiangong.sdp.vo.resp.BaseSkuResp;
import tech.tiangong.sdp.vo.resp.BomOrderMaterialResp;

import java.util.List;


/**
 * SKC - INNER
 *
 * @author ：liuhonngfu
 * @version :1.0
 * @date ：2025/11/21 14:36
 */
@RestController
@RequestMapping(UrlVersionConstant.INNER + UrlVersionConstant.VERSION_V1 + "/prototype")
@RequiredArgsConstructor
public class PrototypeInnerController implements BasicController {

    private final PrototypeService prototypeService;

    /**
     * 批量取消设计款
     *
     * @param req 参数
     * @return 结果
     */
    @PreCheckIgnore
    @PostMapping("`/batch-cancel`")
    public DataResponse<Boolean> batchCancel(final @Validated @RequestBody PrototypeBatchCancelReq req) {
        return one(() -> prototypeService.plmBatchCancel(req));
    }

    /**
     * PLM拆版完成通知SDP
     *
     * @param req 参数
     * @return 结果
     */
    @PreCheckIgnore
    @PostMapping("/disassembly-finished")
    public DataResponse<Boolean> disassemblyFinished(final @Validated @RequestBody DisassemblyFinishedNotifyInnerReq req) {
        return one(() -> prototypeService.disassemblyFinished(req));
    }

    /**
     * 通过SKC查询SKU信息
     * @param req
     * @return
     */
    @PreCheckIgnore
    @PostMapping("/query-sku-by-skc")
    DataResponse<List<BaseSkuResp>> batchQuerySkuBySkc(@RequestBody SkcBatchQueryReq req){
        return list(() -> prototypeService.batchQuerySkuBySkc(req));
    }

    /**
     * 【通过SPU查询开款物料信息】
     * @param req
     * @return
     */
    @PreCheckIgnore
    @PostMapping("/query-develop-style-material-by-spu")
    DataResponse<List<BomOrderMaterialResp>> batchQueryBomBySkc(@RequestBody SpuBatchQueryReq req){
        return list(() -> prototypeService.batchQueryBomBySkc(req));
    }
}
