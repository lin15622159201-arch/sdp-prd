package tech.tiangong.sdp.external;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import cn.hutool.extra.spring.SpringUtil;
import com.zjkj.aigc.common.exception.BaseBizException;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;
import team.aikero.admin.common.vo.AttributeVo;
import team.aikero.admin.common.vo.DictVo;
import team.aikero.admin.common.vo.LabelVo;
import team.aikero.blade.util.json.JsonsKt;
import tech.tiangong.butted.common.vo.PredLabelVo;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.enums.DictEnum;
import tech.tiangong.sdp.vo.dto.DictDTO;
import tech.tiangong.sdp.vo.resp.DictValueBatchListVo;

import java.util.*;
import java.util.function.Consumer;
import java.util.function.Predicate;
import java.util.stream.Collectors;

/**
 * PLM帮助类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/8 17:55
 */
@Slf4j
@UtilityClass
public class PlmConvertHelper {
    private final DictClientExternal dictClientExternal = SpringUtil.getBean(DictClientExternal.class);
    private final DictValueRemoteHelper dictValueRemoteHelper = SpringUtil.getBean(DictValueRemoteHelper.class);
    private final static String WEAVE_MODE_NAME = "织造方式";

    public List<DictDTO> dictColor() {
        final var dict = dictClientExternal.listByDictCode("clothing_color");
        final var list = new ArrayList<DictDTO>();
        BasicConvert.reverseDict(list, dict, null);
        return list;
    }

    public List<DictDTO> referenceSeason() {
        final var dict = dictClientExternal.listByDictCode("plm_reference_season");
        final var list = new ArrayList<DictDTO>();
        BasicConvert.reverseDict(list, dict, null);
        return list;
    }

    public List<DictDTO> dictPrinting() {
        final var dict = dictClientExternal.listByDictCode("fd-printing");
        final var list = new ArrayList<DictDTO>();
        BasicConvert.reverseDict(list, dict, null);
        return list;
    }

    public List<DictDTO> productTag() {
        final var dict = dictClientExternal.listByDictCode("product_tag");
        final var list = new ArrayList<DictDTO>();
        BasicConvert.reverseDict(list, dict, null);
        return list;
    }


    public DictValueBatchListVo getPlmDict(final String code) {
        return dictValueRemoteHelper.listByDictCodes(List.of(code)).getFirst();
    }

    public void setPlmDict(final String code, final String value, final Consumer<DictValueBatchListVo.DictValueVo> fn) {
        final var dict = getPlmDict(code);
        dict.getDictValues().stream()
                .filter(it -> StrUtil.equalsIgnoreCase(value, it.getValue()))
                .findFirst().ifPresent(fn);
    }

    public void plmCategory(final List<DictDTO> list, final String lastCode, final List<DictDTO> defaultDict,
                            final List<DictDTO> categoryDict, final Predicate<List<LabelVo>> labelTest) {
        list.stream()
                .filter(it -> CollectionUtil.isNotEmpty(it.getAttributes()))
                .forEach(it -> {
                    final var attrs = it.getAttributes().stream().toList();
                    final var attrCodes = attrs.stream().map(AttributeVo::getCode).collect(Collectors.toSet());
                    // 编码一样的
                    if (attrs.stream().anyMatch(a -> StrUtil.equalsIgnoreCase(lastCode, a.getName()))) {
                        if (attrCodes.contains("isdefault")) {
                            defaultDict.add(it);
                        } else {
                            // 不是默认品类,找到第一个就不往下找满足的
                            if (CollectionUtil.isEmpty(categoryDict) && labelTest.test(it.getLabels())) {
                                categoryDict.add(it);
                            }
                        }
                    }
                });
    }

    public DictVo plmCategory() {
        return dictClientExternal.listByDictCode("plm_category");
    }

    public List<DictDTO> plmCategoryList() {
        final var dict = plmCategory();
        final var list = new ArrayList<DictDTO>();
        BasicConvert.reverseDict(list, dict, null);
        return list;
    }

