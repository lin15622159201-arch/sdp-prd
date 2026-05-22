package tech.tiangong.sdp.vo.req;

import lombok.Data;
import team.aikero.blade.core.enums.Bool;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

/**
 * 商品-新增-SKC
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/13 11:39
 */
@Data
public class ProductSkcAddReq implements Serializable {
    @Serial
    private static final long serialVersionUID = -412564607949775134L;
    /**
     * 商品SKC id
     */
    private Long productSkcId;
    /**
     * SKC ID
     */
    private Long skcId;
    /**
     * SKC 编码
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
     * SKC状态
     * 0:待更新
     */
    private Integer skcState;
    /**
     * 主销售属性
     */
    private List<ProductSkcMainSpecReq> mainSpecReqs;
    /**
     * SKU 列表
     */
    private List<ProductSkuAddReq> skuReqs;
    /**
     * 图片
     */
    private List<String> images;

    public boolean add() {
        return Objects.isNull(this.productSkcId) || this.productSkcId < 1;
    }

    public boolean update() {
        return Objects.equals(Bool.NO.getCode(), skcState);
    }
}
