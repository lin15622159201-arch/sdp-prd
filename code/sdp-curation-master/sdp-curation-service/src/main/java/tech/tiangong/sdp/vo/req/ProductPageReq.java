package tech.tiangong.sdp.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import team.aikero.blade.core.protocol.PageReq;

import java.io.Serial;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 商品 - 分页
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 16:58
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ProductPageReq extends PageReq {

    @Serial
    private static final long serialVersionUID = 8739452072134486893L;
    /**
     * 平台商品 ID
     */
    private String platformProductId;
    /**
     * 款号
     */
    private String styleCode;
    /**
     * 平台SKC ID
     */
    private String platformSkcId;
    /**
     * SKC 编码
     */
    private String skcCode;
    /**
     * 平台SKC ID
     */
    private String platformSkuId;
    /**
     * SKU 编码
     */
    private String skuCode;

    /**
     * 运营人员 ID
     */
    private Long businessOperatorId;
    /**
     * 店铺 ID
     */
    private Long shopId;
    /**
     * 设计师 id
     */
    private Long designerId;

    /**
     * 上架人 id
     */
    private Long onShelvesId;

    /**
     * 波段编码
     */
    private String waveBandCode;

    /**
     * 款式标签编码
     */
    private String styleLabelCode;

    /**
     * SKC 状态
     */
    private Integer skcStatus;
    /**
     * 创建开始时间
     */
    private LocalDateTime createdStartTime;

    /**
     * 创建结束时间
     */
    private LocalDateTime createdEndTime;
    /**
     * 创建人 id
     */
    private Long creatorId;

    /**
     * 创建人姓名
     */
    private String creatorName;

    /**
     * 前置拆版状态 0=否 1=是
     */
    private Integer preDisassemblyState;
    /**
     * 商品标签
     */
    private List<String> labels;
}
