package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.vo.dto.TemuNameDTO;

import java.io.Serial;

/**
 * Temu 部位
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:09
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class TemuPartResp extends TemuNameDTO {
    @Serial
    private static final long serialVersionUID = 8563669740226567684L;
    /**
     * 必填的
     * 1:必填
     */
    private Integer required;
}
