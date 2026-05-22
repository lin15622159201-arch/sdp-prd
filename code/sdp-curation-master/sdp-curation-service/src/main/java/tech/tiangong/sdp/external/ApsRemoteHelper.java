package tech.tiangong.sdp.external;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.vo.req.SupplierInfoDataReq;
import tech.tiangong.sdp.vo.req.SupplierReq;
import tech.tiangong.sdp.vo.resp.SupplierSimpleResp;

import java.util.List;

/**
 * <p>
 * APS_接口调用helper
 * </p>
 *
 **/
@Service
@Slf4j
@AllArgsConstructor
public class ApsRemoteHelper {

    private final ApsSupplierClient apsSupplierClient;

    /**
     * 获取供应商列表
     *
     * @param req 入参
     */
    public List<SupplierSimpleResp> queryApsSupplier(SupplierReq req) {
        SupplierInfoDataReq dataReq = new SupplierInfoDataReq();
        dataReq.setSupplierName(req.getSupplierName());
        dataReq.setSupplierCode(req.getSupplierCode());
        dataReq.setSupplierId(req.getSupplierId());
        dataReq.setSupplierState(1);
        log.info("=== APS供应商查询-req：{} ===", JsonsKt.toJsonPretty(dataReq));
        try {
            final var response = apsSupplierClient.getSupplierName(dataReq);
            log.info("=== APS供应商查询-response:{}", JsonsKt.toJsonPretty(response));
            if (!response.getSuccessful()) {
                throw new BusinessException("APS供应商查询失败:" + response.getMessage());
            }
            return response.getData();
        } catch (Exception e) {
            throw new BusinessException("APS供应商查询失败:" + e.getMessage(), e);
        }
    }
}
