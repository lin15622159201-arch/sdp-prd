package tech.tiangong.sdp.service.impl;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.convert.SizeTemplateConvert;
import tech.tiangong.sdp.entity.SizePart;
import tech.tiangong.sdp.entity.SizeTemplate;
import tech.tiangong.sdp.repository.SizePartRepository;
import tech.tiangong.sdp.repository.SizeTemplateRepository;
import tech.tiangong.sdp.service.SizeTemplateService;
import tech.tiangong.sdp.vo.req.SizeTemplateAddReq;
import tech.tiangong.sdp.vo.req.SizeTemplateEditReq;
import tech.tiangong.sdp.vo.req.SizeTemplateEnableReq;
import tech.tiangong.sdp.vo.req.SizeTemplatePageReq;
import tech.tiangong.sdp.vo.resp.SizeTemplateResp;

import javax.validation.ValidationException;
import java.util.*;

/**
 * 尺码模板
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/17 14:34
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SizeTemplateServiceImpl implements SizeTemplateService {
    private final SizeTemplateRepository sizeTemplateRepository;
    private final SizePartRepository sizePartRepository;

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchCreate(List<SizeTemplateAddReq> req) {
        valid(req);
        final var list = SizeTemplateConvert.convert(req);
        final var parts = list.stream().flatMap(it -> it.getParts().stream()).toList();
        sizePartRepository.saveBatch(parts, parts.size());
        sizeTemplateRepository.saveBatch(list, list.size());
        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchRemove(List<Long> sizeTemplateIds) {
        final var list = this.sizeTemplateRepository.listByIds(sizeTemplateIds);
        if (CollectionUtil.isEmpty(list)) {
            return false;
        }
        list.forEach(it -> sizeTemplateRepository.logicDelete(it.getTemplateId()));
        final var parts = sizePartRepository.listByIds(sizeTemplateIds);
        if (CollectionUtil.isNotEmpty(parts)) {
            parts.forEach(it -> sizePartRepository.logicDelete(it.getSizePartId()));
            return true;
        }
        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean batchEnable(List<SizeTemplateEnableReq> req) {
        final var list = this.sizeTemplateRepository.listByIds(req.stream()
                .map(SizeTemplateEnableReq::getTemplateId).toList());
        if (CollectionUtil.isEmpty(list)) {
            return false;
        }
        final var reqMap = BasicConvert.toMap(req, SizeTemplateEnableReq::getTemplateId);
        final var data = new ArrayList<SizeTemplate>();
        list.stream().filter(it -> reqMap.containsKey(it.getTemplateId()))
                .forEach(it -> {
                    it.setEnable(reqMap.get(it.getTemplateId()).getEnable());
                    BasicConvert.setRevised(it);
                    data.add(it);
                });
        sizeTemplateRepository.updateBatchById(data, data.size());
        return true;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean edit(SizeTemplateEditReq req) {
        final var e = this.sizeTemplateRepository.obtainById(req.getTemplateId(), "模板不存在");
        valid(req);
        final var list = sizePartRepository.listByTemplateIds(List.of(req.getTemplateId()));
        if (CollectionUtil.isNotEmpty(list)) {
            list.forEach(it -> sizePartRepository.logicDelete(it.getSizePartId()));
        }
        SizeTemplateConvert.convert(e, req);
        sizeTemplateRepository.updateById(e);
        final var parts = e.getParts();
        if (CollectionUtil.isNotEmpty(parts)) {
            sizePartRepository.saveBatch(parts, parts.size());
        }
        return true;
    }

    @Override
    public PageVo<SizeTemplateResp> page(SizeTemplatePageReq req) {
        final var page = this.sizeTemplateRepository.webPage(req);
        final var records = page.getRecords();
        if (CollectionUtil.isEmpty(records)) {
            return new PageVo<>();
        }
        final var parts = sizePartRepository.listByTemplateIds(records.stream().map(SizeTemplate::getTemplateId).toList());
        final Map<Long, List<SizePart>> patrMap = BasicConvert.groupingBy(parts, SizePart::getTemplateId);
        return BasicConvert.page(page, it -> {
            it.setParts(patrMap.get(it.getTemplateId()));
            return SizeTemplateConvert.convert(it);
        });
    }

    private void valid(final SizeTemplateEditReq req) {
        final var list = this.sizeTemplateRepository.listByNames(List.of(req.getTemplateName()));
        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        if (list.stream().anyMatch(it -> !Objects.equals(it.getTemplateId(), req.getTemplateId()))) {
            throw new ValidationException("模板名称已经存在【" + req.getTemplateName() + "】，请修改");
        }
    }

    private void valid(final List<SizeTemplateAddReq> req) {
        final var list = this.sizeTemplateRepository.listByNames(req.stream()
                .map(SizeTemplateAddReq::getTemplateName).toList());
        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        final var reqMap = BasicConvert.toMap(req, SizeTemplateAddReq::getTemplateName);
        final Set<String> names = new HashSet<>(reqMap.keySet());
        list.forEach(it -> Optional.ofNullable(reqMap.get(it.getTemplateName()))
                .ifPresent(t -> names.add(it.getTemplateName())));
        throw new ValidationException("模板名称已经存在【" + String.join(StrUtil.COMMA, names) + "】，请勿重复添加");
    }
}
