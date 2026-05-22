package tech.tiangong.sdp.temu.vo.dto;

import org.springframework.core.ParameterizedTypeReference;
import tech.tiangong.sdp.enums.TemuPartnerEnum;
import tech.tiangong.sdp.temu.vo.TemuCommonReq;
import tech.tiangong.sdp.temu.vo.TemuCommonResp;

/**
 * Temu请求参数
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/31 10:48
 */
public record TemuRequestDTO<R extends TemuCommonReq, T>(TemuPartnerEnum type,
                                                         R req,
                                                         ParameterizedTypeReference<TemuCommonResp<T>> typeReference) {
}
