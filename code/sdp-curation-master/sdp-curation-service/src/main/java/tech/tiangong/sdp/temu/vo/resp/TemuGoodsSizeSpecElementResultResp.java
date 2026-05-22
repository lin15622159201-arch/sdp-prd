package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import tech.tiangong.sdp.temu.vo.TemuResp;

import java.io.Serial;

/**
 * 尺码规格元素结果实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@Data
public class TemuGoodsSizeSpecElementResultResp implements TemuResp {
    @Serial
    private static final long serialVersionUID = 116415353801452531L;
    /**
     * Size specification element rule
     */
    private TemuGoodsSizeSpecElementRuleResp sizeSpecElementRule;

}
