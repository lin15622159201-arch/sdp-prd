package tech.tiangong.sdp.vo.resp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.tiangong.sdp.common.resp.BasicVO;
import java.io.Serial;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 待上架列表 - 分页
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 18:08
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class StyleOnShelvesPageResp extends BasicVO {

    @Serial
    private static final long serialVersionUID = -2428963009678792259L;

    /**
     * 款ID
     */
    private Long styleId;

    /**
     * SPU款号
     */
    private String styleCode;

    /**
     * SPU图片信息
     */
    private List<StyleSkcOnShelvesPictureVo> spuImageList;


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
     * 款式等级编号
     */
    private String styleLevelCode;

    /**
     * 款式等级
     */
    private String styleLevelName;

    /**
     * 款式标签编码
     */
    private String styleLabelCode;


    /**
     * 款式标签名称
     */
    private String styleLabelName;


    /**
     * 平台编码
     */
    private String platformCode;

    /**
     * 平台名称
     */
    private String platformName;

    /**
     * 平台名称(商品)
     */
    private String productPlatformName;


    /**
     * 店铺id
     */
    private Long storeId;


    /**
     * 店铺名称
     */
    private String storeName;

    /**
     *  运营人员ID
     */
    private Long operationUserId;


    /**
     * 运营人员名称
     */
    private String operationUserName;



    /**
     * 审核状态，0-待审核，1-已通过，2-已驳回
     */
    private Integer reviewStatus;

    /**
     * 审核不通过原因
     */
    private String reviewFailReason;


    /**
     * SKC信息
     */
    private List<SkcOnShelvesVo> skcList;

    /**
     * 发布状态，0-待发布，1-发布中，2-已发布，3-发布失败
     */
    private Integer releaseStatus;



    /**
     * 发布失败原因
     */
    private String releaseFailReason;

    /**
     * 审核人ID
     */
    private Long reviewUserId;


    /**
     * 审核人名称
     */
    private String reviewUserName;

    /**
     * 审核时间
     */
    private LocalDateTime reviewTime;


    /**
     * 波段编码
     */
    private String waveBandCode;


    /**
     * 波段名称
     */
    private String waveBandName;


    /**
     * 店铺审核状态，1-已通过，2-已驳回
     */
    private Integer shopReviewStatus;

    /**
     * 店铺审核人ID
     */
    private Long shopReviewUserId;

    /**
     * 店铺审核人名称
     */
    private String shopReviewUserName;

    /**
     * 店铺审核时间
     */
    private LocalDateTime shopReviewTime;

    /**
     * 店铺审核驳回原因
     */
    private String shopReviewFailReason;

    /**
     * 项目类型编码
     */
    private String projectTypeCode;
    /**
     * 项目类型名称
     */
    private String projectTypeName;

}
