package tech.tiangong.sdp.common.resp;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 买手新增结果
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/2 15:01
 */
@Data
public class BuyerCreateSpuResp implements Serializable {
    @Serial
    private static final long serialVersionUID = 8325133569881105897L;
    private List<BuyerCreateSpuResultResp> spuCreateResults;
}
