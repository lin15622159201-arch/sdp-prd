package tech.tiangong.sdp.external;

import jakarta.validation.Valid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import team.aikero.blade.core.protocol.DataResponse;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.common.req.*;
import tech.tiangong.sdp.common.resp.BuyerBaseSkcPageResp;
import tech.tiangong.sdp.common.resp.BuyerCreateSpuResp;
import tech.tiangong.sdp.common.resp.BuyerGenerateCodeResp;
import tech.tiangong.sdp.yibuyun.SDPOpenFeignUserInterceptor;

/**
 * PLM买手
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/2 14:28
 */
@FeignClient(value = "plm-buyer-service",
        contextId = "PlmBuyerClient", configuration = SDPOpenFeignUserInterceptor.class,
        path = "/plm-buyer/inner/v1/",
        url = "${plm.domain.url}")
public interface PlmBuyerClient {
    /**
     * 批量取消
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("buyer-prototype/batch-cancel")
    DataResponse<Boolean> batchCancel(final @Valid @RequestBody BuyerSkcCancelReq req);

    /**
     * 买手分码
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("clothing-code-generate/batch-generate-for-sdp")
    DataResponse<BuyerGenerateCodeResp> generateCode(final @Valid @RequestBody BuyerGenerateCodeReq req);

    /**
     * 新增
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("buyer-prototype/batch-create-spu-skc")
    DataResponse<BuyerCreateSpuResp> batchCreate(final @Valid @RequestBody BuyerCreateSpuReq req);

    /**
     * 更新款式图片
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("buyer-prototype/batch-update-skc-customer-picture")
    DataResponse<Boolean> editSkuImage(final @Valid @RequestBody BuyerEditSkuImageReq req);

    /**
     * 通过skc分页查询基础信息
     *
     * @param req 参数
     * @return 结果
     */
    @PostMapping("buyer-prototype/base-skc/page")
    DataResponse<PageVo<BuyerBaseSkcPageResp>> baseSkcPage(final @Valid @RequestBody BuyerBaseSkcPageReq req);
}
