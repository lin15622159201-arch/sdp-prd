package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.common.resp.BaseVO;

import java.io.Serial;
import java.util.List;

/**
 * 商品-SKC
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:09
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class ProductSkcListResp extends BaseVO {
    @Serial
    private static final long serialVersionUID = 5072057923302960270L;
    /**
     * 主键 ID
     */
    private Long skcId;
    /**
     * 平台SKC ID
     */
    private Long platformSkcId;
    /**
     * 平台颜色
     */
    private String platformColor;
    /**
     * 平台颜色
     */
    private String color;

    /**
     * SKC 编码
     */
    private String skcCode;
    /**
     * SKC 状态
     */
    private Integer skcStatus;
    /**
     * 前置拆版状态 0=否 1=是
     */
    private Integer preDisassemblyState;
    /**
     * SKU 列表
     */
    private List<ProductSkuListResp> skus;
}
