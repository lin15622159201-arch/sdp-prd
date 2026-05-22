package tech.tiangong.sdp.vo.query;

import lombok.Data;
import lombok.EqualsAndHashCode;
import team.aikero.blade.core.protocol.PageReq;

import java.io.Serial;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 商品列表查询对象
 *
 * @author qinwenxuan@zj.tech
 * @since 2025-11-03 14:39:39
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class ProductQuery extends PageReq {
    @Serial
    private static final long serialVersionUID = -476203253453972703L;
    /**
     * 商品 ID
     */
    private List<Long> productIds;
    /**
     * 平台商品 ID
     */
    private List<Long> platformProductIds;
    /**
     * 款号
     */
    private List<String> styleCodes;
    /**
     * 平台SKC ID
     */
    private List<Long> platformSkcIds;
    /**
     * SKC 编码
     */
    private List<String> skcCodes;
    /**
     * 平台SKC ID
     */
    private List<Long> platformSkuIds;
    /**
     * SKU 编码
     */
    private List<String> skuCodes;

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
     * 商品标签
     */
    private List<String> labels;
    /**
     * 租户 ID
     */
    private Long tenantId;

    /**
     * 是否删除
     */
    private Integer deleted;

    /**
     * 隐藏的
     * 0-否；1-是
     */
    private Integer hidden;
    /**
     * 店铺ID
     */
    private List<Long> shopIds;
    /**
     * 款ID
     */
    private List<Long> styleIds;
}
