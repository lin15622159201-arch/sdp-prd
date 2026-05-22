package tech.tiangong.sdp.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import team.aikero.blade.core.enums.Bool;

import java.io.Serial;
import java.util.List;
import java.util.Set;

/**
 * 图片修复任务 - 分页
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/3 16:58
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ImageUpdateTaskPageReq extends BasePageReq {
    @Serial
    private static final long serialVersionUID = 2462758647556473588L;

    /**
     * 任务状态：0-待处理；10-待审核；20-待返修；30-已完成；50-已取消
     */
    private Integer taskStatus;

    /**
     * 波段编码
     */
    private List<String> wavebandCodes;

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
     * 店铺id
     */
    private List<Long> storeIds;

    /**
     * 设计师id
     */
    private List<Long> designerIds;

    /**
     * 设计组编码
     */
    private List<String> designerGroupCodes;

    /**
     * 任务类型,0-图片，1-视频
     */
    private Integer taskType;

    /**
     * 款号(多个,分割)
     */
    private String spuCode;

}
