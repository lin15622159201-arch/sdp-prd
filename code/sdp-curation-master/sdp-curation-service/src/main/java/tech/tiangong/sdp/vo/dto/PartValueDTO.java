package tech.tiangong.sdp.vo.dto;

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
public class PartValueDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = 6447989459869535122L;
    /**
     * 部位 id
     */
    private Long partId;

    /**
     * 部位名称
     */
    private String partName;

    /**
     * 部档差值
     */
    private BigDecimal diff;
}
