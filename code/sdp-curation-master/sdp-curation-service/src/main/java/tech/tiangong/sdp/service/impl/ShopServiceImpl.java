package tech.tiangong.sdp.service.impl;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.core.exception.BusinessException;
import team.aikero.blade.core.protocol.PageVo;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.common.req.ShopInnerPageReq;
import tech.tiangong.sdp.common.resp.ShopInnerResp;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.convert.ShopConvert;
import tech.tiangong.sdp.entity.Shop;
import tech.tiangong.sdp.entity.TemuAppConfig;
import tech.tiangong.sdp.repository.ShopAppRepository;
import tech.tiangong.sdp.repository.ShopRepository;
import tech.tiangong.sdp.repository.TemuAppConfigRepository;
import tech.tiangong.sdp.service.ShopService;
import tech.tiangong.sdp.temu.http.TemuShopContext;
import tech.tiangong.sdp.temu.serivce.TemuProductService;
import tech.tiangong.sdp.temu.vo.resp.TemuTokenResultResp;
import tech.tiangong.sdp.vo.dto.TemuAppDTO;
import tech.tiangong.sdp.vo.req.ShopAddReq;
import tech.tiangong.sdp.vo.req.ShopEditReq;
import tech.tiangong.sdp.vo.req.ShopEnableReq;
import tech.tiangong.sdp.vo.req.ShopPageReq;
import tech.tiangong.sdp.vo.resp.ShopResp;

import java.time.LocalDateTime;
import java.util.*;

