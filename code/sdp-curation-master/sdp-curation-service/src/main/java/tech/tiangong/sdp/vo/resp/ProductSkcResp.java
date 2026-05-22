package tech.tiangong.sdp.vo.resp;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 商品-新增-SKC
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/13 11:39
 */
@Data
public class ProductSkcResp implements Serializable {
    @Serial
    private static final long serialVersionUID = 716399352108691639L;
    /**
     * 商品SKC id
     */
    private Long productSkcId;
    /**
     * 平台SKC ID
     */
    private Long platformSkcId;
    /**
     * 商品 id
     */
    private Long productId;

    /**
     * SKC id
     */
    private Long skcId;

    /**
     * SKC 号
     */
    private String skcCode;

    /**
     * 平台SKC 状态
     */
    private Integer skcStatus;
    /**
     * SKC状态
     * 0:待更新
     */
    private Integer skcState;
    /**
     * 颜色
     */
    private String color;
    /**
     * 平台颜色
     */
    private String platformColor;
    /**
     * 前置拆版状态 0=否 1=是
     */
    private Integer preDisassemblyState;
    /**
     * 主销售属性
     */
    private List<ProductSkcMainSpecResp> mainSpecs;
    /**
     * SKU 列表
     */
    private List<ProductSkuResp> skus;
    /**
     * 图片
     */
    private List<String> images;
}
