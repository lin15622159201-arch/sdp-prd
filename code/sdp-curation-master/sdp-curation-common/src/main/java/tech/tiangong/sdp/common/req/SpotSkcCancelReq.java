package tech.tiangong.sdp.common.req;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serial;

/**
 * 现货SKC - 取消
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 10:03
 */
@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpotSkcCancelReq extends BaseTenantUserReq {
    @Serial
    private static final long serialVersionUID = -6380331383920463926L;
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
