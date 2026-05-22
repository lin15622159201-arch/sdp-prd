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
 * @date ：2025/12/2 15:26
 */
@Data
public class BuyerCreateSpuResultResp implements Serializable {
    @Serial
    private static final long serialVersionUID = -3847419360639002498L;
    /**
     * spu款号
     */
    private String styleCode;
    /**
     * skc设计款款号列表
     */
    private List<String> designCodes;
}