/**
 * 店铺
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/17 9:49
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class ShopServiceImpl implements ShopService {
    private final static String CACHE_KEY = "sdp-curation:temu:app:";
    private final ShopRepository shopRepository;
    private final ShopAppRepository shopAppRepository;
    private final TemuAppConfigRepository temuAppConfigRepository;
    private final StringRedisTemplate redisTemplate;
    private final TemuProductService temuProductService;

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchCreate(List<ShopAddReq> req) {
        valid(req);
        final var list = ShopConvert.convert(req, this.configs());
        final var apps = list.stream().flatMap(it -> it.getApps().stream()).toList();
        if (CollectionUtil.isEmpty(apps)) {
            throw new ValidationException("店铺的APP配置不存在请修改");
        }
        list.forEach(it -> {
            final var token = this.getToken(ShopConvert.convert(it, it.getApps().getFirst()));
            if (Objects.isNull(token)) {
                throw new ValidationException("店铺【" + it.getShopName() + "】Token失效");
            } else {
                it.setAuthEndTime(token.expiredTime());
            }
        });
        this.shopAppRepository.saveBatch(apps, apps.size());
        this.shopRepository.saveBatch(list, list.size());
        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchRemove(List<Long> shopIds) {
        final var list = this.shopRepository.listByIds(shopIds);
        if (CollectionUtil.isEmpty(list)) {
            return false;
        }
        list.forEach(it -> {
            shopRepository.logicDelete(it.getShopId());
            this.redisTemplate.delete(CACHE_KEY + it.getShopId());
        });
        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchEnable(List<ShopEnableReq> req) {
        final var list = this.shopRepository.listByIds(req.stream().map(ShopEnableReq::getShopId).toList());
        if (CollectionUtil.isEmpty(list)) {
            return false;
        }
        final var reqMap = BasicConvert.toMap(req, ShopEnableReq::getShopId);
        final var data = new ArrayList<Shop>();
        list.stream().filter(it -> reqMap.containsKey(it.getShopId()))
                .forEach(it -> {
                    it.setEnable(reqMap.get(it.getShopId()).getEnable());
                    BasicConvert.setRevised(it);
                    data.add(it);
                });
        shopRepository.updateBatchById(data, data.size());
        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean edit(ShopEditReq req) {
        valid(req);
        final var e = this.shopRepository.obtainById(req.getShopId(), "店铺不存在");
        ShopConvert.convert(e, req);
        final var config = this.configs().get(e.getSubjectCode());
        if (Objects.isNull(config)) {
            throw new ValidationException("主体【" + req.getSubjectName() + "】对应的APP配置不存在，请修改");
        }
        final var app = this.shopAppRepository.getByShopId(e.getShopId());
        app.setAppKey(config.getAppKey());
        app.setAppSecret(config.getAppSecret());
        final var token = this.getToken(ShopConvert.convert(e, app));
        if (Objects.isNull(token)) {
            throw new ValidationException("店铺【" + e.getShopName() + "】Token失效");
        } else {
            e.setAuthEndTime(token.expiredTime());
            e.setExpired(Bool.YES.getCode());
        }
        shopAppRepository.updateById(app);
        shopRepository.updateById(e);
        this.redisTemplate.delete(CACHE_KEY + req.getShopId());
        return true;
    }

    @Override
    public PageVo<ShopResp> page(ShopPageReq req) {
        final var page = this.shopRepository.webPage(req);
        final var records = page.getRecords();
        if (CollectionUtil.isEmpty(records)) {
            return new PageVo<>();
        }
        return BasicConvert.page(page, ShopConvert::convert);
    }

    @Override
    public TemuAppDTO getApp(Long shopId) {
        final var cache = this.redisTemplate.boundValueOps(CACHE_KEY + shopId);
        final var cacheVal = cache.get();
        if (StrUtil.isBlank(cacheVal)) {
            final var shop = this.shopRepository.obtainById(shopId, "店铺【" + shopId + "】不存在");
            final var app = this.shopAppRepository.getByShopId(shop.getShopId());
            if (Objects.isNull(app)) {
                throw new BusinessException("店铺【" + shopId + "】对应的APP配置不存在");
            }
            final var dto = ShopConvert.convert(shop, app);
            cache.set(JsonsKt.toJson(dto));
            return dto;
        }
        return JsonsKt.parseJson(cacheVal, TemuAppDTO.class);
    }

    @Override
    public PageVo<ShopInnerResp> pageInner(ShopInnerPageReq req) {
        final var q = BasicConvert.copy(req, ShopPageReq.class);
        final var page = this.shopRepository.webPage(q);
        final var records = page.getRecords();
        if (CollectionUtil.isEmpty(records)) {
            return new PageVo<>();
        }
        return BasicConvert.page(page, it -> BasicConvert.copy(it, ShopInnerResp.class));
    }

    @Override
    public void job() {
        final var list = this.shopRepository.list();
        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        list.forEach(this::job);
    }

    @Override
    public void invalid(Long shopId) {
        final var e = this.shopRepository.getById(shopId);
        if (Objects.isNull(e)) {
            return;
        }
        if (Objects.equals(Bool.NO.getCode(), e.getExpired())) {
            return;
        }
        e.setExpired(Bool.NO.getCode());
        e.setMessage("店铺Token失效");
        e.setRevisedTime(LocalDateTime.now());
        e.setReviserId(e.getCreatorId());
        e.setReviserName(e.getCreatorName());
        this.shopRepository.updateById(e);
    }

    private void job(final Shop shop) {
        try {
            shop.setRevisedTime(LocalDateTime.now());
            shop.setReviserId(shop.getCreatorId());
            shop.setReviserName(shop.getCreatorName());
            final var token = this.getToken(this.getApp(shop.getShopId()));
            if (Objects.isNull(token)) {
                shop.setExpired(Bool.NO.getCode());
                shop.setMessage("店铺Token失效");
            } else {
                shop.setAuthEndTime(token.expiredTime());
            }
        } catch (Exception e) {
            shop.setExpired(Bool.NO.getCode());
            shop.setMessage(e.getLocalizedMessage());
            log.error("更新店铺有效期失败\t{}", e.getLocalizedMessage(), e);
        }finally {
            this.shopRepository.updateById(shop);
        }
    }

    private TemuTokenResultResp getToken(final TemuAppDTO app) {
        TemuShopContext.set(app);
        try {
            return this.temuProductService.getTokenInfo();
        } catch (Exception e) {
            log.error("获取Token失败\t{}", e.getLocalizedMessage(), e);
            if (e instanceof ValidationException)
                return null;
            throw e;
        } finally {
            TemuShopContext.clear();
        }
    }

    private void valid(final ShopEditReq req) {
        final var list = this.shopRepository.listByNames(List.of(req.getShopName()));
        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        if (list.stream().anyMatch(it -> !Objects.equals(it.getShopId(), req.getShopId()))) {
            throw new ValidationException("店铺名称已经存在【" + req.getShopName() + "】，请修改");
        }
    }

    private void valid(final List<ShopAddReq> req) {
        final var list = this.shopRepository.listByNames(req.stream()
                .map(ShopAddReq::getShopName).toList());
        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        final var reqMap = BasicConvert.toMap(req, ShopAddReq::getShopName);
        final Set<String> names = new HashSet<>(reqMap.keySet());
        list.forEach(it -> Optional.ofNullable(reqMap.get(it.getShopName()))
                .ifPresent(t -> names.add(it.getShopName())));
        throw new ValidationException("店铺名称已经存在【" + String.join(StrUtil.COMMA, names) + "】，请勿重复添加");
    }

    private Map<String, TemuAppConfig> configs() {
        final var configs = temuAppConfigRepository.list();
        if (CollectionUtil.isEmpty(configs)) {
            throw new BusinessException("APP配置不存在");
        }
        return BasicConvert.toMap(configs, TemuAppConfig::getSubjectCode);
    }
}
