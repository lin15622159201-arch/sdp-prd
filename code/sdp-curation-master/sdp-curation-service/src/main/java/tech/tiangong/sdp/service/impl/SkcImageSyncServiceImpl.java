package tech.tiangong.sdp.service.impl;

import cn.hutool.core.collection.CollectionUtil;
import cn.hutool.core.util.StrUtil;
import com.alibaba.excel.EasyExcel;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.entity.SkcImageSync;
import tech.tiangong.sdp.excel.SkcImageDataListener;
import tech.tiangong.sdp.repository.SkcImageSyncRepository;
import tech.tiangong.sdp.service.SkcImageSyncService;
import tech.tiangong.sdp.util.ImageUtils;
import tech.tiangong.sdp.vo.dto.SkcImageExcelDTO;

import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * SKC图片导入Service
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/11 15:18
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SkcImageSyncServiceImpl implements SkcImageSyncService {
    private final SkcImageSyncRepository skcImageSyncRepository;

    @Override
    public void importExcel(InputStream inputStream) {
        final var listener = new SkcImageDataListener();
        EasyExcel.read(inputStream, SkcImageExcelDTO.class, listener).doReadAll();
        final var data = listener.getList();
        if (CollectionUtil.isEmpty(data)) {
            return;
        }
        List<SkcImageSync> list = new ArrayList<>();
        for (SkcImageExcelDTO dto : data) {
            if (Objects.isNull(list)) {
                list = new ArrayList<>();
            }
            getSync(dto, list);
            if (list.size() >= 2048) {
                skcImageSyncRepository.saveBatch(list, list.size());
                list = null;
            }
        }
        if (Objects.nonNull(list) && CollectionUtil.isNotEmpty(list)) {
            skcImageSyncRepository.saveBatch(list, list.size());
        }
    }

    @Override
    public void upload() {
        final var data = this.skcImageSyncRepository.uploads();
        if (CollectionUtil.isEmpty(data)) {
            return;
        }
        data.forEach(this::upload);
    }

    private void upload(final SkcImageSync sync) {
        sync.setUploadTime(LocalDateTime.now());
        sync.setUploadTimes(Objects.requireNonNullElse(sync.getUploadTimes(), 0) + 1);
        final var url = ImageUtils.upload(ImageUtils.downloadWithCookie(sync.getSrcUrl()),
                sync.getSyncId() + ".png");
        sync.setImageUrl(url);
        sync.setUploadStatus(Bool.YES.getCode());
        BasicConvert.setRevised(sync);
        this.skcImageSyncRepository.updateById(sync);
    }

    private void getSync(final SkcImageExcelDTO dto, final List<SkcImageSync> list) {
        final var url = dto.getImageUrl();
        if (StrUtil.isBlank(url)) {
            return;
        }
        final var data = this.skcImageSyncRepository.listBySkcCode(dto.getSkcCode());
        // 存在不更新
        if (CollectionUtil.isNotEmpty(data)) {
            log.info("SKC【{}】已经存在,不导入", dto.getSkcCode());
            return;
        }
        StrUtil.split(url, StrUtil.C_COMMA).forEach(it -> list.add(getSkcImageSync(dto, it)));
    }

    private SkcImageSync getSkcImageSync(final SkcImageExcelDTO dto, final String url) {
        final var e = new SkcImageSync();
        BasicConvert.entityInit(e, e::setSyncId);
        e.setSkcCode(dto.getSkcCode());
        e.setSrcUrl(url);
        e.setImageUrl("");
        e.setUploadStatus(Bool.NO.getCode());
        e.setUploadTimes(0);
        e.setSyncStatus(Bool.NO.getCode());
        e.setSyncTimes(0);
        return e;
    }
}
