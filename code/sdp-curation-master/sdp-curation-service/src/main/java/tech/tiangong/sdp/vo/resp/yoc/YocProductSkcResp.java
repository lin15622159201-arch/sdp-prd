package tech.tiangong.sdp.vo.resp.yoc;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * YOC商品SKC审核信息-响应
 *
 * @author while
 * @since 1.0.0
 */
@Data
public class YocProductSkcResp implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * 商品SKC ID
     */
    private Long productSkcId;

    /**
     * SKC ID
     */
    private Long skcId;

    /**
     * SKC编码
     */
    private String skcCode;

    /**
     * 颜色
     */
    private String color;

    /**
     * 平台颜色
     */
    private String platformColor;

    /**
     * SKU列表
     */
    private List<YocProductSkuResp> skuReqs;
}
