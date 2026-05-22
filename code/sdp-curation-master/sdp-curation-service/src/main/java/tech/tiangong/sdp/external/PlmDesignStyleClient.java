package tech.tiangong.sdp.external;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import team.aikero.blade.core.protocol.DataResponse;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.common.req.DisassemblyFinishedNotifyInnerReq;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.*;
import tech.tiangong.sdp.yibuyun.SDPOpenFeignUserInterceptor;

import java.util.List;

/**
 * @author liuhongfu
 */
@FeignClient(value = "plm-design-service",
        contextId = "designerClient", configuration = SDPOpenFeignUserInterceptor.class,
        path = "/plm-design/inner/v1",
        url = "${plm.domain.url}")

public interface PlmDesignStyleClient {

    /**
     * 【批量样衣编号生成（SPU和SKC）】
     */
    @PostMapping("/clothing-code-generate/batch-generate")
    DataResponse<ClothingCodeBatchGenerateResp> batchGenerate(@RequestBody ClothingCodeBatchGenerateReq req);


    /**
     * 【批量取消设计款-通知PLM】
     */
    @PostMapping("/prototype/batch-cancel")
    DataResponse<Void> batchCancel(@RequestBody BatchCancelDesignCodeReq req);

    /**
     * 【通过SKC查询SKU信息】
     */
    @PostMapping("/prototype/query-sku-by-skc")
    DataResponse<List<BaseSkuResp>> batchQuerySkuBySkc(@RequestBody SkcBatchQueryReq req);

    /**
     * 【通过SPU查询开款物料信息】
     */
    @PostMapping("/prototype/query-develop-style-material-by-spu")
    DataResponse<List<BomOrderMaterialResp>> batchQueryBomBySkc(@RequestBody SpuBatchQueryReq req);

    /**
     * 【 PLM拆版完成通知SDP】
     */
    @PostMapping("/disassembly-finished")
     DataResponse<Boolean> disassemblyFinished(final @Validated @RequestBody DisassemblyFinishedNotifyInnerReq req);


    /**
     * 【批量新增spu和skc】
     */
    @PostMapping("/prototype/batch-create-spu-skc")
    DataResponse<BatchCreateSpuSkcResp> batchCreateSpuSkc(@RequestBody StylePushPlmReq req);

    /**
     * 批量新增设计备注
     */
    @PostMapping("/design/remarks/batch/save")
    DataResponse<List<StylePushRemarkResp>> stylePushRemark(@RequestBody StylePushRemarkReq req);


    /**
     * 批量更新客户图片
     */
    @PostMapping("/prototype/batch-update-marketing-picture/save")
    DataResponse<Void> batchUpdateSkcMarketingPicture(BatchUpdateSkcCustomerPictureReq req);

    /**
     * sdp更新测价通知PLM
     */
    @PostMapping("/prototype/sdp/skc-status/update")
    DataResponse<Void> pricePassedNotifyPlm(PrototypePricePassedNotifyReq req);


    /**
     * 同步动销信息
     */
    @PostMapping("/style/fill-on-sale-info")
    DataResponse<Void> onSale(PlmOnSaleReq req);

    /**
     * 取消动销订单
     */
    @PostMapping("/style/cancel-on-sale-order")
    DataResponse<Void> cancelOnSale(PlmCancelOnSaleReq req);

    /**
     * 查询SPU列表
     */
    @PostMapping("/clothing-design/spu/list")
    DataResponse<PageVo<PlmSpuSkcResp>> spuList(PlmSpuReq req);
}
