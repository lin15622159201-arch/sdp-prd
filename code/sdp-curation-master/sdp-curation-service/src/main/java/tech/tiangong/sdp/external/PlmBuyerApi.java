package tech.tiangong.sdp.external;

import cn.hutool.extra.spring.SpringUtil;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import team.aikero.blade.core.protocol.PageVo;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.common.req.*;
import tech.tiangong.sdp.common.resp.BuyerBaseSkcPageResp;
import tech.tiangong.sdp.common.resp.BuyerCreateSpuResp;
import tech.tiangong.sdp.common.resp.BuyerGenerateCodeResp;
import tech.tiangong.sdp.convert.BasicConvert;

/**
 * PLM买手远程API
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/2 17:12
 */
@Slf4j
@UtilityClass
public class PlmBuyerApi {
    private final PlmBuyerClient plmBuyerClient = SpringUtil.getBean(PlmBuyerClient.class);

    public Boolean batchCancel(final BuyerSkcCancelReq req) {
        log.info("PLM买手取消参数\t{}", JsonsKt.toJsonPretty(req));
        return BasicConvert.invoke("PLM买手取消失败", () -> plmBuyerClient.batchCancel(req));
    }

    public BuyerGenerateCodeResp generateCode(final BuyerGenerateCodeReq req) {
        log.info("PLM买手分码参数\t{}", JsonsKt.toJsonPretty(req));
        return BasicConvert.invoke("PLM买手分码失败", () -> plmBuyerClient.generateCode(req));
    }

    public BuyerCreateSpuResp batchCreate(final BuyerCreateSpuReq req) {
        log.info("PLM买手新增参数\t{}", JsonsKt.toJsonPretty(req));
        return BasicConvert.invoke("PLM买手新增失败", () -> plmBuyerClient.batchCreate(req));
    }

    public Boolean editSkuImage(final BuyerEditSkuImageReq req) {
        log.info("PLM买手更新款式图片参数\t{}", JsonsKt.toJsonPretty(req));
        return BasicConvert.invoke("PLM买手更新款式图片失败", () -> plmBuyerClient.editSkuImage(req));
    }

    public PageVo<BuyerBaseSkcPageResp> baseSkcPage(final BuyerBaseSkcPageReq req) {
        log.info("通过skc分页查询基础信息参数\t{}", JsonsKt.toJsonPretty(req));
        return BasicConvert.invoke("通过skc分页查询基础信息失败", () -> plmBuyerClient.baseSkcPage(req));
    }
}
