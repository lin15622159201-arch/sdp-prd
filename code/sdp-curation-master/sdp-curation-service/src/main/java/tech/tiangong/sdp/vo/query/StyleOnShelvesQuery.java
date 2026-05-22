package tech.tiangong.sdp.vo.query;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 待上架列表 - 分页
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 16:58
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class StyleOnShelvesQuery extends BasePageQuery {

    @Serial
    private static final long serialVersionUID = 8739452072134486893L;

    private Integer pageLimit;

    /**
     * 款号
     */
    private List<String> styleCodes;

    /**
     * SKC编码数组
     */
    private List<String> designCodes;


    /**
     * 设计师id【设计师】
     */
    private Long designerId;


    /**
     * 店铺id
     */
    private Long storeId;

    /**
     * 店铺id列表
     */
    private List<Long> storeIdList;


    /**
     * 审核人ID
     */
    private Long reviewUserId;


    /**
     * 审核开始时间
     */
    private LocalDateTime reviewStartTime;

    /**
     * 审核结束时间
     */
    private LocalDateTime reviewEndTime;

    /**
     * 波段编码
     */
    private String waveBandCode;

    /**
     * 前置拆版状态 0=否 1=是
     */
    private Integer preDisassemblyState;


    /**
     * 款式标签编码
     */
    private String styleLabelCode;

    /**
     * 审核状态，0-待审核，1-已通过，2-已驳回
     */
    private Integer reviewStatus;

    /**
     * 店铺审核状态: 0-待审核, 1-已通过，2-已驳回
     */
    private Integer shopReviewStatus;

    /**
     * 发布状态，0-待发布，1-发布中，2-已发布，3-发布失败
     */
    private Integer releaseStatus;

    /**
     * 店铺审核人ID
     */
    private Long shopReviewUserId;

    /**
     * 店铺审核人名称
     */
    private String shopReviewUserName;

    /**
     * 审核开始时间
     */
    private LocalDateTime shopReviewTimeStart;

    /**
     * 审核结束时间
     */
    private LocalDateTime shopReviewTimeEnd;

}
