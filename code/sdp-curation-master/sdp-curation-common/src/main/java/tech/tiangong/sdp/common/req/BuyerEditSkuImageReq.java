package tech.tiangong.sdp.common.req;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 买手SKC图片更新参数
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/2 16:05
 */
@Data
public class BuyerEditSkuImageReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 3174494340488141257L;
    private List<BuyerEditSkuImageItemReq> items;
}
