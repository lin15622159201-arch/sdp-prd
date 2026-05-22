package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.common.resp.BaseVO;

import java.io.Serial;

/**
 * 商品-SKU
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:09
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class ProductSkuListResp extends BaseVO {
    @Serial
    private static final long serialVersionUID = 5072057923302960270L;
    /**
     * 主键 ID
     */
    private Long skuId;
    /**
     * 平台SKC ID
     */
    private Long platformSkuId;
    /**
     * SKU 编码
     */
    private String skuCode;
    /**
     * 平台颜色
     */
    private String platformColor;
    /**
     * 平台颜色
     */
    private String color;

    /**
     * 平台尺码
     */
    private String platformSize;
    /**
     * 尺码
     */
    private String size;
}
