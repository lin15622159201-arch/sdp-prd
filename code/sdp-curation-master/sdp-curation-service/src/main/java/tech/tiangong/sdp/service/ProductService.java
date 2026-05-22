package tech.tiangong.sdp.service;

import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.entity.TemuOrderSync;
import tech.tiangong.sdp.vo.dto.ProductStateGroupDTO;
import tech.tiangong.sdp.vo.req.*;
import tech.tiangong.sdp.vo.resp.CheckBeforeBatchPublishResp;
import tech.tiangong.sdp.vo.resp.ProductPageResp;
import tech.tiangong.sdp.vo.resp.ProductResp;

import java.util.List;
import java.util.Set;

/**
 * 商品
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/18 16:23
 */
public interface ProductService extends BasicService {
    Boolean create(final ProductAddReq req);

    ProductAddReq getReview(Long styleId);

    List<ProductAddReq> getReviewListByStyleIds(List<Long> styleIds);

    Boolean batchPublish(List<Long> styleIds);

    PageVo<ProductPageResp> page(final ProductPageReq req);

    List<ProductStateGroupDTO> stateTotal(final ProductPageReq req);

    ProductResp detail(Long productId);

    Boolean batchTestPrice(final List<ProductTestPriceReq> reqs);

    Boolean fileEdit(final ProductFileEditReq req);

    Boolean skcUpsert(final ProductAddReq req);
    void addUpdateTag(final List<Long> styleIds);
    void patternMaking(final List<Long> styleIds);

    /**
     * 补充新增SKC
     * @param req
     */
    void addNewSkc(final ProductAddReq req);
    void salesDriving(final TemuOrderSync sync) ;
    void syncTemuDataGroup() ;
    @Deprecated(forRemoval = true)
    void salesDrivings() ;

    /**
     * 发布前校验SKC对应temu商品的发布情况
     * @param styleIds
     * @return
     */
    CheckBeforeBatchPublishResp checkBeforeBatchPublish(List<Long> styleIds);

    /**
     * 批量发布或关联temu商品
     * @param req
     */
    void batchPublishOrAssociate(BatchPublishOrAssociateReq req);

    /**
     * 同步新增SKC的商品对应的temuId
     * @param productIds
     */
    void syncNewSkcTemuId(List<Long> productIds);

    void related();

    void binding(Set<String> spuCodes);

    void relatedBySkc(Set<String> skcCodes);
}
