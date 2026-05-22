package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * 商品列表查询-Jit信息
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/17 18:32
 */
@Data
public class TemuProductPageJitModeResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 5300402206393758301L;
    private Boolean signLatestJitVersion;
    private Integer quickSellAgtSignStatus;
    private Boolean matchJitMode;
}
