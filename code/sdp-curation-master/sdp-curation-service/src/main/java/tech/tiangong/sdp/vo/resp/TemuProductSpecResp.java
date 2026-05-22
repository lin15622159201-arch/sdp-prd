package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.vo.dto.TemuNameDTO;

import java.io.Serial;
import java.io.Serializable;

/**
 * Temu规格
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:09
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class TemuProductSpecResp extends TemuNameDTO {

    @Serial
    private static final long serialVersionUID = 3888140196644629280L;
    /**
     * 可以用的
     * 0:可用
     */
    private Integer available;
}
