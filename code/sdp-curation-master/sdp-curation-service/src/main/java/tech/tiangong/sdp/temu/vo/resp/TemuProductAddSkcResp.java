package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;

/**
 * SKC 信息
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@EqualsAndHashCode(callSuper = false)
@Data
public class TemuProductAddSkcResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 6419414535526201398L;
    /**
     * skc id
     */
    private Long productSkcId;

}
