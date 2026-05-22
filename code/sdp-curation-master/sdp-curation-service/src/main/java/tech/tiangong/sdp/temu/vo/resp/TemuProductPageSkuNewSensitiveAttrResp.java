package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * 商品列表查询-敏感属性
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/3/17 18:32
 */
@Data
public class TemuProductPageSkuNewSensitiveAttrResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 3682297365577233369L;
    private List<Integer> force2NormalTypes;
    private List<Integer> sensitiveList;
    private Boolean isForce2Normal;
}
