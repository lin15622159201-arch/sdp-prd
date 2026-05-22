package tech.tiangong.sdp.vo.req;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import jakarta.validation.constraints.NotNull;
import java.io.Serial;
import java.io.Serializable;

/**
 * 开款任务 - 备注
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 10:03
 */
@Data
public class DevelopStyleRemarkReq implements Serializable {
    @Serial
    private static final long serialVersionUID = 4949865195660339427L;
    /**
     * 任务id
     */
    @NotNull(message = "任务id不能为空")
    private Long taskId;

    /**
     * 备注信息
     */
    @NotEmpty(message = "备注信息不能为空")
    private String remark;
}
