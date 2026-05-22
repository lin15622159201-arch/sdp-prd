package tech.tiangong.sdp.repository;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.stereotype.Repository;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.SizeDiff;
import tech.tiangong.sdp.mapper.SizeDiffMapper;
import tech.tiangong.sdp.utils.SsoContext;
import tech.tiangong.sdp.vo.req.SizeDiffPageReq;

import java.util.List;
import java.util.Objects;

/**
 * 尺码档差表 Repository
 *
 * @author : qinwenxuan@zj.tech
 * @version : 1.0
 * @date : 2025/8/13 16:20
 */
@Repository
public class SizeDiffRepository extends ManualBaseRepository<SizeDiffMapper, SizeDiff> {
    public List<SizeDiff> listBySizeCode(final String sizeCode) {
        return this.list(new LambdaQueryWrapper<SizeDiff>()
                .eq(SizeDiff::getDeleted, Bool.NO.getCode())
                .eq(SizeDiff::getSizeCode, sizeCode)
                .orderByDesc(SizeDiff::getCreatedTime)
        )

                ;
    }

    public IPage<SizeDiff> webPage(final SizeDiffPageReq req) {
        final var w = new LambdaQueryWrapper<SizeDiff>()
                .eq(SizeDiff::getDeleted, Bool.NO.getCode());
        w.eq(SizeDiff::getTenantId, SsoContext.tenantId());
        if (Objects.nonNull(req.getCreatorId())) {
            w.eq(SizeDiff::getCreatorId, req.getCreatorId());
        }
        if (Objects.nonNull(req.getEnable())) {
            w.eq(SizeDiff::getEnable, req.getEnable());
        }
        if (Objects.nonNull(req.getCreatedStartTime())) {
            w.ge(SizeDiff::getCreatedTime, req.getCreatedStartTime());
        }
        if (Objects.nonNull(req.getCreatedEndTime())) {
            w.le(SizeDiff::getCreatedTime, req.getCreatedEndTime());
        }
        if (StrUtil.isNotBlank(req.getCreatorName())) {
            w.like(SizeDiff::getCreatorName, req.getCreatorName());
        }
        if (StrUtil.isNotBlank(req.getSizeCode())) {
            w.ge(SizeDiff::getSizeCode, req.getSizeCode());
        }
        if (StrUtil.isNotBlank(req.getSizeName())) {
            w.like(SizeDiff::getSizeName, req.getSizeName());
        }
        w.orderByDesc(SizeDiff::getCreatedTime);
        return this.page(new Page<>(req.getPageNum(), req.getPageSize()), w);
    }

}
