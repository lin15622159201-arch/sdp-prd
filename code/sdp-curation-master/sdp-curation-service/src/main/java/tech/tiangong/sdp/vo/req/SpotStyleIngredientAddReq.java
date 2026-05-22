package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import jakarta.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * 现货管理 - 新增成分
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/5 16:42
 */
@Data
public class SpotStyleIngredientAddReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 5722148768470351367L;
    /**
     * 成分ID
     */
    private Long ingredientId;

    /**
     * 成分编码
     */
    @NotEmpty(message = "成分编码不能为空")
    private String ingredientCode;

    /**
     * 成分名称
     */
    @NotEmpty(message = "成分名称不能为空")
    private String ingredientName;

    /**
     * 成分比例
     */
    @NotNull(message = "成分比例不能为空")
    private BigDecimal ingredientRatio;
    public boolean add() {
        return Objects.requireNonNullElse(this.ingredientId, 0L) == 0L;
    }

    public boolean edit() {
        return Objects.requireNonNullElse(this.ingredientId, 0L) > 0L;
    }
}
