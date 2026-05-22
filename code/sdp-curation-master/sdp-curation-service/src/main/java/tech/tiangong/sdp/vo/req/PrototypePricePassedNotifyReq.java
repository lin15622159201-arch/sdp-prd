package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * sdp更新测价通过PLM
 *
 * @author liuhongfu
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PrototypePricePassedNotifyReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 4596431991444125073L;

    /**
     * 设计款号编码列表，最多500个
     */
    @NotEmpty(message = "设计款号编码列表不能为空")
    @Max(value = 500, message = "设计款号编码列表最多500个")
    private List<String> designCodes;

    /**
     * 操作类型：1-前置拆版 / 2-测价通过
     */
    @NotNull(message = "操作类型不能为空")
    private Integer operationType;

    /**
     * 状态值（0=否，1=是）
     */
    @NotNull(message = "状态值不能为空")
    @Min(value = 0, message = "状态值最小为0")
    @Max(value = 1, message = "状态值最大为1")
    private Integer state;

    /**
     * 测价通过时间，仅在 operationType 为 2 时必填
     */
    private LocalDateTime pricePassedTime;

}
