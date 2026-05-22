package tech.tiangong.sdp.temu.convert;

import cn.hutool.core.collection.CollectionUtil;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import team.aikero.blade.core.enums.Bool;
import team.aikero.blade.sequence.id.IdHelper;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.entity.*;
import tech.tiangong.sdp.temu.vo.resp.*;

import java.util.Objects;
import java.util.Optional;

/**
 * Temu模板Convert
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/30 16:49
 */
@UtilityClass
@Slf4j
public class TemuTemplateConvert {
    public TemuProductTemplate convert(final TemuGoodsTemplateResultResp resp) {
        final var e = new TemuProductTemplate();
        Optional.ofNullable(resp.getTemplateInfo())
                .ifPresent(it -> e.setTemplateId(it.getTemplateId()));
        e.setAvailable(Bool.NO.getCode());
        e.setMaxSpecNum(resp.getInputMaxSpecNum());
        e.setSingleSpecValueNum(resp.getSingleSpecValueNum());
        e.setChooseAll(Bool.NO.getCode());
        if (Objects.nonNull(resp.getChooseAllQualifySpec()) && resp.getChooseAllQualifySpec()) {
            e.setChooseAll(Bool.YES.getCode());
        }
        final var list = resp.getUserInputParentSpecList();
        if (CollectionUtil.isNotEmpty(list)) {
            e.setUserInputParentSpec(JsonsKt.toJson(list));
        }
        BasicConvert.entityInit(e);
        return e;
    }

    public TemuAttrUnit convert(final TemuGoodsValueUnitResp resp) {
        final var unit = new TemuAttrUnit();
        unit.setUnitName(resp.getValueUnit());
        unit.setUnitId(resp.getValueUnitId());
        unit.setAvailable(Bool.NO.getCode());
        BasicConvert.entityInit(unit);
        return unit;
    }

    public TemuSizeSpecEle convert(final TemuSizeMetaNecessaryResp resp) {
        final var ele = new TemuSizeSpecEle();
        ele.setElementId(resp.getId());
        ele.setElementName(resp.getName());
        ele.setAvailable(Bool.NO.getCode());
        BasicConvert.entityInit(ele);
        return ele;
    }

    public TemuAttrValue convert(final TemuGoodsPropertyValueResp resp) {
        final var e = new TemuAttrValue();
        e.setAvailable(Bool.NO.getCode());
        BasicConvert.entityInit(e);
        e.setSpecId(resp.getSpecId());
        e.setVal(resp.getValue());
        e.setValueId(resp.getVid());
        Optional.ofNullable(resp.getAdditionalInfo())
                .ifPresent(it -> e.setAdditionalInfo(JsonsKt.toJson(it)));
        Optional.ofNullable(resp.getGroup())
                .ifPresent(it -> e.setGroupId(it.getId()));
        Optional.ofNullable(resp.getSubGroup())
                .ifPresent(it -> e.setSubGroupId(it.getId()));
        final var parentVids = resp.getParentVidList();
        if (CollectionUtil.isNotEmpty(parentVids)) {
            e.setParentIds(JsonsKt.toJson(parentVids));
        }
        return e;
    }

    public TemuProductTempAttr convert(final TemuGoodsPropertyResp resp) {
        final var e = new TemuProductTempAttr();
        e.setAvailable(Bool.NO.getCode());
        BasicConvert.entityInit(e);
        e.setAttrId(resp.getTemplatePid());
        e.setAttrTitle(resp.getName());
        e.setAttrType(resp.getPropertyValueType());
        return e;
    }

    public TemuProductTempVal convertVal(final TemuGoodsPropertyResp resp) {
        final var e = new TemuProductTempVal();
        e.setAvailable(Bool.NO.getCode());
        BasicConvert.entityInit(e);
        e.setAttrId(resp.getTemplatePid());
        e.setValId(IdHelper.getId());
        e.setBaseAttrId(resp.getPid());
        e.setFeature(resp.getFeature());
        e.setChooseMaxNum(resp.getChooseMaxNum());
        e.setChooseTitle(resp.getPropertyChooseTitle());
        e.setNumberInputTitle(resp.getNumberInputTitle());
        e.setControlType(resp.getControlType());
        e.setShowType(resp.getShowType());
        e.setMaxValue(resp.getMaxValue());
        e.setMinValue(resp.getMinValue());
        e.setValuePrecision(resp.getValuePrecision());
        e.setParentSpecId(resp.getParentSpecId());
        e.setParentValId(resp.getParentTemplatePid());
        e.setReferenceType(resp.getReferenceType());
        e.setReferencedAttrId(resp.getRefPid());
        e.setValueRule(resp.getValueRule());
        e.setTransnational(Bool.NO.getCode());
        if (Objects.nonNull(resp.getTransnationalAttribute()) && resp.getTransnationalAttribute()) {
            e.setTransnational(Bool.YES.getCode());
        }
        e.setSales(Bool.NO.getCode());
        if (Objects.nonNull(resp.getIsSale()) && resp.getIsSale()) {
            e.setSales(Bool.YES.getCode());
        }
        e.setRequired(Bool.NO.getCode());
        if (Objects.nonNull(resp.getRequired()) && resp.getRequired()) {
            e.setRequired(Bool.YES.getCode());
        }
        e.setMainSale(Bool.NO.getCode());
        if (Objects.nonNull(resp.getMainSale()) && resp.getMainSale()) {
            e.setMainSale(Bool.YES.getCode());
        }
        final var values = resp.getValues();
        if (CollectionUtil.isNotEmpty(values)) {
            e.setAttrValue(JsonsKt.toJson(values.stream().map(TemuGoodsPropertyValueResp::getVid).toList()));
        }
        final var valueUnitList = resp.getValueUnit();
        if (CollectionUtil.isNotEmpty(valueUnitList)) {
            e.setUnitArr(JsonsKt.toJson(valueUnitList));
        }
        final var showCondition = resp.getShowCondition();
        if (CollectionUtil.isNotEmpty(showCondition)) {
            e.setShowCondition(JsonsKt.toJson(showCondition));
        }
        final var valueParentList = resp.getTemplatePropertyValueParentList();
        if (CollectionUtil.isNotEmpty(valueParentList)) {
            e.setValueRela(JsonsKt.toJson(valueParentList));
        }
        return e;
    }

    public TemuAttrGroup convertGroup(final TemuGoodsGroupResp resp) {
        final var e = new TemuAttrGroup();
        e.setAvailable(Bool.NO.getCode());
        e.setGroupId(resp.getId());
        e.setGroupName(resp.getName());
        BasicConvert.entityInit(e);
        return e;
    }

    public TemuAttrSubGroup convertSubGroup(final TemuGoodsGroupResp resp) {
        final var e = new TemuAttrSubGroup();
        e.setAvailable(Bool.NO.getCode());
        e.setGroupId(resp.getId());
        e.setGroupName(resp.getName());
        BasicConvert.entityInit(e);
        return e;
    }
}
