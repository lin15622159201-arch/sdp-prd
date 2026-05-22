package tech.tiangong.sdp.service;

import tech.tiangong.sdp.temu.vo.dto.TemuApiLogDTO;

/**
 * Temu日志Service
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:40
 */
public interface TemuAccessLogService {
    void save(TemuApiLogDTO dto);
}
