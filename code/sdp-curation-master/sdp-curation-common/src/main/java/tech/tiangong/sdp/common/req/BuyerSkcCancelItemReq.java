package tech.tiangong.sdp.common.req;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

/**
 * 买手取消参数
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/2 14:38
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BuyerSkcCancelItemReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 7933186436345334553L;
    /**
     * 设计款编码
     */
    @NotBlank(message = "设计款编码不能为空")
    private String designCode;

    /**
     * 取消信息
     */
    private String cancelReason;
}
