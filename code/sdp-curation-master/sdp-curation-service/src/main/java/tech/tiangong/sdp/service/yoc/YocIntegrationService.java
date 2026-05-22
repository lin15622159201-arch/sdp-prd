package tech.tiangong.sdp.service.yoc;

import jakarta.validation.Valid;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.vo.dto.StyleOnShelvesGroupDTO;
import tech.tiangong.sdp.vo.req.StyleOnShelvesPageReq;
import tech.tiangong.sdp.vo.req.yoc.*;
import tech.tiangong.sdp.vo.resp.ShopResp;
import tech.tiangong.sdp.vo.resp.StyleOnShelvesPageResp;
import tech.tiangong.sdp.vo.resp.yoc.YocProductReviewResp;
import tech.tiangong.sdp.vo.resp.yoc.YocUserQueryResp;

import java.util.List;

/**
 * YOC 服务
 *
 * @author while
 * @since 1.0.0
 */
public interface YocIntegrationService {

    /**
     * 分页查询商品列表
     *
     * @param req 查询请求参数
     * @return 分页结果，包含商品列表和总数
     */
    PageVo<StyleOnShelvesPageResp> onShelvePage(StyleOnShelvesPageReq req);

    /**
     * 待上架-任务总数
     */
    StyleOnShelvesGroupDTO stateTotal(StyleOnShelvesPageReq req);

    /**
     * 店铺审核
     * <p>
     * 对商品进行审核操作，支持通过或驳回。
     * </p>
     *
     * @param req 审核请求参数
     */
    Boolean shopAudit(YocStyleOnShelvesAuditReq req);

    /**
     * 查询主体下关联店铺
     */
    List<ShopResp> shopSubjectList(YocShopSubjectReq req);

    /**
     * 店铺列表查询
     */
    List<ShopResp> shopList(@Valid YocShopListReq req);

    /**
     * 根据名称查询店铺列表
     */
    List<ShopResp> shopList(List<String> shopNameList);

    /**
     * uacs用户-分页查询
     */
    PageVo<YocUserQueryResp> findUserPage(YocUserQueryPageReq req);

    /**
     * uacs用户-名称查询
     */
    List<YocUserQueryResp> userFindByNames(List<String> names);

    /**
     * 批量查询款审核信息
     *
     * @param req 批量查询请求参数
     * @return 商品审核信息列表
     */
    List<YocProductReviewResp> batchGetReview(YocProductReviewBatchReq req);

    /**
     * 批量店主审核
     *
     */
    Integer updateShopReview(List<String> styleCodeList);
}
