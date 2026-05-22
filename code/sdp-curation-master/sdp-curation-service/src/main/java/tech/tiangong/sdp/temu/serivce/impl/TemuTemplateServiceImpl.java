package tech.tiangong.sdp.temu.serivce.impl;

import cn.hutool.core.collection.CollectionUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.component.JavaTransactionalManager;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.entity.*;
import tech.tiangong.sdp.repository.*;
import tech.tiangong.sdp.temu.convert.TemuTemplateConvert;
import tech.tiangong.sdp.temu.serivce.TemuProductService;
import tech.tiangong.sdp.temu.serivce.TemuTemplateService;
import tech.tiangong.sdp.temu.vo.resp.*;

import java.util.*;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Temu模板Service
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/30 16:38
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class TemuTemplateServiceImpl implements TemuTemplateService {
    private final TemuProductService temuProductService;
    private final TemuProductCategoryRepository temuProductCategoryRepository;
    private final TemuAttrGroupRepository temuAttrGroupRepository;
    private final TemuAttrSubGroupRepository temuAttrSubGroupRepository;
    private final TemuAttrValueRepository temuAttrValueRepository;
    private final TemuProductTempAttrRepository temuProductTempAttrRepository;
    private final TemuProductTemplateRepository temuProductTemplateRepository;
    private final TemuProductTempValRepository temuProductTempValRepository;
    private final TemuSizeSpecEleRepository temuSizeSpecEleRepository;
    private final TemuAttrUnitRepository temuAttrUnitRepository;
    private final TemuColorRepository temuColorRepository;
    private final TemuSizeRepository temuSizeRepository;
    private final TemuProductTemplatePropertyRepository temuProductTemplatePropertyRepository;
    private final JavaTransactionalManager javaTransactionalManager;

    @Override
    public void sync(final Long categoryId) {
        this.syncTemplate(categoryId);
        this.syncSizeSpec(categoryId);
    }

    @Override
    public void sync() {
        final var leafs = temuProductCategoryRepository.leafs();
        if (CollectionUtil.isEmpty(leafs)) {
            return;
        }
        leafs.forEach(it -> sync(it.getCategoryId()));
    }

    private <R> void transaction(final Supplier<R> supplier) {
        javaTransactionalManager.exec(supplier);
    }

    private void transaction(final Runnable r) {
        transaction(() -> {
            r.run();
            return 0;
        });
    }

    private void syncTemplate(final Long categoryId) {
        this.initTemplate(this.temuProductService.getGoodsTemplate(categoryId), categoryId);
    }


    private void initTemplate(final TemuGoodsTemplateResultResp resp, final Long categoryId) {
        if (Objects.isNull(resp)) {
            log.error("品类模板【{}】不存在", categoryId);
            return;
        }
        final var temp = TemuTemplateConvert.convert(resp);
        temp.setCategoryId(categoryId);
        if (Objects.isNull(temp.getTemplateId())) {
            temp.setTemplateId(categoryId);
        }
        final var properties = resp.getProperties();
        transaction(() -> {
            saveProperty(categoryId, properties);
            saveValue(properties);
            saveAttr(properties);
            saveAttrValue(properties, temp.getTemplateId(), Bool.YES.getCode());
            temuProductTemplateRepository.save(temp);
        });
//        syncSizeSpec(categoryId);
    }

    private void syncSizeSpec(final Long categoryId) {
        final var resp = this.temuProductService.getGoodsSize(categoryId);
        if (Objects.isNull(resp)) {
            log.error("品类规格【{}】不存在", categoryId);
            return;
        }
        if (!resp.succeed()) {
            log.error("品类规格【{}】返回失败", categoryId);
            return;
        }
        final var meta = resp.getMappingContent().getMeta();
        final var groupList = meta.getGroupList();
        if (CollectionUtil.isNotEmpty(groupList)) {
            this.saveGroup(meta.getGroupList().stream()
                    .map(it -> {
                        final var g = new TemuGoodsGroupResp();
                        g.setId(it.getId());
                        g.setName(it.getName());
                        return g;
                    }).toList());
        }
//        final var groupList = meta.getGroupList();
//        final var records = resp.getMappingContent().getRecords();
//        if (CollectionUtil.isNotEmpty(groupList) && CollectionUtil.isNotEmpty(records)) {
//            saveSize(meta, records);
//        }
        final var elementList = meta.getElementList();
        if (CollectionUtil.isEmpty(elementList)) {
            return;
        }
        final var map = BasicConvert.toMap(elementList, TemuSizeMetaNecessaryResp::getId);
        final var elementMap = BasicConvert.toMap(temuSizeSpecEleRepository.listByIds(map.keySet()), TemuSizeSpecEle::getElementId);
        final var elements = new ArrayList<TemuSizeSpecEle>(map.size());
        map.forEach((k, v) -> {
            if (!elementMap.containsKey(k)) {
                elements.add(TemuTemplateConvert.convert(v));
            }
        });
        transaction(() -> {
            if (CollectionUtil.isNotEmpty(elements)) {
                temuSizeSpecEleRepository.saveBatch(elements, elements.size());
            }
            Optional.ofNullable(this.temuProductTemplateRepository.getById(categoryId))
                    .ifPresent(it -> {
                        it.setSizeSpec(JsonsKt.toJson(elementList));
                        BasicConvert.setRevised(it);
                        this.temuProductTemplateRepository.updateById(it);
                    });
        });
    }

    private void saveSize(final TemuSizeMetaResp meta, final List<TemuSizeMappingRecordResp> records) {
        final var groups = BasicConvert.toMap(meta.getGroupList(),
                TemuSizeMetaUnnecessaryResp::getId, TemuSizeMetaUnnecessaryResp::getName);
        final var groupMap = BasicConvert.groupingBy(this.temuSizeRepository.list(), TemuSize::getGroupId);
        final var sizes = new ArrayList<TemuSize>(records.size());
        records.forEach(it -> it.getValues().forEach((k, v) -> {
            final var g = groups.get(Long.valueOf(k));
            final var groupSize = groupMap.getOrDefault(Long.valueOf(k), List.of())
                    .stream().map(TemuSize::getSizeName).collect(Collectors.toSet());
            if (!groupSize.contains(v)) {
                final var size = new TemuSize();
                size.setSizeName(v);
                size.setSpecId(0L);
                size.setGroupId(Long.valueOf(k));
                size.setGroupName(g);
                size.setAvailable(Bool.NO.getCode());
                BasicConvert.entityInit(size, size::setSizeId);
                sizes.add(size);
            }
        }));
        if (CollectionUtil.isEmpty(sizes)) {
            return;
        }
        this.temuSizeRepository.saveBatch(sizes, sizes.size());
    }

    private void saveAttrValue(final List<TemuGoodsPropertyResp> goodsProperties, final Long templateId, final Integer templateType) {
//        final var list = temuProductTempValRepository.listByTemplateId(templateId);
//        if (CollectionUtil.isNotEmpty(list)) {
//            list.forEach(it -> temuAttrValueRepository.logicDelete(it.getValId()));
//        }
        final var values = goodsProperties.stream().map(it -> {
            final var temp = TemuTemplateConvert.convertVal(it);
            temp.setTemplateId(templateId);
            temp.setTemplateType(templateType);
            final var valueList = it.getValues();
            // 颜色
            if (Objects.equals(13L, it.getPid())) {
                saveColor(templateId, valueList);
            }
            // 尺码
            if (Objects.equals(14L, it.getPid())) {
                saveSize(templateId, valueList);
            }
            return temp;
        }).toList();
        if (CollectionUtil.isEmpty(values)) {
            return;
        }
        temuProductTempValRepository.saveBatch(values, values.size());
    }

    private void saveSize(final Long templateId, final List<TemuGoodsPropertyValueResp> valueList) {
        final var map = BasicConvert.toMap(valueList, TemuGoodsPropertyValueResp::getVid);
        final var list = this.temuSizeRepository.listByTemplateId(templateId);
        if (CollectionUtil.isNotEmpty(list)) {
            list.forEach(it -> temuSizeRepository.logicDelete(it.getValId()));
        }
        final var sizes = new ArrayList<TemuSize>(map.size());
        map.forEach((k, v) -> {
            final var size = new TemuSize();
            size.setTemplateId(templateId);
            size.setSizeId(v.getVid());
            size.setSizeName(v.getValue());
            size.setSpecId(v.getSpecId());
            final var g = v.getGroup();
            size.setGroupId(g.getId());
            size.setGroupName(g.getName());
            size.setAvailable(Bool.NO.getCode());
            BasicConvert.entityInit(size, size::setValId);
            sizes.add(size);
        });
        if (CollectionUtil.isEmpty(sizes)) {
            return;
        }
        temuSizeRepository.saveBatch(sizes, sizes.size());
    }

    private void saveColor(final Long templateId, final List<TemuGoodsPropertyValueResp> valueList) {
        final var map = BasicConvert.toMap(valueList, TemuGoodsPropertyValueResp::getVid);
        final var list = this.temuColorRepository.listByTemplateId(templateId);
        if (CollectionUtil.isNotEmpty(list)) {
            list.forEach(it -> temuColorRepository.logicDelete(it.getValId()));
        }
        final var colors = new ArrayList<TemuColor>(map.size());
        map.forEach((k, v) -> {
            final var c = new TemuColor();
            c.setColorId(v.getVid());
            c.setTemplateId(templateId);
            c.setColorName(v.getValue());
            c.setSpecId(v.getSpecId());
            final var g = v.getGroup();
            c.setGroupId(0L);
            c.setGroupName("");
            if (Objects.nonNull(g)) {
                c.setGroupId(g.getId());
                c.setGroupName(g.getName());
            }
            c.setExtendInfo(v.getExtendInfo());
            c.setAvailable(Bool.NO.getCode());
            BasicConvert.entityInit(c, c::setValId);
            colors.add(c);
        });
        if (CollectionUtil.isEmpty(colors)) {
            return;
        }
        temuColorRepository.saveBatch(colors, colors.size());
    }

    private void saveAttr(final List<TemuGoodsPropertyResp> goodsProperties) {
        final var propertyList = Stream.of(goodsProperties)
                .flatMap(Collection::stream).toList();
        if (CollectionUtil.isEmpty(propertyList)) {
            return;
        }
        final var map = BasicConvert.toMap(propertyList, TemuGoodsPropertyResp::getTemplatePid);
        final var propertyMap = BasicConvert.toMap(temuProductTempAttrRepository.listByIds(map.keySet()), TemuProductTempAttr::getAttrId);
        final var values = new ArrayList<TemuProductTempAttr>(map.size());
        map.forEach((k, v) -> {
            if (!propertyMap.containsKey(k)) {
                values.add(TemuTemplateConvert.convert(v));
            }
        });
        if (CollectionUtil.isEmpty(values)) {
            return;
        }
        temuProductTempAttrRepository.saveBatch(values, values.size());
    }

    private void saveValue(final List<TemuGoodsPropertyResp> goodsProperties) {
        final var valueList = Stream.of(goodsProperties)
                .filter(Objects::nonNull)
                .flatMap(Collection::stream)
                .map(TemuGoodsPropertyResp::getValues)
                .filter(Objects::nonNull)
                .flatMap(Collection::stream).toList();
        if (CollectionUtil.isEmpty(valueList)) {
            return;
        }
        saveGroup(valueList.stream().map(TemuGoodsPropertyValueResp::getGroup).filter(Objects::nonNull).toList());
        saveSubGroup(valueList.stream().map(TemuGoodsPropertyValueResp::getSubGroup).filter(Objects::nonNull).toList());
        final var map = BasicConvert.toMap(valueList, TemuGoodsPropertyValueResp::getVid);
        final var valueMap = BasicConvert.toMap(temuAttrValueRepository.listByIds(map.keySet()), TemuAttrValue::getValueId);
        final var values = new ArrayList<TemuAttrValue>(map.size());
        map.forEach((k, v) -> {
            if (!valueMap.containsKey(k)) {
                values.add(TemuTemplateConvert.convert(v));
            }
        });
        if (CollectionUtil.isEmpty(values)) {
            return;
        }
        temuAttrValueRepository.saveBatch(values, values.size());
    }

    private void saveSubGroup(final List<TemuGoodsGroupResp> list) {
        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        final var map = BasicConvert.toMap(list, TemuGoodsGroupResp::getId);
        final var groupMap = BasicConvert.toMap(temuAttrSubGroupRepository.listByIds(map.keySet()), TemuAttrSubGroup::getGroupId);
        final var groups = new ArrayList<TemuAttrSubGroup>(map.size());
        map.forEach((k, v) -> {
            if (!groupMap.containsKey(k)) {
                groups.add(TemuTemplateConvert.convertSubGroup(v));
            }
        });
        if (CollectionUtil.isEmpty(groups)) {
            return;
        }
        temuAttrSubGroupRepository.saveBatch(groups, groups.size());
    }

    private void saveGroup(final List<TemuGoodsGroupResp> list) {
        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        final var map = BasicConvert.toMap(list, TemuGoodsGroupResp::getId);
        final var groupMap = BasicConvert.toMap(temuAttrGroupRepository.listByIds(map.keySet()), TemuAttrGroup::getGroupId);
        final var groups = new ArrayList<TemuAttrGroup>(map.size());
        map.forEach((k, v) -> {
            if (!groupMap.containsKey(k)) {
                groups.add(TemuTemplateConvert.convertGroup(v));
            }
        });
        if (CollectionUtil.isEmpty(groups)) {
            return;
        }
        temuAttrGroupRepository.saveBatch(groups, groups.size());
    }

    private void saveProperty(final Long templateId, final List<TemuGoodsPropertyResp> properties) {
        final var props = properties.stream().map(it -> {
            final var prop = new TemuProductTemplateProperty();
            prop.setTemplateId(templateId);
            prop.setProperty(JsonsKt.toJson(it));
            BasicConvert.entityInit(prop, prop::setPropertyId);
            return prop;
        }).toList();
        temuProductTemplatePropertyRepository.saveBatch(props, props.size());
    }

    private void saveUnit(final List<TemuGoodsPropertyResp> goodsProperties) {
        final var valueUnitList = Stream.of(goodsProperties)
                .filter(Objects::nonNull)
                .flatMap(Collection::stream)
                .map(TemuGoodsPropertyResp::getValueUnitList)
                .filter(Objects::nonNull)
                .flatMap(Collection::stream).toList();
        if (CollectionUtil.isEmpty(valueUnitList)) {
            return;
        }
        final var mapUnit = BasicConvert.toMap(valueUnitList, TemuGoodsValueUnitResp::getValueUnitId);
        final var unitMap = BasicConvert.toMap(temuAttrUnitRepository.listByIds(mapUnit.keySet()), TemuAttrUnit::getUnitId);
        final var units = new ArrayList<TemuAttrUnit>(mapUnit.size());
        mapUnit.forEach((k, v) -> {
            if (!unitMap.containsKey(k)) {
                units.add(TemuTemplateConvert.convert(v));
            }
        });
        if (CollectionUtil.isEmpty(units)) {
            return;
        }
        temuAttrUnitRepository.saveBatch(units, units.size());
    }

}
