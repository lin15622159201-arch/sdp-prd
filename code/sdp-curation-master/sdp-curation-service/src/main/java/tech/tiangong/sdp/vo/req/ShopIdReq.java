package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 店铺 - 启用
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 10:50
 */
@Data
public class ShopIdReq implements Serializable {

    @Serial
    private static final long serialVersionUID = -8538580888571961123L;
    /**
     * 店铺 ID
     */
    @NotNull(message = "主键 ID不能为空")
    private Long shopId;

}
