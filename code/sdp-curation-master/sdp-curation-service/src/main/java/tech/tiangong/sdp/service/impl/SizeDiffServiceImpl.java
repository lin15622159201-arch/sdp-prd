package tech.tiangong.sdp.service.impl;

import cn.hutool.core.collection.CollectionUtil;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import team.aikero.blade.core.protocol.PageVo;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.convert.SizeDiffConvert;
import tech.tiangong.sdp.repository.SizeDiffRepository;
import tech.tiangong.sdp.service.SizeDiffService;
import tech.tiangong.sdp.vo.req.SizeDiffAddReq;
import tech.tiangong.sdp.vo.req.SizeDiffEditReq;
import tech.tiangong.sdp.vo.req.SizeDiffPageReq;
import tech.tiangong.sdp.vo.resp.SizeDiffResp;

/**
 * 尺码档差Service
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/2/27 10:24
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SizeDiffServiceImpl implements SizeDiffService {
    private final SizeDiffRepository sizeDiffRepository;

    @Override
    public Boolean create(final SizeDiffAddReq req) {
        final var list = this.sizeDiffRepository.listBySizeCode(req.getSizeCode());
        if (CollectionUtil.isNotEmpty(list)) {
            throw new ValidationException("尺码【" + req.getSizeName() + "】已经存在档差");
        }
        this.sizeDiffRepository.save(SizeDiffConvert.convert(req));
        return true;
    }

    @Override
    public PageVo<SizeDiffResp> page(final SizeDiffPageReq req) {
        final var page = this.sizeDiffRepository.webPage(req);
        final var records = page.getRecords();
        if (CollectionUtil.isEmpty(records)) {
            return new PageVo<>();
        }
        return BasicConvert.page(page, SizeDiffConvert::convert);
    }

    @Override
    public Boolean edit(final SizeDiffEditReq req) {
        final var e = this.sizeDiffRepository.obtainById(req.getSizeDiffId(), "档差不存在");
        SizeDiffConvert.convert(req, e);
        this.sizeDiffRepository.updateById(e);
        return true;
    }
}
