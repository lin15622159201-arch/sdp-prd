package tech.tiangong.sdp.vo.req;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

/**
 * 商品-SKC-主销售属性
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/13 11:39
 */
@Data
public class ProductSkcMainSpecReq implements Serializable {
    @Serial
    private static final long serialVersionUID = -262191210839612547L;
    /**
     * 商品SKU规格 id
     */
    private Long skuSpecId;
    /**
     * 父规格 id
     */
    private Integer parentSpecId;
    /**
     * 父规格名称
     */
    private String parentSpecName;
    /**
     * 规格 id
     */
    private Integer specId;
    /**
     * 规格名称
     */
    private String specName;
    public boolean add () {
        return Objects.isNull(this.skuSpecId) || this.skuSpecId < 1;
    }
}
