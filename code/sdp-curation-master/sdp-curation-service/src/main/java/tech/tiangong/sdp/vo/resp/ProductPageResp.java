package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.common.resp.BaseVO;

import java.io.Serial;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 商品
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/12/25 15:09
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class ProductPageResp extends BaseVO {
    @Serial
    private static final long serialVersionUID = 5072057923302960270L;
    /**
     * 主键 ID
     */
    private Long productId;

    /**
     * 平台商品 ID
     */
    private Long platformProductId;
    /**
     * 款ID
     */
    private Long styleId;

    /**
     * 款号
     */
    private String styleCode;
    /**
     * 商品名称
     */
    private String productName;
    /**
     * 款式品类编码
     */
    private String categoryCode;


    /**
     * 款式品类名
     */
    private String categoryName;


    /**
     * 开款类型
     */
    private String styleType;

    /**
     * 店铺 ID
     */
    private Long storeId;


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
     * 商品状态
     */
    private Integer productStatus;
    /**
     * 失败提示
     */
    private String failMessage;
    /**
     * 项目类型名称
     */
    private String projectTypeName;
    /**
     * 上架时间
     */
    private LocalDateTime onShelvesTime;

    /**
     * 商品标签
     */
    private List<String> labels;

    /**
     * SKC 列表
     */
    private List<ProductSkcListResp> skcs;
    /**
     * 素材图
     */
    private String materialImgUrl;
    /**
     * 款式图
     */
    private String styleImgUrl;

    /**
     * 前置拆版状态 0=否 1=是
     */
    private Integer preDisassemblyState;
}
