package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;

/**
 * 店铺 - 启用
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 10:50
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class LogisticsTemplateReq extends ShopIdReq {

    @Serial
    private static final long serialVersionUID = -8538580888571961123L;
    /**
     * 站点 ID
     */
    @NotNull(message = "站点 ID不能为空")
    private Integer siteId;
}
