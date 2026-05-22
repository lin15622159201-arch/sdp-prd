package tech.tiangong.sdp.vo.req;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 商品-新增
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/13 10:33
 */
@Data
public class ProductAddReq implements Serializable {
    @Serial
    private static final long serialVersionUID = -8605948248000946654L;
    /**
     * 商品 ID
     */
    private Long productId;
    /**
     * 审核结果
     * 通过：true
     * 不通过：false
     */
//    @NotNull(message = "审核结果不能为空!")
    private Boolean pass;

    /**
     * 审核不通过原因，不通过时候必填
     */
    private String reviewFailReason;
    /**
     * 店铺 id
     */
    private Long storeId;

    /**
     * 款ID
     */
    private Long styleId;

    /**
     * 款号
     */
    private String styleCode;

    /**
     * 品类 ID
     */
    private Integer catId;
    /**
     * 品类 ID
     */
    private String catName;
    /**
     * 中文标题
     */
    private String productName;
    /**
     * 英文标题
     */
    private String productEnName;

    /**
     * 素材图
     */
    private String materialImgUrl;
    /**
     * 款式图
     */
    private String styleImgUrl;
    /**
     * 承诺发货天
     */
    private Integer promisedDeliveryDay;
    /**
     * 运费模板 ID
     */
    private String freightTemplateId;
    /**
     * 尺码组 ID
     */
    private Integer groupId;
    /**
     * 尺码
     */
    private List<String> sizes;
    /**
     * 仓库 ID
     */
    private List<String> warehouseIds;
    /**
     * 尺寸图片
     */
    private List<String> sizeImages;
    /**
     * 视频
     */
    private ProductVideoReq video;
    /**
     * 站点
     */
    private List<Long> siteIds;
    /**
     * 商品属性
     */
    private List<ProductAttrReq> attrs;
    /**
     * 销售属性
     */
    private List<ProductSpecAttrReq> specAttrs;
    /**
     * skc 列表
     */
    private List<ProductSkcAddReq> skcReqs;
    /**
     * 尺码 列表
     */
    private List<ProductSizeTemplateReq> sizeReqs;
}
