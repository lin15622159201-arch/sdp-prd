package tech.tiangong.sdp.convert;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import lombok.experimental.UtilityClass;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.entity.SizePart;
import tech.tiangong.sdp.entity.SizeTemplate;
import tech.tiangong.sdp.vo.req.SizeTemplateAddReq;
import tech.tiangong.sdp.vo.req.SizeTemplateEditReq;
import tech.tiangong.sdp.vo.req.SizeTemplateReq;
import tech.tiangong.sdp.vo.resp.SizeTemplatePartResp;
import tech.tiangong.sdp.vo.resp.SizeTemplateResp;
import tech.tiangong.sdp.vo.resp.SizeTemplateVO;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * 尺码模板工具类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/17 15:25
 */
@UtilityClass
public class SizeTemplateConvert {
    public SizeTemplateResp convert(final SizeTemplate template) {
        final var resp = BasicConvert.copy(template, SizeTemplateResp.class);
        if (StrUtil.isNotBlank(template.getSize())) {
            resp.setSizes(StrUtil.split(template.getSize(), StrUtil.COMMA));
        }
        if (StrUtil.isNotBlank(template.getPart())) {
            resp.setParts(StrUtil.split(template.getPart(), StrUtil.COMMA));
        }
        final var parts = template.getParts();
        if (CollectionUtil.isNotEmpty(parts)) {
            resp.setTemps(new ArrayList<>());
            temps(parts, resp);
        }
        resp.setCatName(template.getPlatformCategoryName());
        resp.setCatId(Long.valueOf(template.getPlatformCategoryCode()));
        return resp;
    }

    public List<SizeTemplate> convert(final List<SizeTemplateAddReq> list) {
        return list.stream().map(SizeTemplateConvert::sizeTemplate).toList();
    }

    public void convert(final SizeTemplate template, final SizeTemplateEditReq req) {
        BasicConvert.copy(req, template, "parts");
        template.setSize(String.join(StrUtil.COMMA, req.getSizes()));
        template.setPart(String.join(StrUtil.COMMA, req.getParts()));
        template.setPlatformCategoryCode(Objects.toString(req.getCatId()));
        template.setPlatformCategoryName(req.getCatName());
        template.setParts(new ArrayList<>());
        req.getSizeReqs().forEach(it -> sizePart(it, template));
        BasicConvert.setRevised(template);
    }

    private SizeTemplate sizeTemplate(final SizeTemplateAddReq req) {
        final var e = new SizeTemplate();
        BasicConvert.copy(req, e, "parts");
        BasicConvert.entityInit(e, e::setTemplateId);
        e.setEnable(Bool.YES.getCode());
        e.setSize(String.join(StrUtil.COMMA, req.getSizes()));
        e.setPart(String.join(StrUtil.COMMA, req.getParts()));
        e.setPlatformCategoryCode(Objects.toString(req.getCatId()));
        e.setPlatformCategoryName(req.getCatName());
        e.setParts(new ArrayList<>());
        req.getSizeReqs().forEach(it -> sizePart(it, e));
        return e;
    }

    private void sizePart(final SizeTemplateReq req, final SizeTemplate template) {
        req.getValues().forEach(it -> {
            var part = new SizePart();
            part.setTemplateId(template.getTemplateId());
            part.setSize(req.getSize());
            part.setPartDiff(it.getDiff());
            part.setPartValue(it.getValue());
            part.setPartId(it.getPart().longValue());
            part.setPartName(it.getPartName());
            BasicConvert.entityInit(part, part::setSizePartId);
            template.getParts().add(part);
        });
    }

    private void temps(final List<SizePart> parts, final SizeTemplateResp resp) {
        BasicConvert.groupingBy(parts, SizePart::getSize).forEach((k, v) -> {
            final var temp = new SizeTemplateVO();
            resp.getTemps().add(temp);
            temp.setSize(k);
            temp.setValues(v.stream().map(it -> {
                final var val = new SizeTemplatePartResp();
                val.setPart(it.getPartId().intValue());
                val.setPartName(it.getPartName());
                val.setDiff(it.getPartDiff());
                val.setValue(it.getPartValue());
                return val;
            }).toList());
        });
    }
}
