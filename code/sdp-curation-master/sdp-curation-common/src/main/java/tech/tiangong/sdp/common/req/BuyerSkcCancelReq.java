package tech.tiangong.sdp.common.req;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 买手取消参数
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/2 14:37
 */
@Data
public class BuyerSkcCancelReq implements Serializable {
    @Serial
    private static final long serialVersionUID = -1705147682943164491L;
    @Valid
    @NotEmpty(message = "取消参数不能为空")
    private List<BuyerSkcCancelItemReq> cancelItems;
}
