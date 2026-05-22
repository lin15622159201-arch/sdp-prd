package tech.tiangong.sdp.vo.req;

import lombok.AllArgsConstructor;
import lombok.Data;

import jakarta.validation.constraints.NotNull;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

/**
 * 现货管理 - 取消
 *
 * @author ：qinwenxuan@zj.tech
 * @version :1.0
 * @date ：2025/11/4 10:03
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpotStyleCancelReq implements Serializable {

    @Serial
    private static final long serialVersionUID = -1579142466272540398L;
    /**
     * 任务id
     */
    @NotNull(message = "任务id不能为空")
    private Long taskId;

    /**
     * 取消信息
     */
    private String message;
}
