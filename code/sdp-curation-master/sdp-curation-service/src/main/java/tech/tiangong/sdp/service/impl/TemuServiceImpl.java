package tech.tiangong.sdp.service.impl;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.entity.TemuColor;
import tech.tiangong.sdp.entity.TemuProductSpec;
import tech.tiangong.sdp.entity.TemuProductTemplate;
import tech.tiangong.sdp.entity.TemuSize;
import tech.tiangong.sdp.repository.*;
import tech.tiangong.sdp.service.ShopService;
import tech.tiangong.sdp.service.TemuService;
import tech.tiangong.sdp.temu.http.TemuShopContext;
import tech.tiangong.sdp.temu.serivce.TemuProductService;
import tech.tiangong.sdp.temu.vo.dto.TemuFreightTemplateDTO;
import tech.tiangong.sdp.temu.vo.dto.TemuWarehouseDTO;
import tech.tiangong.sdp.temu.vo.req.TemuLogisticsTemplateGetReq;
import tech.tiangong.sdp.temu.vo.req.TemuProductAccessoriesListGetPageReq;
import tech.tiangong.sdp.temu.vo.req.TemuWarehouseGetReq;
import tech.tiangong.sdp.temu.vo.resp.*;
import tech.tiangong.sdp.vo.req.AccessoriesReq;
import tech.tiangong.sdp.vo.req.LogisticsTemplateReq;
import tech.tiangong.sdp.vo.req.WarehouseReq;
import tech.tiangong.sdp.vo.resp.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

