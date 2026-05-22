package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 尺码-部位
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/13 11:39
 */
@Data
public class SizeTemplatePartReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 6110333364166373635L;
    /**
     * 部位
     */
    @NotNull(message = "部位不能为空")
    private Integer part;
    /**
     * 部位
     */
    @NotEmpty(message = "部位名称不能为空")
    private String partName;
    /**
     * 部位值
     */
    @NotNull(message = "部位值不能为空")
    private BigDecimal value;
    /**
     * 部档差值
     */
    private BigDecimal diff;
}
