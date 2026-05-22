package tech.tiangong.sdp.vo.dto;

import lombok.Data;
import java.io.Serial;
import java.io.Serializable;
import java.util.List;

/**
 * 待上架任务分组结果
 *
 * @author ：liuhongfu
 * @version :1.0
 * @date ：2025/11/5 16:47
 */
@Data
public class StyleOnShelvesGroupDTO implements Serializable {

    @Serial
    private static final long serialVersionUID = -542493380571514415L;
    /**
     * 审核状态
     */
    private List<GroupStatusDTO> reviewStatus;

    /**
     * 发布状态
     */
    private List<GroupStatusDTO> releaseStatus;

}
