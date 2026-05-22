package tech.tiangong.sdp.vo.dto;

import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

/**
 * 图片修复任务分组结果
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/5 16:47
 */
@Data
public class ImageUpdateTaskGroupDTO implements Serializable {
    @Serial
    private static final long serialVersionUID = -542493380571514415L;
    /**
     * 状态
     */
    private Integer taskStatus;
    /**
     * 总数
     */
    private Long total;
}