    /**
     * 获取第一个中文标签
     * <pre>
     * [
     *   {
     *     "cn": {
     *       "code": "FM240402584",
     *       "name": "裙长",
     *       "values": [
     *         {
     *           "code": "V240402290",
     *           "name": "短裙",
     *           "values": null
     *         }
     *       ]
     *     },
     *     "en": {
     *       "code": null,
     *       "name": "skirt length",
     *       "values": [
     *         {
     *           "code": null,
     *           "name": "Short skirt",
     *           "values": null
     *         }
     *       ]
     *     },
     *     "coloroCodes": null
     *   },
     *   {
     *     "cn": {
     *       "code": "FM240402569",
     *       "name": "廓形",
     *       "values": [
     *         {
     *           "code": "V240402096",
     *           "name": "A",
     *           "values": null
     *         }
     *       ]
     *     },
     *     "en": {
     *       "code": null,
     *       "name": "silhouette",
     *       "values": [
     *         {
     *           "code": null,
     *           "name": "A",
     *           "values": null
     *         }
     *       ]
     *     },
     *     "coloroCodes": null
     *   },
     *   {
     *     "cn": {
     *       "code": "FM240402568",
     *       "name": "版型",
     *       "values": [
     *         {
     *           "code": "V240402093",
     *           "name": "合体",
     *           "values": null
     *         }
     *       ]
     *     },
     *     "en": {
     *       "code": null,
     *       "name": "pattern",
     *       "values": [
     *         {
     *           "code": null,
     *           "name": "Fitted",
     *           "values": null
     *         }
     *       ]
     *     },
     *     "coloroCodes": null
     *   },
     *   {
     *     "cn": {
     *       "code": "FM240402570",
     *       "name": "裙型",
     *       "values": [
     *         {
     *           "code": "V240402102",
     *           "name": "A字裙",
     *           "values": null
     *         }
     *       ]
     *     },
     *     "en": {
     *       "code": null,
     *       "name": "skirt",
     *       "values": [
     *         {
     *           "code": null,
     *           "name": "A-line skirt",
     *           "values": null
     *         }
     *       ]
     *     },
     *     "coloroCodes": null
     *   },
     *   {
     *     "cn": {
     *       "code": "FM240402575",
     *       "name": "袖长",
     *       "values": [
     *         {
     *           "code": "V240402229",
     *           "name": "无袖",
     *           "values": null
     *         }
     *       ]
     *     },
     *     "en": {
     *       "code": null,
     *       "name": "sleeve length",
     *       "values": [
     *         {
     *           "code": null,
     *           "name": "Sleeveless",
     *           "values": null
     *         }
     *       ]
     *     },
     *     "coloroCodes": null
     *   },
     *   {
     *     "cn": {
     *       "code": "FM240402580",
     *       "name": "开襟方式",
     *       "values": [
     *         {
     *           "code": "V240402261",
     *           "name": "不开襟",
     *           "values": null
     *         }
     *       ]
     *     },
     *     "en": {
     *       "code": null,
     *       "name": "front closure style",
     *       "values": [
     *         {
     *           "code": null,
     *           "name": "No Front Opening",
     *           "values": null
     *         }
     *       ]
     *     },
     *     "coloroCodes": null
     *   },
     *   {
     *     "cn": {
     *       "code": "FM240402589",
     *       "name": "季节",
     *       "values": [
     *         {
     *           "code": "V240402323",
     *           "name": "夏",
     *           "values": null
     *         }
     *       ]
     *     },
     *     "en": {
     *       "code": null,
     *       "name": "season",
     *       "values": [
     *         {
     *           "code": null,
     *           "name": "Summer",
     *           "values": null
     *         }
     *       ]
     *     },
     *     "coloroCodes": null
     *   }
     * ]
     * </pre>
     *
     * @param json 标签
     * @return 中文名:第一组中文标签
     */
    public Map<String, String> mapLabel(final String json) {
        if (StrUtil.isBlank(json)) {
            return Collections.emptyMap();
        }
        final Map<String, String> labelValue = new HashMap<>();
        final var labels = JsonsKt.parseJsonList(json, PredLabelVo.class);
        labels.forEach(it -> {
            final var cn = it.getCn();
            labelValue.putIfAbsent(cn.getName(), cn.getValues().getFirst().getName());
        });
        return labelValue;
    }

