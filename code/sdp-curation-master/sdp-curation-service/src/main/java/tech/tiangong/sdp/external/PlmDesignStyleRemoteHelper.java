package tech.tiangong.sdp.external;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.ClothingCodeBatchGenerateResp;
import tech.tiangong.sdp.vo.resp.PlmSpuSkcResp;
import java.util.List;

/**
 * <p>
 * PLM_接口调用helper
 * </p>
 *
 * @author liuhongfu
 */
@Service
@Slf4j
@AllArgsConstructor
public class PlmDesignStyleRemoteHelper {

    private final PlmDesignStyleClient plmDesignStyleClient;

    /**
     * 批量样衣编号生成（SPU和SKC）
     *
     * @param req 入参
     */
    public ClothingCodeBatchGenerateResp batchGenerate(ClothingCodeBatchGenerateReq req) {
        log.info("=== 批量样衣编号生成（SPU和SKC）-req：{} ===", JsonsKt.toJsonPretty(req));
        try {
            final var response = plmDesignStyleClient.batchGenerate(req);
            log.info("=== 批量样衣编号生成（SPU和SKC）-response:{}", JsonsKt.toJsonPretty(response));
            if (!response.getSuccessful()) {
                throw new BusinessException("批量样衣编号生成（SPU和SKC）失败:" + response.getMessage());
            }
            return response.getData();
        } catch (Exception e) {
            throw new BusinessException("批量样衣编号生成（SPU和SKC）失败:" + e.getMessage(), e);
        }
    }


    /**
     * 批量取消skc
     *
     * @param req 入参
     */
    public void batchCancelSkc(BatchCancelDesignCodeReq req) {
        log.info("=== 批量取消skc-req：{} ===", JsonsKt.toJsonPretty(req));
        try {
            final var response = plmDesignStyleClient.batchCancel(req);
            log.info("=== 批量取消skc-response:{}", JsonsKt.toJsonPretty(response));
            if (!response.getSuccessful()) {
                throw new BusinessException("批量取消skc失败:" + response.getMessage());
            }
        } catch (Exception e) {
            throw new BusinessException("批量取消skc失败:" + e.getMessage(), e);
        }
    }

    /**
     * 批量新增spu和skc
     *
     * @param req 入参
     */
    public void batchCreateSpuSkc(StylePushPlmReq req) {
        log.info("=== 批量新增spu和skc-req：{} ===", JsonsKt.toJsonPretty(req));
        try {
            final var response = plmDesignStyleClient.batchCreateSpuSkc(req);
            log.info("=== 批量新增spu和skc-response:{}", JsonsKt.toJsonPretty(response));
            if (!response.getSuccessful()) {
                throw new BusinessException("批量新增spu和skc失败:" + response.getMessage());
            }
        } catch (Exception e) {
            throw new BusinessException("批量新增spu和skc失败:" + e.getMessage(), e);
        }
    }

    /**
     * 批量新增设计备注
     *
     * @param req 入参
     */
    public void stylePushRemark(StylePushRemarkReq req) {
        log.info("=== 批量新增设计备注-req：{} ===", JsonsKt.toJsonPretty(req));
        try {
            final var response = plmDesignStyleClient.stylePushRemark(req);
            log.info("=== 批量新增设计备注-response:{}", JsonsKt.toJsonPretty(response));
            if (!response.getSuccessful()) {
                throw new BusinessException("批量新增设计备注失败:" + response.getMessage());
            }
        } catch (Exception e) {
            throw new BusinessException("批量新增设计备注失败:" + e.getMessage(), e);
        }
    }

    /**
     * 批量更新客户图片
     *
     * @param req 入参
     */
    public void batchUpdateSkcMarketingPicture(BatchUpdateSkcCustomerPictureReq req) {
        log.info("=== 批量更新客户图片-req：{} ===", JsonsKt.toJsonPretty(req));
        try {
            final var response = plmDesignStyleClient.batchUpdateSkcMarketingPicture(req);
            log.info("=== 批量更新客户图片-response:{}", JsonsKt.toJsonPretty(response));
            if (!response.getSuccessful()) {
                throw new BusinessException("批量更新客户图片失败:" + response.getMessage());
            }
        } catch (Exception e) {
            throw new BusinessException("批量更新客户图片失败:" + e.getMessage(), e);
        }
    }

    /**
     * sdp更新测价通知PLM
     *
     * @param req 入参
     */
    public void pricePassedNotifyPlm(PrototypePricePassedNotifyReq req) {
        log.info("=== sdp更新测价通知PLM-req：{} ===", JsonsKt.toJsonPretty(req));
        try {
            final var response = plmDesignStyleClient.pricePassedNotifyPlm(req);
            log.info("=== sdp更新测价通知PLM-response:{}", JsonsKt.toJsonPretty(response));
            if (!response.getSuccessful()) {
                throw new BusinessException("sdp更新测价通知PLM失败:" + response.getMessage());
            }
        } catch (Exception e) {
            throw new BusinessException("sdp更新测价通知PLM失败:" + e.getMessage(), e);
        }
    }

    /**
     * 同步动销信息
     *
     * @param req 入参
     */
    public void onSale(final PlmOnSaleReq req) {
        log.info("=== 同步动销信息-req：{} ===", JsonsKt.toJsonPretty(req));
        try {
            final var response = plmDesignStyleClient.onSale(req);
            log.info("=== 同步动销信息-response:{}", JsonsKt.toJsonPretty(response));
            if (!response.getSuccessful()) {
                throw new BusinessException("同步动销信息失败:" + response.getMessage());
            }
        } catch (Exception e) {
            throw new BusinessException("同步动销信息失败:" + e.getMessage(), e);
        }
    }

    /**
     * 取消动销订单
     *
     * @param req 入参
     */
    public void cancelOnSale(final PlmCancelOnSaleReq req) {
        log.info("=== 取消动销订单-req：{} ===", JsonsKt.toJsonPretty(req));
        try {
            final var response = plmDesignStyleClient.cancelOnSale(req);
            log.info("=== 取消动销订单-response:{}", JsonsKt.toJsonPretty(response));
            if (!response.getSuccessful()) {
                throw new BusinessException("取消动销订单失败:" + response.getMessage());
            }
        } catch (Exception e) {
            throw new BusinessException("取消动销订单失败:" + e.getMessage(), e);
        }
    }

    /**
     * 通过spu查询skc信息
     *
     * @param req 入参
     */
    public List<PlmSpuSkcResp> spuList(final PlmSpuReq req) {
        log.info("===通过spu查询skc信息-req：{} ===", JsonsKt.toJsonPretty(req));
        try {
            final var response = plmDesignStyleClient.spuList(req);
            log.info("=== 通过spu查询skc信息-response:{}", JsonsKt.toJsonPretty(response));
            if (!response.getSuccessful()) {
                throw new BusinessException("通过spu查询skc信息失败:" + response.getMessage());
            }
            return response.getData().getList();
        } catch (Exception e) {
            throw new BusinessException("通过spu查询skc信息失败:" + e.getMessage(), e);
        }
    }

}
