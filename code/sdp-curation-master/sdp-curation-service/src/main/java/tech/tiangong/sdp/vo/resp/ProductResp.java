package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.common.resp.BaseVO;

import java.io.Serial;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 商品-详情
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2026/1/13 10:33
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class ProductResp extends BaseVO {

    @Serial
    private static final long serialVersionUID = 3110928165517407633L;
    /**
     * 主键 ID
     */
    private Long productId;

    /**
     * 平台商品 ID
     */
    private Long platformProductId;
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
     * 店铺名称
     */
    private String storeName;

    /**
     * 运营人员 ID
     */
    private Long businessOperatorId;

    /**
     * 运营人员名称
     */
    private String businessOperatorName;

    /**
     * 波段名称
     */
    private String waveBandName;
    /**
     * 款式标签名称
     */
    private String styleLabelName;
    /**
     * 设计师 id
     */
    private Long designerId;

    /**
     * 设计师名称
     */
    private String designerName;

    /**
     * 设计师组别名称
     */
    private String designerGroupName;
    /**
     * 上架人 id
     */
    private Long onShelvesId;

    /**
     * 上架人名称
     */
    private String onShelvesName;
    /**
     * 上架时间
     */
    private LocalDateTime onShelvesTime;
    /**
     * 开款类型
     */
    private String styleType;

    /**
     * 前置拆版状态 0=否 1=是
     */
    private Integer preDisassemblyState;
    /**
     * 商品状态
     */
    private Integer productStatus;
    /**
     * 失败提示
     */
    private String failMessage;
    /**
     * 商品标签
     */
    private List<String> labels;
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
    private String videoUrl;

    /**
     * 项目类型名称
     */
    private String projectTypeName;
    /**
     * 站点
     */
    private List<Long> siteIds;
    /**
     * 商品属性
     */
    private List<ProductAttrResp> attrs;
    /**
     * 销售属性
     */
    private List<ProductSpecAttrResp> specAttrs;
    /**
     * skc 列表
     */
    private List<ProductSkcResp> skcs;
    /**
     * 尺码 列表
     */
    private List<ProductSizeTemplateResp> sizeTemplates;
}
