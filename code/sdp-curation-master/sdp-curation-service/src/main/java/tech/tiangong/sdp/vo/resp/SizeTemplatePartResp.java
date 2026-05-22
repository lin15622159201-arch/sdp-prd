package tech.tiangong.sdp.vo.resp;

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
public class SizeTemplatePartResp implements Serializable {

    @Serial
    private static final long serialVersionUID = -4218167021218308460L;
    /**
     * 部位
     */
    private Integer part;
    /**
     * 部位
     */
    private String partName;
    /**
     * 部位值
     */
    private BigDecimal value;
    /**
     * 部档差值
     */
    private BigDecimal diff;
}
