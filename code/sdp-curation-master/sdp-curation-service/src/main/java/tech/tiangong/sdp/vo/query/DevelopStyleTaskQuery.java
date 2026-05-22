package tech.tiangong.sdp.vo.query;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

/**
 * 开款任务(DevelopStyleTask)列表查询对象
 *
 * @author qinwenxuan@zj.tech
 * @since 2025-11-03 14:39:39
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class DevelopStyleTaskQuery extends BasePageQuery {
    @Serial
    private static final long serialVersionUID = 3724503377872159456L;
    /**
     * 任务状态
     * 任务状态：0-待审核；10-待开款；20-已淘汰；30-已开款；50-失败；
     */
    private Integer taskStatus;
    /**
     * 波段编码
     */
    private List<String> wavebandCodes;

    /**
     * 店铺id
     */
    private List<Long> storeIds;

    /**
     * 关联类型
     */
    private List<String> relaTypes;

    /**
     * 款号
     */
    private List<String> spuCodes;
    /**
     * 任务编号(多个,分割)
     */
    private List<String> taskCodes;
    /**
     * 款式品类编码(多个,分割)
     */
    private List<String> categoryCodes;
    /**
     * 识别状态(0-排队中；10-识别中；20-已中止；30-已完成；50-失败；60-超时失败；)
     */
    private Integer identifyStatus;

    /**
     * 开款类型
     */
    private List<String> styleTypes;
    /**
     * 审款人ID
     */
    private Long styleCheckerId;

    /**
     * 审款开始时间
     */
    private LocalDateTime checkStartTime;

    /**
     * 审款结束时间
     */
    private LocalDateTime checkEndTime;
    /**
     * 创建人id
     */
    private Set<Long> creatorIds;
    private Boolean empty = false;
    /**
     * 款式标签
     */
    private String styleLabelCode;
}
