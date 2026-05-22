package tech.tiangong.sdp.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import team.aikero.blade.core.enums.Bool;
import tech.tiangong.sdp.enums.DevelopStyleRelaTypeEnum;
import tech.tiangong.sdp.enums.DevelopStyleTypeEnum;

import java.io.Serial;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 开款任务 - 分页
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/3 16:58
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class DevelopStyleTaskPageReq extends BasePageReq {
    @Serial
    private static final long serialVersionUID = 2462758647556473588L;
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
    private List<DevelopStyleRelaTypeEnum> relaTypes;

    /**
     * 款号
     */
    private String spuCode;
    /**
     * 款式标签
     */
    private String styleLabelCode;

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
    private List<DevelopStyleTypeEnum> styleTypes;
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
     * 同组
     * 1:组内
     */
    private Bool sameGroup;
}