    public boolean plmCategoryFilterLabel(final String weaveModeName, final boolean hasSource,
                                          final Map<String, String> mapLabel,
                                          final List<LabelVo> labels) {
        // 如果字典标签为空
        if (CollectionUtil.isEmpty(labels)) {
            return true;
        }
        final var labelValue = labels.getFirst().getLabelValue();
        boolean containWeaveMode = true;
        boolean containLabel = true;
        final var complex = StrUtil.contains(labelValue, ";");
        final var hasWeaveMode = StrUtil.contains(labelValue, WEAVE_MODE_NAME);
        // 如果包含织造方式
        if (hasWeaveMode) {
            final var weaveModeLabel = complex ? StrUtil.split(labelValue, ";").getFirst() : labelValue;
            final var weaveMode = StrUtil.split(weaveModeLabel, StrUtil.COLON).getLast().replaceAll("\\n", "");
            containWeaveMode = StrUtil.equals(weaveMode, weaveModeName);
        }
        if (hasSource) {
            return containWeaveMode;
        }
        // 如果是组合(说明一定有标签)或者不包含织造方式,如果不是组合,说明只有一组,如果不包含织造方式,说明就是标签
        if (complex || !hasWeaveMode) {
            // 如果有来源ID,标签为空
            if (CollectionUtil.isEmpty(mapLabel)) {
                return false;
            }
            // 织造方式:针织;裙长:超短裙,短裙
            final var cnLabel = complex ? StrUtil.split(labelValue, ";").getLast() : labelValue;
            final var labelArr = StrUtil.split(cnLabel, StrUtil.COLON);
            final var cnName = labelArr.getFirst();
            final var cnValue = labelArr.getLast().replaceAll("\\n", "");
            final var value = mapLabel.get(cnName);
            if (StrUtil.isBlank(value)) {
                return false;
            }
            // 如果包含
            containLabel = StrUtil.contains(cnValue, value);
        }
        return containWeaveMode && containLabel;
    }

    public void filterDict(final List<DictDTO> dict, final List<String> code,
                           final List<String> name, final Map<Long, DictDTO> dictMap) {
        dict.forEach(it -> {
            DictDTO node = it;
            do {
                code.add(node.getDictCode());
                name.add(node.getDictName());
                node = dictMap.get(node.getParentId());
            } while (!Objects.equals(0L, node.getParentId()));
        });
    }

    public DictVo listByDictCode(DictEnum dict) {
        final var dictVo = dictClientExternal.listByDictCode(dict.getDictCode());
        if (null == dictVo) {
            throw new BaseBizException(dict.getDesc() + "查询信息映射不存在，编码：" + dict.getDictCode());
        }
        return dictVo;
    }

    public DictValueBatchListVo.DictValueVo getPlmDictValueVo(String code, DictEnum sdpDictCode, DictEnum plmDictCode) {
        final var patternElement = PlmConvertHelper.listByDictCode(sdpDictCode);
        final var children = patternElement.getChildren();
        if (CollectionUtil.isEmpty(children)) {
            throw new BaseBizException(sdpDictCode.getDesc() + "字典属性信息不存在");
        }
        final var print = children.stream().filter(it -> it.getDictCode().equals(code)).collect(Collectors.toList());
        if (CollectionUtil.isEmpty(print)) {
            throw new BaseBizException(sdpDictCode.getDesc() + "信息在字典不存在，编码：" + code);
        }
        final var attributes = print.getFirst().getAttributes();
        if (CollectionUtil.isEmpty(attributes)) {
            throw new BaseBizException(sdpDictCode.getDesc() + "相关属性信息没有配置，编码：" + code);
        }
        final var attribute = attributes.stream().filter(it -> it.getCode().equals(DictEnum.PLM_VALUE.getDictCode())).collect(Collectors.toList());
        if (CollectionUtil.isEmpty(attribute)) {
            throw new BaseBizException("PLM相关属性信息没有配置，编码：" + code);
        }
        final var name = attribute.getFirst().getName();
        final var patternElementList = dictValueRemoteHelper.getDictValueByCode(plmDictCode.getDictCode(), plmDictCode.getDesc());
        final var dictValues = patternElementList.getFirst().getDictValues();
        if (CollectionUtil.isEmpty(dictValues)) {
            throw new BaseBizException("PLM" + plmDictCode.getDesc() + "信息没配置属性信息,编码" + plmDictCode.getDictCode());
        }
        final var patternElements = dictValues.stream().filter(it -> it.getValue().equals(name)).collect(Collectors.toList());
        if (CollectionUtil.isEmpty(patternElements)) {
            throw new BaseBizException("PLM" + plmDictCode.getDesc() + "信息没配置" + plmDictCode.getDesc() + "属性信息");
        }
        return patternElements.getFirst();
    }

}
