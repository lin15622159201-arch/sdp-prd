package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 档差值
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/2/27 10:01
 */
@Data
public class PartValueReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 6447989459869535122L;
    /**
     * 部位 id
     */
    @NotNull(message = "部位 id不能为空")
    private Long partId;

    /**
     * 部位名称
     */
    @NotEmpty(message = "部位名称不能为空")
    private String partName;

    /**
     * 部档差值
     */
    @NotNull(message = "部档差值不能为空")
    private BigDecimal diff;
}
