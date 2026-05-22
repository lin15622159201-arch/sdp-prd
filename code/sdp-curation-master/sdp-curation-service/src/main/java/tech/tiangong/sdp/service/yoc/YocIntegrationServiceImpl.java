package tech.tiangong.sdp.service.yoc;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.StrUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.aikero.blade.core.protocol.PageVo;
import team.aikero.blade.uacs.sdk.vo.UserVo;
import team.aikero.blade.user.entity.CurrentUser;
import team.aikero.blade.user.holder.CurrentUserHolder;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.convert.StyleOnShelvesConvert;
import tech.tiangong.sdp.entity.Shop;
import tech.tiangong.sdp.entity.StyleOnShelves;
import tech.tiangong.sdp.enums.ShopReviewStatusEnum;
import tech.tiangong.sdp.enums.StyleOnShelveReviewEnum;
import tech.tiangong.sdp.external.UacsUserRemoteHelper;
import tech.tiangong.sdp.mapper.StyleOnShelvesMapper;
import tech.tiangong.sdp.repository.ShopRepository;
import tech.tiangong.sdp.repository.StyleOnShelvesRepository;
import tech.tiangong.sdp.service.ProductService;
import tech.tiangong.sdp.service.StyleOnShelvesService;
import tech.tiangong.sdp.util.StreamUtil;
import tech.tiangong.sdp.vo.dto.StyleOnShelvesGroupDTO;
import tech.tiangong.sdp.vo.req.ProductAddReq;
import tech.tiangong.sdp.vo.req.StyleOnShelvesPageReq;
import tech.tiangong.sdp.vo.req.yoc.*;
import tech.tiangong.sdp.vo.resp.ShopResp;
import tech.tiangong.sdp.vo.resp.StyleOnShelvesPageResp;
import tech.tiangong.sdp.vo.resp.yoc.YocProductReviewResp;
import tech.tiangong.sdp.vo.resp.yoc.YocProductSkcResp;
import tech.tiangong.sdp.vo.resp.yoc.YocProductSkuResp;
import tech.tiangong.sdp.vo.resp.yoc.YocUserQueryResp;

import javax.validation.ValidationException;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

