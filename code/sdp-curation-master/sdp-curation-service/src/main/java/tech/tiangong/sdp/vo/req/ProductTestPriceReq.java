package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import team.aikero.blade.core.enums.Bool;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

/**
 * 商品 - 测价
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 10:50
 */
@Data
public class ProductTestPriceReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 5045357519325339281L;
    /**
     * 商品 ID
     */
    @NotNull(message = "商品 ID不能为空")
    private Long productId;
    /**
     * 是否通过【1通过】
     */
    @NotNull(message = "是否通过不能为空")
    private Integer pass;

    public boolean passed() {
        return Objects.nonNull(pass) && Objects.equals(Bool.YES.getCode(), pass);
    }
}
