package tech.tiangong.sdp.service.impl;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.convert.PlatformCategoryMappingConvert;
import tech.tiangong.sdp.repository.PlatformCategoryMappingRepository;
import tech.tiangong.sdp.service.PlatformCategoryMappingService;
import tech.tiangong.sdp.vo.req.PlatformCategoryMappingAddReq;
import tech.tiangong.sdp.vo.req.PlatformCategoryMappingPageReq;
import tech.tiangong.sdp.vo.resp.PlatformCategoryMappingResp;

import javax.validation.ValidationException;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * 品类关联
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/16 18:29
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class PlatformCategoryMappingServiceImpl implements PlatformCategoryMappingService {
    private final PlatformCategoryMappingRepository platformCategoryMappingRepository;

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchCreate(List<PlatformCategoryMappingAddReq> req) {
        valid(req);
        final var list = PlatformCategoryMappingConvert.convert(req);
        this.platformCategoryMappingRepository.saveBatch(list, list.size());
        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchRemove(List<Long> mappingIds) {
        final var list = this.platformCategoryMappingRepository.listByIds(mappingIds);
        if (CollectionUtil.isEmpty(list)) {
            return false;
        }
        list.forEach(it -> platformCategoryMappingRepository.logicDelete(it.getMappingId()));
        return true;
    }

    @Override
    public PageVo<PlatformCategoryMappingResp> page(PlatformCategoryMappingPageReq req) {
        final var page = this.platformCategoryMappingRepository.webPage(req);
        final var records = page.getRecords();
        if (CollectionUtil.isEmpty(records)) {
            return new PageVo<>();
        }
        return BasicConvert.page(page, PlatformCategoryMappingConvert::convert);
    }

    private void valid(List<PlatformCategoryMappingAddReq> req) {
        final var list = platformCategoryMappingRepository.listByCategoryCodes(req.stream()
                .map(PlatformCategoryMappingAddReq::getCategoryCode)
                .collect(Collectors.toSet()));
        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        final var cateMap = BasicConvert.toMap(req, PlatformCategoryMappingAddReq::getCategoryCode);
        list.forEach(it -> {
            final var cate = cateMap.get(it.getCategoryCode());
            if (Objects.nonNull(cate) &&
                    StrUtil.equalsIgnoreCase(it.getPlatformCode(), cate.getPlatformCode())) {
            /*&&
                    StrUtil.equalsIgnoreCase(it.getPlatformCategoryCode(), cate.getPlatformCategoryCode())*/

                throw new ValidationException("该平台已存在相同的品类【" + it.getCategoryName() + "】关联，请勿重复添加");
            }
        });
    }
}
