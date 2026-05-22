package tech.tiangong.sdp.external;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.BaseSkuResp;
import java.util.List;

/**
 * <p>
 * SKU_接口调用helper
 * </p>
 *
 * @author liuhongfu
 */
@Service
@Slf4j
@AllArgsConstructor
public class SkuInfoRemoteHelper {

    private final SkuInfoClient skuInfoClient;

    /**
     * 批量样查询SKU信息
     *
     * @param req 入参
     */
    public List<BaseSkuResp> querySku(SkcBatchQueryReq req) {
        log.info("===批量样查询SKU信息-req：{} ===", JsonsKt.toJsonPretty(req));
        try {
            final var response = skuInfoClient.batchQueryBySkc(req);
            log.info("=== 批量样查询SKU信息-response:{}", JsonsKt.toJsonPretty(response));
            if (!response.getSuccessful()) {
                throw new BusinessException("批量样查询SKU信息失败:" + response.getMessage());
            }
            return response.getData();
        } catch (Exception e) {
            throw new BusinessException("批量样查询SKU信息失败:" + e.getMessage(), e);
        }
    }



}
