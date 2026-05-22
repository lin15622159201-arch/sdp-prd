package tech.tiangong.sdp.vo.resp;

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
public class ProductSizePartResp implements Serializable {
    @Serial
    private static final long serialVersionUID = 4827279548584897268L;
    /**
     * 主键 id
     */
    private Long sizePartId;

    /**
     * 商品 ID
     */
    private Long productId;

    /**
     * 商品尺码模板
     */
    private Long productSizeId;

    /**
     * 部位 id
     */
    private Long partId;

    /**
     * 部位名称
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

    /**
     * 尺码
     */
    private String size;

    /**
     * 平台尺码
     */
    private String platformSize;
}
