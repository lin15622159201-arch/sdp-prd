package tech.tiangong.sdp.repository;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.SizeTemplate;
import tech.tiangong.sdp.mapper.SizeTemplateMapper;
import tech.tiangong.sdp.utils.SsoContext;
import tech.tiangong.sdp.vo.req.SizeTemplatePageReq;

import java.util.List;
import java.util.Objects;

/**
 * 尺码模板表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class SizeTemplateRepository extends ManualBaseRepository<SizeTemplateMapper, SizeTemplate> {
    public List<SizeTemplate> listByNames(
            final List<String> names) {
        return this.list(new LambdaQueryWrapper<SizeTemplate>()
                .eq(SizeTemplate::getDeleted, Bool.NO.getCode())
                .in(SizeTemplate::getTemplateName, names)
                .orderByDesc(SizeTemplate::getCreatedTime)
        )

                ;
    }

    public SizeTemplate getByName(final String name) {
        return this.getOne(new LambdaQueryWrapper<SizeTemplate>()
                .eq(SizeTemplate::getDeleted, Bool.NO.getCode())
                .eq(SizeTemplate::getTemplateName, name)
                .orderByDesc(SizeTemplate::getCreatedTime)
        )
                ;
    }

    public IPage<SizeTemplate> webPage(final SizeTemplatePageReq req) {
        final var w = new LambdaQueryWrapper<SizeTemplate>()
                .eq(SizeTemplate::getDeleted, Bool.NO.getCode());
        w.eq(SizeTemplate::getTenantId, SsoContext.tenantId());
        if (Objects.nonNull(req.getCreatorId())) {
            w.eq(SizeTemplate::getCreatorId, req.getCreatorId());
        }
        if (Objects.nonNull(req.getEnable())) {
            w.eq(SizeTemplate::getEnable, req.getEnable());
        }
        if (Objects.nonNull(req.getCatId())) {
            w.eq(SizeTemplate::getPlatformCategoryCode, Objects.toString(req.getCatId()));
        }
        if (Objects.nonNull(req.getCreatedStartTime())) {
            w.ge(SizeTemplate::getCreatedTime, req.getCreatedStartTime());
        }
        if (Objects.nonNull(req.getCreatedEndTime())) {
            w.le(SizeTemplate::getCreatedTime, req.getCreatedEndTime());
        }
        if (StrUtil.isNotBlank(req.getCreatorName())) {
            w.like(SizeTemplate::getCreatorName, req.getCreatorName());
        }
        if (StrUtil.isNotBlank(req.getGroupCode())) {
            w.ge(SizeTemplate::getGroupCode, req.getGroupCode());
        }
        if (StrUtil.isNotBlank(req.getTemplateName())) {
            w.like(SizeTemplate::getTemplateName, req.getTemplateName());
        }
        w.orderByDesc(SizeTemplate::getCreatedTime);
        return this.page(new Page<>(req.getPageNum(), req.getPageSize()), w);
    }
}
