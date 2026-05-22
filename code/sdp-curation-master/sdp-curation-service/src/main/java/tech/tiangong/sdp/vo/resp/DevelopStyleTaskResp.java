package tech.tiangong.sdp.vo.resp;


import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.common.resp.BasicVO;
import tech.tiangong.sdp.enums.DevelopStyleRelaTypeEnum;
import tech.tiangong.sdp.enums.DevelopStyleTypeEnum;

import java.io.Serial;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 开款任务(DevelopStyleTask)Vo
 *
 * @author qinwenxuan@zj.tech
 * @since 2025-11-03 14:39:39
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class DevelopStyleTaskResp extends BasicVO {
    @Serial
    private static final long serialVersionUID = 4729040799952633841L;

    /**
     * 任务状态：0-待审核；10-待开款；20-已淘汰；30-已开款；50-失败；
     */
    private Integer taskStatus;

    /**
     * 选款结果ID
     */
    private Long pickingResultId;

    /**
     * 款式id
     */
    private Long pickingStyleId;

    /**
     * 开款类型
     */
    private DevelopStyleTypeEnum styleType;

    /**
     * 供应商名称
     */
    private String supplierName;

    /**
     * 供应商款号
     */
    private String supplierStyleCode;

    /**
     * 商品链接
     */
    private String commodityLink;

    /**
     * 价格
     */
    private BigDecimal price;

    /**
     * 波段编码
     */
    private String wavebandCode;

    /**
     * 波段名称
     */
    private String wavebandName;

    /**
     * 款式品类编码
     */
    private String categoryCode;

    /**
     * 款式品类名
     */
    private String categoryName;

    /**
     * 款式标签编码
     */
    private String styleLabelCode;

    /**
     * 款式标签名称
     */
    private String styleLabelName;

    /**
     * 店铺id
     */
    private Long storeId;

    /**
     * 店铺名称
     */
    private String storeName;

    /**
     * 主图url
     */
    private String mainImgUrl;

    /**
     * 款号
     */
    private String spuCode;

    /**
     * 审款人
     */
    private String styleCheckerName;

    /**
     * 审款人ID
     */
    private Long styleCheckerId;

    /**
     * 审款时间
     */
    private LocalDateTime checkTime;

    /**
     * 审款结果：0-未审款；1-淘汰；2-通过
     */
    private Long checkResult;

    /**
     * 平台编码
     */
    private String platformCode;

    /**
     * 平台名称
     */
    private String platformName;

    /**
     * 提交时间
     */
    private LocalDateTime submitTime;

    /**
     * 开款人id
     */
    private Long developerId;

    /**
     * 开款人名称
     */
    private String developerName;

    /**
     * 信息备注
     */
    private String message;

    /**
     * 关联类型
     */
    private DevelopStyleRelaTypeEnum relaType;

    /**
     * 关联ID
     */
    private Long relaId;

    /**
     * 关联编号
     */
    private String relaCode;
    /**
     * 图片
     */
    private List<DevelopStylePictureResp> pictures;
    /**
     * 备注
     */
    private List<DevelopStyleRemarkResp> remarks;
}
