package tech.tiangong.sdp.vo.query;

import lombok.Data;
import lombok.EqualsAndHashCode;
import team.aikero.blade.core.enums.Bool;

import java.io.Serial;
import java.util.List;
import java.util.Set;

/**
 * 图片修复任务(ImageUpdateTask)列表查询对象
 *
 * @author liuhongfu
 * @since 2025-11-03 14:39:39
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class ImageUpdateTaskQuery extends BasePageQuery {
    @Serial
    private static final long serialVersionUID = 3724503377872159456L;

    /**
     * 任务状态：0-待处理；10-待审核；20-待返修；30-已完成；50-已取消
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
     * 同组
     * 1:组内
     */
    private Bool sameGroup;

    /**
     * 设计师id集合  (多选)
     */
    private List<Long> designerIdList;


    /**
     * 设计师id
     */
    private List<Long> designerIds;

    private Boolean empty = false;

    /**
     * 设计组编码
     */
    private List<String> designerGroupCodes;

    /**
     * 任务类型,0-图片，1-视频
     */
    private Integer taskType;


    /**
     * 款号
     */
    private List<String> spuCodes;

    /**
     * 任务编号(多个,分割)
     */
    private List<String> taskCodes;

    /**
     * 创建人id
     */
    private Set<Long> creatorIds;
}
