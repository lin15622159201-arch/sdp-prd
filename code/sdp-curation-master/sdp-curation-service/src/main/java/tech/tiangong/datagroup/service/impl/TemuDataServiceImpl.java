package tech.tiangong.datagroup.service.impl;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.datagroup.cyxf.entity.TemuOrder;
import tech.tiangong.datagroup.cyxf.entity.TemuSkc;
import tech.tiangong.datagroup.cyxf.repository.TemuOrderRepository;
import tech.tiangong.datagroup.cyxf.repository.TemuSkcRepository;
import tech.tiangong.datagroup.dto.TemuEtlTimeDTO;
import tech.tiangong.datagroup.service.TemuDataService;
import tech.tiangong.sdp.config.TemuDataProperties;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.entity.TemuOrderSync;
import tech.tiangong.sdp.repository.TemuOrderSyncRepository;
import tech.tiangong.sdp.service.ProductService;
import tech.tiangong.sdp.service.PrototypeService;
import tech.tiangong.sdp.service.SpotStyleTaskService;
import tech.tiangong.sdp.service.component.RedissonHelper;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * Temu数据Service
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/27 15:19
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class TemuDataServiceImpl implements TemuDataService {
    private final TemuOrderRepository temuOrderRepository;
    private final TemuSkcRepository temuSkcRepository;
    private final TemuOrderSyncRepository temuOrderSyncRepository;
    private final StringRedisTemplate redisTemplate;
    private final TemuDataProperties temuDataProperties;
    private final static String CACHE_KEY = "sdp-curation:temu:data:";
    private final static int MAX_SIZE = 1024;
    //    private final static int MAX_SIZE = 1;
    private final static String LOCK_KEY = "sdp-curation:temu:data:lock:";
    private final RedissonHelper redissonHelper;
    private final SpotStyleTaskService spotStyleTaskService;
    private final PrototypeService prototypeService;
    private final ProductService productService;

    @Override
    public void run() {
        log.info("同步Temu数据--开始");
        final var cache = getEtlTime();
        if (Objects.isNull(cache)) {
            log.info("同步Temu数据,同步时间为空--结束");
            return;
        }
        final var orderTotal = this.getOrderTotal(cache);
        if (0 == orderTotal) {
            log.info("同步Temu数据,订单记录为空--结束");
            return;
        }
        redissonHelper.lock(LOCK_KEY + "sync", 60L * 2 * 2 * 2 * 2, () -> {
            sync(cache);
            return 0;
        });
        log.info("同步Temu数据--结束");
    }

    @Deprecated(forRemoval = true)
    @Override
    public void sync() {
        log.info("同步款式数据--开始");
        final var list = this.temuOrderSyncRepository.jobs();
        if (CollectionUtil.isEmpty(list)) {
            log.info("同步款式数据,Temu数据为空--结束");
            return;
        }
        list.forEach(this::sync);
        log.info("同步款式数据--结束");
    }

    private void sync(final TemuOrderSync sync) {
        sync.setSyncTime(LocalDateTime.now());
        sync.setSyncTimes(sync.requireSyncTimes() + 1);
        sync.setSyncStatus(Bool.NO.getCode());
        try {
            productService.salesDriving(sync);

//            if (!prototypeService.temuOrderSync(sync)) {
//                if (!spotStyleTaskService.temuSync(sync)) {
//                    sync.setMessage("数据不存在");
//                }
//            }
            sync.setSyncStatus(Bool.YES.getCode());
        } catch (Exception e) {
            log.error("同步款式数据--失败\t{}", e.getLocalizedMessage(), e);
        } finally {
            this.temuOrderSyncRepository.updateById(sync);
        }
    }

    private void sync(final TemuEtlTimeDTO dto) {
        final var start = dto.getOrderEtlTime();
        final var end = start.minusSeconds(-temuDataProperties.getIntervalTime());
//        int idx = 0;
//        while (true) {
//            final var data = getOrders(dto, idx * MAX_SIZE);
//            if (CollectionUtil.isEmpty(data)) {
//                break;
//            }
//            idx++;
//            sync(data, dto);
//        }
        final var skcIds = this.temuOrderRepository.listSkcIdEtlTime(start, end);
        if (CollectionUtil.isEmpty(skcIds)) {
            log.info("同步Temu数据,SKC_ID为空--结束");
            return;
        }
        List<TemuOrderSync> list = new ArrayList<>(MAX_SIZE);
        TemuOrderSync last = null;
        try {
            for (var skcId : skcIds) {
                final var e = this.sync(skcId);
                if (Objects.nonNull(e)) {
                    list.add(e);
                    last = e;
                }
                if (list.size() >= MAX_SIZE) {
                    this.temuOrderSyncRepository.saveBatch(list, list.size());
                    list = new ArrayList<>(MAX_SIZE);
                }
            }
            if (CollectionUtil.isNotEmpty(list)) {
                this.temuOrderSyncRepository.saveBatch(list, list.size());
            }
        } catch (Exception e) {
            log.info("同步Temu数据,SKC订单记录失败\t{}", e.getMessage(), e);
        } finally {
            if (Objects.nonNull(last)) {
                final var o = last.getOrder();
                final var cache = this.redisTemplate.boundValueOps(CACHE_KEY + "cache:etl:time");
                final var etlTime = new TemuEtlTimeDTO(o.getEtlTime(), o.getEtlTime());
                final var cacheVal = JsonsKt.toJson(etlTime);
                log.info("同步Temu数据--更新ETL时间\t{}", cacheVal);
                cache.set(cacheVal);
            }
        }

    }

    private TemuOrderSync sync(final String skcId) {
        final var data = temuOrderRepository.listBySkcId(skcId);
        if (CollectionUtil.isEmpty(data)) {
            log.info("同步Temu数据,SKC【{}】订单记录为空--结束", skcId);
            return null;
        }
        final var skcOrder = data.getFirst();
//        try {
        final var sync = new TemuOrderSync();
        BasicConvert.entityInit(sync, sync::setSyncId);
        sync.setSyncStatus(Bool.NO.getCode());
        sync.setSkcSiteStatus(skcOrder.getSkcSiteStatus());
        sync.setSkcStatus(skcOrder.getSkcStatus());
        sync.setSkcId(Long.valueOf(skcId));
        sync.setSkuId(skcOrder.getSkuId());
        sync.setProductId(Long.valueOf(skcOrder.getSpuId()));
        sync.setSpuCode(skcOrder.getExtCode());
        sync.setOrderCode(skcOrder.getOrderCode());
        sync.setOrderStatus(skcOrder.getOrderStatus());
        sync.setOrderNumber(skcOrder.getOrderNumber());
        sync.setCommodityAttr(skcOrder.getCommodityAttr());
        sync.setOrderCreatedTime(skcOrder.getOrderCreatedTime());
        sync.setOrder(skcOrder);
//            this.temuOrderSyncRepository.save(sync);
        return sync;
//        } catch (Exception e) {
//            log.info("同步Temu数据,SKC【{}】订单记录失败\t{}", skcId, e.getMessage(), e);
//        } finally {
//            final var cache = this.redisTemplate.boundValueOps(CACHE_KEY + "cache:etl:time");
//            final var etlTime = new TemuEtlTimeDTO(skcOrder.getEtlTime(), skcOrder.getEtlTime());
//            final var cacheVal = JsonsKt.toJson(etlTime);
//            log.info("同步Temu数据--更新ETL时间\t{}", cacheVal);
//            cache.set(cacheVal);
//        }
    }

    private void sync(final List<TemuOrder> orders, final TemuEtlTimeDTO dto) {
        final var skcTotal = this.getSkcTotal(dto);
        if (0 == skcTotal) {
            log.info("同步Temu数据,SKC记录为空--结束");
            return;
        }
        final var skcIds = orders.stream().map(TemuOrder::getSkcId).distinct().toList();
        final var orderMap = BasicConvert.toMap(orders, TemuOrder::getSkcId);
        final var startSkc = dto.getOrderEtlTime();
        final var endSkc = startSkc.minusSeconds(-temuDataProperties.getIntervalTime());
        var idx = 0;
        TemuSkc skc = null;
        try {
            while (true) {
                final var data = temuSkcRepository.listByEtlTimeAndProductIds(idx * MAX_SIZE, startSkc, endSkc, skcIds);
                if (CollectionUtil.isEmpty(data)) {
                    break;
                }
                idx++;
                skc = sync(data, orderMap);
            }
        } catch (Exception e) {
            log.error("同步Temu数据失败\t{}", e.getMessage(), e);
        } finally {
            if (Objects.nonNull(skc)) {
                final var cache = this.redisTemplate.boundValueOps(CACHE_KEY + "cache:etl:time");
                final var etlTime = new TemuEtlTimeDTO(skc.getEtlTime(), orderMap.get(Objects.toString(skc.getSkcId())).getEtlTime());
                final var cacheVal = JsonsKt.toJson(etlTime);
                log.info("同步Temu数据--更新ETL时间\t{}", cacheVal);
                cache.set(cacheVal);
            }
        }
    }

    private TemuSkc sync(final List<TemuSkc> data, final Map<String, TemuOrder> orderMap) {
        this.temuOrderSyncRepository.saveBatchManualFill(data.stream()
                .filter(it -> orderMap.containsKey(Objects.toString(it.getSkcId())))
                .map(it -> obtainSync(orderMap, it)).toList());
        return data.getLast();
    }


    private List<TemuOrder> getOrders(final TemuEtlTimeDTO dto, final int idx) {
        final var start = dto.getOrderEtlTime();
        final var end = start.minusSeconds(-temuDataProperties.getIntervalTime());
        return this.temuOrderRepository.listByEtlTime(idx, start, end);
    }

    private Long getOrderTotal(final TemuEtlTimeDTO dto) {
        final var start = dto.getOrderEtlTime();
        final var end = start.minusSeconds(-temuDataProperties.getIntervalTime());
        return this.temuOrderRepository.countEtlTime(start, end);
    }

    private Long getSkcTotal(final TemuEtlTimeDTO dto) {
        final var start = dto.getOrderEtlTime();
        final var end = start.minusSeconds(-temuDataProperties.getIntervalTime());
        return this.temuSkcRepository.countByEtlTime(start, end);
    }

    private TemuEtlTimeDTO getEtlTime() {
//        this.redisTemplate.delete(CACHE_KEY + "cache:etl:time");
        final var cache = this.redisTemplate.boundValueOps(CACHE_KEY + "cache:etl:time");
        final var cacheVal = cache.get();
        if (StrUtil.isBlank(cacheVal)) {
            final var to = this.temuOrderRepository.getFirst();
//            final var ts = this.temuSkcRepository.getFirst();
            if (Objects.isNull(to) /*|| Objects.isNull(ts)*/) {
                return null;
            }
            final var dto = new TemuEtlTimeDTO(to.getEtlTime(), to.getEtlTime());
            cache.set(JsonsKt.toJson(dto));
            return dto;
        }
        return JsonsKt.parseJson(cacheVal, TemuEtlTimeDTO.class);
    }

    private TemuOrderSync obtainSync(final Map<String, TemuOrder> orderMap, final TemuSkc skc) {
        final var sync = new TemuOrderSync();
        BasicConvert.entityInit(sync, sync::setSyncId);
        sync.setSyncStatus(Bool.NO.getCode());
        sync.setSkcSiteStatus(skc.getSkcSiteStatus());
        sync.setSkcStatus(skc.getSkcStatus());
        sync.setSkcId(skc.getSkcId());
        sync.setSpuCode(skc.getExtCode());
        sync.setOrderCreatedTime(orderMap.get(Objects.toString(skc.getSkcId())).getOrderCreatedTime());
        return sync;
    }
}
