package tech.tiangong.sdp.repository;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.PlatformCategoryMapping;
import tech.tiangong.sdp.mapper.PlatformCategoryMappingMapper;
import tech.tiangong.sdp.utils.SsoContext;
import tech.tiangong.sdp.vo.req.PlatformCategoryMappingPageReq;

import java.util.List;
import java.util.Objects;
import java.util.Set;

/**
 * Temu尺码表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class PlatformCategoryMappingRepository extends ManualBaseRepository<PlatformCategoryMappingMapper, PlatformCategoryMapping> {
    public List<PlatformCategoryMapping> listByPlatformCode(final String platformCode) {
        return this.list(new LambdaQueryWrapper<PlatformCategoryMapping>()
                .eq(PlatformCategoryMapping::getDeleted, Bool.NO.getCode())
                .eq(PlatformCategoryMapping::getPlatformCode, platformCode)
                .orderByDesc(PlatformCategoryMapping::getCreatedTime)
        )

                ;
    }

    public IPage<PlatformCategoryMapping> webPage(final PlatformCategoryMappingPageReq req) {
        final var w = new LambdaQueryWrapper<PlatformCategoryMapping>()
                .eq(PlatformCategoryMapping::getDeleted, Bool.NO.getCode());
        w.eq(PlatformCategoryMapping::getTenantId, SsoContext.tenantId());
        if (Objects.nonNull(req.getCreatorId())) {
            w.eq(PlatformCategoryMapping::getCreatorId, req.getCreatorId());
        }
        if (Objects.nonNull(req.getCreatedStartTime())) {
            w.ge(PlatformCategoryMapping::getCreatedTime, req.getCreatedStartTime());
        }
        if (Objects.nonNull(req.getCreatedEndTime())) {
            w.le(PlatformCategoryMapping::getCreatedTime, req.getCreatedEndTime());
        }
        if (StrUtil.isNotBlank(req.getCreatorName())) {
            w.like(PlatformCategoryMapping::getCreatorName, req.getCreatorName());
        }
        if (StrUtil.isNotBlank(req.getPlatformCode())) {
            w.eq(PlatformCategoryMapping::getPlatformCode, req.getPlatformCode());
        }
        if (StrUtil.isNotBlank(req.getCategoryCode())) {
            w.eq(PlatformCategoryMapping::getCategoryCode, req.getCategoryCode());
        }
        w.orderByDesc(PlatformCategoryMapping::getCreatedTime);
        return this.page(new Page<>(req.getPageNum(), req.getPageSize()), w);
    }

    public List<PlatformCategoryMapping> listByCategoryCodes(
            final Set<String> categoryCodes) {
        return this.list(new LambdaQueryWrapper<PlatformCategoryMapping>()
                .eq(PlatformCategoryMapping::getDeleted, Bool.NO.getCode())
                .in(PlatformCategoryMapping::getCategoryCode, categoryCodes)
                .orderByDesc(PlatformCategoryMapping::getCreatedTime)
        )

                ;
    }
}
