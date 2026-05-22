package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;

/**
 * 临时模板 信息
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@EqualsAndHashCode(callSuper = false)
@Data
public class TemuSizeChartsCreateResp implements TemuResp {

    @Serial
    private static final long serialVersionUID = -3499637282576812417L;
    /**
     * 模板 ID
     */
    private Long businessId;

}
