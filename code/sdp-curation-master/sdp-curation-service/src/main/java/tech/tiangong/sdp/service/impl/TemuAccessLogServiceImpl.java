package tech.tiangong.sdp.service.impl;

import cn.hutool.core.collection.CollectionUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tech.tiangong.sdp.convert.BasicConvert;
import tech.tiangong.sdp.entity.TemuAccessLog;
import tech.tiangong.sdp.repository.TemuAccessLogRepository;
import tech.tiangong.sdp.service.TemuAccessLogService;
import tech.tiangong.sdp.temu.vo.dto.TemuApiLogDTO;

/**
 * Temu日志Service
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:41
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class TemuAccessLogServiceImpl implements TemuAccessLogService {
    private final TemuAccessLogRepository temuAccessLogRepository;

    @Override
    public void save(TemuApiLogDTO dto) {
        final var e = BasicConvert.copy(dto, TemuAccessLog.class);
        BasicConvert.entityInit(e, e::setLogId);
        temuAccessLogRepository.save(e);
        final var list = this.temuAccessLogRepository.jobs();
        if (CollectionUtil.isEmpty(list)) {
            return;
        }
        list.forEach(it -> temuAccessLogRepository.delId(it.getLogId()));
    }
}
