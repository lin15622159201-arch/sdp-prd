package tech.tiangong.sdp.vo.req;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * 商品-尺码
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/13 11:39
 */
@Data
public class ProductSizePartReq implements Serializable {

    @Serial
    private static final long serialVersionUID = 8092367284471774939L;
    /**
     * 主键 id
     */
    private Long sizePartId;
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
