package tech.tiangong.sdp.temu.vo.dto;

import tech.tiangong.sdp.enums.TemuPartnerEnum;

/**
 * ThreadLocal
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 16:13
 */
public record RestLogDTO(
        TemuPartnerEnum partner,
        String type,
        Boolean hasParams,
        Boolean hasResponse) {
}
