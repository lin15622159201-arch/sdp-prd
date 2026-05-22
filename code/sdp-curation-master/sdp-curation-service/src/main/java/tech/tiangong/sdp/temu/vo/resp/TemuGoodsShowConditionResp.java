package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;
import java.util.List;

/**
 * 显示条件实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@Data
public class TemuGoodsShowConditionResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = -3214562204162233599L;
    /**
     * Parent attribute ID
     */
    private Long parentRefPid;
    /**
     * Only when the attribute is displayed conditionally. The attribute can only be used when the values in parent_vids are selected
     */
    private List<Long> parentVids;
}
