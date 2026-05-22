package tech.tiangong.sdp.repository;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.Shop;
import tech.tiangong.sdp.mapper.ShopMapper;
import tech.tiangong.sdp.utils.SsoContext;
import tech.tiangong.sdp.vo.req.ShopPageReq;

import java.util.List;
import java.util.Objects;

/**
 * 店铺表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class ShopRepository extends ManualBaseRepository<ShopMapper, Shop> {
    public List<Shop> listByNames(
            final List<String> names) {
        return this.list(new LambdaQueryWrapper<Shop>()
                .eq(Shop::getDeleted, Bool.NO.getCode())
                .in(Shop::getShopName, names)
                .orderByDesc(Shop::getCreatedTime)
        )

                ;
    }

    public List<Shop> listByPlatformCode(final String platformCode) {
        return this.list(new LambdaQueryWrapper<Shop>()
                .eq(Shop::getDeleted, Bool.NO.getCode())
                .eq(Shop::getPlatformCode, platformCode)
                .orderByDesc(Shop::getCreatedTime)
        )
                ;
    }

    public List<Shop> listByBusinessOperatorId(final Long businessOperatorId) {
        return this.list(new LambdaQueryWrapper<Shop>()
                .eq(Shop::getDeleted, Bool.NO.getCode())
                .eq(Shop::getBusinessOperatorId, businessOperatorId)
                .orderByDesc(Shop::getCreatedTime)
        )
                ;
    }

    public IPage<Shop> webPage(final ShopPageReq req) {
        final var w = new LambdaQueryWrapper<Shop>()
                .eq(Shop::getDeleted, Bool.NO.getCode());
        if (Objects.nonNull(req.getTenantId())) {
            w.eq(Shop::getTenantId, req.getTenantId());
        } else {
            w.eq(Shop::getTenantId, SsoContext.tenantId());
        }
        if (Objects.nonNull(req.getCreatorId())) {
            w.eq(Shop::getCreatorId, req.getCreatorId());
        }
        if (Objects.nonNull(req.getBusinessOperatorId())) {
            w.eq(Shop::getBusinessOperatorId, req.getBusinessOperatorId());
        }
        if (Objects.nonNull(req.getEnable())) {
            w.eq(Shop::getEnable, req.getEnable());
        }
        if (Objects.nonNull(req.getExpired())) {
            w.eq(Shop::getExpired, req.getExpired());
        }
        if (Objects.nonNull(req.getCreatedStartTime())) {
            w.ge(Shop::getCreatedTime, req.getCreatedStartTime());
        }
        if (Objects.nonNull(req.getCreatedEndTime())) {
            w.le(Shop::getCreatedTime, req.getCreatedEndTime());
        }
        if (StrUtil.isNotBlank(req.getCreatorName())) {
            w.like(Shop::getCreatorName, req.getCreatorName());
        }
        if (StrUtil.isNotBlank(req.getPlatformCode())) {
            w.ge(Shop::getPlatformCode, req.getPlatformCode());
        }
        if (StrUtil.isNotBlank(req.getShopName())) {
            w.like(Shop::getShopName, req.getShopName());
        }
        if (StrUtil.isNotBlank(req.getShopType())) {
            w.like(Shop::getShopType, req.getShopType());
        }
        if (StrUtil.isNotBlank(req.getSubjectCode())) {
            w.eq(Shop::getSubjectCode, req.getSubjectCode());
        }
        if (StrUtil.isNotBlank(req.getSubjectName())) {
            w.eq(Shop::getSubjectName, req.getSubjectName());
        }
        w.orderByDesc(Shop::getCreatedTime);
        return this.page(new Page<>(req.getPageNum(), req.getPageSize()), w);
    }

}