/**
 * TemuService
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/9 14:46
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class TemuServiceImpl extends DefaultTaskServiceImpl implements TemuService {
    private final static String CACHE_KEY = "sdp-curation:temu:";
    private final ShopService shopService;
    private final TemuProductService temuProductService;
    private final TemuProductCategoryRepository temuProductCategoryRepository;
    private final TemuProductSpecRepository temuProductSpecRepository;
    private final TemuColorRepository temuColorRepository;
    private final TemuSizeRepository temuSizeRepository;
    private final TemuProductTemplateRepository temuProductTemplateRepository;
    private final TemuProductTemplatePropertyRepository temuProductTemplatePropertyRepository;
    private final StringRedisTemplate redisTemplate;

    @Override
    public List<TemuCategoryResp> listCategory() {
        final var list = temuProductCategoryRepository.list();
        if (CollectionUtil.isEmpty(list)) {
            return List.of();
        }
        return list.stream().map(it -> BasicConvert.copy(it, TemuCategoryResp.class)).toList();
    }

    @Override
    public List<TemuProductSpecResp> listProductSpec() {
        final var list = temuProductSpecRepository.list();
        if (CollectionUtil.isEmpty(list)) {
            return List.of();
        }
        return list.stream().map(this::toProductSpecResp).toList();
    }

    @Override
    public List<TemuColorResp> listColor(final Long templateId) {
        final var list = temuColorRepository.listByTemplateId(templateId);
        if (CollectionUtil.isEmpty(list)) {
            return List.of();
        }
        return list.stream().map(this::toColorResp).toList();
    }

    @Override
    public List<TemuSizeResp> listSize(final Long templateId) {
        final var list = temuSizeRepository.listByTemplateId(templateId);
        if (CollectionUtil.isEmpty(list)) {
            return List.of();
        }
        return list.stream().map(this::toSizeResp).toList();
    }

    @Override
    public List<TemuPartResp> listPart(Long templateId) {
        final var template = this.temuProductTemplateRepository.getById(templateId);
        if (Objects.isNull(template)) {
            return List.of();
        }
        return toPartResp(template);
    }


    @Override
    public List<TemuGoodsPropertyResp> listProperty(Long templateId) {
        final var list = temuProductTemplatePropertyRepository.listByTemplateId(templateId);
        if (CollectionUtil.isEmpty(list)) {
            return List.of();
        }
        return list.stream()
                .map(it -> JsonsKt.parseJson(it.getProperty(), TemuGoodsPropertyResp.class))
                .toList();
    }

    @Override
    public List<TemuFreightTemplateDTO> listLogisticsTemplate(final LogisticsTemplateReq req) {
        final var getReq = new TemuLogisticsTemplateGetReq();
        getReq.setSiteIds(List.of(req.getSiteId()));
        TemuShopContext.set(shopService.getApp(req.getShopId()));
        try {
            return this.temuProductService.getLogisticsTemplate(getReq);
        } finally {
            TemuShopContext.clear();
        }
    }

    @Override
    public List<TemuWarehouseDTO> listWarehouse(final WarehouseReq req) {
        final var getReq = new TemuWarehouseGetReq();
        getReq.setSiteIdList(List.of(req.getSiteId()));
        TemuShopContext.set(shopService.getApp(req.getShopId()));
        final List<TemuWarehouseResp> resp;
        try {
            resp = this.temuProductService.getWarehouse(getReq);
        } finally {
            TemuShopContext.clear();
        }
        return resp.stream().flatMap(it -> it.getValidWarehouseList().stream()).toList();
    }

    @Override
    public List<TemuPartResp> listPart() {
        final var cache = this.redisTemplate.boundValueOps(CACHE_KEY + "template:part");
        final var cacheVal = cache.get();
        if (StrUtil.isBlank(cacheVal)) {
            final var lists = this.temuProductTemplateRepository.list();
            if (CollectionUtil.isEmpty(lists)) {
                return List.of();
            }
            final var sizeSpec = new ArrayList<TemuPartResp>();
            final var ids = new HashSet<Long>();
            lists.stream()
                    .map(TemuProductTemplate::getSizeSpec)
                    .filter(StrUtil::isNotBlank)
                    .forEach(size -> JsonsKt.parseJsonList(size, TemuSizeMetaNecessaryResp.class)
                            .stream().filter(it -> !ids.contains(it.getId()))
                            .forEach(it -> {
                                ids.add(it.getId());
                                sizeSpec.add(getPartResp(it));
                            }));
            cache.set(JsonsKt.toJson(sizeSpec));
            cache.expire(2 << 5, TimeUnit.SECONDS);
            return sizeSpec;
        }
        return JsonsKt.parseJsonList(cacheVal, TemuPartResp.class);
    }

    @Override
    public List<TemuProductAccessoriesResp> listAccessories(AccessoriesReq req) {
        final var getReq = new TemuProductAccessoriesListGetPageReq();
        getReq.setPage(req.getPageNum());
        getReq.setPageSize(req.getPageSize());
        getReq.setFuzzyValue(req.getFuzzyValue());
        getReq.setVidList(req.getVidList());
        TemuShopContext.set(shopService.getApp(req.getShopId()));
        final TemuProductAccessoriesResultResp resp;
        try {
            resp = this.temuProductService.getAccessoriesList(getReq);
        } finally {
            TemuShopContext.clear();
        }
        return resp.getData();
    }

    private TemuProductSpecResp toProductSpecResp(final TemuProductSpec spec) {
        final var resp = new TemuProductSpecResp();
        resp.setId(spec.getSpecId());
        resp.setName(spec.getSpecName());
        resp.setAvailable(spec.getAvailable());
        return resp;
    }

    private TemuColorResp toColorResp(final TemuColor color) {
        final var resp = new TemuColorResp();
        resp.setId(color.getColorId());
        resp.setName(color.getColorName());
        resp.setGroupId(color.getGroupId());
        resp.setGroupName(color.getGroupName());
        resp.setSpecId(color.getSpecId());
        resp.setAvailable(color.getAvailable());
        return resp;
    }

    private TemuSizeResp toSizeResp(final TemuSize size) {
        final var resp = new TemuSizeResp();
        resp.setId(size.getSizeId());
        resp.setName(size.getSizeName());
        resp.setGroupId(size.getGroupId());
        resp.setGroupName(size.getGroupName());
        resp.setSpecId(size.getSpecId());
        resp.setAvailable(size.getAvailable());
        return resp;
    }

    private List<TemuPartResp> toPartResp(TemuProductTemplate template) {
        final var size = template.getSizeSpec();
        if (StrUtil.isBlank(size)) {
            return List.of();
        }
        return JsonsKt.parseJsonList(size, TemuSizeMetaNecessaryResp.class)
                .stream().map(this::getPartResp).toList();
    }

    private TemuPartResp getPartResp(final TemuSizeMetaNecessaryResp size) {
        final var resp = new TemuPartResp();
        resp.setId(size.getId());
        resp.setName(size.getName());
        resp.setRequired((Objects.nonNull(size.getNecessary()) && size.getNecessary() ? Bool.YES : Bool.NO).getCode());
        return resp;
    }
}
