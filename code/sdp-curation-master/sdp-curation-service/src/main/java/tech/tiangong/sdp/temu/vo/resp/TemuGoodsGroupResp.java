package tech.tiangong.sdp.temu.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;

/**
 * 分组实体类
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/29 9:57
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class TemuGoodsGroupResp extends TemuIdNameResp {

    @Serial
    private static final long serialVersionUID = 5130450711878743184L;
}