/**
 * YOC商品服务实现类
 * <p>
 * 实现YOC系统的商品相关业务操作，包括商品列表查询、状态统计、详情查询、店铺审核等功能。
 * </p>
 *
 * @author while
 * @since 1.0.0
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class YocIntegrationServiceImpl implements YocIntegrationService {

    private final StyleOnShelvesService styleOnShelvesService;
    private final StyleOnShelvesMapper styleOnShelvesMapper;
    private final StyleOnShelvesRepository styleOnShelvesRepository;
    private final UacsUserRemoteHelper uacsUserRemoteHelper;
    private final ShopRepository shopRepository;
    private final ProductService productService;

    /**
     * 分页查询商品列表
     *
     * @param req 查询请求参数
     * @return 分页结果
     */
    @Override
    public PageVo<StyleOnShelvesPageResp> onShelvePage(StyleOnShelvesPageReq req) {
        //如果没有指定店铺, 默认查询主体下所有店铺,没有店铺,返回空
        if (CollUtil.isEmpty(req.getStoreIdList())) {
            // 主体下所有店铺
            List<Shop> shopList = this.listShopBySubject(req.getSubjectCode(), req.getSubjectName());
            if (CollUtil.isEmpty(shopList)) {
                return new PageVo<>();
            }
            List<Long> shopIdList = StreamUtil.convertListAndDistinct(shopList, Shop::getShopId);
            req.setStoreIdList(shopIdList);
        }

        return styleOnShelvesService.page(req);
    }

    @Override
    public StyleOnShelvesGroupDTO stateTotal(StyleOnShelvesPageReq req) {
        final var resp = new StyleOnShelvesGroupDTO();

        if (CollUtil.isEmpty(req.getStoreIdList())) {
            // 主体下所有店铺
            List<Shop> shopList = this.listShopBySubject(req.getSubjectCode(), req.getSubjectName());
            if (CollUtil.isEmpty(shopList)) {
                return resp;
            }
            List<Long> shopIdList = StreamUtil.convertListAndDistinct(shopList, Shop::getShopId);
            req.setStoreIdList(shopIdList);
        }
        final var query = StyleOnShelvesConvert.buildWebPage(req);
        resp.setReviewStatus(styleOnShelvesRepository.selectShopReviewStatus(query));
        return resp;
    }


    /**
     * 店铺审核商品
     *
     * @param req 审核请求参数
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean shopAudit(YocStyleOnShelvesAuditReq req) {
        log.info("YOC商品服务 - 店铺审核商品, styleId: {}, auditStatus: {}", req.getStyleId(), req.getAuditStatus());
        if (Objects.equals(req.getAuditStatus(), 2) && StrUtil.isBlank(req.getAuditReason())) {
            throw new ValidationException("驳回原因不能为空");
        }
        StyleOnShelves entity = styleOnShelvesMapper.selectById(req.getStyleId());
        if (entity == null) {
            throw new RuntimeException("商品不存在");
        }

        // 校验审核状态：只有待审核状态才可以执行审核通过或驳回
        if (!Objects.equals(entity.getShopReviewStatus(), ShopReviewStatusEnum.WAIT_REVIEW.getCode())) {
            throw new ValidationException("当前商品已审核, 请不要重复操作");
        }

        CurrentUser currentUser = CurrentUserHolder.get();

        // 更新店铺审核状态
        styleOnShelvesRepository.lambdaUpdate()
                .eq(StyleOnShelves::getStyleId, req.getStyleId())
                .set(StyleOnShelves::getShopReviewStatus, req.getAuditStatus())
                .set(StyleOnShelves::getShopReviewUserId, req.getAuditorId())
                .set(StyleOnShelves::getShopReviewUserName, req.getAuditorName())
                .set(StyleOnShelves::getShopReviewTime, LocalDateTime.now())
                .set(StyleOnShelves::getReviserId, currentUser.getId())
                .set(StyleOnShelves::getReviserName, currentUser.getName())
                .set(StyleOnShelves::getShopReviewFailReason, req.getAuditStatus() == 2 ? req.getAuditReason() : null)
                .update();
        return true;
    }

    @Override
    public List<ShopResp> shopSubjectList(YocShopSubjectReq req) {
        List<Shop> shopList = this.listShopBySubject(req.getSubjectCode(), req.getSubjectName());

        return shopList.stream()
                .map(shop -> BasicConvert.copy(shop, ShopResp.class))
                .toList();
    }

    @Override
    public List<ShopResp> shopList(YocShopListReq req) {
        if (CollUtil.isEmpty(req.getShopIdList())) {
            return Collections.emptyList();
        }

        return shopRepository.listByIds(req.getShopIdList()).stream()
                .map(shop -> BasicConvert.copy(shop, ShopResp.class))
                .toList();
    }

    @Override
    public List<ShopResp> shopList(List<String> shopNameList) {
        if (CollUtil.isEmpty(shopNameList)) {
            return Collections.emptyList();
        }

        return shopRepository.listByNames(shopNameList).stream()
                .map(shop -> BasicConvert.copy(shop, ShopResp.class))
                .toList();
    }

    private List<Shop> listShopBySubject(String subjectCode, String subjectName) {
        if (StrUtil.isBlank(subjectCode) && StrUtil.isBlank(subjectName)) {
            return Collections.emptyList();
        }
        //根据主体编码或名称, 查询店铺列表
        return shopRepository.lambdaQuery()
                .eq(StrUtil.isNotBlank(subjectCode), Shop::getSubjectCode, subjectCode)
                .eq(StrUtil.isNotBlank(subjectName), Shop::getSubjectName, subjectName)
                .eq(Shop::getDeleted, 0)
                .list();
    }


    @Override
    public PageVo<YocUserQueryResp> findUserPage(YocUserQueryPageReq req) {
        //默认查询1租户下的用户
        if (Objects.isNull(req.getFilters().getTenantId())) {
            req.getFilters().setTenantId(1L);
        }
        PageVo<UserVo> userVoPageVo = uacsUserRemoteHelper.findPageByTenantId(req);
        List<YocUserQueryResp> list = userVoPageVo.getList().stream()
                .map(user -> BasicConvert.copy(user, YocUserQueryResp.class))
                .toList();
        return new PageVo<>(userVoPageVo.getPageNum(), userVoPageVo.getTotal(), list);
    }

    @Override
    public List<YocUserQueryResp> userFindByNames(List<String> names) {
        List<UserVo> userList = uacsUserRemoteHelper.findByNames(names);
        if (CollUtil.isEmpty(userList)) {
            return Collections.emptyList();
        }
        return userList.stream()
                .map(user -> BasicConvert.copy(user, YocUserQueryResp.class))
                .toList();
    }

    @Override
    public List<YocProductReviewResp> batchGetReview(YocProductReviewBatchReq req) {
        return productService.getReviewListByStyleIds(req.getStyleIdList())
                .stream()
                .filter(Objects::nonNull)
                .map(this::convertToReviewResp)
                .toList();
    }

    @Override
    public Integer updateShopReview(List<String> styleCodeList) {

        List<StyleOnShelves> unAuditStyleList = styleOnShelvesRepository.lambdaQuery().in(StyleOnShelves::getStyleCode, styleCodeList)
                .eq(StyleOnShelves::getReviewStatus, StyleOnShelveReviewEnum.REVIEW_PASS.getCode())
                .eq(StyleOnShelves::getShopReviewStatus, ShopReviewStatusEnum.WAIT_REVIEW.getCode())
                .list();

        if (CollUtil.isEmpty(unAuditStyleList)) {
            return 0;
        }

        List<String> unAuditStyleCodeList = StreamUtil.convertListAndDistinct(unAuditStyleList, StyleOnShelves::getStyleCode);

        // 更新店铺审核状态
        styleOnShelvesRepository.lambdaUpdate()
                .in(StyleOnShelves::getStyleCode, unAuditStyleCodeList)
                .set(StyleOnShelves::getShopReviewStatus, ShopReviewStatusEnum.REVIEW_PASS.getCode())
                .set(StyleOnShelves::getShopReviewUserId, 1L)
                .set(StyleOnShelves::getShopReviewUserName, "系统")
                .set(StyleOnShelves::getShopReviewTime, LocalDateTime.now())
                .update();
        return unAuditStyleCodeList.size();
    }

    private YocProductReviewResp convertToReviewResp(ProductAddReq req) {
        YocProductReviewResp resp = new YocProductReviewResp();
        resp.setProductId(req.getProductId());
        resp.setStoreId(req.getStoreId());
        resp.setStyleId(req.getStyleId());
        resp.setStyleCode(req.getStyleCode());

        if (CollUtil.isNotEmpty(req.getSkcReqs())) {
            resp.setSkcReqs(req.getSkcReqs().stream()
                    .map(skc -> {
                        YocProductSkcResp skcResp = new YocProductSkcResp();
                        skcResp.setProductSkcId(skc.getProductSkcId());
                        skcResp.setSkcId(skc.getSkcId());
                        skcResp.setSkcCode(skc.getSkcCode());
                        skcResp.setColor(skc.getColor());
                        skcResp.setPlatformColor(skc.getPlatformColor());

                        if (CollUtil.isNotEmpty(skc.getSkuReqs())) {
                            skcResp.setSkuReqs(skc.getSkuReqs().stream()
                                    .map(sku -> {
                                        YocProductSkuResp skuResp = new YocProductSkuResp();
                                        skuResp.setProductSkuId(sku.getProductSkuId());
                                        skuResp.setSkuId(sku.getSkuId());
                                        skuResp.setSkuCode(sku.getSkuCode());
                                        skuResp.setSupplierPrice(sku.getSupplierPrice());
                                        return skuResp;
                                    })
                                    .toList());
                        }
                        return skcResp;
                    })
                    .toList());
        }
        return resp;
    }
}
